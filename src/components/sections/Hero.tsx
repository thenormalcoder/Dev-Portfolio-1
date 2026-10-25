import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  Download,
  ChevronDown,
} from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { SiCodechef, SiCodeforces } from "react-icons/si";
import { profile, heroStats, isPlaceholder } from "@/data/portfolio";
import Button from "@/components/ui/Button";
import Chip from "@/components/ui/Chip";
import CodeCard, { type CodeLine } from "@/components/ui/CodeCard";
import StatCard from "@/components/ui/StatCard";
import IconLink from "@/components/ui/IconLink";

function useTypingEffect(
  texts: string[],
  typeSpeed: number,
  holdTime: number,
  deleteSpeed: number
) {
  const [displayed, setDisplayed] = useState("");
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<"typing" | "holding" | "deleting">(
    "typing"
  );
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) {
      setDisplayed(texts[0]);
      return;
    }

    let timeout: ReturnType<typeof setTimeout>;

    if (phase === "typing") {
      const full = texts[index % texts.length];
      if (displayed.length < full.length) {
        timeout = setTimeout(() => {
          setDisplayed(full.slice(0, displayed.length + 1));
        }, typeSpeed);
      } else {
        timeout = setTimeout(() => setPhase("holding"), holdTime);
      }
    } else if (phase === "holding") {
      timeout = setTimeout(() => setPhase("deleting"), holdTime);
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => {
          setDisplayed(displayed.slice(0, -1));
        }, deleteSpeed);
      } else {
        setIndex((i) => i + 1);
        setPhase("typing");
      }
    }

    return () => clearTimeout(timeout);
  }, [displayed, phase, index, texts, typeSpeed, holdTime, deleteSpeed, reduced]);

  return displayed;
}

const FALLBACK_HERO_IMAGE =
  "https://images.pexels.com/photos/8386437/pexels-photo-8386437.jpeg?auto=compress&cs=tinysrgb&h=650&w=500";

export default function Hero() {
  const reduced = useReducedMotion();
  const typedText = useTypingEffect(profile.roles, 55, 1800, 30);
  const sectionRef = useRef<HTMLElement>(null);
  const [photoError, setPhotoError] = useState(false);

  const scrollToProjects = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById("projects")?.scrollIntoView({
      behavior: reduced ? "auto" : "smooth",
    });
  };

  const scrollToJourney = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById("journey")?.scrollIntoView({
      behavior: reduced ? "auto" : "smooth",
    });
  };

  const fadeUp = {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: "easeOut" as const },
  };

  // Desktop positions for the floating stat cards, in heroStats order
  const statPositions = [
    "-bottom-4 -left-4 md:-left-8",
    "-bottom-8 right-4 md:right-8",
    "top-8 -right-2 md:-right-16",
  ];

  const statFloats = [
    { animation: "float-up 5s ease-in-out infinite" },
    { animation: "float-up 6s ease-in-out 0.5s infinite" },
    { animation: "float-up 7s ease-in-out 1s infinite" },
  ];

  const codeLines: CodeLine[] = [
    { segments: [{ type: "keyword", content: "const" }, { type: "text", content: " jatin " }, { type: "punct", content: "= {" }], indent: 0 },
    { segments: [{ type: "key", content: "  role" }, { type: "punct", content: ": " }, { type: "string", content: '"SDE-1 @ Kickdrum"' }, { type: "text", content: "," }], indent: 1 },
    { segments: [{ type: "key", content: "  builds" }, { type: "punct", content: ": [" }, { type: "string", content: '"AI agents"' }, { type: "text", content: ", " }, { type: "string", content: '"RAG"' }, { type: "text", content: ", " }, { type: "string", content: '"cloud backends"' }, { type: "text", content: "]," }], indent: 1 },
    { segments: [{ type: "key", content: "  based" }, { type: "punct", content: ": " }, { type: "string", content: '"Bengaluru"' }, { type: "text", content: "," }], indent: 1 },
    { segments: [{ type: "punct", content: "};" }], indent: 0 },
  ];

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-[100svh] flex items-center pt-16 pb-20 px-5 md:px-8"
    >
      <div className="max-w-6xl mx-auto w-full">
        <div className="grid lg:grid-cols-[55%_45%] gap-12 lg:gap-8 items-center">
          {/* Left column */}
          <div className="order-2 lg:order-1">
            {/* Status pill */}
            <motion.div
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-surface-2"
            >
              <span className="relative flex w-2 h-2">
                <span
                  className="absolute inset-0 rounded-full bg-accent-2"
                  style={{ animation: "pulse-dot 2s ease-in-out infinite" }}
                />
              </span>
              <span className="font-mono text-xs text-text-muted">
                {profile.availability}
              </span>
            </motion.div>

            {/* Greeting */}
            <motion.p
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: 0.15 }}
              className="mt-6 text-text-muted text-lg"
            >
              Hey, I&apos;m
            </motion.p>

            {/* Name */}
            <motion.h1
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: 0.2 }}
              className="mt-2 font-heading font-bold leading-tight"
              style={{
                fontSize: "clamp(2.75rem, 7vw, 5rem)",
              }}
            >
              <span className="text-text">Jatin </span>
              <span
                className="bg-gradient-to-br from-accent to-accent-2 bg-clip-text text-transparent"
              >
                Bhojwani
              </span>
            </motion.h1>

            {/* Typing line */}
            <motion.div
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: 0.25 }}
              className="mt-4 font-mono text-base md:text-lg text-accent-2 h-7"
            >
              <span className="text-text-muted">{"> "}</span>
              <span>{typedText}</span>
              {!reduced && (
                <span
                  className="inline-block w-2 h-5 bg-accent ml-1 align-middle"
                  style={{ animation: "blink 1s step-end infinite" }}
                />
              )}
            </motion.div>

            {/* Tagline */}
            <motion.p
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: 0.3 }}
              className="mt-6 text-text-muted text-base md:text-lg leading-relaxed max-w-[56ch]"
            >
              {profile.tagline}
            </motion.p>

            {/* Tech chips */}
            <motion.div
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: 0.35 }}
              className="mt-6 flex flex-wrap gap-2"
            >
              {profile.techChips.map((chip) => (
                <Chip key={chip}>{chip}</Chip>
              ))}
            </motion.div>

            {/* Buttons */}
            <motion.div
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: 0.4 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <Button
                variant="primary"
                href="#projects"
                onClick={scrollToProjects}
                icon={<ArrowRight size={18} />}
              >
                View my work
              </Button>
              <Button
                variant="outline"
                href={profile.resumeUrl}
                download
                icon={<Download size={18} />}
              >
                Resume
              </Button>
              {!isPlaceholder(profile.socials.linkedin) && (
                <Button
                  variant="outline"
                  href={profile.socials.linkedin}
                  external
                  icon={<FaLinkedinIn size={18} />}
                >
                  LinkedIn
                </Button>
              )}
              {!isPlaceholder(profile.socials.github) && (
                <Button
                  variant="outline"
                  href={profile.socials.github}
                  external
                  icon={<FaGithub size={18} />}
                >
                  GitHub
                </Button>
              )}
            </motion.div>

            {/* Social links */}
            <motion.div
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: 0.45 }}
              className="mt-8 flex items-center gap-4"
            >
              <span className="font-mono text-xs text-text-muted">
                find me &rarr;
              </span>
              <div className="flex items-center gap-2">
                {!isPlaceholder(profile.socials.github) && (
                  <IconLink href={profile.socials.github} label="GitHub">
                    <FaGithub size={16} />
                  </IconLink>
                )}
                {!isPlaceholder(profile.socials.linkedin) && (
                  <IconLink href={profile.socials.linkedin} label="LinkedIn">
                    <FaLinkedinIn size={16} />
                  </IconLink>
                )}
                {!isPlaceholder(profile.socials.codechef) && (
                  <IconLink href={profile.socials.codechef} label="CodeChef">
                    <SiCodechef size={18} />
                  </IconLink>
                )}
                {!isPlaceholder(profile.socials.codeforces) && (
                  <IconLink href={profile.socials.codeforces} label="Codeforces">
                    <SiCodeforces size={18} />
                  </IconLink>
                )}
              </div>
            </motion.div>
          </div>

          {/* Right column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
            className="order-1 lg:order-2 relative flex items-center justify-center"
          >
            <div
              className="relative rounded-3xl overflow-hidden"
              style={{
                width: "min(340px, 82vw)",
                aspectRatio: "3 / 4",
              }}
            >
              {/* Rotating conic glow behind card */}
              {!reduced && (
                <div
                  className="absolute inset-[-30px] rounded-full opacity-25"
                  style={{
                    background:
                      "conic-gradient(from 0deg, var(--accent), var(--accent-2), var(--accent))",
                    filter: "blur(45px)",
                    animation: "spin 20s linear infinite",
                  }}
                />
              )}

              {/* Profile photo — falls back to the AI-themed image if missing */}
              <img
                src={photoError ? FALLBACK_HERO_IMAGE : profile.photo}
                alt={photoError ? "AI — robotic hand touching a digital neural network" : profile.name}
                onError={() => setPhotoError(true)}
                {...{ fetchpriority: "high" }}
                className="relative w-full h-full object-cover z-10 rounded-3xl"
                style={{
                  border: "2px solid var(--border)",
                }}
              />

              {/* Gradient border overlay — mask cuts out the middle so only a 2px ring is painted */}
              <div
                className="absolute inset-0 rounded-3xl pointer-events-none z-20"
                style={{
                  padding: "2px",
                  background:
                    "linear-gradient(135deg, var(--accent), var(--accent-2))",
                  WebkitMask:
                    "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
                  WebkitMaskComposite: "xor",
                  mask: "linear-gradient(#000 0 0) content-box exclude, linear-gradient(#000 0 0)",
                }}
              />

              {/* AI badge overlay */}
              <div className="absolute bottom-4 left-4 z-30 flex items-center gap-2 px-3 py-1.5 rounded-full bg-bg/80 backdrop-blur-sm border border-border">
                <span
                  className="w-2 h-2 rounded-full bg-accent-2"
                  style={{ animation: "pulse-dot 2s ease-in-out infinite" }}
                />
                <span className="font-mono text-xs text-text-muted">
                  AI &amp; Software
                </span>
              </div>
            </div>

            {/* CodeCard overlapping top-right */}
            <div className="absolute -top-6 -right-2 md:-right-12 z-30 w-44 sm:w-48 md:w-64 hidden sm:block">
              <CodeCard lines={codeLines} />
            </div>

            {/* Floating stat cards — desktop */}
            <div className="hidden sm:block">
              {heroStats.slice(0, statPositions.length).map((stat, i) => (
                <StatCard
                  key={stat.label}
                  value={stat.value}
                  label={stat.label}
                  className={`absolute z-30 ${statPositions[i]}`}
                  style={reduced ? undefined : statFloats[i]}
                />
              ))}
            </div>

            {/* Stats row — mobile */}
            <div className="sm:hidden flex justify-center gap-3 mt-6 flex-wrap">
              {heroStats.map((stat) => (
                <StatCard
                  key={stat.label}
                  value={stat.value}
                  label={stat.label}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <a
        href="#journey"
        onClick={scrollToJourney}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-text-muted hover:text-accent transition-colors"
        aria-label="Scroll to journey section"
      >
        <span className="font-mono text-xs">scroll</span>
        {!reduced && (
          <ChevronDown
            size={20}
            className="animate-bounce"
          />
        )}
      </a>

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </section>
  );
}
