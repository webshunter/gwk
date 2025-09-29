import { getPage, listPages } from "./actions"
import BuilderShell from "./ui/BuilderShell"

import { requireSupabaseSession } from "@/lib/supabase/server"

export default async function AdminPage() {
  await requireSupabaseSession()

  const pages = await listPages()
  const firstPage = pages[0] ? await getPage(pages[0]._id) : null

  return <BuilderShell initialPages={pages} initialPage={firstPage} />
}
