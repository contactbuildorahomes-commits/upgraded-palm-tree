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
    const systemInstruction = "You generate clean study notes. Use short headings and bullet points, grouping ideas logically.";
    const parts = [
      {
        text: `Create study notes from the text.\n\n${payload}\n\nOutput:\n- Title line\n- 3-5 section headings with bullets\n- Keep it concise\nReturn plain text only.`,
      },
    ];
    const res = await client.request({ parts, systemInstruction, maxOutputTokens: 1200 });
    if (!res.ok) {
      return Response.json({ error: res.error || "Notes failed" }, { status: 502 });
    }
    const store = globalThis.__activityStore ?? (globalThis.__activityStore = []);
    store.push({ tool: "notes", inputLength: payload.length, outputLength: res.text.length, ts: Date.now() });
    return Response.json({ output: res.text });
  } catch {
    return Response.json({ error: "Notes failed" }, { status: 500 });
  }
}