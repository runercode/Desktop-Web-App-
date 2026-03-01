"use client";

import { useState } from "react";
import Link from "next/link";
import BuilderForm from "@/components/BuilderForm";
import ResultPanel from "@/components/ResultPanel";
import type { AppType, GenerationState } from "@/lib/types";
import { APP_NAME } from "@/lib/constants";

export default function DesignerPage() {
  const [prompt, setPrompt] = useState("");
  const [appType, setAppType] = useState<AppType>("web");
  const [state, setState] = useState<GenerationState>("idle");
  const [error, setError] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [projectName, setProjectName] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setState("generating");
    setError(null);
    setDownloadUrl(null);
    setProjectName(null);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: prompt.trim(), appType }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Generation failed");

      setDownloadUrl(data.downloadUrl);
      setProjectName(data.projectName ?? "my-app");
      setState("done");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
      setState("error");
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <header className="border-b border-[var(--border)] bg-[var(--surface)]/80 backdrop-blur">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-5">
          <div>
            <Link href="/" className="text-lg font-semibold gradient-text">
              {APP_NAME}
            </Link>
            <p className="mt-1 text-sm text-[var(--text-muted)]">
              Designer — Create web & mobile apps from a prompt
            </p>
          </div>
          <nav className="flex items-center gap-3">
            <Link
              href="/plans"
              className="text-sm text-[var(--text-muted)] hover:text-[var(--text)]"
            >
              Plans
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-8">
        <BuilderForm
          prompt={prompt}
          setPrompt={setPrompt}
          appType={appType}
          setAppType={setAppType}
          onGenerate={handleGenerate}
          isGenerating={state === "generating"}
        />

        <ResultPanel
          state={state}
          error={error}
          downloadUrl={downloadUrl}
          projectName={projectName}
          appType={appType}
        />
      </main>

      <footer className="mt-16 border-t border-[var(--border)] py-6 text-center text-sm text-[var(--text-muted)]">
        Export as a ZIP. Run locally or deploy to the web / App Store / Play Store.
      </footer>
    </div>
  );
}
