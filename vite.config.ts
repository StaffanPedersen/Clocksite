import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

export default defineConfig({
  base: '/',
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://127.0.0.1:5001', // Local server URL
        changeOrigin: true,
        secure: false, // Accept self-signed certificates
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
      '/images': {
        target: 'https://127.0.0.1:5001', // Local server URL for images
        changeOrigin: true,
        secure: false, // Accept self-signed certificates
        rewrite: (path) => path.replace(/^\/images/, ''),
      }
    }
  }
})
