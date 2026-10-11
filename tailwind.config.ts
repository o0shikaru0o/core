import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#F7F4EF",
        ink: "#1A1A1A",
        champagne: "#B89B5E",
        stone: "#E8E3DB",
      },
      fontFamily: {
        wordmark: ["-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
