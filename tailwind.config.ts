import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ["var(--font-source-code-pro)", "monospace"],
        serif: ["Georgia", "Times New Roman", "serif"],
      },
      colors: {
        wsj: {
          // Neutrals
          black: "#000000",
          darkGray: "#3F4345",
          mediumGray: "#666666",
          lightGray: "#CCCCCC",
          cream: "#F7F3EF",
          tan: "#CCC1A8",
          // Election colors
          democrat: "#0066CC",
          democratLight: "#4D99FF",
          democratMedium: "#2680FF",
          republican: "#CC0000",
          republicanLight: "#FF4D4D",
          republicanMedium: "#E60000",
          tossup: "#999999",
          // Accent
          orange: "#CD5200",
          success: "#00AA00",
          warning: "#FF9900",
        },
      },
    },
  },
  plugins: [],
};

export default config;