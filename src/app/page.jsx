import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Sparkles from "lucide-react/dist/esm/icons/sparkles.js";
import Zap from "lucide-react/dist/esm/icons/zap.js";
import FileText from "lucide-react/dist/esm/icons/file-text.js";
import Brain from "lucide-react/dist/esm/icons/brain.js";
import ArrowRight from "lucide-react/dist/esm/icons/arrow-right.js";
import Star from "lucide-react/dist/esm/icons/star.js";

function MainComponent() {
  const [loading, setLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 4000); // Increased to 4 seconds for better impact

    return () => clearTimeout(timer);
  }, []);

  // Enhanced Loading Animation Component
  const LoadingAnimation = () => (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 1.2, ease: "easeInOut" }}
      className="fixed inset-0 bg-gradient-to-br from-[#000000] via-[#0A0A0A] to-[#1A0B2E] flex items-center justify-center z-50 overflow-hidden"
    >
      {/* Animated Gradient Background */}
      <motion.div
        animate={{
          background: [
            "radial-gradient(circle at 20% 50%, rgba(168, 85, 247, 0.15) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 50%, rgba(34, 211, 238, 0.15) 0%, transparent 50%)",
            "radial-gradient(circle at 50% 20%, rgba(168, 85, 247, 0.15) 0%, transparent 50%)",
            "radial-gradient(circle at 20% 50%, rgba(168, 85, 247, 0.15) 0%, transparent 50%)",
          ],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0"
      />

      {/* Floating Particles */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeInOut",
          }}
          className="absolute w-1 h-1 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}

      <div className="relative flex flex-col items-center">
        {/* Pulsing Rings */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 w-40 h-40 border-2 border-purple-500/40 rounded-full"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
          className="absolute inset-0 w-40 h-40 border border-cyan-400/30 rounded-full"
        />

        {/* Central Logo with Enhanced Glow */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1.5, ease: "backOut" }}
          className="relative z-10 flex items-center justify-center w-40 h-40"
        >
          {/* Subtle orbiting accent */}
          <motion.div
            className="absolute inset-0"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          >
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-gradient-to-r from-purple-400 to-cyan-400 shadow-[0_0_10px_rgba(168,85,247,0.6)]" />
          </motion.div>
          <motion.h1
            animate={{
              textShadow: [
                "0 0 20px rgba(168, 85, 247, 0.8), 0 0 40px rgba(168, 85, 247, 0.4), 0 0 80px rgba(168, 85, 247, 0.2)",
                "0 0 30px rgba(34, 211, 238, 0.8), 0 0 60px rgba(34, 211, 238, 0.4), 0 0 120px rgba(34, 211, 238, 0.2)",
                "0 0 20px rgba(168, 85, 247, 0.8), 0 0 40px rgba(168, 85, 247, 0.4), 0 0 80px rgba(168, 85, 247, 0.2)",
              ],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="text-4xl font-black text-transparent bg-gradient-to-r from-purple-400 via-cyan-300 to-purple-400 bg-clip-text"
          >
            BRIEFLY
          </motion.h1>
        </motion.div>

        {/* Enhanced Loading Text */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mt-6 text-center"
        >
          <motion.p
            animate={{
              opacity: [0.6, 1, 0.6],
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-gray-300 text-base md:text-lg font-medium tracking-wide"
          >
            Loading your intelligent workspace…
          </motion.p>

          {/* Animated Progress Bar */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 2, duration: 1.5, ease: "easeOut" }}
            className="h-1 w-40 md:w-48 bg-gradient-to-r from-purple-500 via-cyan-400 to-purple-500 mt-3 origin-left rounded-full"
          />

          {/* Moving Glow Effect on Progress Bar */}
          <motion.div
            animate={{
              x: [-200, 200],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
            className="h-1 w-8 bg-white/80 mt-[-4px] rounded-full blur-sm"
          />
        </motion.div>
      </div>
    </motion.div>
  );

  // Enhanced Main Landing Page Component
  const LandingPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-[#000000] via-[#0A0A0A] to-[#1A0B2E] relative overflow-hidden">
      {/* Enhanced Dynamic Background */}
      <div className="absolute inset-0">
        {/* Moving Gradient Waves */}
        <motion.div
          animate={{
            background: [
              "radial-gradient(ellipse at top left, rgba(168, 85, 247, 0.15) 0%, transparent 50%)",
              "radial-gradient(ellipse at top right, rgba(34, 211, 238, 0.15) 0%, transparent 50%)",
              "radial-gradient(ellipse at bottom left, rgba(168, 85, 247, 0.15) 0%, transparent 50%)",
              "radial-gradient(ellipse at bottom right, rgba(34, 211, 238, 0.15) 0%, transparent 50%)",
            ],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0"
        />

        {/* Enhanced Animated Orbs */}
        <motion.div
          animate={{
            x: [0, 150, 0],
            y: [0, -80, 0],
            opacity: [0.2, 0.4, 0.2],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-20 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -120, 0],
            y: [0, 100, 0],
            opacity: [0.15, 0.35, 0.15],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-20 right-20 w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-3xl"
        />

        {/* Enhanced Floating Particles */}
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 1, 0],
              x: [0, Math.random() * 20 - 10, 0],
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
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Enhanced Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        {/* Enhanced Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="mb-12"
        >
          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 1, ease: "backOut" }}
            className="text-6xl md:text-8xl font-black text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-300 bg-clip-text mb-6 tracking-tight"
            style={{
              textShadow: "0 0 40px rgba(168, 85, 247, 0.3)",
            }}
          >
            BRIEFLY
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <motion.h2
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ duration: 5, repeat: Infinity }}
              className="text-xl md:text-3xl text-transparent bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text font-light mb-4 tracking-wide bg-[length:200%_auto]"
            >
              Where Ideas Become Clarity
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="text-xl md:text-2xl font-semibold text-transparent bg-gradient-to-r from-purple-300 to-cyan-300 bg-clip-text mb-6"
            >
              Understand Everything Instantly
            </motion.p>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Experience the future of AI-powered content transformation.
              Summarize, rewrite, and organize your thoughts with cinematic
              precision.
            </p>
          </motion.div>
        </motion.div>

        {/* Enhanced Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-6 mb-16"
        >
          <motion.a
            href="/welcome"
            whileHover={{
              scale: 1.05,
              boxShadow:
                "0 0 50px rgba(168, 85, 247, 0.6), 0 0 100px rgba(168, 85, 247, 0.2)",
              y: -2,
            }}
            whileTap={{ scale: 0.95 }}
            className="group relative overflow-hidden bg-gradient-to-r from-purple-600 to-cyan-500 text-white px-10 py-5 rounded-2xl font-semibold text-lg transition-all duration-500 transform"
          >
            <motion.div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <motion.div
              animate={{
                x: ["-100%", "100%"],
                opacity: [0, 0.5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3,
              }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
            />
            <span className="relative z-10 flex items-center">
              Explore Features
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </motion.a>

          <motion.a
            href="/account/signin"
            whileHover={{
              scale: 1.05,
              y: -2,
              boxShadow: "0 0 30px rgba(168, 85, 247, 0.3)",
              backgroundColor: "rgba(168, 85, 247, 0.1)",
            }}
            whileTap={{ scale: 0.95 }}
            className="border-2 border-purple-500/50 text-purple-400 px-10 py-5 rounded-2xl font-semibold text-lg transition-all duration-500 transform hover:border-purple-400 hover:text-purple-300 backdrop-blur-sm"
          >
            Sign In
          </motion.a>
        </motion.div>

        {/* Enhanced Feature Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
        >
          {[
            {
              icon: Sparkles,
              title: "AI Summarizer",
              desc: "Instant clarity from chaos",
            },
            {
              icon: Brain,
              title: "Smart Rewriter",
              desc: "Perfect tone, every time",
            },
            {
              icon: FileText,
              title: "Structured Notes",
              desc: "Organize thoughts beautifully",
            },
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.7 + index * 0.2, duration: 0.6 }}
              whileHover={{
                y: -8,
                scale: 1.02,
                boxShadow: "0 20px 40px rgba(168, 85, 247, 0.2)",
              }}
              className="group bg-gradient-to-br from-[#1E1E2E]/60 to-[#2D1B69]/60 backdrop-blur-xl p-6 rounded-2xl border border-purple-500/20 hover:border-purple-400/50 transition-all duration-500"
            >
              <motion.div
                whileHover={{ rotate: 5, scale: 1.1 }}
                className="w-12 h-12 bg-gradient-to-br from-purple-500 to-cyan-400 rounded-xl flex items-center justify-center mb-4 group-hover:shadow-lg group-hover:shadow-purple-500/30 transition-all duration-300"
              >
                <feature.icon className="w-6 h-6 text-white" />
              </motion.div>
              <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-purple-300 transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">
                {feature.desc}
              </p>
              <motion.div
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                className="h-0.5 bg-gradient-to-r from-purple-500 to-cyan-500 mt-4 origin-left transition-transform duration-300"
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-purple-400/50 rounded-full flex justify-center backdrop-blur-sm"
          >
            <motion.div
              animate={{
                y: [0, 12, 0],
                opacity: [1, 0, 1],
                boxShadow: [
                  "0 0 5px rgba(168, 85, 247, 0.5)",
                  "0 0 10px rgba(168, 85, 247, 0.8)",
                  "0 0 5px rgba(168, 85, 247, 0.5)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-1 bg-purple-400 rounded-full mt-2"
            />
          </motion.div>
          <p className="text-gray-500 text-xs mt-2">Scroll to explore</p>
        </motion.div>
      </div>
    </div>
  );

  return (
    <AnimatePresence mode="wait">
      {loading ? (
        <LoadingAnimation key="loading" />
      ) : (
        <LandingPage key="landing" />
      )}
    </AnimatePresence>
  );
}

export default MainComponent;
