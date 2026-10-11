<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="min-h-[70vh] flex items-center justify-center px-6 py-20">
    <div class="max-w-2xl mx-auto text-center">

      <!-- Огромные цифры -->
      <div class="relative mb-8">
        <span class="text-[140px] lg:text-[200px] font-black leading-none
                     bg-gradient-to-br from-ska-red to-ska-blue
                     bg-clip-text text-transparent select-none">
          404
        </span>
        <div class="absolute inset-0 bg-[radial-gradient(circle,_rgba(200,16,46,0.2),_transparent_70%)]
                    blur-3xl -z-10"></div>
      </div>

      <h1 class="text-ska-white text-2xl lg:text-4xl font-black tracking-wide uppercase mb-4">
        Упс
      </h1>

      <p class="text-ska-silver/70 text-base lg:text-lg leading-relaxed mb-10 max-w-lg mx-auto">
        Страница, которую вы ищете, не найдена. Возможно, она была перемещена или удалена
      </p>

      <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
        <RouterLink
          to="/"
          class="w-full sm:w-auto px-8 py-3.5 bg-ska-red hover:bg-red-700
                 text-ska-white font-bold text-sm uppercase tracking-wider
                 rounded-md transition-all hover:scale-105 shadow-lg shadow-ska-red/30"
        >
          На главную
        </RouterLink>
        <RouterLink
          to="/matches"
          class="w-full sm:w-auto px-8 py-3.5 border-2 border-ska-silver/40 hover:border-ska-silver
                 text-ska-white font-bold text-sm uppercase tracking-wider
                 rounded-md transition-all hover:bg-ska-silver/10"
        >
          К матчам
        </RouterLink>
      </div>

    </div>
  </div>
</template>