import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, Sparkles } from "lucide-react"
import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import { FREE_APPLICATION_LIMIT } from "@/lib/applications"
import { PaymentCheckout } from "./_components/payment-checkout"

export const metadata: Metadata = {
  title: "Upgrade to Pro — HireLoop",
  description:
    "Unlock unlimited applications and keep your job search moving with HireLoop Pro.",
}

export default function PaymentPage() {
  return (
    <div className="min-h-screen bg-[#050508] text-white">
      <Navbar />

      <main className="px-4 pt-16 pb-24 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <Link
            href="/jobs"
            className="inline-flex items-center gap-1.5 text-[13px] text-white/45 transition-colors hover:text-white"
          >
            <ArrowLeft className="size-3.5" />
            Back to jobs
          </Link>

          <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#8b7cf6]/25 bg-[#8b7cf6]/10 px-3 py-1 text-[10px] font-medium tracking-[0.16em] text-[#b7aaff] uppercase">
            <Sparkles className="size-3" />
            Application limit reached
          </span>

          <h1 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            You&apos;ve used all {FREE_APPLICATION_LIMIT} free applications
          </h1>
          <p className="mt-3 max-w-xl text-sm text-white/50">
            Upgrade to HireLoop Pro to keep applying to new roles, get priority
            placement, and never miss a match.
          </p>

          <div className="mt-8">
            <PaymentCheckout />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
