import { PagePlaceholder } from "@/app/dashboard/_components/page-placeholder"
import { requireRole } from "@/lib/session"

export default async function Page() {
  await requireRole("recruiter")

  return (
    <PagePlaceholder
      title="Applications"
      description="Review the candidates who applied."
    />
  )
}