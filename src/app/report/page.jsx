import { useState } from "react";
import { motion } from "motion/react";
import Lottie from "lottie-react";
import briiAnim from "@/assets/brii-lottie.json";

export const meta = () => [
  { title: "Briefly — Report Maker" },
  { name: "description", content: "Generate structured reports instantly." },
  { property: "og:title", content: "Briefly — Report Maker" },
  { property: "og:description", content: "Create professional reports with headings, findings, and recommendations." },
  { property: "og:image", content: import.meta.env.NEXT_PUBLIC_OG_IMAGE || "" },
  { name: "twitter:title", content: "Briefly — Report Maker" },
  { name: "twitter:description", content: "Create professional reports with headings, findings, and recommendations." },
  { name: "twitter:image", content: import.meta.env.NEXT_PUBLIC_OG_IMAGE || "" },
];

function MainComponent() {
  const [topic, setTopic] = useState("");
  const [raw, setRaw] = useState("");
  const [tone, setTone] = useState("neutral");
  const [headingStyle, setHeadingStyle] = useState("h2");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const isClient = typeof window !== "undefined";
  const ld = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Briefly Report Maker",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description:
      "Generate structured reports with headings, key findings, recommendations, and executive summaries.",
    keywords:
      "AI report generator, writing assistant, productivity tools, study tools, analysis",
  };

  const handleGenerate = async () => {
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: raw.slice(0, 5000), topic: topic.slice(0, 200), tone, headingStyle }),
      });
      const data = await res.json();
      if (!res.ok || data?.error) {
        setError(data?.error || "Failed to generate report");
        return;
      }
      setOutput(data.output || "");
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  const download = (ext) => {
    const blob = new Blob([output], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `report.${ext}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#000000] via-[#0A0A0A] to-[#1A0B2E] relative overflow-hidden p-6">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div className="space-y-4">
          <h1 className="text-4xl font-black text-transparent bg-gradient-to-r from-purple-400 via-pink-300 to-cyan-300 bg-clip-text">AI Report Generator</h1>
          <p className="text-gray-300">Create professional reports from topics or raw text. Choose tone and heading style. Export instantly.</p>
          <input
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Topic"
            className="w-full bg-[#0A0A0A]/60 border border-purple-500/30 rounded-2xl p-4 text-white"
            aria-label="Report topic"
          />
          <textarea
            value={raw}
            onChange={(e) => setRaw(e.target.value)}
            placeholder="Optional raw text"
            className="w-full h-40 bg-[#0A0A0A]/60 border border-purple-500/30 rounded-2xl p-4 text-white"
            aria-label="Raw text input"
          />
          <div className="grid grid-cols-2 gap-3">
            <select value={tone} onChange={(e) => setTone(e.target.value)} className="p-3 rounded-xl bg-[#0A0A0A]/60 border border-purple-500/30 text-white" aria-label="Tone selector">
              <option value="neutral">Neutral</option>
              <option value="professional">Professional</option>
              <option value="casual">Casual</option>
            </select>
            <select value={headingStyle} onChange={(e) => setHeadingStyle(e.target.value)} className="p-3 rounded-xl bg-[#0A0A0A]/60 border border-purple-500/30 text-white" aria-label="Heading style selector">
              <option value="h2">H2</option>
              <option value="h3">H3</option>
              <option value="bold">Bold</option>
            </select>
          </div>
          <button onClick={handleGenerate} className="px-4 py-2 rounded-xl bg-purple-600 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400" aria-label="Generate report">Generate</button>
          <div className="mt-4 text-sm text-gray-400">
            <p className="font-semibold">Use cases</p>
            <ul className="list-disc ml-5">
              <li>Create reports for school or business</li>
              <li>Generate executive summaries</li>
              <li>Turn raw notes into structured documents</li>
            </ul>
          </div>
          <div className="mt-3 text-sm text-gray-400">
            <p className="font-semibold">Related tools</p>
            <div className="flex gap-3">
              <a href="/eli5" title="Go to ELI5" className="underline">ELI5</a>
              <a href="/features#rewriter" title="Go to Rewriter" className="underline">Rewriter</a>
              <a href="https://en.wikipedia.org/wiki/Report" rel="nofollow" target="_blank" title="Report (Wikipedia)" className="underline">What is a report?</a>
            </div>
          </div>
        </motion.div>

        <motion.div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl text-white">Output</h2>
            {loading && (
              <div className="flex items-center gap-3">
                <motion.div
                  aria-label="Generating"
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
            <button onClick={handleGenerate} className="px-4 py-2 rounded-xl bg-red-600 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400" aria-label="Retry">Retry</button>
          )}
          <div className="flex gap-3">
            <button onClick={() => download("pdf")} className="px-4 py-2 rounded-xl bg-gray-700 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400" aria-label="Download PDF">Download PDF</button>
            <button onClick={() => download("docx")} className="px-4 py-2 rounded-xl bg-gray-700 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400" aria-label="Download DOCX">Download DOCX</button>
            <button onClick={() => download("txt")} className="px-4 py-2 rounded-xl bg-gray-700 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400" aria-label="Download TXT">Download TXT</button>
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
            name: "AI Report Generator",
            about: "Generate structured reports from topics or raw text",
          }),
        }}
      />
    </div>
  );
}

export default MainComponent;