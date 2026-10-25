interface StatCardProps {
  value: string;
  label: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function StatCard({
  value,
  label,
  className = "",
  style,
}: StatCardProps) {
  return (
    <div
      className={`rounded-2xl bg-surface border border-border px-4 py-3 shadow-lg ${className}`}
      style={style}
    >
      <p className="font-heading text-2xl font-bold text-accent">{value}</p>
      <p className="font-mono text-xs text-text-muted mt-1">{label}</p>
    </div>
  );
}
