"use client";

import type { AppType, GenerationState } from "@/lib/types";

interface ResultPanelProps {
  state: GenerationState;
  error: string | null;
  downloadUrl: string | null;
  projectName: string | null;
  appType: AppType;
}

export default function ResultPanel({
  state,
  error,
  downloadUrl,
  projectName,
  appType,
}: ResultPanelProps) {
  if (state === "idle") return null;

  if (state === "generating") {
    return (
      <div className="mt-8 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8 text-center">
        <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-2 border-[var(--accent)] border-t-transparent" />
        <p className="text-[var(--text-muted)]">
          AI is generating your {appType === "web" ? "web app" : "mobile app"} project. This usually takes 30–90 seconds.
        </p>
      </div>
    );
  }

  if (state === "error") {
    return (
      <div className="mt-8 rounded-2xl border border-red-500/30 bg-red-500/10 p-6">
        <p className="font-medium text-red-400">Generation failed</p>
        <p className="mt-2 text-sm text-[var(--text-muted)]">{error}</p>
        <p className="mt-4 text-xs text-[var(--text-muted)]">
          Check your Anthropic API key in .env and try again.
        </p>
      </div>
    );
  }

  if (state === "done" && downloadUrl && projectName) {
    return (
      <div className="mt-8 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-6">
        <p className="font-medium text-emerald-400">Your app is ready</p>
        <p className="mt-1 text-sm text-[var(--text-muted)]">
          Download the project as a ZIP and run it locally.
        </p>
        <a
          href={downloadUrl}
          download={`${projectName}.zip`}
          className="mt-4 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 font-medium text-white hover:bg-emerald-500"
        >
          Download {projectName}.zip
        </a>
        <div className="mt-4 rounded-lg bg-[var(--bg)] p-4 font-mono text-xs text-[var(--text-muted)]">
          {appType === "web" ? (
            <>Unzip, then open <code className="text-[var(--text)]">index.html</code> in a browser or run a local server.</>
          ) : (
            <>Unzip, then run <code className="text-[var(--text)]">npm install</code> and <code className="text-[var(--text)]">npx expo start</code>. Scan the QR code with Expo Go on your phone.</>
          )}
        </div>
      </div>
    );
  }

  return null;
}
