import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/config/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/data/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/services/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        slate: {
          750: "#263244"
        },
        wust: {
          blue: "#2f4fa3",
          green: "#1a6b3a",
          red: "#9b1b30"
        }
      },
      fontFamily: {
        serif: ["Georgia", "Times New Roman", "serif"],
        sans: ["Inter", "Open Sans", "Arial", "sans-serif"]
      },
      boxShadow: {
        soft: "0 18px 50px rgba(15, 23, 42, 0.10)"
      }
    }
  },
  plugins: []
};

export default config;
