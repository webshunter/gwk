"use server"

import { revalidatePath } from "next/cache"

import { requireSupabaseSession } from "@/lib/supabase/server"
import { serverClient } from "@/sanity/lib/serverClient"

import { sectionFactories, type SectionPayload, type SectionType } from "./sectionPresets"

export async function listPages() {
  await requireSupabaseSession()

  const docs = await serverClient.fetch<Array<{ _id: string; title: string; slug?: { current: string } }>>(
    `*[_type == "template"] | order(_createdAt desc){ _id, title, slug }`
  )
  return docs
}

export async function getPage(id: string) {
  await requireSupabaseSession()

  const doc = await serverClient.fetch(
    `*[_type == "template" && _id == $id][0]{ _id, title, slug, summary, sections }`,
    { id }
  )

  return doc
}

export async function createPage({
  title,
  slug,
}: {
  title: string
  slug: string
}) {
  await requireSupabaseSession()

  const doc = {
    _type: "template",
    title,
    slug: {
      _type: "slug",
      current: slug,
    },
    summary: "",
    sections: [],
  }

  const created = await serverClient.create(doc)
  revalidatePath("/admin")
  return created
}

export async function addSection(pageId: string, type: SectionType) {
  await requireSupabaseSession()

  const sectionFactory = sectionFactories[type]
  if (!sectionFactory) {
    throw new Error(`Unsupported section type: ${type}`)
  }

  const newSection = sectionFactory()

  const result = await serverClient
    .patch(pageId)
    .setIfMissing({ sections: [] })
    .append("sections", [newSection])
  .commit({ returnDocuments: true })

  revalidatePath("/admin")
  return result
}

export async function updateSections(pageId: string, sections: SectionPayload[]) {
  await requireSupabaseSession()

  await serverClient
    .patch(pageId)
    .set({ sections })
    .commit()

  revalidatePath("/admin")
}

export async function updatePageMeta(pageId: string, data: { title?: string; summary?: string; slug?: string }) {
  await requireSupabaseSession()

  const patch: Record<string, unknown> = {}

  if (data.title !== undefined) patch.title = data.title
  if (data.summary !== undefined) patch.summary = data.summary
  if (data.slug !== undefined) {
    patch.slug = { _type: "slug", current: data.slug }
  }

  if (Object.keys(patch).length === 0) {
    return
  }

  await serverClient.patch(pageId).set(patch).commit()
  revalidatePath("/admin")
}

export async function deletePage(pageId: string) {
  await requireSupabaseSession()

  await serverClient.delete(pageId)
  revalidatePath("/admin")
}
