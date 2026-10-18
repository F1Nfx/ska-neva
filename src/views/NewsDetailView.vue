<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

const route = useRoute()
const item = ref<any>(null)
const related = ref<any[]>([])

const tagColors: Record<string, string> = {
  'Матч': 'bg-ska-red',
  'Трансфер': 'bg-ska-blue',
  'Интервью': 'bg-emerald-600',
  'Клуб': 'bg-purple-700',
}

onMounted(async () => {
  try {
    // Загружаем саму новость
    const response = await fetch(`http://localhost:3001/api/news/${route.params.id}`)
    if (!response.ok) throw new Error('Новость не найдена')
    item.value = await response.json()
    
    if (item.value) {
      document.title = `${item.value.title} · ПФК «СКА-Нева»`
    }

    // Загружаем похожие новости
    const allRes = await fetch('http://localhost:3001/api/news')
    const allNews = await allRes.json()
    related.value = allNews.filter((n: any) => n.id !== Number(route.params.id)).slice(0, 3)
    
  } catch (error) {
    console.error(error)
    item.value = null
  }
})
</script>

<template>
  <div class="bg-ska-navy min-h-screen">

    <!-- Новость не найдена -->
    <div v-if="!item" class="max-w-7xl mx-auto px-6 py-20 text-center">
      <h1 class="text-ska-white text-3xl font-black uppercase mb-4">Новость не найдена</h1>
      <p class="text-ska-silver/60 mb-8">Возможно, она была удалена или перемещена.</p>
      <RouterLink to="/news" class="inline-flex items-center gap-2 px-6 py-3 bg-ska-red hover:bg-red-700 text-ska-white font-bold text-sm uppercase tracking-wider rounded-md transition-colors">
        ← Все новости
      </RouterLink>
    </div>

    <template v-else>
      <!-- Хлебные крошки -->
      <div class="max-w-4xl mx-auto px-6 pt-8 pb-4">
        <nav class="flex items-center gap-2 text-xs text-ska-silver/50 uppercase tracking-wider">
          <RouterLink to="/" class="hover:text-ska-white transition-colors">Главная</RouterLink>
          <span>/</span>
          <RouterLink to="/news" class="hover:text-ska-white transition-colors">Новости</RouterLink>
          <span>/</span>
          <span class="text-ska-silver truncate">{{ item.tag }}</span>
        </nav>
      </div>

      <!-- Заголовок -->
      <article class="max-w-4xl mx-auto px-6 pb-16">
        <div class="flex items-center gap-3 mb-6">
          <span class="px-3 py-1 rounded-full text-ska-white text-[11px] font-bold uppercase tracking-wider" :class="tagColors[item.tag]">
            {{ item.tag }}
          </span>
          <span class="text-ska-silver/50 text-xs uppercase tracking-wider">
            {{ item.dateStr }}
          </span>
        </div>

        <h1 class="text-ska-white text-3xl lg:text-5xl font-black leading-tight tracking-tight mb-6">
          {{ item.title }}
        </h1>

        <p class="text-ska-silver/80 text-lg leading-relaxed mb-8 pb-8 border-b border-ska-blue/30">
          {{ item.excerpt }}
        </p>

        <!-- Превью с градиентом и иконкой -->
        <div class="relative aspect-[16/9] rounded-2xl overflow-hidden mb-10 flex items-center justify-center bg-gradient-to-br" :class="item.gradient">
          <span class="text-[140px] opacity-90 drop-shadow-2xl">{{ item.icon }}</span>
          <div class="absolute inset-0 opacity-10" style="background-image: radial-gradient(circle, #fff 1px, transparent 1px); background-size: 24px 24px;"></div>
          <div class="absolute inset-0 bg-gradient-to-t from-ska-navy/60 via-transparent to-transparent"></div>
        </div>

        <!-- Текст статьи -->
        <div class="prose-custom space-y-5">
          <p v-for="(paragraph, i) in item.content" :key="i" class="text-ska-silver/90 text-base lg:text-lg leading-relaxed">
            {{ paragraph }}
          </p>
        </div>

        <!-- Автор -->
        <div class="mt-10 pt-6 border-t border-ska-blue/30 flex items-center justify-between">
          <div>
            <p class="text-ska-silver/50 text-xs uppercase tracking-widest mb-1">Автор</p>
            <p class="text-ska-white font-semibold text-sm">{{ item.author }}</p>
          </div>
          <RouterLink to="/news" class="text-ska-red hover:text-ska-white text-xs font-bold uppercase tracking-wider transition-colors">
            ← Все новости
          </RouterLink>
        </div>
      </article>

      <!-- Похожие новости -->
      <section class="max-w-7xl mx-auto px-6 pb-20 border-t border-ska-blue/20 pt-14" v-if="related.length > 0">
        <div class="flex items-center gap-3 mb-8">
          <div class="w-1 h-6 bg-ska-red rounded"></div>
          <h2 class="text-ska-white text-xl lg:text-2xl font-bold tracking-wide uppercase">
            Читайте также
          </h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <RouterLink
            v-for="rel in related"
            :key="rel.id"
            :to="`/news/${rel.id}`"
            class="group bg-[#0A1425] border border-ska-blue/30 rounded-2xl overflow-hidden hover:border-ska-red/60 transition-all duration-300 hover:-translate-y-1"
          >
            <div class="relative aspect-[16/10] flex items-center justify-center bg-gradient-to-br" :class="rel.gradient">
              <span class="text-5xl opacity-90">{{ rel.icon }}</span>
              <div class="absolute inset-0 opacity-10" style="background-image: radial-gradient(circle, #fff 1px, transparent 1px); background-size: 20px 20px;"></div>
              <div class="absolute inset-0 bg-gradient-to-t from-[#0A1425] via-transparent to-transparent"></div>
              <span class="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-ska-white text-[10px] font-bold uppercase tracking-wider" :class="tagColors[rel.tag]">
                {{ rel.tag }}
              </span>
            </div>
            <div class="p-5">
              <h3 class="text-ska-white font-bold text-sm leading-snug mb-2 group-hover:text-ska-red transition-colors line-clamp-2">
                {{ rel.title }}
              </h3>
              <p class="text-ska-silver/50 text-xs">{{ rel.dateStr }}</p>
            </div>
          </RouterLink>
        </div>
      </section>
    </template>

  </div>
</template>