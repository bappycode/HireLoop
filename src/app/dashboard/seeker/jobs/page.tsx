import { PagePlaceholder } from "@/app/dashboard/_components/page-placeholder"
import { requireRole } from "@/lib/session"

export default async function Page() {
  await requireRole("seeker")

  return (
    <PagePlaceholder
      title="Jobs"
      description="Browse open roles and find your next opportunity."
    />
  )
}