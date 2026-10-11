<script setup lang="ts">
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'

type MatchStatus = 'finished' | 'upcoming'
type Team = { name: string; city: string; short: string; color: string }
type Match = {
  id: number; tour: number; tournament: string; date: string; time: string;
  stadium: string; isHome: boolean; opponent: Team; status: MatchStatus;
  scoreUs?: number; scoreThem?: number
}

const ourTeam: Team = {
  name: 'СКА-Нева', city: 'Санкт-Петербург', short: 'СКА',
  color: 'from-ska-red to-ska-blue',
}

const finishedMatches: Match[] = [
  { id: 10, tour: 10, tournament: 'ФНЛ-3', date: '11 октября 2026', time: '18:00', stadium: '«Нева-Арена», Санкт-Петербург', isHome: true, opponent: { name: 'Волга-Тверь', city: 'Тверь', short: 'ВТ', color: 'from-slate-500 to-slate-700' }, status: 'finished', scoreUs: 2, scoreThem: 1 },
  { id: 9, tour: 9, tournament: 'ФНЛ-3', date: '4 октября 2026', time: '17:00', stadium: 'Стадион «Авангард», Выборг', isHome: false, opponent: { name: 'Динамо-Выборг', city: 'Выборг', short: 'ДВ', color: 'from-indigo-700 to-indigo-900' }, status: 'finished', scoreUs: 0, scoreThem: 2 },
  { id: 8, tour: 8, tournament: 'ФНЛ-3', date: '27 сентября 2026', time: '18:00', stadium: '«Нева-Арена», Санкт-Петербург', isHome: true, opponent: { name: 'Локомотив-2', city: 'Москва', short: 'Л2', color: 'from-red-700 to-red-900' }, status: 'finished', scoreUs: 2, scoreThem: 0 },
  { id: 7, tour: 7, tournament: 'ФНЛ-3', date: '20 сентября 2026', time: '16:00', stadium: 'Стадион «Торпедо», Владимир', isHome: false, opponent: { name: 'Торпедо', city: 'Владимир', short: 'ТВ', color: 'from-slate-600 to-slate-800' }, status: 'finished', scoreUs: 1, scoreThem: 2 },
  { id: 6, tour: 6, tournament: 'ФНЛ-3', date: '13 сентября 2026', time: '18:00', stadium: '«Нева-Арена», Санкт-Петербург', isHome: true, opponent: { name: 'Зенит-2', city: 'Санкт-Петербург', short: 'З2', color: 'from-sky-500 to-blue-700' }, status: 'finished', scoreUs: 1, scoreThem: 2 },
  { id: 5, tour: 5, tournament: 'ФНЛ-3', date: '6 сентября 2026', time: '19:00', stadium: 'Стадион «Балтика», Калининград', isHome: false, opponent: { name: 'Балтика-2', city: 'Калининград', short: 'Б2', color: 'from-sky-700 to-blue-900' }, status: 'finished', scoreUs: 2, scoreThem: 2 },
  { id: 4, tour: 4, tournament: 'ФНЛ-3', date: '30 августа 2026', time: '18:00', stadium: '«Нева-Арена», Санкт-Петербург', isHome: true, opponent: { name: 'Динамо', city: 'Кострома', short: 'ДМ', color: 'from-blue-800 to-blue-950' }, status: 'finished', scoreUs: 2, scoreThem: 0 },
  { id: 3, tour: 3, tournament: 'ФНЛ-3', date: '23 августа 2026', time: '17:00', stadium: 'Стадион «Волга», Тверь', isHome: false, opponent: { name: 'Волга-Тверь', city: 'Тверь', short: 'ВТ', color: 'from-slate-500 to-slate-700' }, status: 'finished', scoreUs: 2, scoreThem: 1 },
  { id: 2, tour: 2, tournament: 'ФНЛ-3', date: '16 августа 2026', time: '18:00', stadium: '«Нева-Арена», Санкт-Петербург', isHome: true, opponent: { name: 'Динамо-Выборг', city: 'Выборг', short: 'ДВ', color: 'from-indigo-700 to-indigo-900' }, status: 'finished', scoreUs: 3, scoreThem: 1 },
  { id: 1, tour: 1, tournament: 'ФНЛ-3', date: '9 августа 2026', time: '17:00', stadium: 'Стадион «Локомотив», Москва', isHome: false, opponent: { name: 'Локомотив-2', city: 'Москва', short: 'Л2', color: 'from-red-700 to-red-900' }, status: 'finished', scoreUs: 1, scoreThem: 1 },
]

const upcomingMatches: Match[] = [
  { id: 11, tour: 11, tournament: 'ФНЛ-3', date: '17 октября 2026', time: '18:00', stadium: '«Нева-Арена», Санкт-Петербург', isHome: true, opponent: { name: 'Динамо', city: 'Кострома', short: 'ДМ', color: 'from-blue-800 to-blue-950' }, status: 'upcoming' },
  { id: 12, tour: 12, tournament: 'ФНЛ-3', date: '24 октября 2026', time: '17:00', stadium: 'Стадион «Балтика», Калининград', isHome: false, opponent: { name: 'Балтика-2', city: 'Калининград', short: 'Б2', color: 'from-sky-700 to-blue-900' }, status: 'upcoming' },
  { id: 13, tour: 13, tournament: 'ФНЛ-3', date: '31 октября 2026', time: '18:00', stadium: '«Нева-Арена», Санкт-Петербург', isHome: true, opponent: { name: 'Зенит-2', city: 'Санкт-Петербург', short: 'З2', color: 'from-sky-500 to-blue-700' }, status: 'upcoming' },
  { id: 14, tour: 14, tournament: 'ФНЛ-3', date: '7 ноября 2026', time: '16:00', stadium: 'Стадион «Торпедо», Владимир', isHome: false, opponent: { name: 'Торпедо', city: 'Владимир', short: 'ТВ', color: 'from-slate-600 to-slate-800' }, status: 'upcoming' },
  { id: 15, tour: 15, tournament: 'ФНЛ-3', date: '14 ноября 2026', time: '18:00', stadium: '«Нева-Арена», Санкт-Петербург', isHome: true, opponent: { name: 'Локомотив-2', city: 'Москва', short: 'Л2', color: 'from-red-700 to-red-900' }, status: 'upcoming' },
]

const allMatches: Match[] = [...upcomingMatches, ...finishedMatches]
const activeFilter = ref<'all' | 'finished' | 'upcoming'>('all')

const filteredMatches = computed(() => {
  if (activeFilter.value === 'all') return allMatches
  if (activeFilter.value === 'finished') return finishedMatches
  return upcomingMatches
})

const filters = [
  { value: 'all' as const, label: 'Все матчи' },
  { value: 'upcoming' as const, label: 'Предстоящие' },
  { value: 'finished' as const, label: 'Прошедшие' },
]

function matchResult(match: Match): 'win' | 'draw' | 'loss' | null {
  if (match.status !== 'finished' || match.scoreUs === undefined || match.scoreThem === undefined) return null
  if (match.scoreUs > match.scoreThem) return 'win'
  if (match.scoreUs < match.scoreThem) return 'loss'
  return 'draw'
}

const resultLabels = {
  win: { text: 'Победа', class: 'bg-emerald-600/20 text-emerald-400 border-emerald-600/40' },
  draw: { text: 'Ничья', class: 'bg-ska-silver/10 text-ska-silver border-ska-silver/40' },
  loss: { text: 'Поражение', class: 'bg-ska-red/20 text-ska-red border-ska-red/40' },
}
</script>

<template>
  <div class="bg-ska-navy min-h-screen">
    <section class="max-w-7xl mx-auto px-6 py-12">

      <div class="mb-10">
        <h1 class="text-ska-white text-3xl lg:text-5xl font-black tracking-wide uppercase">
          Матчи
        </h1>
        <p class="text-ska-silver/60 text-sm mt-2 uppercase tracking-wider">
          ФНЛ-2 · Сезон 2025/26
        </p>
      </div>

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

      <div class="space-y-3">
        <RouterLink
          v-for="match in filteredMatches"
          :key="match.id"
          to="/matches"
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
              <div
                class="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center border-2"
                :class="[match.isHome ? 'border-ska-silver' : 'border-ska-silver/30', `bg-gradient-to-br ${ourTeam.color}`]"
              >
                <span class="text-ska-white text-[11px] font-black">{{ ourTeam.short }}</span>
              </div>
              <div class="min-w-0 hidden sm:block">
                <p class="text-ska-white text-sm font-semibold truncate">{{ ourTeam.name }}</p>
                <p class="text-ska-silver/50 text-xs truncate">{{ ourTeam.city }}</p>
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
                <p class="text-ska-white text-sm font-semibold truncate">{{ match.opponent.name }}</p>
                <p class="text-ska-silver/50 text-xs truncate">{{ match.opponent.city }}</p>
              </div>
              <div
                class="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center border-2"
                :class="[!match.isHome ? 'border-ska-silver' : 'border-ska-silver/30', `bg-gradient-to-br ${match.opponent.color}`]"
              >
                <span class="text-ska-white text-[11px] font-black">{{ match.opponent.short }}</span>
              </div>
            </div>

          </div>

          <!-- Нижняя строка -->
          <div class="flex flex-wrap items-center justify-between gap-2 px-5 py-3 bg-ska-navy/30 border-t border-ska-blue/20 text-xs text-ska-silver/60">
            <span>📅 {{ match.date }}</span>
            <span>🏟 {{ match.stadium }}</span>
          </div>

        </RouterLink>
      </div>

      <div v-if="filteredMatches.length === 0" class="text-center py-20 text-ska-silver/50">
        Матчей не найдено
      </div>

    </section>
  </div>
</template>