export type JobStatus = "active" | "closed"

export type JobDoc = {
  _id: string
  jobTitle: string
  companyName: string
  jobCategory?: string
  jobType?: string
  remoteAllowed?: boolean
  jobLocation?: string
  applicationDeadline?: string
  minSalary?: number | string | null
  maxSalary?: number | string | null
  salaryFrequency?: string
  keyResponsibilities?: string
  qualifications?: string
  applicant?: number
  status?: JobStatus
  createdAt?: string
}

const FREQUENCY_SUFFIX: Record<string, string> = {
  "per hour": "/hr",
  "per day": "/day",
  "per month": "/mo",
  "per year": "/yr",
}

function toAmount(value: number | string | null | undefined): number | null {
  if (value === null || value === undefined || value === "") return null
  const amount = typeof value === "number" ? value : Number(value)
  return Number.isFinite(amount) ? amount : null
}

/** 80000 -> "80k", 950 -> "950" */
function compactAmount(value: number) {
  return value >= 1000 ? `${Math.round(value / 100) / 10}k` : `${value}`
}

export function compensationParts(job: JobDoc) {
  const min = toAmount(job.minSalary)
  const max = toAmount(job.maxSalary)
  const suffix = FREQUENCY_SUFFIX[job.salaryFrequency ?? ""] ?? ""

  if (min === null && max === null) return { amount: "—", suffix: "" }

  if (min !== null && max !== null) {
    return {
      amount: `€${compactAmount(min)} - €${compactAmount(max)}`,
      suffix,
    }
  }

  return { amount: `€${compactAmount((min ?? max) as number)}`, suffix }
}

/** "€80k - €120k /yr" */
export function formatCompensation(job: JobDoc) {
  const { amount, suffix } = compensationParts(job)
  return suffix ? `${amount} ${suffix}` : amount
}

export function formatDeadline(value?: string) {
  if (!value) return "—"

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  })
}

/** Deadline is inclusive of the whole day it lands on. */
export function isExpired(job: JobDoc) {
  if (!job.applicationDeadline) return false

  const date = new Date(job.applicationDeadline)
  if (Number.isNaN(date.getTime())) return false

  date.setHours(23, 59, 59, 999)
  return date.getTime() < Date.now()
}

/** A job is closed once it is explicitly closed or its deadline has passed. */
export function isJobClosed(job: JobDoc) {
  return job.status === "closed" || isExpired(job)
}

export function formatUpdated(createdAt?: string) {
  if (!createdAt) return null

  const created = new Date(createdAt)
  if (Number.isNaN(created.getTime())) return null

  const minutes = Math.floor((Date.now() - created.getTime()) / 60_000)
  if (minutes < 1) return "Updated just now"
  if (minutes < 60) return `Updated ${minutes}m ago`

  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `Updated ${hours}h ago`

  const days = Math.floor(hours / 24)
  if (days < 7) return `Updated ${days}d ago`

  const weeks = Math.floor(days / 7)
  if (weeks < 5) return `Updated ${weeks}w ago`

  return `Updated ${Math.max(1, Math.floor(days / 30))}mo ago`
}

export function formatLocation(job: JobDoc) {
  const place = job.jobLocation?.trim()

  if (!place) return job.remoteAllowed ? "Remote" : "—"
  return job.remoteAllowed ? `Remote - ${place}` : place
}

/** Rough monthly equivalent so jobs with different pay frequencies can be compared. */
export function monthlySalary(job: JobDoc): number | null {
  const min = toAmount(job.minSalary)
  if (min === null) return null

  switch (job.salaryFrequency) {
    case "per hour":
      return min * 160
    case "per day":
      return min * 20
    case "per year":
      return Math.round(min / 12)
    default:
      return min
  }
}
