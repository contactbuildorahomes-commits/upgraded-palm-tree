import { useState } from "react";
import { motion } from "motion/react";

export const meta = () => [
  { title: "Briefly — Rewriter" },
  { name: "description", content: "Rewrite text with perfect tone and grammar." },
  { property: "og:title", content: "Briefly — Rewriter" },
  { property: "og:description", content: "Enhance writing with intelligent tone and grammar." },
  { property: "og:image", content: import.meta.env.NEXT_PUBLIC_OG_IMAGE || "" },
  { name: "twitter:title", content: "Briefly — Rewriter" },
  { name: "twitter:description", content: "Enhance writing with intelligent tone and grammar." },
  { name: "twitter:image", content: import.meta.env.NEXT_PUBLIC_OG_IMAGE || "" },
];

function MainComponent() {
  const [text, setText] = useState("");
  const [tone, setTone] = useState("neutral");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const ld = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Briefly Rewriter",
    applicationCategory: "ProductivityApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description: "Rewrite text with a chosen tone, improving clarity and grammar.",
  };

  const handleRewrite = async () => {
    if (!text.trim()) return;
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/rewriter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: text.slice(0, 5000), tone }),
      });
      const data = await res.json();
      if (!res.ok || data?.error) {
        setError(data?.error || "Failed to rewrite");
        return;
      }
      setOutput(data.output || "");
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (output) await navigator.clipboard.writeText(output);
  };

  const download = (ext = "txt") => {
    const blob = new Blob([output], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `rewritten.${ext}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#000000] via-[#0A0A0A] to-[#1A0B2E] relative overflow-hidden p-6">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div className="space-y-4">
          <h1 className="text-4xl font-black text-transparent bg-gradient-to-r from-purple-400 via-pink-300 to-cyan-300 bg-clip-text">Rewriter</h1>
          <p className="text-gray-300">Rewrite your text with improved clarity and your selected tone.</p>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste your text"
            className="w-full h-56 bg-[#0A0A0A]/60 border border-purple-500/30 rounded-2xl p-4 text-white"
            aria-label="Input text for rewriting"
          />
          <div className="grid grid-cols-2 gap-3">
            <select value={tone} onChange={(e) => setTone(e.target.value)} className="p-3 rounded-xl bg-[#0A0A0A]/60 border border-purple-500/30 text-white" aria-label="Tone selector">
              <option value="neutral">Neutral</option>
              <option value="professional">Professional</option>
              <option value="casual">Casual</option>
              <option value="friendly">Friendly</option>
            </select>
            <button onClick={handleRewrite} className="px-4 py-2 rounded-xl bg-purple-600 text-white" aria-label="Rewrite">
              {loading ? "Rewriting…" : "Rewrite"}
            </button>
          </div>
        </motion.div>

        <motion.div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl text-white">Output</h2>
            {loading && (
              <div className="flex items-center gap-3">
                <motion.div aria-label="Generating" role="status" animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="w-5 h-5 border-2 border-purple-500/30 border-t-purple-400 rounded-full" />
              </div>
            )}
          </div>
          <div className="min-h-56 p-4 rounded-2xl border border-purple-500/30 text-gray-200 whitespace-pre-wrap" role="region" aria-live="polite">
            {error ? <span className="text-red-400">{error}</span> : output}
          </div>
          <div className="flex gap-3">
            <button onClick={handleCopy} className="px-3 py-2 rounded-xl bg-[#0A0A0A]/60 border border-purple-500/30 text-white" aria-label="Copy output">Copy</button>
            <button onClick={() => download("txt")} className="px-3 py-2 rounded-xl bg-[#0A0A0A]/60 border border-purple-500/30 text-white" aria-label="Download output as .txt">Download .txt</button>
          </div>
        </motion.div>
      </div>
      <div className="max-w-5xl mx-auto mt-4 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="text-sm text-gray-400">
          <p className="font-semibold">Use cases</p>
          <ul className="list-disc ml-5">
            <li>Polish emails and messages</li>
            <li>Rewrite essays with chosen tone</li>
            <li>Improve clarity without changing meaning</li>
          </ul>
        </div>
        <div className="text-sm text-gray-400">
          <p className="font-semibold">Related tools</p>
          <div className="flex gap-3">
            <a href="/summarizer" title="Go to Summarizer" className="underline">Summarizer</a>
            <a href="/notes" title="Go to Smart Notes" className="underline">Smart Notes</a>
            <a href="/report" title="Go to Report Maker" className="underline">Report Maker</a>
          </div>
        </div>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    </div>
  );
}

export default MainComponent;