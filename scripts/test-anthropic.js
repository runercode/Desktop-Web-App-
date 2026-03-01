(async () => {
  try {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      console.error('No ANTHROPIC_API_KEY in environment');
      process.exit(2);
    }

    const Anthropic = (await import('@anthropic-ai/sdk')).default;
    const client = new Anthropic({ apiKey });

    const model = process.env.ANTHROPIC_MODEL || 'claude-sonnet-4-20250514';
    const input = 'Respond with a short JSON: {"ok":true, "msg": "hello"}';

    const res = await client.responses.create({
      model,
      input,
      max_tokens_to_sample: 200,
    });

    // Extract simple text output safely
    const output = res.output ?? [];
    let text = '';
    for (const block of output) {
      const content = Array.isArray(block.content) ? block.content : [];
      for (const c of content) {
        if (typeof c === 'string') text += c;
        else if (c && typeof c === 'object' && typeof c.text === 'string') text += c.text;
      }
    }

    text = text.trim();
    if (!text) {
      console.error('No text returned from Anthropic');
      process.exit(1);
    }

    console.log('Anthropic test output (truncated):');
    console.log(text.slice(0, 1000));
    process.exit(0);
  } catch (err) {
    console.error('Test failed:', err?.message || err);
    process.exit(1);
  }
})();
