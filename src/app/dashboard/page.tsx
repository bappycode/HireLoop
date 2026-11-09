import { redirect } from "next/navigation"
import { dashboardHome } from "@/lib/dashboard-nav"
import { requireUser, resolveRole } from "@/lib/session"

export default async function DashboardPage() {
  const session = await requireUser()

  redirect(dashboardHome[resolveRole(session.user.role)])
}
