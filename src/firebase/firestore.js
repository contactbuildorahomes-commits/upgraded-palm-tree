import { db } from "@/firebase/config";
import { doc, getDoc, setDoc, serverTimestamp, collection, addDoc, query, where, getDocs, orderBy, limit } from "firebase/firestore";

async function getUserProfile(uid) {
  const ref = doc(db, "users", uid);
  const snap = await getDoc(ref);
  return snap.exists() ? snap.data() : null;
}

async function saveFeedback({ userID, message, rating }) {
  if (!userID || typeof message !== "string" || message.trim().length === 0) {
    return { ok: false, error: "Invalid feedback" };
  }
  const col = collection(db, "feedback");
  await addDoc(col, { userID, message: message.trim(), timestamp: serverTimestamp(), ...(typeof rating === "number" ? { rating } : {}) });
  return { ok: true };
}

async function logUsage({ userID, toolUsed, inputLength }) {
  if (!userID || typeof toolUsed !== "string") {
    return { ok: false, error: "Invalid usage" };
  }
  const col = collection(db, "usageLogs");
  await addDoc(col, { userID, toolUsed, inputLength: inputLength ?? 0, timestamp: serverTimestamp() });
  return { ok: true };
}

async function getRecentActivity({ userID, count = 20 }) {
  const col = collection(db, "usageLogs");
  const q = query(col, where("userID", "==", userID), orderBy("timestamp", "desc"), limit(count));
  const snaps = await getDocs(q);
  return snaps.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export { getUserProfile, saveFeedback, logUsage, getRecentActivity };