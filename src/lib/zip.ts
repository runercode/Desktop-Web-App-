import JSZip from "jszip";
import type { AppType } from "./types";

export async function buildZip(
  files: Record<string, string>,
  projectName: string,
  appType: AppType
): Promise<Buffer> {
  const zip = new JSZip();
  const prefix = appType === "mobile" ? projectName : projectName;

  for (const [path, content] of Object.entries(files)) {
    const normalized = path.replace(/^\.\//, "").replace(/^\//, "");
    const fullPath = prefix ? `${prefix}/${normalized}` : normalized;
    zip.file(fullPath, content);
  }

  const blob = await zip.generateAsync({ type: "nodebuffer" });
  return Buffer.from(blob);
}

export function sanitizeProjectName(name: string): string {
  return name
    .replace(/[^a-zA-Z0-9-_]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 40) || "my-app";
}
