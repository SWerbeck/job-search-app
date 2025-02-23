/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    // put default values in the extend colors and fontFamily
    extend: {
      colors: {
        peach: '#ff661a',
        headline: '#778B8F',
        mainbody: '#D8CAC1',
        button1: '#650000',
        button2: '#41565B',
        button3: '#685F59',
        button4: '#800000',
        navbar: '#41565B',
      },
      fontFamily: {},
      screens: {
        xs: '380px',
        sm: '540px',
        md: '720px',
        lg: '920px',
        xl: '1040px',
      },
    },
  },
  plugins: [],
};
