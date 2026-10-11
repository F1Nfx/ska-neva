<script setup lang="ts">
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'

type Tag = 'Матч' | 'Трансфер' | 'Интервью' | 'Клуб'

type NewsItem = {
  id: number
  tag: Tag
  title: string
  excerpt: string
  date: string
  gradient: string
  icon: string
}

const allNews: NewsItem[] = [
  {
    id: 1, tag: 'Матч',
    title: 'СКА-Нева обыграла «Волгу-Тверь» со счётом 2:1 в домашнем матче',
    excerpt: 'Голами отметились Иванов и Петров. Победа позволила нашей команде подняться на второе место в таблице.',
    date: '11 октября 2026',
    gradient: 'from-ska-red via-[#8B0A1F] to-ska-navy',
    icon: '⚽',
  },
  {
    id: 2, tag: 'Трансфер',
    title: 'Клуб подписал контракт с нападающим Алексеем Соколовым',
    excerpt: '27-летний форвард переходит из «Балтики-2». Соглашение рассчитано на три сезона.',
    date: '9 октября 2026',
    gradient: 'from-ska-blue via-[#0F2444] to-ska-navy',
    icon: '✍️',
  },
  {
    id: 3, tag: 'Интервью',
    title: 'Виктор Шторм: «Мы играем в атакующий футбол и не боимся риска»',
    excerpt: 'Главный тренер — о философии команды, подготовке к дерби и работе с молодыми игроками.',
    date: '7 октября 2026',
    gradient: 'from-emerald-800 via-[#0F2444] to-ska-navy',
    icon: '🎤',
  },
  {
    id: 4, tag: 'Клуб',
    title: '«Нева-Арена» примет матч открытых дверей для болельщиков',
    excerpt: 'В следующую субботу стадион откроет двери для всех желающих — экскурсии, автограф-сессия, тренировка.',
    date: '5 октября 2026',
    gradient: 'from-purple-800 via-[#0F2444] to-ska-navy',
    icon: '🏟',
  },
  {
    id: 5, tag: 'Матч',
    title: 'Разгромное поражение в Выборге: 0:2 от «Динамо-Выборг»',
    excerpt: 'Несмотря на территориальное преимущество, реализовать моменты не удалось. Разбор матча от тренерского штаба.',
    date: '4 октября 2026',
    gradient: 'from-ska-red via-[#8B0A1F] to-ska-navy',
    icon: '⚽',
  },
  {
    id: 6, tag: 'Трансфер',
    title: 'Академия клуба выпустила пятерых игроков в основной состав',
    excerpt: 'Молодые воспитанники 2006–2007 года рождения подписали первые профессиональные контракты.',
    date: '2 октября 2026',
    gradient: 'from-ska-blue via-[#0F2444] to-ska-navy',
    icon: '✍️',
  },
  {
    id: 7, tag: 'Интервью',
    title: 'Матвей Лукальдини: «Капитанская повязка — это ответственность за каждого»',
    excerpt: 'Капитан команды — о лидерстве, атмосфере в раздевалке и целях на сезон.',
    date: '30 сентября 2026',
    gradient: 'from-emerald-800 via-[#0F2444] to-ska-navy',
    icon: '🎤',
  },
  {
    id: 8, tag: 'Клуб',
    title: 'ПФК «СКА-Нева» и «Балтийская Верфь» продлили сотрудничество',
    excerpt: 'Титульный спонсор клуба остаётся с командой ещё на три сезона. Подробности соглашения — в материале.',
    date: '28 сентября 2026',
    gradient: 'from-purple-800 via-[#0F2444] to-ska-navy',
    icon: '🏟',
  },
  {
    id: 9, tag: 'Матч',
    title: 'Уверенная победа над «Локомотивом-2» — 2:0',
    excerpt: 'Дубль Петрова и «сухой» матч Белова принесли три очка на «Нева-Арене».',
    date: '27 сентября 2026',
    gradient: 'from-ska-red via-[#8B0A1F] to-ska-navy',
    icon: '⚽',
  },
]

const activeTag = ref<'Все' | Tag>('Все')

const tags: ('Все' | Tag)[] = ['Все', 'Матч', 'Трансфер', 'Интервью', 'Клуб']

const filteredNews = computed(() => {
  if (activeTag.value === 'Все') return allNews
  return allNews.filter((n) => n.tag === activeTag.value)
})

const tagColors: Record<Tag, string> = {
  'Матч': 'bg-ska-red',
  'Трансфер': 'bg-ska-blue',
  'Интервью': 'bg-emerald-600',
  'Клуб': 'bg-purple-700',
}
</script>

<template>
  <div class="bg-ska-navy min-h-screen">
    <section class="max-w-7xl mx-auto px-6 py-12">

      <!-- Заголовок -->
      <div class="mb-10">
        <h1 class="text-ska-white text-3xl lg:text-5xl font-black tracking-wide uppercase">
          Новости
        </h1>
        <p class="text-ska-silver/60 text-sm mt-2 uppercase tracking-wider">
          Все события клуба · Сезон 2025/26
        </p>
      </div>

      <!-- Фильтры по тегам -->
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
          to="/news"
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
            <!-- Иконка -->
            <span class="text-7xl opacity-90 drop-shadow-2xl
                         transition-transform duration-500 group-hover:scale-110">
              {{ item.icon }}
            </span>

            <!-- Сетка точек -->
            <div class="absolute inset-0 opacity-10"
                 style="background-image: radial-gradient(circle, #fff 1px, transparent 1px); background-size: 20px 20px;"></div>

            <!-- Затемнение снизу -->
            <div class="absolute inset-0 bg-gradient-to-t from-[#0A1425] via-transparent to-transparent"></div>

            <!-- Тег -->
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
            <h3 class="text-ska-white text-lg font-bold leading-snug mb-3
                       group-hover:text-ska-red transition-colors">
              {{ item.title }}
            </h3>

            <p class="text-ska-silver/60 text-sm leading-relaxed mb-5">
              {{ item.excerpt }}
            </p>

            <div class="flex items-center justify-between pt-4 border-t border-ska-blue/20">
              <span class="text-ska-silver/50 text-xs uppercase tracking-wider">
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

      <!-- Пустой результат -->
      <div v-if="filteredNews.length === 0" class="text-center py-20 text-ska-silver/50">
        Новостей по этому тегу пока нет
      </div>

    </section>
  </div>
</template>