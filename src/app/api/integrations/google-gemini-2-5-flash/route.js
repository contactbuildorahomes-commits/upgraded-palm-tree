import initializeGeminiClient from "@/lib/geminiClient.js";

export async function POST(request) {
  try {
    const body = await request.json();
    const messages = Array.isArray(body?.messages) ? body.messages : [];
    const latest = messages.at(-1);
    const input = typeof latest?.content === "string" ? latest.content.trim() : "";
    if (!input) {
      return Response.json({ error: "Invalid input" }, { status: 400 });
    }
    const client = initializeGeminiClient({ model: process.env.GEMINI_FLASH_MODEL || "models/gemini-2.0-flash-exp" });
    const parts = [{ text: input.slice(0, 3000) }];
    const res = await client.request({ parts, maxOutputTokens: 800 });
    if (!res.ok) {
      return Response.json({ error: res.error || "Gemini request failed" }, { status: 502 });
    }
    return Response.json({
      choices: [
        {
          message: { content: res.text },
        },
      ],
    });
  } catch {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }
}