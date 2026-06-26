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
        background: "var(--background)",
        foreground: "var(--foreground)",
        // TODO: Add your design system colors here after running Claude Design Prompt 1
        // Example: "cpc-lime": "#c5e84d",
      },
      fontFamily: {
        // TODO: Add your font families here
        // Example: display: ["var(--font-space-grotesk)", "sans-serif"],
        // Example: body: ["var(--font-geist-sans)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
