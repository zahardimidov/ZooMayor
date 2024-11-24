import { Config } from 'tailwindcss'
import twAnimate from 'tailwindcss-animate'

const config = {
  darkMode: ['class'],
  content: ['./src/**/*.{tsx,ts,jsx,js}'],
  theme: {
    extend: {
      colors: {
        green: '#009a00',
        grey: '#b3b3b3',
        red: '#cf2800',
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [twAnimate],
} satisfies Config

export default config
