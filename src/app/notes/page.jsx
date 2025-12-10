import { useState } from "react";
import { motion } from "motion/react";

export const meta = () => [
  { title: "Briefly — Smart Notes" },
  { name: "description", content: "Create structured study notes from any text." },
  { property: "og:title", content: "Briefly — Smart Notes" },
  { property: "og:description", content: "Turn raw text into clean, structured notes." },
  { property: "og:image", content: import.meta.env.NEXT_PUBLIC_OG_IMAGE || "" },
  { name: "twitter:title", content: "Briefly — Smart Notes" },
  { name: "twitter:description", content: "Turn raw text into clean, structured notes." },
  { name: "twitter:image", content: import.meta.env.NEXT_PUBLIC_OG_IMAGE || "" },
];

function MainComponent() {
  const [text, setText] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const ld = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Briefly Smart Notes",
    applicationCategory: "EducationApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description: "Create structured study notes with headings and bullet points.",
  };

  const handleNotes = async () => {
    if (!text.trim()) return;
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: text.slice(0, 5000) }),
      });
      const data = await res.json();
      if (!res.ok || data?.error) {
        setError(data?.error || "Failed to create notes");
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
    a.download = `notes.${ext}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#000000] via-[#0A0A0A] to-[#1A0B2E] relative overflow-hidden p-6">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div className="space-y-4">
          <h1 className="text-4xl font-black text-transparent bg-gradient-to-r from-purple-400 via-pink-300 to-cyan-300 bg-clip-text">Smart Notes</h1>
          <p className="text-gray-300">Create structured notes with clean headings and bullet points.</p>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste your text"
            className="w-full h-56 bg-[#0A0A0A]/60 border border-purple-500/30 rounded-2xl p-4 text-white"
            aria-label="Input text for notes"
          />
          <button onClick={handleNotes} className="px-4 py-2 rounded-xl bg-purple-600 text-white" aria-label="Create notes">
            {loading ? "Creating…" : "Create Notes"}
          </button>
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
            <li>Create study notes from lectures</li>
            <li>Organize reading into sections</li>
            <li>Prepare exam-ready summaries</li>
          </ul>
        </div>
        <div className="text-sm text-gray-400">
          <p className="font-semibold">Related tools</p>
          <div className="flex gap-3">
            <a href="/summarizer" title="Go to Summarizer" className="underline">Summarizer</a>
            <a href="/rewriter" title="Go to Rewriter" className="underline">Rewriter</a>
            <a href="/report" title="Go to Report Maker" className="underline">Report Maker</a>
          </div>
        </div>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    </div>
  );
}

export default MainComponent;