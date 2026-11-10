/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Black, white and gold is the shared visual identity across the app.
        brand: {
          50: '#fbf9f3',
          100: '#f5efe0',
          200: '#e9dfc6',
          300: '#d9c394',
          400: '#c0a062',
          500: '#8a6a1f',
          600: '#0f0f0f',
          700: '#000000',
          800: '#000000',
          900: '#000000',
          950: '#141008',
        },
        // Existing emerald utilities are used throughout the UI. Remapping
        // them keeps buttons, badges, focus states, and active tabs consistent.
        emerald: {
          50: '#fbf9f3',
          100: '#f5efe0',
          200: '#e9dfc6',
          300: '#d9c394',
          400: '#c0a062',
          500: '#8a6a1f',
          600: '#0f0f0f',
          700: '#000000',
          800: '#000000',
          900: '#000000',
          950: '#141008',
        },
        teal: {
          50: '#fbf9f3',
          100: '#f5efe0',
          200: '#e9dfc6',
          300: '#d9c394',
          400: '#c0a062',
          500: '#8a6a1f',
          600: '#0f0f0f',
          700: '#000000',
          800: '#000000',
          900: '#000000',
          950: '#141008',
        },
        indigo: {
          50: '#fbf9f3',
          100: '#f5efe0',
          200: '#e9dfc6',
          300: '#d9c394',
          400: '#c0a062',
          500: '#8a6a1f',
          600: '#0f0f0f',
          700: '#000000',
          800: '#000000',
          900: '#000000',
          950: '#141008',
        },
        purple: {
          50: '#fbf9f3',
          100: '#f5efe0',
          200: '#e9dfc6',
          300: '#d9c394',
          400: '#c0a062',
          500: '#8a6a1f',
          600: '#0f0f0f',
          700: '#000000',
          800: '#000000',
          900: '#000000',
          950: '#141008',
        },
        svteal: {
          50: '#fbf9f3',
          100: '#f5efe0',
          500: '#8a6a1f',
          700: '#6e5316',
          900: '#241a05',
        },
        svindigo: {
          50: '#fbf9f3',
          100: '#f5efe0',
          500: '#8a6a1f',
          600: '#0f0f0f',
          700: '#000000',
          900: '#000000',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['Cormorant Garamond', 'Iowan Old Style', 'Georgia', 'Times New Roman', 'serif'],
      }
    },
  },
  plugins: [],
}
