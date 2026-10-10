<script setup lang="ts">
import { RouterView } from 'vue-router'
import TheHeader from './components/TheHeader.vue'
</script>

<template>
  <div class="min-h-screen bg-ska-navy text-ska-white flex flex-col">
    <TheHeader />
    <main class="flex-1">
      <RouterView />
    </main>
  </div>
</template>