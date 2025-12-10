import { motion } from "motion/react";
import Copy from "lucide-react/dist/esm/icons/copy.js";
import Trash2 from "lucide-react/dist/esm/icons/trash-2.js";
import Brain from "lucide-react/dist/esm/icons/brain.js";

export function OutputPanel({ outputText, setOutputText, copyToClipboard }) {
  return (
    <motion.div
      whileHover={{ scale: 1.01, y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="space-y-4"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-white">Output</h3>
        {outputText && (
          <div className="flex space-x-2">
            <motion.button
              whileHover={{
                scale: 1.1,
                boxShadow: "0 5px 15px rgba(168, 85, 247, 0.3)",
              }}
              whileTap={{ scale: 0.9 }}
              onClick={copyToClipboard}
              className="p-2 bg-purple-600/30 hover:bg-purple-600/40 rounded-xl text-purple-400 hover:text-purple-300 transition-all duration-300 backdrop-blur-xl shadow-lg"
              title="Copy to clipboard"
            >
              <Copy className="w-4 h-4" />
            </motion.button>
            <motion.button
              whileHover={{
                scale: 1.1,
                boxShadow: "0 5px 15px rgba(239, 68, 68, 0.3)",
              }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setOutputText("")}
              className="p-2 bg-red-600/30 hover:bg-red-600/40 rounded-xl text-red-400 hover:text-red-300 transition-all duration-300 backdrop-blur-xl shadow-lg"
              title="Clear output"
            >
              <Trash2 className="w-4 h-4" />
            </motion.button>
          </div>
        )}
      </div>

      <motion.div className="relative group">
        {/* Enhanced glowing background */}
        <motion.div
          animate={{
            opacity: [0.2, 0.4, 0.2],
            scale: [1, 1.02, 1],
          }}
          transition={{ duration: 4, repeat: Infinity, delay: 2 }}
          className="absolute inset-0 bg-gradient-to-r from-cyan-600/30 to-purple-600/30 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        />

        <div className="relative w-full h-80 p-6 bg-gradient-to-br from-[#1E1E2E]/90 via-[#2D1B69]/80 to-[#1E1E2E]/90 backdrop-blur-2xl rounded-2xl border border-cyan-500/30 text-white overflow-y-auto shadow-xl">
          {outputText ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="whitespace-pre-wrap leading-relaxed"
            >
              {outputText}
            </motion.div>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500 text-center">
              <motion.div
                animate={{
                  y: [0, -5, 0],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Brain className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Your AI-generated result will appear here...</p>
              </motion.div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
