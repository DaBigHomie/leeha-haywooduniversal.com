import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Optimize bundle size
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'animation': ['framer-motion'],
        },
      },
    },
    // Disable source maps for production to reduce bundle size
    sourcemap: false,
    // Minify for better performance
    minify: 'esbuild',
    // Target modern browsers
    target: 'es2015',
  },
  // Optimize dev server
  server: {
    port: 3000,
  },
})
