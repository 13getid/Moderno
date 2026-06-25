/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream:      "#F5F0E8",
        sand:       "#F0E8D8",
        brown: {
          DEFAULT:  "#8B6C42",
          light:    "#C07D4D",
          dark:     "#5C4020",
        },
        // Warm charcoal surfaces for dark mode — keeps the furniture vibe
        ink: {
          DEFAULT:  "#1A1714",  // page background
          light:    "#242019",  // cards / raised sections
          dark:     "#141210",  // deepest (footer)
        },
      },
    },
  },
  plugins: [],
}

