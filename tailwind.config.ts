import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // NAAS v2.1 Cognitive Tokens
        canvas: "#FFFDF5",
        "text-main": "#121212",
        "intent-action": "#FFDE59", // Yellow (Fase 4: Action)
        "intent-attention": "#8850FF", // Purple (Fase 1: Attention)
        "intent-danger": "#FF5252",
        "intent-success": "#00C853",
      },
      borderWidth: {
        structure: "3px",
      },
      boxShadow: {
        hard: "4px 4px 0 #000",
        "hard-hover": "6px 6px 0 #000",
        "hard-active": "0px 0px 0 #000",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui"],
        body: ["var(--font-body)", "system-ui"],
      },
    },
  },
  plugins: [],
};
export default config;
