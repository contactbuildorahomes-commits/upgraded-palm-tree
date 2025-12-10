import initializeGeminiClient from "@/lib/geminiClient.js";

export async function POST(request) {
  try {
    const { input, topic, tone = "neutral", headingStyle = "h2" } = await request.json();
    const baseText = (typeof input === "string" ? input : "") || (typeof topic === "string" ? topic : "");
    const text = baseText.trim();
    if (!text) {
      return Response.json({ error: "Invalid input" }, { status: 400 });
    }
    const payload = text.slice(0, 5000);
    const client = initializeGeminiClient();
    const systemInstruction = "You generate structured, professional reports with clear headings, numbered findings, evidence, and recommendations.";
    const parts = [
      {
        text: `Create a report based on the input.\n\nTopic/Text:\n${payload}\n\nRequirements:\n- Title line starting with 'Report:'\n- Sections: Executive Summary, Key Findings, Supporting Evidence, Recommendations, Conclusion\n- Use ${headingStyle} style headings\n- Maintain a ${tone} tone\n- Return plain text only`,
      },
    ];
    const res = await client.request({ parts, systemInstruction, maxOutputTokens: 2000 });
    if (!res.ok) {
      return Response.json({ error: res.error || "Report failed" }, { status: 502 });
    }
    const store = globalThis.__activityStore ?? (globalThis.__activityStore = []);
    store.push({ tool: "report", inputLength: payload.length, outputLength: res.text.length, ts: Date.now() });
    return Response.json({ output: res.text, tone, headingStyle });
  } catch {
    return Response.json({ error: "Report failed" }, { status: 500 });
  }
}