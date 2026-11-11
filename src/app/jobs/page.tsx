import type { Metadata } from "next"
import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import { JobsBrowser } from "@/components/jobs-browser"
import type { JobDoc } from "@/lib/jobs"
import { hasJobFilters, parseJobFilters } from "@/lib/job-filters"
import { getJobs } from "@/lib/jobs-server"

export const metadata: Metadata = {
  title: "Browse Jobs — HireLoop",
  description: "Explore open roles from companies hiring on HireLoop.",
}

export default async function JobsPage({ searchParams }: PageProps<"/jobs">) {
  const filters = parseJobFilters(await searchParams)

  let jobs: JobDoc[] = []
  let unavailable = false

  try {
    jobs = await getJobs(filters)
  } catch {
    unavailable = true
  }

  return (
    <div className="min-h-screen bg-[#050508] text-white">
      <Navbar />
      <main>
        <section className="px-4 pt-16 pb-8 sm:px-6 lg:pt-20">
          <div className="mx-auto max-w-[1320px]">
            <span className="inline-flex items-center gap-3 text-[10px] font-medium tracking-[0.22em] text-[#8b7cf6] uppercase sm:text-[11px]">
              <span aria-hidden className="size-1 rounded-full bg-[#8b7cf6]" />
              Browse Jobs
            </span>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-balance text-white sm:text-5xl">
              Find your next role
            </h1>
            <p className="mt-3 max-w-xl text-sm text-white/50">
              {unavailable
                ? "Job listings are temporarily unavailable — please check back in a moment."
                : `${jobs.length} ${
                    hasJobFilters(filters) ? "matching" : "open"
                  } ${jobs.length === 1 ? "position" : "positions"} from teams hiring on HireLoop.`}
            </p>
          </div>
        </section>

        <section className="px-4 pb-24 sm:px-6">
          <div className="mx-auto max-w-[1320px]">
            <JobsBrowser jobs={jobs} filters={filters} unavailable={unavailable} />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
