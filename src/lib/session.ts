import { cache } from "react"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import { dashboardHome, isRole, type Role } from "@/lib/dashboard-nav"

/**
 * Reads the Better Auth session for the current request.
 * Wrapped in `cache()` so the layout and the page share a single lookup.
 */
export const getSession = cache(async () => {
  return auth.api.getSession({ headers: await headers() })
})

/** Returns the session or redirects to the sign-in page. */
export async function requireUser() {
  const session = await getSession()
  if (!session?.user) {
    redirect("/signin")
  }
  return session
}

/** Narrows an unknown role value to a known role (falls back to "seeker"). */
export function resolveRole(role: unknown): Role {
  return isRole(role) ? role : "seeker"
}

/** Ensures the signed-in user owns `role`, otherwise sends them to their own dashboard. */
export async function requireRole(role: Role) {
  const session = await requireUser()
  const userRole = resolveRole(session.user.role)
  if (userRole !== role) {
    redirect(dashboardHome[userRole])
  }
  return session
}
