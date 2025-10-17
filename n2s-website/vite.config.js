import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    outDir: 'dist',
    sourcemap: false, // Disable sourcemaps in production for better security
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.log in production
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          gsap: ['gsap'],
          icons: ['@fortawesome/react-fontawesome', '@fortawesome/free-solid-svg-icons', '@fortawesome/free-brands-svg-icons'],
          animations: ['framer-motion'],
        },
        // Optimize chunk naming for better caching
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const extType = assetInfo.name.split('.').at(1);
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType ?? '')) {
            return `assets/images/[name]-[hash][extname]`;
          }
          if (/css/i.test(extType ?? '')) {
            return `assets/css/[name]-[hash][extname]`;
          }
          return `assets/[name]-[hash][extname]`;
        },
      },
    },
    // Enable gzip compression
    reportCompressedSize: true,
    // Optimize for better performance
    target: 'esnext',
    cssCodeSplit: true,
  },
  server: {
    port: 3000,
    host: true, // Enable network access
  },
  assetsDir: 'assets',
  preview: {
    port: 3000,
    host: true,
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'gsap'],
    exclude: ['@vite/client', '@vite/env'],
  },
  // Enable esbuild for faster builds
  esbuild: {
    logOverride: { 'this-is-undefined-in-esm': 'silent' },
  },
})
