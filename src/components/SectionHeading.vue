<script setup lang="ts">
defineProps<{
  eyebrow: string
  title: string
  accent?: string
}>()
</script>

<template>
  <div class="mb-10 max-w-2xl md:mb-14">
    <p class="eyebrow mb-3">{{ eyebrow }}</p>
    <h2 class="text-3xl font-bold leading-tight sm:text-4xl">
      {{ title }}
      <span v-if="accent" class="text-gradient">{{ accent }}</span>
    </h2>
  </div>
</template>
