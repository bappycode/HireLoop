import { requireRole } from "@/lib/session"

export default async function AdminDashboard() {
  await requireRole("admin")

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">Admin Dashboard</h1>
    </div>
  )
}
