import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useTheme } from "@/components/ThemeProvider";

// Per-page accent palette — each value matches that page's icon color.
// `light` is tuned for the parchment background, `dark` for the charcoal background.
const ACCENTS = {
  "/literature": { light: "#009DFF", dark: "#00E5FF" },
  "/resources": { light: "#FF8C00", dark: "#FFA940" },
  "/this-week": { light: "#1A1D20", dark: "#E9E4D8" },
  "/dice-entropy": { light: "#8B5CF6", dark: "#A78BFA" },
  "/passphrase": { light: "#16A34A", dark: "#4ADE80" },
  "/faq": { light: "#EC4899", dark: "#F472B6" },
  "/video-essays": { light: "#FACC15", dark: "#FDE047" },
  "/gradually-then-suddenly-summary": { light: "#009DFF", dark: "#00E5FF" },
  "/entropylab": { light: "#8B5CF6", dark: "#A78BFA" },
};

// Fallback (verdigris) for any route not listed above.
const DEFAULT_ACCENT = { light: "#2D5247", dark: "#5FAE8E" };

export function usePageAccent() {
  const { theme } = useTheme();
  const location = useLocation();
  const palette = ACCENTS[location.pathname] || DEFAULT_ACCENT;
  return palette[theme === "dark" ? "dark" : "light"];
}

export function PageAccentSetter() {
  const accent = usePageAccent();
  useEffect(() => {
    document.documentElement.style.setProperty("--page-accent", accent);
  }, [accent]);
  return null;
}