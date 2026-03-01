"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body>
        <div style={{ padding: 24, fontFamily: "system-ui, sans-serif" }}>
          <h1 style={{ margin: 0 }}>App crashed</h1>
          <p style={{ opacity: 0.8 }}>
            Please try again. If this keeps happening, restart the dev server.
          </p>
          <button onClick={() => reset()}>Try again</button>
          <pre style={{ marginTop: 16, whiteSpace: "pre-wrap" }}>
            {error?.message}
          </pre>
        </div>
      </body>
    </html>
  );
}

