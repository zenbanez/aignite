/** @type {import('tailwindcss').Config} */
module.exports = {
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
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        surface: "var(--surface)",
        'on-surface': "var(--on-surface)",
        'on-surface-variant': "var(--on-surface-variant)",
        'surface-container-low': "var(--surface-container-low)",
        'surface-container-lowest': "var(--surface-container-lowest)",
        'surface-container-highest': "var(--surface-container-highest)",
        'ignite-maroon': '#8B0000',
        'ignite-gold': '#FFD700',
      },
      fontFamily: {
        serif: ["var(--font-noto-serif)", "serif"],
        sans: ["var(--font-manrope)", "sans-serif"],
        headline: ["var(--font-noto-serif)", "serif"],
        label: ["var(--font-manrope)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
