import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Redirect API calls
      '/api': {
        target: 'http://localhost:3000', // Target server
        changeOrigin: true, // Needed for virtual hosted sites
      },
    },
  },
})
