import { requireRole } from "@/lib/session"

export default async function RecruiterDashboard() {
  await requireRole("recruiter")

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">Recruiter Dashboard</h1>
    </div>
  )
}
