/**
 * AI code generation — Anthropic (Claude) only.
 */

const ANTHROPIC_MODEL = process.env.ANTHROPIC_MODEL || "claude-sonnet-4-20250514";

export async function generateCode(
  systemPrompt: string,
  userPrompt: string
): Promise<string> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error("ANTHROPIC_API_KEY is not set in .env");

  const Anthropic = (await import("@anthropic-ai/sdk")).default;
  const client = new Anthropic({ apiKey });

  // Use the messages API for Claude code generation.
  const userMessage = `${systemPrompt}\n\n${userPrompt}`;
  const res = await client.messages.create({
    model: ANTHROPIC_MODEL,
    max_tokens: 16000,
    messages: [
      {
        role: "user",
        content: userMessage,
      },
    ],
  });

  // Extract text from response content blocks.
  let text = "";
  for (const block of res.content) {
    if (block.type === "text") {
      text += block.text;
    }
  }

  text = text.trim();
  if (!text) throw new Error("Anthropic returned no text");
  return text;
}
