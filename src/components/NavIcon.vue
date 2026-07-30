<script setup lang="ts">
import type { NavItem } from '@/types'

defineProps<{ icon: NavItem['icon'] }>()
</script>

<template>
  <svg
    v-if="icon === 'home'"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.75"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <path d="M3 11.5 12 4l9 7.5" />
    <path d="M5.5 10v9a1 1 0 0 0 1 1H10v-5.5h4V20h3.5a1 1 0 0 0 1-1v-9" />
  </svg>

  <svg
    v-else-if="icon === 'user'"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.75"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <circle cx="12" cy="8" r="3.5" />
    <path d="M5 20c1.2-3.6 4-5.5 7-5.5s5.8 1.9 7 5.5" />
  </svg>

  <svg
    v-else-if="icon === 'briefcase'"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.75"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <rect x="3.5" y="7.5" width="17" height="12" rx="2" />
    <path d="M8.5 7.5V6a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v1.5" />
    <path d="M3.5 12.5h17" />
  </svg>

  <svg
    v-else-if="icon === 'graduation'"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.75"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <path d="M2.5 9 12 4.5 21.5 9 12 13.5 2.5 9Z" />
    <path d="M6 11v4.5c0 1.2 2.7 2.5 6 2.5s6-1.3 6-2.5V11" />
  </svg>

  <svg
    v-else-if="icon === 'mail'"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.75"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <rect x="3" y="5.5" width="18" height="13" rx="2" />
    <path d="M3.5 6.5 12 13l8.5-6.5" />
  </svg>
</template>
