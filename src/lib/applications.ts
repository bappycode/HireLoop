export type ApplicationStatus =
  | "pending"
  | "reviewing"
  | "shortlisted"
  | "rejected"
  | "hired"

/** Applications a free seeker can submit before being asked to upgrade. */
export const FREE_APPLICATION_LIMIT = 10

export type ApplicationDoc = {
  _id: string
  jobId: string
  jobTitle: string
  companyName: string
  jobType?: string
  jobLocation?: string
  applicantId: string
  applicantName: string
  applicantEmail: string
  resumeLink?: string
  coverLetter?: string
  status?: ApplicationStatus
  createdAt?: string
}

/** Fields the client sends when creating an application. */
export type ApplicationPayload = {
  jobId: string
  applicantId: string
  applicantName: string
  applicantEmail: string
  resumeLink: string
  coverLetter: string
}

const STATUS_META: Record<
  ApplicationStatus,
  { label: string; className: string }
> = {
  pending: {
    label: "Pending review",
    className: "border-amber-400/30 bg-amber-500/10 text-amber-300",
  },
  reviewing: {
    label: "Under review",
    className: "border-sky-400/30 bg-sky-500/10 text-sky-300",
  },
  shortlisted: {
    label: "Shortlisted",
    className: "border-emerald-400/30 bg-emerald-500/10 text-emerald-300",
  },
  rejected: {
    label: "Not selected",
    className: "border-rose-400/30 bg-rose-500/10 text-rose-300",
  },
  hired: {
    label: "Hired",
    className: "border-violet-400/30 bg-violet-500/10 text-violet-300",
  },
}

export function applicationStatusMeta(status?: ApplicationStatus) {
  return STATUS_META[status ?? "pending"] ?? STATUS_META.pending
}

/** "Applied Nov 14, 2026" */
export function formatAppliedDate(value?: string) {
  if (!value) return "Applied recently"

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return "Applied recently"

  return `Applied ${date.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  })}`
}
