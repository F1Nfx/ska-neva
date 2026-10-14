<script setup lang="ts">
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

const teams: Team[] = [
  { position: 1, name: 'Волга', city: 'Тверь', short: 'ВТ', color: 'from-slate-500 to-slate-700', played: 11, wins: 7, draws: 1, losses: 3, goalsFor: 18, goalsAgainst: 10, points: 22 },
  { position: 2, name: 'СКА-Нева', city: 'Санкт-Петербург', short: 'СКА', color: 'from-ska-red to-ska-blue', played: 11, wins: 6, draws: 2, losses: 3, goalsFor: 17, goalsAgainst: 11, points: 20, isOurTeam: true },
  { position: 3, name: 'Волга', city: 'Кострома', short: 'ВК', color: 'from-blue-800 to-blue-950', played: 11, wins: 5, draws: 4, losses: 2, goalsFor: 15, goalsAgainst: 10, points: 19 },
  { position: 4, name: 'Заря', city: 'Балтийск', short: 'ЗБ', color: 'from-sky-700 to-blue-900', played: 11, wins: 5, draws: 3, losses: 3, goalsFor: 14, goalsAgainst: 12, points: 18 },
  { position: 5, name: 'Шторм', city: 'Санкт-Петербург', short: 'ШТ', color: 'from-sky-500 to-blue-700', played: 11, wins: 4, draws: 3, losses: 4, goalsFor: 13, goalsAgainst: 13, points: 15 },
  { position: 6, name: 'Лев', city: 'Владимир', short: 'ЛВ', color: 'from-slate-600 to-slate-800', played: 11, wins: 3, draws: 3, losses: 5, goalsFor: 11, goalsAgainst: 15, points: 12 },
  { position: 7, name: 'Молот', city: 'Нижний Тагил', short: 'МН', color: 'from-red-700 to-red-900', played: 11, wins: 2, draws: 4, losses: 5, goalsFor: 10, goalsAgainst: 16, points: 10 },
  { position: 8, name: 'Замок', city: 'Выборг', short: 'ЗВ', color: 'from-indigo-700 to-indigo-900', played: 11, wins: 1, draws: 5, losses: 5, goalsFor: 9, goalsAgainst: 17, points: 8 },
  { position: 9, name: 'Курск', city: 'Курск', short: 'КР', color: 'from-blue-600 to-blue-800', played: 11, wins: 2, draws: 2, losses: 7, goalsFor: 10, goalsAgainst: 19, points: 8 },
  { position: 10, name: 'Красноярск', city: 'Красноярск', short: 'КЯ', color: 'from-orange-600 to-orange-800', played: 11, wins: 1, draws: 4, losses: 6, goalsFor: 8, goalsAgainst: 18, points: 7 },
  { position: 11, name: 'Маяк', city: 'Ульяновск', short: 'МУ', color: 'from-emerald-700 to-emerald-900', played: 11, wins: 1, draws: 4, losses: 6, goalsFor: 7, goalsAgainst: 17, points: 7 },
  { position: 12, name: 'Барс', city: 'Владикавказ', short: 'БА', color: 'from-yellow-600 to-yellow-800', played: 11, wins: 1, draws: 3, losses: 7, goalsFor: 9, goalsAgainst: 20, points: 6 },
  { position: 13, name: 'Луч', city: 'Новосибирск', short: 'ЛН', color: 'from-cyan-700 to-cyan-900', played: 11, wins: 1, draws: 2, losses: 8, goalsFor: 8, goalsAgainst: 21, points: 5 },
  { position: 14, name: 'Амур', city: 'Комсомольск-на-Амуре', short: 'АМ', color: 'from-teal-700 to-teal-900', played: 11, wins: 1, draws: 1, losses: 9, goalsFor: 6, goalsAgainst: 22, points: 4 },
  { position: 15, name: 'Сахалин', city: 'Южно-Сахалинск', short: 'СХ', color: 'from-green-700 to-green-900', played: 11, wins: 0, draws: 3, losses: 8, goalsFor: 5, goalsAgainst: 20, points: 3 },
  { position: 16, name: 'Элиста', city: 'Элиста', short: 'ЭЛ', color: 'from-purple-700 to-purple-950', played: 11, wins: 0, draws: 2, losses: 9, goalsFor: 4, goalsAgainst: 24, points: 2 },
]
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
        :class="team.isOurTeam && 'bg-ska-red/5'"
      >
        <!-- Зональная полоса слева -->
        <div
          class="absolute left-0 top-0 bottom-0 w-1"
          :class="[
            team.isOurTeam ? 'bg-ska-red' :
            team.position <= 2 ? 'bg-emerald-500' :
            team.position >= 15 ? 'bg-ska-red/60' : 'bg-transparent',
          ]"
        ></div>

        <!-- Место -->
        <div
          class="text-center text-sm font-bold tabular-nums"
          :class="[
            team.isOurTeam ? 'text-ska-red' :
            team.position <= 2 ? 'text-emerald-400' :
            team.position >= 15 ? 'text-ska-red/80' : 'text-ska-silver/70',
          ]"
        >
          {{ team.position }}
        </div>

        <!-- Команда -->
        <div class="flex items-center gap-3 min-w-0">
          <div
            class="w-9 h-9 lg:w-10 lg:h-10 rounded-full flex items-center justify-center flex-shrink-0 border-2"
            :class="[
              team.isOurTeam ? 'border-ska-silver' : 'border-ska-silver/30',
              `bg-gradient-to-br ${team.color}`,
            ]"
          >
            <span class="text-ska-white text-[10px] lg:text-xs font-black">{{ team.short }}</span>
          </div>
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