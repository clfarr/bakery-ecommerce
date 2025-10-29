import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fdf8f6',
          100: '#f9ede8',
          200: '#f2d8ce',
          300: '#e9bfae',
          400: '#dc9b83',
          500: '#d17f5f',
          600: '#c06648',
          700: '#a0523a',
          800: '#844535',
          900: '#6d3b2f',
        },
      },
    },
  },
  plugins: [],
}
export default config
