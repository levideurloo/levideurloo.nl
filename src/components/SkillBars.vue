<script setup lang="ts">
import type { SkillLevel } from '@/types'

defineProps<{ skills: SkillLevel[] }>()
</script>

<template>
  <div class="space-y-5">
    <div v-for="skill in skills" :key="skill.id">
      <div class="mb-1.5 flex items-baseline justify-between text-sm">
        <span class="font-medium" style="color: var(--text-primary)">{{ skill.name }}</span>
        <span class="font-mono text-xs" style="color: var(--text-muted)">
          {{ skill.percentage }}% · {{ skill.years }} jaar
        </span>
      </div>
      <div class="h-1.5 overflow-hidden rounded-full" style="background: var(--surface-raised)">
        <div
          class="h-full rounded-full bg-gradient-to-r from-[var(--accent-teal)] via-[var(--accent-violet)] to-[var(--accent-pink)]"
          :style="{ width: `${Math.min(skill.percentage, 100)}%` }"
        />
      </div>
    </div>
  </div>
</template>
