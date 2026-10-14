<script setup lang="ts">
import { RouterLink } from 'vue-router'
import TeamLogo from '@/components/TeamLogo.vue'

type Team = {
  position: number
  name: string
  city: string
  short: string
  color: string      // tailwind-класс для градиента логотипа
  played: number
  wins: number
  draws: number
  losses: number
  goalsFor: number
  goalsAgainst: number
  points: number
  isOurTeam?: boolean
}

const teams: Team[] = [
  { position: 1, name: 'Волга', city: 'Тверь', short: 'ВТ', color: 'from-slate-500 to-slate-700', played: 11, wins: 7, draws: 1, losses: 3, goalsFor: 18, goalsAgainst: 10, points: 22 },
  { position: 2, name: 'СКА-Нева', city: 'Санкт-Петербург', short: 'СКА', color: 'from-ska-red to-ska-blue', played: 11, wins: 6, draws: 2, losses: 3, goalsFor: 17, goalsAgainst: 11, points: 20, isOurTeam: true },
  { position: 3, name: 'Волга', city: 'Кострома', short: 'ВК', color: 'from-blue-800 to-blue-950', played: 11, wins: 5, draws: 4, losses: 2, goalsFor: 15, goalsAgainst: 10, points: 19 },
  { position: 4, name: 'Заря', city: 'Балтийск', short: 'ЗБ', color: 'from-sky-700 to-blue-900', played: 11, wins: 5, draws: 3, losses: 3, goalsFor: 14, goalsAgainst: 12, points: 18 },
  { position: 5, name: 'Шторм', city: 'Санкт-Петербург', short: 'ШТ', color: 'from-sky-500 to-blue-700', played: 11, wins: 4, draws: 3, losses: 4, goalsFor: 13, goalsAgainst: 13, points: 15 },
  { position: 6, name: 'Лев', city: 'Владимир', short: 'ЛВ', color: 'from-slate-600 to-slate-800', played: 11, wins: 3, draws: 3, losses: 5, goalsFor: 11, goalsAgainst: 15, points: 12 },
  { position: 7, name: 'Молот', city: 'Нижний Тагил', short: 'МН', color: 'from-red-700 to-red-900', played: 11, wins: 2, draws: 4, losses: 5, goalsFor: 10, goalsAgainst: 16, points: 10 },
  { position: 8, name: 'Замок', city: 'Выборг', short: 'ЗВ', color: 'from-indigo-700 to-indigo-900', played: 11, wins: 1, draws: 5, losses: 5, goalsFor: 9, goalsAgainst: 17, points: 8 },
]
</script>

<template>
  <section class="bg-[#0A1425] py-16 border-t border-ska-blue/20">
    <div class="max-w-7xl mx-auto px-6">

      <!-- Заголовок секции -->
      <div class="flex items-end justify-between mb-8">
        <div>
          <h2 class="text-ska-white text-2xl lg:text-3xl font-bold tracking-wide uppercase">
            Турнирная таблица
          </h2>
          <p class="text-ska-silver/60 text-sm mt-1">
            ФНЛ-3 · Сезон 2025/26
          </p>
        </div>
        <RouterLink
          :to="{ path: '/matches', query: { tab: 'table' } }"
          class="hidden sm:inline-flex items-center gap-2
                 text-ska-red hover:text-ska-white text-sm font-semibold
                 uppercase tracking-wider transition-colors"
        >
          Полная таблица
          <span>→</span>
        </RouterLink>
      </div>

      <!-- Таблица -->
      <div class="bg-gradient-to-br from-ska-navy to-[#0F2444]
                  border border-ska-blue/40 rounded-2xl overflow-hidden">

        <!-- Шапка таблицы (десктоп) -->
        <div class="hidden lg:grid grid-cols-[40px_1fr_60px_60px_60px_60px_100px_70px]
                    gap-4 px-6 py-4 border-b border-ska-blue/40
                    text-ska-silver/60 text-[11px] uppercase tracking-widest font-semibold">
          <div class="text-center">#</div>
          <div>Команда</div>
          <div class="text-center">И</div>
          <div class="text-center">В</div>
          <div class="text-center">Н</div>
          <div class="text-center">П</div>
          <div class="text-center">Заб-Проп</div>
          <div class="text-center">О</div>
        </div>

        <!-- Строки команд -->
        <div
          v-for="team in teams"
          :key="team.position"
          class="relative grid grid-cols-[40px_1fr_70px] lg:grid-cols-[40px_1fr_60px_60px_60px_60px_100px_70px]
                 gap-4 px-6 py-4 items-center border-b border-ska-blue/20 last:border-b-0
                 transition-colors hover:bg-ska-blue/10"
          :class="team.isOurTeam && 'bg-ska-red/5'"
        >

          <!-- Красная полоса для нашей команды -->
          <div
            v-if="team.isOurTeam"
            class="absolute left-0 top-0 bottom-0 w-1 bg-ska-red"
          ></div>

          <!-- Место -->
          <div
            class="text-center text-sm font-bold tabular-nums"
            :class="team.isOurTeam ? 'text-ska-red' : 'text-ska-silver/70'"
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

          <!-- Статистика: на мобилке — только очки, на десктопе — всё -->
          <div class="hidden lg:contents">
            <div class="text-center text-sm text-ska-silver tabular-nums">{{ team.played }}</div>
            <div class="text-center text-sm text-ska-silver tabular-nums">{{ team.wins }}</div>
            <div class="text-center text-sm text-ska-silver tabular-nums">{{ team.draws }}</div>
            <div class="text-center text-sm text-ska-silver tabular-nums">{{ team.losses }}</div>
            <div class="text-center text-sm text-ska-silver tabular-nums">
              {{ team.goalsFor }}–{{ team.goalsAgainst }}
            </div>
          </div>

          <!-- Очки (видны всегда) -->
          <div
            class="text-center text-base lg:text-lg font-black tabular-nums"
            :class="team.isOurTeam ? 'text-ska-red' : 'text-ska-white'"
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
          <span class="text-ska-silver/40">И</span>
          <span>— игры</span>
          <span class="text-ska-silver/40">·</span>
          <span class="text-ska-silver/40">В</span>
          <span>— победы</span>
          <span class="text-ska-silver/40">·</span>
          <span class="text-ska-silver/40">Н</span>
          <span>— ничьи</span>
          <span class="text-ska-silver/40">·</span>
          <span class="text-ska-silver/40">П</span>
          <span>— поражения</span>
          <span class="text-ska-silver/40">·</span>
          <span class="text-ska-silver/40">О</span>
          <span>— очки</span>
        </div>
      </div>

      <!-- Мобильная кнопка -->
      <div class="sm:hidden mt-6 text-center">
        <RouterLink
          to="/matches"
          class="text-ska-red text-sm font-semibold uppercase tracking-wider"
        >
          Полная таблица →
        </RouterLink>
      </div>

    </div>
  </section>
</template>