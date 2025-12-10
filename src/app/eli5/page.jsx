import { useState } from "react";
import { motion } from "motion/react";
import Lottie from "lottie-react";
import briiAnim from "@/assets/brii-lottie.json";

export const meta = () => [
  { title: "Briefly — ELI5" },
  { name: "description", content: "Explain anything simply with Brii." },
  { property: "og:title", content: "Briefly — ELI5" },
  { property: "og:description", content: "Explain complex topics in simple terms using AI." },
  { property: "og:image", content: import.meta.env.NEXT_PUBLIC_OG_IMAGE || "" },
  { name: "twitter:title", content: "Briefly — ELI5" },
  { name: "twitter:description", content: "Explain complex topics in simple terms using AI." },
  { name: "twitter:image", content: import.meta.env.NEXT_PUBLIC_OG_IMAGE || "" },
];

function MainComponent() {
  const [text, setText] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const isClient = typeof window !== "undefined";
  const ld = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Briefly ELI5 Explainer",
    applicationCategory: "EducationApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description:
      "Turn complex topics into child-friendly explanations with analogies and step-by-step breakdowns.",
    keywords:
      "ELI5, AI explainer, education tools, homework support, learning tools, writing assistant",
  };

  const handleExplain = async (simpler = false) => {
    if (!text.trim()) return;
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/eli5", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: (simpler ? output || text : text).slice(0, 5000) }),
      });
      const data = await res.json();
      if (!res.ok || data?.error) {
        setError(data?.error || "Failed to generate explanation");
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

  const handleDownload = (type = "txt") => {
    const blob = new Blob([output], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `eli5.${type}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#000000] via-[#0A0A0A] to-[#1A0B2E] relative overflow-hidden p-6">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div className="space-y-4">
          <h1 className="text-4xl font-black text-transparent bg-gradient-to-r from-purple-400 via-pink-300 to-cyan-300 bg-clip-text">ELI5 Explainer</h1>
          <p className="text-gray-300">Explain any concept simply using friendly analogies and steps. Ideal for students, quick learning, and homework help.</p>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type your topic or paste text"
            className="w-full h-56 bg-[#0A0A0A]/60 border border-purple-500/30 rounded-2xl p-4 text-white"
            aria-label="Input text for explanation"
          />
          <div className="flex gap-3">
            <button onClick={() => handleExplain(false)} className="px-4 py-2 rounded-xl bg-purple-600 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400" aria-label="Explain the input">Explain</button>
            <button onClick={() => handleExplain(true)} className="px-4 py-2 rounded-xl bg-cyan-600 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400" aria-label="Explain even simpler">Explain even simpler</button>
          </div>
          <div className="mt-4 text-sm text-gray-400">
            <p className="font-semibold">Use cases</p>
            <ul className="list-disc ml-5">
              <li>Learn complex topics fast</li>
              <li>Create kid-friendly explanations</li>
              <li>Homework support for students</li>
            </ul>
          </div>
          <div className="mt-3 text-sm text-gray-400">
            <p className="font-semibold">Related tools</p>
            <div className="flex gap-3">
              <a href="/report" title="Go to Report Maker" className="underline">Report Maker</a>
              <a href="/features#summarizer" title="Go to Summarizer" className="underline">Summarizer</a>
              <a href="https://simple.wikipedia.org/wiki/Main_Page" rel="nofollow" target="_blank" title="Simple English Wikipedia" className="underline">Simple English Wikipedia</a>
            </div>
          </div>
        </motion.div>

        <motion.div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl text-white">Output</h2>
            {loading && (
              <div className="flex items-center gap-3">
                <motion.div
                  aria-label="Processing"
                  role="status"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-purple-500/30 border-t-purple-400 rounded-full"
                />
                <div className="w-8 h-8">
                  {isClient ? (
                    <Lottie animationData={briiAnim} loop style={{ width: "100%", height: "100%" }} />
                  ) : (
                    <div aria-hidden className="w-full h-full" />
                  )}
                </div>
              </div>
            )}
          </div>
          <div className="min-h-56 p-4 rounded-2xl border border-purple-500/30 text-gray-200 whitespace-pre-wrap" role="region" aria-live="polite">{error ? (
            <span className="text-red-400">{error}</span>
          ) : (
            output
          )}</div>
          {error && (
            <button onClick={() => handleExplain(false)} className="px-4 py-2 rounded-xl bg-red-600 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400" aria-label="Retry">Retry</button>
          )}
          <div className="flex gap-3">
            <button onClick={handleCopy} className="px-4 py-2 rounded-xl bg-gray-700 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400" aria-label="Copy output">Copy</button>
            <button onClick={() => handleDownload("txt")} className="px-4 py-2 rounded-xl bg-gray-700 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400" aria-label="Download text">Download</button>
          </div>
        </motion.div>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            name: "ELI5 Explainer",
            about: "Explain complex topics simply",
          }),
        }}
      />
    </div>
  );
}

export default MainComponent;