<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import TeamLogo from '@/components/TeamLogo.vue'

const route = useRoute()
const player = ref<any>(null)
const loading = ref(true)

onMounted(async () => {
  try {
    const response = await fetch(`http://localhost:3001/api/players/${route.params.id}`)
    if (!response.ok) throw new Error('Игрок не найден')
    player.value = await response.json()
    
    // Обновляем title страницы
    if (player.value) {
      document.title = `${player.value.name} · ПФК «СКА-Нева»`
    }
  } catch (error) {
    console.error(error)
    player.value = null
  } finally {
    loading.value = false
  }
})

// Так как stats в базе — это массив (даже если там 1 запись), берем первый элемент
const stats = computed(() => {
  if (!player.value || !player.value.stats || player.value.stats.length === 0) return []
  const s = player.value.stats[0]
  return [
    { label: 'Матчи', value: s.matches },
    { label: 'Голы', value: s.goals },
    { label: 'Передачи', value: s.assists },
    { label: 'Жёлтые', value: s.yellowCards },
    { label: 'Красные', value: s.redCards },
  ]
})
</script>

<template>
  <div class="bg-ska-navy min-h-screen">

    <!-- Игрок не найден -->
    <div v-if="!player" class="max-w-7xl mx-auto px-6 py-20 text-center">
      <h1 class="text-ska-white text-3xl font-black uppercase mb-4">
        Игрок не найден
      </h1>
      <p class="text-ska-silver/60 mb-8">
        Возможно, он покинул клуб или номер был изменён.
      </p>
      <RouterLink
        to="/team"
        class="inline-flex items-center gap-2 px-6 py-3 bg-ska-red hover:bg-red-700
               text-ska-white font-bold text-sm uppercase tracking-wider
               rounded-md transition-colors"
      >
        ← К команде
      </RouterLink>
    </div>

    <template v-else>
      <!-- Хлебные крошки -->
      <div class="max-w-7xl mx-auto px-6 pt-8 pb-4">
        <nav class="flex items-center gap-2 text-xs text-ska-silver/50 uppercase tracking-wider">
          <RouterLink to="/" class="hover:text-ska-white transition-colors">Главная</RouterLink>
          <span>/</span>
          <RouterLink to="/team" class="hover:text-ska-white transition-colors">Команда</RouterLink>
          <span>/</span>
          <span class="text-ska-silver">{{ player.name }}</span>
        </nav>
      </div>

      <!-- Hero-секция игрока -->
      <section class="relative overflow-hidden border-b border-ska-blue/30">
        <!-- Фон: градиент + свечение -->
        <div class="absolute inset-0 bg-gradient-to-br from-ska-navy via-[#0F2444] to-[#1B3A6B]"></div>
        <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(200,16,46,0.12),_transparent_65%)]"></div>

        <!-- Сетка точек -->
        <div class="absolute inset-0 opacity-[0.05]"
             style="background-image: radial-gradient(circle, #fff 1px, transparent 1px); background-size: 28px 28px;"></div>

        <div class="relative max-w-7xl mx-auto px-6 py-10 lg:py-16">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">

            <!-- Левая колонка: номер + имя -->
            <div class="lg:col-span-4 order-2 lg:order-1">
              <!-- Гигантский номер -->
              <div class="text-ska-white font-black leading-none tabular-nums
                          text-[120px] lg:text-[180px] xl:text-[200px]
                          bg-gradient-to-b from-ska-white via-ska-white to-ska-white/40
                          bg-clip-text text-transparent">
                {{ player.number }}
              </div>

              <!-- Позиция -->
              <p class="text-ska-red text-sm lg:text-base font-bold uppercase tracking-[0.3em] mt-4 mb-2">
                {{ player.position }}
              </p>

              <!-- Имя -->
              <h1 class="text-ska-white text-3xl lg:text-5xl font-black uppercase leading-[0.95] tracking-tight">
                {{ player.name.split(' ')[0] }}<br />
                <span class="text-ska-silver">{{ player.name.split(' ').slice(1).join(' ') }}</span>
              </h1>

              <!-- Капитан -->
              <div
                v-if="player.isCaptain"
                class="inline-flex items-center gap-2 mt-6 px-3 py-1.5
                       bg-ska-red/20 border border-ska-red/50 rounded-md"
              >
                <span class="w-2 h-2 rounded-full bg-ska-red"></span>
                <span class="text-ska-red text-xs font-bold uppercase tracking-wider">
                  Капитан команды
                </span>
              </div>
            </div>

            <!-- Центр: силуэт игрока -->
            <div class="lg:col-span-5 order-1 lg:order-2 flex items-end justify-center">
              <div class="relative w-full max-w-md aspect-[3/4]">
                <!-- Свечение за игроком -->
                <div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_70%,_rgba(27,58,107,0.6),_transparent_60%)]"></div>

                <!-- SVG-силуэт крупно -->
                <svg
                  viewBox="0 0 200 320"
                  class="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-full
                         text-ska-silver/20"
                  fill="currentColor"
                  preserveAspectRatio="xMidYMax meet"
                >
                  <circle cx="100" cy="70" r="42" />
                  <rect x="88" y="105" width="24" height="20" />
                  <path d="M 30 145 Q 60 118 88 125 L 112 125 Q 140 118 170 145 L 185 320 L 15 320 Z" />
                  <path d="M 80 130 Q 100 145 120 130 L 125 138 Q 100 158 75 138 Z"
                        class="text-ska-red/40" fill="currentColor" />
                </svg>

                <!-- Красная линия снизу (декор) -->
                <div class="absolute bottom-0 left-1/2 -translate-x-1/2
                            w-32 h-1 bg-gradient-to-r from-transparent via-ska-red to-transparent"></div>
              </div>
            </div>

            <!-- Правая колонка: инфо -->
            <div class="lg:col-span-3 order-3">
              <div class="bg-[#0A1425]/60 backdrop-blur-sm
                          border border-ska-blue/40 rounded-xl p-6">
                <h3 class="text-ska-silver/60 text-[11px] uppercase tracking-[0.25em] mb-5">
                  Профиль
                </h3>

                <dl class="space-y-4">
                  <div class="flex items-start justify-between gap-3 pb-3 border-b border-ska-blue/20">
                    <dt class="text-ska-silver/50 text-xs uppercase tracking-wider">Город</dt>
                    <dd class="text-ska-white text-sm font-semibold text-right">
                      {{ player.birthplace }}
                    </dd>
                  </div>

                  <div class="flex items-start justify-between gap-3 pb-3 border-b border-ska-blue/20">
                    <dt class="text-ska-silver/50 text-xs uppercase tracking-wider">Возраст</dt>
                    <dd class="text-ska-white text-sm font-semibold text-right">
                      {{ player.age }} лет
                    </dd>
                  </div>

                  <div class="flex items-start justify-between gap-3 pb-3 border-b border-ska-blue/20">
                    <dt class="text-ska-silver/50 text-xs uppercase tracking-wider">Рост</dt>
                    <dd class="text-ska-white text-sm font-semibold text-right">
                      {{ player.height }} см
                    </dd>
                  </div>

                  <div class="flex items-start justify-between gap-3 pb-3 border-b border-ska-blue/20">
                    <dt class="text-ska-silver/50 text-xs uppercase tracking-wider">Вес</dt>
                    <dd class="text-ska-white text-sm font-semibold text-right">
                      {{ player.weight }} кг
                    </dd>
                  </div>

                  <div class="flex items-start justify-between gap-3 pb-3 border-b border-ska-blue/20">
                    <dt class="text-ska-silver/50 text-xs uppercase tracking-wider">Фут</dt>
                    <dd class="text-ska-white text-sm font-semibold text-right">
                      {{ player.foot }}
                    </dd>
                  </div>

                  <div class="flex items-start justify-between gap-3">
                    <dt class="text-ska-silver/50 text-xs uppercase tracking-wider">В клубе</dt>
                    <dd class="text-ska-white text-sm font-semibold text-right">
                      с {{ player.joinedAt }}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>

          </div>
        </div>
      </section>

      <!-- Статистика за сезон -->
      <section class="max-w-7xl mx-auto px-6 py-14">
        <div class="flex items-center gap-3 mb-8">
          <div class="w-1 h-6 bg-ska-red rounded"></div>
          <div>
            <h2 class="text-ska-white text-xl lg:text-2xl font-bold tracking-wide uppercase">
              Статистика
            </h2>
            <p class="text-ska-silver/60 text-sm mt-1">
              Сезон {{ player.stats.season }} · ФНЛ-3
            </p>
          </div>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          <div
            v-for="stat in stats"
            :key="stat.label"
            class="bg-gradient-to-br from-[#0A1425] to-[#0F2444]
                   border border-ska-blue/30 rounded-xl p-6 text-center
                   hover:border-ska-red/40 transition-colors"
          >
            <p class="text-ska-white text-4xl lg:text-5xl font-black tabular-nums">
              {{ stat.value }}
            </p>
            <p class="text-ska-silver/60 text-xs uppercase tracking-widest mt-2">
              {{ stat.label }}
            </p>
          </div>
        </div>
      </section>

      <!-- Кнопка назад -->
      <section class="max-w-7xl mx-auto px-6 pb-16">
        <RouterLink
          to="/team"
          class="inline-flex items-center gap-2 px-6 py-3
                 border border-ska-blue/50 hover:border-ska-silver
                 text-ska-silver hover:text-ska-white
                 text-sm font-semibold uppercase tracking-wider
                 rounded-md transition-colors"
        >
          ← Назад к команде
        </RouterLink>
      </section>
    </template>

  </div>
</template>