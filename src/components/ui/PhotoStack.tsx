import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import type { GalleryItem } from "@/data/portfolio";
import usePageVisible from "@/hooks/usePageVisible";

// Resting tilt/offset for the cards behind the top one
const restingTilt = [
  { rotate: -2, x: 0, y: 0 },
  { rotate: 5, x: 18, y: 10 },
  { rotate: -7, x: -16, y: 18 },
  { rotate: 9, x: 26, y: 26 },
];

/** Stack of tilted photo cards; the top card cycles to the back on a timer or click. */
export default function PhotoStack({
  items,
  interval = 3500,
}: {
  items: GalleryItem[];
  interval?: number;
}) {
  const reduced = useReducedMotion();
  const visible = usePageVisible();
  const [top, setTop] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = () => setTop((t) => (t + 1) % items.length);

  useEffect(() => {
    if (reduced || paused || !visible || items.length < 2) return;
    const id = setInterval(next, interval);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced, paused, visible, items.length, interval]);

  if (items.length === 0) return null;

  return (
    <button
      type="button"
      onClick={next}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-label="Show next photo"
      className="relative block w-[min(320px,78vw)] aspect-[4/5] mx-auto lg:mx-0 cursor-pointer"
    >
      {items.map((item, i) => {
        // depth 0 = top card
        const depth = (i - top + items.length) % items.length;
        const tilt = restingTilt[Math.min(depth, restingTilt.length - 1)];
        const hidden = depth >= restingTilt.length;
        return (
          <motion.div
            key={item.src}
            className="absolute inset-0 rounded-2xl overflow-hidden border border-border bg-surface-2 shadow-xl"
            style={{ zIndex: items.length - depth }}
            initial={false}
            animate={{
              rotate: tilt.rotate,
              x: tilt.x,
              y: tilt.y,
              scale: 1 - depth * 0.04,
              opacity: hidden ? 0 : 1,
            }}
            transition={
              reduced
                ? { duration: 0 }
                : { type: "spring", stiffness: 220, damping: 26 }
            }
          >
            <img
              src={item.src}
              alt={depth === 0 ? item.alt : ""}
              loading="lazy"
              draggable={false}
              className="w-full h-full object-cover"
            />
          </motion.div>
        );
      })}
    </button>
  );
}
