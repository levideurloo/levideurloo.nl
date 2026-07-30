<script setup lang="ts">
// Ambient achtergrond: drie zachte, langzaam bewegende gloed-vlekken op een
// effen canvas. Vervangt de harde diagonale gradient van de oude site door
// iets rustigers dat in zowel dark als light overeind blijft.
</script>

<template>
  <div class="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[var(--bg)]" aria-hidden="true">
    <div class="aurora-blob aurora-blob--teal" style="width: 42vw; height: 42vw; top: -10%; left: -8%" />
    <div class="aurora-blob aurora-blob--violet" style="width: 38vw; height: 38vw; top: -6%; right: -10%" />
    <div class="aurora-blob aurora-blob--pink" style="width: 50vw; height: 50vw; bottom: -18%; left: 20%" />

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
