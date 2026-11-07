
"use client";

import { useState } from "react";

const plans = [
  {
    name: "Starter",
    icon: "♛",
    monthlyPrice: 0,
    yearlyPrice: 0,
    features: [
      "Daily AI match brief (top 5)",
      "Verified salary bands",
      "Company insight dashboards",
      "1-click apply, unlimited",
    ],
  },
  {
    name: "Growth",
    icon: "▥",
    monthlyPrice: 17,
    yearlyPrice: 12.75,
    highlighted: true,
    features: [
      "Daily AI match brief (top 5)",
      "Verified salary bands",
      "Company insight dashboards",
      "1-click apply, unlimited",
    ],
  },
  {
    name: "Premium",
    icon: "ϟ",
    monthlyPrice: 99,
    yearlyPrice: 74.25,
    features: [
      "Everything in Pro",
      "Multi-profile career portfolios",
      "Shared talent rooms",
      "Recruiter view (read-only)",
    ],
  },
];

export default function Pricing() {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");

  return (
    <section className="w-full bg-black px-5 py-20 text-white sm:px-8 lg:py-28">
      <div className="mx-auto max-w-6xl">

        {/* Heading */}
        <div className="mb-10 text-center">
          <div className="mb-3 flex items-center justify-center gap-2">
            <span className="h-1 w-1 bg-violet-500" />
            <span className="text-[10px] font-medium uppercase tracking-widest text-gray-400">
              Pricing
            </span>
            <span className="h-1 w-1 bg-violet-500" />
          </div>

          <h2 className="text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
            Pay for the leverage,
            <br />
            not the listings
          </h2>
        </div>

        {/* Billing Toggle */}
        <div className="mb-12 flex justify-center">
          <div className="flex items-center gap-1 rounded-full bg-zinc-800 p-1">
            <button
              onClick={() => setBilling("monthly")}
              className={`rounded-full px-3 py-1.5 text-xs transition-all ${
                billing === "monthly"
                  ? "bg-white text-black"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Monthly
            </button>

            <button
              onClick={() => setBilling("yearly")}
              className={`rounded-full px-3 py-1.5 text-xs transition-all ${
                billing === "yearly"
                  ? "bg-white text-black"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Yearly
            </button>

            <span className="rounded-full bg-fuchsia-600 px-2 py-1 text-[10px] font-semibold text-white">
              25%
            </span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

          {plans.map((plan) => {
            const price =
              billing === "monthly"
                ? plan.monthlyPrice
                : plan.yearlyPrice;

            return (
              <div
                key={plan.name}
                className={`flex flex-col rounded-xl border p-5 transition-all duration-300 hover:-translate-y-1 ${
                  plan.highlighted
                    ? "border-zinc-700 bg-gradient-to-b from-zinc-800 to-zinc-900 shadow-xl shadow-white/5"
                    : "border-zinc-800 bg-black hover:border-zinc-600"
                }`}
              >
                {/* Plan Header */}
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-7 w-7 items-center justify-center rounded-md border border-zinc-700 bg-zinc-900 text-sm text-fuchsia-300">
                      {plan.icon}
                    </div>

                    <span className="text-sm text-gray-300">
                      {plan.name}
                    </span>
                  </div>

                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-semibold tracking-tight">
                      ${price}
                    </span>
                    <span className="text-[9px] text-gray-400">
                      /month
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="mb-3 text-[11px] font-medium text-gray-200">
                  Start building your insights hub:
                </p>

                {/* Features */}
                <ul className="mb-8 flex flex-1 flex-col gap-2.5">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-[11px] text-gray-400"
                    >
                      <span className="flex h-3 w-3 shrink-0 items-center justify-center rounded-sm bg-zinc-800 text-[11px] text-gray-300">
                        +
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <button
                  className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-[11px] font-medium transition-all ${
                    plan.highlighted
                      ? "bg-white text-black hover:bg-gray-200"
                      : "bg-zinc-800 text-white hover:bg-zinc-700"
                  }`}
                >
                  Choose This Plan
                  <span>→</span>
                </button>
              </div>
            );
          })}

        </div>
      </div>
    </section>
  );
}
