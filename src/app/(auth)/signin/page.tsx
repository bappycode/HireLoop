'use client';
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { GithubIcon, GoogleIcon } from "@/components/social-icons";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SigninPage() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);

    const formData = new FormData(event.currentTarget);
    const { data, error } = await authClient.signIn.email({
      email: String(formData.get("email") ?? ""),
      password: String(formData.get("password") ?? ""),
    })

    if (error) {
      setErrorMessage(error.message || "Could not sign in. Please try again.");
      return;
    }

    if (data) {
      router.push("/dashboard");
      router.refresh();
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#080811] px-4 py-12 text-white">
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[450px] w-[450px] -translate-x-1/2 rounded-full bg-violet-600/20 blur-[130px]" />

      <div className="relative z-10 w-full max-w-md">
        <Link href="/" className="mb-8 flex items-center justify-center gap-2 text-2xl font-bold">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-600">
            H
          </span>
          hireloop
        </Link>

        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-7 shadow-2xl backdrop-blur-xl sm:p-9">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold">Welcome back</h1>
            <p className="mt-2 text-sm text-gray-400">
              Sign in to continue to your HireLoop account.
            </p>
          </div>

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

          <div className="my-7 flex items-center gap-4">
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-xs text-gray-500">OR CONTINUE WITH EMAIL</span>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
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
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-sm font-medium text-gray-200">
                  Password
                </label>
                <Link href="/forgot-password" className="text-xs text-violet-400 hover:text-violet-300">
                  Forgot password?
                </Link>
              </div>

              <input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                autoComplete="current-password"
                required
                className="h-12 w-full rounded-lg border border-white/10 bg-black/20 px-4 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
              />
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
              Sign in
            </button>
          </form>

          <p className="mt-7 text-center text-sm text-gray-400">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="font-semibold text-violet-400 hover:text-violet-300">
              Create account
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
