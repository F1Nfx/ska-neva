<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import TeamLogo from '@/components/TeamLogo.vue'

const lastMatch = ref<any>(null)

onMounted(async () => {
  try {
    const response = await fetch('http://localhost:3001/api/matches')
    const matches = await response.json()
    
    const finished = matches.filter((m: any) => m.status === 'finished')
    if (finished.length > 0) {
      const m = finished[0]
      const isHome = m.homeTeam.isOurTeam
      
      lastMatch.value = {
        id: m.id, tournament: m.tournament, tour: m.tour, date: m.dateStr, stadium: m.stadium, isHome,
        opponent: isHome ? m.awayTeam : m.homeTeam,
        scoreUs: isHome ? m.homeScore : m.awayScore,
        scoreThem: isHome ? m.awayScore : m.homeScore,
      }
    }
  } catch (error) {
    console.error('Ошибка загрузки последнего матча:', error)
  }
})

const homeTeam = computed(() => lastMatch.value ? (lastMatch.value.isHome ? { name: 'СКА-Нева', short: 'СКА', color: 'from-ska-red to-ska-blue', isOurTeam: true, city: 'Санкт-Петербург' } : lastMatch.value.opponent) : null)
const awayTeam = computed(() => lastMatch.value ? (!lastMatch.value.isHome ? { name: 'СКА-Нева', short: 'СКА', color: 'from-ska-red to-ska-blue', isOurTeam: true, city: 'Санкт-Петербург' } : lastMatch.value.opponent) : null)

const homeScorers = [{ minute: 34, player: 'Иванов' }, { minute: 78, player: 'Петров' }]
const awayScorers = [{ minute: 58, player: 'Кузнецов' }]
</script>

<template>
  <section v-if="lastMatch" class="bg-[#0A1425] py-16 border-t border-ska-blue/20">
    <div class="max-w-7xl mx-auto px-6">
      <div class="flex items-end justify-between mb-8">
        <div>
          <h2 class="text-ska-white text-2xl lg:text-3xl font-bold tracking-wide uppercase">
            Последний матч
          </h2>
          <p class="text-ska-silver/60 text-sm mt-1">
            {{ lastMatch.tournament }} · Тур {{ lastMatch.tour }} · {{ lastMatch.date }}
          </p>
        </div>
        <RouterLink to="/matches" class="hidden sm:inline-flex items-center gap-2 text-ska-red hover:text-ska-white text-sm font-semibold uppercase tracking-wider transition-colors">
          Все матчи <span>→</span>
        </RouterLink>
      </div>

      <RouterLink :to="`/matches/${lastMatch.id}`" class="block group">
        <div class="bg-gradient-to-br from-ska-navy to-[#0F2444] border border-ska-blue/40 rounded-2xl p-8 lg:p-12 transition-colors group-hover:border-ska-red/50">
          <div class="grid grid-cols-3 items-center gap-4 lg:gap-8 mb-10">
            <!-- Хозяева -->
            <div class="flex flex-col items-center text-center">
              <TeamLogo :team="homeTeam!" size="lg" />
              <p class="text-ska-white font-bold text-sm lg:text-base tracking-wide mt-3">{{ homeTeam!.name }}</p>
              <p class="text-ska-silver/60 text-xs hidden sm:block mt-0.5">{{ homeTeam!.city }}</p>
            </div>

            <!-- Центр -->
            <div class="flex flex-col items-center">
              <div class="flex items-center gap-4 lg:gap-6">
                <span class="text-ska-white text-5xl lg:text-7xl font-black tabular-nums">{{ lastMatch.scoreUs }}</span>
                <span class="text-ska-silver/40 text-3xl lg:text-5xl font-thin">:</span>
                <span class="text-ska-white text-5xl lg:text-7xl font-black tabular-nums">{{ lastMatch.scoreThem }}</span>
              </div>
              <span class="mt-4 px-3 py-1 bg-ska-silver/10 border border-ska-silver/30 rounded-full text-ska-silver/80 text-[10px] uppercase tracking-widest">
                Матч окончен
              </span>
            </div>

            <!-- Гости -->
            <div class="flex flex-col items-center text-center">
              <TeamLogo :team="awayTeam!" size="lg" />
              <p class="text-ska-white font-bold text-sm lg:text-base tracking-wide mt-3">{{ awayTeam!.name }}</p>
              <p class="text-ska-silver/60 text-xs hidden sm:block mt-0.5">{{ awayTeam!.city }}</p>
            </div>
          </div>

          <!-- Голы -->
          <div class="border-t border-ska-blue/30 pt-6 grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
            <div>
              <p class="text-ska-silver/50 text-xs uppercase tracking-widest mb-2">⚽ Голы СКА-Нева</p>
              <p class="text-ska-white">
                <template v-for="(s, i) in homeScorers" :key="i">
                  {{ s.player }} <span class="text-ska-red font-semibold">{{ s.minute }}'</span><span v-if="i < homeScorers.length - 1">, </span>
                </template>
              </p>
            </div>
            <div class="sm:text-right">
              <p class="text-ska-silver/50 text-xs uppercase tracking-widest mb-2">⚽ Голы соперника</p>
              <p class="text-ska-white">
                <template v-for="(s, i) in awayScorers" :key="i">
                  {{ s.player }} <span class="text-ska-silver font-semibold">{{ s.minute }}'</span><span v-if="i < awayScorers.length - 1">, </span>
                </template>
              </p>
            </div>
          </div>
          <p class="text-center text-ska-silver/60 text-xs mt-6 pt-6 border-t border-ska-blue/20">🏟 {{ lastMatch.stadium }}</p>
        </div>
      </RouterLink>
    </div>
  </section>
</template>