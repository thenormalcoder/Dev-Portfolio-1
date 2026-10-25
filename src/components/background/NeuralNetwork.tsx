import { useEffect, useRef } from "react";
import usePageVisible from "@/hooks/usePageVisible";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  pulse: number;
}

const NODE_COUNT = 55;
const MAX_DIST = 160;
const SPEED = 0.25;

export default function NeuralNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<Node[]>([]);
  const rafRef = useRef<number | null>(null);
  const lastFrameRef = useRef(0);
  const visible = usePageVisible();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const initNodes = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const count = Math.min(
        NODE_COUNT,
        Math.max(20, Math.floor((w * h) / 25000))
      );
      nodesRef.current = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * SPEED,
        vy: (Math.random() - 0.5) * SPEED,
        pulse: Math.random() * Math.PI * 2,
      }));
    };

    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      initNodes();
    };

    resize();
    window.addEventListener("resize", resize);

    const getColors = () => {
      const isLight =
        document.documentElement.getAttribute("data-theme") === "light";
      const accent = getComputedStyle(document.documentElement)
        .getPropertyValue("--accent")
        .trim() || "#F2B25C";
      const accent2 = getComputedStyle(document.documentElement)
        .getPropertyValue("--accent-2")
        .trim() || "#5EC4B6";
      return {
        nodeColor: isLight ? accent2 : accent,
        lineColor: isLight ? accent2 : accent,
        nodeAlpha: isLight ? 0.55 : 0.45,
        lineAlphaBase: isLight ? 0.18 : 0.12,
        lineAlphaMax: isLight ? 0.45 : 0.3,
      };
    };

    const draw = (timestamp: number) => {
      rafRef.current = requestAnimationFrame(draw);

      if (timestamp - lastFrameRef.current < 1000 / 30) return;
      const dt = (timestamp - lastFrameRef.current) / 1000;
      lastFrameRef.current = timestamp;

      if (!visible) return;

      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);

      const colors = getColors();
      const nodes = nodesRef.current;

      // Update positions
      for (const node of nodes) {
        node.x += node.vx * dt * 60;
        node.y += node.vy * dt * 60;
        node.pulse += dt * 2;

        // Bounce off edges
        if (node.x < 0 || node.x > w) node.vx *= -1;
        if (node.y < 0 || node.y > h) node.vy *= -1;
        node.x = Math.max(0, Math.min(w, node.x));
        node.y = Math.max(0, Math.min(h, node.y));
      }

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist >= MAX_DIST) continue;

          const t = 1 - dist / MAX_DIST;
          ctx.globalAlpha =
            colors.lineAlphaBase +
            t * (colors.lineAlphaMax - colors.lineAlphaBase);
          ctx.strokeStyle = colors.lineColor;
          ctx.lineWidth = 0.7;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.stroke();
        }
      }

      // Draw nodes
      for (const node of nodes) {
        const pulseScale = 1 + Math.sin(node.pulse) * 0.3;
        const radius = 2 * pulseScale;
        ctx.globalAlpha = colors.nodeAlpha;
        ctx.fillStyle = colors.nodeColor;
        ctx.beginPath();
        ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
        ctx.fill();

        // Soft glow
        ctx.globalAlpha = colors.nodeAlpha * 0.25;
        ctx.beginPath();
        ctx.arc(node.x, node.y, radius * 3, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [visible]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none"
      aria-hidden="true"
    />
  );
}
