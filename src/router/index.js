import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue' // View principal contendo o mapa geoespacial

/**
 * Configuração das rotas da aplicação
 * Atualmente contém apenas a rota principal ('/') que renderiza o mapa
 */
const routes = [
  {
    path: '/', // Rota raiz da aplicação
    name: 'home', // Nome de referência para a rota
    component: HomeView, // Componente que será renderizado (contém o mapa)
  },
]

/**
 * Cria a instância do roteador com configurações básicas
 */
const router = createRouter({
  /**
   * Modo de histórico HTML5 (limpa URLs removendo o #)
   * Usa a URL base definida na configuração do Vite (import.meta.env.BASE_URL)
   */
  history: createWebHistory(import.meta.env.BASE_URL),

  routes, // Registra as rotas definidas acima
})

export default router
