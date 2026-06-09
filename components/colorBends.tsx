"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const VERT = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const FRAG = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2  uResolution;
  uniform vec3  uBlue;
  uniform vec3  uBlue2;
  uniform vec3  uPurple;
  uniform vec3  uOrange;

  void main() {
    vec2 uv = vUv;
    float aspect = uResolution.x / max(uResolution.y, 1.0);
    vec2 p = vec2(uv.x * aspect, uv.y);
    float t = uTime * 0.06;

    // domain warp -> the "bends"
    float w = 0.0;
    w += sin(p.x * 2.4 + t * 1.3);
    w += sin(p.y * 3.0 - t * 1.0);
    w += sin((p.x + p.y) * 1.8 + t * 1.6);
    w *= 0.33;

    float g = uv.y + 0.28 * sin(uv.x * 2.6 + t) + w * 0.45;

    vec3 col = mix(uBlue, uPurple, smoothstep(0.0, 0.55, g));
    col = mix(col, uBlue2, smoothstep(0.45, 1.05, g));

    float bands = sin((uv.y + w * 0.6) * 9.0 + t * 2.0) * 0.5 + 0.5;
    col += (uPurple - uBlue) * bands * 0.10;

    vec2 gp = vec2(0.82 + 0.04 * sin(t * 0.8), 0.18 + 0.03 * cos(t));
    float glow = smoothstep(0.65, 0.0, distance(uv, gp));
    col += uOrange * glow * 0.30;

    col *= 1.0 - 0.18 * smoothstep(0.4, 1.0, uv.y);

    gl_FragColor = vec4(col, 1.0);
  }
`;

const c = (hex: string) => new THREE.Color(hex).convertSRGBToLinear();

export default function ColorBends({ className }: { className?: string }) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduceMotion =
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
      powerPreference: "low-power",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);
    renderer.domElement.style.display = "block";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const uniforms = {
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(1, 1) },
      uBlue: { value: c("#170D63") },
      uBlue2: { value: c("#2E1A86") },
      uPurple: { value: c("#4D2D8D") },
      uOrange: { value: c("#FD533A") },
    };

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: VERT,
      fragmentShader: FRAG,
    });
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
    scene.add(mesh);

    const resize = () => {
      const w = mount.clientWidth || 1;
      const h = mount.clientHeight || 1;
      renderer.setSize(w, h, false);
      uniforms.uResolution.value.set(w, h);
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(mount);

    let raf = 0;
    const start = performance.now();

    const renderFrame = (now: number) => {
      uniforms.uTime.value = (now - start) / 1000;
      renderer.render(scene, camera);
      if (!reduceMotion) raf = requestAnimationFrame(renderFrame);
    };

    if (reduceMotion) {
      renderFrame(start);
    } else {
      raf = requestAnimationFrame(renderFrame);
    }

    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
      } else if (!reduceMotion) {
        raf = requestAnimationFrame(renderFrame);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("visibilitychange", onVisibility);
      ro.disconnect();
      mesh.geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      className={className ?? "pointer-events-none absolute inset-0 z-0 h-full w-full"}
    />
  );
}
