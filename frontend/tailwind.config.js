/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        lacquer: ["Lacquer", "cursive"],
        permanent: ['"Permanent Marker"', "cursive"],
      },
    },
  },
  plugins: [],
};
