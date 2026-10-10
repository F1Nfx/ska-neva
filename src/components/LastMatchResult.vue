<script setup lang="ts">
import { RouterLink } from 'vue-router'

const lastMatch = {
  tournament: 'ФНЛ-2',
  tour: 'Тур 10',
  date: '11 октября 2026',
  stadium: '«Нева-Арена», Санкт-Петербург',
  home: { name: 'СКА-НЕВА', city: 'Санкт-Петербург', short: 'СКА', score: 2 },
  away: { name: 'ВОЛГА-ТВЕРЬ', city: 'Тверь', short: 'ВТ', score: 1 },
  scorers: [
    { minute: 34, player: 'Иванов', team: 'home' as const },
    { minute: 58, player: 'Кузнецов', team: 'away' as const },
    { minute: 78, player: 'Петров', team: 'home' as const },
  ],
}

const homeScorers = lastMatch.scorers.filter((s) => s.team === 'home')
const awayScorers = lastMatch.scorers.filter((s) => s.team === 'away')
</script>

<template>
  <section class="bg-[#0A1425] py-16 border-t border-ska-blue/20">
    <div class="max-w-7xl mx-auto px-6">

      <div class="flex items-end justify-between mb-8">
        <div>
          <h2 class="text-ska-white text-2xl lg:text-3xl font-bold tracking-wide uppercase">
            Последний матч
          </h2>
          <p class="text-ska-silver/60 text-sm mt-1">
            {{ lastMatch.tournament }} · {{ lastMatch.tour }} · {{ lastMatch.date }}
          </p>
        </div>
        <RouterLink
          to="/matches"
          class="hidden sm:inline-flex items-center gap-2
                 text-ska-red hover:text-ska-white text-sm font-semibold
                 uppercase tracking-wider transition-colors"
        >
          Все матчи
          <span>→</span>
        </RouterLink>
      </div>

      <div class="bg-gradient-to-br from-ska-navy to-[#0F2444]
                  border border-ska-blue/40 rounded-2xl p-8 lg:p-12">

        <div class="grid grid-cols-3 items-center gap-4 lg:gap-8 mb-10">

          <div class="flex flex-col items-center text-center">
            <div class="w-16 h-16 lg:w-20 lg:h-20 rounded-full
                        bg-gradient-to-br from-ska-red to-ska-blue
                        flex items-center justify-center
                        border-2 border-ska-silver mb-3">
              <span class="text-ska-white text-base lg:text-lg font-black">
                {{ lastMatch.home.short }}
              </span>
            </div>
            <p class="text-ska-white font-bold text-sm lg:text-base tracking-wide">
              {{ lastMatch.home.name }}
            </p>
            <p class="text-ska-silver/60 text-xs hidden sm:block mt-0.5">
              {{ lastMatch.home.city }}
            </p>
          </div>

          <div class="flex flex-col items-center">
            <div class="flex items-center gap-4 lg:gap-6">
              <span class="text-ska-white text-5xl lg:text-7xl font-black tabular-nums">
                {{ lastMatch.home.score }}
              </span>
              <span class="text-ska-silver/40 text-3xl lg:text-5xl font-thin">:</span>
              <span class="text-ska-white text-5xl lg:text-7xl font-black tabular-nums">
                {{ lastMatch.away.score }}
              </span>
            </div>
            <span class="mt-4 px-3 py-1
                         bg-ska-silver/10 border border-ska-silver/30 rounded-full
                         text-ska-silver/80 text-[10px] uppercase tracking-widest">
              МАТЧ ОКОНЧЕН
            </span>
          </div>

          <div class="flex flex-col items-center text-center">
            <div class="w-16 h-16 lg:w-20 lg:h-20 rounded-full
                        bg-gradient-to-br from-slate-600 to-slate-800
                        flex items-center justify-center
                        border-2 border-ska-silver/50 mb-3">
              <span class="text-ska-white text-base lg:text-lg font-black">
                {{ lastMatch.away.short }}
              </span>
            </div>
            <p class="text-ska-white font-bold text-sm lg:text-base tracking-wide">
              {{ lastMatch.away.name }}
            </p>
            <p class="text-ska-silver/60 text-xs hidden sm:block mt-0.5">
              {{ lastMatch.away.city }}
            </p>
          </div>

        </div>

        <div class="border-t border-ska-blue/30 pt-6 grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
          <div>
            <p class="text-ska-silver/50 text-xs uppercase tracking-widest mb-2">
              ⚽ Голы СКА-Нева
            </p>
            <p class="text-ska-white">
              <template v-for="(s, i) in homeScorers" :key="i">
                {{ s.player }}
                <span class="text-ska-red font-semibold">{{ s.minute }}'</span><span v-if="i < homeScorers.length - 1">, </span>
              </template>
            </p>
          </div>
          <div class="sm:text-right">
            <p class="text-ska-silver/50 text-xs uppercase tracking-widest mb-2">
              ⚽ Голы соперника
            </p>
            <p class="text-ska-white">
              <template v-for="(s, i) in awayScorers" :key="i">
                {{ s.player }}
                <span class="text-ska-silver font-semibold">{{ s.minute }}'</span><span v-if="i < awayScorers.length - 1">, </span>
              </template>
            </p>
          </div>
        </div>

        <p class="text-center text-ska-silver/60 text-xs mt-6 pt-6 border-t border-ska-blue/20">
          🏟 {{ lastMatch.stadium }}
        </p>

      </div>

      <div class="sm:hidden mt-6 text-center">
        <RouterLink
          to="/matches"
          class="text-ska-red text-sm font-semibold uppercase tracking-wider"
        >
          Все матчи →
        </RouterLink>
      </div>

    </div>
  </section>
</template>