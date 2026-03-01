"use client";

import type { AppType } from "@/lib/types";

interface BuilderFormProps {
  prompt: string;
  setPrompt: (v: string) => void;
  appType: AppType;
  setAppType: (v: AppType) => void;
  onGenerate: () => void;
  isGenerating: boolean;
}

export default function BuilderForm({
  prompt,
  setPrompt,
  appType,
  setAppType,
  onGenerate,
  isGenerating,
}: BuilderFormProps) {
  return (
    <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-xl">
      <label className="block text-sm font-medium text-[var(--text-muted)]">
        What do you want to build?
      </label>
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="e.g. A todo app with add/delete, dark mode, and local storage. Or: A fitness tracker with daily steps and weekly summary."
        className="mt-2 w-full resize-y rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 py-3 text-[var(--text)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)] min-h-[120px]"
        rows={4}
        disabled={isGenerating}
      />

      <div className="mt-5">
        <span className="block text-sm font-medium text-[var(--text-muted)] mb-2">
          Output
        </span>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => setAppType("web")}
            className={`rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors ${
              appType === "web"
                ? "border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--accent)]"
                : "border-[var(--border)] text-[var(--text-muted)] hover:border-[var(--text-muted)] hover:text-[var(--text)]"
            }`}
          >
            Web app
          </button>
          <button
            type="button"
            onClick={() => setAppType("mobile")}
            className={`rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors ${
              appType === "mobile"
                ? "border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--accent)]"
                : "border-[var(--border)] text-[var(--text-muted)] hover:border-[var(--text-muted)] hover:text-[var(--text)]"
            }`}
          >
            iOS + Android
          </button>
        </div>
        <p className="mt-2 text-xs text-[var(--text-muted)]">
          {appType === "web"
            ? "Single-page web app (HTML/CSS/JS or React). Run in browser or deploy anywhere."
            : "React Native + Expo project. One codebase for iPhone and Android."}
        </p>
      </div>

      <button
        type="button"
        onClick={onGenerate}
        disabled={isGenerating || !prompt.trim()}
        className="mt-6 w-full rounded-xl bg-[var(--accent)] py-3.5 font-medium text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isGenerating ? (
          <span className="flex items-center justify-center gap-2">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            Generating your app…
          </span>
        ) : (
          "Generate app"
        )}
      </button>
    </section>
  );
}
