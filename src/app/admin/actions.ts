"use server"

import { revalidatePath } from "next/cache"

import { serverClient } from "@/sanity/lib/serverClient"
import { requireAdmin } from "@/lib/adminSession"

import { sectionFactories, type SectionPayload, type SectionType } from "./sectionPresets"

export async function listPages() {
  await requireAdmin()

  console.info("listPages: fetching template documents from Sanity")
  try {
    const docs = await serverClient.fetch<Array<{ _id: string; title: string; slug?: { current: string } }>>(
      `*[_type == "template"] | order(_createdAt desc){ _id, title, slug }`
    )
    return docs
  } catch (error) {
    console.error("Failed to list Sanity pages", error)
    throw error
  }
}

export async function getPage(id: string) {
  await requireAdmin()
  console.info("getPage: fetching Sanity document", { id })
  try {
    const doc = await serverClient.fetch(
      `*[_type == "template" && _id == $id][0]{ _id, title, slug, summary, sections }`,
      { id }
    )

    return doc
  } catch (error) {
    console.error("Failed to fetch Sanity page", { id, error })
    throw error
  }
}

export async function createPage({
  title,
  slug,
}: {
  title: string
  slug: string
}) {
  await requireAdmin()

  console.info("createPage: Starting page creation", { title, slug })

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

  try {
    const created = await serverClient.create(doc)
    console.info("createPage: Successfully created page", { _id: created._id, title })
    revalidatePath("/admin")
    return created
  } catch (error) {
    console.error("createPage: Failed to create page", { title, slug, error })
    throw error
  }
}

export async function addSection(pageId: string, type: SectionType) {
  await requireAdmin()
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
  await requireAdmin()

  await serverClient.patch(pageId).set({ sections }).commit()

  revalidatePath("/admin")
}

export async function updatePageMeta(pageId: string, data: { title?: string; summary?: string; slug?: string }) {
  await requireAdmin()
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
  await requireAdmin()

  await serverClient.delete(pageId)
  revalidatePath("/admin")
}
