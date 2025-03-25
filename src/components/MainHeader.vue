<template>
  <v-app-bar app color="#212121">
    <v-container fluid>
      <v-row align="center" no-gutters>
        <v-col class="centered-column">
          <v-toolbar-title>Plataforma Geoespacial</v-toolbar-title>
        </v-col>

        <v-spacer></v-spacer>

        <v-col class="centered-column">
          <v-img :src="logo" max-height="40" contain class="header-logo"></v-img>
        </v-col>

        <v-spacer></v-spacer>

        <v-col class="customize-column">
          <!-- Botão de busca com ícone -->
          <v-btn icon @click="openSearchModal" class="custom-hover">
            <v-icon>mdi-magnify</v-icon>
          </v-btn>
          <!-- Botão para alternar o menu lateral -->
          <v-app-bar-nav-icon @click="toggleSideMenu" class="custom-hover"></v-app-bar-nav-icon>
        </v-col>
      </v-row>
    </v-container>
  </v-app-bar>
</template>

<script setup>
import { useMapStore } from '@/stores/mapStore'
import logo from '@/assets/img/codex-logo-light.png'

// Inicialização do store
const mapStore = useMapStore()

/**
 * Alterna a visibilidade do menu lateral
 * Usa a função toggleSideMenu do store para gerenciar o estado
 */
const toggleSideMenu = () => {
  mapStore.toggleSideMenu()
}

/**
 * Abre o modal de busca
 * Define a flag isSearchModalOpen no store como true
 */
const openSearchModal = () => {
  mapStore.isSearchModalOpen = true
}
</script>

<style scoped lang="scss">
// Estilo para os ícones nos botões hover
:deep(.custom-hover) {
  .v-icon {
    transition: color 0.3s ease;

    &:hover {
      color: #212121 !important;
    }
  }
}

// Classe para colunas centralizadas verticalmente
.centered-column {
  display: flex;
  align-items: center;
}

// Classe para coluna dos botões de ação
.customize-column {
  display: flex;
  justify-content: flex-end;
  gap: 8px;

  // Estilo específico para o ícone do menu
  .v-app-bar-nav-icon {
    margin-left: 8px;
  }
}

// Estilo para o logo no header
.header-logo {
  filter: brightness(0) invert(1);
  transition: filter 0.3s ease;

  &:hover {
    filter: brightness(1) invert(0);
  }
}
</style>
