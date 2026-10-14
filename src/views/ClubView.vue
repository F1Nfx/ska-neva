<script setup lang="ts">
type Milestone = {
  year: string
  title: string
  description: string
}

type Executive = {
  name: string
  role: string
  initials: string
}

const history: Milestone[] = [
  {
    year: '1946',
    title: 'Основание клуба',
    description: 'После Великой Отечественной войны моряки Балтийского флота основали команду в Колпино. Первые матчи проходили на пустыре у Ижорского завода.',
  },
  {
    year: '1957',
    title: 'Первый крупный успех',
    description: 'Победа в Кубке Ленинграда среди команд воинских частей. Состав той эпохи до сих пор называют «золотым поколением» в истории клуба.',
  },
  {
    year: '1974',
    title: 'Эпоха расцвета',
    description: 'Команда выходит в первенство Ленинградской области и стабильно держится в верхней части таблицы на протяжении десяти лет.',
  },
  {
    year: '1993',
    title: 'Тяжёлые времена',
    description: 'Финансовый кризис в стране едва не привёл к роспуску клуба. Команда потеряла профессиональный статус и играла в городских турнирах.',
  },
  {
    year: '2015',
    title: 'Возрождение',
    description: 'При поддержке «Балтийской Верфи» клуб получил второе дыхание, вернулся в структуру профессионального футбола и начал строить академию.',
  },
  {
    year: '2021',
    title: 'Выход в ФНЛ-3',
    description: 'Победа в первенстве ЛФЛ позволила команде занять место в третьем по силе дивизионе России. Дебютный сезон — 8-е место.',
  },
  {
    year: '2025/26',
    title: 'Наши дни',
    description: 'Молодая амбициозная команда борется за выход в ФНЛ-2. Средний возраст состава — 24 года. Ставка на воспитанников собственной академии.',
  },
]

const executives: Executive[] = [
  { name: 'Матвей Тарковский', role: 'Президент клуба', initials: 'МТ' },
  { name: 'Данил Кирилин', role: 'Спортивный директор', initials: 'ДК' },
  { name: 'Диментий Диментьев', role: 'Главный Тренер', initials: 'ДД' },
  { name: 'Рига Дмитрович', role: 'Старший тренер', initials: 'РД' },
]
</script>

<template>
  <div class="bg-ska-navy min-h-screen">

    <!-- Hero-секция -->
    <section class="relative overflow-hidden border-b border-ska-blue/30
                    bg-gradient-to-br from-ska-navy via-[#0F2444] to-[#1B3A6B]">
      <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(200,16,46,0.15),_transparent_60%)]"></div>

      <div class="relative max-w-7xl mx-auto px-6 py-16 lg:py-20">
        <div class="flex flex-col items-center text-center">
          <span class="px-3 py-1 mb-6 rounded-full
                       bg-ska-red/20 border border-ska-red/50
                       text-ska-red text-xs font-semibold tracking-[0.25em] uppercase">
            С 1946 года
          </span>

          <h1 class="text-ska-white text-4xl lg:text-6xl font-black tracking-wide uppercase mb-4">
            О клубе
          </h1>

          <p class="text-ska-silver text-base lg:text-lg max-w-2xl leading-relaxed">
            Профессиональный футбольный клуб «СКА-Нева» — команда из Колпино,
            представляющая Санкт-Петербург в ФНЛ-3. Молодой состав, амбициозные цели
            и верность традициям балтийских моряков.
          </p>

          <div class="flex flex-wrap items-center justify-center gap-3 mt-8">
            <span class="px-4 py-2 bg-ska-navy/60 border border-ska-blue/50 rounded-lg
                         text-ska-silver text-sm tracking-wider">
              Порядок · Честь · Нева
            </span>
            <span class="px-4 py-2 bg-ska-red rounded-lg
                         text-ska-white text-sm font-bold tracking-wider uppercase">
              Курс - на победу
            </span>
          </div>
        </div>
      </div>
    </section>

    <!-- Цифры -->
    <section class="max-w-7xl mx-auto px-6 py-12">
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
      </div>
    </section>

    <!-- История -->
    <section class="max-w-7xl mx-auto px-6 py-12">
      <div class="flex items-center gap-3 mb-10">
        <div class="w-1 h-8 bg-ska-red rounded"></div>
        <div>
          <h2 class="text-ska-white text-2xl lg:text-3xl font-bold tracking-wide uppercase">
            История клуба
          </h2>
          <p class="text-ska-silver/60 text-sm mt-1">
            80 лет пути — от пустыря у Ижорского завода до ФНЛ-3
          </p>
        </div>
      </div>

      <div class="relative">
        <!-- Вертикальная линия таймлайна -->
        <div class="absolute left-4 lg:left-24 top-0 bottom-0 w-px bg-ska-blue/40"></div>

        <div class="space-y-8">
          <div
            v-for="(event, index) in history"
            :key="event.year"
            class="relative pl-12 lg:pl-40"
          >
            <!-- Год (десктоп) -->
            <div class="hidden lg:block absolute left-0 top-1 w-20 text-right">
              <span class="text-ska-red font-black text-2xl tabular-nums">
                {{ event.year }}
              </span>
            </div>

            <!-- Точка на линии -->
            <div
              class="absolute left-4 lg:left-24 top-2 w-4 h-4 -translate-x-1/2 rounded-full
                     bg-ska-navy border-2 border-ska-red"
              :class="index === history.length - 1 && 'bg-ska-red'"
            ></div>

            <!-- Карточка -->
            <div class="bg-gradient-to-br from-[#0A1425] to-[#0F2444]
                        border border-ska-blue/30 rounded-xl p-5
                        hover:border-ska-red/40 transition-colors">
              <div class="flex items-baseline gap-3 mb-2">
                <span class="lg:hidden text-ska-red font-black text-lg tabular-nums">
                  {{ event.year }}
                </span>
                <h3 class="text-ska-white font-bold text-lg">
                  {{ event.title }}
                </h3>
              </div>
              <p class="text-ska-silver/70 text-sm leading-relaxed">
                {{ event.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Стадион -->
    <section class="max-w-7xl mx-auto px-6 py-12">
      <div class="flex items-center gap-3 mb-10">
        <div class="w-1 h-8 bg-ska-red rounded"></div>
        <div>
          <h2 class="text-ska-white text-2xl lg:text-3xl font-bold tracking-wide uppercase">
            Стадион
          </h2>
          <p class="text-ska-silver/60 text-sm mt-1">
            Домашняя арена клуба
          </p>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <!-- Визуал стадиона -->
        <div class="relative aspect-[4/3] rounded-2xl overflow-hidden
                    bg-gradient-to-br from-[#0F2444] via-ska-navy to-[#0A1425]
                    border border-ska-blue/40">

          <!-- Сетка -->
          <div class="absolute inset-0 opacity-[0.06]"
               style="background-image: radial-gradient(circle, #fff 1px, transparent 1px); background-size: 22px 22px;"></div>

          <!-- Стилизованное поле -->
          <div class="absolute inset-0 flex items-center justify-center p-8">
            <div class="relative w-full h-full max-w-md">
              <!-- Поле -->
              <div class="absolute inset-0 border-2 border-ska-silver/40 rounded-sm
                          bg-gradient-to-b from-emerald-900/30 to-emerald-950/20"></div>
              <!-- Центральный круг -->
              <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                          w-24 h-24 border-2 border-ska-silver/40 rounded-full"></div>
              <!-- Центральная линия -->
              <div class="absolute top-0 bottom-0 left-1/2 w-px bg-ska-silver/40"></div>
              <!-- Вратарские -->
              <div class="absolute top-1/3 bottom-1/3 left-0 w-10 border-y-2 border-r-2 border-ska-silver/40"></div>
              <div class="absolute top-1/3 bottom-1/3 right-0 w-10 border-y-2 border-l-2 border-ska-silver/40"></div>
            </div>
          </div>

          <!-- Красное свечение -->
          <div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(200,16,46,0.15),_transparent_70%)]"></div>

          <!-- Подпись -->
          <div class="absolute bottom-6 left-6">
            <p class="text-ska-white text-2xl font-black tracking-wide uppercase">
              «Нева-Арена»
            </p>
            <p class="text-ska-silver/60 text-sm mt-1">
              Колпино, Санкт-Петербург
            </p>
          </div>
        </div>

        <!-- Инфо о стадионе -->
        <div class="space-y-4">
          <div class="bg-gradient-to-br from-[#0A1425] to-[#0F2444]
                      border border-ska-blue/30 rounded-xl p-6">
            <p class="text-ska-silver/60 text-xs uppercase tracking-widest mb-2">
              Вместимость
            </p>
            <p class="text-ska-white text-3xl font-black tabular-nums">
              5 500 <span class="text-ska-silver/60 text-base font-normal">мест</span>
            </p>
          </div>

          <div class="bg-gradient-to-br from-[#0A1425] to-[#0F2444]
                      border border-ska-blue/30 rounded-xl p-6">
            <p class="text-ska-silver/60 text-xs uppercase tracking-widest mb-2">
              Открыт
            </p>
            <p class="text-ska-white text-3xl font-black tabular-nums">
              2017 <span class="text-ska-silver/60 text-base font-normal">год</span>
            </p>
          </div>

          <div class="bg-gradient-to-br from-[#0A1425] to-[#0F2444]
                      border border-ska-blue/30 rounded-xl p-6">
            <p class="text-ska-silver/60 text-xs uppercase tracking-widest mb-3">
              Инфраструктура
            </p>
            <ul class="space-y-2 text-sm text-ska-silver">
              <li class="flex items-start gap-2">
                <span class="text-ska-red mt-0.5">•</span>
                <span>Натуральное поле с подогревом</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-ska-red mt-0.5">•</span>
                <span>Крытая трибуна «Кронштадтская»</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-ska-red mt-0.5">•</span>
                <span>Тренировочная база и академия</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-ska-red mt-0.5">•</span>
                <span>Музей клуба и фан-зона</span>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </section>

    <!-- Руководство -->
    <section class="max-w-7xl mx-auto px-6 py-12">
      <div class="flex items-center gap-3 mb-10">
        <div class="w-1 h-8 bg-ska-red rounded"></div>
        <div>
          <h2 class="text-ska-white text-2xl lg:text-3xl font-bold tracking-wide uppercase">
            Руководство
          </h2>
          <p class="text-ska-silver/60 text-sm mt-1">
            Люди, которые ведут клуб вперёд
          </p>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <div
          v-for="person in executives"
          :key="person.name"
          class="bg-gradient-to-br from-[#0A1425] to-[#0F2444]
                 border border-ska-blue/30 rounded-xl p-6
                 hover:border-ska-red/40 hover:-translate-y-1 transition-all duration-300"
        >
          <div class="w-16 h-16 rounded-full bg-gradient-to-br from-ska-red to-ska-blue
                      flex items-center justify-center border-2 border-ska-silver mb-4">
            <span class="text-ska-white text-xl font-black">
              {{ person.initials }}
            </span>
          </div>
          <p class="text-ska-white font-bold text-base">
            {{ person.name }}
          </p>
          <p class="text-ska-red text-xs uppercase tracking-wider font-semibold mt-1">
            {{ person.role }}
          </p>
        </div>
      </div>
    </section>

    <!-- Достижения -->
    <section class="max-w-7xl mx-auto px-6 py-12 pb-20">
      <div class="flex items-center gap-3 mb-10">
        <div class="w-1 h-8 bg-ska-red rounded"></div>
        <div>
          <h2 class="text-ska-white text-2xl lg:text-3xl font-bold tracking-wide uppercase">
            Достижения
          </h2>
          <p class="text-ska-silver/60 text-sm mt-1">
            Главные трофеи в истории клуба
          </p>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

        <div class="bg-gradient-to-br from-[#0A1425] to-[#0F2444]
                    border border-ska-blue/30 rounded-xl p-6
                    hover:border-ska-red/40 transition-colors">
          <div class="text-4xl mb-3">🏆</div>
          <p class="text-ska-white font-bold text-base mb-1">Кубок Ленинграда</p>
          <p class="text-ska-silver/60 text-sm">1957, 1962, 1968</p>
        </div>

        <div class="bg-gradient-to-br from-[#0A1425] to-[#0F2444]
                    border border-ska-blue/30 rounded-xl p-6
                    hover:border-ska-red/40 transition-colors">
          <div class="text-4xl mb-3">🥇</div>
          <p class="text-ska-white font-bold text-base mb-1">Первенство ЛФЛ</p>
          <p class="text-ska-silver/60 text-sm">2021</p>
        </div>

        <div class="bg-gradient-to-br from-[#0A1425] to-[#0F2444]
                    border border-ska-blue/30 rounded-xl p-6
                    hover:border-ska-red/40 transition-colors">
          <div class="text-4xl mb-3">🥈</div>
          <p class="text-ska-white font-bold text-base mb-1">Серебряные призеры ФНЛ-3</p>
          <p class="text-ska-silver/60 text-sm">2025/26</p>
        </div>

        <div class="bg-gradient-to-br from-[#0A1425] to-[#0F2444]
                    border border-ska-blue/30 rounded-xl p-6
                    hover:border-ska-red/40 transition-colors">
          <div class="text-4xl mb-3">⭐</div>
          <p class="text-ska-white font-bold text-base mb-1">Победители Ленинградского первенства</p>
          <p class="text-ska-silver/60 text-sm">2019, 2023</p>
        </div>

      </div>
    </section>

  </div>
</template>