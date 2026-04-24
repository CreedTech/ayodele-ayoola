"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function IsometricCubes() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    const el = mountRef.current;

    // Scene
    const scene  = new THREE.Scene();
    const w = el.clientWidth, h = el.clientHeight;

    // Orthographic camera for isometric look
    const aspect = w / h;
    const zoom   = 3.2;
    const camera = new THREE.OrthographicCamera(
      -aspect * zoom, aspect * zoom, zoom, -zoom, 0.1, 1000
    );
    camera.position.set(5, 5, 5);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(w, h);
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);

    // Wire material
    const wireMat = new THREE.LineBasicMaterial({
      color: 0x2a2a2a,
      transparent: true,
      opacity: 0.85,
    });

    // Dot material
    const dotMat = new THREE.PointsMaterial({
      color: 0x22c55e,
      size: 0.055,
      transparent: true,
      opacity: 0.9,
    });

    // Build a wireframe cube group
    function makeCube(size: number, position: [number,number,number]) {
      const geo    = new THREE.BoxGeometry(size, size, size);
      const edges  = new THREE.EdgesGeometry(geo);
      const lines  = new THREE.LineSegments(edges, wireMat.clone());
      lines.position.set(...position);

      // Vertex dots
      const verts = new Float32Array(geo.attributes.position.array);
      const ptGeo = new THREE.BufferGeometry();
      ptGeo.setAttribute("position", new THREE.BufferAttribute(verts, 3));
      const pts = new THREE.Points(ptGeo, dotMat.clone());
      pts.position.set(...position);

      return { lines, pts };
    }

    const cubes = [
      makeCube(2.0,  [0,   0,   0]),
      makeCube(1.35, [0.6, 0.6, 0.6]),
      makeCube(0.8,  [1.0, 1.0, 1.0]),
      makeCube(2.6,  [-0.3,-0.3,-0.3]),
    ];

    cubes.forEach(({ lines, pts }) => {
      scene.add(lines);
      scene.add(pts);
    });

    // Subtle ambient glow
    const ambLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambLight);

    // Mouse influence
    let targetRX = 0, targetRY = 0, curRX = 0, curRY = 0;
    const onMouse = (e: MouseEvent) => {
      targetRX = (e.clientY / window.innerHeight - 0.5) * 0.3;
      targetRY = (e.clientX / window.innerWidth  - 0.5) * 0.3;
    };
    window.addEventListener("mousemove", onMouse);

    // Resize
    const onResize = () => {
      const nw = el.clientWidth, nh = el.clientHeight;
      const na = nw / nh;
      (camera as THREE.OrthographicCamera).left  = -na * zoom;
      (camera as THREE.OrthographicCamera).right =  na * zoom;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    window.addEventListener("resize", onResize);

    // Animation loop
    let frame = 0;
    const animate = () => {
      frame++;
      // const raf = requestAnimationFrame(animate);

      // Slow auto-rotation
      const t = frame * 0.004;
      cubes.forEach(({ lines, pts }) => {
        lines.rotation.y = t;
        lines.rotation.x = t * 0.4;
        pts.rotation.y   = t;
        pts.rotation.x   = t * 0.4;
      });

      // Mouse parallax
      curRX += (targetRX - curRX) * 0.04;
      curRY += (targetRY - curRY) * 0.04;
      scene.rotation.x = curRX;
      scene.rotation.y = curRY;

      renderer.render(scene, camera);
    };
    const rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position: "absolute",
        top: 0, right: 0,
        width: "52%", height: "100%",
        pointerEvents: "none",
      }}
    />
  );
}
