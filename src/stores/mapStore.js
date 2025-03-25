import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useMapStore = defineStore('map', () => {
  // =============================================
  // ESTADO DA APLICAÇÃO
  // =============================================

  // Estado da UI (controla visibilidade dos componentes)
  const isSideMenuOpen = ref(false) // Menu lateral direito
  const isSearchModalOpen = ref(false) // Modal de busca

  // Dados geoespaciais e referências
  const selectedFeature = ref(null) // Feição selecionada no mapa (bairro)
  const mapView = ref(null) // Referência para a instância do mapa (ArcGIS)
  const bairrosLayer = ref(null) // Referência para a camada de bairros

  // =============================================
  // CONFIGURAÇÕES DAS CAMADAS
  // Centralizadas aqui para fácil manutenção e acesso global
  // =============================================
  const layerConfigs = ref({
    bairros: {
      url:
        import.meta.env.VITE_BAIRROS_LAYER_URL ||
        'https://arcgis-ope.codexremote.com.br/server/rest/services/Hosted/Camadas_Teste/FeatureServer/4',
      title: 'Bairros',
      outFields: ['objectid', 'bairro'], // Campos que serão buscados
      popupTemplate: { title: 'Bairro: {bairro}' }, // Template para popup
    },
    eixos: {
      url:
        import.meta.env.VITE_EIXOS_LAYER_URL ||
        'https://arcgis-ope.codexremote.com.br/server/rest/services/Hosted/Camadas_Teste/FeatureServer/2',
      title: 'Eixos',
    },
    regioes: {
      url:
        import.meta.env.VITE_REGIOES_LAYER_URL ||
        'https://arcgis-ope.codexremote.com.br/server/rest/services/Hosted/Camadas_Teste/FeatureServer/3',
      title: 'Regiões de Planejamento',
    },
    pontos: {
      url:
        import.meta.env.VITE_PONTOS_LAYER_URL ||
        'https://arcgis-ope.codexremote.com.br/server/rest/services/Hosted/Camadas_Teste/FeatureServer/1',
      title: 'Pontos Cotados',
    },
  })

  // =============================================
  // MÉTODOS DO STORE
  // =============================================

  /**
   * Alterna a visibilidade do menu lateral
   */
  const toggleSideMenu = () => {
    isSideMenuOpen.value = !isSideMenuOpen.value
  }

  /**
   * Obtém a configuração de uma camada pelo nome
   * @param {string} layerName - Nome da camada (bairros, eixos, regioes, pontos)
   * @returns {Object} Configuração completa da camada
   */
  const getLayerConfig = (layerName) => {
    return layerConfigs.value[layerName]
  }

  // =============================================
  // EXPORTAÇÃO DO STORE
  // =============================================
  return {
    // Estado
    isSideMenuOpen,
    isSearchModalOpen,
    selectedFeature,
    mapView,
    bairrosLayer,
    layerConfigs,

    // Métodos
    getLayerConfig,
    toggleSideMenu,
  }
})
