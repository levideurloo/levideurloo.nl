<script setup lang="ts">
defineProps<{ label: string }>()
</script>

<template>
  <span
    class="inline-flex items-center rounded-full px-3 py-1 font-mono text-[0.7rem] tracking-wide"
    style="background: var(--surface-raised); color: var(--text-secondary); border: 1px solid var(--border)"
  >
    {{ label }}
  </span>
</template>
