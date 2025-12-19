/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        // sans:["Inter" , "system-ui" , "sans-serif"],
        lacquer: ["Lacquer", "cursive"],
        permanent: ['"Permanent Marker"', "cursive"],
        cookie:["Cookie" , "cursive"],
      },
    },
  },
  plugins: [],
};
