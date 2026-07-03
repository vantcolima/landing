import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0d1311',
        surface: '#121816',
        surfaceAlt: '#151b19',
        accent: '#e38569',
      },
      boxShadow: {
        glow: '0 30px 80px rgba(0, 0, 0, 0.32)',
      },
    },
  },
  plugins: [],
};

export default config;