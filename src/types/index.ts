export type Theme = 'dark' | 'light'

export interface NavItem {
  id: string
  label: string
  icon: 'home' | 'user' | 'briefcase' | 'graduation' | 'mail'
}

export interface AboutFact {
  label: string
  value: string
}

export interface Profile {
  name: string
  title: string
  tagline: string
  bioHtml: string
  facts: AboutFact[]
}

export interface ServiceItem {
  id: string
  title: string
  description: string
  icon: string
}

export interface Testimonial {
  id: string
  name: string
  company: string
  quote: string
  image?: string
}

export interface PricingTier {
  id: string
  title: string
  subtitle: string
  caption: string
  cta: string
  link: string
  primary: boolean
}

export interface FunFact {
  id: string
  label: string
  value: string
  icon: string
}

export interface Project {
  id: string
  title: string
  description: string
  categories?: string[]|undefined

  tags?: string[]
  repoUrl?: string
  url?: string
  year?: string
  role?: string
  image?: string
}

export interface ExperienceEntry {
  id: string
  organisation: string
  role?: string
  year?: string
  description: string
  type?: string
  period?: string
  title?: string
}

export interface SkillLevel {
  id: string
  name: string
  percentage: number
  years: number
}

export interface Certificate {
  id: string
  title: string
  course: string
  date: string
  logo?: string
}

export interface ContactInfoItem {
  id: string
  text: string
  icon: string
}

export interface PortfolioData {
  profile: Profile
  services: ServiceItem[]
  testimonials?: Testimonial[]
  pricing?: PricingTier[]
  funFacts?: FunFact[]
  projects?: Project[]
  experience: ExperienceEntry[]
  skills: SkillLevel[]
  knowledge: string[]
  certificates: Certificate[]
  contactInfo: ContactInfoItem[]
}

export interface RawCmsItem {
  id?: number | string
  title?: string
  subTitle?: string | number
  caption?: string
  description?: string
  icon?: string
  image?: string
  logo?: string
  course?: string
  date?: string
  year?: string
  text?: string
  link?: string
  cta?: string
  primary?: boolean
  list?: string[]
  types?: string[]
}

export type RawCmsPercentageTuple = [string, string, string]

export interface RawCmsSection {
  title?: string
  caption?: string
  type?:
    | 'text'
    | 'key-value'
    | 'feature'
    | 'testimonial'
    | 'pricing'
    | 'counter'
    | 'portfolio'
    | 'timeline'
    | 'percentage'
    | 'certificate'
    | 'contact-info'
    | 'form'
  items?: Array<RawCmsItem | string | RawCmsPercentageTuple>
}

export interface RawCmsPage {
  title?: string
  icon?: string
  sections?: RawCmsSection[]
}

export interface RawPortfolioResponse {
  pages?: RawCmsPage[]
}
