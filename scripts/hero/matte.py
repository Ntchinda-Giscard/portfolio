"""Step 1 of 2 — cut the character out of the intro video.

Runs Robust Video Matting (ONNX, CPU) over every frame and writes one alpha PNG
per frame plus meta.json (frame size, frame count, character bounding box).

usage: python matte.py <video.mp4> <rvm_mobilenetv3_fp32.onnx> <out_dir> [downsample_ratio=0.5]
"""
import json
import os
import subprocess
import sys
import time

import numpy as np
import onnxruntime as ort
from PIL import Image

video, model, out_dir = sys.argv[1], sys.argv[2], sys.argv[3]
ratio = float(sys.argv[4]) if len(sys.argv) > 4 else 0.5
WARMUP = 30  # frames used to settle the model's recurrent state before the real pass
os.makedirs(out_dir, exist_ok=True)

probe = subprocess.run(
    ["ffprobe", "-v", "error", "-select_streams", "v:0", "-show_entries",
     "stream=width,height", "-of", "json", video],
    capture_output=True, text=True, check=True)
stream = json.loads(probe.stdout)["streams"][0]
W, H = stream["width"], stream["height"]

options = ort.SessionOptions()
options.intra_op_num_threads = os.cpu_count() or 4
session = ort.InferenceSession(model, options, providers=["CPUExecutionProvider"])


def frames():
    proc = subprocess.Popen(["ffmpeg", "-v", "error", "-i", video, "-f", "rawvideo",
                             "-pix_fmt", "rgb24", "-"], stdout=subprocess.PIPE)
    assert proc.stdout is not None
    size = W * H * 3
    while True:
        buf = proc.stdout.read(size)
        if len(buf) < size:
            break
        yield np.frombuffer(buf, np.uint8).reshape(H, W, 3)
    proc.stdout.close()
    proc.wait()


state = [np.zeros([1, 1, 1, 1], np.float32) for _ in range(4)]
downsample = np.array([ratio], np.float32)


def alpha_of(img):
    global state
    src = (img.astype(np.float32) / 255.0).transpose(2, 0, 1)[None]
    _, pha, *state = session.run(None, {
        "src": src, "r1i": state[0], "r2i": state[1], "r3i": state[2], "r4i": state[3],
        "downsample_ratio": downsample})
    return pha[0, 0]


for i, img in enumerate(frames()):
    if i >= WARMUP:
        break
    alpha_of(img)

started = time.time()
x0, y0, x1, y1 = W, H, 0, 0
count = 0
for i, img in enumerate(frames()):
    a8 = (np.clip(alpha_of(img), 0, 1) * 255 + 0.5).astype(np.uint8)
    Image.fromarray(a8, "L").save(os.path.join(out_dir, f"a_{i:04d}.png"))
    ys, xs = np.nonzero(a8 > 6)
    if len(xs):
        x0, x1 = min(x0, int(xs.min())), max(x1, int(xs.max()))
        y0, y1 = min(y0, int(ys.min())), max(y1, int(ys.max()))
    count += 1
    if i % 24 == 0:
        print(f"frame {i}  ({time.time() - started:.0f}s)", flush=True)

meta = {"width": W, "height": H, "frames": count, "bbox": [x0, y0, x1, y1]}
with open(os.path.join(out_dir, "meta.json"), "w") as f:
    json.dump(meta, f)
print("done", meta)
