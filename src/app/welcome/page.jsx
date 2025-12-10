import { motion } from "motion/react";
import Sparkles from "lucide-react/dist/esm/icons/sparkles.js";
import ArrowRight from "lucide-react/dist/esm/icons/arrow-right.js";
import Zap from "lucide-react/dist/esm/icons/zap.js";
import FileText from "lucide-react/dist/esm/icons/file-text.js";
import Brain from "lucide-react/dist/esm/icons/brain.js";
import Users from "lucide-react/dist/esm/icons/users.js";
import Clock from "lucide-react/dist/esm/icons/clock.js";
import Star from "lucide-react/dist/esm/icons/star.js";
import Target from "lucide-react/dist/esm/icons/target.js";
export const meta = () => [
  { title: "Briefly — Welcome" },
  {
    name: "description",
    content:
      "Briefly is a premium AI workspace with AI summarizer, rewriter, note maker, ELI5 explainer, and report generator.",
  },
  { property: "og:title", content: "Briefly — Welcome" },
  {
    property: "og:description",
    content:
      "Discover Briefly’s AI tools for productivity and learning: summarizer, rewriter, notes, ELI5, and report maker.",
  },
  { property: "og:type", content: "website" },
];

function MainComponent() {
  const rm = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const ld = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Briefly — AI Workspace",
    description:
      "AI summarizer, rewriter, note maker, ELI5 explainer, and report generator.",
    isPartOf: { "@type": "WebSite", name: "Briefly" },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "/welcome" },
        { "@type": "ListItem", position: 2, name: "Features", item: "/features" },
      ],
    },
    about: { "@type": "Organization", name: "Briefly" },
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#000000] via-[#0A0A0A] to-[#1A0B2E] relative overflow-hidden">
      {/* Enhanced Background Effects with Smooth Motion */}
      <div className="absolute inset-0">
        {/* Moving Gradient Waves */}
        <motion.div
          animate={{
            background: rm
              ? "radial-gradient(ellipse at center, rgba(168, 85, 247, 0.15) 0%, transparent 60%)"
              : [
                  "radial-gradient(ellipse at top left, rgba(168, 85, 247, 0.2) 0%, transparent 60%)",
                  "radial-gradient(ellipse at top right, rgba(34, 211, 238, 0.2) 0%, transparent 60%)",
                  "radial-gradient(ellipse at bottom left, rgba(168, 85, 247, 0.2) 0%, transparent 60%)",
                  "radial-gradient(ellipse at bottom right, rgba(34, 211, 238, 0.2) 0%, transparent 60%)",
                  "radial-gradient(ellipse at center, rgba(168, 85, 247, 0.15) 0%, transparent 60%)",
                ],
          }}
          transition={rm ? { duration: 0.6 } : { duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0"
        />

        {/* Enhanced Floating Orbs */}
        <motion.div
          animate={{
            x: [0, 120, 0],
            y: [0, -60, 0],
            opacity: [0.15, 0.35, 0.15],
            scale: [1, 1.15, 1],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-20 w-96 h-96 bg-purple-600/25 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -80, 0],
            y: [0, 90, 0],
            opacity: [0.2, 0.4, 0.2],
            scale: [1, 1.25, 1],
          }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-20 right-20 w-80 h-80 bg-cyan-500/30 rounded-full blur-3xl"
        />

        {/* Neon Wave Lines */}
        <motion.div
          animate={{
            opacity: [0.1, 0.3, 0.1],
            scaleX: [1, 1.2, 1],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"
        />
        <motion.div
          animate={{
            opacity: [0.05, 0.25, 0.05],
            scaleX: [1, 1.3, 1],
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 2 }}
          className="absolute bottom-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent"
        />

        {/* Enhanced Floating Light Particles */}
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -40, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [0.5, 1.2, 0.5],
              x: [0, Math.sin(i) * 20, 0],
            }}
            transition={{
              duration: 5 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 10,
              ease: "easeInOut",
            }}
            className="absolute w-2 h-2 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full blur-sm"
            style={{
              left: `${15 + Math.random() * 70}%`,
              top: `${10 + Math.random() * 80}%`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 px-4 py-16">
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0, rotateY: 90 }}
            animate={{ scale: 1, rotateY: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: "backOut" }}
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600/25 to-cyan-500/25 backdrop-blur-xl rounded-full border border-purple-500/40 mb-8"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-5 h-5 text-purple-400 mr-2" />
            </motion.div>
            <motion.span
              animate={{
                backgroundPosition: rm ? "50% 50%" : ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={rm ? { duration: 0.6 } : { duration: 4, repeat: Infinity }}
              className="text-transparent bg-gradient-to-r from-purple-300 via-cyan-300 to-purple-300 bg-clip-text font-semibold bg-[length:200%_auto]"
            >
              Welcome to the Future
            </motion.span>
          </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-5xl md:text-7xl font-black text-transparent bg-gradient-to-r from-purple-400 via-pink-300 to-cyan-300 bg-clip-text mb-6 tracking-tight"
          style={{
            textShadow: "0 0 60px rgba(168, 85, 247, 0.3)",
          }}
        >
          <motion.span
            animate={{
              textShadow: [
                "0 0 20px rgba(168, 85, 247, 0.6)",
                "0 0 40px rgba(34, 211, 238, 0.6)",
                "0 0 20px rgba(168, 85, 247, 0.6)",
              ],
            }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            Briefly — Your AI Workspace
          </motion.span>
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-2xl md:text-3xl font-semibold text-transparent bg-gradient-to-r from-gray-200 via-purple-200 to-cyan-200 bg-clip-text mb-4"
        >
          Understand Everything Instantly.
        </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-xl md:text-2xl text-transparent bg-gradient-to-r from-gray-200 via-purple-200 to-cyan-200 bg-clip-text max-w-3xl mx-auto leading-relaxed"
          >
            <motion.span
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ duration: 6, repeat: Infinity }}
              className="bg-gradient-to-r from-gray-200 via-purple-200 to-cyan-200 bg-clip-text bg-[length:200%_auto]"
            >
              AI summarizer, AI rewriter, note maker, ELI5 explainer, and report generator to boost productivity and learning.
            </motion.span>
          </motion.p>
        </motion.div>

        {/* Enhanced Feature Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="max-w-6xl mx-auto mb-16"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Sparkles,
                title: "✨ Summarizer",
                description:
                  "Transform long content into crystal-clear summaries. Paste any text and watch AI work its magic.",
                gradient: "from-purple-500 to-pink-500",
              },
              {
                icon: Brain,
                title: "🧠 Rewriter",
                description:
                  "Perfect your tone and grammar with intelligent rewriting. Professional, casual, or creative – your choice.",
                gradient: "from-cyan-500 to-blue-500",
              },
              {
                icon: FileText,
                title: "📝 Smart Notes",
                description:
                  "Create beautifully structured study notes and summaries. Organize knowledge like never before.",
                gradient: "from-purple-500 to-cyan-500",
              },
              {
                icon: Star,
                title: "🧒 ELI5",
                description:
                  "Explain complex topics in kid-friendly language. Clear, simple, and engaging.",
                gradient: "from-amber-500 to-yellow-500",
              },
              {
                icon: Target,
                title: "📊 AI Report Maker",
                description:
                  "Generate structured reports with headings, insights, and key takeaways from raw input.",
                gradient: "from-indigo-500 to-fuchsia-500",
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30, rotateX: 15 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ delay: 1 + index * 0.2, duration: 0.6 }}
                whileHover={{
                  y: -12,
                  scale: 1.03,
                  rotateY: 5,
                  boxShadow: "0 25px 50px rgba(168, 85, 247, 0.25)",
                }}
                className="group relative perspective-1000"
              >
                {/* Glowing Background on Hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-cyan-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700"
                  animate={{
                    scale: [1, 1.05, 1],
                    opacity: [0, 0.3, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatDelay: 2,
                  }}
                />

                <div className="relative bg-gradient-to-br from-[#1E1E2E]/90 to-[#2D1B69]/90 backdrop-blur-xl p-8 rounded-3xl border border-purple-500/30 group-hover:border-purple-400/60 transition-all duration-700 overflow-hidden">
                  {/* Parallax Moving Background */}
                  <motion.div
                    whileHover={{ x: [0, 20, 0], y: [0, -10, 0] }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                    className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-cyan-500/10 rounded-full blur-2xl"
                  />

                  <motion.div
                    whileHover={{ rotate: 15, scale: 1.15 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 relative overflow-hidden`}
                  >
                    <motion.div
                      animate={{
                        x: ["-100%", "100%"],
                        opacity: [0, 0.5, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 4,
                      }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
                    />
                    <feature.icon className="w-8 h-8 text-white relative z-10" />
                  </motion.div>

                  <motion.h3
                    whileHover={{ x: 5 }}
                    className="text-2xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-300 group-hover:to-cyan-300 group-hover:bg-clip-text transition-all duration-500"
                  >
                    {feature.title}
                  </motion.h3>

                  <motion.p
                    whileHover={{ x: 3 }}
                    className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-all duration-500"
                  >
                    {feature.description}
                  </motion.p>

                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    className="h-0.5 bg-gradient-to-r from-purple-500 to-cyan-500 mt-6 origin-left transition-transform duration-500"
                  />

                  {/* Shimmer effect */}
                  <motion.div
                    whileHover={{
                      x: ["-100%", "100%"],
                      opacity: [0, 0.6, 0],
                    }}
                    transition={{ duration: 0.8 }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Enhanced Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="max-w-4xl mx-auto mb-16"
        >
          <div className="bg-gradient-to-r from-[#1E1E2E]/70 to-[#2D1B69]/70 backdrop-blur-xl rounded-3xl p-8 border border-purple-500/30 relative overflow-hidden">
            {/* Animated border glow */}
            <motion.div
              animate={{
                opacity: [0.3, 0.6, 0.3],
                scale: [1, 1.02, 1],
              }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-3xl blur-xl"
            />

            <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              {[
                { icon: Zap, number: "10x", label: "Faster Processing" },
                { icon: Users, number: "99%", label: "Accuracy Rate" },
                { icon: Clock, number: "24/7", label: "Always Available" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 2 + index * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="group"
                >
                  <motion.div
                    whileHover={{ scale: 1.15, rotate: 10 }}
                    className="w-12 h-12 bg-gradient-to-r from-purple-500 to-cyan-400 rounded-xl flex items-center justify-center mx-auto mb-4 relative overflow-hidden"
                  >
                    <motion.div
                      animate={{
                        rotate: 360,
                        opacity: [0, 0.3, 0],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                    />
                    <stat.icon className="w-6 h-6 text-white relative z-10" />
                  </motion.div>
                  <motion.div
                    animate={{
                      textShadow: [
                        "0 0 10px rgba(168, 85, 247, 0.5)",
                        "0 0 20px rgba(34, 211, 238, 0.5)",
                        "0 0 10px rgba(168, 85, 247, 0.5)",
                      ],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="text-3xl font-black text-transparent bg-gradient-to-r from-purple-400 to-cyan-300 bg-clip-text mb-2"
                  >
                    {stat.number}
                  </motion.div>
                  <div className="text-gray-400 group-hover:text-purple-300 transition-colors">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Enhanced CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5, duration: 0.8 }}
          className="text-center"
        >
          <div className="flex justify-center">
            <motion.a
              href="/features"
              whileHover={{
                scale: 1.05,
                boxShadow:
                  "0 0 60px rgba(168, 85, 247, 0.6), 0 0 100px rgba(168, 85, 247, 0.2)",
                y: -5,
              }}
              whileTap={{ scale: 0.95 }}
              className="group relative overflow-hidden bg-gradient-to-r from-purple-600 to-cyan-500 text-white px-10 py-5 rounded-2xl font-semibold text-lg transition-all duration-500"
            >
              <motion.div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <motion.div
                animate={{
                  x: ["-100%", "100%"],
                  opacity: [0, 0.6, 0],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  repeatDelay: 3,
                }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-12"
              />
              <span className="relative z-10 flex items-center">
                Get Started
                <motion.div
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <ArrowRight className="ml-2 w-5 h-5" />
                </motion.div>
              </span>
            </motion.a>
          </div>
        </motion.div>

        {/* Enhanced Back to Home */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3, duration: 0.5 }}
          className="text-center mt-12"
        >
          <motion.a
            href="/"
            whileHover={{
              x: -5,
              color: "rgba(168, 85, 247, 0.8)",
            }}
            className="text-gray-500 hover:text-purple-400 transition-all duration-300 text-sm flex items-center justify-center"
          >
            <motion.span
              whileHover={{ x: -3 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              ←
            </motion.span>
            <span className="ml-1">Back to Home</span>
          </motion.a>
        </motion.div>
        <div className="max-w-7xl mx-auto mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-6 rounded-2xl border border-purple-500/30 bg-gradient-to-br from-[#1E1E2E]/70 to-[#2D1B69]/70">
            <h2 className="text-2xl font-bold text-white mb-3">Why Briefly is better</h2>
            <ul className="space-y-3 text-gray-300">
              <li>Fast, accurate AI tuned for education and productivity</li>
              <li>Simple, accessible UI with keyboard-friendly controls</li>
              <li>Export-ready outputs for sharing and archiving</li>
              <li>Privacy-first design without heavy tracking</li>
            </ul>
          </div>
          <div className="p-6 rounded-2xl border border-purple-500/30 bg-gradient-to-br from-[#1E1E2E]/70 to-[#2D1B69]/70">
            <h2 className="text-2xl font-bold text-white mb-3">Testimonials</h2>
            <ul className="space-y-3 text-gray-300">
              <li>“Perfect for study notes and quick reports.”</li>
              <li>“ELI5 makes complex topics easy.”</li>
              <li>“Clean UI and great outputs.”</li>
            </ul>
          </div>
        </div>
        <div className="text-center mt-12">
          <a href="/features" className="underline" title="Explore all features">Explore features</a>
          <span className="mx-2">•</span>
          <a href="/dashboard" className="underline" title="Open dashboard">Open dashboard</a>
        </div>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      </div>
    </div>
  );
}

export default MainComponent;
