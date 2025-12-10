import { useState } from "react";
import { uploadProfilePhoto } from "@/firebase/storage";

export default function ProfilePhotoUploader({ onUploaded }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleUpload = async () => {
    if (!file) return;
    setError("");
    setLoading(true);
    try {
      const res = await uploadProfilePhoto(file);
      if (!res.ok) {
        setError(res.error || "Upload failed");
        return;
      }
      onUploaded?.(res.url);
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-3">
      <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} aria-label="Choose profile picture" />
      <button onClick={handleUpload} disabled={loading || !file} className="px-3 py-2 rounded-xl bg-purple-600 text-white">
        {loading ? "Uploading..." : "Upload"}
      </button>
      {error && <span className="text-red-400 text-sm">{error}</span>}
    </div>
  );
}