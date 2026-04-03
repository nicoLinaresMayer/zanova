/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        zanova: ["var(--font-zanova)"],
        times: ['"Times New Roman"', 'serif'],
        ig:["var(--font-ig)"],
        hero: ['var(--font-hero)'],
      },
      colors: {
        'light-black': '#161616',       // fondo negro
        'pearl': '#edebe6',      // fondo blanco
        'beige': '#b38f6f',  // fondo rojo claro
        'dark-red': '#710014', // fondo rojo oscuro
      },
      fontSize: {
        '1.5xl': '1.375rem', // ejemplo
      },
    },
  },
  plugins: [],
}
