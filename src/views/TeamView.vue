<script setup lang="ts">
type Position = 'Вратарь' | 'Защитник' | 'Полузащитник' | 'Нападающий'

type Player = {
  number: number
  name: string
  position: Position
  age: number
  height: number
  isCaptain?: boolean
}

type Staff = {
  name: string
  role: string
  age: number
}

const staff: Staff[] = [
  { name: 'Виктор Шторм', role: 'Главный тренер', age: 52 },
  { name: 'Андрей Крылов', role: 'Старший тренер', age: 47 },
  { name: 'Олег Щербаков', role: 'Тренер вратарей', age: 43 },
  { name: 'Павел Дементьев', role: 'Тренер по физподготовке', age: 38 },
]

const goalkeepers: Player[] = [
  { number: 1, name: 'Артём Белов', position: 'Вратарь', age: 28, height: 190 },
  { number: 12, name: 'Никита Крайнов', position: 'Вратарь', age: 22, height: 187 },
  { number: 35, name: 'Максим Ветров', position: 'Вратарь', age: 19, height: 185 },
]

const defenders: Player[] = [
  { number: 4, name: 'Матвей Лукальдини', position: 'Защитник', age: 20, height: 188, isCaptain: true },
  { number: 2, name: 'Даниил Творогов', position: 'Защитник', age: 26, height: 182 },
  { number: 3, name: 'Игорь Невский', position: 'Защитник', age: 24, height: 185 },
  { number: 5, name: 'Роман Волков', position: 'Защитник', age: 27, height: 186 },
  { number: 6, name: 'Сергей Березуцкий', position: 'Защитник', age: 23, height: 180 },
  { number: 13, name: 'Кирилл Зайцев', position: 'Защитник', age: 25, height: 184 },
  { number: 22, name: 'Владислав Орлов', position: 'Защитник', age: 21, height: 179 },
  { number: 44, name: 'Степан Давиташвили', position: 'Защитник', age: 20, height: 183 },
]

const midfielders: Player[] = [
  { number: 8, name: 'Никита Иванов', position: 'Полузащитник', age: 25, height: 178 },
  { number: 10, name: 'Максим Кузнецов', position: 'Полузащитник', age: 28, height: 176 },
  { number: 7, name: 'Антон Смирнов', position: 'Полузащитник', age: 23, height: 180 },
  { number: 14, name: 'Дмитрий Бут', position: 'Полузащитник', age: 26, height: 175 },
  { number: 17, name: 'Александр Соловьёв', position: 'Полузащитник', age: 22, height: 177 },
  { number: 20, name: 'Павел Фомин', position: 'Полузащитник', age: 24, height: 179 },
]

const forwards: Player[] = [
  { number: 9, name: 'Алексей Соколов', position: 'Нападающий', age: 27, height: 185 },
  { number: 11, name: 'Иван Петров', position: 'Нападающий', age: 24, height: 182 },
  { number: 19, name: 'Сергей Лебедев', position: 'Нападающий', age: 29, height: 187 },
  { number: 77, name: 'Василий Баронов', position: 'Нападающий', age: 21, height: 181 },
  { number: 99, name: 'Дмитрий Снегов', position: 'Нападающий', age: 20, height: 184 },
]

const groups: { title: string; players: Player[] }[] = [
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
            :key="person.name"
            class="group bg-gradient-to-br from-[#0A1425] to-[#0F2444]
                   border border-ska-blue/30 rounded-xl overflow-hidden
                   hover:border-ska-red/60 transition-all duration-300
                   hover:-translate-y-1 hover:shadow-xl hover:shadow-ska-red/10"
          >

            <!-- Фото-зона -->
            <div class="relative aspect-[3/4] overflow-hidden
                        bg-gradient-to-b from-ska-blue/40 via-ska-navy to-ska-navy">

              <div class="absolute inset-0 opacity-[0.07]"
                   style="background-image: radial-gradient(circle, #fff 1px, transparent 1px); background-size: 18px 18px;"></div>

              <!-- Силуэт тренера -->
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

            <!-- Инфо -->
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
          <div
            v-for="player in group.players"
            :key="player.number"
            class="group bg-gradient-to-br from-[#0A1425] to-[#0F2444]
                   border border-ska-blue/30 rounded-xl overflow-hidden
                   hover:border-ska-red/60 transition-all duration-300
                   hover:-translate-y-1 hover:shadow-xl hover:shadow-ska-red/10"
          >

            <!-- Фото-зона -->
            <div class="relative aspect-[3/4] overflow-hidden
                        bg-gradient-to-b from-ska-blue/40 via-ska-navy to-ska-navy">

              <div class="absolute inset-0 opacity-[0.07]"
                   style="background-image: radial-gradient(circle, #fff 1px, transparent 1px); background-size: 18px 18px;"></div>

              <!-- Силуэт игрока -->
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

              <!-- Капитан -->
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

            <!-- Инфо -->
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

          </div>
        </div>
      </div>

    </section>
  </div>
</template>