interface SectionHeadingProps {
  tag: string;
  title: string;
  subtitle?: string;
}

export default function SectionHeading({
  tag,
  title,
  subtitle,
}: SectionHeadingProps) {
  return (
    <div className="mb-16 text-center">
      <p
        className="font-mono text-[13px] text-accent"
        style={{ letterSpacing: "0.08em" }}
      >
        // {tag}
      </p>
      <h2 className="mt-3 font-heading text-4xl md:text-5xl font-bold text-text">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-text-muted text-lg max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}
