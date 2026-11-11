import {
  Bookmark,
  Briefcase,
  Building2,
  CreditCard,
  FileText,
  LayoutDashboard,
  Plus,
  Settings,
  Users,
  type LucideIcon,
} from "lucide-react"

export type Role = "seeker" | "recruiter" | "admin"

export type NavItem = {
  title: string
  url: string
  icon: LucideIcon
  /** Only mark active on an exact pathname match (used for dashboard roots). */
  exact?: boolean
}

export const roleLabels: Record<Role, string> = {
  seeker: "Job Seeker",
  recruiter: "Recruiter",
  admin: "Administrator",
}

/** Landing page for each role. */
export const dashboardHome: Record<Role, string> = {
  seeker: "/dashboard/seeker",
  recruiter: "/dashboard/recruiter",
  admin: "/dashboard/admin",
}

export function isRole(value: unknown): value is Role {
  return value === "seeker" || value === "recruiter" || value === "admin"
}

/** Narrows an unknown role value to a known role (falls back to "seeker"). */
export function resolveRole(role: unknown): Role {
  return isRole(role) ? role : "seeker"
}

/**
 * Per-role chrome settings.
 *
 * `userBadge` is placeholder copy until a plan/tier field exists on the user.
 */
export const roleMeta: Record<
  Role,
  {
    brandSubtitle: string
    userBadge?: string
    searchPlaceholder?: string
    primaryAction?: { label: string; url: string }
  }
> = {
  seeker: {
    brandSubtitle: "Job Seeker",
    userBadge: "Professional Tier",
    searchPlaceholder: "Search for opportunities...",
    primaryAction: { label: "Post Resume", url: "/dashboard/seeker/profile" },
  },
  recruiter: {
    brandSubtitle: "Recruiter",
    userBadge: "Premium account",
  },
  admin: {
    brandSubtitle: "Admin Console",
    userBadge: "Super Admin",
    searchPlaceholder: "Global search...",
  },
}

/** Sidebar menu per role — mirrors the provided UI samples. */
export const dashboardNav: Record<Role, NavItem[]> = {
  seeker: [
    {
      title: "Dashboard",
      url: "/dashboard/seeker",
      icon: LayoutDashboard,
      exact: true,
    },
    { title: "Jobs", url: "/dashboard/seeker/jobs", icon: Briefcase },
    { title: "Saved Jobs", url: "/dashboard/seeker/saved-jobs", icon: Bookmark },
    { title: "Applications", url: "/dashboard/seeker/applications", icon: FileText },
    { title: "Billing", url: "/dashboard/seeker/billing", icon: CreditCard },
    { title: "Settings", url: "/dashboard/seeker/settings", icon: Settings },
  ],
  recruiter: [
    {
      title: "Dashboard",
      url: "/dashboard/recruiter",
      icon: LayoutDashboard,
      exact: true,
    },
    { title: "Add Job", url: "/dashboard/recruiter/jobs/new", icon: Plus },
    {
      title: "Manage Jobs",
      url: "/dashboard/recruiter/jobs",
      icon: Briefcase,
      exact: true,
    },
    { title: "Applications", url: "/dashboard/recruiter/applications", icon: FileText },
    { title: "Settings", url: "/dashboard/recruiter/settings", icon: Settings },
  ],
  admin: [
    {
      title: "Dashboard",
      url: "/dashboard/admin",
      icon: LayoutDashboard,
      exact: true,
    },
    { title: "Users", url: "/dashboard/admin/users", icon: Users },
    { title: "Companies", url: "/dashboard/admin/companies", icon: Building2 },
    { title: "Jobs", url: "/dashboard/admin/jobs", icon: Briefcase },
    { title: "Payments", url: "/dashboard/admin/payments", icon: CreditCard },
    { title: "Settings", url: "/dashboard/admin/settings", icon: Settings },
  ],
}
