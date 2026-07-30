<script setup lang="ts">
import IconGlyph from './IconGlyph.vue'
import type { ContactInfoItem } from '@/types'

defineProps<{ items: ContactInfoItem[] }>()
</script>

<template>
  <ul class="grid gap-3 sm:grid-cols-2">
    <li
      v-for="item in items"
      :key="item.id"
      class="flex items-center gap-3 rounded-xl p-3"
      style="border: 1px solid var(--border)"
    >
      <span
        class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
        style="background: var(--surface-raised); color: var(--accent-pink-light)"
      >
        <IconGlyph :icon="item.icon" class="h-4 w-4" />
      </span>
      <span class="text-sm font-medium" style="color: var(--text-primary)">{{ item.text }}</span>
    </li>
  </ul>
</template>
