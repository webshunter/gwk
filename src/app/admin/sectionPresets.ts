import { nanoid } from "nanoid"

type SanityReference = {
  _type: "reference"
  _ref: string
}

type SanityImageValue = {
  _type: "image"
  asset?: SanityReference
  alt?: string
}

export type SectionType = "heroSection" | "heroSection3" | "featureSection" | "testimonialSection" | "mapSection" | "activitySection" | "contentSection1" | "contentSection2"

export type MapSection = {
  _type: "mapSection"
  _key: string
  title: string
  description: string
  mapImage?: SanityImageValue | null
  markers: Array<{
    _key: string
    number: string
    title: string
    description: string
    image?: SanityImageValue | null
    position: {
      top: number
      right: number
    }
    link?: string
  }>
}

export type ActivitySection = {
  _type: "activitySection"
  _key: string
  title: string
  description: string
  gallery: Array<{
    _key: string
    title: string
    description?: string
    image?: SanityImageValue | null
    cta?: {
      label?: string
      href?: string
    }
  }>
  flyer?: SanityImageValue | null
}

export type ContentSection1 = {
  _type: "contentSection1"
  _key: string
  description: string
  video?: {
    _type: "file"
    asset?: {
      _type: "reference"
      _ref: string
      url?: string
    }
  } | null
  items: Array<{
    _key: string
    title: string
    description?: string
    image?: SanityImageValue | null
  }>
}

export type ContentSection2 = {
  _type: "contentSection2"
  _key: string
  description: string
  mediaType: "image" | "video"
  mainImage?: SanityImageValue | null
  mainVideo?: {
    _type: "file"
    asset?: SanityReference
  } | null
  items: Array<{
    _key: string
    title: string
    image?: SanityImageValue | null
    cta: {
      label: string
      link: string
    }
  }>
}

export type SectionMap = {
  heroSection: HeroSection
  heroSection3: HeroSection3
  featureSection: FeatureSection
  testimonialSection: TestimonialSection
  mapSection: MapSection
  activitySection: ActivitySection
  contentSection1: ContentSection1
  contentSection2: ContentSection2
}

export type HeroSection = {
  _type: "heroSection"
  _key: string
  preTitle: string
  title: string
  subtitle: string
  theme: "light" | "dark"
  media?: SanityImageValue | null
  cta: {
    label: string
    href: string
  }
}

export type HeroSection3 = {
  _type: "heroSection3"
  _key: string
  preTitle: string
  title: string
  subtitle: string
  theme: "light" | "dark"
  media?: SanityImageValue | null
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
    _type: "featureItem"
    _key: string
    heading: string
    body: string
    icon?: SanityImageValue | null
  }>
}

export type TestimonialSection = {
  _type: "testimonialSection"
  _key: string
  title: string
  testimonials: Array<{
    _type: "testimonialItem"
    _key: string
    quote: string
    author: string
    role: string
    avatar?: SanityImageValue | null
  }>
}

export type SectionPayload = SectionMap[SectionType]

export const sectionFactories: Record<SectionType, () => SectionPayload> = {
  heroSection: () => ({
    _type: "heroSection",
    _key: nanoid(),
    preTitle: "",
    title: "",
    subtitle: "",
    theme: "dark",
    media: null,
    cta: {
      label: "",
      href: "",
    },
  }),
  heroSection3: () => ({
    _type: "heroSection3",
    _key: nanoid(),
    preTitle: "",
    title: "",
    subtitle: "",
    theme: "dark",
    media: null,
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
  mapSection: () => ({
    _type: "mapSection",
    _key: nanoid(),
    title: "Cultural Park",
    description: "Discover the cultural heart of Bali at Garuda Wisnu Kencana",
    mapImage: null,
    markers: [],
  }),
  activitySection: () => ({
    _type: "activitySection",
    _key: nanoid(),
    title: "Activities",
    description: "Explore the Cultural Richness of Bali at GWK",
    gallery: [],
    flyer: null,
  }),
  contentSection1: () => ({
    _type: "contentSection1",
    _key: nanoid(),
    description: "",
    video: null,
    items: [],
  }),
  contentSection2: () => ({
    _type: "contentSection2",
    _key: nanoid(),
    description: "",
    mediaType: "image",
    mainImage: null,
    mainVideo: null,
    items: [],
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

export const sectionPalette: Array<{ 
  type: SectionType; 
  title: string; 
  description: string; 
  icon: React.ComponentType | null;
  defaultData?: Record<string, unknown>;
}> = [
  {
    type: "heroSection",
    title: "Hero Section",
    description: "Large banner with background image, title, and call-to-action",
    icon: null,
    defaultData: {
      preTitle: "Welcome to",
      title: "Garuda Wisnu Kencana",
      subtitle: "The Magnificent Masterpiece of Indonesia",
      theme: "dark",
      cta: {
        label: "Explore GWK",
        href: "#explore"
      }
    }
  },
  {
    type: "heroSection3",
    title: "Hero Section 3",
    description: "Alternative hero section layout with background image, title, and CTA",
    icon: null,
    defaultData: {
      preTitle: "Discover",
      title: "Cultural Heritage",
      subtitle: "Experience the Beauty of Balinese Arts and Culture",
      theme: "dark",
      cta: {
        label: "Learn More",
        href: "#learn"
      }
    }
  },
  {
    type: "featureSection",
    title: "Feature Section",
    description: "Highlight key features or services",
    icon: null,
    defaultData: {
      title: "Our Features",
      description: "Discover what makes us special",
      features: []
    }
  },
  {
    type: "testimonialSection",
    title: "Testimonial Section",
    description: "Customer reviews and testimonials",
    icon: null,
    defaultData: {
      title: "What People Say",
      testimonials: []
    }
  },
  {
    type: "mapSection",
    title: "Map Section",
    description: "Interactive map with markers and popup details",
    icon: null,
    defaultData: {
      title: "Cultural Park",
      description: "Discover the cultural heart of Bali at Garuda Wisnu Kencana",
      markers: []
    }
  },
  {
    type: "activitySection",
    title: "Activity Section",
    description: "Gallery of activities with flyer/banner",
    icon: null,
    defaultData: {
      title: "Activities",
      description: "Explore the Cultural Richness of Bali at GWK",
      gallery: []
    }
  },
  {
    type: "contentSection1",
    title: "Content Section 1",
    description: "Content items with image, title, and description",
    icon: null,
    defaultData: {
      description: "",
      items: []
    }
  },
  {
    type: "contentSection2",
    title: "Content Section 2",
    description: "Description, main media (image/video), and a list of items with image, title, and CTA.",
    icon: null,
    defaultData: {
      description: "Section description goes here.",
      mediaType: "image",
      items: []
    }
  }
]
