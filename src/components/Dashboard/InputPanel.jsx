import { motion } from "motion/react";
import Zap from "lucide-react/dist/esm/icons/zap.js";
import Send from "lucide-react/dist/esm/icons/send.js";

export function InputPanel({
  inputText,
  setInputText,
  activeTab,
  isLoading,
  handleProcess,
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.01, y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="space-y-4"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-white">Input</h3>
        <div className="text-sm text-gray-400 flex items-center space-x-2">
          <Zap className="w-4 h-4" />
          <span>{inputText.length} characters</span>
        </div>
      </div>

      <motion.div className="relative group">
        {/* Enhanced glowing background */}
        <motion.div
          animate={{
            opacity: [0.2, 0.4, 0.2],
            scale: [1, 1.02, 1],
          }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute inset-0 bg-gradient-to-r from-purple-600/30 to-cyan-500/30 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        />

        <motion.textarea
          whileFocus={{
            scale: 1.01,
            boxShadow: "0 0 50px rgba(168, 85, 247, 0.3)",
          }}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={`Paste your text here to ${
            activeTab === "summarizer"
              ? "summarize"
              : activeTab === "rewriter"
              ? "rewrite"
              : activeTab === "notes"
              ? "create notes from"
              : activeTab === "eli5"
              ? "explain simply"
              : "generate a report from"
          } it...`}
          className="relative w-full h-80 p-6 bg-gradient-to-br from-[#1E1E2E]/90 via-[#2D1B69]/80 to-[#1E1E2E]/90 backdrop-blur-2xl rounded-2xl border border-purple-500/30 text-white placeholder-gray-500 resize-none focus:outline-none focus:border-purple-400/70 focus:ring-2 focus:ring-purple-400/30 transition-all duration-500 shadow-xl"
        />
      </motion.div>

      {/* Enhanced Process Button */}
      <motion.button
        whileHover={{
          scale: 1.02,
          y: -2,
          boxShadow:
            "0 0 50px rgba(168, 85, 247, 0.5), 0 0 80px rgba(168, 85, 247, 0.2)",
        }}
        whileTap={{ scale: 0.98 }}
        onClick={handleProcess}
        disabled={isLoading || !inputText.trim()}
        className="w-full bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-500 disabled:cursor-not-allowed flex items-center justify-center space-x-2 relative overflow-hidden shadow-xl"
      >
        <motion.div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-400 opacity-0 hover:opacity-100 transition-opacity duration-500" />

        {/* Button shimmer effect */}
        <motion.div
          animate={{
            x: ["-100%", "100%"],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            repeatDelay: 3,
          }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
        />

        <span className="relative z-10 flex items-center space-x-2">
          {isLoading ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
              />
              <span>Processing...</span>
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              <span>
                {activeTab === "summarizer"
                  ? "Summarize"
                  : activeTab === "rewriter"
                  ? "Rewrite"
                  : activeTab === "notes"
                  ? "Create Notes"
                  : activeTab === "eli5"
                  ? "Explain Simply"
                  : "Make Report"}
              </span>
            </>
          )}
        </span>
      </motion.button>
    </motion.div>
  );
}
