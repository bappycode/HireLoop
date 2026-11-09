"use client"

import { usePathname } from "next/navigation"
import { Bell, CircleHelp, Mail, Search } from "lucide-react"
import { dashboardNav, roleMeta, type Role } from "@/lib/dashboard-nav"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"

const allItems = Object.values(dashboardNav).flat()

function titleFor(pathname: string) {
  const match = allItems
    .filter(
      (item) => pathname === item.url || pathname.startsWith(`${item.url}/`)
    )
    .sort((a, b) => b.url.length - a.url.length)[0]

  return match?.title ?? "Dashboard"
}

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase()
}

export function DashboardHeader({ role, name }: { role: Role; name: string }) {
  const pathname = usePathname()
  const meta = roleMeta[role]

  return (
    <header className="flex h-14 shrink-0 items-center gap-2 border-b border-border px-4">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mx-1 h-4" />
      <h1 className="hidden text-sm font-medium md:block">{titleFor(pathname)}</h1>

      {meta.searchPlaceholder ? (
        <div className="relative ml-1 w-full max-w-xs">
          <Search className="pointer-events-none absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder={meta.searchPlaceholder}
            className="h-8 pl-8"
          />
        </div>
      ) : null}

      <div className="ml-auto flex items-center gap-1">
        {role === "seeker" ? (
          <>
            <Button variant="ghost" size="icon-sm" aria-label="Messages">
              <Mail />
            </Button>
            <Button variant="ghost" size="icon-sm" aria-label="Notifications">
              <Bell />
            </Button>
          </>
        ) : null}

        {role === "admin" ? (
          <>
            <Button variant="ghost" size="icon-sm" aria-label="Notifications">
              <Bell />
            </Button>
            <Button variant="ghost" size="icon-sm" aria-label="Help">
              <CircleHelp />
            </Button>
          </>
        ) : null}

        <div className="ml-1 flex size-8 items-center justify-center rounded-full bg-muted text-xs font-semibold">
          {initials(name)}
        </div>
      </div>
    </header>
  )
}
