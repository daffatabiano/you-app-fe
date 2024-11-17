import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'custom-radial':
          'radial-gradient(121.73% 121.49% at 100% -3.39%, #1F4247 0%, #0D1D23 56.18%, #09141A 100%)',
      },
      keyframes: {
        fall: {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '50%, 80%': {
            color: 'hsl(calc(var(--i) * 25), 100%, 50%)',
            transform: 'translateY(0)',
            opacity: '1',
          },
          '95%, 100%': { opacity: '0' },
        },
      },
      animation: { fall: 'fall 2s ease-in-out infinite' },
    },
  },
  plugins: [],
};
export default config;
