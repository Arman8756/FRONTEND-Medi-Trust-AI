/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3B4FE4',
        secondary: '#5B6FFF',
        accent: '#FF6B9D',
        bg: '#E8ECFF',
        'light-blue': '#C5D0FF',
        'soft-white': '#F5F7FF',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #3B4FE4 0%, #5B6FFF 100%)',
        'gradient-hero': 'linear-gradient(180deg, #C5D0FF 0%, #E8ECFF 100%)',
        'gradient-card': 'linear-gradient(135deg, #FFFFFF 0%, #F5F7FF 100%)',
      },
      boxShadow: {
        'soft': '0 10px 40px rgba(59, 79, 228, 0.1)',
        'card': '0 20px 60px rgba(59, 79, 228, 0.15)',
        'button': '0 8px 20px rgba(59, 79, 228, 0.3)',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
    },
  },
  plugins: [],
};
