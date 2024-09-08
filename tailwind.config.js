module.exports = {
  purge: [
    './src/**/*.{js,jsx,ts,tsx}',
    './public/index.html',
  ],
  darkMode: true,
  theme: {
    extend: {
      colors: {
        primary: '#F48024',
        secondary: '#FFB500',
        disabled: '#BBC0C4',
        dark: '#242729',
        light: '#DFDAC7',
      },
      boxShadow: {
        seacrh: '0 0 7px 1px rgba(0, 0, 0, 0.0)',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
