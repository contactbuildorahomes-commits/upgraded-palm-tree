import initializeGeminiClient from "@/lib/geminiClient.js";

export async function POST(request) {
  try {
    const { input, tone = "neutral" } = await request.json();
    const text = typeof input === "string" ? input.trim() : "";
    if (!text) {
      return Response.json({ error: "Invalid input" }, { status: 400 });
    }
    const payload = text.slice(0, 5000);
    const client = initializeGeminiClient();
    const systemInstruction = "You are a precise rewriting assistant. Improve clarity, grammar, and style while preserving meaning. Respect the requested tone.";
    const parts = [
      {
        text: `Rewrite the text with a ${tone} tone, improving clarity and grammar without changing meaning. Return only the rewritten text.\n\n${payload}`,
      },
    ];
    const res = await client.request({ parts, systemInstruction, maxOutputTokens: 1500 });
    if (!res.ok) {
      return Response.json({ error: res.error || "Rewrite failed" }, { status: 502 });
    }
    const store = globalThis.__activityStore ?? (globalThis.__activityStore = []);
    store.push({ tool: "rewriter", inputLength: payload.length, outputLength: res.text.length, ts: Date.now() });
    return Response.json({ output: res.text });
  } catch {
    return Response.json({ error: "Rewrite failed" }, { status: 500 });
  }
}