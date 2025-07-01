import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
    server: {
    proxy: {
      "/server": {
        target: "http://localhost:5001",
        secure: false,
      },
    },
  },
  plugins: [react()],
})
