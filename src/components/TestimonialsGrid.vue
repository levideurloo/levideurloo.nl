<script setup lang="ts">
import type { Testimonial } from '@/types'

defineProps<{ testimonials: Testimonial[] }>()

function initialsOf(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join('')
}
</script>

<template>
  <div class="grid gap-5 sm:grid-cols-2">
    <blockquote v-for="t in testimonials" :key="t.id" class="card-surface flex flex-col gap-4 p-6">
      <p class="text-sm leading-relaxed" style="color: var(--text-secondary)">&ldquo;{{ t.quote }}&rdquo;</p>
      <footer class="mt-auto flex items-center gap-3">
        <span
          class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[var(--accent-teal)] via-[var(--accent-violet)] to-[var(--accent-pink)] text-xs font-semibold text-white"
        >
          {{ initialsOf(t.name) }}
        </span>
        <div class="text-sm">
          <p class="font-medium" style="color: var(--text-primary)">{{ t.name }}</p>
          <p style="color: var(--text-muted)">{{ t.company }}</p>
        </div>
      </footer>
    </blockquote>
  </div>
</template>
