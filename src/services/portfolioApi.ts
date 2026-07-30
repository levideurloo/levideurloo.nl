import type {
  RawPortfolioResponse,
  RawCmsPage,
  RawCmsSection,
  RawCmsItem,
  RawCmsPercentageTuple,
  PortfolioData,
  Profile,
  ServiceItem,
  Testimonial,
  PricingTier,
  FunFact,
  Project,
  ExperienceEntry,
  SkillLevel,
  Certificate,
  ContactInfoItem,
} from '@/types'
import { fallbackPortfolioData, fallbackProfile } from '@/data/fallback'
import { resolveAssetUrl } from '@/utils/assets'

// ---------------------------------------------------------------------------
// Endpoint-configuratie. Nu: het statische /index.json op levideurloo.nl.
// Later: een Laravel REST API-endpoint. Dat wordt dan een kwestie van deze
// twee omgevingsvariabelen aanpassen (zie .env.example) — zolang het
// endpoint dezelfde pages/sections/items-vorm teruggeeft, hoeft er verder
// niets te veranderen; wijzigt de vorm wél, pas dan alleen de normalize-
// functies hieronder aan.
// ---------------------------------------------------------------------------
const API_BASE = import.meta.env.VITE_API_BASE_URL ?? ''
const API_PATH = import.meta.env.VITE_API_PATH ?? '/index.json'
const REQUEST_TIMEOUT_MS = 8000

class PortfolioApiError extends Error {}

async function fetchWithTimeout(url: string): Promise<Response> {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: { Accept: 'application/json' },
    })
    if (!response.ok) {
      throw new PortfolioApiError(`Onverwachte statuscode ${response.status} van ${url}`)
    }
    return response
  } finally {
    clearTimeout(timeout)
  }
}

// ---------------------------------------------------------------------------
// Lookup-helpers — zoeken op titel (los van hoofdletters, met de Engelse
// variant als tweede kans) en op icoon als laatste redmiddel, zodat kleine
// tekstwijzigingen in het CMS de app niet meteen breken.
// ---------------------------------------------------------------------------
function findPage(pages: RawCmsPage[], titleHints: string[], iconHint?: string): RawCmsPage | undefined {
  const byTitle = pages.find((p) =>
    titleHints.some((hint) => (p.title ?? '').toLowerCase().includes(hint.toLowerCase())),
  )
  if (byTitle) return byTitle
  if (iconHint) return pages.find((p) => (p.icon ?? '').toLowerCase().includes(iconHint.toLowerCase()))
  return undefined
}

function findSection(page: RawCmsPage | undefined, type: RawCmsSection['type']): RawCmsSection | undefined {
  return page?.sections?.find((s) => s.type === type)
}

function findSectionByTitle(page: RawCmsPage | undefined, titleHint: string): RawCmsSection | undefined {
  return page?.sections?.find((s) => (s.title ?? '').toLowerCase().includes(titleHint.toLowerCase()))
}

function isRawCmsItem(value: unknown): value is RawCmsItem {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function toNumber(value: string | number | undefined, fallback = 0): number {
  if (value === undefined) return fallback
  const n = typeof value === 'number' ? value : parseFloat(value)
  return Number.isFinite(n) ? n : fallback
}

// ---------------------------------------------------------------------------
// Per contentblok: normalize(raw) -> nette items, met fallback zodra een
// sectie ontbreekt of leeg is.
// ---------------------------------------------------------------------------

function normalizeProfile(aboutPage: RawCmsPage | undefined): Profile {
  const textSection = findSection(aboutPage, 'text')
  const bioHtml = textSection?.items?.find(isRawCmsItem)?.caption

  const kvSection = findSection(aboutPage, 'key-value')
  const facts =
    kvSection?.items
      ?.filter(isRawCmsItem)
      .map((item) => ({ label: item.title ?? '', value: String(item.caption ?? '') }))
      .filter((fact) => fact.label && fact.value) ?? []

  return {
    // Naam/titel/tagline staan niet in deze databron (dat is puur het
    // statische hero-visitekaartje) — die blijven op de vaste waarden staan.
    name: fallbackProfile.name,
    title: fallbackProfile.title,
    tagline: fallbackProfile.tagline,
    bioHtml: bioHtml || fallbackProfile.bioHtml,
    facts: facts.length > 0 ? facts : fallbackProfile.facts,
  }
}

function normalizeServices(aboutPage: RawCmsPage | undefined): ServiceItem[] {
  const section = findSection(aboutPage, 'feature')
  const items = section?.items?.filter(isRawCmsItem) ?? []
  if (items.length === 0) return fallbackPortfolioData.services

  return items.map((item, index) => ({
    id: `service-${index}`,
    title: item.title ?? '',
    description: item.caption ?? item.description ?? '',
    icon: item.icon ?? 'flag',
  }))
}

function normalizeTestimonials(aboutPage: RawCmsPage | undefined): Testimonial[] {
  const section = findSection(aboutPage, 'testimonial')
  const items = section?.items?.filter(isRawCmsItem) ?? []
  if (items.length === 0) return fallbackPortfolioData.testimonials

  return items.map((item, index) => ({
    id: `testimonial-${index}`,
    name: item.title ?? '',
    company: String(item.subTitle ?? ''),
    quote: item.caption ?? '',
    image: resolveAssetUrl(item.image),
  }))
}

function normalizePricing(aboutPage: RawCmsPage | undefined): PricingTier[] {
  const section = findSection(aboutPage, 'pricing')
  const items = section?.items?.filter(isRawCmsItem) ?? []
  if (items.length === 0) return fallbackPortfolioData.pricing

  return items.map((item, index) => ({
    id: `pricing-${index}`,
    title: item.title ?? '',
    subtitle: String(item.subTitle ?? ''),
    caption: item.caption ?? '',
    cta: item.cta ?? 'Meer info',
    link: item.link ?? '#contact',
    primary: Boolean(item.primary),
  }))
}

function normalizeFunFacts(aboutPage: RawCmsPage | undefined): FunFact[] {
  const section = findSection(aboutPage, 'counter')
  const items = section?.items?.filter(isRawCmsItem) ?? []
  if (items.length === 0) return fallbackPortfolioData.funFacts

  return items.map((item, index) => ({
    id: `funfact-${index}`,
    label: item.title ?? '',
    value: String(item.subTitle ?? ''),
    icon: item.icon ?? 'star',
  }))
}

function normalizeProjects(portfolioPage: RawCmsPage | undefined): Project[] {
  const section = findSection(portfolioPage, 'portfolio')
  const items = section?.items?.filter(isRawCmsItem) ?? []
  if (items.length === 0) return fallbackPortfolioData.projects

  return items.map((item, index) => ({
    id: String(item.id ?? index),
    title: item.title ?? 'Naamloos project',
    description: item.description ?? item.caption ?? '',
    categories: item.types && item.types.length > 0 ? item.types : ['all'],
    image: resolveAssetUrl(item.image),
  }))
}

function normalizeExperience(experiencePage: RawCmsPage | undefined): ExperienceEntry[] {
  const section = findSectionByTitle(experiencePage, 'werkervaring') ?? findSection(experiencePage, 'timeline')
  const items = section?.items?.filter(isRawCmsItem) ?? []
  if (items.length === 0) return fallbackPortfolioData.experience

  return items.map((item, index) => ({
    id: `experience-${index}`,
    organisation: item.title ?? '',
    role: String(item.subTitle ?? ''),
    year: item.year ?? '',
    description: item.caption ?? '',
  }))
}

function normalizeSkills(experiencePage: RawCmsPage | undefined): SkillLevel[] {
  const section = findSection(experiencePage, 'percentage')
  const items = (section?.items ?? []).filter((item): item is RawCmsPercentageTuple => Array.isArray(item))
  if (items.length === 0) return fallbackPortfolioData.skills

  return items.map((tuple, index) => ({
    id: `skill-${index}`,
    name: tuple[0] ?? '',
    percentage: toNumber(tuple[1]),
    years: toNumber(tuple[2]),
  }))
}

function normalizeKnowledge(experiencePage: RawCmsPage | undefined): string[] {
  const section = findSectionByTitle(experiencePage, 'knowledge')
  const items = (section?.items ?? []).filter((item): item is string => typeof item === 'string')
  return items.length > 0 ? items : fallbackPortfolioData.knowledge
}

function normalizeCertificates(experiencePage: RawCmsPage | undefined): Certificate[] {
  const section = findSection(experiencePage, 'certificate')
  const items = section?.items?.filter(isRawCmsItem) ?? []
  if (items.length === 0) return fallbackPortfolioData.certificates

  return items.map((item, index) => ({
    id: `certificate-${index}`,
    title: item.title ?? '',
    course: item.course ?? '',
    date: item.date ?? '',
    logo: resolveAssetUrl(item.logo),
  }))
}

function normalizeContactInfo(contactPage: RawCmsPage | undefined): ContactInfoItem[] {
  const section = findSection(contactPage, 'contact-info')
  const items = section?.items?.filter(isRawCmsItem) ?? []
  if (items.length === 0) return fallbackPortfolioData.contactInfo

  return items.map((item, index) => ({
    id: `contact-${index}`,
    text: item.text ?? item.caption ?? '',
    icon: item.icon ?? 'envelope',
  }))
}

function normalize(raw: RawPortfolioResponse): PortfolioData {
  const pages = raw.pages ?? []
  const aboutPage = findPage(pages, ['over mij', 'about'], 'user')
  const portfolioPage = findPage(pages, ['portfolio'], 'briefcase')
  const experiencePage = findPage(pages, ['ervaring', 'opleiding', 'experience'], 'graduation')
  const contactPage = findPage(pages, ['contact'], 'envelope')

  return {
    profile: normalizeProfile(aboutPage),
    services: normalizeServices(aboutPage),
    testimonials: normalizeTestimonials(aboutPage),
    pricing: normalizePricing(aboutPage),
    funFacts: normalizeFunFacts(aboutPage),
    projects: normalizeProjects(portfolioPage),
    experience: normalizeExperience(experiencePage),
    skills: normalizeSkills(experiencePage),
    knowledge: normalizeKnowledge(experiencePage),
    certificates: normalizeCertificates(experiencePage),
    contactInfo: normalizeContactInfo(contactPage),
  }
}

export async function fetchPortfolioData(): Promise<PortfolioData> {
  const url = `${API_BASE}${API_PATH}`
  const response = await fetchWithTimeout(url)
  const raw = (await response.json()) as RawPortfolioResponse
  return normalize(raw)
}

export { fallbackPortfolioData }
