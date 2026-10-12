"""Step 2 of 2 — build the web assets the hero and ID card use.

Reads the source video plus the alpha frames from matte.py and writes:
  intro.mp4     stacked-alpha H.264 (premultiplied colour | 16px gap | alpha), with audio
  poster.webp   transparent first frame, shown until WebGL paints
  portrait.webp head-and-shoulders crop for the ID card photo

The crop is centred on the character's bounding box from meta.json.

usage: python compose.py <video.mp4> <alpha_dir> <out_dir> [portrait_frame=0]
"""
import json
import os
import subprocess
import sys

import numpy as np
from PIL import Image, ImageFilter

video, alpha_dir, out = sys.argv[1], sys.argv[2], sys.argv[3]
portrait_frame = int(sys.argv[4]) if len(sys.argv) > 4 else 0
GAP = 16  # must match GAP in src/components/HeroStage.tsx
os.makedirs(out, exist_ok=True)

meta = json.load(open(os.path.join(alpha_dir, "meta.json")))
W, H = meta["width"], meta["height"]
bx0, by0, bx1, by1 = meta["bbox"]
LUMA = np.array([0.2126, 0.7152, 0.0722], np.float32)

# Crop: character width plus margin, rounded up to a multiple of 16, kept inside the frame.
cw = min(W, int(np.ceil((bx1 - bx0 + 90) / 16) * 16))
cx = int(np.clip((bx0 + bx1) // 2 - cw // 2, 0, W - cw))
Hc = H - H % 2


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


def alpha(i):
    path = os.path.join(alpha_dir, f"a_{i:04d}.png")
    return np.asarray(Image.open(path)).astype(np.float32) / 255


def smoothstep(e0, e1, x):
    t = np.clip((x - e0) / (e1 - e0), 0, 1)
    return t * t * (3 - 2 * t)


# Smooth model of the studio background (vignette), fitted away from the character.
first = next(frames()).astype(np.float32)
yy, xx = np.mgrid[0:H, 0:W].astype(np.float32)
mask = (alpha(0) < 0.002) & ((xx < bx0 - 40) | (xx > bx1 + 40) | (yy < by0 - 10)) & (yy < H - 8)
X, Y = xx / W, yy / H
basis = np.stack([np.ones_like(X), X, Y, X * X, Y * Y, X * Y], -1)
A = basis[mask][::23]
B = np.zeros((H, W, 3), np.float32)
for c in range(3):
    coef, *_ = np.linalg.lstsq(A, first[..., c][mask][::23], rcond=None)
    B[..., c] = basis @ coef
Bc = B[:Hc, cx:cx + cw]
lumB = Bc @ LUMA
rows = np.arange(Hc, dtype=np.float32)[:, None]
shadow_zone = np.clip((rows - (by1 - 96)) / 50, 0, 1)  # floor shadow only, around the feet

encoder = subprocess.Popen([
    "ffmpeg", "-v", "error", "-y",
    "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", f"{cw}x{2 * Hc + GAP}", "-r", "24", "-i", "-",
    "-i", video, "-map", "0:v", "-map", "1:a?",
    "-vf", "scale=out_color_matrix=bt709:out_range=tv,format=yuv420p",
    "-color_primaries", "bt709", "-color_trc", "bt709", "-colorspace", "bt709",
    "-c:v", "libx264", "-preset", "slow", "-crf", "17", "-tune", "animation",
    "-profile:v", "high", "-movflags", "+faststart", "-c:a", "aac", "-b:a", "128k", "-shortest",
    os.path.join(out, "intro.mp4")], stdin=subprocess.PIPE)
assert encoder.stdin is not None

shadow = None
for i, img in enumerate(frames()):
    I = img[:Hc, cx:cx + cw].astype(np.float32)
    a = alpha(i)[:Hc, cx:cx + cw]
    # Premultiplied colour with the background spill removed: P = I - (1 - a) * B
    P = np.clip(I - (1 - a)[..., None] * Bc, 0, 255)
    s = smoothstep(0.02, 0.14, (lumB - I @ LUMA) / lumB) * shadow_zone
    s = np.asarray(Image.fromarray((s * 255).astype(np.uint8), "L").filter(
        ImageFilter.GaussianBlur(4))).astype(np.float32) / 255 * 0.85
    shadow = s if shadow is None else 0.65 * shadow + 0.35 * s  # damp flicker
    at = a + shadow * (1 - a)
    P = np.minimum(P, at[..., None] * 255)

    frame = np.zeros((2 * Hc + GAP, cw, 3), np.uint8)
    frame[:Hc] = (P + 0.5).astype(np.uint8)
    frame[Hc + GAP:] = (at[..., None] * 255 + 0.5).astype(np.uint8)
    encoder.stdin.write(frame.tobytes())

    if i == 0:
        rgb = np.where(at[..., None] > 0.002, P / np.maximum(at[..., None], 1e-4), 0)
        rgba = np.dstack([np.clip(rgb, 0, 255), at * 255]).astype(np.uint8)
        Image.fromarray(rgba, "RGBA").save(os.path.join(out, "poster.webp"), quality=92, method=6)
    if i == portrait_frame:
        tall = by1 - by0
        ph = int(tall * 0.46)
        pw = int(ph * 0.853)
        top = max(0, by0 - int(tall * 0.03))
        mid = (bx0 + bx1) // 2
        left = int(np.clip(mid - pw // 2, 0, W - pw))
        crop = img[top:top + ph, left:left + pw]
        Image.fromarray(crop).resize((512, 600), Image.Resampling.LANCZOS).save(
            os.path.join(out, "portrait.webp"), quality=90, method=6)

encoder.stdin.close()
encoder.wait()
print(f"wrote {out}/intro.mp4 ({cw}x{2 * Hc + GAP}), poster.webp, portrait.webp")
