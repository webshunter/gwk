import { getPage, listPages } from "../actions"
import ModernAdminLayout from "../ui/ModernAdminLayout"
import { requireAdmin } from "@/lib/adminSession"

export default async function LegacyAdminPage() {
  await requireAdmin()

  const pages = await listPages()
  const firstPage = pages[0] ? await getPage(pages[0]._id) : null

  return <ModernAdminLayout initialPages={pages} initialPage={firstPage} />
}