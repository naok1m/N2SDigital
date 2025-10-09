import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    outDir: 'dist',
  },
  server: {
    port: 3000,
  },
  assetsDir: 'assets',
  soucetMap: true,
  minify: 'terser',
  rollupOptions: {
    output: {
      manualChunks:{
        vendor: ['react', 'react-dom'],
        icons: ['lucide-react']
      },
    },
  },
  preview: {port: 3000},
  open: true  
})
