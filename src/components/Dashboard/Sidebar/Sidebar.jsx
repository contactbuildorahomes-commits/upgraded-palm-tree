import { motion, AnimatePresence } from "motion/react";
import { SidebarLogo } from "./SidebarLogo";
import { SidebarWelcome } from "./SidebarWelcome";
import { SidebarTabs } from "./SidebarTabs";
import { SidebarProfile } from "./SidebarProfile";
import { SidebarFooter } from "./SidebarFooter";

export function Sidebar({
  sidebarOpen,
  isDesktop,
  user,
  activeTab,
  setActiveTab,
  setSidebarOpen,
  showProfileDropdown,
  setShowProfileDropdown,
  signOut,
}) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: -300, opacity: 0 }}
        animate={{ x: sidebarOpen || isDesktop ? 0 : -300, opacity: 1 }}
        exit={{ x: -300, opacity: 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="fixed left-0 top-0 h-full w-80 bg-gradient-to-b from-[#1E1E2E]/95 via-[#2D1B69]/90 to-[#1E1E2E]/95 backdrop-blur-2xl border-r border-purple-500/30 z-40 shadow-2xl shadow-purple-500/10"
      >
        {/* Subtle glow effect */}
        <motion.div
          animate={{
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute inset-0 bg-gradient-to-r from-purple-400/5 via-transparent to-cyan-400/5"
        />

        <div className="p-6 relative z-10">
          <SidebarLogo />
          <SidebarWelcome user={user} />
          <SidebarTabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            setSidebarOpen={setSidebarOpen}
          />
          <SidebarProfile
            user={user}
            showProfileDropdown={showProfileDropdown}
            setShowProfileDropdown={setShowProfileDropdown}
            signOut={signOut}
          />
          <SidebarFooter />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
