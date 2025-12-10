import { motion, AnimatePresence } from "motion/react";
import User from "lucide-react/dist/esm/icons/user.js";
import LogOut from "lucide-react/dist/esm/icons/log-out.js";
import ArrowRight from "lucide-react/dist/esm/icons/arrow-right.js";

export function SidebarProfile({
  user,
  showProfileDropdown,
  setShowProfileDropdown,
  signOut,
}) {
  return (
    <div className="relative">
      <motion.button
        whileHover={{
          scale: 1.02,
          boxShadow: "0 5px 20px rgba(107, 114, 128, 0.2)",
        }}
        onClick={() => setShowProfileDropdown(!showProfileDropdown)}
        className="w-full flex items-center space-x-3 p-4 rounded-2xl bg-gradient-to-r from-gray-700/30 to-gray-600/30 border border-gray-500/30 text-gray-300 hover:text-white transition-all duration-500 shadow-lg backdrop-blur-xl"
      >
        <User className="w-5 h-5" />
        <span className="flex-1 text-left font-semibold">Profile</span>
        <motion.div
          animate={{ rotate: showProfileDropdown ? 90 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ArrowRight className="w-4 h-4" />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {showProfileDropdown && (
          <motion.div
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="mt-2 p-4 bg-gradient-to-r from-red-600/20 to-red-500/20 rounded-2xl border border-red-500/30 backdrop-blur-xl shadow-lg"
          >
            <div className="text-gray-300 text-sm mb-3">
              <p>
                <strong>Email:</strong> {user.email}
              </p>
            </div>
            <motion.button
              whileHover={{
                scale: 1.02,
                boxShadow: "0 5px 15px rgba(239, 68, 68, 0.3)",
              }}
              whileTap={{ scale: 0.98 }}
              onClick={async () => {
                await signOut({ callbackUrl: "/", redirect: true });
              }}
              className="w-full flex items-center space-x-2 p-3 bg-red-600/30 hover:bg-red-600/40 rounded-xl text-red-300 hover:text-red-200 transition-all duration-300 shadow-lg"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
