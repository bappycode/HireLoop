import { PagePlaceholder } from "@/app/dashboard/_components/page-placeholder"
import { requireRole } from "@/lib/session"

export default async function Page() {
  await requireRole("admin")

  return (
    <PagePlaceholder
      title="Payments"
      description="Subscription transactions and revenue."
    />
  )
}