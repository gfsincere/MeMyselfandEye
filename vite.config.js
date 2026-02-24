import { defineConfig } from 'vite'
import veauryVitePlugins from 'veaury/vite/index.js'

export default defineConfig({
  plugins: [
    veauryVitePlugins({
      type: 'react',
    })
  ],
  server: {
    port: 3000,
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        manualChunks: {
          firebase: ['firebase/app', 'firebase/auth', 'firebase/firestore', 'firebase/storage'],
          vendor: ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },
})
