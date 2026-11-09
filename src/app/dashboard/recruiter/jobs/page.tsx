import Link from "next/link"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getJobs } from "@/lib/jobs-server"
import type { JobDoc } from "@/lib/jobs"
import { requireRole } from "@/lib/session"
import { JobsTable } from "./_components/jobs-table"

export default async function Page() {
  await requireRole("recruiter")

  let jobs: JobDoc[] = []
  let loadError: string | null = null

  try {
    jobs = await getJobs()
  } catch (error) {
    loadError =
      error instanceof Error ? error.message : "Could not load job posts."
  }

  return (
    <div className="flex flex-1 flex-col gap-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">
            <Link
              href="/dashboard/recruiter/jobs"
              className="text-violet-400 hover:underline"
            >
              Manage Jobs
            </Link>
            <span className="px-1">›</span>
            Job Listings &amp; Postings
          </p>
          <h2 className="text-2xl font-semibold tracking-tight">
            Manage Job Posts
          </h2>
          <p className="text-sm text-muted-foreground">
            Review live listings, monitor applicants, and update job details
            across your organization.
          </p>
        </div>

        <Button
          size="lg"
          className="gap-2"
          nativeButton={false}
          render={<Link href="/dashboard/recruiter/jobs/new" />}
        >
          <Plus />
          New Job Post
        </Button>
      </div>

      {loadError ? (
        <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-sm">
          <p className="font-medium text-destructive">
            Couldn&apos;t load job posts
          </p>
          <p className="mt-1 text-destructive/80">{loadError}</p>
          <p className="mt-2 text-xs text-destructive/70">
            Make sure the HireLoop server is running on port 5000.
          </p>
        </div>
      ) : (
        <JobsTable jobs={jobs} />
      )}
    </div>
  )
}
