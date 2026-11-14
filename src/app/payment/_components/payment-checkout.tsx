"use client"

import { useState } from "react"
import { Check, CreditCard, Lock, Sparkles } from "lucide-react"
import { FREE_APPLICATION_LIMIT } from "@/lib/applications"
import { Button } from "@/components/ui/button"

type Billing = "monthly" | "yearly"

const plans: Record<Billing, { price: number; note: string }> = {
  monthly: { price: 17, note: "Billed monthly · cancel anytime" },
  yearly: { price: 12.75, note: "Billed $153 per year · save 25%" },
}

const proFeatures = [
  "Unlimited job applications",
  "Priority ranking in recruiter searches",
  "Daily AI match brief",
  "Cancel anytime",
]

function toggleClass(active: boolean) {
  return `rounded-full px-3 py-1.5 text-[11px] transition-colors ${
    active ? "bg-white text-black" : "text-white/50 hover:text-white"
  }`
}

export function PaymentCheckout() {
  const [billing, setBilling] = useState<Billing>("monthly")
  const [showDemoNotice, setShowDemoNotice] = useState(false)

  const plan = plans[billing]
  const dueToday = billing === "monthly" ? plan.price : plan.price * 12

  return (
    <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr] lg:items-start">
      <section className="rounded-2xl bg-[#0f0f12] p-6 ring-1 ring-white/[0.07]">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Sparkles className="size-4 text-[#8b7cf6]" />
            <h2 className="text-sm font-medium">HireLoop Pro</h2>
          </div>

          <div
            className="flex items-center gap-1 rounded-full bg-white/[0.04] p-1 ring-1 ring-white/10"
            role="group"
            aria-label="Billing cycle"
          >
            <button
              type="button"
              onClick={() => setBilling("monthly")}
              aria-pressed={billing === "monthly"}
              className={toggleClass(billing === "monthly")}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => setBilling("yearly")}
              aria-pressed={billing === "yearly"}
              className={toggleClass(billing === "yearly")}
            >
              Yearly
            </button>
          </div>
        </div>

        <div className="mt-6 rounded-xl border border-white/[0.07] bg-white/[0.02] p-3">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-white/50">Free applications used</span>
            <span className="text-white/80">
              {FREE_APPLICATION_LIMIT} / {FREE_APPLICATION_LIMIT}
            </span>
          </div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
            <div className="h-full w-full rounded-full bg-gradient-to-r from-[#8373ff] to-[#5b4be8]" />
          </div>
        </div>

        <p className="mt-6 flex items-baseline gap-1.5">
          <span className="text-4xl font-semibold tracking-tight">
            ${plan.price}
          </span>
          <span className="text-xs text-white/40">/ month</span>
        </p>
        <p className="mt-1 text-[11px] text-white/35">{plan.note}</p>

        <ul className="mt-6 space-y-2.5">
          {proFeatures.map((feature) => (
            <li
              key={feature}
              className="flex items-center gap-2 text-[13px] text-white/65"
            >
              <span className="flex size-4 items-center justify-center rounded-full bg-emerald-500/10">
                <Check className="size-2.5 text-emerald-400" />
              </span>
              {feature}
            </li>
          ))}
        </ul>
      </section>

      <aside className="rounded-2xl bg-[#0f0f12] p-6 ring-1 ring-white/[0.07]">
        <h2 className="text-sm font-medium">Order summary</h2>

        <dl className="mt-4 space-y-2.5 text-[13px]">
          <div className="flex items-center justify-between gap-4">
            <dt className="text-white/40">HireLoop Pro</dt>
            <dd className="text-white/75">${plan.price}/mo</dd>
          </div>
          <div className="flex items-center justify-between gap-4">
            <dt className="text-white/40">Billing</dt>
            <dd className="text-white/75">
              {billing === "monthly" ? "Monthly" : "Yearly"}
            </dd>
          </div>
          <div className="flex items-center justify-between gap-4 border-t border-white/[0.07] pt-2.5">
            <dt className="text-white/60">Due today</dt>
            <dd className="text-base font-medium">${dueToday.toFixed(2)}</dd>
          </div>
        </dl>

        <Button
          type="button"
          onClick={() => setShowDemoNotice(true)}
          className="mt-5 h-10 w-full gap-1.5 rounded-lg bg-gradient-to-b from-[#8373ff] to-[#5b4be8] text-sm font-medium text-white shadow-[0_4px_18px_-6px_rgba(109,93,246,0.8)] transition hover:brightness-110"
        >
          <CreditCard />
          Pay ${dueToday.toFixed(2)}
        </Button>

        {showDemoNotice ? (
          <p className="mt-3 rounded-lg border border-[#8b7cf6]/30 bg-[#8b7cf6]/10 px-3 py-2 text-[11px] text-[#c7bfff]">
            Demo checkout — payments aren&apos;t connected yet. No charge was
            made.
          </p>
        ) : (
          <p className="mt-3 text-center text-[11px] text-white/30">
            Demo checkout — no payment will be processed.
          </p>
        )}

        <p className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-white/30">
          <Lock className="size-3" />
          Secure checkout
        </p>
      </aside>
    </div>
  )
}
