<script setup lang="ts">
import type { ExperienceEntry } from '@/types'

defineProps<{ entry: ExperienceEntry; isLast: boolean }>()
</script>

<template>
  <div class="relative flex gap-5 pb-10 last:pb-0">
    <div class="flex flex-col items-center">
      <span class="mt-1.5 h-3 w-3 shrink-0 rounded-full bg-gradient-to-br from-[var(--accent-teal)] via-[var(--accent-violet)] to-[var(--accent-pink)]" />
      <span v-if="!isLast" class="mt-1 w-px flex-1" style="background: var(--border-strong)" />
    </div>

    <div class="min-w-0 flex-1">
      <p class="eyebrow mb-1">{{ entry.year }}</p>
      <h3 class="text-lg font-semibold" style="color: var(--text-primary)">{{ entry.organisation }}</h3>
      <p class="text-sm font-medium" style="color: var(--text-secondary)">{{ entry.role }}</p>
      <p class="mt-2 text-sm leading-relaxed" style="color: var(--text-secondary)">
        {{ entry.description }}
      </p>
    </div>
  </div>
</template>
