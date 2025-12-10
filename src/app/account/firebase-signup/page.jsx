import { useState } from "react";
import { motion } from "motion/react";
import { signup } from "@/firebase/auth";
import ProfilePhotoUploader from "@/components/Dashboard/ProfilePhotoUploader";

export const meta = () => [
  { title: "Briefly — Firebase Signup" },
  { name: "description", content: "Create your account" },
];

function MainComponent() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    setError("");
    setSuccess(false);
    if (name.trim().length < 2) { setError("Invalid name"); return; }
    if (!/.+@.+\..+/.test(email)) { setError("Invalid email"); return; }
    if (password.length < 8) { setError("Password too short"); return; }
    setLoading(true);
    try {
      const res = await signup({ name: name.trim(), email: email.trim(), password });
      if (!res.ok) { setError(res.error || "Signup failed"); return; }
      setSuccess(true);
    } catch { setError("Network error"); }
    finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#000000] via-[#0A0A0A] to-[#1A0B2E] p-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-md mx-auto space-y-4">
        <h1 className="text-3xl font-black text-transparent bg-gradient-to-r from-purple-400 via-pink-300 to-cyan-300 bg-clip-text">Signup</h1>
        <input value={name} onChange={(e)=>setName(e.target.value)} placeholder="Name" aria-label="Name" className="w-full bg-[#0A0A0A]/60 border border-purple-500/30 rounded-2xl p-4 text-white" />
        <input value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email" type="email" aria-label="Email" className="w-full bg-[#0A0A0A]/60 border border-purple-500/30 rounded-2xl p-4 text-white" />
        <input value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password" type="password" aria-label="Password" className="w-full bg-[#0A0A0A]/60 border border-purple-500/30 rounded-2xl p-4 text-white" />
        <div className="pt-2">
          <p className="text-sm text-gray-400 mb-2">Optional: Upload profile picture</p>
          <ProfilePhotoUploader onUploaded={() => {}} />
        </div>
        <motion.button whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }} onClick={handleSubmit} disabled={loading} className="px-4 py-2 rounded-xl bg-purple-600 text-white">{loading?"Creating…":"Create account"}</motion.button>
        {error && <div className="text-red-400 text-sm">{error}</div>}
        {success && <div className="text-green-400 text-sm">Account created</div>}
      </motion.div>
    </div>
  );
}

export default MainComponent;