import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
    server: {
      proxy: {
        "^/server": {
          target: "http://back-end:6556",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/server/, '')
        },
      },
  },
  plugins: [react()],
})
