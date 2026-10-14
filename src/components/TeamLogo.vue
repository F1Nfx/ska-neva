<script setup lang="ts">
type Team = {
  name: string
  short: string
  color: string
  isOurTeam?: boolean
}

const props = withDefaults(defineProps<{
  team: Team
  size?: 'sm' | 'md' | 'lg' | 'xl'
}>(), {
  size: 'md',
})

const sizeClasses = {
  sm: 'w-9 h-9 lg:w-10 lg:h-10 text-[10px] lg:text-xs',
  md: 'w-16 h-16 text-[11px]',
  lg: 'w-16 h-16 lg:w-38 lg:h-38 text-base lg:text-lg',
  xl: 'w-20 h-20 lg:w-64 lg:h-64 text-2xl lg:text-3xl',
}

const sizeClass = sizeClasses[props.size]
const imgSizeClass = sizeClass.split(' ').filter((c) => !c.includes('text-')).join(' ')
</script>

<template>
  <img
    v-if="team.isOurTeam"
    src="/logo-full.png"
    :alt="team.name"
    class="object-contain"
    :class="imgSizeClass"
  />

  <div
    v-else
    class="rounded-full flex items-center justify-center border-2 flex-shrink-0
           border-ska-silver/30 bg-gradient-to-br"
    :class="[sizeClass, team.color]"
  >
    <span class="text-ska-white font-black">{{ team.short }}</span>
  </div>
</template>