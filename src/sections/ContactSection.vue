<script setup lang="ts">
import { ref } from 'vue'
import SectionHeading from '@/components/SectionHeading.vue'
import ContactInfoList from '@/components/ContactInfoList.vue'
import { usePortfolioData } from '@/composables/usePortfolioData'

const { data } = usePortfolioData()

const name = ref('')
const email = ref('')
const message = ref('')
const status = ref<'idle' | 'sent'>('idle')
const error = ref('')

// TODO: koppel dit formulier aan een echt endpoint (bijv. Laravel API,
// Formspree, of een e-mailservice). Nu wordt alleen lokaal een bevestiging
// getoond zodat de UI compleet en testbaar is.
function handleSubmit() {
  if (!name.value || !email.value || !message.value) {
    error.value = 'Vul alle velden in voordat je het bericht verstuurt.'
    return
  }
  error.value = ''
  status.value = 'sent'
}
</script>

<template>
  <section id="contact" class="section-py px-6 pb-40 sm:px-10 lg:px-24 lg:pb-24">
    <div class="mx-auto max-w-3xl">
      <SectionHeading eyebrow="Laten we praten" title="Contact " accent="opnemen" />

      <div class="mb-8">
        <ContactInfoList :items="data.contactInfo" />
      </div>

      <div class="card-surface rounded-2xl p-6 sm:p-10">
        <form v-if="status === 'idle'" class="space-y-6" @submit.prevent="handleSubmit" novalidate>
          <div class="grid gap-6 sm:grid-cols-2">
            <div>
              <label for="name" class="mb-2 block text-sm font-medium" style="color: var(--text-primary)">
                Naam
              </label>
              <input
                id="name"
                v-model="name"
                type="text"
                required
                autocomplete="name"
                class="field"
                placeholder="Je naam"
              />
            </div>
            <div>
              <label for="email" class="mb-2 block text-sm font-medium" style="color: var(--text-primary)">
                E-mailadres
              </label>
              <input
                id="email"
                v-model="email"
                type="email"
                required
                autocomplete="email"
                class="field"
                placeholder="jij@voorbeeld.nl"
              />
            </div>
          </div>

          <div>
            <label for="message" class="mb-2 block text-sm font-medium" style="color: var(--text-primary)">
              Bericht
            </label>
            <textarea
              id="message"
              v-model="message"
              required
              rows="5"
              class="field resize-none"
              placeholder="Waar kan ik je mee helpen?"
            />
          </div>

          <button type="submit" class="btn btn-primary">Verstuur bericht</button>

          <p v-if="error" role="alert" class="text-sm" style="color: var(--accent-pink-light)">
            {{ error }}
          </p>
        </form>

        <div v-else role="status" aria-live="polite" class="py-6 text-center">
          <p class="text-lg font-semibold" style="color: var(--text-primary)">Bedankt, {{ name }}!</p>
          <p class="mt-2 text-sm" style="color: var(--text-secondary)">
            Je bericht is genoteerd. Ik neem zo snel mogelijk contact met je op via
            {{ email }}.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
