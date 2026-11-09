import { requireRole } from "@/lib/session"

export default async function SeekerDashboard() {
  await requireRole("seeker")

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">Seeker Dashboard</h1>
    </div>
  )
}
