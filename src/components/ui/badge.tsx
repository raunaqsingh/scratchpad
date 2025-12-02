import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "success" | "warning" | "danger";
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = "default", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
          {
            "bg-primary-100 text-primary-800": variant === "default",
            "bg-success-100 text-success-800": variant === "success",
            "bg-accent-100 text-accent-800": variant === "warning",
            "bg-danger-100 text-danger-800": variant === "danger",
          },
          className
        )}
        {...props}
      />
    );
  }
);
Badge.displayName = "Badge";

export { Badge };

