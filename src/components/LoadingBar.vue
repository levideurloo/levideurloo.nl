<script setup lang="ts">
import { usePortfolioData } from '@/composables/usePortfolioData'

const { isLoading } = usePortfolioData()
</script>

<template>
  <Transition enter-active-class="transition duration-200" enter-from-class="opacity-0" leave-active-class="transition duration-300" leave-to-class="opacity-0">
    <div v-if="isLoading" class="fixed inset-x-0 top-0 z-[60] h-[2px] overflow-hidden" aria-hidden="true">
      <div class="h-full w-1/3 animate-[loading-sweep_1.1s_ease-in-out_infinite] bg-gradient-to-r from-[var(--accent-teal)] via-[var(--accent-violet)] to-[var(--accent-pink)]" />
    </div>
  </Transition>
</template>

<style scoped>
@keyframes loading-sweep {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(300%); }
}
</style>
