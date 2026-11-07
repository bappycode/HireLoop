export type Job = {
  id: number;
  title: string;
  description: string;
  location: string;
  workplace: "Remote" | "Hybrid" | "On-site";
  salary: string;
};

export const dummyJobs: Job[] = [
  {
    id: 1,
    title: "Frontend Developer",
    description:
      "Showcase your commitment to diversity and inclusion by highlighting initiatives.",
    location: "New York, USA",
    workplace: "Hybrid",
    salary: "€25–€40/hour",
  },
  {
    id: 2,
    title: "Product Designer",
    description:
      "Shape thoughtful product experiences for millions of people looking for their next role.",
    location: "Berlin, Germany",
    workplace: "Remote",
    salary: "€30–€45/hour",
  },
  {
    id: 3,
    title: "Backend Engineer",
    description:
      "Build reliable services and APIs that power matching for candidates and companies.",
    location: "London, UK",
    workplace: "Hybrid",
    salary: "€35–€55/hour",
  },
  {
    id: 4,
    title: "Data Analyst",
    description:
      "Turn hiring data into clear insights that help teams make better decisions.",
    location: "Amsterdam, NL",
    workplace: "Remote",
    salary: "€22–€34/hour",
  },
  {
    id: 5,
    title: "DevOps Engineer",
    description:
      "Keep our platform fast, secure and observable with modern cloud infrastructure.",
    location: "Lisbon, Portugal",
    workplace: "On-site",
    salary: "€28–€44/hour",
  },
  {
    id: 6,
    title: "Mobile Developer",
    description:
      "Craft smooth iOS and Android experiences for job seekers on the move.",
    location: "Toronto, Canada",
    workplace: "Hybrid",
    salary: "€26–€42/hour",
  },
];
