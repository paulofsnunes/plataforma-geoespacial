<template>
  <!-- Drawer de navegação lateral direito -->
  <v-navigation-drawer v-model="mapStore.isSideMenuOpen" app permanent right location="right">
    <!-- Cabeçalho do menu -->
    <v-list-item>
      <v-list-item-title class="title">Dados do bairro</v-list-item-title>
    </v-list-item>

    <!-- Conteúdo dinâmico baseado na seleção -->
    <v-list-item v-if="mapStore.selectedFeature" :key="mapStore.selectedFeature.objectid">
      <!-- Exibe ID do bairro selecionado -->
      <v-list-item-subtitle>
        <strong>ID:</strong> {{ mapStore.selectedFeature.objectid }}
      </v-list-item-subtitle>

      <!-- Exibe nome do bairro selecionado -->
      <v-list-item-subtitle>
        <strong>Nome:</strong> {{ mapStore.selectedFeature.bairro }}
      </v-list-item-subtitle>
    </v-list-item>

    <!-- Estado quando nenhum bairro está selecionado -->
    <v-list-item v-else>
      <v-list-item-subtitle>Nenhuma feição selecionada.</v-list-item-subtitle>
    </v-list-item>
  </v-navigation-drawer>
</template>

<script setup>
/**
 * Componente SideMenu - Menu lateral que exibe informações do bairro selecionado
 *
 * Funcionalidades:
 * - Exibe detalhes do bairro selecionado no mapa
 * - Gerencia seu estado de visibilidade através do store
 */
import { useMapStore } from '@/stores/mapStore'

// Acesso ao store do mapa para gerenciar estado
const mapStore = useMapStore()
</script>

<style scoped lang="scss">
.v-navigation-drawer {
  // Estilo para o título do menu
  .title {
    font-weight: bold;
    font-size: 1.2rem;
    color: #212121;
  }

  // Estilo para os itens de lista
  .v-list-item {
    padding: 12px 16px;

    // Estilo para os subtítulos
    &-subtitle {
      margin-top: 4px;
      color: #424242;

      // Destaque para os rótulos (ID, Nome)
      strong {
        color: #212121;
        font-weight: 600;
      }
    }
  }
}
</style>
