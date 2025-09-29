"use client"

import {useCallback} from 'react'
import {Card, Radio, Stack, Text} from '@sanity/ui'
import {PatchEvent, set} from 'sanity'
import type {StringInputProps} from 'sanity'

const randomKey = () => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }

  return Math.random().toString(36).slice(2)
}

const createHeroSection = () => ({
  _type: 'heroSection' as const,
  _key: randomKey(),
  title: '',
  subtitle: '',
  description: '',
  theme: 'light',
  cta: {
    label: '',
    href: '',
  },
})

const createFeatureSection = () => ({
  _type: 'featureSection' as const,
  _key: randomKey(),
  title: '',
  description: '',
  features: [],
})

const createTestimonialSection = () => ({
  _type: 'testimonialSection' as const,
  _key: randomKey(),
  title: '',
  testimonials: [],
})

const layoutPresets: Record<string, () => Array<Record<string, unknown>>> = {
  model1: () => [createHeroSection(), createFeatureSection()],
  model2: () => [createHeroSection(), createTestimonialSection()],
  model3: () => [createHeroSection()],
}

const options = [
  {value: 'model1', label: 'Model 1 — Hero + Feature'},
  {value: 'model2', label: 'Model 2 — Hero + Testimonial'},
  {value: 'model3', label: 'Model 3 — Hero Only'},
  {value: 'model4', label: 'Model 4 — Freeform'},
]

const LayoutModelInput = ({schemaType, onChange, value, readOnly}: StringInputProps) => {
  const handleSelect = useCallback(
    (nextValue: string) => {
      if (readOnly) {
        return
      }

      onChange(PatchEvent.from(set(nextValue)))

      const presetFactory = layoutPresets[nextValue]
      if (!presetFactory) {
        return
      }

      onChange(PatchEvent.from(set(presetFactory(), ['sections'])))
    },
    [onChange, readOnly]
  )

  return (
    <Stack space={3}>
      {options.map((option) => {
        const id = `${schemaType.name}-${option.value}`

        return (
          <Card
            key={option.value}
            padding={3}
            radius={2}
            tone={value === option.value ? 'primary' : undefined}
            border
          >
            <Stack space={2}>
              <div className="flex items-center gap-3">
                <Radio
                  id={id}
                  name={schemaType.name}
                  value={option.value}
                  checked={value === option.value}
                  onChange={() => handleSelect(option.value)}
                  disabled={readOnly}
                />
                <Text as="label" htmlFor={id} size={2} weight="medium" className="cursor-pointer">
                  {option.label}
                </Text>
              </div>
              {option.value === 'model4' && (
                <Text size={1} muted>
                  Choose this if you want full control and manage sections manually.
                </Text>
              )}
            </Stack>
          </Card>
        )
      })}
    </Stack>
  )
}

export default LayoutModelInput
