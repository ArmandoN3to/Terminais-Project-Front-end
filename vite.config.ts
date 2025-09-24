import { fileURLToPath, URL } from 'node:url'
import path from 'node:path' // Precisa desta importação
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      // E precisa desta configuração de alias
      '@': path.resolve(__dirname, './src'),
    }
  }
})