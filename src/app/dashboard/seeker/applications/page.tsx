import Link from "next/link"
import { FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { ApplicationDoc } from "@/lib/applications"
import { getApplications } from "@/lib/applications-server"
import { requireRole } from "@/lib/session"
import { ApplicationCard } from "./_components/application-card"

export default async function Page() {
  const session = await requireRole("seeker")

  let applications: ApplicationDoc[] = []
  let unavailable = false

  try {
    applications = await getApplications(session.user.id)
  } catch {
    unavailable = true
  }

  return (
    <div className="flex flex-1 flex-col gap-6">
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold tracking-tight">Applications</h2>
        <p className="text-sm text-muted-foreground">
          Track the status of every application.
        </p>
      </div>

      {unavailable ? (
        <div className="flex flex-1 flex-col items-center justify-center rounded-xl border border-dashed border-border px-6 py-16 text-center text-sm text-muted-foreground">
          Applications are temporarily unavailable — please check back in a
          moment.
        </div>
      ) : applications.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-4 rounded-xl border border-border bg-card/40 px-6 py-16 text-center">
          <div className="flex size-12 items-center justify-center rounded-full bg-muted">
            <FileText className="size-5 text-muted-foreground" />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium">No applications yet</p>
            <p className="max-w-sm text-sm text-muted-foreground">
              Roles you apply for will appear here so you can follow their
              progress.
            </p>
          </div>
          <Button
            size="sm"
            className="gap-1.5"
            nativeButton={false}
            render={<Link href="/jobs" />}
          >
            Browse open roles
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          {applications.map((application) => (
            <ApplicationCard
              key={application._id}
              application={application}
            />
          ))}
        </div>
      )}
    </div>
  )
}
