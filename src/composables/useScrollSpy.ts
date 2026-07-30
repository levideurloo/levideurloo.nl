import { onMounted, onUnmounted, ref } from 'vue'

export function useScrollSpy(sectionIds: string[]) {
  const activeId = ref<string>(sectionIds[0] ?? '')
  let observer: IntersectionObserver | null = null

  onMounted(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el)

    observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (visible[0]) {
          activeId.value = visible[0].target.id
        }
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] },
    )

    elements.forEach((el) => observer?.observe(el))
  })

  onUnmounted(() => observer?.disconnect())

  return { activeId }
}
