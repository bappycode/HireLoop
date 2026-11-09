"use client"

import { useMemo, useState } from "react"
import { Search, SlidersHorizontal } from "lucide-react"
import { JobListCard } from "@/components/job-list-card"
import { monthlySalary, type JobDoc } from "@/lib/jobs"
import { cn } from "cn"

const TYPE_ORDER = ["Full-time", "Part-time", "Contract", "Internship"]

const SALARY_STEPS = [
  { label: "Any salary", value: 0 },
  { label: "€1,000+ / month", value: 1000 },
  { label: "€3,000+ / month", value: 3000 },
  { label: "€5,000+ / month", value: 5000 },
  { label: "€8,000+ / month", value: 8000 },
]

const inputClass =
  "h-9 w-full rounded-lg border border-white/10 bg-white/[0.03] px-3 text-[13px] text-white outline-none transition-colors placeholder:text-white/30 focus:border-white/25"

function unique(values: (string | undefined)[]) {
  return [...new Set(values.filter((value): value is string => Boolean(value)))]
}

function FilterBlock({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="space-y-2.5">
      <p className="text-[10px] font-semibold tracking-[0.16em] text-white/35 uppercase">
        {label}
      </p>
      {children}
    </div>
  )
}

export function JobsBrowser({ jobs }: { jobs: JobDoc[] }) {
  const [query, setQuery] = useState("")
  const [types, setTypes] = useState<string[]>([])
  const [location, setLocation] = useState("")
  const [category, setCategory] = useState("all")
  const [minSalary, setMinSalary] = useState(0)

  const jobTypes = useMemo(() => {
    return unique(jobs.map((job) => job.jobType)).sort((a, b) => {
      const ai = TYPE_ORDER.indexOf(a)
      const bi = TYPE_ORDER.indexOf(b)
      if (ai === -1 && bi === -1) return a.localeCompare(b)
      if (ai === -1) return 1
      if (bi === -1) return -1
      return ai - bi
    })
  }, [jobs])

  const categories = useMemo(
    () => unique(jobs.map((job) => job.jobCategory)).sort(),
    [jobs]
  )

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    const place = location.trim().toLowerCase()

    return jobs.filter((job) => {
      if (
        q &&
        !`${job.jobTitle} ${job.companyName}`.toLowerCase().includes(q)
      ) {
        return false
      }
      if (types.length > 0 && !types.includes(job.jobType ?? "")) return false
      if (place && !(job.jobLocation ?? "").toLowerCase().includes(place)) {
        return false
      }
      if (category !== "all" && job.jobCategory !== category) return false
      if (minSalary > 0) {
        const monthly = monthlySalary(job)
        if (monthly === null || monthly < minSalary) return false
      }
      return true
    })
  }, [jobs, query, types, location, category, minSalary])

  const hasFilters =
    query.trim() !== "" ||
    types.length > 0 ||
    location.trim() !== "" ||
    category !== "all" ||
    minSalary > 0

  const toggleType = (type: string) => {
    setTypes((current) =>
      current.includes(type)
        ? current.filter((value) => value !== type)
        : [...current, type]
    )
  }

  const clearFilters = () => {
    setQuery("")
    setTypes([])
    setLocation("")
    setCategory("all")
    setMinSalary(0)
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[260px_1fr] lg:items-start">
      <aside className="rounded-2xl bg-[#0f0f12] p-5 ring-1 ring-white/[0.07] lg:sticky lg:top-28">
        <div className="flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-sm font-medium text-white">
            <SlidersHorizontal className="size-4 text-white/40" />
            Filters
          </h2>
          {hasFilters ? (
            <button
              type="button"
              onClick={clearFilters}
              className="text-[11px] text-white/40 transition-colors hover:text-white"
            >
              Clear all
            </button>
          ) : null}
        </div>

        <div className="mt-5 space-y-6">
          <FilterBlock label="Job Type">
            {jobTypes.length === 0 ? (
              <p className="text-[13px] text-white/35">No types yet</p>
            ) : (
              <div className="space-y-2">
                {jobTypes.map((type) => (
                  <label
                    key={type}
                    className="flex cursor-pointer items-center gap-2.5 text-[13px] text-white/60 transition-colors hover:text-white/85"
                  >
                    <input
                      type="checkbox"
                      checked={types.includes(type)}
                      onChange={() => toggleType(type)}
                      className="size-3.5 rounded border-white/20 bg-transparent accent-[#6d5df6]"
                    />
                    {type}
                  </label>
                ))}
              </div>
            )}
          </FilterBlock>

          <FilterBlock label="Location">
            <input
              value={location}
              onChange={(event) => setLocation(event.target.value)}
              placeholder="e.g. Dhaka"
              className={inputClass}
            />
          </FilterBlock>

          <FilterBlock label="Salary Range">
            <select
              value={minSalary}
              onChange={(event) => setMinSalary(Number(event.target.value))}
              className={cn(inputClass, "appearance-none [color-scheme:dark]")}
            >
              {SALARY_STEPS.map((step) => (
                <option
                  key={step.value}
                  value={step.value}
                  className="bg-[#0f0f12]"
                >
                  {step.label}
                </option>
              ))}
            </select>
          </FilterBlock>

          <FilterBlock label="Category">
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className={cn(inputClass, "appearance-none [color-scheme:dark]")}
            >
              <option value="all" className="bg-[#0f0f12]">
                All categories
              </option>
              {categories.map((value) => (
                <option key={value} value={value} className="bg-[#0f0f12]">
                  {value}
                </option>
              ))}
            </select>
          </FilterBlock>
        </div>
      </aside>

      <div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-sm">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-white/30" />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search roles or companies..."
              className="h-10 w-full rounded-xl border border-white/10 bg-white/[0.03] pr-3 pl-9 text-sm text-white outline-none transition-colors placeholder:text-white/30 focus:border-white/25"
            />
          </div>
          <p className="text-[13px] text-white/40">
            Showing {filtered.length} of {jobs.length}{" "}
            {jobs.length === 1 ? "role" : "roles"}
          </p>
        </div>

        {filtered.length === 0 ? (
          <div className="mt-6 rounded-2xl bg-[#0f0f12] px-6 py-16 text-center ring-1 ring-white/[0.07]">
            <p className="text-sm font-medium text-white">
              No roles match your filters
            </p>
            <p className="mt-1 text-[13px] text-white/45">
              Try a different search or clear the filters to see everything.
            </p>
            <button
              type="button"
              onClick={clearFilters}
              className="mt-5 inline-flex h-9 items-center rounded-lg bg-white px-4 text-sm font-medium text-black transition hover:bg-white/90"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {filtered.map((job) => (
              <JobListCard key={job._id} job={job} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
