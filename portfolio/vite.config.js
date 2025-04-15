import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()
           ],
  base:'./',
  build: {
    outDir: '../portfolio-prod', // Specify your custom output directory here
  },
  assetsInclude: ["**/*.md"], // Treat .md files as raw assets
})
