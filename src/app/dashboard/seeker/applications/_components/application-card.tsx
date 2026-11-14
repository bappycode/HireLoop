import Link from "next/link"
import type { ReactNode } from "react"
import { ArrowUpRight, Building2, FileText, MapPin } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  applicationStatusMeta,
  formatAppliedDate,
  type ApplicationDoc,
} from "@/lib/applications"

function Meta({ icon, value }: { icon: ReactNode; value: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      {icon}
      {value}
    </span>
  )
}

export function ApplicationCard({
  application,
}: {
  application: ApplicationDoc
}) {
  const status = applicationStatusMeta(application.status)

  return (
    <article className="rounded-xl border border-border bg-card/40 p-4 transition-colors hover:bg-card/70">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate text-sm font-medium">
            {application.jobTitle}
          </h3>
          <p className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
            <Meta
              icon={<Building2 className="size-3.5" />}
              value={application.companyName}
            />
            {application.jobLocation ? (
              <Meta
                icon={<MapPin className="size-3.5" />}
                value={application.jobLocation}
              />
            ) : null}
            {application.jobType ? <span>{application.jobType}</span> : null}
          </p>
        </div>

        <Badge
          variant="outline"
          className={`h-6 rounded-full px-2.5 text-[11px] font-normal ${status.className}`}
        >
          {status.label}
        </Badge>
      </div>

      {application.coverLetter ? (
        <p className="mt-3 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
          {application.coverLetter}
        </p>
      ) : null}

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-[11px] text-muted-foreground">
          {formatAppliedDate(application.createdAt)}
        </p>

        <div className="flex items-center gap-3">
          {application.resumeLink ? (
            <a
              href={application.resumeLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-[11px] text-muted-foreground transition-colors hover:text-foreground"
            >
              <FileText className="size-3.5" />
              Resume
            </a>
          ) : null}

          <Button
            variant="outline"
            size="sm"
            className="gap-1.5"
            nativeButton={false}
            render={<Link href={`/jobs/${application.jobId}`} />}
          >
            View job
            <ArrowUpRight />
          </Button>
        </div>
      </div>
    </article>
  )
}
