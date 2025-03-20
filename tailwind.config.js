/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          'rose-pink': '#F8BBD0',     // Logo, buttons (Section 3.1.1)
          'deep-rose': '#C2185B',     // Logo, button text (Section 3.1.1)
          'light-lavender': '#E6E6FA', // Background gradient start (Section 3.1.1)
          'pale-pink': '#F8F8FF',     // Background gradient end (Section 3.1.1)
        },
        fontFamily: {
          'playfair': ['"Playfair Display"', 'serif'], // Logo, headings (Section 3.1.1)
          'raleway': ['Raleway', 'sans-serif'],       // Tagline (Section 3.1.2)
          'open-sans': ['"Open Sans"', 'sans-serif'], // Body text (Section 3.1.2)
        },
      },
    },
    plugins: [],
  };