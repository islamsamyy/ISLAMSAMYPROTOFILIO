"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
  useRef,
} from "react";

export type Theme = "dark" | "light" | "system";

export interface ThemeContextType {
  theme: Theme;
  resolvedTheme: "dark" | "light";
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  mounted: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = "islam_theme_v1";
const THEME_FALLBACK_KEY = "theme";

function getSystemTheme(): "dark" | "light" {
  if (typeof window === "undefined") return "dark";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function resolveThemeValue(theme: Theme): "dark" | "light" {
  if (theme === "system") {
    return getSystemTheme();
  }
  return theme;
}

function applyDomTheme(resolved: "dark" | "light", activeTheme: Theme) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  if (resolved === "dark") {
    root.classList.add("dark");
    root.style.colorScheme = "dark";
  } else {
    root.classList.remove("dark");
    root.style.colorScheme = "light";
  }

  // Dispatch custom sync event for 3D canvases & external listeners
  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent("islam_theme_change", {
        detail: { theme: activeTheme, resolvedTheme: resolved },
      })
    );
  }
}

export interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}

export function ThemeProvider({
  children,
  defaultTheme = "dark",
  storageKey = THEME_STORAGE_KEY,
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(defaultTheme);
  const [resolvedTheme, setResolvedTheme] = useState<"dark" | "light">(
    resolveThemeValue(defaultTheme)
  );
  const [mounted, setMounted] = useState<boolean>(false);
  const themeRef = useRef<Theme>(theme);
  themeRef.current = theme;

  // Initialize theme from localStorage on mount
  useEffect(() => {
    try {
      const stored = (localStorage.getItem(storageKey) ||
        localStorage.getItem(THEME_FALLBACK_KEY)) as Theme | null;
      const initialTheme =
        stored && ["dark", "light", "system"].includes(stored)
          ? stored
          : defaultTheme;

      setThemeState(initialTheme);
      const resolved = resolveThemeValue(initialTheme);
      setResolvedTheme(resolved);
      applyDomTheme(resolved, initialTheme);
    } catch {
      // localStorage may fail in restricted/private browsing modes
      const fallbackResolved = resolveThemeValue(defaultTheme);
      setResolvedTheme(fallbackResolved);
      applyDomTheme(fallbackResolved, defaultTheme);
    } finally {
      setMounted(true);
    }
  }, [defaultTheme, storageKey]);

  // System media query change listener
  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleMediaChange = (e: MediaQueryListEvent) => {
      if (themeRef.current === "system") {
        const newResolved = e.matches ? "dark" : "light";
        setResolvedTheme(newResolved);
        applyDomTheme(newResolved, "system");
      }
    };

    mediaQuery.addEventListener("change", handleMediaChange);
    return () => mediaQuery.removeEventListener("change", handleMediaChange);
  }, []);

  // Multi-tab storage synchronization listener
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleStorageChange = (e: StorageEvent) => {
      if ((e.key === storageKey || e.key === THEME_FALLBACK_KEY) && e.newValue) {
        const nextTheme = e.newValue as Theme;
        if (["dark", "light", "system"].includes(nextTheme)) {
          setThemeState(nextTheme);
          const resolved = resolveThemeValue(nextTheme);
          setResolvedTheme(resolved);
          applyDomTheme(resolved, nextTheme);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [storageKey]);

  const setTheme = useCallback(
    (newTheme: Theme) => {
      setThemeState(newTheme);
      const resolved = resolveThemeValue(newTheme);
      setResolvedTheme(resolved);
      applyDomTheme(resolved, newTheme);

      try {
        localStorage.setItem(storageKey, newTheme);
      } catch {
        // Ignore storage exceptions
      }
    },
    [storageKey]
  );

  const toggleTheme = useCallback(() => {
    const nextTheme = resolvedTheme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
  }, [resolvedTheme, setTheme]);

  const value = useMemo<ThemeContextType>(
    () => ({
      theme,
      resolvedTheme,
      setTheme,
      toggleTheme,
      mounted,
    }),
    [theme, resolvedTheme, setTheme, toggleTheme, mounted]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
