/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    // put default values in the extend colors and fontFamily
    extend: {
      colors: {
        peach: '#ff661a',
      },
      fontFamily: {},
    },
  },
  plugins: [],
};
