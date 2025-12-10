const DEFAULT_MODEL = process.env.GEMINI_MODEL || "models/gemini-1.5-pro";
const API_BASE = "https://generativelanguage.googleapis.com/v1beta";

function initializeGeminiClient({
  apiKey = process.env.GEMINI_API_KEY,
  model = DEFAULT_MODEL,
  maxTokens = 4096,
  temperature = 0.7,
  timeoutMs = 20000,
  retries = 2,
} = {}) {
  if (!apiKey) {
    return {
      request: async () => ({ ok: false, error: "GEMINI_API_KEY is not set" }),
    };
  }

  const buildURL = (path) => `${API_BASE}/${path}?key=${encodeURIComponent(apiKey)}`;

  const request = async ({ parts, systemInstruction, modelOverride, maxOutputTokens }) => {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    const body = {
      contents: [{ role: "user", parts }],
      generationConfig: {
        temperature,
        maxOutputTokens: maxOutputTokens || maxTokens,
      },
      ...(systemInstruction ? { systemInstruction: { role: "system", parts: [{ text: systemInstruction }] } } : {}),
    };

    const url = buildURL(`${modelOverride || model}:generateContent`);

    let attempts = 0;
    while (attempts <= retries) {
      try {
        const res = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
          signal: controller.signal,
        });
        clearTimeout(timer);
        if (!res.ok) {
          const errText = await res.text().catch(() => "");
          throw new Error(`Gemini error: ${res.status} ${errText}`);
        }
        const json = await res.json();
        const candidates = Array.isArray(json?.candidates) ? json.candidates : [];
        const text = candidates[0]?.content?.parts?.map((p) => p.text || "").join("")?.trim() || "";
        if (!text || /\b(incomplete|partial|error)\b/i.test(text)) {
          if (attempts < retries) {
            attempts++;
            continue;
          }
          return { ok: false, error: "Incomplete response" };
        }
        return { ok: true, text };
      } catch (e) {
        if (attempts < retries) {
          attempts++;
          continue;
        }
        return { ok: false, error: e?.message || "Gemini request failed" };
      } finally {
        clearTimeout(timer);
      }
    }
    return { ok: false, error: "Unknown error" };
  };

  return { request };
}

export { initializeGeminiClient };
export default initializeGeminiClient;