/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#0f1117',
          card: '#1a1f2e',
          hover: '#222736'
        },
        border: {
          subtle: '#2a2f42'
        },
        accent: {
          blue: '#3b82f6',
          green: '#22c55e',
          yellow: '#eab308',
          red: '#ef4444',
          purple: '#8b5cf6',
          cyan: '#06b6d4',
          orange: '#f97316'
        }
      }
    }
  },
  plugins: []
}
