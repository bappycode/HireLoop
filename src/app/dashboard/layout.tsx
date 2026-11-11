import type { Metadata } from "next"
import { cookies } from "next/headers"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { TooltipProvider } from "@/components/ui/tooltip"
import { resolveRole } from "@/lib/dashboard-nav"
import { requireUser } from "@/lib/session"
import { AppSidebar } from "./_components/app-sidebar"
import { DashboardHeader } from "./_components/dashboard-header"

export const metadata: Metadata = {
  title: "Dashboard — HireLoop",
  description: "Manage your HireLoop account, jobs and applications.",
}

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await requireUser()
  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get("sidebar_state")?.value !== "false"
  const role = resolveRole(session.user.role)

  return (
    <div className="dark dashboard-shell min-h-svh bg-background text-foreground">
      <TooltipProvider>
        <SidebarProvider defaultOpen={defaultOpen}>
          <AppSidebar
            user={{
              name: session.user.name,
              role,
            }}
          />
          <SidebarInset>
            <DashboardHeader role={role} name={session.user.name} />
            <div className="flex flex-1 flex-col gap-4 p-4 md:p-6">
              {children}
            </div>
          </SidebarInset>
        </SidebarProvider>
      </TooltipProvider>
    </div>
  )
}
