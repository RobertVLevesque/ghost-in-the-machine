import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // This makes it work on both Vercel (root) and GitHub (sub-folder)
  base: './', 
  plugins: [
    react(),
    tailwindcss(),
  ],
})