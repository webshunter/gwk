"use client"

import {useCallback} from 'react'
import {ArrayOfObjectsInputProps, PatchEvent, set} from 'sanity'
import {Button, Card, Flex, Stack, Text} from '@sanity/ui'

type PaletteItem = {
  title: string
  description: string
  create: () => Record<string, unknown>
}

const randomKey = () => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }

  return Math.random().toString(36).slice(2)
}

const palette: PaletteItem[] = [
  {
    title: 'Hero Section',
    description: 'Blok pembuka dengan judul besar, subjudul, dan CTA.',
    create: () => ({
      _type: 'heroSection',
      _key: randomKey(),
      title: '',
      subtitle: '',
      description: '',
      theme: 'light',
      cta: {
        label: '',
        href: '',
      },
    }),
  },
  {
    title: 'Feature Section',
    description: 'Daftar fitur atau keunggulan utama.',
    create: () => ({
      _type: 'featureSection',
      _key: randomKey(),
      title: '',
      description: '',
      features: [],
    }),
  },
  {
    title: 'Testimonial Section',
    description: 'Kumpulan testimoni pengunjung atau klien.',
    create: () => ({
      _type: 'testimonialSection',
      _key: randomKey(),
      title: '',
      testimonials: [],
    }),
  },
]

const SectionsInput = (props: ArrayOfObjectsInputProps) => {
  const {value, onChange, renderDefault} = props

  const handleAdd = useCallback(
    (factory: PaletteItem['create']) => {
      const nextItem = factory()
      const nextValue = [...(value ?? []), nextItem]
      onChange?.(PatchEvent.from(set(nextValue)))
    },
    [onChange, value]
  )

  return (
    <Stack space={4}>
      <Card padding={4} radius={3} border>
        <Stack space={3}>
          <Text size={2} weight="semibold">
            Tambahkan modul halaman
          </Text>
          <Text size={1} muted>
            Klik salah satu modul di bawah, lalu susun urutannya di daftar. Anda juga bisa drag-and-drop di daftar modul.
          </Text>
          <Flex gap={3} wrap="wrap">
            {palette.map((item) => (
              <Card key={item.title} padding={3} radius={2} shadow={1} border>
                <Stack space={2} style={{minWidth: '200px'}}>
                  <Text weight="medium">{item.title}</Text>
                  <Text size={1} muted>
                    {item.description}
                  </Text>
                  <Button
                    text="Tambah modul"
                    tone="primary"
                    onClick={() => handleAdd(item.create)}
                  />
                </Stack>
              </Card>
            ))}
          </Flex>
        </Stack>
      </Card>
      {renderDefault?.(props)}
    </Stack>
  )
}

export default SectionsInput
