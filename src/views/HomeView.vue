<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import LastMatchResult from '@/components/LastMatchResult.vue'
import LeagueTable from '@/components/LeagueTable.vue'

// Дата матча: ближайшая суббота в 18:00
function getNextMatchDate(): Date {
  const now = new Date()
  const target = new Date(now)
  const dayOfWeek = now.getDay() // 0 = воскресенье, 6 = суббота
  const daysUntilSaturday = (6 - dayOfWeek + 7) % 7 || 7
  target.setDate(now.getDate() + daysUntilSaturday)
  target.setHours(18, 0, 0, 0)
  return target
}

const matchDate = ref<Date>(getNextMatchDate())
const now = ref<Date>(new Date())
let intervalId: number | undefined

onMounted(() => {
  intervalId = window.setInterval(() => {
    now.value = new Date()
  }, 1000)
})

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId)
})

// Разница во времени
const timeLeft = computed(() => {
  const diff = matchDate.value.getTime() - now.value.getTime()
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
})

// Форматирование даты на русском
const formattedDate = computed(() => {
  return matchDate.value.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
})

const formattedTime = computed(() => {
  return matchDate.value.toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
  })
})

// Для красоты: 05, 09, 03 вместо 5, 9, 3
function pad(num: number): string {
  return num.toString().padStart(2, '0')
}
</script>

<template>
  <div>
    <!-- HERO: Анонс матча -->
    <section class="relative overflow-hidden bg-gradient-to-br from-ska-navy via-[#0F2444] to-[#1B3A6B]">
      
      <!-- Декоративный градиент сверху -->
      <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(200,16,46,0.15),_transparent_60%)]"></div>

      <div class="relative max-w-7xl mx-auto px-6 py-16 lg:py-24">

        <!-- Верхняя строка: турнир и тур -->
        <div class="flex items-center justify-center gap-3 mb-10 text-sm">
          <span class="px-3 py-1 bg-ska-red/20 border border-ska-red/50 rounded-full text-ska-red font-semibold tracking-wider uppercase">
            ФНЛ-3
          </span>
          <span class="text-ska-silver/60">•</span>
          <span class="text-ska-silver tracking-wider uppercase">
            Тур 11 · Сезон 2025/26
          </span>
        </div>

        <!-- Матч: команда — VS — команда -->
        <div class="grid grid-cols-3 items-center gap-4 lg:gap-12 mb-12">

          <!-- Домашняя команда -->
          <div class="flex flex-col items-center text-center">
            <div class="w-24 h-24 lg:w-32 lg:h-32 rounded-full bg-gradient-to-br from-ska-red to-ska-blue
                        flex items-center justify-center border-4 border-ska-silver shadow-2xl shadow-ska-red/30 mb-4">
              <span class="text-ska-white text-2xl lg:text-3xl font-black">СКА</span>
            </div>
            <h2 class="text-ska-white text-lg lg:text-2xl font-bold tracking-wide">СКА-НЕВА</h2>
            <p class="text-ska-silver text-xs lg:text-sm mt-1">Санкт-Петербург</p>
          </div>

          <!-- Центр: VS + дата -->
          <div class="flex flex-col items-center">
            <span class="text-ska-silver/40 text-4xl lg:text-6xl font-black mb-4">VS</span>
            <div class="text-center">
              <p class="text-ska-white text-sm lg:text-base font-semibold">{{ formattedDate }}</p>
              <p class="text-ska-red text-2xl lg:text-3xl font-black mt-1">{{ formattedTime }}</p>
            </div>
          </div>

          <!-- Гостевая команда -->
          <div class="flex flex-col items-center text-center">
            <div class="w-24 h-24 lg:w-32 lg:h-32 rounded-full bg-gradient-to-br from-blue-800 to-blue-950
                        flex items-center justify-center border-4 border-ska-silver/50 shadow-2xl shadow-blue-900/30 mb-4">
              <span class="text-ska-white text-xl lg:text-2xl font-black">ДМ</span>
            </div>
            <h2 class="text-ska-white text-lg lg:text-2xl font-bold tracking-wide">ДИНАМО</h2>
            <p class="text-ska-silver text-xs lg:text-sm mt-1">Кострома</p>
          </div>

        </div>

        <!-- Место проведения -->
        <p class="text-center text-ska-silver text-sm mb-10">
          🏟 «Нева-Арена», Санкт-Петербург
        </p>

        <!-- Таймер обратного отсчёта -->
        <div class="max-w-3xl mx-auto mb-10">
          <p class="text-center text-ska-silver/70 text-xs uppercase tracking-[0.3em] mb-4">
            До начала матча
          </p>
          <div class="grid grid-cols-4 gap-3 lg:gap-4">
            <div
              v-for="unit in [
                { label: 'Дней', value: timeLeft.days },
                { label: 'Часов', value: timeLeft.hours },
                { label: 'Минут', value: timeLeft.minutes },
                { label: 'Секунд', value: timeLeft.seconds },
              ]"
              :key="unit.label"
              class="bg-ska-navy/60 backdrop-blur-sm border border-ska-blue/50 rounded-xl
                     py-4 lg:py-6 flex flex-col items-center"
            >
              <span class="text-ska-white text-3xl lg:text-5xl font-black tabular-nums">
                {{ pad(unit.value) }}
              </span>
              <span class="text-ska-silver/60 text-[10px] lg:text-xs uppercase tracking-widest mt-2">
                {{ unit.label }}
              </span>
            </div>
          </div>
        </div>

        <!-- CTA кнопки -->
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
          <RouterLink
            to="/tickets"
            class="w-full sm:w-auto px-8 py-3.5 bg-ska-red hover:bg-red-700
                   text-ska-white font-bold text-sm uppercase tracking-wider
                   rounded-md transition-all hover:scale-105 shadow-lg shadow-ska-red/30"
          >
            Купить билет
          </RouterLink>
          <RouterLink
            to="/matches"
            class="w-full sm:w-auto px-8 py-3.5 border-2 border-ska-silver/40 hover:border-ska-silver
                   text-ska-white font-bold text-sm uppercase tracking-wider
                   rounded-md transition-all hover:bg-ska-silver/10"
          >
            Все матчи
          </RouterLink>
        </div>

      </div>
    </section>

    <!-- Блок последнего матча -->
    <LastMatchResult />

    <!--Блок мини турнирной таблицы-->
    <LeagueTable />
    

  </div>
</template>