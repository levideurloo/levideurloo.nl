<script setup lang="ts">
 //
</script>

<template>
  <div class="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[var(--bg)]" aria-hidden="true">
    <div class="aurora-blob aurora-blob--teal" />
    <div class="aurora-blob aurora-blob--violet" />
    <div class="aurora-blob aurora-blob--pink" />

    <!-- Fijn dot-grid, subtiele knipoog naar het stippenpatroon van de oude site -->
    <svg class="absolute left-6 top-8 h-40 w-40 opacity-[0.18] dark:opacity-[0.25]" aria-hidden="true">
      <pattern id="dotgrid" width="14" height="14" patternUnits="userSpaceOnUse">
        <circle cx="1.5" cy="1.5" r="1.5" fill="var(--text-primary)" />
      </pattern>
      <rect width="100%" height="100%" fill="url(#dotgrid)" />
    </svg>

    <div
      class="absolute inset-0"
      style="background: linear-gradient(180deg, transparent 0%, var(--bg) 92%)"
    />
  </div>
</template>

<style lang="scss" scoped>
svg {
  top: - env(safe-area-inset-top);
}

.aurora-blob {
  &--teal {
    width: 42vw;
    height: 42vw;
    top: -10%;
    left: -8%;
  }

  &--violet {
    width: 38vw;
    height: 38vw;
    top: -6%;
    right: -10%;
  }

  &--pink {
    width: 50vw;
    height: 50vw;
    bottom: -18%;
    left: 20%;
  }
}
</style>