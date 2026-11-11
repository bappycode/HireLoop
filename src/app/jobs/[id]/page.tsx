import Link from "next/link"
import { notFound } from "next/navigation"
import {
  ArrowLeft,
  Building2,
  CalendarClock,
  Clock,
  MapPin,
  Wallet,
} from "lucide-react"
import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import { Badge } from "@/components/ui/badge"
import {
  formatCompensation,
  formatDeadline,
  formatLocation,
  isJobClosed,
  type JobDoc,
} from "@/lib/jobs"
import { getJob } from "@/lib/jobs-server"

const badgeClass =
  "h-6 gap-1.5 rounded-full border-white/10 bg-white/[0.03] px-2.5 text-[11px] font-normal text-white/60"

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <dt className="text-white/40">{label}</dt>
      <dd className="text-right text-white/75">{value}</dd>
    </div>
  )
}

export default async function JobDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  let job: JobDoc | null = null
  try {
    job = await getJob(id)
  } catch {
    job = null
  }

  if (!job) notFound()

  const salary = formatCompensation(job)
  const closed = isJobClosed(job)

  return (
    <div className="min-h-screen bg-[#050508] text-white">
      <Navbar />

      <main className="px-4 pt-12 pb-24 sm:px-6">
        <div className="mx-auto max-w-[1080px]">
          <Link
            href="/jobs"
            className="inline-flex items-center gap-1.5 text-[13px] text-white/45 transition-colors hover:text-white"
          >
            <ArrowLeft className="size-3.5" />
            Back to all jobs
          </Link>

          <div className="mt-6 flex flex-wrap items-start justify-between gap-4">
            <div className="min-w-0">
              <h1 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
                {job.jobTitle}
              </h1>
              <p className="mt-2 flex items-center gap-2 text-sm text-white/50">
                <Building2 className="size-4 text-white/35" />
                {job.companyName}
              </p>
            </div>

            {closed ? (
              <Badge
                variant="outline"
                className="h-6 rounded-full border-rose-400/30 bg-rose-500/10 px-3 text-[11px] text-rose-300"
              >
                Applications closed
              </Badge>
            ) : (
              <Badge
                variant="outline"
                className="h-6 rounded-full border-emerald-400/30 bg-emerald-500/10 px-3 text-[11px] text-emerald-300"
              >
                Actively hiring
              </Badge>
            )}
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            <Badge variant="outline" className={badgeClass}>
              <MapPin className="size-3 text-white/40" />
              {formatLocation(job)}
            </Badge>
            <Badge variant="outline" className={badgeClass}>
              <Clock className="size-3 text-white/40" />
              {job.jobType || "—"}
            </Badge>
            <Badge variant="outline" className={badgeClass}>
              <Wallet className="size-3 text-white/40" />
              {salary}
            </Badge>
            <Badge variant="outline" className={badgeClass}>
              <CalendarClock className="size-3 text-white/40" />
              Apply by {formatDeadline(job.applicationDeadline)}
            </Badge>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_320px] lg:items-start">
            <div className="space-y-8">
              <section>
                <h2 className="text-[11px] font-semibold tracking-[0.18em] text-white/40 uppercase">
                  Key Responsibilities
                </h2>
                <p className="mt-3 text-sm leading-relaxed whitespace-pre-line text-white/70">
                  {job.keyResponsibilities || "No responsibilities listed."}
                </p>
              </section>

              <section>
                <h2 className="text-[11px] font-semibold tracking-[0.18em] text-white/40 uppercase">
                  Qualifications &amp; Requirements
                </h2>
                <p className="mt-3 text-sm leading-relaxed whitespace-pre-line text-white/70">
                  {job.qualifications || "No qualifications listed."}
                </p>
              </section>
            </div>

            <aside className="rounded-2xl bg-[#0f0f12] p-5 ring-1 ring-white/[0.07]">
              <h2 className="text-sm font-medium text-white">Job overview</h2>

              <dl className="mt-4 space-y-3 text-[13px]">
                <Row label="Category" value={job.jobCategory || "—"} />
                <Row label="Job type" value={job.jobType || "—"} />
                <Row label="Location" value={formatLocation(job)} />
                <Row label="Compensation" value={salary} />
                <Row
                  label="Deadline"
                  value={formatDeadline(job.applicationDeadline)}
                />
              </dl>

              {closed ? (
                <div className="mt-5 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2.5 text-center text-[13px] text-white/45">
                  Applications are closed
                </div>
              ) : (
                <>
                  <Link
                    href="/signin"
                    className="mt-5 inline-flex h-10 w-full items-center justify-center rounded-lg bg-gradient-to-b from-[#8373ff] to-[#5b4be8] text-sm font-medium text-white shadow-[0_4px_18px_-6px_rgba(109,93,246,0.8)] transition hover:brightness-110"
                  >
                    Apply for this role
                  </Link>
                  <p className="mt-3 text-center text-[11px] text-white/30">
                    You&apos;ll be asked to sign in to apply.
                  </p>
                </>
              )}
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
