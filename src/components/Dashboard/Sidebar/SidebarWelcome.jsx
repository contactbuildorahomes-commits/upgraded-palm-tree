import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { auth } from "@/firebase/config";
import { getUserProfile } from "@/firebase/firestore";

export function SidebarWelcome({ user }) {
  const [avatar, setAvatar] = useState(null);
  useEffect(() => {
    const id = user?.id || "default";
    fetch(`/api/profile/image?id=${encodeURIComponent(id)}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((j) => setAvatar(j?.imageDataURL || null))
      .catch(() => {});
  }, [user?.id]);

  useEffect(() => {
    const fbUser = auth.currentUser;
    if (fbUser?.uid) {
      getUserProfile(fbUser.uid)
        .then((p) => {
          if (p?.photoURL) setAvatar(p.photoURL);
        })
        .catch(() => {});
    }
  }, []);
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      className="mb-8 p-4 bg-gradient-to-r from-purple-600/20 to-cyan-500/20 rounded-2xl border border-purple-500/30 backdrop-blur-xl shadow-lg shadow-purple-500/10"
    >
      <motion.div
        animate={{
          opacity: [0.5, 1, 0.5],
        }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-cyan-500/5 rounded-2xl"
      />
      <div className="relative z-10 flex items-center space-x-3">
        {avatar ? (
                  <img
                    src={avatar}
                    alt="Profile avatar"
                    loading="lazy"
                    className="w-10 h-10 rounded-full object-cover border border-purple-500/40"
                  />
        ) : (
          <div className="w-10 h-10 rounded-full bg-purple-500/30 flex items-center justify-center text-white font-bold">
            {(user.name?.[0] || "U").toUpperCase()}
          </div>
        )}
        <div>
          <p className="text-white font-semibold">
            Welcome back, {user.name?.split(" ")[0] || "User"} 👋
          </p>
          <p className="text-gray-400 text-sm mt-1">
            Ready to create something amazing?
          </p>
        </div>
      </div>
    </motion.div>
  );
}
