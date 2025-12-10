import { motion } from "motion/react";

export function SignInPrompt() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#000000] via-[#0A0A0A] to-[#1A0B2E] flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-2xl text-white mb-4">Please sign in to continue</h2>
        <a
          href="/account/signin"
          className="bg-gradient-to-r from-purple-600 to-cyan-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
        >
          Sign In
        </a>
      </motion.div>
    </div>
  );
}
