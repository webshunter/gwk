import type { Metadata } from "next"
import "./design/custom-admin.css"

export const metadata: Metadata = {
  title: "Admin Dashboard | GWK Cultural Park",
  description: "Modern content management system for GWK Cultural Park"
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="admin-dashboard">
      {children}
    </div>
  )
}
