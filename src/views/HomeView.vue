<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import LastMatchResult from '@/components/LastMatchResult.vue'
import LeagueTable from '@/components/LeagueTable.vue'
import NewsPreview from '@/components/NewsPreview.vue'
import TeamLogo from '@/components/TeamLogo.vue'

// Данные матча
const nextMatch = ref<any>(null)
const matchDate = ref<Date>(new Date())
const now = ref<Date>(new Date())
let intervalId: number | undefined

onMounted(async () => {
  // Запускаем таймер
  intervalId = window.setInterval(() => {
    now.value = new Date()
  }, 1000)

  // Загружаем матчи
  try {
    const response = await fetch('http://localhost:3001/api/matches')
    const matches = await response.json()
    
    // Ищем ближайший предстоящий матч
    const upcoming = matches.filter((m: any) => m.status === 'upcoming')
    
    if (upcoming.length > 0) {
      // Бэкенд отдает их по убыванию ID, поэтому берем последний в списке
      const m = upcoming[upcoming.length - 1]
      const isHome = m.homeTeam.isOurTeam
      
      nextMatch.value = {
        ...m,
        isHome,
        opponent: isHome ? m.awayTeam : m.homeTeam,
      }

      // Правильно парсим русскую дату для таймера
      const months: Record<string, number> = {
        'января': 0, 'февраля': 1, 'марта': 2, 'апреля': 3, 'мая': 4, 'июня': 5,
        'июля': 6, 'августа': 7, 'сентября': 8, 'октября': 9, 'ноября': 10, 'декабря': 11
      }
      const [day, monthStr, year] = m.dateStr.split(' ')
      const [hours, minutes] = m.time.split(':')
      
      matchDate.value = new Date(
        Number(year), 
        months[monthStr] || 0, 
        Number(day), 
        Number(hours), 
        Number(minutes)
      )
    }
  } catch (error) {
    console.error('Ошибка загрузки следующего матча:', error)
  }
})

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId)
})

// Таймер
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

        <!-- Верхняя строка: турнир и тур (Используем данные из API) -->
        <div class="flex items-center justify-center gap-3 mb-10 text-sm">
          <span class="px-3 py-1 bg-ska-red/20 border border-ska-red/50 rounded-full text-ska-red font-semibold tracking-wider uppercase">
            {{ nextMatch?.tournament || 'ФНЛ-3' }}
          </span>
          <span class="text-ska-silver/60">•</span>
          <span class="text-ska-silver tracking-wider uppercase">
            Тур {{ nextMatch?.tour || '...' }} · Сезон 2025/26
          </span>
        </div>

        <!-- Матч: команда — VS — команда -->
        <div class="grid grid-cols-3 items-center gap-4 lg:gap-12 mb-12">

          <!-- Домашняя команда (Наша) -->
          <div class="flex flex-col items-center text-center">
            <TeamLogo
              :team="{ name: 'СКА-Нева', short: 'СКА', color: 'from-ska-red to-ska-blue', isOurTeam: true }"
              size="xl"
            />
            <div class="h-4"></div>
            <h2 class="text-ska-white text-lg lg:text-2xl font-bold tracking-wide">
              СКА-НЕВА
            </h2>
            <p class="text-ska-silver text-xs lg:text-sm mt-1">
              Санкт-Петербург
            </p>
          </div>

          <!-- Центр: VS + дата -->
          <div class="flex flex-col items-center">
            <span class="text-ska-silver/40 text-4xl lg:text-6xl font-black mb-4">VS</span>
            <div class="text-center">
              <p class="text-ska-white text-sm lg:text-base font-semibold">{{ nextMatch?.dateStr }}</p>
              <p class="text-ska-red text-2xl lg:text-3xl font-black mt-1">{{ nextMatch?.time }}</p>
            </div>
          </div>

          <!-- Гостевая команда (Соперник из API) -->
          <div class="flex flex-col items-center text-center">
            <TeamLogo 
              v-if="nextMatch" 
              :team="nextMatch.opponent" 
              size="xl" 
            />
            <div v-else class="w-24 h-24 lg:w-32 lg:h-32"></div> <!-- Заглушка, пока грузится -->
            
            <div class="h-4"></div>
            <h2 class="text-ska-white text-lg lg:text-2xl font-bold tracking-wide uppercase">
              {{ nextMatch?.opponent?.name || 'Соперник' }}
            </h2>
            <p class="text-ska-silver text-xs lg:text-sm mt-1">
              {{ nextMatch?.opponent?.city || 'Город' }}
            </p>
          </div>

        </div>

        <!-- Место проведения (Из API) -->
        <p class="text-center text-ska-silver text-sm mb-10">
          🏟 {{ nextMatch?.stadium || '«Нева-Арена», Санкт-Петербург' }}
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
            :to="nextMatch ? `/matches/${nextMatch.id}` : '/matches'"
            class="w-full sm:w-auto px-8 py-3.5 border-2 border-ska-silver/40 hover:border-ska-silver
                   text-ska-white font-bold text-sm uppercase tracking-wider
                   rounded-md transition-all hover:bg-ska-silver/10"
          >
            Подробнее о матче
          </RouterLink>
        </div>

      </div>
    </section>

    <!-- Блок последнего матча -->
    <LastMatchResult />

    <!--Блок мини турнирной таблицы-->
    <LeagueTable />
    
    <!--Блок превью новостей-->
    <NewsPreview />

  </div>
</template>