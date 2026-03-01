import { NextRequest, NextResponse } from "next/server";
import { getSystemPrompt, getUserPrompt } from "@/lib/prompts";
import { generateCode } from "@/lib/ai";
import { buildZip, sanitizeProjectName } from "@/lib/zip";
import type { AppType } from "@/lib/types";

function extractJson(text: string): { files?: Record<string, string> } {
  const trimmed = text.trim();
  // Remove optional markdown code fence
  let raw = trimmed;
  const match = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (match) raw = match[1].trim();
  return JSON.parse(raw) as { files?: Record<string, string> };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const prompt = typeof body.prompt === "string" ? body.prompt.trim() : "";
    const appType: AppType = body.appType === "mobile" ? "mobile" : "web";

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    const systemPrompt = getSystemPrompt(appType);
    const userPrompt = getUserPrompt(prompt, appType);

    const rawResponse = await generateCode(systemPrompt, userPrompt);
    const parsed = extractJson(rawResponse);
    const files = parsed.files;

    if (!files || typeof files !== "object" || Object.keys(files).length === 0) {
      return NextResponse.json(
        { error: "AI did not return a valid files object. Try again." },
        { status: 502 }
      );
    }

    const projectName = sanitizeProjectName(
      prompt.split(/\s+/).slice(0, 3).join("-").toLowerCase()
    );
    const zipBuffer = await buildZip(files, projectName, appType);
    const zipBase64 = zipBuffer.toString("base64");

    return NextResponse.json({
      projectName,
      downloadUrl: `data:application/zip;base64,${zipBase64}`,
      files: undefined,
    });
  } catch (e) {
    console.error("Generate error:", e);
    const message = e instanceof Error ? e.message : "Generation failed";
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
