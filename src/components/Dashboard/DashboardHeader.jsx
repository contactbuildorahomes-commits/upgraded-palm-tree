import { motion } from "motion/react";
import Sparkles from "lucide-react/dist/esm/icons/sparkles.js";
import Brain from "lucide-react/dist/esm/icons/brain.js";
import FileText from "lucide-react/dist/esm/icons/file-text.js";
import Star from "lucide-react/dist/esm/icons/star.js";
import BarChart3 from "lucide-react/dist/esm/icons/bar-chart-3.js";

const tabs = [
  { id: "summarizer", name: "✨ Summarizer", icon: Sparkles },
  { id: "rewriter", name: "🧠 Rewriter", icon: Brain },
  { id: "notes", name: "📝 Smart Notes", icon: FileText },
  { id: "eli5", name: "🧒 ELI5", icon: Star },
  { id: "report", name: "📊 Report Maker", icon: BarChart3 },
];

export function DashboardHeader({ activeTab }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8"
    >
      <motion.h2
        animate={{
          textShadow: [
            "0 0 20px rgba(168, 85, 247, 0.3)",
            "0 0 30px rgba(34, 211, 238, 0.3)",
            "0 0 20px rgba(168, 85, 247, 0.3)",
          ],
        }}
        transition={{ duration: 5, repeat: Infinity }}
        className="text-4xl lg:text-5xl font-black text-transparent bg-gradient-to-r from-purple-400 via-pink-300 to-cyan-300 bg-clip-text mb-2"
      >
        {tabs.find((tab) => tab.id === activeTab)?.name}
      </motion.h2>
      <p className="text-gray-400 text-lg">
        {activeTab === "summarizer" &&
          "Transform long content into clear, concise summaries"}
        {activeTab === "rewriter" &&
          "Enhance your writing with perfect tone and grammar"}
        {activeTab === "notes" && "Create structured, beautiful study notes"}
        {activeTab === "eli5" && "Explain complex ideas in simple, kid-friendly language"}
        {activeTab === "report" && "Generate structured reports with key findings and recommendations"}
      </p>
    </motion.div>
  );
}
