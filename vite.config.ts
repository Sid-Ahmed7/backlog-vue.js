import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig({
  plugins: [vue(), vueJsx(), vueDevTools()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    proxy: {
      '/games': {
        target: 'https://api.igdb.com/v4',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/games/, '/games'),
      },
      '/genres': {
        target: 'https://api.igdb.com/v4',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/genres/, '/genres'),
      },
      '/platforms': {
        target: 'https://api.igdb.com/v4',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/platforms/, '/platforms'),
      },
      '/release_dates': {
        target: 'https://api.igdb.com/v4',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/release_dates/, '/release_dates'),
      },
    },
    hmr: {
      protocol: 'ws',
      host: 'localhost',
      port: 5173,
    },
    watch: {
      usePolling: true,
    },
  },
})
