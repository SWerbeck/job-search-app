/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    // put default values in the extend colors and fontFamily
    extend: {
      colors: {
        peach: "#ff661a",
        headline: "#778B8F",
        mainbody: "#D8CAC1",
        button1: "#650000",
        button2: "#41565B",
        button3: "#685F59",
        navbar: "#41565B",
      },
      fontFamily: {},
    },
  },
  plugins: [],
};
