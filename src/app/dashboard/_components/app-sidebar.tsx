"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { LogOut } from "lucide-react"
import { authClient } from "@/lib/auth-client"
import {
  dashboardNav,
  roleLabels,
  roleMeta,
  type NavItem,
  type Role,
} from "@/lib/dashboard-nav"
import { getInitials } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar"

type AppSidebarProps = {
  user: {
    name: string
    role: Role
  }
}

function isActive(pathname: string, item: NavItem) {
  if (item.exact) return pathname === item.url
  return pathname === item.url || pathname.startsWith(`${item.url}/`)
}

export function AppSidebar({ user }: AppSidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const items = dashboardNav[user.role]
  const meta = roleMeta[user.role]

  const handleSignOut = async () => {
    await authClient.signOut()
    router.push("/signin")
    router.refresh()
  }

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="gap-3 p-3">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="hover:bg-transparent"
              render={<Link href="/" />}
            >
              <Image
                src="/images/logo.png"
                alt="HireLoop"
                width={154}
                height={44}
                className="h-7 w-auto group-data-[collapsible=icon]:hidden"
                priority
              />
              <span className="hidden size-8 shrink-0 items-center justify-center rounded-lg bg-violet-600 text-sm font-bold text-white group-data-[collapsible=icon]:flex">
                H
              </span>
              <div className="grid flex-1 text-left leading-tight group-data-[collapsible=icon]:hidden">
                <span className="truncate text-xs text-muted-foreground">
                  {meta.brandSubtitle}
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        <div className="flex items-center gap-2 rounded-xl border border-sidebar-border bg-sidebar-accent/40 p-2 group-data-[collapsible=icon]:hidden">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-semibold">
            {getInitials(user.name)}
          </div>
          <div className="grid min-w-0 flex-1 leading-tight">
            <span className="truncate text-sm font-semibold">{user.name}</span>
            <span className="truncate text-xs text-muted-foreground">
              {roleLabels[user.role]}
            </span>
          </div>
          {meta.userBadge ? (
            <Badge variant="secondary" className="shrink-0 px-1.5 text-[10px]">
              {meta.userBadge}
            </Badge>
          ) : null}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup className="py-2">
          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {items.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton
                    tooltip={item.title}
                    isActive={isActive(pathname, item)}
                    className="h-9"
                    render={<Link href={item.url} />}
                  >
                    <item.icon />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="gap-2 p-3">
        {meta.primaryAction ? (
          <Button
            size="lg"
            className="w-full bg-white text-black hover:bg-white/90 group-data-[collapsible=icon]:hidden"
            nativeButton={false}
            render={<Link href={meta.primaryAction.url} />}
          >
            {meta.primaryAction.label}
          </Button>
        ) : null}

        <SidebarSeparator className="group-data-[collapsible=icon]:hidden" />

        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Logout" onClick={handleSignOut}>
              <LogOut />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
