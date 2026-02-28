import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        mining: {
          50: '#f5f5f0',
          100: '#e8e6dc',
          200: '#d4d0bf',
          300: '#b8b29a',
          400: '#9a9175',
          500: '#7d7358',
          600: '#635b46',
          700: '#4f4839',
          800: '#413c31',
          900: '#37332b',
          950: '#1e1c17',
        },
        earth: {
          50: '#faf8f5',
          100: '#f2ede4',
          200: '#e5d8c5',
          300: '#d4bc9b',
          400: '#c29b6f',
          500: '#b5804e',
          600: '#a8683e',
          700: '#8c5233',
          800: '#73432e',
          900: '#5e3829',
          950: '#351d16',
        }
      },
    },
  },
  plugins: [],
}
export default config