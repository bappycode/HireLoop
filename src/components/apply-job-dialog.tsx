"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { CheckCircle2, Loader2, Send } from "lucide-react"
import { applyJob } from "@/lib/actions/applications"
import type { ApplicationPayload } from "@/lib/applications"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type Applicant = {
  id: string
  name: string
  email: string
}

type SubmitState = "idle" | "submitting" | "success"
const primaryButtonClass =
  "gap-1.5 bg-gradient-to-b from-[#8373ff] to-[#5b4be8] text-white shadow-[0_4px_18px_-6px_rgba(109,93,246,0.8)] hover:brightness-110"

const fieldClass =
  "h-10 border-white/10 bg-white/[0.03] text-white placeholder:text-white/25 focus-visible:border-[#8b7cf6] focus-visible:ring-[#8b7cf6]/25"

const textareaClass =
  "w-full resize-y rounded-lg border border-white/10 bg-white/[0.03] px-2.5 py-2 text-sm text-white outline-none transition-colors placeholder:text-white/25 focus-visible:border-[#8b7cf6] focus-visible:ring-3 focus-visible:ring-[#8b7cf6]/25"

export function ApplyJobDialog({
  jobId,
  jobTitle,
  applicant,
  open,
  onOpenChange,
}: {
  jobId: string
  jobTitle: string
  applicant: Applicant
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const router = useRouter()
  const [submitState, setSubmitState] = useState<SubmitState>("idle")
  const [error, setError] = useState<string | null>(null)

  const handleOpenChange = (nextOpen: boolean) => {
    if (submitState === "submitting") return

    if (!nextOpen) {
      setSubmitState("idle")
      setError(null)
    }

    onOpenChange(nextOpen)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const payload: ApplicationPayload = {
      jobId,
      applicantId: applicant.id,
      applicantName:
        String(formData.get("applicantName") ?? "").trim() || applicant.name,
      applicantEmail: applicant.email,
      resumeLink: String(formData.get("resumeLink") ?? "").trim(),
      coverLetter: String(formData.get("coverLetter") ?? "").trim(),
    }

    setSubmitState("submitting")
    setError(null)

    try {
      await applyJob(payload)
      setSubmitState("success")
      router.refresh()
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Could not submit your application."
      )
      setSubmitState("idle")
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="dark gap-5 border-white/10 bg-[#0f0f12] text-white sm:max-w-lg"
      >
        {submitState === "success" ? (
          <>
            <DialogHeader>
              <span className="mb-1 flex size-10 items-center justify-center rounded-full bg-emerald-500/10">
                <CheckCircle2 className="size-5 text-emerald-400" />
              </span>
              <DialogTitle className="text-base text-white">
                Application sent
              </DialogTitle>
              <DialogDescription className="text-white/50">
                Your application for{" "}
                <span className="text-white/80">{jobTitle}</span> has been
                submitted. You can track its status from your dashboard.
              </DialogDescription>
            </DialogHeader>

            <DialogFooter>
              <Button
                type="button"
                size="lg"
                className={primaryButtonClass}
                onClick={() => handleOpenChange(false)}
              >
                Done
              </Button>
            </DialogFooter>
          </>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <DialogHeader>
              <DialogTitle className="text-base text-white">
                Apply for this role
              </DialogTitle>
              <DialogDescription className="text-white/50">
                Share a few details with the hiring team at{" "}
                <span className="text-white/80">{jobTitle}</span>.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-1.5">
              <Label htmlFor="applicantName" className="text-xs text-white/60">
                Full name
                <span className="text-[#8b7cf6]">*</span>
              </Label>
              <Input
                id="applicantName"
                name="applicantName"
                defaultValue={applicant.name}
                placeholder="Your full name"
                required
                className={fieldClass}
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="applicantEmail" className="text-xs text-white/60">
                Email
              </Label>
              <Input
                id="applicantEmail"
                value={applicant.email}
                readOnly
                aria-readonly
                className={`${fieldClass} cursor-not-allowed text-white/50`}
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="resumeLink" className="text-xs text-white/60">
                Resume / CV link
                <span className="text-[#8b7cf6]">*</span>
              </Label>
              <Input
                id="resumeLink"
                name="resumeLink"
                type="url"
                placeholder="https://drive.google.com/your-resume"
                required
                className={fieldClass}
              />
              <p className="text-[11px] text-white/35">
                A public link to your resume (Google Drive, Dropbox, Notion…).
              </p>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="coverLetter" className="text-xs text-white/60">
                Cover letter
                <span className="text-[#8b7cf6]">*</span>
              </Label>
              <textarea
                id="coverLetter"
                name="coverLetter"
                rows={5}
                required
                placeholder="Tell the hiring team why you're a great fit for this role…"
                className={textareaClass}
              />
            </div>

            {error ? (
              <p className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-xs text-destructive">
                {error}
              </p>
            ) : null}

            <DialogFooter>
              <DialogClose
                render={
                  <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    className="border-white/10 text-white/70 hover:bg-white/5 hover:text-white"
                    disabled={submitState === "submitting"}
                  />
                }
              >
                Cancel
              </DialogClose>
              <Button
                type="submit"
                size="lg"
                className={primaryButtonClass}
                disabled={submitState === "submitting"}
              >
                {submitState === "submitting" ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <Send />
                )}
                {submitState === "submitting" ? "Submitting..." : "Submit application"}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
