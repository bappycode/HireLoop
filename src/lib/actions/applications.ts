import { apiUrl } from "@/lib/api"
import type { ApplicationDoc, ApplicationPayload } from "@/lib/applications"

/** Number of applications the seeker has already submitted. */
export async function getApplicationCount(applicantId: string): Promise<number> {
  const query = new URLSearchParams({ applicantId })
  const response = await fetch(apiUrl(`/applications/count?${query}`), {
    cache: "no-store",
  })

  if (!response.ok) {
    throw new Error(
      `Could not check your application limit (HTTP ${response.status})`
    )
  }

  const data = (await response.json()) as { count?: number }
  return typeof data.count === "number" ? data.count : 0
}

export async function applyJob(
  payload: ApplicationPayload
): Promise<ApplicationDoc> {
  const response = await fetch(apiUrl("/applications"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    const message = await response
      .json()
      .then((body: { message?: string } | null) => body?.message)
      .catch(() => undefined)

    throw new Error(
      message || `Failed to submit your application (HTTP ${response.status})`
    )
  }

  return response.json()
}
