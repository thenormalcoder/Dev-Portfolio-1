import { type ReactNode } from "react";

interface IconLinkProps {
  href: string;
  label: string;
  children: ReactNode;
  external?: boolean;
  className?: string;
}

export default function IconLink({
  href,
  label,
  children,
  external = true,
  className = "",
}: IconLinkProps) {
  return (
    <a
      href={href}
      aria-label={label}
      className={`inline-flex items-center justify-center w-10 h-10 rounded-lg border border-border bg-surface-2 text-text-muted hover:text-accent hover:border-accent transition-colors ${className}`}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  );
}
