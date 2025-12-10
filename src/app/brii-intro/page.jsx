import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import ArrowRight from "lucide-react/dist/esm/icons/arrow-right.js";
import Sparkles from "lucide-react/dist/esm/icons/sparkles.js";
import mascotUrl from "@/assets/brii-mascot.svg";
import Lottie from "lottie-react";
import briiAnim from "@/assets/brii-lottie.json";

export const meta = () => [
  { title: "Briefly — Meet Brii" },
  { name: "description", content: "Say hello to Brii, your friendly AI." },
  { property: "og:title", content: "Briefly — Meet Brii" },
  { property: "og:description", content: "A playful AI companion that helps you learn and create." },
  { property: "og:image", content: import.meta.env.NEXT_PUBLIC_OG_IMAGE || "" },
  { name: "twitter:title", content: "Briefly — Meet Brii" },
  { name: "twitter:description", content: "A playful AI companion that helps you learn and create." },
  { name: "twitter:image", content: import.meta.env.NEXT_PUBLIC_OG_IMAGE || "" },
];

function MainComponent() {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentStep(1);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [typed, setTyped] = useState("");
  const [viewport, setViewport] = useState({ w: 0, h: 0 });
  const isClient = typeof window !== "undefined";
  useEffect(() => {
    const full = "Your intelligent assistant ready to help you summarize, rewrite, and organize your thoughts with AI precision.";
    let i = 0;
    const timer = setInterval(() => {
      setTyped((prev) => (i < full.length ? prev + full[i++] : prev));
      if (i >= full.length) clearInterval(timer);
    }, 20);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!isClient) return;
    const update = () => setViewport({ w: window.innerWidth, h: window.innerHeight });
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [isClient]);

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-[#000000] via-[#0A0A0A] to-[#1A0B2E] relative overflow-hidden"
      onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
    >
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0">
        {/* Animated Gradient Background */}
        <motion.div
          animate={{
            background: [
              "radial-gradient(circle at 30% 40%, rgba(168, 85, 247, 0.15) 0%, transparent 50%)",
              "radial-gradient(circle at 70% 60%, rgba(34, 211, 238, 0.15) 0%, transparent 50%)",
              "radial-gradient(circle at 40% 70%, rgba(168, 85, 247, 0.15) 0%, transparent 50%)",
              "radial-gradient(circle at 30% 40%, rgba(168, 85, 247, 0.15) 0%, transparent 50%)",
            ],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0"
        />

        {/* Floating Orbs */}
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            opacity: [0.2, 0.4, 0.2],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
            opacity: [0.15, 0.35, 0.15],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/25 rounded-full blur-3xl"
        />

        {/* Sparkle Effects */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 6,
              ease: "easeInOut",
            }}
            className="absolute w-1 h-1 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full"
            style={{
              left: `${20 + Math.random() * 60}%`,
              top: `${20 + Math.random() * 60}%`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="text-center max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            {currentStep === 0 && (
              <motion.div
                key="step0"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, y: -50 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="flex flex-col items-center"
              >
                {/* Brii Mascot with Animation */}
                <motion.div
                  initial={{ y: 100, opacity: 0, rotate: -10 }}
                  animate={{
                    y: 0,
                    opacity: 1,
                    rotate: 0,
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 1.2,
                    ease: "backOut",
                    scale: {
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                  }}
                  className="mb-8 relative"
                >
                  {/* Glowing Circle Behind Brii */}
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute inset-0 w-64 h-64 bg-gradient-to-r from-purple-500/30 to-cyan-500/30 rounded-full blur-2xl"
                  />

                  {/* Brii Mascot Image */}
                  <motion.div
                    animate={{
                      y: [0, -10, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="relative z-10"
                  >
                  <motion.div
                    className="w-48 h-48 mx-auto"
                    animate={{ x: (cursor.x - viewport.w / 2) * 0.01, y: (cursor.y - viewport.h / 2) * 0.01 }}
                    transition={{ type: "spring", stiffness: 60, damping: 10 }}
                  >
                    {isClient ? (
                      <Lottie animationData={briiAnim} loop style={{ width: "100%", height: "100%" }} />
                    ) : (
                      <div aria-hidden className="w-full h-full" />
                    )}
                  </motion.div>
                  </motion.div>

                  {/* Sparkles around Brii */}
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{
                        scale: [0, 1, 0],
                        opacity: [0, 1, 0],
                        rotate: [0, 180],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.3,
                        ease: "easeInOut",
                      }}
                      className="absolute w-3 h-3"
                      style={{
                        left: `${50 + Math.cos((i * 60 * Math.PI) / 180) * 40}%`,
                        top: `${50 + Math.sin((i * 60 * Math.PI) / 180) * 40}%`,
                      }}
                    >
                      <Sparkles className="w-3 h-3 text-yellow-400" />
                    </motion.div>
                  ))}
                </motion.div>

                {/* Loading dots */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                  className="flex space-x-2"
                >
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.3, 1, 0.3],
                      }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        delay: i * 0.2,
                      }}
                      className="w-2 h-2 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full"
                    />
                  ))}
                </motion.div>
              </motion.div>
            )}

            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="flex flex-col items-center"
              >
                {/* Brii with Wave Animation */}
                <motion.div
                  animate={{
                    y: [0, -5, 0],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="mb-8 relative"
                >
                  {/* Enhanced Glow */}
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [0.4, 0.6, 0.4],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute inset-0 w-56 h-56 bg-gradient-to-r from-purple-500/40 to-cyan-500/40 rounded-full blur-2xl"
                  />

                  <motion.div
                    className="w-44 h-44 mx-auto relative z-10"
                    animate={{ x: (cursor.x - viewport.w / 2) * 0.01, y: (cursor.y - viewport.h / 2) * 0.01 }}
                    transition={{ type: "spring", stiffness: 60, damping: 10 }}
                  >
                    {isClient ? (
                      <Lottie animationData={briiAnim} loop style={{ width: "100%", height: "100%" }} />
                    ) : (
                      <div aria-hidden className="w-full h-full" />
                    )}
                  </motion.div>

                  {/* Waving Effect */}
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0, 0.8, 0],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      repeatDelay: 2,
                    }}
                    className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full blur-sm"
                  />
                </motion.div>

                {/* Enhanced Typewriter Text */}
                <div className="space-y-4 mb-12">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="relative"
                  >
                    <motion.h2
                      className="text-3xl md:text-4xl font-bold text-transparent bg-gradient-to-r from-purple-300 via-pink-300 to-cyan-300 bg-clip-text mb-2"
                      style={{
                        textShadow: "0 0 30px rgba(168, 85, 247, 0.3)",
                      }}
                    >
                      Hey! I'm Brii 👋
                    </motion.h2>
                  </motion.div>

                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.8 }}
                    className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-lg mx-auto"
                  >
                    {typed}
                  </motion.p>
                </div>

                {/* Enhanced CTA Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.5, duration: 0.8 }}
                >
                  <motion.a
                    href="/features"
                    whileHover={{
                      scale: 1.05,
                      boxShadow:
                        "0 0 50px rgba(168, 85, 247, 0.6), 0 0 100px rgba(168, 85, 247, 0.3)",
                      y: -3,
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative inline-flex items-center px-10 py-5 bg-gradient-to-r from-purple-600 to-cyan-500 text-white rounded-2xl font-semibold text-lg transition-all duration-500 overflow-hidden"
                  >
                    <motion.div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Shimmer Effect */}
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
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-12"
                    />

                    <span className="relative z-10 flex items-center">
                      Let's Get Started
                      <motion.div
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </motion.div>
                    </span>
                  </motion.a>
                </motion.div>

                {/* Skip Option */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2, duration: 0.5 }}
                  className="mt-8"
                >
                  <motion.a
                    href="/account/signin"
                    whileHover={{
                      color: "rgba(168, 85, 247, 0.8)",
                      y: -1,
                    }}
                    className="text-gray-500 text-sm hover:text-purple-400 transition-all duration-300"
                  >
                    Skip introduction →
                  </motion.a>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Enhanced Page Transition Effect */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: currentStep === 1 ? 1 : 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 origin-left"
      />
    </div>
  );
}

export default MainComponent;
