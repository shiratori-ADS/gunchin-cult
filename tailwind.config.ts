import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        midnight: "#050505",
        navy: "#071529",
        gold: "#d7b35a",
        emerald: "#4ff5c8"
      },
      fontFamily: {
        sans: ["var(--font-noto-serif-jp)", "serif"]
      },
      boxShadow: {
        glow: "0 0 48px rgba(215, 179, 90, 0.32)",
        emerald: "0 0 60px rgba(79, 245, 200, 0.2)"
      }
    }
  },
  plugins: []
};

export default config;
