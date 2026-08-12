/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        purple: {
          DEFAULT: '#7A32A7',
          soft: '#8F5CAF',
        },
        green: {
          DEFAULT: '#689F25',
        },
        teal: {
          DEFAULT: '#31728B',
        },
        ink: '#170633',
        mist: '#F6F0F9',
      },
      fontFamily: {
        display: ['"Fraunces"', 'serif'],
        sans: ['"Manrope"', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 20px 60px -25px rgba(23, 6, 51, 0.25)',
        card: '0 10px 30px -12px rgba(23, 6, 51, 0.15)',
      },
      borderRadius: {
        organic: '42% 58% 63% 37% / 41% 44% 56% 59%',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        drift: {
          '0%, 100%': { transform: 'translate(0,0) rotate(0deg)' },
          '50%': { transform: 'translate(10px,-16px) rotate(3deg)' },
        },
        grow: {
          '0%': { strokeDashoffset: '1000' },
          '100%': { strokeDashoffset: '0' },
        },
      },
      animation: {
        fadeUp: 'fadeUp 0.8s cubic-bezier(0.22,1,0.36,1) both',
        drift: 'drift 9s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
