import { motion } from "motion/react";

export function BackgroundEffects() {
  return (
    <div className="absolute inset-0">
      <motion.div
        animate={{
          background: [
            "radial-gradient(ellipse at 20% 30%, rgba(168, 85, 247, 0.08) 0%, transparent 60%)",
            "radial-gradient(ellipse at 80% 70%, rgba(34, 211, 238, 0.08) 0%, transparent 60%)",
            "radial-gradient(ellipse at 40% 80%, rgba(168, 85, 247, 0.08) 0%, transparent 60%)",
            "radial-gradient(ellipse at 20% 30%, rgba(168, 85, 247, 0.08) 0%, transparent 60%)",
          ],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0"
      />

      <motion.div
        animate={{
          x: [0, 50, 0],
          y: [0, -30, 0],
          opacity: [0.05, 0.15, 0.05],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 left-0 w-[700px] h-[700px] bg-purple-600/10 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          x: [0, -30, 0],
          y: [0, 40, 0],
          opacity: [0.05, 0.12, 0.05],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-3xl"
      />

      {/* Floating particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -20, 0],
            opacity: [0, 0.6, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 8,
            ease: "easeInOut",
          }}
          className="absolute w-1 h-1 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full"
          style={{
            left: `${10 + Math.random() * 80}%`,
            top: `${10 + Math.random() * 80}%`,
          }}
        />
      ))}
    </div>
  );
}
