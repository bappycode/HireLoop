"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { Loader2, Trash2 } from "lucide-react"
import { deleteJob } from "@/lib/actions/jobs"
import { Button } from "@/components/ui/button"

export function JobDeleteButton({
  id,
  title,
}: {
  id: string
  title: string
}) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (!window.confirm(`Delete "${title}"? This cannot be undone.`)) return

    setIsDeleting(true)
    try {
      await deleteJob(id)
      startTransition(() => router.refresh())
    } catch (error) {
      console.error("Delete job failed:", error)
      window.alert(
        error instanceof Error ? error.message : "Could not delete this job."
      )
    } finally {
      setIsDeleting(false)
    }
  }

  const busy = isDeleting || isPending

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon-xs"
      aria-label={`Delete ${title}`}
      className="text-muted-foreground hover:text-destructive"
      disabled={busy}
      onClick={handleDelete}
    >
      {busy ? <Loader2 className="animate-spin" /> : <Trash2 />}
    </Button>
  )
}
