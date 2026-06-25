/** @type {import('tailwindcss').Config} */
export default {
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
      },
    },
  },
  plugins: [],
}

