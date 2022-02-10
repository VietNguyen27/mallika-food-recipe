const plugin = require('tailwindcss/plugin');

const rotateX = plugin(function ({ addUtilities }) {
  addUtilities({
    '.rotate-x-45': {
      transform: 'rotateX(45deg)',
    },
    '.rotate-x-90': {
      transform: 'rotateX(90deg)',
    },
    '.rotate-x-135': {
      transform: 'rotateX(135deg)',
    },
    '.rotate-x-180': {
      transform: 'rotateX(180deg)',
    },
  });
});

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
        beige: 'var(--color-beige)',
      },
      fontSize: {
        '2xs': ['0.625rem', '0.875rem'],
      },
      width: {
        phone: 'var(--phone-width)',
      },
      height: {
        phone: 'var(--phone-height)',
        '9/10': '90%',
      },
      borderRadius: {
        phone: 'var(--phone-rounded)',
      },
      boxShadow: {
        phone: 'var(--phone-shadow)',
        tl: 'var(--shadow-rounded-tl)',
        tr: 'var(--shadow-rounded-tr)',
      },
      animation: {
        'ripple-loading': 'ripple 2s cubic-bezier(0, 0.2, 0.8, 1) infinite',
        'dash-loading': 'dash 1.5s ease-in-out infinite',
        'rotate-loading': 'rotate 2s linear infinite',
        'slide-in': 'slide-in 0.15s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'slide-out': 'slide-out 0.15s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'slide-up': 'slide-up 0.15s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'slide-down': 'slide-down 0.15s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'zoom-in': 'zoom-in 0.15s cubic-bezier(0.4, 0, 0.2, 1) forwards',
      },
      keyframes: {
        ripple: {
          '0%': {
            top: '36px',
            left: '36px',
            width: '0',
            height: '0',
            opacity: '1',
          },
          '100%': {
            top: '0px',
            left: '0px',
            width: '72px',
            height: '72px',
            opacity: '0',
          },
        },
        rotate: {
          '100%': {
            transform: 'rotate(360deg)',
          },
        },
        dash: {
          '0%': {
            strokeDasharray: '1, 150',
            strokeDashoffset: '0',
          },
          '50%': {
            strokeDasharray: '90, 150',
            strokeDashoffset: '-35',
          },
          '100%': {
            strokeDasharray: '90, 150',
            strokeDashoffset: '-124',
          },
        },
        'slide-in': {
          '0%': {
            transform: 'translateX(100%)',
          },
          '100%': {
            transform: 'translateX(0)',
          },
        },
        'slide-out': {
          '0%': {
            transform: 'translateX(0)',
          },
          '100%': {
            transform: 'translateX(120%)',
          },
        },
        'slide-up': {
          '0%': {
            transform: 'translateY(100%)',
          },
          '100%': {
            transform: 'translateY(0)',
          },
        },
        'slide-down': {
          '0%': {
            transform: 'translateY(0)',
          },
          '100%': {
            transform: 'translateY(100%)',
          },
        },
        'zoom-in': {
          '0%': {
            transform: 'scale(0)',
          },
          '100%': {
            transform: 'scale(1)',
          },
        },
      },
      padding: {
        layout: '16px',
      },
    },
    animationDelay: {
      'negative-1000': '-1000ms',
    },
  },
  plugins: [
    require('tailwindcss-animation-delay'),
    require('@tailwindcss/line-clamp'),
    rotateX,
  ],
};
