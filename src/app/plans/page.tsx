import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import PlanSelection from "@/components/PlanSelection";
import Link from "next/link";
import { APP_NAME } from "@/lib/constants";

export default async function PlansPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect("/signin?callbackUrl=/plans");
  }
  const plan = (session.user as { plan?: string }).plan ?? "free";

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <header className="border-b border-[var(--border)] bg-[var(--surface)]/80 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
          <Link href="/" className="text-lg font-semibold gradient-text">
            {APP_NAME}
          </Link>
          <Link
            href="/designer"
            className="text-sm text-[var(--text-muted)] hover:text-[var(--text)]"
          >
            Skip to designer →
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-12">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Choose your plan</h1>
          <p className="mt-2 text-[var(--text-muted)]">
            Start free. Upgrade when you need more.
          </p>
        </div>

        <PlanSelection currentPlan={plan} />

        <p className="mt-8 text-center text-sm text-[var(--text-muted)]">
          You can change your plan anytime from your account.
        </p>
      </main>
    </div>
  );
}
