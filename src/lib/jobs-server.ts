import type { JobDoc } from "./jobs"

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:5000"

export async function getJobs(): Promise<JobDoc[]> {
  const response = await fetch(`${baseUrl}/jobs`, { cache: "no-store" })

  if (!response.ok) {
    throw new Error(`Could not load job posts (HTTP ${response.status}).`)
  }

  const data = await response.json()
  return Array.isArray(data) ? (data as JobDoc[]) : []
}

export async function getJob(id: string): Promise<JobDoc | null> {
  const response = await fetch(`${baseUrl}/jobs/${id}`, { cache: "no-store" })

  if (response.status === 404) return null

  if (!response.ok) {
    throw new Error(`Could not load this job (HTTP ${response.status}).`)
  }

  return (await response.json()) as JobDoc
}
