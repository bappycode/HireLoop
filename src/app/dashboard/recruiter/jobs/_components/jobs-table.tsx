import Link from "next/link"
import {
  Boxes,
  Briefcase,
  Code2,
  MapPin,
  Megaphone,
  MoreVertical,
  Pencil,
  PenTool,
  Plus,
  Settings2,
  TrendingUp,
  Users,
  Wallet,
  type LucideIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  compensationParts,
  formatDeadline,
  formatLocation,
  formatUpdated,
  isExpired,
  type JobDoc,
} from "@/lib/jobs"
import { JobDeleteButton } from "./job-delete-button"

const categoryStyles: Record<string, { icon: LucideIcon; className: string }> = {
  "Engineering & Tech": {
    icon: Code2,
    className: "bg-violet-500/15 text-violet-300",
  },
  Design: { icon: PenTool, className: "bg-orange-500/15 text-orange-300" },
  Product: { icon: Boxes, className: "bg-sky-500/15 text-sky-300" },
  Marketing: { icon: Megaphone, className: "bg-fuchsia-500/15 text-fuchsia-300" },
  Sales: { icon: TrendingUp, className: "bg-emerald-500/15 text-emerald-300" },
  Finance: { icon: Wallet, className: "bg-amber-500/15 text-amber-300" },
  Operations: { icon: Settings2, className: "bg-cyan-500/15 text-cyan-300" },
  "Human Resources": { icon: Users, className: "bg-rose-500/15 text-rose-300" },
}

const fallbackStyle: { icon: LucideIcon; className: string } = {
  icon: Briefcase,
  className: "bg-muted text-muted-foreground",
}

const headCell =
  "px-4 py-3 text-[10px] font-semibold tracking-[0.14em] whitespace-nowrap text-muted-foreground uppercase"

export function JobsTable({ jobs }: { jobs: JobDoc[] }) {
  if (jobs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 rounded-xl border border-border bg-card/40 px-6 py-16 text-center">
        <div className="flex size-12 items-center justify-center rounded-full bg-muted">
          <Briefcase className="size-5 text-muted-foreground" />
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium">No job posts yet</p>
          <p className="max-w-sm text-sm text-muted-foreground">
            Create your first listing to start collecting applicants.
          </p>
        </div>
        <Button
          size="sm"
          className="gap-1.5"
          nativeButton={false}
          render={<Link href="/dashboard/recruiter/jobs/new" />}
        >
          <Plus />
          New Job Post
        </Button>
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card/40">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[980px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-border bg-white/[0.015]">
              <th className={headCell}>Job Title &amp; Dept</th>
              <th className={headCell}>Company &amp; Location</th>
              <th className={headCell}>Type</th>
              <th className={headCell}>Compensation</th>
              <th className={headCell}>Applicants</th>
              <th className={headCell}>Status</th>
              <th className={headCell}>Deadline</th>
              <th className={cn(headCell, "text-right")}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => {
              const style = categoryStyles[job.jobCategory ?? ""] ?? fallbackStyle
              const Icon = style.icon
              const expired = isExpired(job)
              const compensation = compensationParts(job)
              const updated = formatUpdated(job.createdAt)

              return (
                <tr
                  key={job._id}
                  className="border-b border-border/60 transition-colors last:border-0 hover:bg-white/[0.02]"
                >
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <span
                        className={cn(
                          "flex size-9 shrink-0 items-center justify-center rounded-lg",
                          style.className
                        )}
                      >
                        <Icon className="size-4" />
                      </span>
                      <span className="min-w-0">
                        <span className="block truncate font-medium text-foreground">
                          {job.jobTitle}
                        </span>
                        <span className="block truncate text-xs text-muted-foreground">
                          {job.jobCategory || "General"}
                        </span>
                      </span>
                    </div>
                  </td>

                  <td className="px-4 py-4">
                    <span className="block truncate font-medium text-foreground">
                      {job.companyName}
                    </span>
                    <span className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="size-3 shrink-0" />
                      <span className="truncate">{formatLocation(job)}</span>
                    </span>
                  </td>

                  <td className="px-4 py-4">
                    <span className="inline-flex items-center rounded-md border border-border px-2 py-0.5 text-xs whitespace-nowrap text-muted-foreground">
                      {job.jobType || "—"}
                    </span>
                  </td>

                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className="font-medium text-foreground">
                      {compensation.amount}
                    </span>
                    {compensation.suffix ? (
                      <span className="text-muted-foreground">
                        {" "}
                        {compensation.suffix}
                      </span>
                    ) : null}
                  </td>

                  <td className="px-4 py-4">
                    <span className="flex items-center gap-1.5 text-xs whitespace-nowrap text-muted-foreground">
                      <Users className="size-3.5" />0 Candidates
                    </span>
                  </td>

                  <td className="px-4 py-4">
                    <span
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium whitespace-nowrap",
                        expired
                          ? "bg-rose-500/10 text-rose-400"
                          : "bg-emerald-500/10 text-emerald-400"
                      )}
                    >
                      <span
                        className={cn(
                          "size-1.5 rounded-full",
                          expired ? "bg-rose-400" : "bg-emerald-400"
                        )}
                      />
                      {expired ? "Expired" : "Active"}
                    </span>
                  </td>

                  <td className="px-4 py-4">
                    <span className="block text-sm whitespace-nowrap">
                      {formatDeadline(job.applicationDeadline)}
                    </span>
                    <span className="block text-xs whitespace-nowrap text-muted-foreground">
                      {expired ? "Closed" : (updated ?? "—")}
                    </span>
                  </td>

                  <td className="px-4 py-4">
                    <div className="flex items-center justify-end gap-1.5">
                      <Button
                        size="xs"
                        className="gap-1 bg-violet-600 text-white hover:bg-violet-500"
                        nativeButton={false}
                        render={
                          <Link
                            href={`/dashboard/recruiter/jobs/${job._id}/edit`}
                          />
                        }
                      >
                        <Pencil />
                        Update
                      </Button>
                      <JobDeleteButton id={job._id} title={job.jobTitle} />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon-xs"
                        aria-label={`More actions for ${job.jobTitle}`}
                        className="text-muted-foreground"
                      >
                        <MoreVertical />
                      </Button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
