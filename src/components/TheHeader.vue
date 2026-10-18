<script setup lang="ts">
import { ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

const route = useRoute()
const isMenuOpen = ref(false)

const navItems = [
  { name: 'Главная', path: '/' },
  { name: 'Матчи', path: '/matches' },
  { name: 'Команда', path: '/team' },
  { name: 'Новости', path: '/news' },
  { name: 'Клуб', path: '/club' },
]

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}

// Закрываем меню при переходе на другую страницу
watch(() => route.path, () => {
  isMenuOpen.value = false
})
</script>

<template>
  <header class="bg-ska-navy border-b border-ska-blue/40 sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

      <!-- Логотип -->
      <RouterLink to="/" class="flex items-center gap-3 z-50 relative">
        <img
          src="/logo-icon.png"
          alt="ПФК СКА-Нева"
          class="w-12 h-12 lg:w-14 lg:h-14 object-contain"
        />
        <div class="hidden sm:flex flex-col leading-none">
          <span class="text-ska-white text-lg font-bold tracking-wider">СКА-НЕВА</span>
          <span class="text-ska-silver text-[10px] tracking-[0.25em] uppercase">Санкт-Петербург</span>
        </div>
      </RouterLink>

      <!-- Навигация (десктоп) -->
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

      <!-- CTA (десктоп) -->
      <RouterLink
        to="/tickets"
        class="hidden md:inline-flex items-center gap-2 px-5 py-2.5
               bg-ska-red hover:bg-red-700 text-ska-white text-sm font-semibold
               rounded-md transition-colors"
      >
        Купить билет
      </RouterLink>

      <!-- Бургер (мобильный) -->
      <button
        @click="toggleMenu"
        class="lg:hidden flex flex-col items-center justify-center gap-1.5
               w-11 h-11 rounded-md hover:bg-ska-blue/30 transition-colors z-50 relative"
        aria-label="Меню"
      >
        <span
          class="w-6 h-0.5 bg-ska-white transition-all duration-300"
          :class="isMenuOpen && 'rotate-45 translate-y-2'"
        ></span>
        <span
          class="w-6 h-0.5 bg-ska-white transition-all duration-300"
          :class="isMenuOpen && 'opacity-0'"
        ></span>
        <span
          class="w-6 h-0.5 bg-ska-white transition-all duration-300"
          :class="isMenuOpen && '-rotate-45 -translate-y-2'"
        ></span>
      </button>

    </div>

    <!-- Мобильное меню (Выпадает абсолютно под шапкой) -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-4"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-4"
    >
      <div
        v-if="isMenuOpen"
        class="lg:hidden absolute top-full left-0 w-full bg-ska-navy/95 backdrop-blur-md border-b border-ska-blue/40 shadow-xl"
      >
        <nav class="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-1">
          <RouterLink
            v-for="item in navItems"
            :key="item.path"
            :to="item.path"
            class="px-4 py-3 text-sm font-semibold text-ska-silver
                   hover:text-ska-white hover:bg-ska-blue/30
                   rounded-md transition-colors uppercase tracking-wider"
            active-class="!text-ska-white bg-ska-blue/40"
          >
            {{ item.name }}
          </RouterLink>

          <RouterLink
            to="/tickets"
            class="mt-2 px-4 py-3 bg-ska-red hover:bg-red-700
                   text-ska-white text-sm font-bold uppercase tracking-wider
                   rounded-md transition-colors text-center"
          >
            Купить билет
          </RouterLink>
        </nav>
      </div>
    </Transition>

  </header>
</template>