import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#00FF66",
        matrix: {
          green: "#00FF66",
          dark: "#0A0A0A",
          glow: "rgba(0, 255, 102, 0.2)",
        },
      },
    },
  },
  plugins: [],
};

export default config;
