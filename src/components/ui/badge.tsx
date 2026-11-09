import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-mono font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  {
    variants: {
      variant: {
        default:
          "border border-primary/30 bg-primary/10 text-primary",
        secondary:
          "border border-secondary/30 bg-secondary/10 text-secondary",
        tertiary:
          "border border-tertiary/30 bg-tertiary/10 text-tertiary",
        outline:
          "border border-outline-variant text-on-surface-variant",
        success:
          "border border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
        warning:
          "border border-amber-500/30 bg-amber-500/10 text-amber-300",
        error:
          "border border-error/30 bg-error/10 text-error",
        destructive:
          "border border-error/30 bg-error/10 text-error",
        surface:
          "border border-outline-variant/40 bg-surface-container-high text-on-surface",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(badgeVariants({ variant }), className)}
        {...props}
      />
    );
  }
);
Badge.displayName = "Badge";
