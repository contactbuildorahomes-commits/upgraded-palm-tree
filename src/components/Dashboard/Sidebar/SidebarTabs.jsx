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

export function SidebarTabs({ activeTab, setActiveTab, setSidebarOpen }) {
  return (
    <div className="space-y-2 mb-8">
      {tabs.map((tab, index) => (
        <motion.button
          key={tab.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1, duration: 0.6 }}
          whileHover={{
            scale: 1.02,
            x: 6,
            boxShadow: "0 10px 30px rgba(168, 85, 247, 0.2)",
          }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            setActiveTab(tab.id);
            setSidebarOpen(false);
          }}
          className={`relative w-full flex items-center space-x-3 p-4 rounded-2xl transition-all duration-500 overflow-hidden ${
            activeTab === tab.id
              ? "bg-gradient-to-r from-purple-600/30 to-cyan-500/30 border border-purple-500/50 text-white shadow-lg shadow-purple-500/20"
              : "text-gray-400 hover:text-white hover:bg-purple-500/10"
          }`}
        >
          {activeTab === tab.id && (
            <motion.div
              layoutId="activeTab"
              className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-2xl"
            />
          )}

          <motion.div
            animate={activeTab === tab.id ? { scale: 1.1, rotate: 360 } : {}}
            transition={{ duration: 0.6 }}
          >
            <tab.icon className="w-5 h-5 relative z-10" />
          </motion.div>
          <span className="font-semibold relative z-10">{tab.name}</span>

          {activeTab === tab.id && (
            <motion.div
              animate={{
                x: ["-100%", "100%"],
                opacity: [0, 0.3, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3,
              }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"
            />
          )}
        </motion.button>
      ))}
    </div>
  );
}
