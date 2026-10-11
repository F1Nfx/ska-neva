<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { players } from '@/data/players'
import { staff } from '@/data/staff'

const goalkeepers = players.filter((p) => p.position === 'Вратарь')
const defenders = players.filter((p) => p.position === 'Защитник')
const midfielders = players.filter((p) => p.position === 'Полузащитник')
const forwards = players.filter((p) => p.position === 'Нападающий')

const groups = [
  { title: 'Вратари', players: goalkeepers },
  { title: 'Защитники', players: defenders },
  { title: 'Полузащитники', players: midfielders },
  { title: 'Нападающие', players: forwards },
]
</script>

<template>
  <div class="bg-ska-navy min-h-screen">
    <section class="max-w-7xl mx-auto px-6 py-12">

      <!-- Заголовок -->
      <div class="mb-10">
        <h1 class="text-ska-white text-3xl lg:text-5xl font-black tracking-wide uppercase">
          Команда
        </h1>
        <p class="text-ska-silver/60 text-sm mt-2 uppercase tracking-wider">
          ФНЛ-3 · Сезон 2025/26
        </p>
      </div>

      <!-- Тренерский штаб -->
      <div class="mb-14">
        <div class="flex items-center gap-3 mb-6">
          <div class="w-1 h-6 bg-ska-red rounded"></div>
          <h2 class="text-ska-white text-xl lg:text-2xl font-bold tracking-wide uppercase">
            Тренерский штаб
          </h2>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-5">
          <div
            v-for="person in staff"
            :key="person.id"
            class="group bg-gradient-to-br from-[#0A1425] to-[#0F2444]
                   border border-ska-blue/30 rounded-xl overflow-hidden
                   hover:border-ska-red/60 transition-all duration-300
                   hover:-translate-y-1 hover:shadow-xl hover:shadow-ska-red/10"
          >
            <div class="relative aspect-[3/4] overflow-hidden
                        bg-gradient-to-b from-ska-blue/40 via-ska-navy to-ska-navy">
              <div class="absolute inset-0 opacity-[0.07]"
                   style="background-image: radial-gradient(circle, #fff 1px, transparent 1px); background-size: 18px 18px;"></div>

              <svg
                viewBox="0 0 200 320"
                class="absolute bottom-0 left-1/2 -translate-x-1/2 w-[85%] h-[85%]
                       text-ska-silver/15 group-hover:text-ska-silver/25
                       transition-colors duration-500"
                fill="currentColor"
                preserveAspectRatio="xMidYMax meet"
              >
                <circle cx="100" cy="70" r="42" />
                <rect x="88" y="105" width="24" height="18" />
                <path d="M 38 145 Q 65 122 88 128 L 112 128 Q 135 122 162 145 L 178 320 L 22 320 Z" />
                <path d="M 82 132 L 100 160 L 118 132 L 112 128 L 100 148 L 88 128 Z"
                      class="text-ska-silver/25" fill="currentColor" />
                <path d="M 97 148 L 103 148 L 105 200 L 100 215 L 95 200 Z"
                      class="text-ska-red/40" fill="currentColor" />
              </svg>

              <div class="absolute bottom-0 left-0 right-0 h-24
                          bg-gradient-to-t from-[#0A1425] to-transparent"></div>
            </div>

            <div class="relative px-4 py-4 border-t border-ska-blue/30">
              <p class="text-ska-white font-bold text-sm lg:text-base truncate">
                {{ person.name }}
              </p>
              <p class="text-ska-red text-[11px] uppercase tracking-wider font-semibold mt-1 truncate">
                {{ person.role }}
              </p>
              <p class="text-ska-silver/50 text-xs mt-1">
                {{ person.age }} лет
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Состав по группам -->
      <div
        v-for="group in groups"
        :key="group.title"
        class="mb-14 last:mb-0"
      >
        <div class="flex items-center gap-3 mb-6">
          <div class="w-1 h-6 bg-ska-red rounded"></div>
          <h2 class="text-ska-white text-xl lg:text-2xl font-bold tracking-wide uppercase">
            {{ group.title }}
          </h2>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-5">
          <RouterLink
            v-for="player in group.players"
            :key="player.id"
            :to="`/team/${player.id}`"
            class="group bg-gradient-to-br from-[#0A1425] to-[#0F2444]
                   border border-ska-blue/30 rounded-xl overflow-hidden
                   hover:border-ska-red/60 transition-all duration-300
                   hover:-translate-y-1 hover:shadow-xl hover:shadow-ska-red/10"
          >
            <div class="relative aspect-[3/4] overflow-hidden
                        bg-gradient-to-b from-ska-blue/40 via-ska-navy to-ska-navy">
              <div class="absolute inset-0 opacity-[0.07]"
                   style="background-image: radial-gradient(circle, #fff 1px, transparent 1px); background-size: 18px 18px;"></div>

              <svg
                viewBox="0 0 200 320"
                class="absolute bottom-0 left-1/2 -translate-x-1/2 w-[85%] h-[85%]
                       text-ska-silver/15 group-hover:text-ska-silver/25
                       transition-colors duration-500"
                fill="currentColor"
                preserveAspectRatio="xMidYMax meet"
              >
                <circle cx="100" cy="70" r="42" />
                <rect x="88" y="105" width="24" height="20" />
                <path d="M 30 145 Q 60 118 88 125 L 112 125 Q 140 118 170 145 L 185 320 L 15 320 Z" />
                <path d="M 80 130 Q 100 145 120 130 L 125 138 Q 100 158 75 138 Z"
                      class="text-ska-red/40" fill="currentColor" />
              </svg>

              <div
                v-if="player.isCaptain"
                class="absolute top-3 left-3 px-2 py-0.5 rounded
                       bg-ska-red text-ska-white text-[10px] font-black uppercase tracking-wider
                       shadow-lg shadow-ska-red/40"
              >
                Капитан
              </div>

              <div class="absolute bottom-0 left-0 right-0 h-24
                          bg-gradient-to-t from-[#0A1425] to-transparent"></div>
            </div>

            <div class="relative px-4 py-4 border-t border-ska-blue/30">
              <div class="flex items-center gap-2 mb-1">
                <span class="text-ska-red font-black text-lg tabular-nums">
                  {{ player.number }}
                </span>
                <span class="text-ska-white font-bold text-sm lg:text-base truncate">
                  {{ player.name }}
                </span>
              </div>
              <p class="text-ska-silver/50 text-xs">
                {{ player.position }} · {{ player.age }} лет
              </p>
            </div>
          </RouterLink>
        </div>
      </div>

    </section>
  </div>
</template>