import { useEffect, useRef } from "react";
import usePageVisible from "@/hooks/usePageVisible";

const GLYPH_TOKENS = [
  "NestJS",
  "RAG",
  "OCPP",
  "AWS",
  "Spring",
  "MCP",
  "React",
  "LangGraph",
  "vector",
  "embed",
  "agent",
  "prompt",
  "tensor",
  "neural",
  "fine-tune",
  "transformer",
  "tokenize",
  "inference",
  "pipeline",
  "scalar",
  "0x1F",
  "async",
  "await",
  "const",
  "lambda",
  "gradient",
  "softmax",
  "epoch",
  "loss",
  "weights",
];

interface Column {
  x: number;
  y: number;
  speed: number;
  chars: string[];
  charSize: number;
  alpha: number;
}

export default function CodeRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const columnsRef = useRef<Column[]>([]);
  const rafRef = useRef<number | null>(null);
  const lastSpawnRef = useRef(0);
  const lastFrameRef = useRef(0);
  const visible = usePageVisible();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize);

    const getAccentOpacity = () => {
      const isLight = document.documentElement.getAttribute("data-theme") === "light";
      return { base: isLight ? 0.28 : 0.18, lead: isLight ? 0.6 : 0.5 };
    };

    const getColor = () => {
      const isLight = document.documentElement.getAttribute("data-theme") === "light";
      if (isLight) {
        // Use accent-2 (teal) in light mode for better contrast against warm bg
        return getComputedStyle(document.documentElement)
          .getPropertyValue("--accent-2")
          .trim() || "#0F766E";
      }
      return getComputedStyle(document.documentElement)
        .getPropertyValue("--accent")
        .trim() || "#F2B25C";
    };

    const spawnColumn = () => {
      if (columnsRef.current.length >= 14) return;
      const w = window.innerWidth;
      const token = GLYPH_TOKENS[Math.floor(Math.random() * GLYPH_TOKENS.length)];
      const chars = token.split("");
      columnsRef.current.push({
        x: Math.random() * w,
        y: -20,
        speed: 40 + Math.random() * 50,
        chars,
        charSize: 16,
        alpha: 1,
      });
    };

    const draw = (timestamp: number) => {
      rafRef.current = requestAnimationFrame(draw);

      // 30fps cap
      if (timestamp - lastFrameRef.current < 1000 / 30) return;
      const dt = (timestamp - lastFrameRef.current) / 1000;
      lastFrameRef.current = timestamp;

      if (!visible) return;

      const h = window.innerHeight;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Spawn
      if (timestamp - lastSpawnRef.current > 1200 + Math.random() * 1300) {
        spawnColumn();
        lastSpawnRef.current = timestamp;
      }

      const opacities = getAccentOpacity();
      ctx.font = "13px 'JetBrains Mono', monospace";
      ctx.textAlign = "left";

      columnsRef.current = columnsRef.current.filter((col) => {
        col.y += col.speed * dt;

        // Fade as it approaches bottom
        const fadeStart = h * 0.7;
        if (col.y > fadeStart) {
          col.alpha = Math.max(0, 1 - (col.y - fadeStart) / (h - fadeStart));
        }

        const color = getColor();

        col.chars.forEach((ch, i) => {
          const charY = col.y - i * 16;
          if (charY < 0 || charY > h) return;
          const isLead = i === col.chars.length - 1;
          ctx.globalAlpha = col.alpha * (isLead ? opacities.lead : opacities.base);
          ctx.fillStyle = color;
          ctx.fillText(ch, col.x, charY);
        });

        return col.y - col.chars.length * 16 < h && col.alpha > 0.01;
      });

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
