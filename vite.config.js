import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: [
      'norseai.sunshinek12.com',
      'www.norseai.sunshinek12.com',
      'localhost'
    ]  
  },    
})
