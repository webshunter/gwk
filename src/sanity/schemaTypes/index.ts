import { type SchemaTypeDefinition } from 'sanity'

import { template } from './template'
import { heroSection } from './heroSection'
import { heroSection3 } from './heroSection3'
import { featureSection } from './featureSection'
import { testimonialSection } from './testimonialSection'
import { mapSection } from './mapSection'
import { activitySection } from './activitySection'
import { contentSection1 } from './contentSection1'
import { contentSection2 } from './contentSection2'
import { contentSection3 } from './contentSection3'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    template,
    heroSection,
    heroSection3,
    featureSection,
    testimonialSection,
    mapSection,
    activitySection,
    contentSection1,
    contentSection2,
    contentSection3,
  ],
}
