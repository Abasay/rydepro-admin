const daisyUi = require('daisyui');
// tailwind.config.js
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        verylightborder: '#f9fafb',
        inputcolor: '#909090',
        bgcolor: '#DFE6F0',
        cgrey: '#909090',
        bgAuthPrimary: '#F5F5F5',
        authborder: '#C3CAD9',
        inputborder: '#CCCCCC',
        placeholderColor: '#909090',
        buttonBG: '#212121',
        buttonTextColor: '#FAFAFA',
      },
      boxShadow: {
        'custom-gray': '0 8px 10px -1px rgba(207, 215, 226, 0.5), 0 6px 8px -1px rgba(207, 215, 226, 0.25)',
      },
      typography: {
        DEFAULT: {
          css: {
            h1: {
              fontWeight: '700', // Set font weight globally
            },
            h2: {
              fontWeight: '600',
            },
            h3: {
              fontWeight: '500',
            },
            // Add more heading styles as needed
          },
        },
      },
      screens: {
        'max-420': { max: '420px' },
        'max-1024': { max: '1024px' },
        'min-400': { min: '400px' },
        'max-3000': { max: '3000px' },
      },
    },
  },
  plugins: [daisyUi],
};
