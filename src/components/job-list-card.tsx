import Link from "next/link"
import { ArrowUpRight, Briefcase, Building2, Clock, MapPin } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { compensationParts, formatLocation, type JobDoc } from "@/lib/jobs"

const badgeClass =
  "h-6 gap-1.5 rounded-full border-white/10 bg-white/[0.03] px-2.5 text-[11px] font-normal text-white/60"

export function JobListCard({ job }: { job: JobDoc }) {
  const { amount, suffix } = compensationParts(job)
  const salary = suffix ? `${amount} ${suffix}` : amount

  return (
    <Link
      href={`/jobs/${job._id}`}
      className="group block h-full rounded-2xl bg-[#0f0f12] p-5 ring-1 ring-white/[0.07] transition-colors duration-300 hover:ring-white/[0.18] focus-visible:ring-2 focus-visible:ring-[#8b7cf6]/60 focus-visible:outline-none"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate text-base font-semibold tracking-tight text-white">
            {job.jobTitle}
          </h3>
          <p className="mt-1 flex items-center gap-1.5 text-[13px] text-white/45">
            <Building2 className="size-3.5 shrink-0 text-white/30" />
            <span className="truncate">{job.companyName}</span>
          </p>
        </div>
        <ArrowUpRight className="mt-0.5 size-4 shrink-0 text-white/25 transition-colors group-hover:text-white/70" />
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <Badge variant="outline" className={badgeClass}>
          <MapPin className="size-3 text-white/40" />
          {formatLocation(job)}
        </Badge>
        <Badge variant="outline" className={badgeClass}>
          <Briefcase className="size-3 text-white/40" />
          {job.jobType || "—"}
        </Badge>
        <Badge variant="outline" className={badgeClass}>
          <Clock className="size-3 text-white/40" />
          {salary}
        </Badge>
      </div>

      {job.jobCategory ? (
        <p className="mt-4 text-[10px] font-medium tracking-[0.16em] text-white/25 uppercase">
          {job.jobCategory}
        </p>
      ) : null}
    </Link>
  )
}
