import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    hmr: false, // Disable HMR in production behind proxy    
    allowedHosts: [
      'norseai.sunshinek12.com',
      'www.norseai.sunshinek12.com',
      'localhost',
      'norseai-frontend'
    ]
  }
})

