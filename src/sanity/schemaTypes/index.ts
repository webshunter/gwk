import { type SchemaTypeDefinition } from 'sanity'

import { template } from './template'
import { heroSection } from './heroSection'
import { featureSection } from './featureSection'
import { testimonialSection } from './testimonialSection'
import { mapSection } from './mapSection'
import { activitySection } from './activitySection'
import { contentSection1 } from './contentSection1'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [template, heroSection, featureSection, testimonialSection, mapSection, activitySection, contentSection1],
}
