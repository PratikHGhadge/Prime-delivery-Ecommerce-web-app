/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "custom-blue": "#38a9e1",
        "custom-red": "#ed2027",
        "custom-darkblue1": "#165a72",
        "custom-darkblue2": "#1a6985",
        "custom-darkblue3": "#347288",
        "custom-darkblue4": "#66b6d2",
      },
    },
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
};
