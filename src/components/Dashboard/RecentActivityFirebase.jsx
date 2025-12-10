import { useEffect, useState } from "react";
import { auth } from "@/firebase/config";
import { getRecentActivity } from "@/firebase/firestore";

export default function RecentActivityFirebase() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const u = auth.currentUser;
    if (!u?.uid) return;
    setLoading(true);
    setError("");
    getRecentActivity({ userID: u.uid, count: 10 })
      .then(setItems)
      .catch(() => setError("Failed to load activity"))
      .finally(() => setLoading(false));
  }, []);

  if (!auth.currentUser) return null;
  return (
    <div className="mt-4 text-sm text-gray-300">
      <p className="font-semibold">Recent activity</p>
      {loading ? <div>Loading…</div> : error ? <div className="text-red-400">{error}</div> : (
        <ul className="space-y-1">
          {items.map((i) => (
            <li key={i.id}>{i.toolUsed} • {String(i.inputLength ?? 0)} chars</li>
          ))}
        </ul>
      )}
    </div>
  );
}