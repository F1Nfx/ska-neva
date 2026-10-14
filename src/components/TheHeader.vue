<script setup lang="ts">
import { RouterLink } from 'vue-router'

const navItems = [
  { name: 'Главная', path: '/' },
  { name: 'Матчи', path: '/matches' },
  { name: 'Команда', path: '/team' },
  { name: 'Новости', path: '/news' },
  { name: 'Клуб', path: '/club' },
]
</script>

<template>
  <header class="bg-ska-navy border-b border-ska-blue/40 sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

      <RouterLink to="/" class="flex items-center gap-3">
        <img
          src="/logo-icon.png"
          alt="ПФК СКА-Нева"
          class="w-16 h-16 object-contain"
        />
        <div class="hidden sm:flex flex-col leading-none">
          <span class="text-ska-white text-lg font-bold tracking-wider">СКА-НЕВА</span>
          <span class="text-ska-silver text-[10px] tracking-[0.25em] uppercase">Санкт-Петербург</span>
        </div>
      </RouterLink>

      <nav class="hidden lg:flex items-center gap-1">
        <RouterLink
          v-for="item in navItems"
          :key="item.path"
          :to="item.path"
          class="px-4 py-2 text-sm font-medium text-ska-silver hover:text-ska-white
                 transition-colors rounded-md hover:bg-ska-blue/30"
          active-class="!text-ska-white bg-ska-blue/40"
        >
          {{ item.name }}
        </RouterLink>
      </nav>

      <RouterLink
        to="/tickets"
        class="hidden md:inline-flex items-center gap-2 px-5 py-2.5
               bg-ska-red hover:bg-red-700 text-ska-white text-sm font-semibold
               rounded-md transition-colors"
      >
        Купить билет
      </RouterLink>

    </div>
  </header>
</template>