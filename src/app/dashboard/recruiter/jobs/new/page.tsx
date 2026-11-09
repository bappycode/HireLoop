import { requireRole } from "@/lib/session"
import { AddJobForm } from "./add-job-form"

export default async function NewJobPage() {
  await requireRole("recruiter")

  return <AddJobForm />
}
