import Link from "next/link";

const footerLinks = [
  {
    title: "Product",
    links: [
      { label: "Job discovery", href: "/jobs" },
      { label: "Worker AI", href: "/worker-ai" },
      { label: "Companies", href: "/companies" },
      { label: "Salary data", href: "/salary-data" },
    ],
  },
  {
    title: "Navigations",
    links: [
      { label: "Help center", href: "/help" },
      { label: "Career library", href: "/career-library" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Brand Guideline", href: "/brand-guidelines" },
      { label: "Newsroom", href: "/newsroom" },
    ],
  },
];

const socialLinks = [
  {
    name: "Facebook",
    label: "f",
    href: "https://facebook.com",
  },
  {
    name: "Pinterest",
    label: "p",
    href: "https://pinterest.com",
  },
  {
    name: "LinkedIn",
    label: "in",
    href: "https://linkedin.com",
  },
];

export default function Footer() {
  return (
    <footer className="bg-black px-5 pb-6 pt-5 text-white sm:px-8">

      <div className="mx-auto max-w-6xl">

        {/* Main Footer */}
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-4 lg:gap-16">

          {/* Brand */}
          <div className="col-span-2 sm:col-span-1">
            <Link
              href="/"
              className="inline-block text-2xl font-bold tracking-tight"
            >
              <span className="text-sky-600">hire</span>
              <span className="text-orange-500">loop</span>
            </Link>

            <p className="mt-3 max-w-[190px] text-[10px] leading-5 text-zinc-500">
              The AI-native career platform. Built for people who take their work seriously.
            </p>
          </div>

          {/* Navigation */}
          {footerLinks.map((group) => (
            <div key={group.title}>
              <h3 className="mb-4 text-[10px] font-medium text-indigo-500">
                {group.title}
              </h3>

              <ul className="space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-[10px] text-zinc-500 transition hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>

        {/* Bottom Footer */}
        <div className="mt-10 flex flex-col gap-5 border-t border-zinc-900/70 pt-5 sm:flex-row sm:items-center sm:justify-between">

          {/* Social Links */}
          <div className="flex items-center gap-2">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className="flex h-5 w-5 items-center justify-center rounded bg-zinc-900 text-[11px] font-semibold text-zinc-400 transition hover:bg-indigo-600 hover:text-white"
              >
                {social.label}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[9px] text-zinc-600">
            <span>Copyright 2024 – Programming Hero</span>

            <a href="/terms" className="transition hover:text-white">
              Terms & Policy
            </a>

            <a href="/privacy" className="transition hover:text-white">
              Privacy Guideline
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
}
