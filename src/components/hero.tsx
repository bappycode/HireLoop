import Image from "next/image";
import { Briefcase, Building2, MapPin, Search, Star, Users } from "lucide-react";

const trendingPositions = ["Product Designer", "AI Engineering", "DevOps Engineer"];

const stats = [
  { icon: Briefcase, value: "50K", label: "Active Jobs" },
  { icon: Building2, value: "12K", label: "Companies" },
  { icon: Users, value: "2M", label: "Job Seekers" },
  { icon: Star, value: "97%", label: "Satisfaction Rate" },
];

// Static star field: [left %, top %, size px, opacity]
const stars: [number, number, number, number][] = [
  [3, 58, 1, 0.45],
  [7, 72, 1.5, 0.5],
  [10, 49, 1, 0.35],
  [13, 63, 2, 0.55],
  [16, 84, 1, 0.4],
  [19, 55, 1, 0.3],
  [22, 68, 1.5, 0.5],
  [25, 90, 1, 0.45],
  [28, 52, 1, 0.25],
  [31, 74, 1, 0.35],
  [34, 61, 1.5, 0.5],
  [37, 95, 1, 0.3],
  [40, 48, 1, 0.3],
  [43, 70, 2, 0.4],
  [46, 57, 1, 0.35],
  [49, 88, 1.5, 0.45],
  [52, 64, 1, 0.3],
  [55, 45, 1, 0.25],
  [58, 77, 1, 0.35],
  [61, 93, 1.5, 0.5],
  [64, 53, 1, 0.3],
  [67, 69, 1, 0.35],
  [70, 85, 2, 0.45],
  [73, 59, 1, 0.3],
  [76, 47, 1, 0.25],
  [79, 73, 1.5, 0.5],
  [82, 91, 1, 0.35],
  [85, 56, 1, 0.3],
  [88, 66, 1, 0.35],
  [91, 80, 1.5, 0.45],
  [94, 50, 1, 0.3],
  [97, 71, 1, 0.35],
  [5, 38, 1, 0.2],
  [12, 33, 1, 0.2],
  [24, 40, 1, 0.25],
  [36, 36, 1, 0.2],
  [48, 42, 1, 0.25],
  [60, 37, 1, 0.2],
  [72, 41, 1, 0.25],
  [84, 35, 1, 0.2],
  [93, 43, 1, 0.25],
  [18, 96, 1, 0.3],
  [42, 99, 1, 0.25],
  [68, 98, 1, 0.3],
];

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-[#050508] px-4 pt-10 text-white sm:px-6 sm:pt-12">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(ellipse_at_50%_-10%,rgba(124,107,255,0.08),transparent_50%)]"
      />

      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        {stars.map(([left, top, size, opacity], index) => (
          <span
            key={index}
            className="absolute rounded-full bg-white"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              width: size,
              height: size,
              opacity,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto flex max-w-[1320px] flex-col items-center">
        <div className="flex items-center justify-center gap-4">
          <span
            aria-hidden
            className="hidden h-px w-16 bg-gradient-to-r from-transparent to-white/25 sm:block lg:w-24"
          />
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-[10px] font-medium uppercase tracking-[0.16em] text-white/70 backdrop-blur-sm sm:text-[11px]">
            <span aria-hidden className="text-xs">
              💼
            </span>
            <span className="font-semibold normal-case tracking-normal text-[#f97316]">
              58,690+
            </span>
            <span>New Jobs This Month</span>
          </span>
          <span
            aria-hidden
            className="hidden h-px w-16 bg-gradient-to-l from-transparent to-white/25 sm:block lg:w-24"
          />
        </div>

        <h1 className="mt-5 w-full text-center text-4xl font-semibold leading-[1.08] tracking-tight text-balance sm:text-5xl lg:text-6xl">
          Find Your Dream Job Today
        </h1>

        <p className="mt-3.5 w-full max-w-[560px] text-center text-sm leading-relaxed text-white/55 text-pretty sm:text-base">
          HireLoop connects top talent with world-class companies. Browse thousands
          of curated opportunities and land your next role — faster.
        </p>

        <form role="search" className="mt-6 w-full max-w-[720px]">
          <div className="flex flex-col gap-2 rounded-2xl border border-white/10 bg-[#0d0d11]/90 p-2 shadow-[0_20px_60px_-24px_rgba(0,0,0,0.9)] backdrop-blur-md sm:flex-row sm:items-center sm:gap-0 sm:rounded-full sm:p-2">
            <label className="flex h-12 flex-1 items-center gap-3 rounded-full px-4 transition-colors focus-within:bg-white/[0.03]">
              <Search aria-hidden className="size-4 shrink-0 text-white/40" />
              <input
                type="text"
                name="query"
                placeholder="Job title, skill, or company"
                aria-label="Job title, skill, or company"
                className="w-full bg-transparent text-sm text-white placeholder:text-white/40 focus:outline-none"
              />
            </label>

            <span aria-hidden className="hidden h-7 w-px shrink-0 bg-white/10 sm:block" />

            <label className="flex h-12 flex-1 items-center gap-3 rounded-full px-4 transition-colors focus-within:bg-white/[0.03]">
              <MapPin aria-hidden className="size-4 shrink-0 text-white/40" />
              <input
                type="text"
                name="location"
                placeholder="Location or Remote"
                aria-label="Location or Remote"
                className="w-full bg-transparent text-sm text-white placeholder:text-white/40 focus:outline-none"
              />
            </label>

            <button
              type="submit"
              aria-label="Search jobs"
              className="inline-flex h-12 w-full shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#8a7bff] to-[#5a4ae8] text-white shadow-[0_0_24px_rgba(109,93,246,0.45)] transition hover:brightness-110 active:scale-[0.98] sm:size-12"
            >
              <Search aria-hidden className="size-5" />
            </button>
          </div>
        </form>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          <span className="mr-1 text-xs text-white/45">Trending Position</span>
          {trendingPositions.map((position) => (
            <span
              key={position}
              className="rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-xs text-white/60 transition-colors hover:border-white/20 hover:text-white/80"
            >
              {position}
            </span>
          ))}
        </div>

        <div className="relative mt-6 w-full sm:mt-7">
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[70%] w-[92%] max-w-[1040px] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(94,72,255,0.28),transparent_65%)] blur-3xl"
          />

          <div className="relative mx-auto aspect-[760/390] w-[min(760px,92vw)] sm:w-[min(900px,88vw)] lg:w-[min(960px,86vw)]">
            <Image
              src="/images/globe.png"
              alt=""
              fill
              sizes="(max-width: 640px) 92vw, (max-width: 1024px) 88vw, 960px"
              className="select-none object-cover object-[50%_70%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_7%)]"
            />

            <div className="absolute inset-x-0 top-[26%] flex justify-center px-6 sm:top-[30%]">
              <p className="max-w-[420px] text-center text-lg font-medium leading-snug text-white/85 text-balance drop-shadow-[0_2px_16px_rgba(0,0,0,0.8)] sm:text-xl lg:text-2xl">
                Assisting over 15,000 job seekers find their dream positions.
              </p>
            </div>

            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#050508] via-[#050508]/50 to-transparent"
            />
          </div>

          <div className="relative z-10 -mt-12 grid w-full grid-cols-2 gap-3 pb-4 sm:-mt-20 sm:gap-4 lg:-mt-32 lg:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-b from-[#121216]/95 to-[#0a0a0d]/95 p-5 backdrop-blur-md transition-colors hover:border-white/[0.15]"
              >
                <stat.icon
                  aria-hidden
                  strokeWidth={1.75}
                  className="size-4 text-white/40"
                />
                <p className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs text-white/45 sm:text-sm">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
