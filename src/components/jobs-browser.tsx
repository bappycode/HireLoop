"use client"

import { useEffect, useRef, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { Search, SlidersHorizontal } from "lucide-react"
import { JobListCard } from "@/components/job-list-card"
import {
  emptyJobFilters,
  hasJobFilters,
  jobFilterParams,
  JOB_CATEGORIES,
  JOB_TYPES,
  SALARY_STEPS,
  type JobFilters,
} from "@/lib/job-filters"
import type { JobDoc } from "@/lib/jobs"
import { cn } from "@/lib/utils"

const inputClass =
  "h-9 w-full rounded-lg border border-white/10 bg-white/[0.03] px-3 text-[13px] text-white outline-none transition-colors placeholder:text-white/30 focus:border-white/25"

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

type JobsBrowserProps = {
  jobs: JobDoc[]
  filters: JobFilters
  unavailable?: boolean
}

export function JobsBrowser({
  jobs,
  filters,
  unavailable,
}: JobsBrowserProps) {
  const router = useRouter()
  const pathname = usePathname()
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const latestFilters = useRef(filters)
  const [search, setSearch] = useState(filters.search)
  const [location, setLocation] = useState(filters.location)

  useEffect(() => {
    if (!debounceRef.current) latestFilters.current = filters
  }, [filters])

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [])

  const navigate = (next: JobFilters) => {
    const query = jobFilterParams(next).toString()
    router.push(query ? `${pathname}?${query}` : pathname, { scroll: false })
  }

  const update = (updates: Partial<JobFilters>, debounced = false) => {
    const next = { ...latestFilters.current, ...updates }
    latestFilters.current = next

    if (!debounced) {
      if (debounceRef.current) clearTimeout(debounceRef.current)
      navigate(next)
      return
    }

    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      debounceRef.current = null
      navigate(latestFilters.current)
    }, 350)
  }

  const toggleType = (type: string) => {
    update({
      types: latestFilters.current.types.includes(type)
        ? latestFilters.current.types.filter((value) => value !== type)
        : [...latestFilters.current.types, type],
    })
  }

  const clearFilters = () => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    latestFilters.current = emptyJobFilters
    setSearch("")
    setLocation("")
    navigate(emptyJobFilters)
  }

  const hasActiveFilters = hasJobFilters(filters)
  const emptyTitle = unavailable
    ? "Job listings are temporarily unavailable"
    : hasActiveFilters
      ? "No roles match your filters"
      : "No open roles right now"
  const emptyDescription = unavailable
    ? "Please check back in a moment."
    : hasActiveFilters
      ? "Try a different search or clear the filters to see everything."
      : "New opportunities are added regularly — check back soon."

  return (
    <div className="grid gap-6 lg:grid-cols-[260px_1fr] lg:items-start">
      <aside className="rounded-2xl bg-[#0f0f12] p-5 ring-1 ring-white/[0.07] lg:sticky lg:top-28">
        <div className="flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-sm font-medium text-white">
            <SlidersHorizontal className="size-4 text-white/40" />
            Filters
          </h2>
          {hasActiveFilters ? (
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
            <div className="space-y-2">
              {JOB_TYPES.map((type) => (
                <label
                  key={type}
                  className="flex cursor-pointer items-center gap-2.5 text-[13px] text-white/60 transition-colors hover:text-white/85"
                >
                  <input
                    type="checkbox"
                    checked={filters.types.includes(type)}
                    onChange={() => toggleType(type)}
                    className="size-3.5 rounded border-white/20 bg-transparent accent-[#6d5df6]"
                  />
                  {type}
                </label>
              ))}
            </div>
          </FilterBlock>

          <FilterBlock label="Location">
            <input
              value={location}
              onChange={(event) => {
                setLocation(event.target.value)
                update({ location: event.target.value }, true)
              }}
              placeholder="e.g. Dhaka"
              aria-label="Filter jobs by location"
              className={inputClass}
            />
          </FilterBlock>

          <FilterBlock label="Salary Range">
            <select
              value={filters.minSalary}
              onChange={(event) =>
                update({ minSalary: Number(event.target.value) })
              }
              aria-label="Filter jobs by minimum monthly salary"
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
              value={filters.category}
              onChange={(event) => update({ category: event.target.value })}
              aria-label="Filter jobs by category"
              className={cn(inputClass, "appearance-none [color-scheme:dark]")}
            >
              <option value="all" className="bg-[#0f0f12]">
                All categories
              </option>
              {JOB_CATEGORIES.map((category) => (
                <option key={category} value={category} className="bg-[#0f0f12]">
                  {category}
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
              value={search}
              onChange={(event) => {
                setSearch(event.target.value)
                update({ search: event.target.value }, true)
              }}
              placeholder="Search roles or companies..."
              aria-label="Search jobs by title or company"
              className="h-10 w-full rounded-xl border border-white/10 bg-white/[0.03] pr-3 pl-9 text-sm text-white outline-none transition-colors placeholder:text-white/30 focus:border-white/25"
            />
          </div>
          <p aria-live="polite" className="text-[13px] text-white/40">
            {jobs.length} {jobs.length === 1 ? "role" : "roles"} found
          </p>
        </div>

        {jobs.length === 0 ? (
          <div className="mt-6 rounded-2xl bg-[#0f0f12] px-6 py-16 text-center ring-1 ring-white/[0.07]">
            <p className="text-sm font-medium text-white">{emptyTitle}</p>
            <p className="mt-1 text-[13px] text-white/45">{emptyDescription}</p>
            {hasActiveFilters ? (
              <button
                type="button"
                onClick={clearFilters}
                className="mt-5 inline-flex h-9 items-center rounded-lg bg-white px-4 text-sm font-medium text-black transition hover:bg-white/90"
              >
                Clear filters
              </button>
            ) : null}
          </div>
        ) : (
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {jobs.map((job) => (
              <JobListCard key={job._id} job={job} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
