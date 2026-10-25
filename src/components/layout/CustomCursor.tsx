import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [hovering, setHovering] = useState(false);
  const rafRef = useRef<number | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const ringPosRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Only on hover+fine pointer devices
    const fineHover = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!fineHover.matches) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    setActive(true);

    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
      }
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("a, button, [data-cursor='hover']") ||
        target.tagName === "A" ||
        target.tagName === "BUTTON"
      ) {
        setHovering(true);
      } else if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA"
      ) {
        setHovering(false);
      } else {
        setHovering(false);
      }
    };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const tick = () => {
      ringPosRef.current.x = lerp(
        ringPosRef.current.x,
        mouseRef.current.x,
        0.15
      );
      ringPosRef.current.y = lerp(
        ringPosRef.current.y,
        mouseRef.current.y,
        0.15
      );
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringPosRef.current.x}px, ${ringPosRef.current.y}px) translate(-50%, -50%)`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    ringPosRef.current = { ...mouseRef.current };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  if (!active) return null;

  return (
    <>
      <style>{`* { cursor: none !important; }`}</style>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[200] pointer-events-none w-2 h-2 rounded-full bg-accent"
        style={{ transform: "translate(-50%, -50%)" }}
        aria-hidden="true"
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[200] pointer-events-none rounded-full border border-accent transition-[width,height,background-color] duration-200"
        style={{
          width: hovering ? "52px" : "32px",
          height: hovering ? "52px" : "32px",
          backgroundColor: hovering ? "var(--accent-soft)" : "transparent",
          transform: "translate(-50%, -50%)",
        }}
        aria-hidden="true"
      />
    </>
  );
}
