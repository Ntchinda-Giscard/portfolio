"use client";

import { useEffect, useRef, useState } from "react";
import type { Content } from "@/content/portfolio";
import { fill } from "@/lib/i18n";
import { cx } from "@/lib/utils";
import { Pause, Play, SoundOff, SoundOn } from "./ui";
import styles from "./Hero.module.css";

/**
 * The intro video is "stacked alpha": each frame holds the premultiplied colour
 * on top, GAP black rows, then the matte below. A tiny WebGL shader recombines
 * them so the character stands on the page with a transparent background in
 * every browser (Safari included), without a visible video rectangle.
 */
const GAP = 16;

const VERTEX = `
attribute vec2 a_pos;
varying vec2 v_uv;
void main() {
  v_uv = vec2(a_pos.x * 0.5 + 0.5, 0.5 - a_pos.y * 0.5);
  gl_Position = vec4(a_pos, 0.0, 1.0);
}`;

const FRAGMENT = `
precision mediump float;
uniform sampler2D u_tex;
uniform float u_half;
uniform float u_offset;
varying vec2 v_uv;
void main() {
  vec3 color = texture2D(u_tex, vec2(v_uv.x, v_uv.y * u_half)).rgb;
  float alpha = texture2D(u_tex, vec2(v_uv.x, u_offset + v_uv.y * u_half)).r;
  alpha = clamp((alpha - 0.03) / 0.94, 0.0, 1.0);
  gl_FragColor = vec4(min(color, vec3(alpha)), alpha);
}`;

type Props = { video: string; poster: string; name: string; labels: Content["hero"]["stage"] };

export default function HeroStage({ video: src, poster, name, labels }: Props) {
  const stageRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const userPaused = useRef(false);
  const [webgl, setWebgl] = useState(true);
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);

  // Render video frames into the canvas.
  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const gl = canvas?.getContext("webgl", { alpha: true, premultipliedAlpha: true, antialias: false });
    if (!video || !canvas || !gl) {
      setWebgl(false);
      return;
    }

    const program = gl.createProgram();
    for (const [type, source] of [
      [gl.VERTEX_SHADER, VERTEX],
      [gl.FRAGMENT_SHADER, FRAGMENT],
    ] as const) {
      const shader = gl.createShader(type);
      if (!shader) continue;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      gl.attachShader(program, shader);
    }
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      setWebgl(false);
      return;
    }
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const position = gl.getAttribLocation(program, "a_pos");
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    const uHalf = gl.getUniformLocation(program, "u_half");
    const uOffset = gl.getUniformLocation(program, "u_offset");

    let drawn = false;
    const draw = () => {
      if (video.readyState < 2 || !video.videoHeight) return;
      const total = video.videoHeight;
      const half = (total - GAP) / 2;
      gl.uniform1f(uHalf, half / total);
      gl.uniform1f(uOffset, (half + GAP) / total);
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, video);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      if (!drawn) {
        drawn = true;
        setReady(true);
      }
    };

    // Draw at the displayed size so the GPU does the only upscale.
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.round(canvas.clientWidth * dpr);
      const h = Math.round(canvas.clientHeight * dpr);
      if (w && h && (canvas.width !== w || canvas.height !== h)) {
        canvas.width = w;
        canvas.height = h;
        draw();
      }
    };
    const sizeObserver = new ResizeObserver(resize);
    sizeObserver.observe(canvas);
    resize();

    let raf = 0;
    let frameRequest = 0;
    const perFrame = "requestVideoFrameCallback" in video;
    const onVideoFrame = () => {
      draw();
      frameRequest = video.requestVideoFrameCallback(onVideoFrame);
    };
    const onAnimationFrame = () => {
      if (!video.paused) draw();
      raf = requestAnimationFrame(onAnimationFrame);
    };
    if (perFrame) frameRequest = video.requestVideoFrameCallback(onVideoFrame);
    else raf = requestAnimationFrame(onAnimationFrame);

    const onLost = (e: Event) => {
      e.preventDefault();
      setWebgl(false);
    };
    video.addEventListener("loadeddata", draw);
    video.addEventListener("seeked", draw);
    canvas.addEventListener("webglcontextlost", onLost);

    return () => {
      sizeObserver.disconnect();
      cancelAnimationFrame(raf);
      if (perFrame) video.cancelVideoFrameCallback(frameRequest);
      video.removeEventListener("loadeddata", draw);
      video.removeEventListener("seeked", draw);
      canvas.removeEventListener("webglcontextlost", onLost);
      gl.deleteTexture(texture);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
    };
  }, []);

  // Playback: loop silently while the hero is on screen.
  useEffect(() => {
    const video = videoRef.current;
    const stage = stageRef.current;
    if (!video || !stage) return;

    video.muted = true;
    const sync = () => setPlaying(!video.paused);
    // After a narrated run (sound on, no loop) finishes, fall back to the silent loop.
    const onEnded = () => {
      video.muted = true;
      video.loop = true;
      setMuted(true);
      video.currentTime = 0;
      video.play().catch(() => undefined);
    };
    video.addEventListener("play", sync);
    video.addEventListener("pause", sync);
    video.addEventListener("ended", onEnded);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) userPaused.current = true;

    const visibility = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!userPaused.current) video.play().catch(() => setPlaying(false));
        } else if (video.muted) {
          video.pause();
        }
      },
      { threshold: 0.05 },
    );
    visibility.observe(stage);

    return () => {
      visibility.disconnect();
      video.removeEventListener("play", sync);
      video.removeEventListener("pause", sync);
      video.removeEventListener("ended", onEnded);
      // Routes stay mounted but hidden after navigation; don't keep playing (or talking) offstage.
      video.pause();
    };
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      userPaused.current = false;
      video.play().catch(() => undefined);
    } else {
      userPaused.current = true;
      video.pause();
    }
  };

  const toggleSound = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.muted) {
      // Play the intro once from the top with sound.
      video.muted = false;
      video.loop = false;
      video.currentTime = 0;
      userPaused.current = false;
      video.play().catch(() => undefined);
      setMuted(false);
    } else {
      video.muted = true;
      video.loop = true;
      setMuted(true);
    }
  };

  return (
    <div ref={stageRef} className={cx(styles.stage, webgl && ready && styles.ready)}>
      <div className={styles.figure}>
        {/* eslint-disable-next-line @next/next/no-img-element -- pre-sized transparent first frame, shown until WebGL paints */}
        <img className={styles.poster} src={poster} alt={fill(labels.posterAlt, { name })} fetchPriority="high" />
        <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />
        <video
          ref={videoRef}
          className={styles.video}
          src={src}
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          tabIndex={-1}
        />
      </div>

      {webgl && (
        <div className={styles.controls}>
          <button
            type="button"
            className={styles.control}
            onClick={togglePlay}
            aria-label={playing ? labels.pause : labels.play}
            data-label={playing ? labels.pauseShort : labels.playShort}
          >
            {playing ? <Pause /> : <Play />}
          </button>
          <button
            type="button"
            className={cx(styles.control, styles.controlLight)}
            onClick={toggleSound}
            aria-pressed={!muted}
            aria-label={muted ? labels.soundOn : labels.soundOff}
            data-label={muted ? labels.soundOnShort : labels.soundOffShort}
          >
            {muted ? <SoundOff /> : <SoundOn />}
          </button>
        </div>
      )}
    </div>
  );
}
