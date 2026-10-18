<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import FullLeagueTable from '@/components/FullLeagueTable.vue'
import TeamLogo from '@/components/TeamLogo.vue'

const route = useRoute()
const router = useRouter()

type Tab = 'matches' | 'table'
const activeTab = ref<Tab>('matches')

onMounted(() => {
  if (route.query.tab === 'table') {
    activeTab.value = 'table'
  }
})

function switchTab(tab: Tab) {
  activeTab.value = tab
  router.replace({ query: tab === 'table' ? { tab: 'table' } : {} })
}

const matches = ref<any[]>([])
const loading = ref(true)

// Загружаем матчи из БД
onMounted(async () => {
  try {
    const response = await fetch('http://localhost:3001/api/matches')
    const rawMatches = await response.json()
    
    // ID нашей команды в БД (СКА-Нева)
    const ourTeamId = 2 

    // Преобразуем данные из БД под наш шаблон
    matches.value = rawMatches.map((m: any) => {
      const isHome = m.homeTeam.id === ourTeamId
      return {
        id: m.id,
        tour: m.tour,
        tournament: m.tournament,
        date: m.dateStr, // Переименовываем для шаблона
        time: m.time,
        stadium: m.stadium,
        status: m.status,
        isHome,
        opponent: isHome ? m.awayTeam : m.homeTeam,
        scoreUs: isHome ? m.homeScore : m.awayScore,
        scoreThem: isHome ? m.awayScore : m.homeScore,
      }
    })
  } catch (error) {
    console.error('Ошибка загрузки матчей:', error)
  } finally {
    loading.value = false
  }
})

const activeFilter = ref<'all' | 'finished' | 'upcoming'>('all')

const filteredMatches = computed(() => {
  if (activeFilter.value === 'all') return matches.value
  if (activeFilter.value === 'finished') return matches.value.filter(m => m.status === 'finished')
  return matches.value.filter(m => m.status === 'upcoming')
})

const filters = [
  { value: 'all' as const, label: 'Все матчи' },
  { value: 'upcoming' as const, label: 'Предстоящие' },
  { value: 'finished' as const, label: 'Прошедшие' },
]

function matchResult(match: any): 'win' | 'draw' | 'loss' | null {
  if (match.status !== 'finished' || match.scoreUs === null || match.scoreThem === null) return null
  if (match.scoreUs > match.scoreThem) return 'win'
  if (match.scoreUs < match.scoreThem) return 'loss'
  return 'draw'
}

const resultLabels = {
  win: { text: 'Победа', class: 'bg-emerald-600/20 text-emerald-400 border-emerald-600/40' },
  draw: { text: 'Ничья', class: 'bg-ska-silver/10 text-ska-silver border-ska-silver/40' },
  loss: { text: 'Поражение', class: 'bg-ska-red/20 text-ska-red border-ska-red/40' },
}

// Хелперы для шаблона (подставляют нашу команду или соперника)
function getHomeTeam(match: any) {
  return match.isHome 
    ? { name: 'СКА-Нева', short: 'СКА', color: 'from-ska-red to-ska-blue', isOurTeam: true, city: 'Санкт-Петербург' } 
    : match.opponent
}

function getAwayTeam(match: any) {
  return !match.isHome 
    ? { name: 'СКА-Нева', short: 'СКА', color: 'from-ska-red to-ska-blue', isOurTeam: true, city: 'Санкт-Петербург' } 
    : match.opponent
}
</script>

<template>
  <div class="bg-ska-navy min-h-screen">
    <section class="max-w-7xl mx-auto px-6 py-12">

      <!-- Заголовок -->
      <div class="mb-10">
        <h1 class="text-ska-white text-3xl lg:text-5xl font-black tracking-wide uppercase">
          Матчи
        </h1>
        <p class="text-ska-silver/60 text-sm mt-2 uppercase tracking-wider">
          ФНЛ-3 · Сезон 2025/26
        </p>
      </div>

      <!-- Вкладки -->
      <div class="flex items-center gap-1 mb-8 border-b border-ska-blue/30">
        <button
          @click="switchTab('matches')"
          class="px-5 py-3 text-sm font-bold uppercase tracking-wider transition-all border-b-2 -mb-px"
          :class="activeTab === 'matches'
            ? 'text-ska-white border-ska-red'
            : 'text-ska-silver/60 border-transparent hover:text-ska-white'"
        >
          Матчи
        </button>
        <button
          @click="switchTab('table')"
          class="px-5 py-3 text-sm font-bold uppercase tracking-wider transition-all border-b-2 -mb-px"
          :class="activeTab === 'table'
            ? 'text-ska-white border-ska-red'
            : 'text-ska-silver/60 border-transparent hover:text-ska-white'"
        >
          Таблица
        </button>
      </div>

      <!-- Вкладка: Матчи -->
      <template v-if="activeTab === 'matches'">

        <!-- Фильтры -->
        <div class="flex flex-wrap items-center gap-2 mb-8 pb-6 border-b border-ska-blue/30">
          <button
            v-for="filter in filters"
            :key="filter.value"
            @click="activeFilter = filter.value"
            class="px-4 py-2 rounded-md text-sm font-semibold uppercase tracking-wider transition-all duration-200"
            :class="activeFilter === filter.value
              ? 'bg-ska-red text-ska-white shadow-lg shadow-ska-red/30'
              : 'bg-transparent text-ska-silver border border-ska-blue/50 hover:border-ska-silver hover:text-ska-white'"
          >
            {{ filter.label }}
          </button>
          <span class="ml-auto text-ska-silver/50 text-xs uppercase tracking-wider">
            {{ filteredMatches.length }} матчей
          </span>
        </div>

        <!-- Список матчей -->
        <div class="space-y-3">
          <RouterLink
            v-for="match in filteredMatches"
            :key="match.id"
            :to="`/matches/${match.id}`"
            class="group block bg-gradient-to-br from-[#0A1425] to-[#0F2444] border border-ska-blue/30 hover:border-ska-red/50 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-ska-red/5"
          >

            <!-- Верхняя строка -->
            <div class="flex items-center justify-between px-5 py-2.5 border-b border-ska-blue/20 bg-ska-navy/40">
              <div class="flex items-center gap-3 text-xs">
                <span class="text-ska-red font-bold uppercase tracking-wider">
                  {{ match.tournament }}
                </span>
                <span class="text-ska-silver/40">•</span>
                <span class="text-ska-silver/70 uppercase tracking-wider">
                  Тур {{ match.tour }}
                </span>
                <span class="text-ska-silver/40">•</span>
                <span class="text-ska-silver/50">
                  {{ match.isHome ? 'Дома' : 'В гостях' }}
                </span>
              </div>

              <span
                v-if="matchResult(match)"
                class="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest border"
                :class="resultLabels[matchResult(match)!].class"
              >
                {{ resultLabels[matchResult(match)!].text }}
              </span>
            </div>

            <!-- Основная строка -->
            <div class="grid grid-cols-[1fr_auto_1fr] items-center gap-4 px-5 py-5">

              <!-- Хозяева -->
              <div class="flex items-center gap-3 min-w-0">
                <TeamLogo :team="getHomeTeam(match)" size="md" />
                <div class="min-w-0 hidden sm:block">
                  <p class="text-ska-white text-sm font-semibold truncate">
                    {{ getHomeTeam(match).name }}
                  </p>
                  <p class="text-ska-silver/50 text-xs truncate">
                    {{ getHomeTeam(match).city }}
                  </p>
                </div>
              </div>

              <!-- Центр -->
              <div class="flex flex-col items-center min-w-[80px]">
                <template v-if="match.status === 'finished'">
                  <div class="flex items-center gap-2">
                    <span class="text-ska-white text-2xl lg:text-3xl font-black tabular-nums">{{ match.scoreUs }}</span>
                    <span class="text-ska-silver/40 text-xl font-thin">:</span>
                    <span class="text-ska-white text-2xl lg:text-3xl font-black tabular-nums">{{ match.scoreThem }}</span>
                  </div>
                  <span class="text-ska-silver/50 text-[10px] uppercase tracking-widest mt-1">Завершён</span>
                </template>
                <template v-else>
                  <span class="text-ska-red text-xl lg:text-2xl font-black tabular-nums">{{ match.time }}</span>
                  <span class="text-ska-silver/50 text-[10px] uppercase tracking-widest mt-1">Скоро</span>
                </template>
              </div>

              <!-- Гости -->
              <div class="flex items-center justify-end gap-3 min-w-0">
                <div class="min-w-0 hidden sm:block text-right">
                  <p class="text-ska-white text-sm font-semibold truncate">
                    {{ getAwayTeam(match).name }}
                  </p>
                  <p class="text-ska-silver/50 text-xs truncate">
                    {{ getAwayTeam(match).city }}
                  </p>
                </div>
                <TeamLogo :team="getAwayTeam(match)" size="md" />
              </div>

            </div>

            <!-- Нижняя строка -->
            <div class="flex flex-wrap items-center justify-between gap-2 px-5 py-3 bg-ska-navy/30 border-t border-ska-blue/20 text-xs text-ska-silver/60">
              <span>📅 {{ match.date }}</span>
              <span>🏟 {{ match.stadium }}</span>
            </div>

          </RouterLink>
        </div>

        <!-- Пустой результат -->
        <div v-if="filteredMatches.length === 0" class="text-center py-20 text-ska-silver/50">
          Матчей не найдено
        </div>

      </template>

      <!-- Вкладка: Таблица -->
      <template v-else>
        <FullLeagueTable />
      </template>

    </section>
  </div>
</template>