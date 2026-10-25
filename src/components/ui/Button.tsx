import { type ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "outline";
  href?: string;
  download?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  external?: boolean;
  icon?: ReactNode;
  className?: string;
}

export default function Button({
  children,
  variant = "primary",
  href,
  download,
  onClick,
  external,
  icon,
  className = "",
}: ButtonProps) {
  const baseClasses =
    "inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-200";

  const variantClasses =
    variant === "primary"
      ? "bg-gradient-to-br from-accent to-accent-2 text-bg font-semibold hover:opacity-90"
      : "border border-border text-text hover:border-accent hover:bg-accent-soft";

  const sharedProps = {
    className: `${baseClasses} ${variantClasses} ${className}`,
    onClick,
  };

  if (href) {
    return (
      <a
        href={href}
        download={download}
        {...(external
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
        {...sharedProps}
      >
        {children}
        {icon}
      </a>
    );
  }

  return (
    <button {...sharedProps}>
      {children}
      {icon}
    </button>
  );
}
