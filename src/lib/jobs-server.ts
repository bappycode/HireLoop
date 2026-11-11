import { apiUrl } from "./api"
import { jobFilterParams, type JobFilters } from "./job-filters"
import type { JobDoc } from "./jobs"

export async function getJobs(filters?: JobFilters): Promise<JobDoc[]> {
  const query = filters ? jobFilterParams(filters).toString() : ""
  const response = await fetch(
    apiUrl(`/jobs${query ? `?${query}` : ""}`),
    { cache: "no-store" }
  )

  if (!response.ok) {
    throw new Error(`Could not load job posts (HTTP ${response.status}).`)
  }

  const data = await response.json()
  return Array.isArray(data) ? (data as JobDoc[]) : []
}

export async function getJob(id: string): Promise<JobDoc | null> {
  const response = await fetch(apiUrl(`/jobs/${id}`), { cache: "no-store" })

  if (response.status === 404) return null

  if (!response.ok) {
    throw new Error(`Could not load this job (HTTP ${response.status}).`)
  }

  return (await response.json()) as JobDoc
}
