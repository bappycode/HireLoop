'use client';

import Image from "next/image";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { dashboardHome, isRole } from "@/lib/dashboard-nav";
import { Button } from "./ui/button";

const publicNavLinks = [
  { label: "Browse Jobs", href: "/jobs" },
  { label: "Company", href: "/companies" },
  { label: "Pricing", href: "/pricing" },
];

export default function Navbar() {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const navLinks =
    user && isRole(user.role)
      ? [...publicNavLinks, { label: "Dashboard", href: dashboardHome[user.role] }]
      : publicNavLinks;

  const onSignOut = async () => {
    await authClient.signOut();
  };

  return (
    <header className="sticky top-0 z-50 w-full px-4 pt-4 sm:px-6">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-16 w-full max-w-[1320px] items-center justify-between gap-4 rounded-2xl border border-white/[0.07] bg-[#0a0a0d]/85 px-4 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.9)] backdrop-blur-xl sm:px-5"
      >
        <div className="flex flex-1 items-center">
          <Link href="/" className="inline-flex items-center" aria-label="HireLoop home">
            <Image
              src="/images/logo.png"
              alt="HireLoop"
              width={154}
              height={44}
              className="h-7 w-auto"
            />
          </Link>
        </div>

        <ul className="hidden items-center gap-6 md:flex lg:gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm text-white/55 transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex flex-1 items-center justify-end gap-3 sm:gap-4">
          <span aria-hidden className="hidden h-7 w-px bg-white/10 md:block" />
          {user ? (
            <>
              <span className="text-sm text-white/55">Welcome {user.name}</span>
              <Button onClick={onSignOut}>Sign Out</Button>
            </>
          ) : (
            <>
              <Link
                href="/signin"
                className="hidden text-sm text-white/55 transition-colors hover:text-white sm:block"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="inline-flex h-9 items-center justify-center rounded-lg bg-gradient-to-b from-[#8373ff] to-[#5b4be8] px-4 text-sm font-medium text-white shadow-[0_4px_18px_-6px_rgba(109,93,246,0.8)] transition hover:brightness-110 active:scale-[0.98]"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
