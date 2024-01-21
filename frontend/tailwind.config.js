/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'go-background': "url(/public/images/Background.png)",
        'go-login': "url(/public/images/LoginBackground.jpg)"
      }
    },
    colors: {
      goDark: '#057038',
      goLight: '#97d045',
      gray: '#757575',
      grayDark: '#424242',
      grayLight: '#F5F5F5',
      goOrange: '#e55523',
      white: '#ffffff',
      goWhite: '#f9faf5',
      black: '#000000',
      blue: '#0000EE'
    },
  },
  plugins: [],
}
