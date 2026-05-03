import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./hooks/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        /** Нейтральный тёмный фон, без «лампового» */
        ink: "#08090c",
        surface: "#0c1016",
        elevated: "#111820",
        line: "rgba(148,163,184,0.11)",
        lineStrong: "rgba(203,213,225,0.2)",
        mist: "rgba(203,213,225,0.86)",
        whisper: "rgba(148,163,184,0.52)",
        /** Основной акцент — «электрический» циан */
        accent: "#22d3ee",
        /** Второй оттенок для градиентов (более плотный) */
        accentDeep: "#06b6d4",
        /** Голубой «сигнал» для подсветок */
        glow: "#38bdf8",
        /** Холодный синий для ссылок / второго ряда */
        signal: "#3b82f6",
        accentMuted: "rgba(34,211,238,0.45)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      letterSpacing: {
        tightest: "-0.045em",
        tighter: "-0.028em",
        snug: "-0.012em",
      },
      backgroundImage: {
        "grid-fade":
          "linear-gradient(to bottom, rgba(8,9,12,0) 0%, #08090c 88%), radial-gradient(ellipse 100% 60% at 50% 0%, rgba(34,211,238,0.12), transparent 55%)",
        "mesh-hero":
          "radial-gradient(ellipse 80% 50% at 20% 0%, rgba(34,211,238,0.16), transparent 50%), radial-gradient(ellipse 60% 40% at 80% 100%, rgba(59,130,246,0.1), transparent 45%), radial-gradient(ellipse 50% 35% at 50% 50%, rgba(6,182,212,0.06), transparent 60%)",
      },
      boxShadow: {
        soft: "0 1px 0 rgba(255,255,255,0.04) inset, 0 30px 80px -32px rgba(0,0,0,0.75)",
        ring: "0 0 0 1px rgba(148,163,184,0.1)",
        accentGlow: "0 0 32px -4px rgba(34,211,238,0.45)",
        card: "0 30px 80px -40px rgba(0,0,0,0.6), 0 1px 0 rgba(255,255,255,0.04) inset",
      },
      animation: {
        marquee: "marquee 50s linear infinite",
        clockSecond: "clockSecond 60s linear infinite",
        breathe: "breathe 6s ease-in-out infinite",
        scan: "scan 4.5s ease-in-out infinite",
        pulseLine: "pulseLine 2.2s ease-in-out infinite",
        cyanShimmer: "cyanShimmer 2.2s ease-in-out infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        clockSecond: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        breathe: {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "1" },
        },
        scan: {
          "0%, 100%": { opacity: "0.3", transform: "scaleX(0.92)" },
          "50%": { opacity: "1", transform: "scaleX(1)" },
        },
        pulseLine: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" },
        },
        cyanShimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
