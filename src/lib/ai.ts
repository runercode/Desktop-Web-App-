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

  // Use the responses API which is the stable interface for generation.
  const input = `${systemPrompt}\n\n${userPrompt}`;
  const res = await client.responses.create({
    model: ANTHROPIC_MODEL,
    input,
    max_tokens_to_sample: 16000,
  });

  // The SDK returns an output array with content entries. Try common keys.
  const output = res.output ?? [];
  if (!Array.isArray(output) || output.length === 0) {
    throw new Error("Anthropic returned no output");
  }

  // Try to find textual content in the response content blocks.
  let text = "";
  for (const block of output) {
    const content = Array.isArray(block.content) ? block.content : [];
    for (const c of content) {
      if (typeof c === "string") {
        text += c;
      } else if (c && typeof c === "object") {
        // common content types: {type: 'output_text', text: '...'} or {type: 'message', text: '...'}
        if (typeof c.text === "string") text += c.text;
        if (typeof c.type === "string" && c.type === "output_text" && typeof c.text === "string") text += c.text;
      }
    }
  }

  text = text.trim();
  if (!text) throw new Error("Anthropic returned no text");
  return text;
}
