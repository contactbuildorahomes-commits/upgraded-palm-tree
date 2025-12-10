import { motion } from "motion/react";

export function BriiAssistant({ briiReacting, showBriiChat, setShowBriiChat }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1, duration: 0.8, ease: "backOut" }}
      className="fixed bottom-8 right-8 z-50"
    >
      <motion.button
        whileHover={{ scale: 1.1, y: -5 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setShowBriiChat(!showBriiChat)}
        className="relative group"
      >
        {/* Pulsing glow effect */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 w-16 h-16 bg-gradient-to-r from-purple-500/40 to-cyan-500/40 rounded-full blur-xl"
        />

        {/* Brii mascot container */}
        <motion.div
          animate={{
            y: briiReacting ? [-3, 3, -3] : [0, -2, 0],
            rotate: briiReacting ? [0, 5, -5, 0] : 0,
          }}
          transition={{
            duration: briiReacting ? 0.3 : 2,
            repeat: briiReacting ? 3 : Infinity,
            ease: "easeInOut",
          }}
          className="relative w-16 h-16 bg-gradient-to-br from-purple-600 to-cyan-500 rounded-full flex items-center justify-center shadow-xl border-2 border-purple-400/50 backdrop-blur-xl"
        >
          <img
            src="https://ucarecdn.com/3a736374-d913-4ad0-a8b3-8a938c245e05/-/format/auto/"
            alt="Brii Assistant"
            className="w-12 h-12 object-contain"
          />

          {/* Celebration sparkles when reacting */}
          {briiReacting && (
            <div className="absolute inset-0">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0],
                    x: Math.cos((i * 60 * Math.PI) / 180) * 30,
                    y: Math.sin((i * 60 * Math.PI) / 180) * 30,
                  }}
                  transition={{
                    duration: 1,
                    repeat: 2,
                    delay: i * 0.1,
                  }}
                  className="absolute top-1/2 left-1/2 w-2 h-2 bg-yellow-400 rounded-full"
                />
              ))}
            </div>
          )}
        </motion.div>
      </motion.button>
    </motion.div>
  );
}
