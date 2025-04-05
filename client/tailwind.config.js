/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        background: '#F7F7F2',    // background colour
        dark1: '#222725',
        dark2: '#121113',
        light_green: '#D7E6C5',
        dark_green: '#899878',
        red1: '#C85952',
      },
    },
  },
  plugins: [],
}

