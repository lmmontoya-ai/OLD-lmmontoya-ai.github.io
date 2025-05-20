"use client";
import { useEffect, useState } from "react";

/**
 * ColorSchemeToggle
 * - Respects system preference on first load
 * - Allows manual override (persists in localStorage)
 * - Accessible (aria-label, keyboard focus)
 */
export default function ColorSchemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window === "undefined") return "light";
    if (localStorage.theme === "light" || localStorage.theme === "dark") {
      return localStorage.theme as "light" | "dark";
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.theme = theme;
  }, [theme]);

  return (
    <button
      aria-label="Toggle color scheme"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="rounded-lg px-3 py-2 bg-accent-blue text-white hover:bg-accent-gold transition-colors duration-250 focus:outline-none focus:ring-2 focus:ring-accent-blue"
    >
      {theme === "dark" ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
}
