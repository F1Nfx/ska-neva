<script setup lang="ts">
import { ref, computed } from 'vue'
import { upcomingMatches, ourTeam } from '@/data/matches'

// Только домашние матчи
const homeMatches = computed(() => upcomingMatches.filter((m) => m.isHome))

const selectedMatchId = ref<number>(homeMatches.value[0]?.id ?? 0)
const selectedMatch = computed(() => homeMatches.value.find((m) => m.id === selectedMatchId.value))

// ── Секторы стадиона ─────────────────────────────────────
type PriceOption = { label: string; price: number }

type Sector = {
  id: string
  name: string
  stand: string
  x: number
  y: number
  w: number
  h: number
  prices: PriceOption[]
}

// Функция: из базовой цены делаем 3 категории, сортируем от низкой к высокой
function pricesFor(base: number): PriceOption[] {
  return [
    { label: 'Детский (до 12 лет)', price: Math.round(base * 0.5) },
    { label: 'Студенческий', price: Math.round(base * 0.7) },
    { label: 'Стандарт', price: base },
  ].sort((a, b) => a.price - b.price)
}

const sectors: Sector[] = [
  // Северная трибуна (дешёвая)
  { id: 'N1', name: 'Северная 1', stand: 'Северная', x: 180, y: 60, w: 85, h: 80, prices: pricesFor(150) },
  { id: 'N2', name: 'Северная 2', stand: 'Северная', x: 265, y: 60, w: 85, h: 80, prices: pricesFor(200) },
  { id: 'N3', name: 'Северная 3', stand: 'Северная', x: 350, y: 60, w: 85, h: 80, prices: pricesFor(200) },
  { id: 'N4', name: 'Северная 4', stand: 'Северная', x: 435, y: 60, w: 85, h: 80, prices: pricesFor(150) },

  // Южная трибуна (дешёвая)
  { id: 'S1', name: 'Южная 1', stand: 'Южная', x: 180, y: 360, w: 85, h: 80, prices: pricesFor(150) },
  { id: 'S2', name: 'Южная 2', stand: 'Южная', x: 265, y: 360, w: 85, h: 80, prices: pricesFor(200) },
  { id: 'S3', name: 'Южная 3', stand: 'Южная', x: 350, y: 360, w: 85, h: 80, prices: pricesFor(200) },
  { id: 'S4', name: 'Южная 4', stand: 'Южная', x: 435, y: 360, w: 85, h: 80, prices: pricesFor(150) },

  // Западная трибуна (премиум)
  { id: 'W1', name: 'Западная 1', stand: 'Западная', x: 60, y: 150, w: 130, h: 66, prices: pricesFor(300) },
  { id: 'W2', name: 'Западная центр', stand: 'Западная', x: 60, y: 216, w: 130, h: 68, prices: pricesFor(450) },
  { id: 'W3', name: 'Западная 3', stand: 'Западная', x: 60, y: 284, w: 130, h: 66, prices: pricesFor(300) },

  // Восточная трибуна (фан-зона)
  { id: 'E1', name: 'Восточная 1', stand: 'Восточная', x: 510, y: 150, w: 130, h: 66, prices: pricesFor(200) },
  { id: 'E2', name: 'Фан-зона', stand: 'Восточная', x: 510, y: 216, w: 130, h: 68, prices: pricesFor(250) },
  { id: 'E3', name: 'Восточная 3', stand: 'Восточная', x: 510, y: 284, w: 130, h: 66, prices: pricesFor(200) },
]

const selectedSectorId = ref<string | null>(null)
const selectedSector = computed(() => sectors.find((s) => s.id === selectedSectorId.value))

const selectedPriceLabel = ref<string>('')
const quantity = ref<number>(1)

const selectedPrice = computed(() => {
  if (!selectedSector.value) return 0
  return selectedSector.value.prices.find((p) => p.label === selectedPriceLabel.value)?.price ?? 0
})

const total = computed(() => selectedPrice.value * quantity.value)

function selectSector(id: string) {
  selectedSectorId.value = id
  // Автоматически выбираем самую дешёвую категорию
  const sector = sectors.find((s) => s.id === id)
  if (sector) selectedPriceLabel.value = sector.prices[0]!.label
}

// VIP
const vipSelected = ref(false)
function selectVip() {
  vipSelected.value = true
  selectedSectorId.value = null
  selectedPriceLabel.value = 'VIP-ложа'
}
</script>

<template>
  <div class="bg-ska-navy min-h-screen">
    <section class="max-w-7xl mx-auto px-6 py-12">

      <!-- Заголовок -->
      <div class="mb-10">
        <h1 class="text-ska-white text-3xl lg:text-5xl font-black tracking-wide uppercase">
          Билеты
        </h1>
        <p class="text-ska-silver/60 text-sm mt-2 uppercase tracking-wider">
          Онлайн-продажа · ФНЛ-3 · Сезон 2025/26
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">

        <!-- Левая колонка -->
        <div class="lg:col-span-2 space-y-8">

          <!-- Шаг 1: Выбор матча -->
          <div>
            <div class="flex items-center gap-3 mb-5">
              <div class="w-8 h-8 rounded-full bg-ska-red flex items-center justify-center
                          text-ska-white font-black text-sm">1</div>
              <h2 class="text-ska-white text-lg lg:text-xl font-bold tracking-wide uppercase">
                Выберите матч
              </h2>
            </div>

            <div class="space-y-3">
              <button
                v-for="match in homeMatches"
                :key="match.id"
                @click="selectedMatchId = match.id; selectedSectorId = null; vipSelected = false"
                class="w-full text-left bg-gradient-to-br from-[#0A1425] to-[#0F2444]
                       border rounded-xl p-4 transition-all duration-200"
                :class="selectedMatchId === match.id
                  ? 'border-ska-red shadow-lg shadow-ska-red/10'
                  : 'border-ska-blue/30 hover:border-ska-silver/50'"
              >
                <div class="flex items-center justify-between gap-3">
                  <div class="flex items-center gap-3 min-w-0">
                    <div
                      class="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center border-2
                             bg-gradient-to-br"
                      :class="match.opponent.color"
                    >
                      <span class="text-ska-white text-[11px] font-black">
                        {{ match.opponent.short }}
                      </span>
                    </div>
                    <div class="min-w-0">
                      <p class="text-ska-white text-sm font-semibold truncate">
                        {{ ourTeam.name }} — {{ match.opponent.name }}
                      </p>
                      <p class="text-ska-silver/50 text-xs mt-0.5">
                        {{ match.date }} · {{ match.time }} · Тур {{ match.tour }}
                      </p>
                    </div>
                  </div>
                  <div
                    class="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0"
                    :class="selectedMatchId === match.id ? 'border-ska-red' : 'border-ska-silver/30'"
                  >
                    <div
                      v-if="selectedMatchId === match.id"
                      class="w-2.5 h-2.5 rounded-full bg-ska-red"
                    ></div>
                  </div>
                </div>
              </button>
            </div>
          </div>

          <!-- Шаг 2: Схема стадиона -->
          <div>
            <div class="flex items-center gap-3 mb-5">
              <div class="w-8 h-8 rounded-full bg-ska-red flex items-center justify-center
                          text-ska-white font-black text-sm">2</div>
              <h2 class="text-ska-white text-lg lg:text-xl font-bold tracking-wide uppercase">
                Выберите сектор
              </h2>
            </div>

            <div class="bg-gradient-to-br from-[#0A1425] to-[#0F2444]
                        border border-ska-blue/30 rounded-2xl p-6">
              <svg viewBox="0 0 700 500" class="w-full h-auto">

                <!-- Поле -->
                <rect x="200" y="150" width="300" height="200"
                      fill="rgba(16,185,129,0.15)" stroke="rgba(201,206,214,0.4)" stroke-width="2" />
                <!-- Центральная линия -->
                <line x1="350" y1="150" x2="350" y2="350"
                      stroke="rgba(201,206,214,0.4)" stroke-width="1.5" />
                <!-- Центральный круг -->
                <circle cx="350" cy="250" r="42"
                        fill="none" stroke="rgba(201,206,214,0.4)" stroke-width="1.5" />
                <!-- Штрафная левая -->
                <rect x="200" y="205" width="35" height="90"
                      fill="none" stroke="rgba(201,206,214,0.4)" stroke-width="1.5" />
                <!-- Штрафная правая -->
                <rect x="465" y="205" width="35" height="90"
                      fill="none" stroke="rgba(201,206,214,0.4)" stroke-width="1.5" />

                <!-- Секторы -->
                <g v-for="sector in sectors" :key="sector.id">
                  <rect
                    :x="sector.x" :y="sector.y"
                    :width="sector.w" :height="sector.h"
                    rx="6"
                    :fill="selectedSectorId === sector.id ? '#C8102E' : 'rgba(27,58,107,0.55)'"
                    :stroke="selectedSectorId === sector.id ? '#F4F6F8' : 'rgba(201,206,214,0.25)'"
                    stroke-width="2"
                    class="cursor-pointer transition-all duration-200 hover:opacity-80"
                    @click="selectSector(sector.id); vipSelected = false"
                  />
                  <text
                    :x="sector.x + sector.w / 2"
                    :y="sector.y + sector.h / 2 + 5"
                    text-anchor="middle"
                    fill="#F4F6F8"
                    font-size="14"
                    font-weight="700"
                    class="pointer-events-none select-none"
                  >
                    {{ sector.id }}
                  </text>
                </g>

                <!-- Подписи трибун -->
                <text x="350" y="40" text-anchor="middle" fill="rgba(201,206,214,0.5)"
                      font-size="11" font-weight="600" letter-spacing="2">
                  СЕВЕРНАЯ
                </text>
                <text x="350" y="475" text-anchor="middle" fill="rgba(201,206,214,0.5)"
                      font-size="11" font-weight="600" letter-spacing="2">
                  ЮЖНАЯ
                </text>
                <text x="125" y="135" text-anchor="middle" fill="rgba(201,206,214,0.5)"
                      font-size="11" font-weight="600" letter-spacing="2">
                  ЗАПАДНАЯ
                </text>
                <text x="575" y="135" text-anchor="middle" fill="rgba(201,206,214,0.5)"
                      font-size="11" font-weight="600" letter-spacing="2">
                  ВОСТОЧНАЯ
                </text>
              </svg>

              <!-- VIP -->
              <button
                @click="selectVip"
                class="w-full mt-4 py-3 rounded-xl border-2 transition-all duration-200
                       text-sm font-bold uppercase tracking-wider"
                :class="vipSelected
                  ? 'bg-ska-red border-ska-red text-ska-white shadow-lg shadow-ska-red/20'
                  : 'border-ska-blue/50 text-ska-silver hover:border-ska-silver hover:text-ska-white'"
              >
                ⭐ VIP-ложа · 1 500 ₽
              </button>
            </div>
          </div>

          <!-- Шаг 3: Категория билета -->
          <div v-if="selectedSector || vipSelected">
            <div class="flex items-center gap-3 mb-5">
              <div class="w-8 h-8 rounded-full bg-ska-red flex items-center justify-center
                          text-ska-white font-black text-sm">3</div>
              <h2 class="text-ska-white text-lg lg:text-xl font-bold tracking-wide uppercase">
                Категория билета
              </h2>
            </div>

            <!-- VIP -->
            <div v-if="vipSelected"
                 class="bg-gradient-to-br from-[#0A1425] to-[#0F2444]
                        border border-ska-red/50 rounded-xl p-5">
              <p class="text-ska-white font-bold text-base mb-2">VIP-ложа</p>
              <p class="text-ska-silver/60 text-sm">Комфортные места, бар, лучший обзор, отдельный вход</p>
              <p class="text-ska-red font-black text-2xl mt-3 tabular-nums">1 500 ₽</p>
            </div>

            <!-- Обычный сектор -->
            <div v-else-if="selectedSector" class="space-y-3">
              <button
                v-for="price in selectedSector.prices"
                :key="price.label"
                @click="selectedPriceLabel = price.label"
                class="w-full text-left bg-gradient-to-br from-[#0A1425] to-[#0F2444]
                       border rounded-xl p-4 transition-all duration-200
                       flex items-center justify-between gap-3"
                :class="selectedPriceLabel === price.label
                  ? 'border-ska-red shadow-lg shadow-ska-red/10'
                  : 'border-ska-blue/30 hover:border-ska-silver/50'"
              >
                <div class="flex items-center gap-3">
                  <div
                    class="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0"
                    :class="selectedPriceLabel === price.label ? 'border-ska-red' : 'border-ska-silver/30'"
                  >
                    <div
                      v-if="selectedPriceLabel === price.label"
                      class="w-2.5 h-2.5 rounded-full bg-ska-red"
                    ></div>
                  </div>
                  <span class="text-ska-white text-sm font-semibold">{{ price.label }}</span>
                </div>
                <span class="text-ska-red font-black text-base tabular-nums whitespace-nowrap">
                  {{ price.price }} ₽
                </span>
              </button>
            </div>
          </div>

        </div>

        <!-- Правая колонка: итог -->
        <div class="lg:col-span-1">
          <div class="sticky top-24 bg-gradient-to-br from-[#0A1425] to-[#0F2444]
                      border border-ska-blue/30 rounded-2xl p-6">

            <h3 class="text-ska-white text-lg font-bold tracking-wide uppercase mb-5 pb-4
                       border-b border-ska-blue/30">
              Ваш заказ
            </h3>

            <!-- Матч -->
            <div v-if="selectedMatch" class="mb-5">
              <p class="text-ska-silver/50 text-[10px] uppercase tracking-widest mb-1">Матч</p>
              <p class="text-ska-white text-sm font-semibold">
                {{ ourTeam.name }} — {{ selectedMatch.opponent.name }}
              </p>
              <p class="text-ska-silver/50 text-xs mt-0.5">
                {{ selectedMatch.date }} · {{ selectedMatch.time }}
              </p>
            </div>

            <!-- Сектор -->
            <div class="mb-5">
              <p class="text-ska-silver/50 text-[10px] uppercase tracking-widest mb-1">Сектор</p>
              <p v-if="selectedSector" class="text-ska-white text-sm font-semibold">
                {{ selectedSector.name }}
              </p>
              <p v-else-if="vipSelected" class="text-ska-white text-sm font-semibold">
                VIP-ложа
              </p>
              <p v-else class="text-ska-silver/40 text-sm">
                Не выбран
              </p>
            </div>

            <!-- Категория -->
            <div v-if="selectedPriceLabel" class="mb-5">
              <p class="text-ska-silver/50 text-[10px] uppercase tracking-widest mb-1">Категория</p>
              <p class="text-ska-white text-sm font-semibold">{{ selectedPriceLabel }}</p>
            </div>

            <!-- Цена за 1 -->
            <div v-if="selectedPrice > 0" class="mb-5">
              <p class="text-ska-silver/50 text-[10px] uppercase tracking-widest mb-1">Цена за билет</p>
              <p class="text-ska-white text-sm font-semibold tabular-nums">
                {{ selectedPrice }} ₽
              </p>
            </div>

            <!-- Количество -->
            <div v-if="selectedPrice > 0" class="mb-5">
              <p class="text-ska-silver/50 text-[10px] uppercase tracking-widest mb-2">Количество</p>
              <div class="flex items-center gap-3">
                <button
                  @click="quantity = Math.max(1, quantity - 1)"
                  class="w-9 h-9 rounded-md border border-ska-blue/50 hover:border-ska-silver
                         text-ska-white font-bold transition-colors"
                >
                  −
                </button>
                <span class="text-ska-white font-black text-xl tabular-nums w-8 text-center">
                  {{ quantity }}
                </span>
                <button
                  @click="quantity = Math.min(10, quantity + 1)"
                  class="w-9 h-9 rounded-md border border-ska-blue/50 hover:border-ska-silver
                         text-ska-white font-bold transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            <!-- Итого -->
            <div v-if="total > 0" class="pt-5 border-t border-ska-blue/30 mb-6">
              <div class="flex items-center justify-between">
                <span class="text-ska-silver/60 text-xs uppercase tracking-widest">Итого</span>
                <span class="text-ska-white text-2xl font-black tabular-nums">
                  {{ total }} ₽
                </span>
              </div>
            </div>

            <!-- Кнопка -->
            <button
              :disabled="total === 0"
              class="w-full py-3.5 rounded-md font-bold text-sm uppercase tracking-wider
                     transition-all shadow-lg"
              :class="total > 0
                ? 'bg-ska-red hover:bg-red-700 text-ska-white hover:scale-[1.02] shadow-ska-red/30'
                : 'bg-ska-blue/20 text-ska-silver/40 cursor-not-allowed shadow-transparent'"
            >
              Купить билеты
            </button>

            <p class="text-ska-silver/40 text-[11px] text-center mt-4 leading-relaxed">
              Демо-версия. Реальная покупка появится позже.
            </p>

          </div>
        </div>

      </div>

    </section>
  </div>
</template>