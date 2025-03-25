import { createApp } from 'vue' // Core do Vue 3 para criação da aplicação
import App from './App.vue' // Componente raiz da aplicação
import { createPinia } from 'pinia' // Biblioteca para gerenciamento de estado global
import router from './router' // Configurações de roteamento da aplicação
import vuetify from './plugins/vuetify' // Framework de UI Vuetify
import '@/assets/styles/reset.scss' // Estilos reset CSS (SCSS) globais

// Componentes e estilos do ArcGIS Calcite Design System
import { defineCustomElements } from '@esri/calcite-components/dist/loader'
import '@esri/calcite-components/dist/calcite/calcite.css'

// Cria a instância principal da aplicação Vue
const app = createApp(App)

// =============================================
// CONFIGURAÇÃO DO CALCITE COMPONENTS
// =============================================

/**
 * Registra os web components do Calcite Design System
 * Permite o uso de componentes como <calcite-button>, <calcite-icon>, etc.
 */
defineCustomElements(window)

// =============================================
// REGISTRO DE PLUGINS ESSENCIAIS
// =============================================

app.use(createPinia()) // Habilita o gerenciamento de estado com Pinia
app.use(router) // Habilita o sistema de roteamento
app.use(vuetify) // Habilita o framework de UI Vuetify

// =============================================
// INICIALIZAÇÃO DA APLICAÇÃO
// =============================================

// Monta a aplicação no elemento #app do DOM
app.mount('#app')
