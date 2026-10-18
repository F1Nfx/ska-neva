<script setup lang="ts">
import { ref, onMounted } from 'vue'
import TeamLogo from '@/components/TeamLogo.vue'

type Team = {
  position: number
  name: string
  city: string
  short: string
  color: string
  played: number
  wins: number
  draws: number
  losses: number
  goalsFor: number
  goalsAgainst: number
  points: number
  isOurTeam?: boolean
}

const teams = ref<Team[]>([])

onMounted(async () => {
  try {
    const response = await fetch('http://localhost:3001/api/standings')
    const data = await response.json()
    
    // Преобразуем данные из БД под наш шаблон
    teams.value = data.map((s: any) => ({
      position: s.position,
      name: s.team.name,
      city: s.team.city,
      short: s.team.shortName,
      color: s.team.color,
      isOurTeam: s.team.isOurTeam,
      played: s.played,
      wins: s.wins,
      draws: s.draws,
      losses: s.losses,
      goalsFor: s.goalsFor,
      goalsAgainst: s.goalsAgainst,
      points: s.points,
    }))
  } catch (error) {
    console.error('Ошибка загрузки таблицы:', error)
  }
})
</script>

<template>
  <div>
    <div class="mb-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
      <div>
        <h2 class="text-ska-white text-xl lg:text-2xl font-bold tracking-wide uppercase">
          Турнирная таблица
        </h2>
        <p class="text-ska-silver/60 text-sm mt-1">
          ФНЛ-3 · Сезон 2025/26 · После 11 туров
        </p>
      </div>
      <div class="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs">
        <div class="flex items-center gap-2 text-emerald-400">
          <span class="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
          <span>Выход в ФНЛ-2</span>
        </div>
        <div class="flex items-center gap-2 text-ska-red">
          <span class="w-2.5 h-2.5 rounded-full bg-ska-red"></span>
          <span>Зона вылета</span>
        </div>
      </div>
    </div>

    <div class="bg-gradient-to-br from-ska-navy to-[#0F2444] border border-ska-blue/40 rounded-2xl overflow-hidden">

      <!-- Шапка (десктоп) -->
      <div class="hidden lg:grid grid-cols-[40px_1fr_60px_60px_60px_60px_100px_70px] gap-3 px-6 py-4 border-b border-ska-blue/40 text-ska-silver/60 text-[11px] uppercase tracking-widest font-semibold">
        <div class="text-center">#</div>
        <div>Команда</div>
        <div class="text-center">И</div>
        <div class="text-center">В</div>
        <div class="text-center">Н</div>
        <div class="text-center">П</div>
        <div class="text-center">Заб-Проп</div>
        <div class="text-center">О</div>
      </div>

      <!-- Строки -->
      <div
        v-for="team in teams"
        :key="team.position"
        class="relative grid grid-cols-[40px_1fr_70px] lg:grid-cols-[40px_1fr_60px_60px_60px_60px_100px_70px] gap-3 px-6 py-4 items-center border-b border-ska-blue/20 last:border-b-0 transition-colors hover:bg-ska-blue/10"
      >
        <!-- Зональная полоса слева -->
        <div
          class="absolute left-0 top-0 bottom-0 w-1"
          :class="[
            team.position <= 2 ? 'bg-emerald-500' :
            team.position >= 15 ? 'bg-ska-red/60' : 'bg-transparent',
          ]"
        ></div>

        <!-- Место -->
        <div
          class="text-center text-sm font-bold tabular-nums"
          :class="[
            team.position <= 2 ? 'text-emerald-400' :
            team.position >= 15 ? 'text-ska-red/80' : 'text-ska-silver/70',
          ]"
        >
          {{ team.position }}
        </div>

        <!-- Команда -->
        <div class="flex items-center gap-3 min-w-0">
          <TeamLogo
            :team="{ name: team.name, short: team.short, color: team.color, isOurTeam: team.isOurTeam }"
            size="sm"
          />
          <div class="min-w-0">
            <p class="text-sm lg:text-base font-semibold truncate" :class="team.isOurTeam ? 'text-ska-white' : 'text-ska-white/90'">
              {{ team.name }}
            </p>
            <p class="text-ska-silver/50 text-xs truncate hidden sm:block">{{ team.city }}</p>
          </div>
        </div>

        <!-- Статистика (десктоп) -->
        <div class="hidden lg:contents">
          <div class="text-center text-sm text-ska-silver tabular-nums">{{ team.played }}</div>
          <div class="text-center text-sm text-ska-silver tabular-nums">{{ team.wins }}</div>
          <div class="text-center text-sm text-ska-silver tabular-nums">{{ team.draws }}</div>
          <div class="text-center text-sm text-ska-silver tabular-nums">{{ team.losses }}</div>
          <div class="text-center text-sm text-ska-silver tabular-nums">
            {{ team.goalsFor }}–{{ team.goalsAgainst }}
          </div>
        </div>

        <!-- Очки -->
        <div
          class="text-center text-base lg:text-lg font-black tabular-nums"
        >
          {{ team.points }}
        </div>

      </div>

    </div>

    <!-- Легенда -->
    <div class="flex flex-wrap items-center gap-x-6 gap-y-2 mt-4 text-xs text-ska-silver/60">
      <div class="flex items-center gap-2">
        <div class="w-1 h-3 bg-ska-red rounded"></div>
        <span>Наша команда</span>
      </div>
      <div class="flex items-center gap-2">
        <span class="text-ska-silver/40">И</span><span>— игры</span>
        <span class="text-ska-silver/40">·</span>
        <span class="text-ska-silver/40">В</span><span>— победы</span>
        <span class="text-ska-silver/40">·</span>
        <span class="text-ska-silver/40">Н</span><span>— ничьи</span>
        <span class="text-ska-silver/40">·</span>
        <span class="text-ska-silver/40">П</span><span>— поражения</span>
        <span class="text-ska-silver/40">·</span>
        <span class="text-ska-silver/40">О</span><span>— очки</span>
      </div>
    </div>
  </div>
</template>