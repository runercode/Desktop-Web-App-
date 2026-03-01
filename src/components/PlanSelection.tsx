"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const PLANS = [
  {
    id: "free",
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Try the designer and build your first apps.",
    features: ["3 app generations per month", "Web & mobile output", "Download as ZIP", "Community support"],
    cta: "Get started",
    highlighted: false,
  },
  {
    id: "pro",
    name: "Pro",
    price: "$19",
    period: "/month",
    description: "For makers and small teams shipping often.",
    features: ["Unlimited generations", "Priority generation", "Save & revisit projects", "Email support"],
    cta: "Go Pro",
    highlighted: true,
  },
  {
    id: "max",
    name: "Max",
    price: "$49",
    period: "/month",
    description: "Maximum power and support for teams.",
    features: ["Everything in Pro", "Team seats (up to 5)", "API access", "Dedicated support"],
    cta: "Go Max",
    highlighted: false,
  },
] as const;

interface PlanSelectionProps {
  currentPlan: string;
}

export default function PlanSelection({ currentPlan }: PlanSelectionProps) {
  const router = useRouter();
  const [loadingId, setLoadingId] = useState<string | null>(null);

  async function selectPlan(planId: string) {
    setLoadingId(planId);
    try {
      const res = await fetch("/api/auth/plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: planId }),
      });
      if (!res.ok) throw new Error("Failed");
      router.refresh();
      router.push("/designer");
    } catch {
      setLoadingId(null);
    } finally {
      setLoadingId(null);
    }
  }

  return (
    <div className="mt-10 grid gap-6 sm:grid-cols-3">
      {PLANS.map((plan) => {
        const isCurrent = currentPlan === plan.id;
        return (
          <div
            key={plan.id}
            className={`relative rounded-2xl border p-6 ${
              plan.highlighted
                ? "border-[var(--accent)] bg-[var(--accent-soft)] shadow-lg shadow-[var(--accent)]/10"
                : "border-[var(--border)] bg-[var(--surface)]"
            }`}
          >
            {plan.highlighted && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[var(--accent)] px-3 py-0.5 text-xs font-medium text-white">
                Popular
              </span>
            )}
            <div className="flex flex-col">
              <h3 className="text-lg font-semibold">{plan.name}</h3>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-2xl font-bold">{plan.price}</span>
                <span className="text-[var(--text-muted)]">{plan.period}</span>
              </div>
              <p className="mt-3 text-sm text-[var(--text-muted)]">{plan.description}</p>
              <ul className="mt-4 space-y-2 text-sm text-[var(--text)]">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <span className="text-emerald-500">✓</span> {f}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex-1">
                {isCurrent ? (
                  <span className="block rounded-xl border border-[var(--border)] py-3 text-center text-sm font-medium text-[var(--text-muted)]">
                    Current plan
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() => selectPlan(plan.id)}
                    disabled={!!loadingId}
                    className={`w-full rounded-xl py-3 font-medium transition-opacity hover:opacity-90 disabled:opacity-50 ${
                      plan.highlighted
                        ? "bg-[var(--accent)] text-white"
                        : "border border-[var(--border)] text-[var(--text)] hover:bg-[var(--bg)]"
                    }`}
                  >
                    {loadingId === plan.id ? "Updating…" : plan.cta}
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
