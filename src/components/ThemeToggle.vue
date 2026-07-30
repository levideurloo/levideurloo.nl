<script setup lang="ts">
import { useTheme } from '@/composables/useTheme'

const { theme, toggleTheme } = useTheme()
</script>

<template>
  <button
    type="button"
    class="group relative flex h-11 w-11 items-center justify-center rounded-full border transition-colors"
    style="border-color: var(--border); background: var(--surface-raised)"
    :aria-label="theme === 'dark' ? 'Schakel naar lichte modus' : 'Schakel naar donkere modus'"
    @click="toggleTheme"
  >
    <svg
      v-if="theme === 'dark'"
      viewBox="0 0 24 24"
      fill="none"
      stroke="var(--accent-pink-light)"
      stroke-width="1.75"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="h-5 w-5 transition-transform duration-300 group-hover:-rotate-12"
    >
      <path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5Z" />
    </svg>
    <svg
      v-else
      viewBox="0 0 24 24"
      fill="none"
      stroke="var(--accent-pink)"
      stroke-width="1.75"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="h-5 w-5 transition-transform duration-300 group-hover:rotate-45"
    >
      <circle cx="12" cy="12" r="4.2" />
      <path d="M12 2.5v2M12 19.5v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M2.5 12h2M19.5 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
    </svg>
  </button>
</template>
