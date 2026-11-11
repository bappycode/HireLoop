"use client"

import { useState } from "react"
import {
  ArrowRight,
  Building2,
  CalendarDays,
  ChevronDown,
  Globe,
  MapPin,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { createJob, type JobPayload } from "@/lib/actions/jobs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const jobTypes = ["Full-time", "Part-time", "Contract", "Internship"] as const

const jobCategories = [
  "Engineering & Tech",
  "Design",
  "Product",
  "Marketing",
  "Sales",
  "Finance",
  "Operations",
  "Human Resources",
]

const salaryFrequencies = ["per hour", "per day", "per month", "per year"]

const textareaClass =
  "w-full resize-y rounded-lg border border-input bg-transparent px-2.5 py-2 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-input/30"

function Field({
  label,
  required,
  hint,
  children,
}: {
  label: string
  required?: boolean
  hint?: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center gap-2">
        <Label className="text-xs text-muted-foreground">
          {label}
          {required ? <span className="text-violet-400">*</span> : null}
        </Label>
        {hint}
      </div>
      {children}
    </div>
  )
}

function Section({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="space-y-4">
      <div className="flex items-center gap-2">
        <span className="size-1.5 rounded-full bg-violet-500" />
        <h2 className="text-sm font-semibold">{title}</h2>
      </div>
      {children}
    </section>
  )
}

function Select({
  className,
  children,
  ...props
}: React.ComponentProps<"select">) {
  return (
    <div className="relative">
      <select
        className={cn(
          "h-9 w-full appearance-none rounded-lg border border-input bg-transparent px-2.5 pr-8 text-sm text-foreground outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-input/30",
          className
        )}
        {...props}
      >
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute top-1/2 right-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
    </div>
  )
}

export function AddJobForm() {
  const [submitState, setSubmitState] = useState<
    "idle" | "saving" | "success" | "error"
  >("idle")
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const data: JobPayload = {
      jobTitle: String(formData.get("jobTitle") ?? ""),
      companyName: String(formData.get("companyName") ?? ""),
      jobCategory: String(formData.get("jobCategory") ?? ""),
      jobType: String(formData.get("jobType") ?? ""),
      remoteAllowed: formData.get("remoteAllowed") === "on",
      jobLocation: String(formData.get("jobLocation") ?? ""),
      applicationDeadline: String(formData.get("applicationDeadline") ?? ""),
      minSalary: formData.get("minSalary") ? Number(formData.get("minSalary")) : null,
      maxSalary: formData.get("maxSalary") ? Number(formData.get("maxSalary")) : null,
      salaryFrequency: String(formData.get("salaryFrequency") ?? ""),
      keyResponsibilities: String(formData.get("keyResponsibilities") ?? ""),
      qualifications: String(formData.get("qualifications") ?? ""),
      applicant: 0,
      status: "active",
    }

    setSubmitState("saving")
    setErrorMessage(null)

    try {
      await createJob(data)
      setSubmitState("success")
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Something went wrong"
      )
      setSubmitState("error")
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto flex w-full max-w-3xl flex-col gap-8"
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">
            <span className="text-violet-400">Manage Jobs</span>
            <span className="px-1">›</span>
            Create New Listing
          </p>
          <h1 className="text-2xl font-semibold tracking-tight">Post a New Job</h1>
          <p className="text-sm text-muted-foreground">
            Fill in the position specifics to attract qualified talent across
            your network.
          </p>
        </div>

        <div className="flex flex-col items-end gap-2">
          <Button
            type="submit"
            size="lg"
            className="gap-2"
            disabled={submitState === "saving"}
          >
            {submitState === "saving" ? "Publishing..." : "Publish Job"}
            <ArrowRight />
          </Button>
          {submitState === "success" ? (
            <p className="text-xs text-emerald-400">
              Job published successfully.
            </p>
          ) : null}
          {submitState === "error" ? (
            <p className="max-w-xs text-right text-xs text-destructive">
              {errorMessage}
            </p>
          ) : null}
        </div>
      </div>

      <Section title="1. Basic Information">
        <Field label="Job Title" required>
          <Input
            name="jobTitle"
            placeholder="Frontend Developer"
            required
            className="h-9"
          />
        </Field>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Company Name" required>
            <div className="relative">
              <Building2 className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                name="companyName"
                placeholder="HireLoop Network"
                required
                className="h-9 pl-8"
              />
            </div>
          </Field>

          <Field label="Job Category" required>
            <Select name="jobCategory" defaultValue="" required>
              <option value="" disabled className="bg-[#141418]">
                Select category
              </option>
              {jobCategories.map((category) => (
                <option key={category} value={category} className="bg-[#141418]">
                  {category}
                </option>
              ))}
            </Select>
          </Field>
        </div>

        <Field label="Job Type" required>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {jobTypes.map((type, index) => (
              <div key={type}>
                <input
                  type="radio"
                  id={`job-type-${index}`}
                  name="jobType"
                  value={type}
                  defaultChecked={type === "Full-time"}
                  className="peer sr-only"
                />
                <label
                  htmlFor={`job-type-${index}`}
                  className="flex h-9 cursor-pointer items-center justify-center rounded-lg border border-input text-xs text-muted-foreground transition-colors hover:bg-accent peer-checked:border-violet-500 peer-checked:bg-violet-500/10 peer-checked:text-foreground"
                >
                  {type}
                </label>
              </div>
            ))}
          </div>
        </Field>
      </Section>

      <Section title="2. Location, Compensation & Timeline">
        <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-border bg-card/40 p-3 transition-colors hover:bg-accent/40">
          <input
            type="checkbox"
            name="remoteAllowed"
            defaultChecked
            className="peer sr-only"
          />
          <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-muted">
            <Globe className="size-4 text-muted-foreground" />
          </span>
          <span className="flex-1">
            <span className="block text-sm font-medium">
              Remote Work Allowed (optional)
            </span>
            <span className="block text-xs text-muted-foreground">
              Enable worldwide or distributed candidate applications.
            </span>
          </span>
          <span className="relative h-5 w-9 shrink-0 rounded-full bg-muted transition-colors after:absolute after:top-0.5 after:left-0.5 after:size-4 after:rounded-full after:bg-white after:transition-transform peer-checked:bg-violet-600 peer-checked:after:translate-x-4" />
        </label>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            label="Job Location (located)"
            hint={
              <Badge variant="secondary" className="px-1.5 text-[10px]">
                Required
              </Badge>
            }
          >
            <div className="relative">
              <MapPin className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                name="jobLocation"
                placeholder="New York, USA"
                className="h-9 pl-8"
              />
            </div>
          </Field>

          <Field label="Application Deadline (deadline)">
            <div className="relative">
              <CalendarDays className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="date"
                name="applicationDeadline"
                className="h-9 pl-8 [color-scheme:dark]"
              />
            </div>
          </Field>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <Field label="Min Salary / Rate">
            <div className="relative">
              <span className="pointer-events-none absolute top-1/2 left-2.5 -translate-y-1/2 text-sm text-muted-foreground">
                €
              </span>
              <Input
                type="number"
                name="minSalary"
                min={0}
                placeholder="25"
                className="h-9 pl-7"
              />
            </div>
          </Field>

          <Field label="Max Salary / Rate">
            <div className="relative">
              <span className="pointer-events-none absolute top-1/2 left-2.5 -translate-y-1/2 text-sm text-muted-foreground">
                €
              </span>
              <Input
                type="number"
                name="maxSalary"
                min={0}
                placeholder="40"
                className="h-9 pl-7"
              />
            </div>
          </Field>

          <Field label="Frequency">
            <Select name="salaryFrequency" defaultValue="per hour">
              {salaryFrequencies.map((frequency) => (
                <option
                  key={frequency}
                  value={frequency}
                  className="bg-[#141418]"
                >
                  {frequency}
                </option>
              ))}
            </Select>
          </Field>
        </div>
      </Section>

      <Section title="3. Responsibilities & Requirements">
        <Field label="Key Responsibilities">
          <textarea
            name="keyResponsibilities"
            rows={4}
            placeholder="Share your commitment to delivering exceptional user interfaces and digital experiences. You will collaborate directly with systems designers and backend engineers to craft responsive, micro-interaction rich products."
            className={textareaClass}
          />
        </Field>

        <Field label="Qualifications & Requirements">
          <textarea
            name="qualifications"
            rows={4}
            placeholder="• 3+ years of experience with React, TypeScript, and modern state architectures&#10;• Solid understanding of REST and GraphQL APIs and component-driven design&#10;• Experience partnering closely with product teams and UI/UX designers"
            className={textareaClass}
          />
        </Field>
      </Section>
    </form>
  )
}
