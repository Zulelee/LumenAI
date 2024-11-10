import type { Config } from 'tailwindcss'

const config: Config = {
    darkMode: ['class'],
    content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
  	extend: {
  		colors: {
        'rich-black': '#050505',
        'electric-purple': '#B829E8',
        'cyber-blue': '#2DE2E6',
        'hot-pink': '#FF3864',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      boxShadow: {
        'glow-pink': '0 0 15px rgba(255, 56, 100, 0.7)',
        'glow-purple': '0 0 15px rgba(184, 41, 232, 0.7)',
        'glow-blue': '0 0 15px rgba(45, 226, 230, 0.7)',
      },

  	}
  },
  plugins: [require("tailwindcss-animate")],
}
export default config
