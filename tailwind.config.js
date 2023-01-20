/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./layouts/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
        plusJakarta: ["Plus Jakarta Sans", "sans-serif"],
        robotoMono: ["Roboto Mono", "monospace"],
        minecraft: ["Minecraft", "Roboto", "sans-serif"],
      },
      colors: {
        "7tv": "#4fc2bc",
        bttv: "#d50014",
        ttv: "#9146FF",
      },
    },
  },
  plugins: [],
};
