interface ChipProps {
  children: string;
  className?: string;
}

export default function Chip({ children, className = "" }: ChipProps) {
  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full border border-border bg-surface-2 font-mono text-xs text-text-muted hover:border-accent transition-colors ${className}`}
    >
      {children}
    </span>
  );
}
