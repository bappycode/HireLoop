import { PagePlaceholder } from "@/app/dashboard/_components/page-placeholder"
import { requireRole } from "@/lib/session"

export default async function Page() {
  await requireRole("recruiter")

  return (
    <PagePlaceholder
      title="Update Job Post"
      description="Editing job posts is coming soon."
    />
  )
}
