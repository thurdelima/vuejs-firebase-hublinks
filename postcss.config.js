//   postcss.config.js
module.exports = {
  plugins: [
    require('tailwindcss')('tailwind.config.js'), // name your custom tailwind
    require('autoprefixer')(),
  ]
    
  
}

// module.exports = {
//     plugins: {
//       tailwindcss: {},
//       autoprefixer: {},
//     },
//   }