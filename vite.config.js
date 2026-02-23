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
  },
})
