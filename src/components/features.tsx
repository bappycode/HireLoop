import {
  Bookmark,
  Building2,
  FileText,
  MousePointerClick,
  Rocket,
  Search,
  Target,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import SectionHeading from "@/components/section-heading";

type Feature = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const features: Feature[] = [
  {
    icon: Search,
    title: "Smart Search",
    description: "Find your ideal job with advanced filters.",
  },
  {
    icon: TrendingUp,
    title: "Salary Insights",
    description: "Get real salary data to negotiate confidently.",
  },
  {
    icon: Building2,
    title: "Top Companies",
    description: "Apply to vetted companies that are hiring.",
  },
  {
    icon: Bookmark,
    title: "Saved Jobs",
    description: "Manage apps & favorites on your dashboard.",
  },
  {
    icon: MousePointerClick,
    title: "One-Click Apply",
    description: "Simplify your job applications for an easier process!",
  },
  {
    icon: FileText,
    title: "Resumes Builder",
    description: "Create professional resumes with modern templates.",
  },
  {
    icon: Target,
    title: "Skill-Based Matching",
    description: "Discover jobs that match your skills and experience.",
  },
  {
    icon: Rocket,
    title: "Career Growth Resources",
    description: "Boost your career with quick interview tips.",
  },
];

export default function FeaturesJob() {
  return (
    <section
      id="features"
      className="border-y border-white/[0.06] bg-[#0a0a0c] px-4 py-20 sm:px-6 sm:py-24"
    >
      <div className="mx-auto max-w-[1320px]">
        <SectionHeading label="Features Job" title="Everything you need to succeed" />

        <div className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div key={feature.title} className="flex items-start gap-4">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-white/[0.07] bg-[#17171b]">
                <feature.icon
                  aria-hidden
                  strokeWidth={1.75}
                  className="size-5 text-white/80"
                />
              </div>
              <div>
                <h3 className="text-sm font-medium text-white">{feature.title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-white/45">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
