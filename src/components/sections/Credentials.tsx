import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import {
  Trophy,
  Rocket,
  Award,
  Sparkles,
  ExternalLink,
  X,
} from "lucide-react";
import { SiCodechef, SiCodeforces } from "react-icons/si";
import {
  certifications,
  certificateImages,
  achievements,
  codingProfiles,
  isPlaceholder,
  type Achievement,
  type CertificateImage,
  type CodingProfile,
} from "@/data/portfolio";
import SectionHeading from "@/components/layout/SectionHeading";

const achievementIcons: Record<
  Achievement["icon"],
  typeof Trophy
> = {
  trophy: Trophy,
  rocket: Rocket,
  award: Award,
  google: Sparkles,
};

function Certifications() {
  return (
    <div className="grid sm:grid-cols-2 gap-5">
      {certifications.map((cert) => {
        const showVerify = !isPlaceholder(cert.url);
        const initial = cert.issuer.charAt(0).toUpperCase();
        return (
          <div
            key={cert.name}
            className="rounded-2xl bg-surface border border-border p-5 flex items-start gap-4 hover:border-accent/40 hover:-translate-y-1 transition-all duration-200"
          >
            {/* Gradient circle with initial */}
            <div
              className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-heading font-bold text-bg"
              style={{
                background:
                  "linear-gradient(135deg, var(--accent), var(--accent-2))",
              }}
            >
              {initial}
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="font-heading text-sm font-semibold text-text leading-snug">
                {cert.name}
              </h3>
              <p className="mt-1 text-xs text-text-muted">{cert.issuer}</p>
              {showVerify && (
                <a
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1 font-mono text-xs text-accent hover:opacity-80 transition-opacity"
                >
                  Verify <ExternalLink size={12} />
                </a>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

const certTilts = [-3, 2, -1.5, 3, -2.5, 1.5, -2];

function CertificateMarquee() {
  const reduced = useReducedMotion();
  const [open, setOpen] = useState<CertificateImage | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Repeat short lists so each half of the track is wider than the screen,
  // then render it twice so the -50% translate loops seamlessly
  const reps = Math.ceil(8 / certificateImages.length);
  const half = Array.from({ length: reps }, () => certificateImages).flat();
  const loop = reduced ? certificateImages : [...half, ...half];

  return (
    <>
      <div
        className={`group/marquee relative -mx-5 md:-mx-8 py-6 ${
          reduced ? "overflow-x-auto" : "overflow-hidden"
        }`}
        style={{
          maskImage:
            "linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent)",
        }}
      >
        <div
          className="flex w-max gap-6 px-5 md:px-8 group-hover/marquee:[animation-play-state:paused]"
          style={reduced ? undefined : { animation: "cert-marquee 45s linear infinite" }}
        >
          {loop.map((cert, i) => (
            <button
              key={`${cert.src}-${i}`}
              type="button"
              onClick={() => setOpen(cert)}
              aria-label={`View certificate: ${cert.title}`}
              aria-hidden={i >= certificateImages.length ? true : undefined}
              tabIndex={i >= certificateImages.length ? -1 : undefined}
              className="shrink-0 w-64 md:w-72"
              style={{ rotate: `${certTilts[i % certTilts.length]}deg` }}
            >
              <div
                className="rounded-xl overflow-hidden border border-border bg-white shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                style={
                  reduced
                    ? undefined
                    : {
                        animation: `float-up ${5 + (i % 3)}s ease-in-out ${(i % 4) * 0.6}s infinite`,
                      }
                }
              >
                <img
                  src={cert.src}
                  alt={cert.title}
                  loading="lazy"
                  draggable={false}
                  className="w-full aspect-[4/3] object-contain"
                />
              </div>
            </button>
          ))}
        </div>
      </div>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={open.title}
          onClick={() => setOpen(null)}
          className="fixed inset-0 z-[150] flex flex-col items-center justify-center gap-4 p-5 bg-bg/85 backdrop-blur-sm"
        >
          <img
            src={open.src}
            alt={open.title}
            className="max-w-full max-h-[80vh] rounded-xl border border-border bg-white shadow-2xl"
          />
          <p className="font-mono text-sm text-text text-center">{open.title}</p>
          <button
            type="button"
            onClick={() => setOpen(null)}
            className="absolute top-5 right-5 inline-flex items-center justify-center w-10 h-10 rounded-lg border border-border bg-surface text-text-muted hover:text-accent hover:border-accent transition-colors"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>
      )}
    </>
  );
}

function Achievements() {
  return (
    <div className="rounded-2xl bg-surface-2 border border-border overflow-hidden">
      {/* CodeCard-style header bar */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
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
        <span className="ml-2 font-mono text-xs text-text-muted">
          achievements.ts
        </span>
      </div>

      <div className="p-5 md:p-6">
        <div className="grid md:grid-cols-2 gap-4">
          {achievements.map((achievement) => {
            const Icon = achievementIcons[achievement.icon];
            return (
              <div
                key={achievement.title}
                className="flex items-start gap-4 p-4 rounded-xl border border-border bg-surface hover:border-accent/40 transition-colors"
              >
                <div
                  className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ background: "var(--accent-soft)" }}
                >
                  <Icon size={18} className="text-accent" />
                </div>
                <div>
                  <h3 className="font-heading text-sm font-semibold text-text leading-snug">
                    {achievement.title}
                  </h3>
                  <p className="mt-1 text-xs text-text-muted leading-relaxed">
                    {achievement.detail}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function CountUpNumber({
  value,
  active,
}: {
  value: string;
  active: boolean;
}) {
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState(reduced ? value : "0");

  // Parse the numeric part and suffix
  const match = value.match(/^([\d.]+)(.*)$/);
  const targetNum = match ? parseFloat(match[1]) : 0;
  const suffix = match ? match[2] : "";

  useEffect(() => {
    if (reduced || !active) {
      setDisplay(value);
      return;
    }

    if (!match) {
      setDisplay(value);
      return;
    }

    let raf: number;
    const duration = 800;
    const start = performance.now();

    const animate = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = targetNum * eased;
      // Preserve decimal places from original
      const decimals = match[1].includes(".")
        ? match[1].split(".")[1].length
        : 0;
      setDisplay(`${current.toFixed(decimals)}${suffix}`);
      if (progress < 1) {
        raf = requestAnimationFrame(animate);
      } else {
        setDisplay(value);
      }
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, reduced]);

  return <>{display}</>;
}

function CodingProfiles() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  const profileIcons: Record<string, typeof SiCodechef | null> = {
    CodeChef: SiCodechef,
    Codeforces: SiCodeforces,
    "Problems solved": null,
  };

  return (
    <div
      ref={ref}
      className="grid sm:grid-cols-3 gap-4"
    >
      {codingProfiles.map((item: CodingProfile) => {
        const Icon = profileIcons[item.platform];
        const showLink = item.url && !isPlaceholder(item.url);
        const content = (
          <div className="rounded-2xl bg-surface border border-border p-5 text-center hover:border-accent/40 transition-colors">
            {Icon && (
              <Icon size={24} className="text-accent-2 mx-auto mb-2" />
            )}
            <p className="font-heading text-3xl font-bold text-accent">
              <CountUpNumber value={item.rating} active={inView} />
            </p>
            <p className="mt-1 font-mono text-xs text-text-muted">
              {item.platform}
            </p>
          </div>
        );

        if (showLink) {
          return (
            <a
              key={item.platform}
              href={item.url!}
              target="_blank"
              rel="noopener noreferrer"
            >
              {content}
            </a>
          );
        }

        return <div key={item.platform}>{content}</div>;
      })}
    </div>
  );
}

export default function Credentials() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  const fadeUp = reduced
    ? { initial: {}, animate: {}, transition: {} }
    : {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5, ease: "easeOut" as const },
      };

  return (
    <section
      ref={ref}
      id="credentials"
      className="py-24 md:py-32 px-5 md:px-8"
    >
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          tag="credentials"
          title="Recognition & certifications"
        />

        <motion.div
          {...fadeUp}
          className="space-y-16"
        >
          {/* Certifications */}
          <div>
            <h3 className="mb-6 font-mono text-sm text-text-muted">
              // certifications
            </h3>
            <Certifications />
            <CertificateMarquee />
          </div>

          {/* Achievements */}
          <div>
            <h3 className="mb-6 font-mono text-sm text-text-muted">
              // achievements
            </h3>
            <Achievements />
          </div>

          {/* Coding profiles */}
          <div>
            <h3 className="mb-6 font-mono text-sm text-text-muted">
              // competitive programming
            </h3>
            <CodingProfiles />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
