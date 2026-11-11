import Link from "next/link";
import {
  ArrowRight,
  Building2,
  Clock,
  MapPin,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import SectionHeading from "@/components/section-heading";
import { formatCompensation, formatLocation, type JobDoc } from "@/lib/jobs";
import { getJobs } from "@/lib/jobs-server";
import { cn } from "cn";

const MAX_JOBS = 6;

function describeJob(job: JobDoc) {
  const text = job.keyResponsibilities?.trim() || job.qualifications?.trim();
  return text || "Join the team and help shape the future of hiring.";
}

export default async function JobDiscovery() {
  let jobs: JobDoc[] = [];
  let unavailable = false;

  try {
    jobs = await getJobs();
  } catch {
    unavailable = true;
  }

  const featured = jobs.slice(0, MAX_JOBS);

  return (
    <section id="jobs" className="bg-[#050508] px-4 py-20 sm:px-6 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-[1320px]">
        <SectionHeading
          label="Smart Job Discovery"
          title="The roles you'd never find by searching"
        />

        {featured.length === 0 ? (
          <div className="mt-12 rounded-2xl bg-[#0f0f12] px-6 py-14 text-center ring-1 ring-white/[0.07]">
            <p className="text-sm font-medium text-white">
              {unavailable
                ? "Job listings are temporarily unavailable"
                : "No open roles right now"}
            </p>
            <p className="mt-1 text-[13px] text-white/45">
              {unavailable
                ? "Please check back in a moment."
                : "New opportunities are added regularly — check back soon."}
            </p>
          </div>
        ) : (
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {featured.map((job) => {
              return (
                <Card
                  key={job._id}
                  className="group h-full gap-3 rounded-2xl bg-[#0f0f12] py-0 text-white ring-1 ring-white/[0.07] transition-colors duration-300 hover:ring-white/[0.15] [--card-spacing:1.5rem]"
                >
                  <CardHeader className="gap-2 pt-6">
                    <CardTitle className="text-lg font-semibold tracking-tight text-white">
                      {job.jobTitle}
                    </CardTitle>
                    <CardDescription className="line-clamp-2 text-[13px] leading-relaxed text-white/45">
                      {describeJob(job)}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="flex flex-wrap gap-2 pt-0">
                    <Badge
                      variant="outline"
                      className="h-6 gap-1.5 rounded-full border-white/10 bg-white/[0.03] px-2.5 text-[11px] font-normal text-white/60"
                    >
                      <MapPin className="size-3 text-white/40" />
                      {formatLocation(job)}
                    </Badge>
                    <Badge
                      variant="outline"
                      className="h-6 gap-1.5 rounded-full border-white/10 bg-white/[0.03] px-2.5 text-[11px] font-normal text-white/60"
                    >
                      <Building2 className="size-3 text-white/40" />
                      {job.remoteAllowed ? "Remote" : "On-site"}
                    </Badge>
                    <Badge
                      variant="outline"
                      className="h-6 gap-1.5 rounded-full border-white/10 bg-white/[0.03] px-2.5 text-[11px] font-normal text-white/60"
                    >
                      <Clock className="size-3 text-white/40" />
                      {formatCompensation(job)}
                    </Badge>
                  </CardContent>

                  <CardFooter className="mt-auto border-0 bg-transparent pt-0">
                    <Link
                      href="/jobs"
                      className="group/link inline-flex items-center gap-1.5 text-[13px] font-medium text-white/70 transition-colors hover:text-white"
                    >
                      Apply Now
                      <ArrowRight className="size-3.5 transition-transform group-hover/link:translate-x-0.5" />
                    </Link>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        )}

        <div className="mt-10 flex justify-center">
          <Link
            href="/jobs"
            className={cn(
              buttonVariants({ variant: "secondary", size: "lg" }),
              "h-11 rounded-full bg-white px-6 text-sm font-medium text-black hover:bg-white/90",
            )}
          >
            View all open jobs
          </Link>
        </div>
      </div>
    </section>
  );
}
