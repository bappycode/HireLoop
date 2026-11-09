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
}

export type CreatedJob = JobPayload & { _id: string; createdAt: string }

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:5000"

export async function createJob(data: JobPayload): Promise<CreatedJob> {
  const response = await fetch(`${baseUrl}/jobs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const body = await response.text().catch(() => "")
    throw new Error(body || `Failed to create job (HTTP ${response.status})`)
  }

  return response.json()
}

export async function deleteJob(id: string): Promise<{ deleted: boolean; _id: string }> {
  const response = await fetch(`${baseUrl}/jobs/${id}`, {
    method: "DELETE",
  })

  if (!response.ok) {
    const body = await response.text().catch(() => "")
    throw new Error(body || `Failed to delete job (HTTP ${response.status})`)
  }

  return response.json()
}
