import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 select-none",
  {
    variants: {
      variant: {
        default:
          "bg-primary-container text-on-primary font-semibold shadow-md hover:bg-primary-fixed-dim active:scale-[0.98]",
        primary:
          "bg-gradient-to-r from-primary-container to-secondary-container text-white font-semibold shadow-lg hover:opacity-95 active:scale-[0.98]",
        secondary:
          "bg-surface-container-high text-on-surface hover:bg-surface-container-highest border border-outline-variant/40 active:scale-[0.98]",
        outline:
          "border border-outline-variant/60 bg-transparent text-on-surface hover:bg-surface-container hover:border-outline active:scale-[0.98]",
        ghost:
          "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high/50",
        destructive:
          "bg-error-container text-error hover:bg-error/20 active:scale-[0.98]",
        accent:
          "bg-secondary-container text-on-secondary font-semibold hover:bg-secondary active:scale-[0.98]",
        link:
          "text-primary underline-offset-4 hover:underline p-0 h-auto font-normal",
      },
      size: {
        default: "h-10 px-4 py-2 text-sm",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-12 rounded-xl px-6 text-base font-semibold",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
