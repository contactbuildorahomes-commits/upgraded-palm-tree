import { useState } from "react";
import useAuth from "@/utils/useAuth";
import { motion } from "motion/react";
import Eye from "lucide-react/dist/esm/icons/eye.js";
import EyeOff from "lucide-react/dist/esm/icons/eye-off.js";
import Mail from "lucide-react/dist/esm/icons/mail.js";
import Lock from "lucide-react/dist/esm/icons/lock.js";
import User from "lucide-react/dist/esm/icons/user.js";
import ImageIcon from "lucide-react/dist/esm/icons/image.js";

export const meta = () => [
  { title: "Briefly — Sign Up" },
  { name: "description", content: "Create your Briefly account." },
  { property: "og:title", content: "Briefly — Sign Up" },
  { property: "og:description", content: "Join Briefly to use AI summarizer, rewriter, notes, ELI5, and reports." },
  { property: "og:image", content: import.meta.env.NEXT_PUBLIC_OG_IMAGE || "" },
  { name: "twitter:title", content: "Briefly — Sign Up" },
  { name: "twitter:description", content: "Join Briefly to use AI summarizer, rewriter, notes, ELI5, and reports." },
  { name: "twitter:image", content: import.meta.env.NEXT_PUBLIC_OG_IMAGE || "" },
];

function MainComponent() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { signUpWithCredentials } = useAuth();
  const [photo, setPhoto] = useState(null);
  const [photoSaved, setPhotoSaved] = useState(false);
  const [scale, setScale] = useState(1);

  const onPhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setPhoto(reader.result);
    reader.readAsDataURL(file);
  };

  const saveCroppedPhoto = async () => {
    if (!photo) return;
    const img = new Image();
    img.src = photo;
    await new Promise((r) => (img.onload = r));
    const size = 256;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, size, size);
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();
    const scaledW = img.width * scale;
    const scaledH = img.height * scale;
    const dx = (size - scaledW) / 2;
    const dy = (size - scaledH) / 2;
    ctx.drawImage(img, dx, dy, scaledW, scaledH);
    const dataURL = canvas.toDataURL("image/png");
    await fetch("/api/profile/upload", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ imageDataURL: dataURL, userId: "default" }),
    });
    setPhotoSaved(true);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!email || !password || !name) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    try {
      await signUpWithCredentials({
        email,
        password,
        name,
        callbackUrl: "/dashboard",
        redirect: true,
      });
    } catch (err) {
      const errorMessages = {
        OAuthSignin:
          "Couldn't start sign-up. Please try again or use a different method.",
        OAuthCallback: "Sign-up failed after redirecting. Please try again.",
        OAuthCreateAccount:
          "Couldn't create an account with this sign-up option. Try another one.",
        EmailCreateAccount:
          "This email can't be used. It may already be registered.",
        Callback: "Something went wrong during sign-up. Please try again.",
        OAuthAccountNotLinked:
          "This account is linked to a different sign-in method. Try using that instead.",
        CredentialsSignin:
          "Invalid email or password. If you already have an account, try signing in instead.",
        AccessDenied: "You don't have permission to sign up.",
        Configuration:
          "Sign-up isn't working right now. Please try again later.",
        Verification: "Your sign-up link has expired. Request a new one.",
      };

      setError(
        errorMessages[err.message] || "Something went wrong. Please try again.",
      );
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#000000] via-[#0A0A0A] to-[#1A0B2E] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0">
        {/* Moving Gradient Background */}
        <motion.div
          animate={{
            background: [
              "radial-gradient(circle at 20% 30%, rgba(168, 85, 247, 0.15) 0%, transparent 60%)",
              "radial-gradient(circle at 80% 70%, rgba(34, 211, 238, 0.15) 0%, transparent 60%)",
              "radial-gradient(circle at 40% 80%, rgba(168, 85, 247, 0.15) 0%, transparent 60%)",
              "radial-gradient(circle at 20% 30%, rgba(168, 85, 247, 0.15) 0%, transparent 60%)",
            ],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0"
        />

        {/* Enhanced Floating Orbs */}
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            opacity: [0.2, 0.4, 0.2],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-20 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -80, 0],
            y: [0, 80, 0],
            opacity: [0.15, 0.35, 0.15],
            scale: [1, 1.3, 1],
          }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-20 right-20 w-[500px] h-[500px] bg-cyan-500/25 rounded-full blur-3xl"
        />

        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 1, 0],
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
              left: `${20 + Math.random() * 60}%`,
              top: `${20 + Math.random() * 60}%`,
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, ease: "backOut" }}
        className="w-full max-w-md relative z-10"
      >
        {/* Premium Glassmorphism Card */}
        <motion.div
          whileHover={{ scale: 1.02, y: -5 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="relative overflow-hidden"
        >
          {/* Animated Border Glow */}
          <motion.div
            animate={{
              opacity: [0.3, 0.6, 0.3],
              scale: [1, 1.02, 1],
            }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-cyan-500/30 rounded-3xl blur-xl"
          />

          {/* Main Glass Panel */}
          <div className="relative bg-gradient-to-br from-[#1E1E2E]/90 via-[#2D1B69]/85 to-[#1E1E2E]/90 backdrop-blur-2xl rounded-3xl p-8 border border-purple-500/30 shadow-2xl shadow-purple-500/20">
            {/* Subtle Inner Glow */}
            <motion.div
              animate={{
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{ duration: 6, repeat: Infinity }}
              className="absolute inset-0 bg-gradient-to-r from-purple-400/10 via-transparent to-cyan-400/10 rounded-3xl"
            />

            {/* Enhanced Logo Section */}
            <motion.div
              initial={{ scale: 0, rotateY: 180 }}
              animate={{ scale: 1, rotateY: 0 }}
              transition={{ delay: 0.3, duration: 0.8, ease: "backOut" }}
              className="text-center mb-8 relative z-10"
            >
              <motion.h1
                animate={{
                  textShadow: [
                    "0 0 20px rgba(168, 85, 247, 0.5)",
                    "0 0 30px rgba(34, 211, 238, 0.5)",
                    "0 0 20px rgba(168, 85, 247, 0.5)",
                  ],
                }}
                transition={{ duration: 4, repeat: Infinity }}
                className="text-4xl font-black text-transparent bg-gradient-to-r from-purple-400 via-pink-300 to-cyan-300 bg-clip-text mb-2"
              >
                BRIEFLY
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-gray-400 text-sm"
              >
                Join the future of AI
              </motion.p>
            </motion.div>

            <form onSubmit={onSubmit} className="space-y-6 relative z-10">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center">
                  <ImageIcon className="w-4 h-4 mr-2 text-purple-400" />
                  Optional profile picture
                </label>
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-full overflow-hidden border border-purple-500/40 flex items-center justify-center bg-[#0A0A0A]/60">
                    {photo ? (
                      <img src={photo} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-gray-500 text-xs">No photo</span>
                    )}
                  </div>
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    onChange={onPhotoChange}
                    className="text-gray-300"
                  />
                </div>
                {photo && (
                  <div className="mt-3 flex items-center gap-3">
                    <input
                      type="range"
                      min="0.8"
                      max="2"
                      step="0.05"
                      value={scale}
                      onChange={(e) => setScale(parseFloat(e.target.value))}
                    />
                    <button
                      type="button"
                      onClick={saveCroppedPhoto}
                      className="px-3 py-2 rounded-xl bg-purple-600 text-white"
                    >
                      {photoSaved ? "Saved" : "Save Photo"}
                    </button>
                  </div>
                )}
              </div>
              {/* Enhanced Name Input */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center">
                  <User className="w-4 h-4 mr-2 text-purple-400" />
                  Full Name
                </label>
                <div className="relative group">
                  <motion.div whileFocus={{ scale: 1.02 }} className="relative">
                    <input
                      required
                      name="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your full name"
                      className="w-full bg-[#0A0A0A]/60 border border-purple-500/30 rounded-2xl px-6 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-purple-400/70 focus:ring-2 focus:ring-purple-400/30 transition-all duration-500 backdrop-blur-xl group-hover:border-purple-400/50 group-hover:bg-[#0A0A0A]/70"
                    />

                    {/* Floating Border Effect on Focus */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileFocus={{ opacity: 1 }}
                      className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-2xl blur-sm pointer-events-none"
                    />

                    {/* Shimmer Effect on Hover */}
                    <motion.div
                      whileHover={{
                        x: ["-100%", "100%"],
                        opacity: [0, 0.3, 0],
                      }}
                      transition={{ duration: 1.5 }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 pointer-events-none"
                    />
                  </motion.div>
                </div>
              </motion.div>

              {/* Enhanced Email Input */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center">
                  <Mail className="w-4 h-4 mr-2 text-purple-400" />
                  Email
                </label>
                <div className="relative group">
                  <motion.div whileFocus={{ scale: 1.02 }} className="relative">
                    <input
                      required
                      name="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full bg-[#0A0A0A]/60 border border-purple-500/30 rounded-2xl px-6 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-purple-400/70 focus:ring-2 focus:ring-purple-400/30 transition-all duration-500 backdrop-blur-xl group-hover:border-purple-400/50 group-hover:bg-[#0A0A0A]/70"
                    />

                    {/* Floating Border Effect on Focus */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileFocus={{ opacity: 1 }}
                      className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-2xl blur-sm pointer-events-none"
                    />

                    {/* Shimmer Effect on Hover */}
                    <motion.div
                      whileHover={{
                        x: ["-100%", "100%"],
                        opacity: [0, 0.3, 0],
                      }}
                      transition={{ duration: 1.5 }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 pointer-events-none"
                    />
                  </motion.div>
                </div>
              </motion.div>

              {/* Enhanced Password Input */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center">
                  <Lock className="w-4 h-4 mr-2 text-purple-400" />
                  Password
                </label>
                <div className="relative group">
                  <motion.div whileFocus={{ scale: 1.02 }} className="relative">
                    <input
                      required
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-[#0A0A0A]/60 border border-purple-500/30 rounded-2xl px-6 py-4 pr-12 text-white placeholder-gray-500 focus:outline-none focus:border-purple-400/70 focus:ring-2 focus:ring-purple-400/30 transition-all duration-500 backdrop-blur-xl group-hover:border-purple-400/50 group-hover:bg-[#0A0A0A]/70"
                      placeholder="Create a strong password"
                    />

                    {/* Show/Hide Password Button */}
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-purple-400 transition-colors duration-300"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </motion.button>

                    {/* Floating Border Effect on Focus */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileFocus={{ opacity: 1 }}
                      className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-2xl blur-sm pointer-events-none"
                    />

                    {/* Shimmer Effect on Hover */}
                    <motion.div
                      whileHover={{
                        x: ["-100%", "100%"],
                        opacity: [0, 0.3, 0],
                      }}
                      transition={{ duration: 1.5 }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 pointer-events-none"
                    />
                  </motion.div>
                </div>
              </motion.div>

              {/* Enhanced Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -10 }}
                  className="relative"
                >
                  <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-4 text-sm text-red-300 backdrop-blur-xl">
                    <motion.div
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute inset-0 bg-red-500/5 rounded-2xl"
                    />
                    <span className="relative z-10">{error}</span>
                  </div>
                </motion.div>
              )}

              {/* Enhanced Submit Button */}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                whileHover={{
                  scale: 1.02,
                  y: -2,
                  boxShadow:
                    "0 0 50px rgba(168, 85, 247, 0.5), 0 0 100px rgba(168, 85, 247, 0.2)",
                }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-500 transform disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden shadow-xl"
              >
                <motion.div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-400 opacity-0 hover:opacity-100 transition-opacity duration-500" />

                {/* Button Shimmer Effect */}
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

                <span className="relative z-10 flex items-center justify-center">
                  {loading ? (
                    <div className="flex items-center">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="w-5 h-5 border-t-2 border-white rounded-full mr-2"
                      />
                      Creating Account...
                    </div>
                  ) : (
                    "Create Account"
                  )}
                </span>
              </motion.button>

              {/* Enhanced Link */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="text-center text-sm text-gray-400"
              >
                Already have an account?{" "}
                <motion.a
                  href={`/account/signin${
                    typeof window !== "undefined" ? window.location.search : ""
                  }`}
                  whileHover={{ scale: 1.05 }}
                  className="text-transparent bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text hover:from-purple-300 hover:to-cyan-300 transition-all duration-300 font-semibold"
                >
                  Sign in
                </motion.a>
              </motion.p>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default MainComponent;
