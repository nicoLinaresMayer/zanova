/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        zanova: ["var(--font-zanova)"],
        times: ['"Times New Roman"', 'serif'],
        ig:["var(--font-ig)"],
      },
      colors: {
        'light-black': '#161616',       // fondo negro
        'pearl': 'rgb(237, 235, 230)',      // fondo blanco
        'beige': '#b38f6f',  // fondo rojo claro
        'dark-red': '#710014', // fondo rojo oscuro
      },
    },
  },
  plugins: [],
}
