<script setup lang="ts">
import type { Project } from '@/types'

defineProps<{ project: Project }>()

function hideOnError(event: Event) {
  const target = event.target as HTMLImageElement
  target.style.display = 'none'
}
</script>

<template>
  <article class="card-surface group relative flex h-full flex-col overflow-hidden transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-glow">
    <div
      class="absolute inset-x-6 top-0 z-10 h-px origin-left scale-x-0 rounded-full bg-gradient-to-r from-[var(--accent-teal)] via-[var(--accent-violet)] to-[var(--accent-pink)] transition-transform duration-300 ease-out group-hover:scale-x-100"
      aria-hidden="true"
    />

    <div
      v-if="project.image"
      class="aspect-[16/10] w-full overflow-hidden"
      style="background: var(--surface-raised)"
    >
      <img
        :src="project.image"
        :alt="project.title"
        class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
        @error="hideOnError"
      />
    </div>

    <div class="flex flex-1 flex-col gap-3 p-6">
      <h3 class="text-xl font-semibold" style="color: var(--text-primary)">{{ project.title }}</h3>
      <p class="text-sm leading-relaxed" style="color: var(--text-secondary)">
        {{ project.description }}
      </p>
    </div>
  </article>
</template>
