import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

/**
 * Configuração otimizada do Vite para:
 * - Vue 3
 * - Porta 3000 fixa
 */
export default defineConfig({
  plugins: [vue()],

  // Configurações do servidor
  server: {
    port: 3000, // Porta fixa para desenvolvimento
    host: 'localhost', // Garante acesso via localhost
    strictPort: true, // Evita mudança automática de porta
  },

  // Aliases para imports
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
