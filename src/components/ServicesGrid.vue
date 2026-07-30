<script setup lang="ts">
import IconGlyph from './IconGlyph.vue'
import type { ServiceItem } from '@/types'

defineProps<{ services: ServiceItem[] }>()
</script>

<template>
  <div class="grid gap-5 sm:grid-cols-2">
    <div v-for="service in services" :key="service.id" class="card-surface flex gap-4 p-6">
      <span
        class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full"
        style="background: var(--surface-raised); color: var(--accent-pink-light)"
      >
        <IconGlyph :icon="service.icon" class="h-5 w-5" />
      </span>
      <div>
        <h3 class="text-base font-semibold" style="color: var(--text-primary)">{{ service.title }}</h3>
        <p class="mt-1.5 text-sm leading-relaxed" style="color: var(--text-secondary)">
          {{ service.description }}
        </p>
      </div>
    </div>
  </div>
</template>
