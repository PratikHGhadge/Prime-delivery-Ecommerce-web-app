/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "custom-blue": "#38a9e1",
        "custom-red": "#ed2027",
        "custom-darkblue1": "#2f9fd6",
        "custom-darkblue2": "#1a6985",
        "custom-darkblue3": "#347288",
        "custom-darkblue4": "#66b6d2",
        H1Color: "#363636",
      },
      gridTemplateRows: {
        "[auto,auto,1fr]": "auto auto 1fr",
      },
    },
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
};
