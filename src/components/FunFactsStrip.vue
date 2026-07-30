<script setup lang="ts">
import IconGlyph from './IconGlyph.vue'
import type { FunFact } from '@/types'

defineProps<{ facts: FunFact[] }>()
</script>

<template>
  <div class="grid grid-cols-3 gap-4">
    <div
      v-for="fact in facts"
      :key="fact.id"
      class="card-surface flex flex-col items-center gap-2 p-5 text-center"
    >
      <IconGlyph :icon="fact.icon" class="h-5 w-5" style="color: var(--accent-pink-light)" />
      <p class="font-display text-2xl font-bold sm:text-3xl" style="color: var(--text-primary)">
        {{ fact.value }}
      </p>
      <p class="eyebrow">{{ fact.label }}</p>
    </div>
  </div>
</template>
