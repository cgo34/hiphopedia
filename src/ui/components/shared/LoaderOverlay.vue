<template>
    <div v-if="show" class="loader-overlay">
      <v-progress-circular indeterminate color="primary" size="64"></v-progress-circular>
    </div>
  </template>
  
  <script setup lang="ts">
  defineProps<{
    show: boolean
  }>()
  </script>
  
  <style scoped lang="scss">
  .loader-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 999;
  }
  </style>