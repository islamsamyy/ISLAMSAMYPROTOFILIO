"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { cn } from "@/lib/utils";

export interface ThemeToggleProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  showLabel?: boolean;
}

export function ThemeToggle({
  className,
  showLabel = false,
  ...props
}: ThemeToggleProps) {
  const { resolvedTheme, toggleTheme, mounted } = useTheme();

  // Guard against server/client icon hydration mismatch
  if (!mounted) {
    return (
      <button
        type="button"
        disabled
        aria-hidden="true"
        className={cn(
          "relative flex items-center justify-center w-9 h-9 rounded-full bg-surface-container-high/60 border border-outline-variant/30 text-on-surface-variant opacity-70 cursor-wait",
          className
        )}
      >
        <span className="w-4 h-4 rounded-full bg-on-surface-variant/20 animate-pulse" />
      </button>
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to cybernetic dark mode"}
      title={isDark ? "Switch to High-Contrast Light Mode" : "Switch to Cybernetic Dark Mode"}
      className={cn(
        "relative flex items-center justify-center w-9 h-9 rounded-full bg-surface-container-high/80 hover:bg-surface-container-highest border border-outline-variant/30 hover:border-primary/40 text-on-surface-variant hover:text-primary transition-all duration-200 active:scale-95 shadow-sm group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className
      )}
      {...props}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.div
            key="moon"
            initial={{ rotate: -70, scale: 0.6, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: 70, scale: 0.6, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-center justify-center text-secondary group-hover:text-primary"
          >
            <Moon className="w-4 h-4" />
          </motion.div>
        ) : (
          <motion.div
            key="sun"
            initial={{ rotate: 70, scale: 0.6, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: -70, scale: 0.6, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-center justify-center text-amber-500 group-hover:text-amber-600"
          >
            <Sun className="w-4 h-4" />
          </motion.div>
        )}
      </AnimatePresence>
      {showLabel && (
        <span className="ml-2 font-label-sm text-xs text-on-surface">
          {isDark ? "Cybernetic Dark" : "High-Contrast Light"}
        </span>
      )}
    </button>
  );
}
