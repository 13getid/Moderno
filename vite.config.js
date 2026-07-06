import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Any request to /api/... gets forwarded to Express on port 5000
      // This means React can call fetch('/api/products') directly
      // instead of fetch('http://localhost:5000/api/products')
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true
      }
    }
  }
})
