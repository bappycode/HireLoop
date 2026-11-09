import { PagePlaceholder } from "@/app/dashboard/_components/page-placeholder"
import { requireRole } from "@/lib/session"

export default async function Page() {
  await requireRole("recruiter")

  return (
    <PagePlaceholder
      title="Settings"
      description="Company details and account preferences."
    />
  )
}