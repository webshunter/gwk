import { type SchemaTypeDefinition } from 'sanity'

import { template } from './template'
import { heroSection } from './heroSection'
import { featureSection } from './featureSection'
import { testimonialSection } from './testimonialSection'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [template, heroSection, featureSection, testimonialSection],
}
