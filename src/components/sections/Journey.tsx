import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { Briefcase, GraduationCap, ChevronDown } from "lucide-react";
import { journey, isPlaceholder, type JourneyItem } from "@/data/portfolio";
import SectionHeading from "@/components/layout/SectionHeading";
import Chip from "@/components/ui/Chip";

// Hide item if both org and period are placeholders
function shouldHideItem(item: JourneyItem): boolean {
  return isPlaceholder(item.org) && isPlaceholder(item.period);
}

function JourneyCard({
  item,
  index,
}: {
  item: JourneyItem;
  index: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const reduced = useReducedMotion();
  const isWork = item.type === "work";
  const dotColor = isWork ? "var(--accent)" : "var(--accent-2)";
  const Icon = isWork ? Briefcase : GraduationCap;
  const isLeft = index % 2 === 0;

  const visiblePoints = expanded ? item.points : item.points.slice(0, 2);
  const hasMore = item.points.length > 2;

  const slideIn = reduced
    ? { initial: {}, animate: {}, transition: {} }
    : {
        initial: { opacity: 0, x: isLeft ? -24 : 24 },
        animate: { opacity: 1, x: 0 },
        transition: { duration: 0.5, ease: "easeOut" as const },
      };

  return (
    <motion.div
      {...slideIn}
      className={`relative md:w-[calc(50%-2rem)] ${
        isLeft ? "md:mr-auto" : "md:ml-auto"
      }`}
    >
      {/* Notch arrow pointing toward the line */}
      <div
        className={`hidden md:block absolute top-6 ${
          isLeft
            ? "right-[-8px] border-l-transparent border-r-transparent"
            : "left-[-8px] border-r-transparent border-l-transparent"
        }`}
        style={{
          width: 0,
          height: 0,
          borderTop: "8px solid transparent",
          borderBottom: "8px solid transparent",
          [isLeft ? "borderLeft" : "borderRight"]: "8px solid var(--border)",
        }}
      />

      <div className="rounded-2xl bg-surface border border-border p-5 md:p-6 hover:border-accent/40 hover:-translate-y-1 transition-all duration-200 group">
        {/* Period */}
        <p className="font-mono text-xs text-accent">{item.period}</p>

        {/* Title */}
        <h3 className="mt-2 font-heading text-lg font-semibold text-text">
          {item.title}
        </h3>

        {/* Org + location */}
        <p className="mt-1 text-sm text-text-muted">
          {item.org}
          {item.location && !isPlaceholder(item.location) && (
            <span className="text-text-muted"> · {item.location}</span>
          )}
        </p>

        {/* Score badge */}
        {item.score && !isPlaceholder(item.score) && (
          <span className="mt-3 inline-flex items-center px-3 py-1 rounded-full border border-accent-2/40 bg-accent-2/10 font-mono text-xs text-accent-2">
            {item.score}
          </span>
        )}

        {/* Bullet points */}
        {visiblePoints.length > 0 && (
          <ul className="mt-4 space-y-2">
            {visiblePoints.map((point, i) => (
              <li
                key={i}
                className="text-sm text-text-muted leading-relaxed pl-4 relative"
              >
                <span
                  className="absolute left-0 top-2 w-1.5 h-1.5 rounded-full"
                  style={{ background: dotColor }}
                />
                {point}
              </li>
            ))}
          </ul>
        )}

        {/* Show more toggle */}
        {hasMore && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="mt-3 inline-flex items-center gap-1 font-mono text-xs text-accent hover:opacity-80 transition-opacity"
            aria-expanded={expanded}
          >
            {expanded ? "Show less" : "Show more"}
            <ChevronDown
              size={14}
              className={`transition-transform ${expanded ? "rotate-180" : ""}`}
            />
          </button>
        )}

        {/* Tags */}
        {item.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {item.tags.map((tag) => (
              <Chip key={tag}>{tag}</Chip>
            ))}
          </div>
        )}
      </div>

      {/* Dot on the line */}
      <div
        className="absolute top-6 md:top-7 z-10 flex items-center justify-center w-10 h-10 rounded-full border-2"
        style={{
          background: "var(--bg)",
          borderColor: dotColor,
          left: isLeft ? "calc(100% + 0.5rem)" : "auto",
          right: isLeft ? "auto" : "calc(100% + 0.5rem)",
          // Mobile: always left
          marginLeft: "0",
        }}
      >
        <div
          className="absolute md:hidden"
          style={{
            left: "-10px",
            width: "20px",
            height: "2px",
            background: dotColor,
          }}
        />
        <Icon size={16} style={{ color: dotColor }} />
      </div>
    </motion.div>
  );
}

export default function Journey() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 80%", "end 20%"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const visibleItems = journey.filter((item) => !shouldHideItem(item));

  return (
    <section
      ref={sectionRef}
      id="journey"
      className="py-24 md:py-32 px-5 md:px-8"
    >
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          tag="journey"
          title="Where I've been"
          subtitle="From classrooms to production systems."
        />

        <div className="relative">
          {/* Track line */}
          <div className="absolute left-5 md:left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 bg-border" />

          {/* Fill line (desktop) */}
          {!reduced && (
            <motion.div
              className="absolute left-5 md:left-1/2 top-0 w-0.5 -translate-x-1/2 origin-top"
              style={{
                height: lineHeight,
                background:
                  "linear-gradient(180deg, var(--accent), var(--accent-2))",
              }}
            />
          )}

          {/* Cards */}
          <div className="space-y-12 md:space-y-16">
            {visibleItems.map((item, index) => (
              <JourneyCard
                key={`${item.title}-${item.period}`}
                item={item}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
