module.exports = {
  darkMode: 'class', 
  content: ["/src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        'dark-blue' : 'hsl(209, 23%, 22%)',
        'dark-very-dark-blue' : 'hsl(207, 26%, 17%)',
        'light-very-dark-blue' : 'hsl(200, 15%, 8%)',
        'light-dark-gray' : 'hsl(0, 0%, 52%)',
        'very-light-gray' : 'hsl(0, 0%, 98%)'
      },
      fontFamily: {
        'nunito-sans' : ['"Nunito Sans"', 'sans-serif']
      }
    },
  },
  plugins: [],
}
