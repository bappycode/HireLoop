'use client';
import { useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { GithubIcon, GoogleIcon } from "@/components/social-icons";
import { useRouter } from "next/navigation";

const roles = [
  {
    id: "seeker",
    title: "Job Seeker",
    description: "Find opportunities and grow your career.",
    icon: "👤",
  },
  {
    id: "recruiter",
    title: "Recruiter",
    description: "Discover talent and hire great people.",
    icon: "💼",
  },
  {
    id: "admin",
    title: "Admin",
    description: "Admin will handle the Admin Previlages",
    icon: "🛡️",
  },
] as const;

export default function SignupPage() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);

    const formData = new FormData(event.currentTarget);
    const { data, error } = await authClient.signUp.email({
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      password: String(formData.get("password") ?? ""),
      role: formData.get("role") as "seeker" | "recruiter" | "admin",
    })

    if (error) {
      setErrorMessage(error.message || "Could not create your account.");
      return;
    }

    if (data) {
      router.push("/signin");
    }
  }
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#080811] px-4 py-12 text-white">
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[450px] w-[450px] -translate-x-1/2 rounded-full bg-violet-600/20 blur-[130px]" />

      <div className="relative z-10 w-full max-w-lg">
        <Link href="/" className="mb-8 flex items-center justify-center gap-2 text-2xl font-bold">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-600">
            H
          </span>
          hireloop
        </Link>

        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-7 shadow-2xl backdrop-blur-xl sm:p-9">
          <div className="mb-7 text-center">
            <h1 className="text-3xl font-bold">Create your account</h1>
            <p className="mt-2 text-sm text-gray-400">
              Join HireLoop and take your next step.
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <fieldset>
              <legend className="mb-3 text-sm font-medium text-gray-200">
                I want to join as a
              </legend>

              <div className="grid grid-cols-3 gap-3">
                {roles.map((role, index) => (
                  <label key={role.id} className="cursor-pointer">
                    <input
                      type="radio"
                      name="role"
                      value={role.id}
                      defaultChecked={index === 0}
                      className="peer sr-only"
                    />

                    <div className="h-full rounded-xl border border-white/10 bg-black/20 p-4 transition hover:border-violet-400/50 peer-checked:border-violet-500 peer-checked:bg-violet-500/10 peer-focus-visible:ring-2 peer-focus-visible:ring-violet-500">
                      <span className="mb-3 block text-xl" aria-hidden="true">
                        {role.icon}
                      </span>
                      <h3 className="text-sm font-semibold">{role.title}</h3>
                      <p className="mt-1 text-xs leading-relaxed text-gray-500">
                        {role.description}
                      </p>
                    </div>
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="grid grid-cols-2 gap-3">
              <button type="button" className="flex h-11 items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 text-sm font-medium transition hover:bg-white/10">
                <GoogleIcon className="h-4 w-4" />
                Google
              </button>

              <button type="button" className="flex h-11 items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 text-sm font-medium transition hover:bg-white/10">
                <GithubIcon className="h-[18px] w-[18px]" />
                GitHub
              </button>
            </div>

            <div className="flex items-center gap-4">
              <div className="h-px flex-1 bg-white/10" />
              <span className="text-xs text-gray-500">OR SIGN UP WITH EMAIL</span>
              <div className="h-px flex-1 bg-white/10" />
            </div>

            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-gray-200">
                Full name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="John Doe"
                autoComplete="name"
                required
                className="h-12 w-full rounded-lg border border-white/10 bg-black/20 px-4 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-200">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                required
                className="h-12 w-full rounded-lg border border-white/10 bg-black/20 px-4 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-gray-200">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Create a password"
                autoComplete="new-password"
                minLength={8}
                required
                className="h-12 w-full rounded-lg border border-white/10 bg-black/20 px-4 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
              />
              <p className="text-xs text-gray-500">
                Use at least 8 characters.
              </p>
            </div>

            {errorMessage ? (
              <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs text-red-300">
                {errorMessage}
              </p>
            ) : null}

            <button
              type="submit"
              className="h-12 w-full rounded-lg bg-violet-600 text-sm font-semibold text-white shadow-lg shadow-violet-600/20 transition hover:bg-violet-500"
            >
              Create account
            </button>
          </form>

          <p className="mt-7 text-center text-sm text-gray-400">
            Already have an account?{" "}
            <Link href="/signin" className="font-semibold text-violet-400 hover:text-violet-300">
              Sign in
            </Link>
          </p>
        </div>

        <p className="mt-7 text-center text-xs text-gray-600">
          © 2026 HireLoop. All rights reserved.
        </p>
      </div>
    </main>
  );
}
