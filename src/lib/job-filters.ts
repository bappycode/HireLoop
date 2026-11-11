export const JOB_TYPES = [
  "Full-time",
  "Part-time",
  "Contract",
  "Internship",
] as const

export const JOB_CATEGORIES = [
  "Engineering & Tech",
  "Design",
  "Product",
  "Marketing",
  "Sales",
  "Finance",
  "Operations",
  "Human Resources",
] as const

export const SALARY_STEPS = [
  { label: "Any salary", value: 0 },
  { label: "€1,000+ / month", value: 1000 },
  { label: "€3,000+ / month", value: 3000 },
  { label: "€5,000+ / month", value: 5000 },
  { label: "€8,000+ / month", value: 8000 },
] as const

export type JobFilters = {
  search: string
  location: string
  category: string
  minSalary: number
  types: string[]
}

export const emptyJobFilters: JobFilters = {
  search: "",
  location: "",
  category: "all",
  minSalary: 0,
  types: [],
}

type SearchParams = Record<string, string | string[] | undefined>

function firstValue(value: string | string[] | undefined) {
  return (Array.isArray(value) ? value[0] : value) ?? ""
}

/** Reads the browse-jobs filters from the URL. */
export function parseJobFilters(params: SearchParams): JobFilters {
  const type = params.type
  const types = Array.isArray(type) ? type : type ? [type] : []

  return {
    search: firstValue(params.search).trim(),
    location: firstValue(params.location).trim(),
    category: firstValue(params.category) || "all",
    minSalary: Number(firstValue(params.minSalary)) || 0,
    types: types.filter(Boolean),
  }
}

/** Serialises the browse-jobs filters for the API and the URL. */
export function jobFilterParams(filters: JobFilters) {
  const params = new URLSearchParams()
  const search = filters.search.trim()
  const location = filters.location.trim()

  if (search) params.set("search", search)
  if (location) params.set("location", location)
  if (filters.category !== "all") params.set("category", filters.category)
  if (filters.minSalary > 0) params.set("minSalary", String(filters.minSalary))
  filters.types.forEach((type) => params.append("type", type))

  return params
}

export function hasJobFilters(filters: JobFilters) {
  return jobFilterParams(filters).size > 0
}
