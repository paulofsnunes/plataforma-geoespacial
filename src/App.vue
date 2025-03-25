<template>
  <!-- Componente raiz do Vuetify que envolve toda a aplicação -->
  <v-app>
    <!-- Componente de cabeçalho principal -->
    <MainHeader />

    <!-- Menu lateral direito (contém informações do bairro selecionado) -->
    <SideMenu />

    <!-- Área principal de conteúdo onde as views serão renderizadas -->
    <v-main>
      <!-- Sistema de roteamento - Aqui as páginas serão injetadas -->
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
/**
 * App.vue - Componente raiz da aplicação
 *
 * Funções:
 * - Define a estrutura base do layout
 * - Integra os componentes globais (Header, SideMenu)
 * - Hospeda o sistema de roteamento principal
 */
import MainHeader from '@/components/MainHeader.vue'
import SideMenu from '@/components/SideMenu.vue'
</script>
