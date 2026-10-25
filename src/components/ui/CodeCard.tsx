import { type ReactNode } from "react";

type SegmentType = "key" | "keyword" | "string" | "punct" | "text";

interface Segment {
  type: SegmentType;
  content: string;
}

export interface CodeLine {
  segments: Segment[];
  indent?: number;
}

interface CodeCardProps {
  lines: CodeLine[];
  className?: string;
  title?: string;
  children?: ReactNode;
}

const segmentColors: Record<SegmentType, string> = {
  key: "text-text",
  keyword: "text-accent-2",
  string: "text-accent",
  punct: "text-text-muted",
  text: "text-text",
};

export default function CodeCard({
  lines,
  className = "",
  title,
  children,
}: CodeCardProps) {
  return (
    <div
      className={`rounded-2xl bg-surface-2 border border-border overflow-hidden ${className}`}
    >
      {/* macOS dots bar */}
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
        {title && (
          <span className="ml-2 font-mono text-xs text-text-muted">
            {title}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4 font-mono text-sm leading-relaxed overflow-x-auto">
        {lines.map((line, i) => (
          <div key={i} style={{ paddingLeft: `${(line.indent ?? 0) * 20}px` }}>
            {line.segments.map((seg, j) => (
              <span key={j} className={segmentColors[seg.type]}>
                {seg.content}
              </span>
            ))}
          </div>
        ))}
        {children}
      </div>
    </div>
  );
}
