'use client';
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
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
] as const;

export default function SignupPage() {
  const router = useRouter();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const Fdata = Object.fromEntries(formData.entries());
    const {data, error} = await authClient.signUp.email({
      name: Fdata.name as string,
      email: Fdata.email as string,
      password: Fdata.password as string,
      role: Fdata.role as string,
    })
    if(data){
      console.log("Sign up successful:", data);
      router.push("/signin");
    }
    if(error){
      console.error("Sign up error:", error);
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

              <div className="grid grid-cols-2 gap-3">
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
                <GoogleIcon />
                Google
              </button>

              <button type="button" className="flex h-11 items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 text-sm font-medium transition hover:bg-white/10">
                <GithubIcon />
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

function GoogleIcon() {
  return (
    <svg viewBox="0 0 48 48" className="h-4 w-4" aria-hidden="true">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5Z" transform="translate(0 4)" />
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.76 7.18l7.73 6C44.42 37.94 46.98 31.82 46.98 24.55Z" />
      <path fill="#FBBC05" d="M10.53 28.59A14.4 14.4 0 0 1 9.75 24c0-1.59.27-3.13.76-4.59l-7.98-6.19A23.94 23.94 0 0 0 0 24c0 3.87.93 7.52 2.56 10.78l7.97-6.19Z" />
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.91-5.8l-7.73-6c-2.13 1.45-4.84 2.3-8.18 2.3-6.26 0-11.57-4.22-13.46-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48Z" />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] fill-current" aria-hidden="true">
      <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.56.1.76-.24.76-.54v-2.1c-3.1.67-3.76-1.32-3.76-1.32-.5-1.3-1.23-1.65-1.23-1.65-1.01-.69.08-.68.08-.68 1.12.08 1.7 1.15 1.7 1.15.99 1.69 2.6 1.2 3.23.92.1-.72.39-1.2.7-1.48-2.47-.28-5.07-1.24-5.07-5.51 0-1.22.44-2.22 1.15-3-.12-.28-.5-1.42.11-2.96 0 0 .94-.3 3.06 1.14a10.64 10.64 0 0 1 5.57 0c2.12-1.44 3.06-1.14 3.06-1.14.61 1.54.23 2.68.11 2.96.72.78 1.15 1.78 1.15 3 0 4.28-2.6 5.23-5.08 5.5.4.35.75 1.03.75 2.08v3.09c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z" />
    </svg>
  );
}
