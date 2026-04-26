import { cn } from "@/lib/utils/cn";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "success" | "warning";
  className?: string;
}

const variantClasses = {
  default: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
  success: "bg-green-500/10 text-green-400 border border-green-500/20",
  warning: "bg-orange-500/10 text-orange-400 border border-orange-500/20",
};

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold tracking-wide uppercase",
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
