<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import TeamLogo from '@/components/TeamLogo.vue'

const teams = ref<any[]>([])

onMounted(async () => {
  try {
    const response = await fetch('http://localhost:3001/api/standings')
    const data = await response.json()
    teams.value = data.slice(0, 8).map((s: any) => ({
      position: s.position, name: s.team.name, city: s.team.city, short: s.team.shortName,
      color: s.team.color, isOurTeam: s.team.isOurTeam, played: s.played, wins: s.wins,
      draws: s.draws, losses: s.losses, goalsFor: s.goalsFor, goalsAgainst: s.goalsAgainst, points: s.points
    }))
  } catch (error) {
    console.error('Ошибка загрузки таблицы:', error)
  }
})
</script>

<template>
  <section class="bg-[#0A1425] py-16 border-t border-ska-blue/20">
    <div class="max-w-7xl mx-auto px-6">
      <div class="flex items-end justify-between mb-8">
        <div>
          <h2 class="text-ska-white text-2xl lg:text-3xl font-bold tracking-wide uppercase">Турнирная таблица</h2>
          <p class="text-ska-silver/60 text-sm mt-1">ФНЛ-3 · Сезон 2025/26 · После 11 туров</p>
        </div>
        <RouterLink :to="{ path: '/matches', query: { tab: 'table' } }" class="hidden sm:inline-flex items-center gap-2 text-ska-red hover:text-ska-white text-sm font-semibold uppercase tracking-wider transition-colors">
          Полная таблица <span>→</span>
        </RouterLink>
      </div>

      <div class="bg-gradient-to-br from-ska-navy to-[#0F2444] border border-ska-blue/40 rounded-2xl overflow-hidden">
        <div class="hidden lg:grid grid-cols-[40px_1fr_60px_60px_60px_60px_100px_70px] gap-4 px-6 py-4 border-b border-ska-blue/40 text-ska-silver/60 text-[11px] uppercase tracking-widest font-semibold">
          <div class="text-center">#</div>
          <div>Команда</div>
          <div class="text-center">И</div>
          <div class="text-center">В</div>
          <div class="text-center">Н</div>
          <div class="text-center">П</div>
          <div class="text-center">Заб-Проп</div>
          <div class="text-center">О</div>
        </div>

        <div v-for="team in teams" :key="team.position" class="relative grid grid-cols-[40px_1fr_70px] lg:grid-cols-[40px_1fr_60px_60px_60px_60px_100px_70px] gap-4 px-6 py-4 items-center border-b border-ska-blue/20 last:border-b-0 transition-colors hover:bg-ska-blue/10" :class="team.isOurTeam && 'bg-ska-blue/10'">
          <div v-if="team.isOurTeam" class="absolute left-0 top-0 bottom-0 w-1 bg-ska-blue"></div>
          <div class="text-center text-sm font-bold tabular-nums" :class="team.isOurTeam ? 'text-ska-white' : 'text-ska-silver/70'">{{ team.position }}</div>
          <div class="flex items-center gap-3 min-w-0">
            <TeamLogo :team="team" size="sm" />
            <div class="min-w-0">
              <p class="text-sm lg:text-base font-semibold truncate" :class="team.isOurTeam ? 'text-ska-white' : 'text-ska-white/90'">{{ team.name }}</p>
              <p class="text-ska-silver/50 text-xs truncate hidden sm:block">{{ team.city }}</p>
            </div>
          </div>
          <div class="hidden lg:contents">
            <div class="text-center text-sm text-ska-silver tabular-nums">{{ team.played }}</div>
            <div class="text-center text-sm text-ska-silver tabular-nums">{{ team.wins }}</div>
            <div class="text-center text-sm text-ska-silver tabular-nums">{{ team.draws }}</div>
            <div class="text-center text-sm text-ska-silver tabular-nums">{{ team.losses }}</div>
            <div class="text-center text-sm text-ska-silver tabular-nums">{{ team.goalsFor }}–{{ team.goalsAgainst }}</div>
          </div>
          <div class="text-center text-base lg:text-lg font-black tabular-nums" :class="team.isOurTeam ? 'text-ska-white' : 'text-ska-white'">{{ team.points }}</div>
        </div>
      </div>
    </div>
  </section>
</template>