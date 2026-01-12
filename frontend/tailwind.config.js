/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background_color: "#EFECE3",
        primary_text: "#8FABD4", // hover / active background
      },
      backgroundImage: {
        "grid-small":
          "linear-gradient(to right, rgba(0,0,0,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.08) 1px, transparent 1px)",
      },
      backgroundSize: {
        "grid-small": "12px 12px",
      },
      fontFamily: {
        lacquer: ["Lacquer", "cursive"],
        permanent: ["Permanent Marker", "cursive"],
        cookie: ["Cookie", "cursive"],
        rubik: ["Rubik Dirt", "cursive"],
        dyna: ["DynaPuff", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
