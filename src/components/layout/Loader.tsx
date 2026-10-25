import { useEffect, useRef, useState } from "react";

interface DisplayLine {
  text: string;
  isPrompt: boolean;
  progress?: number;
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

// Edit this to change loader duration (ms). The animation auto-fills to fill this time.
const LOADER_DURATION_MS = 2000;

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [lines, setLines] = useState<DisplayLine[]>([]);
  const [exiting, setExiting] = useState(false);
  const [progress, setProgress] = useState(0);
  const completedRef = useRef(false);
  const cancelledRef = useRef(false);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduced) {
      onComplete();
      return;
    }

    try {
      if (sessionStorage.getItem("loader-seen")) {
        onComplete();
        return;
      }
    } catch {
      // ignore
    }

    const finish = () => {
      if (completedRef.current) return;
      completedRef.current = true;
      setProgress(100);
      setExiting(true);
      setTimeout(() => onComplete(), 400);
    };

    const skip = () => finish();
    window.addEventListener("keydown", skip, { once: true });
    window.addEventListener("click", skip, { once: true });

    // Overall progress bar that fills over LOADER_DURATION_MS
    const progressStart = performance.now();
    const progressRaf = setInterval(() => {
      if (cancelledRef.current) return;
      const elapsed = performance.now() - progressStart;
      const pct = Math.min(100, (elapsed / LOADER_DURATION_MS) * 100);
      setProgress(pct);
      if (pct >= 100) clearInterval(progressRaf);
    }, 30);

    const typeText = async (
      text: string,
      speed: number,
      onChar: (partial: string) => void
    ) => {
      for (let i = 1; i <= text.length; i++) {
        if (cancelledRef.current) return;
        onChar(text.slice(0, i));
        await sleep(speed);
      }
    };

    // Distribute the typing across the first ~60% of LOADER_DURATION_MS
    const typingBudget = LOADER_DURATION_MS * 0.6;
    const totalChars = "> whoami".length + "> loading portfolio...".length;
    const charSpeed = Math.max(20, Math.floor(typingBudget / totalChars));

    const run = async () => {
      await sleep(150);

      // Line 1: type prompt
      setLines([{ text: "", isPrompt: true }]);
      await typeText("> whoami", charSpeed, (partial) =>
        setLines((prev) => [{ ...prev[0], text: partial }])
      );

      await sleep(150);
      // Output
      setLines((prev) => [
        ...prev,
        { text: "jatin_bhojwani", isPrompt: false },
      ]);

      await sleep(200);
      // Line 2: type prompt
      setLines((prev) => [
        ...prev,
        { text: "", isPrompt: true, progress: 0 },
      ]);
      await typeText("> loading portfolio...", charSpeed, (partial) =>
        setLines((prev) => {
          const copy = [...prev];
          copy[copy.length - 1] = { ...copy[copy.length - 1], text: partial };
          return copy;
        })
      );

      // Wait for the overall progress to reach 100% then finish
      await sleep(LOADER_DURATION_MS * 0.35);
      finish();
    };

    // Safety timeout — always finish after LOADER_DURATION_MS + buffer
    const safety = setTimeout(finish, LOADER_DURATION_MS + 500);
    run();

    return () => {
      cancelledRef.current = true;
      clearInterval(progressRaf);
      clearTimeout(safety);
      window.removeEventListener("keydown", skip);
      window.removeEventListener("click", skip);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (exiting) {
      try {
        sessionStorage.setItem("loader-seen", "1");
      } catch {
        // ignore
      }
    }
  }, [exiting]);

  const filledBlocks = Math.floor(progress / 6.25);
  const emptyBlocks = 16 - filledBlocks;

  return (
    <div
      className={`fixed inset-0 z-[100] bg-bg flex items-center justify-center transition-transform duration-400 ${
        exiting ? "-translate-y-full" : "translate-y-0"
      }`}
      style={{
        transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      {/* Inspiring tech background pattern */}
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, var(--accent-soft) 0%, transparent 50%)",
        }}
      />

      {/* Terminal window */}
      <div className="relative font-mono text-sm md:text-base px-6 max-w-lg w-full">
        {/* Terminal frame */}
        <div className="rounded-xl border border-border bg-surface overflow-hidden shadow-2xl">
          {/* Title bar */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-surface-2">
            <span
              className="w-3 h-3 rounded-full"
              style={{ background: "#FF5F57" }}
            />
            <span
              className="w-3 h-3 rounded-full"
              style={{ background: "#FEBC2E" }}
            />
            <span
              className="w-3 h-3 rounded-full"
              style={{ background: "#28C840" }}
            />
            <span className="ml-2 text-xs text-text-muted">
              jatin@portfolio: ~
            </span>
          </div>

          {/* Terminal body */}
          <div className="p-5 min-h-[160px]">
            {lines.map((line, i) => {
              const isLast = i === lines.length - 1;
              return (
                <div
                  key={i}
                  className={
                    line.isPrompt
                      ? "text-accent mb-1"
                      : "text-accent-2 pl-4 mb-2"
                  }
                >
                  <span>{line.text}</span>
                  {line.isPrompt && isLast && (
                    <span
                      className="inline-block w-2 h-4 bg-accent ml-1 align-middle"
                      style={{ animation: "blink 1s step-end infinite" }}
                    />
                  )}
                </div>
              );
            })}

            {/* Progress bar at the bottom */}
            <div className="mt-6">
              <div className="flex items-center gap-2 text-xs text-text-muted">
                <span className="text-accent-2">[</span>
                <span className="text-accent">
                  {"".padEnd(filledBlocks, "\u2588")}
                </span>
                <span className="text-text-muted">
                  {"".padEnd(emptyBlocks, "\u2591")}
                </span>
                <span className="text-accent-2">]</span>
                <span className="ml-1">{Math.floor(progress)}%</span>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-4 text-center text-xs text-text-muted">
          building something great...
        </p>
      </div>
    </div>
  );
}
