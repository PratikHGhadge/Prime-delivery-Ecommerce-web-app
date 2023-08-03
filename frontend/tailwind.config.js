/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "custom-blue": "#38a9e1",
        "custom-red": "#ed2027",
      },
    },
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
};
