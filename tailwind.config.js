/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./views/**/*.ejs'],
  theme: {
    extend: {
      width: {
      '120': '120px',
       },
       colors: {
        'rest': '#A41629'
       },
       backgroundImage: {
       'mobile-back': "linear-gradient( rgba(255, 255, 255, 0.5), rgba(252, 250, 250, 0.3)), url('../images/toast.jpg')",
       },
    },
    fontFamily: {
      'nunito': ['"Nunito"'],
    },
  },
  plugins: [],
}

