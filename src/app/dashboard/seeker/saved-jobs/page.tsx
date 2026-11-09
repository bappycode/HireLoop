import { PagePlaceholder } from "@/app/dashboard/_components/page-placeholder"
import { requireRole } from "@/lib/session"

export default async function Page() {
  await requireRole("seeker")

  return (
    <PagePlaceholder
      title="Saved Jobs"
      description="Roles you bookmarked to revisit later."
    />
  )
}