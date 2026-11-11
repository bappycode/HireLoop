import type { JobDoc, JobStatus } from "@/lib/jobs"

export type JobPayload = {
  jobTitle: string
  companyName: string
  jobCategory: string
  jobType: string
  remoteAllowed: boolean
  jobLocation: string
  applicationDeadline: string
  minSalary: number | null
  maxSalary: number | null
  salaryFrequency: string
  keyResponsibilities: string
  qualifications: string
  applicant: number
  status: JobStatus
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:5000"

async function jobRequest<T>(
  path: string,
  action: "create" | "delete",
  init?: RequestInit
): Promise<T> {
  const response = await fetch(`${baseUrl}${path}`, init)

  if (!response.ok) {
    const body = await response.text().catch(() => "")
    throw new Error(body || `Failed to ${action} job (HTTP ${response.status})`)
  }

  return response.json()
}

export function createJob(data: JobPayload): Promise<JobDoc> {
  return jobRequest<JobDoc>("/jobs", "create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
}

export function deleteJob(id: string): Promise<{ deleted: boolean; _id: string }> {
  return jobRequest(`/jobs/${id}`, "delete", { method: "DELETE" })
}
