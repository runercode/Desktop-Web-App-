import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { APP_NAME } from "@/lib/constants";
import PromptButton from "@/components/PromptButton";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <header className="border-b border-[var(--border)] bg-[var(--surface)]/80 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
          <span className="text-lg font-semibold gradient-text">{APP_NAME}</span>
          <nav className="flex items-center gap-4">
            {session && (
              <Link
                href="/plans"
                className="text-sm text-[var(--text-muted)] hover:text-[var(--text)]"
              >
                Plans
              </Link>
            )}
            {/* always show the prompt button */}
            <PromptButton
              session={session}
              className="rounded-lg bg-[var(--accent)] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
            />
            {!session && (
              <Link
                href="/signin"
                className="text-sm text-[var(--text-muted)] hover:text-[var(--text)]"
              >
                Sign in
              </Link>
            )}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-20 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Build web & mobile apps
          <br />
          <span className="gradient-text">in minutes, not weeks</span>
        </h1>
        <p className="mt-6 text-lg text-[var(--text-muted)]">
          Describe your app in plain English. Get a full project for the web or iOS and Android. No code required.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          {/* always show the prompt button in the hero */}
          <PromptButton session={session} />
          {!session && (
            <Link
              href="/signin"
              className="rounded-xl border border-[var(--border)] px-8 py-4 text-base font-medium text-[var(--text)] hover:bg-[var(--surface)]"
            >
              Sign in
            </Link>
          )}
        </div>

        <div className="mt-24 grid gap-6 sm:grid-cols-3 text-left">
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
            <div className="text-2xl font-semibold text-[var(--accent)]">1</div>
            <h3 className="mt-2 font-medium">Create an account</h3>
            <p className="mt-1 text-sm text-[var(--text-muted)]">Sign up free. Pick a plan when you’re ready.</p>
          </div>
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
            <div className="text-2xl font-semibold text-[var(--accent)]">2</div>
            <h3 className="mt-2 font-medium">Choose your plan</h3>
            <p className="mt-1 text-sm text-[var(--text-muted)]">Free, Pro, or Max — build at your own pace.</p>
          </div>
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
            <div className="text-2xl font-semibold text-[var(--accent)]">3</div>
            <h3 className="mt-2 font-medium">Design with AI</h3>
            <p className="mt-1 text-sm text-[var(--text-muted)]">Describe your app, get a full project in minutes.</p>
          </div>
        </div>
      </main>

      <footer className="mt-24 border-t border-[var(--border)] py-8 text-center text-sm text-[var(--text-muted)]">
        Web apps, iOS & Android — one prompt, one codebase.
      </footer>
    </div>
  );
}
