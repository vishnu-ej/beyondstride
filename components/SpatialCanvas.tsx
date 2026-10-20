"use client";

import { useEffect, useRef } from "react";

interface Particle3D {
  x: number;
  y: number;
  z: number;
  ox: number;
  oy: number;
  oz: number;
  vx: number;
  vy: number;
  vz: number;
  size: number;
  alpha: number;
}

export default function SpatialCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse coordinates in normalized [-1, 1] range
    let mouse = { x: 0, y: 0, targetX: 0, targetY: 0, isActive: false };

    // Generate 3D point cloud arranged in subtle kinetic wave ribbons
    const count = 90;
    const particles: Particle3D[] = [];
    const depth = 800;

    for (let i = 0; i < count; i++) {
      const theta = (i / count) * Math.PI * 4;
      const radius = 250 + Math.sin(i * 0.3) * 120;
      const x = Math.cos(theta) * radius + (Math.random() - 0.5) * 80;
      const y = Math.sin(theta) * (radius * 0.55) + (Math.random() - 0.5) * 80;
      const z = (Math.random() - 0.5) * depth;

      particles.push({
        x,
        y,
        z,
        ox: x,
        oy: y,
        oz: z,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        vz: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2 + 1.2,
        alpha: Math.random() * 0.4 + 0.2,
      });
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = (e.clientX - width / 2) * 0.6;
      mouse.targetY = (e.clientY - height / 2) * 0.6;
      mouse.isActive = true;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);

    const fov = 400;
    let angleY = 0;
    let angleX = 0;

    const render = () => {
      // Smooth mouse interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      ctx.clearRect(0, 0, width, height);

      // Continuous subtle ambient 3D orbit
      angleY += 0.0018;
      angleX = Math.sin(angleY * 0.8) * 0.15 + (mouse.y / height) * 0.3;
      const cosY = Math.cos(angleY + (mouse.x / width) * 0.4);
      const sinY = Math.sin(angleY + (mouse.x / width) * 0.4);
      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);

      const cx = width / 2;
      const cy = height / 2;

      // Projected points storage for connecting kinetic vectors
      const projected: { x: number; y: number; z: number; alpha: number }[] = [];

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // 3D rotation math
        // Rotate around Y
        const x1 = p.x * cosY - p.z * sinY;
        const z1 = p.z * cosY + p.x * sinY;

        // Rotate around X
        const y2 = p.y * cosX - z1 * sinX;
        const z2 = z1 * cosX + p.y * sinX + depth * 0.85;

        if (z2 > 10) {
          const scale = fov / z2;
          const px = cx + x1 * scale;
          const py = cy + y2 * scale;

          projected.push({ x: px, y: py, z: z2, alpha: p.alpha });

          // Draw individual particle with soft glow
          const radius = Math.max(0.5, p.size * scale);
          const gradient = ctx.createRadialGradient(px, py, 0, px, py, radius * 3.5);
          gradient.addColorStop(0, `rgba(243, 179, 156, ${p.alpha * 0.85})`);
          gradient.addColorStop(0.5, `rgba(255, 90, 54, ${p.alpha * 0.3})`);
          gradient.addColorStop(1, "rgba(243, 179, 156, 0)");

          ctx.beginPath();
          ctx.arc(px, py, radius * 3.5, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.fill();

          ctx.beginPath();
          ctx.arc(px, py, radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(35, 31, 32, ${p.alpha * 0.4})`;
          ctx.fill();
        }

        // Kinetic floating drift
        p.x += p.vx;
        p.y += p.vy;
        p.z += p.vz;

        if (Math.abs(p.x - p.ox) > 50) p.vx *= -1;
        if (Math.abs(p.y - p.oy) > 50) p.vy *= -1;
        if (Math.abs(p.z - p.oz) > 50) p.vz *= -1;
      }

      // Connect proximate points with delicate kinetic force vectors
      ctx.lineWidth = 0.6;
      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const p1 = projected[i];
          const p2 = projected[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < 7200) {
            // ~85px threshold
            const alpha = (1 - Math.sqrt(distSq) / 85) * 0.16;
            ctx.strokeStyle = `rgba(217, 180, 168, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0 opacity-70"
      style={{ filter: "blur(0.2px)" }}
      aria-hidden="true"
    />
  );
}
