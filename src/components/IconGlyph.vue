<script setup lang="ts">
defineProps<{ icon: string }>()
</script>

<template>
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
    <path v-if="icon === 'cloud'" d="M7 18h10a4 4 0 0 0 .5-7.97A5.5 5.5 0 0 0 7.1 9.1 4 4 0 0 0 7 18Z" />

    <template v-else-if="icon === 'pencil'">
      <path d="M4 20h4L18.5 9.5a2.1 2.1 0 0 0-3-3L5 17v3Z" />
      <path d="M13.5 7.5l3 3" />
    </template>

    <template v-else-if="icon === 'laptop-phone'">
      <rect x="3" y="5" width="12" height="8" rx="1.2" />
      <path d="M2.5 16.5h13" />
      <rect x="17" y="8" width="5" height="9" rx="1.2" />
    </template>

    <path v-else-if="icon === 'flag'" d="M5 21V4.5C7 3.5 9.5 3.5 12 4.5c2.5 1 5 1 7 0v9c-2 1-4.5 1-7 0s-5-1-7 0" />

    <path v-else-if="icon === 'heart'" d="M12 20.5S3.5 15 3.5 9a4.5 4.5 0 0 1 8.5-2 4.5 4.5 0 0 1 8.5 2c0 6-8.5 11.5-8.5 11.5Z" />

    <template v-else-if="icon === 'alarm'">
      <circle cx="12" cy="13" r="7.5" />
      <path d="M12 9.5V13l2.5 1.5M5 4l2.5 2M19 4l-2.5 2" />
    </template>

    <path
      v-else-if="icon === 'star'"
      d="M12 3.5l2.55 5.17 5.7.83-4.13 4 .98 5.68L12 16.5l-5.1 2.68.98-5.68-4.13-4 5.7-.83L12 3.5Z"
    />

    <template v-else-if="icon === 'map-marker'">
      <path d="M12 21.5S5 15 5 9.8a7 7 0 0 1 14 0C19 15 12 21.5 12 21.5Z" />
      <circle cx="12" cy="9.5" r="2.4" />
    </template>

    <path v-else-if="icon === 'phone'" d="M5 4h3.5l1.5 4-2 1.5a12 12 0 0 0 6.5 6.5l1.5-2 4 1.5V19a2 2 0 0 1-2.2 2A16 16 0 0 1 3 5.2 2 2 0 0 1 5 4Z" />

    <template v-else-if="icon === 'envelope'">
      <rect x="3" y="5.5" width="18" height="13" rx="2" />
      <path d="M3.5 6.5 12 13l8.5-6.5" />
    </template>

    <template v-else-if="icon === 'checkmark-circle'">
      <circle cx="12" cy="12" r="8.5" />
      <path d="M8.5 12.2l2.4 2.4 4.6-5" />
    </template>

    <circle v-else cx="12" cy="12" r="3" />
  </svg>
</template>
