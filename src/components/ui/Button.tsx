import { cn } from "@/lib/utils/cn";
import Link from "next/link";

interface ButtonProps {
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
  children: React.ReactNode;
  external?: boolean;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

const variantClasses = {
  primary:
    "bg-amber-500 hover:bg-amber-400 text-gray-950 font-semibold shadow-lg hover:shadow-amber-500/25",
  secondary:
    "bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-sm",
  outline:
    "bg-transparent border-2 border-amber-500 text-amber-400 hover:bg-amber-500 hover:text-gray-950",
};

const sizeClasses = {
  sm: "px-4 py-2 text-sm rounded-lg",
  md: "px-6 py-3 text-base rounded-xl",
  lg: "px-8 py-4 text-lg rounded-xl",
};

export function Button({
  href,
  onClick,
  variant = "primary",
  size = "md",
  className,
  children,
  external,
  type = "button",
  disabled,
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-gray-900",
    variantClasses[variant],
    sizeClasses[size],
    disabled && "opacity-50 cursor-not-allowed",
    className
  );

  if (href) {
    return (
      <Link
        href={href}
        className={classes}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes} disabled={disabled}>
      {children}
    </button>
  );
}
