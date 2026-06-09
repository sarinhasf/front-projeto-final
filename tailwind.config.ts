import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        black:    "#0A0A0F",
        surface:  "#111118",
        card:     "#1A1A24",
        border:   "#2A2A3A",
        muted:    "#4A4A6A",
        cream:    "#F5F0E8",
        "cream-dim": "#A09A8E",
        gold:     "#C9A84C",
        "gold-dim":  "#8A7035",
      },
      fontFamily: {
        display: ["Playfair Display", "serif"],
        sans:    ["Inter", "sans-serif"],
        mono:    ["JetBrains Mono", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
