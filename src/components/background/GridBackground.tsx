import { useEffect, useRef } from "react";

export default function GridBackground() {
  const spotlightRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const targetRef = useRef({ x: 0.5, y: 0.3 });
  const currentRef = useRef({ x: 0.5, y: 0.3 });

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const isTouch = window.matchMedia("(hover: none)").matches;
    if (isTouch) return;

    const onMove = (e: MouseEvent) => {
      targetRef.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      };
    };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const tick = () => {
      currentRef.current.x = lerp(currentRef.current.x, targetRef.current.x, 0.08);
      currentRef.current.y = lerp(currentRef.current.y, targetRef.current.y, 0.08);
      if (spotlightRef.current) {
        spotlightRef.current.style.left = `${currentRef.current.x * 100}%`;
        spotlightRef.current.style.top = `${currentRef.current.y * 100}%`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 -z-10 pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      {/* Grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          animation: "grid-drift 20s linear infinite",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 40%, black 30%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 60% at 50% 40%, black 30%, transparent 100%)",
        }}
      />

      {/* Spotlight */}
      <div
        ref={spotlightRef}
        className="absolute w-[500px] h-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full transition-none"
        style={{
          background:
            "radial-gradient(circle, var(--accent-soft) 0%, transparent 70%)",
          left: "50%",
          top: "30%",
        }}
      />
    </div>
  );
}
