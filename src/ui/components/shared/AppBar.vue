<template>
    <v-app-bar color="#111" dark elevation="0" fixed>
      <div class="d-flex align-center">
        <v-img
          alt="Hip-Hop FR Logo"
          class="shrink cursor-pointer mr-2"
          contain
          min-width="100"
          src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
          transition="scale-transition"
          width="120"
          @click="navigateTo('/')"
        />
      </div>
  
      <v-spacer />
  
      <v-btn-group>
        <v-btn
          v-for="item in menuItems"
          :key="item.path"
          :to="item.path"
          variant="text"
          class="text-white"
        >
          <v-icon start>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
      </v-btn-group>
    </v-app-bar>
  </template>
  
  <script setup lang="ts">
  import { useRouter } from 'vue-router';

  const router = useRouter()

  const menuItems = [
    { title: 'Accueil', path: '/', icon: 'mdi-home' },
    { title: 'Vidéos', path: '/videos', icon: 'mdi-video' },
    { title: 'Acteurs', path: '/actors', icon: 'mdi-account-group' }
  ]

  const navigateTo = (path: string) => {
    router.push(path)
  }

  </script>
  
  <style scoped>
  .v-app-bar {
    background: linear-gradient(180deg, rgba(0,0,0,0.7) 10%, transparent);
  }
  
  .v-btn {
    text-transform: none;
    letter-spacing: 0.5px;
  }
  
  .v-btn:hover {
    opacity: 0.8;
  }
  </style>