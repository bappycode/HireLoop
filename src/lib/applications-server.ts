import { apiUrl } from "./api"
import type { ApplicationDoc } from "./applications"

export async function getApplications(
  applicantId: string
): Promise<ApplicationDoc[]> {
  const query = new URLSearchParams({ applicantId })
  const response = await fetch(apiUrl(`/applications?${query}`), {
    cache: "no-store",
  })

  if (!response.ok) {
    throw new Error(
      `Could not load your applications (HTTP ${response.status}).`
    )
  }

  const data = await response.json()
  return Array.isArray(data) ? (data as ApplicationDoc[]) : []
}
