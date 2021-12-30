module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        gray: {
          100: 'var(--color-gray-100)',
          400: 'var(--color-gray-400)',
          600: 'var(--color-gray-600)',
          800: 'var(--color-gray-800)',
        },
        blue: {
          300: 'var(--color-blue-300)',
          500: 'var(--color-blue-500)',
          800: 'var(--color-blue-800)',
        },
        white: 'var(--color-white)',
        black: 'var(--color-black)',
        yellow: 'var(--color-yellow)',
        orange: 'var(--color-orange)',
      },
      width: {
        phone: 'var(--phone-width)',
      },
      height: {
        phone: 'var(--phone-height)',
      },
      borderRadius: {
        phone: 'var(--phone-rounded)',
      },
      boxShadow: {
        phone: 'var(--phone-shadow)',
        tl: 'var(--shadow-rounded-tl)',
        tr: 'var(--shadow-rounded-tr)',
      },
    },
  },
  plugins: [],
};
