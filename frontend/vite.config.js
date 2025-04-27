import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  content: [
    './src/**/*.{js,jsx,ts,tsx,html}',
    './ComponentsStyleSheet/**/*.css', // include custom CSS if needed
  ],
  plugins: [react(), tailwindcss()],
})
