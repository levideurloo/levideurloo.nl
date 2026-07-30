<script setup lang="ts">
import { computed, ref } from 'vue'
import SectionHeading from '@/components/SectionHeading.vue'
import ProjectCard from '@/components/ProjectCard.vue'
import { usePortfolioData } from '@/composables/usePortfolioData'

const { data } = usePortfolioData()

const activeFilter = ref('all')

const filterLabels: Record<string, string> = {
  all: 'Alles',
  applicatie: 'Applicaties',
  website: "Website's",
}

const filters = computed(() => {
  const set = new Set<string>()
  data.value.projects.forEach((project) => {
    if(project.categories !== undefined) {
      project.categories.forEach((category) => set.add(category))
    }
  })
  return Array.from(set)
})

const filteredProjects = computed(() =>
    activeFilter.value === 'all'
        ? data.value.projects
        : data.value.projects.filter((project) => project.categories?.includes(activeFilter.value))
)
</script>

<template>
  <section id="portfolio" class="section-py px-6 sm:px-10 lg:px-24">
    <div class="mx-auto max-w-6xl">
      <div class="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading eyebrow="Wat ik zoal maak" title="Mijn " accent="portfolio" />

        <div v-if="filters.length > 2" class="mb-14 flex flex-wrap gap-2" role="group" aria-label="Filter projecten op type">
          <button
            v-for="filter in filters"
            :key="filter"
            type="button"
            class="rounded-full px-4 py-1.5 text-xs font-medium transition-colors"
            :class="activeFilter === filter ? 'text-white' : ''"
            :style="
              activeFilter === filter
                ? 'background: linear-gradient(95deg, var(--accent-teal), var(--accent-violet), var(--accent-pink))'
                : 'background: var(--surface-raised); color: var(--text-secondary); border: 1px solid var(--border)'
            "
            :aria-pressed="activeFilter === filter"
            @click="activeFilter = filter"
          >
            {{ filterLabels[filter] ?? filter }}
          </button>
        </div>
      </div>

      <p v-if="Array.isArray(filteredProjects) && filteredProjects.length === 0" class="text-sm" style="color: var(--text-muted)">
        Geen projecten gevonden in deze categorie.
      </p>

      <TransitionGroup
        tag="div"
        class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="opacity-0 translate-y-2"
        leave-active-class="transition duration-150 ease-in absolute"
        leave-to-class="opacity-0"
        v-else
      >
        <ProjectCard v-for="project in filteredProjects" :key="project.id" :project="project"/>
      </TransitionGroup>
    </div>
  </section>
</template>
