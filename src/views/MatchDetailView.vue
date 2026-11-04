<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import TeamLogo from '@/components/TeamLogo.vue'

const route = useRoute()
const matchData = ref<any>(null)
const loading = ref(true)

onMounted(async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/matches/${route.params.id}`)
    if (!response.ok) throw new Error('Матч не найден')
    matchData.value = await response.json()
  } catch (error) {
    console.error(error)
    matchData.value = null
  } finally {
    loading.value = false
  }
})

// Подготавливаем команды для шаблона (добавляем поле short для логотипа)
const homeTeam = computed(() => {
  if (!matchData.value) return null
  const t = matchData.value.homeTeam
  return { ...t, short: t.shortName }
})

const awayTeam = computed(() => {
  if (!matchData.value) return null
  const t = matchData.value.awayTeam
  return { ...t, short: t.shortName }
})

const result = computed(() => {
  if (!matchData.value || matchData.value.status !== 'finished') return null
  // Определяем результат для нашей команды
  const us = matchData.value.homeTeam.isOurTeam ? matchData.value.homeScore : matchData.value.awayScore
  const them = matchData.value.homeTeam.isOurTeam ? matchData.value.awayScore : matchData.value.homeScore

  if (us > them) return { type: 'win', text: 'Победа', cls: 'text-emerald-400' }
  if (us < them) return { type: 'loss', text: 'Поражение', cls: 'text-ska-red' }
  return { type: 'draw', text: 'Ничья', cls: 'text-ska-silver' }
})

const events = computed(() => {
  if (!matchData.value || !matchData.value.events) return []
  return [...matchData.value.events].sort((a: any, b: any) => a.minute - b.minute)
})

const stats = computed(() => {
  if (!matchData.value || !matchData.value.stats || matchData.value.stats.length < 2) return null
  
  const homeStats = matchData.value.stats.find((s: any) => s.teamId === matchData.value.homeTeamId) || {}
  const awayStats = matchData.value.stats.find((s: any) => s.teamId === matchData.value.awayTeamId) || {}
  
  return {
    possession: [homeStats.possession || 0, awayStats.possession || 0],
    shots: [homeStats.shots || 0, awayStats.shots || 0],
    shotsOnTarget: [homeStats.shotsOnTarget || 0, awayStats.shotsOnTarget || 0],
    corners: [homeStats.corners || 0, awayStats.corners || 0],
    fouls: [homeStats.fouls || 0, awayStats.fouls || 0],
    yellowCards: [homeStats.yellowCards || 0, awayStats.yellowCards || 0],
  }
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
    <div v-if="!matchData" class="max-w-7xl mx-auto px-6 py-20 text-center">
      <h1 class="text-ska-white text-3xl font-black uppercase mb-4">Матч не найден</h1>
      <p class="text-ska-silver/60 mb-8">Возможно, он был удалён или перенесён.</p>
      <RouterLink to="/matches" class="inline-flex items-center gap-2 px-6 py-3 bg-ska-red hover:bg-red-700 text-ska-white font-bold text-sm uppercase tracking-wider rounded-md transition-colors">
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
          <span class="text-ska-silver">Тур {{ matchData.tour }}</span>
        </nav>
      </div>

      <!-- Hero матча -->
      <section class="relative overflow-hidden border-b border-ska-blue/30">
        <div class="absolute inset-0 bg-gradient-to-br from-ska-navy via-[#0F2444] to-[#1B3A6B]"></div>
        <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(200,16,46,0.12),_transparent_65%)]"></div>

        <div class="relative max-w-7xl mx-auto px-6 py-12 lg:py-16">

          <!-- Турнир и статус -->
          <div class="flex items-center justify-center gap-3 mb-10 text-sm">
            <span class="px-3 py-1 bg-ska-red/20 border border-ska-red/50 rounded-full text-ska-red font-semibold tracking-wider uppercase">
              {{ matchData.tournament }}
            </span>
            <span class="text-ska-silver/60">•</span>
            <span class="text-ska-silver tracking-wider uppercase">
              Тур {{ matchData.tour }}
            </span>
            <span v-if="result" class="text-ska-silver/60">•</span>
            <span v-if="result" :class="result.cls" class="font-bold uppercase tracking-wider">
              {{ result.text }}
            </span>
          </div>

          <!-- Матч -->
          <div class="grid grid-cols-3 items-center gap-4 lg:gap-12 max-w-4xl mx-auto">

            <!-- Хозяева -->
            <div class="flex flex-col items-center text-center">
              <TeamLogo v-if="homeTeam" :team="homeTeam" size="lg" />
              <h2 class="text-ska-white text-base lg:text-xl font-bold tracking-wide mt-4">
                {{ homeTeam?.name }}
              </h2>
              <p class="text-ska-silver text-xs lg:text-sm mt-1">{{ homeTeam?.city }}</p>
            </div>

            <!-- Центр -->
            <div class="flex flex-col items-center">
              <template v-if="matchData.status === 'finished'">
                <div class="flex items-center gap-3 lg:gap-5">
                  <span class="text-ska-white text-5xl lg:text-7xl font-black tabular-nums">{{ matchData.homeScore }}</span>
                  <span class="text-ska-silver/40 text-3xl lg:text-5xl font-thin">:</span>
                  <span class="text-ska-white text-5xl lg:text-7xl font-black tabular-nums">{{ matchData.awayScore }}</span>
                </div>
                <span class="text-ska-silver/50 text-[10px] uppercase tracking-widest mt-3">Матч завершён</span>
              </template>
              <template v-else>
                <span class="text-ska-white text-2xl lg:text-3xl font-bold">{{ matchData.dateStr }}</span>
                <span class="text-ska-red text-3xl lg:text-4xl font-black mt-2 tabular-nums">{{ matchData.time }}</span>
              </template>
            </div>

            <!-- Гости -->
            <div class="flex flex-col items-center text-center">
              <TeamLogo v-if="awayTeam" :team="awayTeam" size="lg" />
              <h2 class="text-ska-white text-base lg:text-xl font-bold tracking-wide mt-4">
                {{ awayTeam?.name }}
              </h2>
              <p class="text-ska-silver text-xs lg:text-sm mt-1">{{ awayTeam?.city }}</p>
            </div>

          </div>

          <!-- Стадион -->
          <p class="text-center text-ska-silver text-sm mt-10">
            🏟 {{ matchData.stadium }}
          </p>

        </div>
      </section>

      <!-- Контент -->
      <section class="max-w-7xl mx-auto px-6 py-12">

        <div v-if="matchData.status === 'finished'" class="grid grid-cols-1 lg:grid-cols-2 gap-8">

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
                class="flex items-center gap-4 p-4 bg-gradient-to-br from-[#0A1425] to-[#0F2444] border border-ska-blue/30 rounded-xl"
                :class="event.teamId === matchData.homeTeamId ? 'border-l-4 border-l-ska-red' : 'border-r-4 border-r-ska-silver/40'"
              >
                <span class="text-ska-red font-black text-sm tabular-nums w-10 text-center">
                  {{ event.minute }}'
                </span>
                <span class="text-2xl">{{ eventIcon(event.type) }}</span>
                <div class="flex-1 min-w-0">
                  <p class="text-ska-white font-semibold text-sm truncate">
                    {{ event.playerName }}
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

            <div v-else class="bg-gradient-to-br from-[#0A1425] to-[#0F2444] border border-ska-blue/30 rounded-xl p-6 space-y-5">

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
          <RouterLink to="/tickets" class="inline-flex items-center gap-2 px-8 py-3.5 bg-ska-red hover:bg-red-700 text-ska-white font-bold text-sm uppercase tracking-wider rounded-md transition-all hover:scale-105 shadow-lg shadow-ska-red/30">
            Купить билет
          </RouterLink>
        </div>

        <!-- Кнопка назад -->
        <div class="mt-12">
          <RouterLink to="/matches" class="inline-flex items-center gap-2 px-6 py-3 border border-ska-blue/50 hover:border-ska-silver text-ska-silver hover:text-ska-white text-sm font-semibold uppercase tracking-wider rounded-md transition-colors">
            ← Все матчи
          </RouterLink>
        </div>

      </section>
    </template>

  </div>
</template>