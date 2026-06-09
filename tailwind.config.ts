import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "tc-blue": "#21148C",
        "tc-blue-deep": "#170D63",
        "tc-blue-darker": "#120A52",
        "tc-purple": "#4D2D8D",
        "tc-purple-dark": "#662673",
        "tc-warm-purple": "#982C5A",
        "tc-orange": "#FD533A",
        "tc-orange-light": "#FC8968",
        "tc-coral": "#F0634A",
        "tc-off-white": "#E9E1E5",
        "tc-light-blue": "#A0DAF3",
        "tc-muted-purple": "#A19FCF",
      },
      borderRadius: {
        card: "22px",
      },
      fontFamily: {
        sans: ["var(--font-red-hat)", "Arial", "sans-serif"],
      },
      boxShadow: {
        card: "0 18px 40px rgba(0,0,0,0.18)",
        "card-lg": "0 30px 70px rgba(0,0,0,0.40)",
        orange: "0 14px 30px rgba(253,83,58,0.40)",
      },
      keyframes: {
        pulse: {
          "0%": { boxShadow: "0 0 0 0 rgba(74,222,128,0.5)" },
          "70%": { boxShadow: "0 0 0 8px rgba(74,222,128,0)" },
          "100%": { boxShadow: "0 0 0 0 rgba(74,222,128,0)" },
        },
        floaty: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
      },
      animation: {
        pulse: "pulse 1.8s infinite",
        floaty: "floaty 4s ease-in-out infinite",
        marquee: "marquee 60s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
