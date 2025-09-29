const slugify = (input: string) =>
  input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")

export const randomSlug = (title: string) => {
  const base = slugify(title || "halaman")
  const suffix = Math.random().toString(36).slice(2, 6)
  return `${base}-${suffix}`
}
