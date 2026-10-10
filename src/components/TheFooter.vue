<script setup lang="ts">
import { RouterLink } from 'vue-router'

const clubLinks = [
  { name: 'История клуба', path: '/club' },
  { name: 'Стадион', path: '/club' },
  { name: 'Руководство', path: '/club' },
  { name: 'Академия', path: '/club' },
]

const fanLinks = [
  { name: 'Новости', path: '/news' },
  { name: 'Матчи', path: '/matches' },
  { name: 'Команда', path: '/team' },
  { name: 'Билеты', path: '/tickets' },
]

const socials = [
  { name: 'VK', url: '#' },
  { name: 'Telegram', url: '#' },
  { name: 'YouTube', url: '#' },
]
</script>

<template>
  <footer class="bg-[#060F1C] border-t border-ska-blue/30 mt-auto">
    <div class="max-w-7xl mx-auto px-6 py-12">

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

        <div>
          <div class="flex items-center gap-3 mb-4">
            <div class="w-12 h-12 rounded-full bg-gradient-to-br from-ska-red to-ska-blue
                        flex items-center justify-center border-2 border-ska-silver">
              <span class="text-ska-white text-sm font-black">СКА</span>
            </div>
            <div class="flex flex-col leading-none">
              <span class="text-ska-white text-base font-bold tracking-wider">СКА-НЕВА</span>
              <span class="text-ska-silver text-[10px] tracking-[0.25em] uppercase">Санкт-Петербург</span>
            </div>
          </div>
          <p class="text-ska-silver text-sm leading-relaxed mb-4">
            Профессиональный футбольный клуб. "Основан" в 1946 году.
          </p>
          <p class="text-ska-silver/60 text-xs">
            Порядок, Честь, Нева.
          </p>
        </div>

        <div>
          <h3 class="text-ska-white font-bold text-sm uppercase tracking-wider mb-4">
            Клуб
          </h3>
          <ul class="space-y-2.5">
            <li v-for="link in clubLinks" :key="link.name">
              <RouterLink
                :to="link.path"
                class="text-ska-silver text-sm hover:text-ska-red transition-colors"
              >
                {{ link.name }}
              </RouterLink>
            </li>
          </ul>
        </div>

        <div>
          <h3 class="text-ska-white font-bold text-sm uppercase tracking-wider mb-4">
            Болельщикам
          </h3>
          <ul class="space-y-2.5">
            <li v-for="link in fanLinks" :key="link.name">
              <RouterLink
                :to="link.path"
                class="text-ska-silver text-sm hover:text-ska-red transition-colors"
              >
                {{ link.name }}
              </RouterLink>
            </li>
          </ul>
        </div>

        <div>
          <h3 class="text-ska-white font-bold text-sm uppercase tracking-wider mb-4">
            Контакты
          </h3>
          <ul class="space-y-2.5 mb-6 text-sm">
            <li class="text-ska-silver">
              <span class="block text-ska-silver/60 text-xs uppercase tracking-wider mb-1">Стадион</span>
              «Нева-Арена», Санкт-Петербург
            </li>
            <li class="text-ska-silver">
              <span class="block text-ska-silver/60 text-xs uppercase tracking-wider mb-1">Email</span>
              info@ska-neva.ru
            </li>
            <li class="text-ska-silver">
              <span class="block text-ska-silver/60 text-xs uppercase tracking-wider mb-1">Телефон</span>
              +7 (812) 000-19-46
            </li>
          </ul>

          <div class="flex flex-wrap gap-2">
            <a
              v-for="social in socials"
              :key="social.name"
              :href="social.url"
              class="px-3 py-1.5 text-xs font-medium text-ska-silver
                     border border-ska-blue/50 rounded-md
                     hover:bg-ska-red hover:text-ska-white hover:border-ska-red
                     transition-colors"
            >
              {{ social.name }}
            </a>
          </div>
        </div>

      </div>

      <div class="border-t border-ska-blue/30 mt-10 pt-6
                  flex flex-col md:flex-row items-center justify-between gap-4">
        <p class="text-ska-silver/60 text-xs text-center md:text-left">
          © Сайт создан в учебных целях, все сходства с реальными личностями, организациями и т.п. случайны
        </p>
        <div class="flex items-center gap-4 text-xs text-ska-silver/60">
          <a href="#" class="hover:text-ska-silver transition-colors">Политика конфиденциальности</a>
          <span class="text-ska-blue/50">•</span>
          <a href="#" class="hover:text-ska-silver transition-colors">Использование cookies</a>
        </div>
      </div>

    </div>
  </footer>
</template>