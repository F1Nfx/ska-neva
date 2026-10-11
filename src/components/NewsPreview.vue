<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { news, tagColors } from '@/data/news'

// Берём только 3 первые новости
const preview = news.slice(0, 3)
</script>

<template>
  <section class="bg-ska-navy py-16 border-t border-ska-blue/20">
    <div class="max-w-7xl mx-auto px-6">

      <!-- Заголовок -->
      <div class="flex items-end justify-between mb-8">
        <div>
          <h2 class="text-ska-white text-2xl lg:text-3xl font-bold tracking-wide uppercase">
            Новости
          </h2>
          <p class="text-ska-silver/60 text-sm mt-1">
            Последние события клуба
          </p>
        </div>
        <RouterLink
          to="/news"
          class="hidden sm:inline-flex items-center gap-2
                 text-ska-red hover:text-ska-white text-sm font-semibold
                 uppercase tracking-wider transition-colors"
        >
          Все новости
          <span>→</span>
        </RouterLink>
      </div>

      <!-- Сетка карточек -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        <RouterLink
          v-for="item in preview"
          :key="item.id"
          :to="`/news/${item.id}`"
          class="group bg-[#0A1425] border border-ska-blue/30 rounded-2xl overflow-hidden
                 hover:border-ska-red/60 transition-all duration-300
                 hover:-translate-y-1 hover:shadow-2xl hover:shadow-ska-red/10"
        >

          <!-- Превью -->
          <div
            class="relative aspect-[16/10] flex items-center justify-center
                   bg-gradient-to-br"
            :class="item.gradient"
          >
            <span class="text-7xl opacity-90 drop-shadow-2xl
                         transition-transform duration-500 group-hover:scale-110">
              {{ item.icon }}
            </span>

            <div class="absolute inset-0 opacity-10"
                 style="background-image: radial-gradient(circle, #fff 1px, transparent 1px); background-size: 20px 20px;"></div>

            <div class="absolute inset-0 bg-gradient-to-t from-[#0A1425] via-transparent to-transparent"></div>

            <span
              class="absolute top-4 left-4 px-3 py-1 rounded-full
                     text-ska-white text-[11px] font-bold uppercase tracking-wider
                     shadow-lg"
              :class="tagColors[item.tag]"
            >
              {{ item.tag }}
            </span>
          </div>

          <!-- Контент -->
          <div class="p-6">
            <h3 class="text-ska-white text-lg font-bold leading-snug mb-4
                       group-hover:text-ska-red transition-colors">
              {{ item.title }}
            </h3>

            <div class="flex items-center justify-between pt-4 border-t border-ska-blue/20">
              <span class="text-ska-silver/60 text-xs uppercase tracking-wider">
                {{ item.date }}
              </span>
              <span class="text-ska-red text-xs font-bold uppercase tracking-wider
                           opacity-0 group-hover:opacity-100 transition-opacity">
                Читать →
              </span>
            </div>
          </div>

        </RouterLink>

      </div>

      <!-- Мобильная кнопка -->
      <div class="sm:hidden mt-8 text-center">
        <RouterLink
          to="/news"
          class="text-ska-red text-sm font-semibold uppercase tracking-wider"
        >
          Все новости →
        </RouterLink>
      </div>

    </div>
  </section>
</template>