import { nanoid } from "nanoid"

export type SectionType = "heroSection" | "featureSection" | "testimonialSection"

export type SectionMap = {
  heroSection: HeroSection
  featureSection: FeatureSection
  testimonialSection: TestimonialSection
}

export type HeroSection = {
  _type: "heroSection"
  _key: string
  title: string
  subtitle: string
  description: string
  theme: "light" | "dark"
  cta: {
    label: string
    href: string
  }
}

export type FeatureSection = {
  _type: "featureSection"
  _key: string
  title: string
  description: string
  features: Array<{
    _key: string
    heading: string
    body: string
  }>
}

export type TestimonialSection = {
  _type: "testimonialSection"
  _key: string
  title: string
  testimonials: Array<{
    _key: string
    quote: string
    author: string
    role: string
  }>
}

export type SectionPayload = SectionMap[SectionType]

export const sectionFactories: Record<SectionType, () => SectionPayload> = {
  heroSection: () => ({
    _type: "heroSection",
    _key: nanoid(),
    title: "",
    subtitle: "",
    description: "",
    theme: "light",
    cta: {
      label: "",
      href: "",
    },
  }),
  featureSection: () => ({
    _type: "featureSection",
    _key: nanoid(),
    title: "",
    description: "",
    features: [],
  }),
  testimonialSection: () => ({
    _type: "testimonialSection",
    _key: nanoid(),
    title: "",
    testimonials: [],
  }),
}

export function duplicateSection<T extends SectionPayload>(section: T): T {
  return {
    ...section,
    _key: nanoid(),
    ...(section._type === "featureSection"
      ? {
          features: section.features.map((feature) => ({
            ...feature,
            _key: nanoid(),
          })),
        }
      : {}),
    ...(section._type === "testimonialSection"
      ? {
          testimonials: section.testimonials.map((testimonial) => ({
            ...testimonial,
            _key: nanoid(),
          })),
        }
      : {}),
  } as T
}
