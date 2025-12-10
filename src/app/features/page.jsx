import { motion } from "motion/react";
import { useRef, useEffect, useState } from "react";
import Sparkles from "lucide-react/dist/esm/icons/sparkles.js";
import Brain from "lucide-react/dist/esm/icons/brain.js";
import FileText from "lucide-react/dist/esm/icons/file-text.js";
import ArrowRight from "lucide-react/dist/esm/icons/arrow-right.js";
import Zap from "lucide-react/dist/esm/icons/zap.js";
import Target from "lucide-react/dist/esm/icons/target.js";
import Clock from "lucide-react/dist/esm/icons/clock.js";
import Shield from "lucide-react/dist/esm/icons/shield.js";
import Star from "lucide-react/dist/esm/icons/star.js";

export const meta = () => [
  { title: "Briefly — Features" },
  {
    name: "description",
    content:
      "Explore Briefly’s AI Summarizer, Rewriter, Smart Notes, ELI5 Explainer, and Report Maker with fast, premium animations.",
  },
  { property: "og:title", content: "Briefly — Features" },
  {
    property: "og:description",
    content:
      "Deep dive into Briefly’s tools and platform benefits: speed, accuracy, security, and productivity.",
  },
  { property: "og:type", content: "website" },
  { property: "og:image", content: import.meta.env.NEXT_PUBLIC_OG_IMAGE || "" },
  { name: "twitter:title", content: "Briefly — Features" },
  { name: "twitter:description", content: "Explore Briefly’s AI tools and benefits." },
  { name: "twitter:image", content: import.meta.env.NEXT_PUBLIC_OG_IMAGE || "" },
];

function MainComponent() {
  const rm = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const [visibleSections, setVisibleSections] = useState({});
  const ld = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Briefly — Features",
    description:
      "Explore AI Summarizer, Rewriter, Smart Notes, ELI5 Explainer, Report Maker.",
    isPartOf: { "@type": "WebSite", name: "Briefly" },
    publisher: { "@type": "Organization", name: "Briefly" },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "/welcome" },
        { "@type": "ListItem", position: 2, name: "Features", item: "/features" },
      ],
    },
    mainEntity: {
      "@type": "FAQPage",
      name: "Briefly FAQs",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is Briefly?",
          acceptedAnswer: { "@type": "Answer", text: "An AI workspace with summarizer, rewriter, notes, ELI5, and report maker." },
        },
        {
          "@type": "Question",
          name: "Is Briefly free?",
          acceptedAnswer: { "@type": "Answer", text: "Core tools are free; advanced features may require a plan." },
        },
      ],
    },
  };

  const features = [
    {
      icon: Sparkles,
      title: "✨ AI Summarizer",
      id: "summarizer",
      subtitle: "Transform Chaos into Clarity",
      description:
        "Instantly convert long articles, documents, research papers, or any text into concise, meaningful summaries. Our advanced AI understands context and extracts the most important information.",
      benefits: [
        "Save hours of reading time",
        "Extract key insights instantly",
        "Perfect for research and study",
        "Maintains original context",
      ],
      gradient: "from-purple-500 to-pink-500",
      bgGradient: "from-purple-600/10 to-pink-600/10",
    },
    {
      icon: Brain,
      title: "🧠 Smart Rewriter",
      id: "rewriter",
      subtitle: "Perfect Your Voice",
      description:
        "Enhance your writing with intelligent tone adjustment and grammar perfection. Whether you need professional, casual, or creative voice, our AI adapts to your needs.",
      benefits: [
        "Improve tone and clarity",
        "Fix grammar automatically",
        "Adapt to different audiences",
        "Maintain your unique style",
      ],
      gradient: "from-cyan-500 to-blue-500",
      bgGradient: "from-cyan-600/10 to-blue-600/10",
    },
    {
      icon: FileText,
      title: "📝 Smart Notes",
      id: "notes",
      subtitle: "Organize Your Thoughts",
      description:
        "Create beautifully structured study notes and summaries from any content. Transform raw information into organized, memorable knowledge that sticks.",
      benefits: [
        "Structured learning format",
        "Beautiful visual layout",
        "Easy to review and share",
        "Perfect for studying",
      ],
      gradient: "from-emerald-500 to-teal-500",
      bgGradient: "from-emerald-600/10 to-teal-600/10",
    },
    {
      icon: Star,
      title: "🧒 ELI5 Explainer",
      id: "eli5",
      subtitle: "Complex → Child-Friendly",
      description:
        "Turn complicated topics into simple, kid-friendly explanations using analogies and step-by-step breakdowns.",
      benefits: [
        "Simple language",
        "Analogies and examples",
        "Step-by-step explanations",
        "Adjustable complexity",
      ],
      gradient: "from-amber-500 to-yellow-500",
      bgGradient: "from-amber-600/10 to-yellow-600/10",
    },
    {
      icon: Target,
      title: "📊 AI Report Maker",
      id: "report",
      subtitle: "From Data to Insight",
      description:
        "Generate structured reports with headings, key findings, recommendations, and executive summaries from raw input.",
      benefits: [
        "Auto headings and sections",
        "Key findings",
        "Actionable recommendations",
        "Export-friendly layout",
      ],
      gradient: "from-indigo-500 to-fuchsia-500",
      bgGradient: "from-indigo-600/10 to-fuchsia-600/10",
    },
  ];

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setVisibleSections((prev) => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting,
          }));
        });
      },
      { threshold: 0.2, margin: "-100px" },
    );

    const sections = document.querySelectorAll("[data-feature]");
    sections.forEach((section) => observer.observe(section));

    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#000000] via-[#0A0A0A] to-[#1A0B2E] relative overflow-hidden">
      {/* Enhanced Background Effects with Smooth Motion */}
      <div className="absolute inset-0">
        {/* Moving Gradient Waves */}
        <motion.div
          animate={{
            background: rm ? "radial-gradient(ellipse at 50% 50%, rgba(168, 85, 247, 0.15) 0%, transparent 70%)" : [
              "radial-gradient(ellipse at 20% 30%, rgba(168, 85, 247, 0.15) 0%, transparent 70%)",
              "radial-gradient(ellipse at 80% 70%, rgba(34, 211, 238, 0.15) 0%, transparent 70%)",
              "radial-gradient(ellipse at 60% 20%, rgba(168, 85, 247, 0.15) 0%, transparent 70%)",
              "radial-gradient(ellipse at 20% 80%, rgba(34, 211, 238, 0.15) 0%, transparent 70%)",
            ],
          }}
          transition={rm ? { duration: 0.6 } : { duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0"
        />

        {/* Enhanced Floating Orbs */}
        <motion.div
          animate={{
            x: rm ? 0 : [0, 150, -50, 0],
            y: rm ? 0 : [0, -80, 40, 0],
            opacity: rm ? 0.2 : [0.1, 0.3, 0.15, 0.1],
            scale: rm ? 1 : [1, 1.2, 0.9, 1],
          }}
          transition={rm ? { duration: 0.6 } : { duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-10 left-10 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: rm ? 0 : [0, -120, 80, 0],
            y: rm ? 0 : [0, 120, -60, 0],
            opacity: rm ? 0.25 : [0.2, 0.4, 0.25, 0.2],
            scale: rm ? 1 : [1, 1.1, 1.3, 1],
          }}
          transition={rm ? { duration: 0.6 } : { duration: 16, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-3xl"
        />

        {/* Neon Grid Pattern */}
        <motion.div
          animate={{
            opacity: [0.05, 0.15, 0.05],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(168, 85, 247, 0.3) 1px, transparent 0)`,
            backgroundSize: "60px 60px",
          }}
        />

        {/* Floating Light Particles */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -50, 0],
              opacity: [0, 0.8, 0],
              scale: [0.5, 1.2, 0.5],
              x: [0, Math.sin(i) * 30, 0],
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 12,
              ease: "easeInOut",
            }}
            className="absolute w-1 h-1 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full blur-sm"
            style={{
              left: `${10 + Math.random() * 80}%`,
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
          className="text-center mb-20"
        >

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
              Features That Amaze
            </motion.span>
          </motion.h1>

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
              Experience the next generation of AI-powered content tools
            </motion.span>
          </motion.p>
        </motion.div>

        {/* Enhanced Feature Cards */}
        <div className="max-w-7xl mx-auto space-y-32">
          {features.map((feature, index) => {
            const isVisible = visibleSections[feature.id];

            return (
              <motion.div
                key={feature.title}
                id={feature.id}
                data-feature={index}
                initial={{ opacity: 0, y: 80 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{
                  delay: index * 0.2,
                  duration: 1,
                  ease: "easeOut",
                }}
                className={`flex flex-col ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} items-center gap-12 lg:gap-20 group`}
              >
                {/* Enhanced Feature Content */}
                <div className="flex-1 space-y-6">
                  <motion.div
                    whileHover={{ scale: 1.02, x: index % 2 === 0 ? 10 : -10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="group"
                  >
                    <motion.div
                      whileHover={{
                        rotate: 10,
                        scale: 1.15,
                        y: -5,
                      }}
                      transition={{ type: "spring", stiffness: 400 }}
                      className={`w-20 h-20 bg-gradient-to-r ${feature.gradient} rounded-3xl flex items-center justify-center mb-6 relative overflow-hidden shadow-lg`}
                    >
                      {/* Animated glow effect */}
                      <motion.div
                        animate={{
                          scale: [1, 1.5, 1],
                          opacity: [0.5, 0.8, 0.5],
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} rounded-3xl blur-lg`}
                      />

                      {/* Shimmer effect */}
                      <motion.div
                        animate={{
                          x: ["-100%", "100%"],
                          opacity: [0, 0.6, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatDelay: 3,
                        }}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
                      />

                      <feature.icon className="w-10 h-10 text-white relative z-10" />
                    </motion.div>

                    <motion.h2
                      initial={{ opacity: 0, x: -20 }}
                      animate={isVisible ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: index * 0.2 + 0.3, duration: 0.8 }}
                      className="text-4xl md:text-5xl font-black text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-300 group-hover:to-cyan-300 group-hover:bg-clip-text transition-all duration-500"
                    >
                      {feature.title}
                    </motion.h2>

                    <motion.h3
                      initial={{ opacity: 0, x: -20 }}
                      animate={isVisible ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: index * 0.2 + 0.5, duration: 0.8 }}
                      className="text-xl md:text-2xl text-gray-400 mb-6 group-hover:text-purple-300 transition-colors duration-500"
                    >
                      {feature.subtitle}
                    </motion.h3>

                    <motion.p
                      initial={{ opacity: 0, x: -20 }}
                      animate={isVisible ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: index * 0.2 + 0.7, duration: 0.8 }}
                      className="text-lg text-gray-300 leading-relaxed mb-8 group-hover:text-gray-200 transition-colors duration-500"
                    >
                      {feature.description}
                    </motion.p>

                    {/* Enhanced Benefits List */}
                    <div className="space-y-4">
                      {feature.benefits.map((benefit, i) => (
                        <motion.div
                          key={benefit}
                          initial={{ opacity: 0, x: -30 }}
                          animate={isVisible ? { opacity: 1, x: 0 } : {}}
                          transition={{
                            delay: index * 0.2 + 0.9 + i * 0.1,
                            duration: 0.6,
                          }}
                          whileHover={{ x: 10, scale: 1.02 }}
                          className="flex items-center space-x-4 group/benefit cursor-pointer"
                        >
                          <motion.div
                            animate={{
                              scale: [1, 1.2, 1],
                              boxShadow: [
                                "0 0 0px rgba(168, 85, 247, 0)",
                                "0 0 10px rgba(168, 85, 247, 0.5)",
                                "0 0 0px rgba(168, 85, 247, 0)",
                              ],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              delay: i * 0.5,
                            }}
                            className={`w-2 h-2 bg-gradient-to-r ${feature.gradient} rounded-full group-hover/benefit:scale-125 transition-transform`}
                          />
                          <span className="text-gray-400 group-hover/benefit:text-purple-300 group-hover:text-gray-300 transition-colors duration-300">
                            {benefit}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>

                {/* Enhanced Feature Visual with Parallax */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: index * 0.2 + 0.4, duration: 1 }}
                  whileHover={{
                    scale: 1.05,
                    rotateY: index % 2 === 0 ? 5 : -5,
                    y: -10,
                  }}
                  className="flex-1 relative max-w-lg group perspective-1000"
                >
                  {/* Enhanced Glowing Background */}
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className={`absolute inset-0 bg-gradient-to-r ${feature.bgGradient} rounded-3xl blur-2xl`}
                  />

                  {/* Parallax moving background elements */}
                  <motion.div
                    whileHover={{
                      x: [0, 20, -20, 0],
                      y: [0, -15, 15, 0],
                    }}
                    transition={{ duration: 3, ease: "easeInOut" }}
                    className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-purple-500/20 to-cyan-500/20 rounded-full blur-xl"
                  />

                  <motion.div
                    whileHover={{
                      x: [0, -15, 15, 0],
                      y: [0, 10, -10, 0],
                    }}
                    transition={{ duration: 2.5, ease: "easeInOut" }}
                    className="absolute bottom-6 left-6 w-16 h-16 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-full blur-xl"
                  />

                  <div className="relative bg-gradient-to-br from-[#1E1E2E]/90 to-[#2D1B69]/90 backdrop-blur-xl p-8 rounded-3xl border border-purple-500/30 shadow-2xl overflow-hidden group-hover:border-purple-400/50 transition-all duration-700">
                    {/* Enhanced Glowing Border Effect */}
                    <motion.div
                      animate={{
                        opacity: [0, 1, 0],
                        scale: [0.8, 1.1, 0.8],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatDelay: 2,
                      }}
                      className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-cyan-500/20 to-purple-500/20 rounded-3xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                    />

                    {/* Mock Interface */}
                    <div className="space-y-4 relative z-10">
                      <div className="flex items-center space-x-2 mb-6">
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: 0,
                          }}
                          className="w-3 h-3 bg-red-500 rounded-full"
                        />
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: 0.3,
                          }}
                          className="w-3 h-3 bg-yellow-500 rounded-full"
                        />
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: 0.6,
                          }}
                          className="w-3 h-3 bg-green-500 rounded-full"
                        />
                      </div>

                      <motion.div
                        animate={{
                          opacity: [0.5, 1, 0.5],
                          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="h-4 bg-gradient-to-r from-purple-400/30 via-cyan-400/30 to-purple-400/30 rounded bg-[length:200%_auto]"
                      />

                      {/* Typewriter effect lines */}
                      <motion.div
                        animate={{ width: ["0%", "75%"] }}
                        transition={{ delay: 1, duration: 2 }}
                        className="h-3 bg-gray-600/30 rounded"
                      />
                      <motion.div
                        animate={{ width: ["0%", "50%"] }}
                        transition={{ delay: 1.5, duration: 1.5 }}
                        className="h-3 bg-gray-600/30 rounded"
                      />

                      <div className="mt-6 pt-6 border-t border-purple-500/20">
                        <motion.div
                          animate={{
                            scaleX: [0, 1],
                            backgroundPosition: [
                              "0% 50%",
                              "100% 50%",
                              "0% 50%",
                            ],
                          }}
                          transition={{
                            scaleX: { duration: 3, repeat: Infinity },
                            backgroundPosition: {
                              duration: 4,
                              repeat: Infinity,
                            },
                          }}
                          className={`h-2 bg-gradient-to-r ${feature.gradient} rounded-full origin-left bg-[length:200%_auto]`}
                        />
                        <div className="mt-4 space-y-2">
                          <motion.div
                            animate={{ width: ["0%", "100%"] }}
                            transition={{ delay: 2, duration: 1 }}
                            className="h-3 bg-cyan-400/20 rounded"
                          />
                          <motion.div
                            animate={{ width: ["0%", "80%"] }}
                            transition={{ delay: 2.5, duration: 1 }}
                            className="h-3 bg-cyan-400/20 rounded"
                          />
                          <motion.div
                            animate={{ width: ["0%", "60%"] }}
                            transition={{ delay: 3, duration: 1 }}
                            className="h-3 bg-cyan-400/20 rounded"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        <div className="max-w-7xl mx-auto mt-24">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-black text-transparent bg-gradient-to-r from-purple-400 via-pink-300 to-cyan-300 bg-clip-text mb-6"
          >
            Why Briefly
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            <div className="p-6 rounded-2xl border border-purple-500/30 bg-gradient-to-br from-[#1E1E2E]/70 to-[#2D1B69]/70">
              <h3 className="text-2xl font-bold text-white mb-3">Platform Advantages</h3>
              <ul className="space-y-3 text-gray-300">
                <li>Lightning-fast processing with optimized render pipeline</li>
                <li>Accurate results tuned for education and business</li>
                <li>Secure by default with privacy-first design</li>
                <li>Seamless workflow across all tools</li>
              </ul>
            </div>
            <div className="p-6 rounded-2xl border border-purple-500/30 bg-gradient-to-br from-[#1E1E2E]/70 to-[#2D1B69]/70">
              <h3 className="text-2xl font-bold text-white mb-3">Productivity Features</h3>
              <ul className="space-y-3 text-gray-300">
                <li>One-click exports for sharing and archiving</li>
                <li>Responsive UI with smooth 60fps animations</li>
                <li>Keyboard-friendly interactions and shortcuts</li>
                <li>Personalized dashboard with recent activity</li>
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Enhanced Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 1 }}
          className="text-center mt-32"
        >
          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            className="inline-block"
          >
            <motion.a
              href="/account/signin"
              whileHover={{
                boxShadow:
                  "0 0 80px rgba(168, 85, 247, 0.6), 0 0 120px rgba(168, 85, 247, 0.3)",
                y: -8,
              }}
              whileTap={{ scale: 0.95 }}
              className="group relative overflow-hidden bg-gradient-to-r from-purple-600 to-cyan-500 text-white px-12 py-6 rounded-3xl font-bold text-xl transition-all duration-500 shadow-2xl"
            >
              <motion.div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Enhanced shimmer effect */}
              <motion.div
                animate={{
                  x: ["-100%", "100%"],
                  opacity: [0, 0.8, 0],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  repeatDelay: 3,
                }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
              />

              <span className="relative z-10 flex items-center">
                Start Using BRIEFLY
                <motion.div
                  whileHover={{ x: 8, scale: 1.2 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <ArrowRight className="ml-3 w-6 h-6" />
                </motion.div>
              </span>
            </motion.a>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5, duration: 0.8 }}
            className="text-gray-400 mt-8 text-lg"
          >
            <motion.span
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ duration: 5, repeat: Infinity }}
              className="text-transparent bg-gradient-to-r from-gray-400 via-purple-300 to-gray-400 bg-clip-text bg-[length:200%_auto]"
            >
              Ready to transform how you work with text?
            </motion.span>
          </motion.p>
        </motion.div>

        {/* Enhanced Navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3, duration: 0.5 }}
          className="flex justify-center space-x-8 mt-16"
        >
          <motion.a
            href="/brii-intro"
            whileHover={{ x: -5, color: "rgba(168, 85, 247, 0.8)" }}
            className="text-gray-500 hover:text-purple-400 transition-all duration-300 text-sm flex items-center"
          >
            <motion.span
              whileHover={{ x: -3 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              ←
            </motion.span>
            <span className="ml-1">Back to Brii</span>
          </motion.a>
          <motion.a
            href="/features"
            whileHover={{ color: "rgba(168, 85, 247, 0.8)" }}
            className="text-gray-500 hover:text-purple-400 transition-all duration-300 text-sm flex items-center"
          >
            Get Started →
          </motion.a>
        </motion.div>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    </div>
  );
}

export default MainComponent;
