import { useState } from "react";
import { resetPassword } from "@/firebase/auth";

export const meta = () => [
  { title: "Briefly — Password Reset" },
  { name: "description", content: "Reset your password" },
];

function MainComponent() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleReset = async () => {
    setError("");
    setSuccess(false);
    if (!/.+@.+\..+/.test(email)) { setError("Invalid email"); return; }
    setLoading(true);
    try {
      const res = await resetPassword(email.trim());
      if (!res.ok) { setError(res.error || "Reset failed"); return; }
      setSuccess(true);
    } catch { setError("Network error"); }
    finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#000000] via-[#0A0A0A] to-[#1A0B2E] p-6">
      <div className="max-w-md mx-auto space-y-4">
        <h1 className="text-3xl font-black text-transparent bg-gradient-to-r from-purple-400 via-pink-300 to-cyan-300 bg-clip-text">Reset password</h1>
        <input value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email" type="email" className="w-full bg-[#0A0A0A]/60 border border-purple-500/30 rounded-2xl p-4 text-white" />
        <button onClick={handleReset} disabled={loading} className="px-4 py-2 rounded-xl bg-purple-600 text-white">{loading?"Sending…":"Send reset"}</button>
        {error && <div className="text-red-400 text-sm">{error}</div>}
        {success && <div className="text-green-400 text-sm">Email sent</div>}
      </div>
    </div>
  );
}

export default MainComponent;