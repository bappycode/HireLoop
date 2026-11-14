"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import { authClient } from "@/lib/auth-client"
import { FREE_APPLICATION_LIMIT } from "@/lib/applications"
import { getApplicationCount } from "@/lib/actions/applications"
import { ApplyJobDialog } from "@/components/apply-job-dialog"
import { Button } from "@/components/ui/button"

const applyButtonClass =
  "mt-5 h-10 w-full gap-1.5 rounded-lg bg-gradient-to-b from-[#8373ff] to-[#5b4be8] text-sm font-medium text-white shadow-[0_4px_18px_-6px_rgba(109,93,246,0.8)] transition hover:brightness-110"

export default function ApplyButton({
  jobId,
  jobTitle,
}: {
  jobId: string
  jobTitle: string
}) {
  const router = useRouter()
  const { data: session, isPending } = authClient.useSession()
  const [open, setOpen] = useState(false)
  const [isCheckingLimit, setIsCheckingLimit] = useState(false)
  const user = session?.user

  if (user && user.role !== "seeker") {
    return (
      <p className="mt-5 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2.5 text-center text-[13px] text-white/45">
        Only job seeker accounts can apply for this role.
      </p>
    )
  }

  const handleApplyClick = async () => {
    if (isPending || isCheckingLimit) return

    if (!user) {
      router.push(`/signin?redirectTo=/jobs/${jobId}`)
      return
    }

    setIsCheckingLimit(true)

    try {
      const appliedCount = await getApplicationCount(user.id)
      if (appliedCount >= FREE_APPLICATION_LIMIT) {
        router.push("/payment")
        return
      }

      setOpen(true)
    } catch {
      // Let the apply request enforce the limit if the check itself fails.
      setOpen(true)
    } finally {
      setIsCheckingLimit(false)
    }
  }

  return (
    <div>
      <Button
        type="button"
        onClick={handleApplyClick}
        disabled={isPending || isCheckingLimit}
        className={applyButtonClass}
      >
        {isCheckingLimit ? <Loader2 className="animate-spin" /> : null}
        {isCheckingLimit ? "Checking..." : "Apply for this role"}
      </Button>

      {!user && !isPending ? (
        <p className="mt-3 text-center text-[11px] text-white/30">
          You&apos;ll be asked to sign in to apply.
        </p>
      ) : null}

      {user ? (
        <ApplyJobDialog
          jobId={jobId}
          jobTitle={jobTitle}
          applicant={{ id: user.id, name: user.name, email: user.email }}
          open={open}
          onOpenChange={setOpen}
        />
      ) : null}
    </div>
  )
}
