import { motion } from "motion/react";
import Menu from "lucide-react/dist/esm/icons/menu.js";
import X from "lucide-react/dist/esm/icons/x.js";

export function MobileMenuToggle({ sidebarOpen, setSidebarOpen }) {
  return (
    <div className="lg:hidden fixed top-4 left-4 z-50">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="p-3 bg-gradient-to-r from-purple-600/30 to-cyan-500/30 backdrop-blur-xl rounded-2xl border border-purple-500/30 text-white shadow-lg shadow-purple-500/20"
      >
        {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </motion.button>
    </div>
  );
}
