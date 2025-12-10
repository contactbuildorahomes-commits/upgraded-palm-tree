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
    const systemInstruction = "You are a precise summarizer. Extract key points, preserve meaning, and keep it concise.";
    const parts = [{ text: `Summarize the following text into clear bullet points and a short conclusion.\n\n${payload}` }];
    const res = await client.request({ parts, systemInstruction, maxOutputTokens: 1200 });
    if (!res.ok) {
      return Response.json({ error: res.error || "Summarize failed" }, { status: 502 });
    }
    const store = globalThis.__activityStore ?? (globalThis.__activityStore = []);
    store.push({ tool: "summarizer", inputLength: payload.length, outputLength: res.text.length, ts: Date.now() });
    return Response.json({ output: res.text });
  } catch {
    return Response.json({ error: "Summarize failed" }, { status: 500 });
  }
}