import { motion } from "motion/react";

export function SidebarLogo() {
  return (
    <motion.div whileHover={{ scale: 1.02 }} className="text-center mb-8">
      <motion.h1
        animate={{
          textShadow: [
            "0 0 10px rgba(168, 85, 247, 0.3)",
            "0 0 20px rgba(34, 211, 238, 0.3)",
            "0 0 10px rgba(168, 85, 247, 0.3)",
          ],
        }}
        transition={{ duration: 4, repeat: Infinity }}
        className="text-3xl font-black text-transparent bg-gradient-to-r from-purple-400 via-pink-300 to-cyan-300 bg-clip-text"
      >
        BRIEFLY
      </motion.h1>
      <p className="text-gray-400 text-sm mt-1">AI-Powered Workspace</p>
    </motion.div>
  );
}
