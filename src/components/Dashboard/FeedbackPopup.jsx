import { motion, AnimatePresence } from "motion/react";
import Star from "lucide-react/dist/esm/icons/star.js";

export function FeedbackPopup({
  showFeedback,
  setShowFeedback,
  feedbackRating,
  setFeedbackRating,
  feedbackComment,
  setFeedbackComment,
  feedbackSubmitted,
  handleFeedbackSubmit,
}) {
  return (
    <AnimatePresence>
      {showFeedback && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative overflow-hidden"
          >
            {/* Animated border glow */}
            <motion.div
              animate={{
                opacity: [0.5, 0.8, 0.5],
                scale: [1, 1.02, 1],
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-cyan-500/30 rounded-3xl blur-xl"
            />

            <div className="relative bg-gradient-to-br from-[#1E1E2E]/95 via-[#2D1B69]/90 to-[#1E1E2E]/95 backdrop-blur-2xl rounded-3xl p-8 border border-purple-500/30 max-w-md w-full shadow-2xl">
              {!feedbackSubmitted ? (
                <>
                  <div className="text-center mb-6">
                    <motion.div
                      initial={{ scale: 0, rotate: 90 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{
                        delay: 0.2,
                        duration: 0.8,
                        ease: "backOut",
                      }}
                      className="w-16 h-16 bg-gradient-to-r from-purple-500 to-cyan-400 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-purple-500/30"
                    >
                      <img
                        src="https://ucarecdn.com/3a736374-d913-4ad0-a8b3-8a938c245e05/-/format/auto/"
                        alt="Brii"
                        className="w-10 h-10 object-contain"
                      />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      Hey 👋
                    </h3>
                    <p className="text-gray-300">
                      How was your experience with me today?
                    </p>
                  </div>

                  {/* Enhanced Star Rating */}
                  <div className="flex justify-center space-x-2 mb-6">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <motion.button
                        key={star}
                        whileHover={{ scale: 1.15, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setFeedbackRating(star)}
                        className={`p-2 rounded-xl transition-all duration-300 ${
                          star <= feedbackRating
                            ? "text-yellow-400 bg-yellow-400/20 shadow-lg shadow-yellow-400/20"
                            : "text-gray-500 hover:text-yellow-400 hover:bg-yellow-400/10"
                        }`}
                      >
                        <Star
                          className={`w-8 h-8 transition-all duration-300 ${
                            star <= feedbackRating
                              ? "fill-current scale-110"
                              : ""
                          }`}
                        />
                      </motion.button>
                    ))}
                  </div>

                  {/* Enhanced Comment Input */}
                  <motion.textarea
                    whileFocus={{
                      scale: 1.01,
                      boxShadow: "0 0 30px rgba(168, 85, 247, 0.2)",
                    }}
                    value={feedbackComment}
                    onChange={(e) => setFeedbackComment(e.target.value)}
                    placeholder="Tell us what you think... (optional)"
                    className="w-full p-4 bg-[#0A0A0A]/60 border border-purple-500/30 rounded-xl text-white placeholder-gray-500 resize-none focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/30 transition-all duration-500 mb-6 backdrop-blur-xl"
                    rows="3"
                  />

                  {/* Enhanced Buttons */}
                  <div className="flex space-x-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setShowFeedback(false);
                        localStorage.setItem("brieflyFeedbackShown", "true");
                      }}
                      className="flex-1 px-4 py-3 border border-gray-600 text-gray-400 rounded-xl hover:text-white hover:border-gray-500 transition-all duration-300 backdrop-blur-xl"
                    >
                      Skip
                    </motion.button>
                    <motion.button
                      whileHover={{
                        scale: 1.02,
                        boxShadow: "0 0 30px rgba(168, 85, 247, 0.4)",
                      }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleFeedbackSubmit}
                      disabled={feedbackRating === 0}
                      className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-600 to-cyan-500 text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-500 shadow-lg"
                    >
                      Submit
                    </motion.button>
                  </div>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-green-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-green-500/20">
                    <Star className="w-8 h-8 text-green-400 fill-current" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Thank you! 🎉
                  </h3>
                  <p className="text-gray-300">
                    Your feedback helps us improve Briefly.
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
