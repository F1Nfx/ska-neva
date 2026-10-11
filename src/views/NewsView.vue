<script setup lang="ts">
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { news, tagColors, type Tag } from '@/data/news'

const activeTag = ref<'Все' | Tag>('Все')

const tags: ('Все' | Tag)[] = ['Все', 'Матч', 'Трансфер', 'Интервью', 'Клуб']

const filteredNews = computed(() => {
  if (activeTag.value === 'Все') return news
  return news.filter((n) => n.tag === activeTag.value)
})
</script>

<template>
  <div class="bg-ska-navy min-h-screen">
    <section class="max-w-7xl mx-auto px-6 py-12">

      <div class="mb-10">
        <h1 class="text-ska-white text-3xl lg:text-5xl font-black tracking-wide uppercase">
          Новости
        </h1>
        <p class="text-ska-silver/60 text-sm mt-2 uppercase tracking-wider">
          Все события клуба · Сезон 2025/26
        </p>
      </div>

      <!-- Фильтры -->
      <div class="flex flex-wrap items-center gap-2 mb-10 pb-6 border-b border-ska-blue/30">
        <button
          v-for="tag in tags"
          :key="tag"
          @click="activeTag = tag"
          class="px-4 py-2 rounded-md text-sm font-semibold uppercase tracking-wider transition-all duration-200"
          :class="activeTag === tag
            ? 'bg-ska-red text-ska-white shadow-lg shadow-ska-red/30'
            : 'bg-transparent text-ska-silver border border-ska-blue/50 hover:border-ska-silver hover:text-ska-white'"
        >
          {{ tag }}
        </button>
        <span class="ml-auto text-ska-silver/50 text-xs uppercase tracking-wider">
          {{ filteredNews.length }} новостей
        </span>
      </div>

      <!-- Сетка новостей -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <RouterLink
          v-for="item in filteredNews"
          :key="item.id"
          :to="`/news/${item.id}`"
          class="group bg-[#0A1425] border border-ska-blue/30 rounded-2xl overflow-hidden
                 hover:border-ska-red/60 transition-all duration-300
                 hover:-translate-y-1 hover:shadow-2xl hover:shadow-ska-red/10"
        >
          <div
            class="relative aspect-[16/10] flex items-center justify-center bg-gradient-to-br"
            :class="item.gradient"
          >
            <span class="text-7xl opacity-90 drop-shadow-2xl transition-transform duration-500 group-hover:scale-110">
              {{ item.icon }}
            </span>
            <div class="absolute inset-0 opacity-10"
                 style="background-image: radial-gradient(circle, #fff 1px, transparent 1px); background-size: 20px 20px;"></div>
            <div class="absolute inset-0 bg-gradient-to-t from-[#0A1425] via-transparent to-transparent"></div>
            <span
              class="absolute top-4 left-4 px-3 py-1 rounded-full text-ska-white text-[11px] font-bold uppercase tracking-wider shadow-lg"
              :class="tagColors[item.tag]"
            >
              {{ item.tag }}
            </span>
          </div>

          <div class="p-6">
            <h3 class="text-ska-white text-lg font-bold leading-snug mb-3 group-hover:text-ska-red transition-colors">
              {{ item.title }}
            </h3>
            <p class="text-ska-silver/60 text-sm leading-relaxed mb-5">
              {{ item.excerpt }}
            </p>
            <div class="flex items-center justify-between pt-4 border-t border-ska-blue/20">
              <span class="text-ska-silver/50 text-xs uppercase tracking-wider">
                {{ item.date }}
              </span>
              <span class="text-ska-red text-xs font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
                Читать →
              </span>
            </div>
          </div>
        </RouterLink>
      </div>

      <div v-if="filteredNews.length === 0" class="text-center py-20 text-ska-silver/50">
        Новостей по этому тегу пока нет
      </div>

    </section>
  </div>
</template>