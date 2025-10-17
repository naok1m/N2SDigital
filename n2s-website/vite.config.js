import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    outDir: 'dist',
    sourcemap: false, // Desabilitar sourcemaps em produção
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remover console.logs em produção
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
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
})
