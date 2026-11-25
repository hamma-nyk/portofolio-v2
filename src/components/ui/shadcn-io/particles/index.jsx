"use client";
import { useEffect, useRef } from "react";
import { cn } from "../../../../../lib/utils";

function hexToRgb(hex) {
  hex = hex.replace("#", "");
  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((char) => char + char)
      .join("");
  }
  const hexInt = parseInt(hex, 16);
  return [(hexInt >> 16) & 255, (hexInt >> 8) & 255, hexInt & 255];
}

export const Particles = ({
  className = "",
  quantity = 100,
  staticity = 50,
  ease = 50,
  size = 0.4,
  refresh = false,
  color = "#ffffff",
  vx = 0,
  vy = 0,
}) => {
  const canvasRef = useRef(null);
  const canvasContainerRef = useRef(null);
  const context = useRef(null);
  const circles = useRef([]);
  const mouse = useRef({ x: 0, y: 0 });
  const canvasSize = useRef({ w: 0, h: 0 });
  const rafId = useRef(null);

  // Cap DPR at 1.5 so high-DPI mobile screens don't multiply GPU fill-rate by 9x
  const dpr =
    typeof window !== "undefined"
      ? Math.min(window.devicePixelRatio || 1, 1.5)
      : 1;

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = canvasContainerRef.current;
    if (!canvas || !container) return;

    context.current = canvas.getContext("2d");
    const rgb = hexToRgb(color);
    const rgbString = rgb.join(", ");

    const circleParams = () => {
      const x = Math.floor(Math.random() * canvasSize.current.w);
      const y = Math.floor(Math.random() * canvasSize.current.h);
      const pSize = Math.floor(Math.random() * 2) + size;
      const targetAlpha = parseFloat((Math.random() * 0.6 + 0.1).toFixed(1));
      const dx = (Math.random() - 0.5) * 0.1;
      const dy = (Math.random() - 0.5) * 0.1;
      const magnetism = 0.1 + Math.random() * 4;
      return {
        x,
        y,
        translateX: 0,
        translateY: 0,
        size: pSize,
        alpha: 0,
        targetAlpha,
        dx,
        dy,
        magnetism,
      };
    };

    const drawCircle = (circle, update = false) => {
      const ctx = context.current;
      if (!ctx) return;
      const { x, y, translateX, translateY, size: cSize, alpha } = circle;
      ctx.translate(translateX, translateY);
      ctx.beginPath();
      ctx.arc(x, y, cSize, 0, 2 * Math.PI);
      ctx.fillStyle = `rgba(${rgbString}, ${alpha})`;
      ctx.fill();
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (!update) {
        circles.current.push(circle);
      }
    };

    const clearContext = () => {
      if (context.current) {
        context.current.clearRect(
          0,
          0,
          canvasSize.current.w,
          canvasSize.current.h,
        );
      }
    };

    const resizeCanvas = () => {
      circles.current.length = 0;
      canvasSize.current.w = container.offsetWidth;
      canvasSize.current.h = container.offsetHeight;
      canvas.width = canvasSize.current.w * dpr;
      canvas.height = canvasSize.current.h * dpr;
      canvas.style.width = `${canvasSize.current.w}px`;
      canvas.style.height = `${canvasSize.current.h}px`;
      context.current.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const drawParticles = () => {
      clearContext();
      const effectiveCount =
        window.innerWidth < 768 ? Math.min(quantity, 20) : quantity;
      for (let i = 0; i < effectiveCount; i++) {
        drawCircle(circleParams());
      }
    };

    const initCanvas = () => {
      resizeCanvas();
      drawParticles();
    };

    const handleMouseMove = (event) => {
      const rect = canvas.getBoundingClientRect();
      const { w, h } = canvasSize.current;
      const x = event.clientX - rect.left - w / 2;
      const y = event.clientY - rect.top - h / 2;
      if (x < w / 2 && x > -w / 2 && y < h / 2 && y > -h / 2) {
        mouse.current.x = x;
        mouse.current.y = y;
      }
    };

    const remapValue = (value, start1, end1, start2, end2) => {
      const remapped =
        ((value - start1) * (end2 - start2)) / (end1 - start1) + start2;
      return remapped > 0 ? remapped : 0;
    };

    const animate = () => {
      if (!document.hidden) {
        clearContext();
        const list = circles.current;
        for (let i = list.length - 1; i >= 0; i--) {
          const circle = list[i];
          const closestEdge = Math.min(
            circle.x + circle.translateX - circle.size,
            canvasSize.current.w - circle.x - circle.translateX - circle.size,
            circle.y + circle.translateY - circle.size,
            canvasSize.current.h - circle.y - circle.translateY - circle.size,
          );
          const remapClosestEdge = parseFloat(
            remapValue(closestEdge, 0, 20, 0, 1).toFixed(2),
          );
          if (remapClosestEdge > 1) {
            circle.alpha = Math.min(circle.alpha + 0.02, circle.targetAlpha);
          } else {
            circle.alpha = circle.targetAlpha * remapClosestEdge;
          }
          circle.x += circle.dx + vx;
          circle.y += circle.dy + vy;
          circle.translateX +=
            (mouse.current.x / (staticity / circle.magnetism) -
              circle.translateX) /
            ease;
          circle.translateY +=
            (mouse.current.y / (staticity / circle.magnetism) -
              circle.translateY) /
            ease;

          drawCircle(circle, true);

          if (
            circle.x < -circle.size ||
            circle.x > canvasSize.current.w + circle.size ||
            circle.y < -circle.size ||
            circle.y > canvasSize.current.h + circle.size
          ) {
            list.splice(i, 1);
            drawCircle(circleParams());
          }
        }
      }
      rafId.current = window.requestAnimationFrame(animate);
    };

    initCanvas();
    rafId.current = window.requestAnimationFrame(animate);

    window.addEventListener("resize", initCanvas, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      if (rafId.current) {
        window.cancelAnimationFrame(rafId.current);
      }
      window.removeEventListener("resize", initCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [color, dpr, ease, quantity, refresh, size, staticity, vx, vy]);

  return (
    <div
      className={cn("pointer-events-none", className)}
      ref={canvasContainerRef}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="size-full" />
    </div>
  );
};

Particles.displayName = "Particles";
