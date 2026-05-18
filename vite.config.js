import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'

export default defineConfig({
  plugins: [tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        gardeners: resolve(import.meta.dirname, 'gardeners.html'),
        jobs: resolve(import.meta.dirname, 'jobs.html'),
        chat: resolve(import.meta.dirname, 'chat.html'),
        profile: resolve(import.meta.dirname, 'profile.html'),
        admin: resolve(import.meta.dirname, 'admin.html'),
        legal: resolve(import.meta.dirname, 'legal.html'),
      }
    }
  }
})
