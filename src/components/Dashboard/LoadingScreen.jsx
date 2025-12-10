import { motion, AnimatePresence } from "motion/react";

export function LoadingScreen() {
  const rm = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="min-h-screen bg-gradient-to-br from-[#000000] via-[#0A0A0A] to-[#1A0B2E] flex items-center justify-center relative overflow-hidden"
      >
        <div className="absolute inset-0">
          <motion.div
            animate={{
              background: rm
                ? "radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.08) 0%, transparent 50%)"
                : [
                    "radial-gradient(circle at 30% 40%, rgba(168, 85, 247, 0.08) 0%, transparent 50%)",
                    "radial-gradient(circle at 70% 60%, rgba(34, 211, 238, 0.08) 0%, transparent 50%)",
                    "radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.08) 0%, transparent 50%)",
                  ],
            }}
            transition={rm ? { duration: 0 } : { duration: 6, repeat: Infinity }}
            className="absolute inset-0"
          />
        </div>

        <motion.div
          initial={{ scale: 0.98, y: 4 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative z-10 text-center"
        >
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              letterSpacing: rm ? "0.02em" : ["0.02em", "0.08em", "0.02em"],
            }}
            transition={rm ? { duration: 0.6 } : { duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-transparent bg-gradient-to-r from-purple-400 via-pink-300 to-cyan-300 bg-clip-text"
          >
            BRIEFLY
          </motion.h1>

          <motion.div
            animate={{
              opacity: rm ? 0.4 : [0.2, 0.5, 0.2],
              scale: rm ? 1 : [1, 1.05, 1],
            }}
            transition={rm ? { duration: 0.6 } : { duration: 3, repeat: Infinity }}
            className="mx-auto mt-4 h-1 w-40 sm:w-52 md:w-64 rounded-full bg-gradient-to-r from-purple-500/50 to-cyan-500/50"
          />

          <motion.div
            animate={{
              opacity: rm ? 0.15 : [0.1, 0.25, 0.1],
              scale: rm ? 1 : [1, 1.04, 1],
            }}
            transition={rm ? { duration: 0.6 } : { duration: 4, repeat: Infinity }}
            className="absolute -inset-x-10 -inset-y-16 blur-3xl bg-gradient-to-r from-purple-500/20 via-transparent to-cyan-500/20"
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
