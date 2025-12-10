import initializeGeminiClient from "@/lib/geminiClient.js";

export async function POST(request) {
  try {
    const { input } = await request.json();
    const text = typeof input === "string" ? input.trim() : "";
    if (!text) {
      return Response.json({ error: "Invalid input" }, { status: 400 });
    }
    const payload = text.slice(0, 5000);
    const client = initializeGeminiClient();
    const systemInstruction = "You explain complex topics simply for a young audience. Use short sentences, friendly tone, analogies, numbered steps, and end with a one-line summary.";
    const parts = [
      {
        text: `Explain the following in simple terms:\n\n${payload}\n\nRequirements:\n- Use simple language.\n- Include an analogy.\n- Provide numbered steps.\n- End with a summary line.`,
      },
    ];
    const res = await client.request({ parts, systemInstruction, maxOutputTokens: 1024 });
    if (!res.ok) {
      return Response.json({ error: res.error || "ELI5 failed" }, { status: 502 });
    }
    const store = globalThis.__activityStore ?? (globalThis.__activityStore = []);
    store.push({ tool: "eli5", inputLength: payload.length, outputLength: res.text.length, ts: Date.now() });
    return Response.json({ output: res.text });
  } catch {
    return Response.json({ error: "ELI5 failed" }, { status: 500 });
  }
}