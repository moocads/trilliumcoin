"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const VERT = /* glsl */ `
  uniform float uTime;
  varying float vH;
  varying float vDist;
  void main() {
    vec3 p = position;
    float h =
      sin(p.x * 0.35 + uTime * 0.9) * 0.9 +
      cos(p.y * 0.45 + uTime * 0.7) * 0.7 +
      sin((p.x + p.y) * 0.22 - uTime * 0.5) * 0.5;
    p.z += h;
    vH = h;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    vDist = -mv.z;
    gl_Position = projectionMatrix * mv;
  }
`;

const FRAG = /* glsl */ `
  precision highp float;
  uniform vec3 uBlue;
  uniform vec3 uOrange;
  varying float vH;
  varying float vDist;
  void main() {
    float crest = smoothstep(0.2, 1.6, vH);
    vec3 col = mix(uBlue, uOrange, crest * 0.55);
    // depth fade into the deep-blue background
    float fade = 1.0 - smoothstep(10.0, 34.0, vDist);
    gl_FragColor = vec4(col, fade);
  }
`;

const c = (hex: string) => new THREE.Color(hex).convertSRGBToLinear();

export default function GridWaves({ className }: { className?: string }) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduceMotion = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "low-power",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);
    renderer.domElement.style.display = "block";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 100);
    camera.position.set(0, 7, 16);
    camera.lookAt(0, -1, -8);

    const uniforms = {
      uTime: { value: 0 },
      uBlue: { value: c("#2A3A87") },
      uOrange: { value: c("#FD533A") },
    };

    const geometry = new THREE.PlaneGeometry(120, 120, 80, 80);
    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: VERT,
      fragmentShader: FRAG,
      wireframe: true,
      transparent: true,
      depthWrite: false,
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.x = -Math.PI / 2;
    scene.add(mesh);

    const resize = () => {
      const w = mount.clientWidth || 1;
      const h = mount.clientHeight || 1;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
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
      geometry.dispose();
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
