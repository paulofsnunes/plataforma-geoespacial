<template>
  <!-- Template básico do componente de mapa -->
  <div ref="mapView" class="map-view" style="height: 100%">
    <!-- Modal de busca -->
    <v-dialog v-model="mapStore.isSearchModalOpen" max-width="500px" persistent>
      <!-- Conteúdo do modal -->
      <v-card>
        <v-card-title class="px-4">
          <v-row no-gutters align="center">
            <v-col cols="2"></v-col>
            <v-col cols="8" class="text-center">
              <span>BUSCAR BAIRRO</span>
            </v-col>
            <v-col cols="2" class="text-right">
              <v-icon @click="closeModal"> mdi-close </v-icon>
            </v-col>
          </v-row>
        </v-card-title>

        <v-card-text>
          <!-- Container onde o widget de busca será renderizado -->
          <div ref="searchContainer" class="search-container"></div>
        </v-card-text>

        <v-card-actions class="padding-search">
          <!-- Botão customizado para acionar a busca -->
          <button @click="triggerSearch" class="custom-search-btn">
            <span class="icon">
              <SearchIcon />
            </span>
            <span class="text">BUSCAR</span>
          </button>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue'
import { useMapStore } from '@/stores/mapStore'
import Map from '@arcgis/core/Map'
import MapView from '@arcgis/core/views/MapView'
import FeatureLayer from '@arcgis/core/layers/FeatureLayer'
import LayerList from '@arcgis/core/widgets/LayerList'
import Expand from '@arcgis/core/widgets/Expand'
import Legend from '@arcgis/core/widgets/Legend'
import Search from '@arcgis/core/widgets/Search'
import SearchIcon from '@/assets/icons/SearchIcon.vue'

// Referências aos elementos do template
const mapView = ref(null)
const searchContainer = ref(null)
const mapStore = useMapStore()
let searchWidget = null
let view = null

const createSearchWidget = () => {
  // Obtém a configuração da camada de bairros do store
  const bairrosConfig = mapStore.getLayerConfig('bairros')

  // Cria uma nova instância da camada de bairros com configurações específicas para busca
  const bairrosLayer = new FeatureLayer({
    ...bairrosConfig,
    outFields: ['*'], // Garante que todos os campos serão retornados na busca
    popupTemplate: { title: '{bairro}' }, // Template para exibição no popup
  })

  // Cria e retorna o widget de busca configurado
  return new Search({
    view: view,
    container: searchContainer.value,
    includeDefaultSources: false, // Desabilita as fontes de busca padrão
    allPlaceholder: 'Buscar bairro...',
    sources: [
      {
        layer: bairrosLayer,
        searchFields: ['bairro'], // Campos que serão usados para a busca
        displayField: 'bairro', // Campo que será exibido nos resultados
        exactMatch: false, // Permite busca por partes do texto
        outFields: ['*'], // Retorna todos os campos no resultado
        name: 'Bairros',
        placeholder: 'Nome do bairro',
        suggestionsEnabled: true, // Habilita sugestões durante a digitação
      },
    ],
  })
}

const initializeSearchWidget = async () => {
  // Aguarda o próximo tick do Vue e um pequeno delay para garantir que o DOM está pronto
  await nextTick()
  await new Promise((resolve) => setTimeout(resolve, 100))

  if (!view || !searchContainer.value) return

  // Destrói o widget anterior se existir
  if (searchWidget) {
    searchWidget.destroy()
    searchWidget = null
  }

  // Cria um novo widget de busca
  searchWidget = createSearchWidget()

  // Configura o evento que é disparado quando uma busca é completada
  searchWidget.on('search-complete', (event) => {
    if (event.results?.length > 0 && event.results[0].results?.length > 0) {
      const feature = event.results[0].results[0].feature
      const attributes = feature.attributes

      /**
       * Função auxiliar para normalizar nomes de campos.
       * Em bancos de dados geográficos, os nomes dos campos podem variar (maiúsculas, minúsculas, etc).
       * Esta função tenta encontrar o valor do campo independentemente de como ele está nomeado.
       *
       * @param {Array} possibleNames - Array de possíveis nomes para o campo
       * @returns {*} O valor do campo ou 'Não disponível' se não encontrado
       */
      const getFieldValue = (possibleNames) => {
        for (const name of possibleNames) {
          if (attributes[name] !== undefined) return attributes[name]
        }
        return 'Não disponível'
      }

      // Move a visualização para o local encontrado
      view
        .goTo({
          target: feature.geometry,
          zoom: 15,
        })
        .then(() => {
          // Armazena o feature selecionado no store, normalizando os nomes dos campos
          mapStore.selectedFeature = {
            objectid: getFieldValue(['objectid', 'OBJECTID', 'ObjectID', 'fid', 'FID']),
            bairro: getFieldValue(['bairro', 'Bairro', 'BAIRRO', 'nome', 'NOME', 'Nome']),
            geometry: feature.geometry,
          }
          // Abre o menu lateral e fecha o modal
          mapStore.isSideMenuOpen = true
          closeModal()
        })
    }
  })
}

const triggerSearch = () => {
  // Aciona a busca programaticamente
  searchWidget?.search()
}

const closeModal = () => {
  mapStore.isSearchModalOpen = false
}

onMounted(() => {
  // Configuração inicial do mapa
  const map = new Map({ basemap: 'streets-vector' })

  // Cria a visualização do mapa
  view = new MapView({
    container: mapView.value,
    map: map,
    center: [-51.23, -30.0331], // Coordenadas iniciais (Porto Alegre)
    zoom: 12,
  })

  // Cria todas as camadas usando as configurações do store
  const bairrosLayer = new FeatureLayer(mapStore.getLayerConfig('bairros'))
  const eixosLayer = new FeatureLayer(mapStore.getLayerConfig('eixos'))
  const regioesLayer = new FeatureLayer(mapStore.getLayerConfig('regioes'))
  const pontosLayer = new FeatureLayer(mapStore.getLayerConfig('pontos'))

  // Adiciona as camadas ao mapa
  map.addMany([pontosLayer, regioesLayer, eixosLayer, eixosLayer, bairrosLayer])

  // Configura o widget de lista de camadas
  const layerList = new LayerList({ view: view })
  const layerListExpand = new Expand({
    view: view,
    content: layerList,
    expanded: false,
    expandIcon: 'layers',
    expandTooltip: 'Mostrar camadas',
    collapseTooltip: 'Ocultar camadas',
  })
  view.ui.add(layerListExpand, 'top-left')

  // Configura o widget de legenda
  const legend = new Legend({
    view: view,
    layerInfos: [
      { layer: bairrosLayer, title: mapStore.getLayerConfig('bairros').title },
      { layer: eixosLayer, title: mapStore.getLayerConfig('eixos').title },
      { layer: regioesLayer, title: mapStore.getLayerConfig('regioes').title },
      { layer: pontosLayer, title: mapStore.getLayerConfig('pontos').title },
    ],
  })
  view.ui.add(legend, 'bottom-left')

  // Configura o evento de clique no mapa
  view.on('click', async (event) => {
    // Verifica se o clique foi em um bairro
    const hitTestResult = await view.hitTest(event)
    const graphic = hitTestResult.results.find(
      (result) => result.graphic?.layer === bairrosLayer,
    )?.graphic

    if (graphic) {
      // Se clicou em um bairro, armazena no store e abre o menu lateral
      mapStore.selectedFeature = { ...graphic.attributes, geometry: graphic.geometry }
      mapStore.isSideMenuOpen = true
    } else {
      // Se não clicou em um bairro, limpa a seleção e fecha o menu
      mapStore.selectedFeature = null
      mapStore.isSideMenuOpen = false
    }
  })

  // Armazena a view e a camada no store para acesso global
  mapStore.mapView = view
  mapStore.bairrosLayer = bairrosLayer
})

// Observa a abertura/fechamento do modal para inicializar/destruir o widget de busca
watch(
  () => mapStore.isSearchModalOpen,
  async (isOpen) => {
    if (isOpen) await initializeSearchWidget()
  },
)

onUnmounted(() => {
  // Limpeza: destrói o widget de busca quando o componente é desmontado
  searchWidget?.destroy()
})
</script>

<style scoped lang="scss">
.map-view {
  width: 100%;
  height: 100vh;
  position: relative;

  // Modal e conteúdo
  .search-modal {
    .modal-content {
      .search-container {
        height: 50px;
        width: 100%;
        margin: 10px 0;
      }
    }
  }
}

// Componentes do ArcGIS - Sintaxe corrigida
:deep(.esri-search) {
  width: 100%;
}

// Classes utilitárias
.text {
  &-center {
    text-align: center;
  }

  &-right {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
}

// Botão customizado
.custom-search-btn {
  width: 100%;
  background-color: #212121;
  color: white;
  border: none;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  transition: all 0.3s ease;
  border-radius: 4px;

  &:hover {
    background-color: #424242;
    color: white;
    outline: 1px solid #212121;
  }

  .icon {
    display: flex;
    align-items: center;

    &:hover {
      color: white;
    }
  }

  .text {
    font-weight: 600;
    letter-spacing: 0.5px;
  }
}

.padding-search {
  padding: 0 24px 20px;
}
</style>
