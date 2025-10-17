import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    outDir: 'dist',
<<<<<<< HEAD
    sourcemap: false, // Desabilitar sourcemaps em produção
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remover console.logs em produção
=======
    sourcemap: false, // Disable sourcemaps in production for better security
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.log in production
>>>>>>> a28db1b7ad5a39add824902dd69db824ba305994
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
<<<<<<< HEAD
          // Separar vendor libraries
          vendor: ['react', 'react-dom'],
          gsap: ['gsap'],
          icons: ['@fortawesome/react-fontawesome', '@fortawesome/free-solid-svg-icons'],
          // Separar componentes pesados
          components: [
            './src/components/hero.jsx',
            './src/components/services.jsx',
            './src/components/contact.jsx'
          ]
        },
        // Otimizar nomes dos chunks
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'
      },
    },
    // Otimizações de assets
    assetsInlineLimit: 4096, // Inline assets menores que 4KB
    chunkSizeWarningLimit: 1000, // Avisar sobre chunks grandes
  },
  server: {
    port: 3000,
    open: true
  },
  preview: {
    port: 3000
  },
  // Otimizações de desenvolvimento
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'gsap',
      '@fortawesome/react-fontawesome',
      '@fortawesome/free-solid-svg-icons'
    ],
    exclude: ['@fortawesome/free-brands-svg-icons'] // Excluir ícones não utilizados
  },
  // Configurações de CSS
  css: {
    devSourcemap: true
  }
=======
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
>>>>>>> a28db1b7ad5a39add824902dd69db824ba305994
})
