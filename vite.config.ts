import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/ghost-in-the-machine/', // THIS IS THE KEY FOR GITHUB PAGES
  plugins: [
    react(),
    tailwindcss(),
  ],
})