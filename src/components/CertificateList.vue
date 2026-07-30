<script setup lang="ts">
import type { Certificate } from '@/types'

defineProps<{ certificates: Certificate[] }>()

function hideOnError(event: Event) {
  const target = event.target as HTMLImageElement
  target.style.visibility = 'hidden'
}
</script>

<template>
  <div class="grid gap-4 sm:grid-cols-2">
    <div v-for="cert in certificates" :key="cert.id" class="card-surface flex items-center gap-4 p-5">
      <img
        v-if="cert.logo"
        :src="cert.logo"
        :alt="cert.title"
        class="h-10 w-10 shrink-0 rounded-lg object-contain"
        style="background: var(--surface-raised)"
        loading="lazy"
        @error="hideOnError"
      />
      <div class="min-w-0">
        <p class="truncate text-sm font-semibold" style="color: var(--text-primary)">{{ cert.title }}</p>
        <p class="text-sm" style="color: var(--text-secondary)">{{ cert.course }}</p>
        <p class="font-mono text-xs" style="color: var(--text-muted)">{{ cert.date }}</p>
      </div>
    </div>
  </div>
</template>
