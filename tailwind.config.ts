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
        primary: "hsla(var(--primary))",
        destructive: "hsla(var(--destructive))",
        "grey-0": "hsla(var(--grey-0))",
        "grey-50": "hsla(var(--grey-50))",
        "grey-100": "hsla(var(--grey-100))",
        "grey-300": "hsla(var(--grey-300))",
        "grey-400": "hsla(var(--grey-400))",
        "grey-500": "hsla(var(--grey-500))",
        "grey-600": "hsla(var(--grey-600))",
        "grey-650": "hsla(var(--grey-650))",
        "grey-700": "hsla(var(--grey-700))",
        "grey-800": "hsla(var(--grey-800))",
        "grey-900": "hsla(var(--grey-900))",
        "grey-1000": "hsla(var(--grey-1000))",
        white: "rgba(var(--white))",
      }
    },
  },
  plugins: [],
};
export default config;
