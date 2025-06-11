<template>
  <v-app>
    <AppBar />
    
    <v-main class="bg-black">
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import AppBar from '@ui/components/shared/AppBar.vue'
</script>

<style>
.v-application {
  background-color: #111 !important;
  color: white;
}

.v-main {
  padding-top: 64px;
}
</style>