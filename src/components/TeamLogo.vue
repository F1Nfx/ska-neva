<script setup lang="ts">
type Team = {
  name: string
  short: string
  color: string
  isOurTeam?: boolean
  logoUrl?: string | null
}

const props = withDefaults(defineProps<{
  team: Team
  size?: 'sm' | 'md' | 'lg' | 'xl'
}>(), {
  size: 'md',
})

const sizeClasses = {
  sm: 'w-20 h-20 lg:w-22 lg:h-22 text-[11px] lg:text-xs',
  md: 'w-28 h-28 text-sm',
  lg: 'w-32 h-32 lg:w-36 lg:h-36 text-base lg:text-lg',
  xl: 'w-48 h-48 lg:w-52 lg:h-52 text-2xl lg:text-3xl',
}

const sizeClass = sizeClasses[props.size]
const imgSizeClass = sizeClass.split(' ').filter((c) => !c.includes('text-')).join(' ')
</script>

<template>
  <!-- 1. НАША КОМАНДА: Всегда используем большой логотип logo-full.png -->
  <img
    v-if="team.isOurTeam"
    src="/logo-full.png"
    :alt="team.name"
    class="object-contain"
    :class="imgSizeClass"
  />

  <!-- 2. СОПЕРНИКИ: Используем логотип из базы (если он там есть) -->
  <img
    v-else-if="team.logoUrl"
    :src="team.logoUrl"
    :alt="team.name"
    class="object-contain drop-shadow-md"
    :class="imgSizeClass"
  />

  <!-- 3. Если логотипа нет (заглушка в виде цветного кружка) -->
  <div
    v-else
    class="rounded-full flex items-center justify-center border-2 flex-shrink-0
           border-ska-silver/30 bg-gradient-to-br"
    :class="[sizeClass, team.color]"
  >
    <span class="text-ska-white font-black">{{ team.short }}</span>
  </div>
</template>