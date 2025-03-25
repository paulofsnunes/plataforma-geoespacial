import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components' // Importa todos os componentes do Vuetify
import * as directives from 'vuetify/directives' // Importa todas as diretivas do Vuetify
import '@mdi/font/css/materialdesignicons.css' // Importa os ícones Material Design

/**
 * Configuração principal do Vuetify
 *
 * Responsável por:
 * - Registrar todos os componentes e diretivas do Vuetify
 * - Definir o tema padrão da aplicação
 * - Configurar o conjunto de ícones padrão
 */
export default createVuetify({
  /**
   * Componentes do Vuetify
   * Registra todos os componentes disponíveis para uso global
   * (v-btn, v-card, v-dialog, etc.)
   */
  components,

  /**
   * Diretivas do Vuetify
   * Habilita funcionalidades como v-ripple, v-intersect, etc.
   */
  directives,

  /**
   * Configuração de temas
   *
   * Atualmente usando o tema 'light' como padrão
   */
  theme: {
    defaultTheme: 'light', // Tema claro como padrão
  },

  /**
   * Configuração de ícones
   *
   * Usa Material Design Icons (mdi) como conjunto padrão
   * Permite fácil uso de ícones com o prefixo 'mdi-'
   */
  icons: {
    defaultSet: 'mdi', // Conjunto de ícones padrão
  },
})
