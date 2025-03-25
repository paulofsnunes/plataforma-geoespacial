<template>
  <!-- Container principal que ocupa 100% da altura -->
  <div style="height: 100%">
    <!-- Componente MapView que contém todo o mapa e funcionalidades geoespaciais -->
    <MapView />
  </div>
</template>

<script setup>
/**
 * HomeView - Componente de layout principal da aplicação
 *
 * Função:
 * - Serve como container base para o componente MapView
 * - Garante o layout correto para o sistema de mapas
 */
import MapView from '@/components/MapView.vue'
</script>
