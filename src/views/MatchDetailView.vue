<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { getMatchById, matchEvents, matchStats, ourTeam } from '@/data/matches'

const route = useRoute()

const match = computed(() => {
  const id = Number(route.params.id)
  return getMatchById(id)
})

const events = computed(() => {
  if (!match.value) return []
  return matchEvents[match.value.id] ?? []
})

const stats = computed(() => {
  if (!match.value) return null
  return matchStats[match.value.id] ?? null
})

// Результат
const result = computed(() => {
  if (!match.value || match.value.status !== 'finished') return null
  const us = match.value.scoreUs ?? 0
  const them = match.value.scoreThem ?? 0
  if (us > them) return { type: 'win', text: 'Победа', cls: 'text-emerald-400' }
  if (us < them) return { type: 'loss', text: 'Поражение', cls: 'text-ska-red' }
  return { type: 'draw', text: 'Ничья', cls: 'text-ska-silver' }
})

function eventIcon(type: string): string {
  if (type === 'goal') return '⚽'
  if (type === 'yellow') return '🟨'
  if (type === 'red') return '🟥'
  if (type === 'sub') return '🔄'
  return '•'
}
</script>

<template>
  <div class="bg-ska-navy min-h-screen">

    <!-- Матч не найден -->
    <div v-if="!match" class="max-w-7xl mx-auto px-6 py-20 text-center">
      <h1 class="text-ska-white text-3xl font-black uppercase mb-4">Матч не найден</h1>
      <p class="text-ska-silver/60 mb-8">Возможно, он был удалён или перенесён.</p>
      <RouterLink
        to="/matches"
        class="inline-flex items-center gap-2 px-6 py-3 bg-ska-red hover:bg-red-700
               text-ska-white font-bold text-sm uppercase tracking-wider
               rounded-md transition-colors"
      >
        ← К матчам
      </RouterLink>
    </div>

    <template v-else>
      <!-- Хлебные крошки -->
      <div class="max-w-7xl mx-auto px-6 pt-8 pb-4">
        <nav class="flex items-center gap-2 text-xs text-ska-silver/50 uppercase tracking-wider">
          <RouterLink to="/" class="hover:text-ska-white transition-colors">Главная</RouterLink>
          <span>/</span>
          <RouterLink to="/matches" class="hover:text-ska-white transition-colors">Матчи</RouterLink>
          <span>/</span>
          <span class="text-ska-silver">Тур {{ match.tour }}</span>
        </nav>
      </div>

      <!-- Hero матча -->
      <section class="relative overflow-hidden border-b border-ska-blue/30">
        <div class="absolute inset-0 bg-gradient-to-br from-ska-navy via-[#0F2444] to-[#1B3A6B]"></div>
        <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(200,16,46,0.12),_transparent_65%)]"></div>

        <div class="relative max-w-7xl mx-auto px-6 py-12 lg:py-16">

          <!-- Турнир и статус -->
          <div class="flex items-center justify-center gap-3 mb-10 text-sm">
            <span class="px-3 py-1 bg-ska-red/20 border border-ska-red/50 rounded-full
                         text-ska-red font-semibold tracking-wider uppercase">
              {{ match.tournament }}
            </span>
            <span class="text-ska-silver/60">•</span>
            <span class="text-ska-silver tracking-wider uppercase">
              Тур {{ match.tour }}
            </span>
            <span v-if="result" class="text-ska-silver/60">•</span>
            <span v-if="result" :class="result.cls" class="font-bold uppercase tracking-wider">
              {{ result.text }}
            </span>
          </div>

          <!-- Матч -->
          <div class="grid grid-cols-3 items-center gap-4 lg:gap-12 max-w-4xl mx-auto">

            <!-- Наша команда -->
            <div class="flex flex-col items-center text-center">
              <div class="w-20 h-20 lg:w-28 lg:h-28 rounded-full
                          bg-gradient-to-br from-ska-red to-ska-blue
                          flex items-center justify-center border-4 border-ska-silver
                          shadow-2xl shadow-ska-red/30 mb-4">
                <span class="text-ska-white text-xl lg:text-2xl font-black">
                  {{ ourTeam.short }}
                </span>
              </div>
              <h2 class="text-ska-white text-base lg:text-xl font-bold tracking-wide">
                {{ ourTeam.name }}
              </h2>
              <p class="text-ska-silver text-xs lg:text-sm mt-1">{{ ourTeam.city }}</p>
            </div>

            <!-- Центр -->
            <div class="flex flex-col items-center">
              <template v-if="match.status === 'finished'">
                <div class="flex items-center gap-3 lg:gap-5">
                  <span class="text-ska-white text-5xl lg:text-7xl font-black tabular-nums">
                    {{ match.scoreUs }}
                  </span>
                  <span class="text-ska-silver/40 text-3xl lg:text-5xl font-thin">:</span>
                  <span class="text-ska-white text-5xl lg:text-7xl font-black tabular-nums">
                    {{ match.scoreThem }}
                  </span>
                </div>
                <span class="text-ska-silver/50 text-[10px] uppercase tracking-widest mt-3">
                  Матч завершён
                </span>
              </template>
              <template v-else>
                <span class="text-ska-white text-2xl lg:text-3xl font-bold">
                  {{ match.date }}
                </span>
                <span class="text-ska-red text-3xl lg:text-4xl font-black mt-2 tabular-nums">
                  {{ match.time }}
                </span>
              </template>
            </div>

            <!-- Соперник -->
            <div class="flex flex-col items-center text-center">
              <div
                class="w-20 h-20 lg:w-28 lg:h-28 rounded-full
                       flex items-center justify-center border-4 border-ska-silver/50
                       shadow-2xl shadow-blue-900/30 mb-4
                       bg-gradient-to-br"
                :class="match.opponent.color"
              >
                <span class="text-ska-white text-lg lg:text-2xl font-black">
                  {{ match.opponent.short }}
                </span>
              </div>
              <h2 class="text-ska-white text-base lg:text-xl font-bold tracking-wide">
                {{ match.opponent.name }}
              </h2>
              <p class="text-ska-silver text-xs lg:text-sm mt-1">{{ match.opponent.city }}</p>
            </div>

          </div>

          <!-- Стадион -->
          <p class="text-center text-ska-silver text-sm mt-10">
            🏟 {{ match.stadium }}
          </p>

        </div>
      </section>

      <!-- Контент -->
      <section class="max-w-7xl mx-auto px-6 py-12">

        <div v-if="match.status === 'finished'" class="grid grid-cols-1 lg:grid-cols-2 gap-8">

          <!-- Хронология -->
          <div>
            <div class="flex items-center gap-3 mb-6">
              <div class="w-1 h-6 bg-ska-red rounded"></div>
              <h2 class="text-ska-white text-xl lg:text-2xl font-bold tracking-wide uppercase">
                Хронология
              </h2>
            </div>

            <div v-if="events.length === 0" class="text-ska-silver/50 text-sm">
              События матча пока не добавлены.
            </div>

            <div v-else class="space-y-3">
              <div
                v-for="(event, i) in events"
                :key="i"
                class="flex items-center gap-4 p-4
                       bg-gradient-to-br from-[#0A1425] to-[#0F2444]
                       border border-ska-blue/30 rounded-xl"
                :class="event.team === 'home' ? 'border-l-4 border-l-ska-red' : 'border-r-4 border-r-ska-silver/40'"
              >
                <span class="text-ska-red font-black text-sm tabular-nums w-10 text-center">
                  {{ event.minute }}'
                </span>
                <span class="text-2xl">{{ eventIcon(event.type) }}</span>
                <div class="flex-1 min-w-0">
                  <p class="text-ska-white font-semibold text-sm truncate">
                    {{ event.player }}
                  </p>
                  <p v-if="event.note" class="text-ska-silver/50 text-xs truncate">
                    {{ event.note }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Статистика -->
          <div>
            <div class="flex items-center gap-3 mb-6">
              <div class="w-1 h-6 bg-ska-red rounded"></div>
              <h2 class="text-ska-white text-xl lg:text-2xl font-bold tracking-wide uppercase">
                Статистика
              </h2>
            </div>

            <div v-if="!stats" class="text-ska-silver/50 text-sm">
              Статистика матча пока не добавлена.
            </div>

            <div v-else class="bg-gradient-to-br from-[#0A1425] to-[#0F2444]
                              border border-ska-blue/30 rounded-xl p-6 space-y-5">

              <div v-for="row in [
                { label: 'Владение мячом', values: stats.possession, suffix: '%' },
                { label: 'Удары', values: stats.shots, suffix: '' },
                { label: 'Удары в цель', values: stats.shotsOnTarget, suffix: '' },
                { label: 'Угловые', values: stats.corners, suffix: '' },
                { label: 'Нарушения', values: stats.fouls, suffix: '' },
                { label: 'Жёлтые карточки', values: stats.yellowCards, suffix: '' },
              ]" :key="row.label">

                <div class="flex items-center justify-between text-sm mb-2">
                  <span class="text-ska-white font-black tabular-nums">
                    {{ row.values[0] }}{{ row.suffix }}
                  </span>
                  <span class="text-ska-silver/60 text-xs uppercase tracking-widest">
                    {{ row.label }}
                  </span>
                  <span class="text-ska-white font-black tabular-nums">
                    {{ row.values[1] }}{{ row.suffix }}
                  </span>
                </div>

                <!-- Полоса: 2 отрезка -->
                <div class="flex h-1.5 rounded-full overflow-hidden bg-ska-navy">
                  <div
                    class="bg-ska-red transition-all"
                    :style="{ width: `${(row.values[0] / (row.values[0] + row.values[1] || 1)) * 100}%` }"
                  ></div>
                  <div class="flex-1 bg-ska-silver/30"></div>
                </div>

              </div>

            </div>
          </div>

        </div>

        <!-- Для предстоящих матчей -->
        <div v-else class="text-center py-10">
          <p class="text-ska-silver/60 text-sm uppercase tracking-widest mb-6">
            Матч ещё не начался
          </p>
          <RouterLink
            to="/tickets"
            class="inline-flex items-center gap-2 px-8 py-3.5 bg-ska-red hover:bg-red-700
                   text-ska-white font-bold text-sm uppercase tracking-wider
                   rounded-md transition-all hover:scale-105 shadow-lg shadow-ska-red/30"
          >
            Купить билет
          </RouterLink>
        </div>

        <!-- Кнопка назад -->
        <div class="mt-12">
          <RouterLink
            to="/matches"
            class="inline-flex items-center gap-2 px-6 py-3
                   border border-ska-blue/50 hover:border-ska-silver
                   text-ska-silver hover:text-ska-white
                   text-sm font-semibold uppercase tracking-wider
                   rounded-md transition-colors"
          >
            ← Все матчи
          </RouterLink>
        </div>

      </section>
    </template>

  </div>
</template>