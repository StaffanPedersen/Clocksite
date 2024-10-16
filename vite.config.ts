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
  }
  // Comment out or remove the server proxy settings for production
  // server: {
  //   proxy: {
  //     '/api': {
  //       target: 'https://127.0.0.1:5001',
  //       changeOrigin: true,
  //       secure: false, // Accept self-signed certificates
  //       rewrite: (path) => path.replace(/^\/api/, '')
  //     },
  //     '/images': {
  //       target: 'https://127.0.0.1:5001',
  //       changeOrigin: true,
  //       secure: false, // Accept self-signed certificates
  //       rewrite: (path) => path.replace(/^\/images/, '')
  //     }
  //   }
  // }
})
