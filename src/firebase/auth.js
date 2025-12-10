import { auth, db } from "@/firebase/config";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail, updateProfile } from "firebase/auth";
import { doc, setDoc, serverTimestamp, getDoc } from "firebase/firestore";

function isValidEmail(email) {
  return typeof email === "string" && /.+@.+\..+/.test(email);
}

async function signup({ name, email, password }) {
  if (!isValidEmail(email) || typeof password !== "string" || password.length < 8 || typeof name !== "string" || name.trim().length < 2) {
    return { ok: false, error: "Invalid input" };
  }
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(cred.user, { displayName: name });
  const ref = doc(db, "users", cred.user.uid);
  const existing = await getDoc(ref);
  if (!existing.exists()) {
    await setDoc(ref, { name, email, photoURL: cred.user.photoURL || null, createdAt: serverTimestamp() }, { merge: true });
  } else {
    await setDoc(ref, { name, email, photoURL: cred.user.photoURL || null }, { merge: true });
  }
  return { ok: true, uid: cred.user.uid };
}

async function login({ email, password }) {
  if (!isValidEmail(email) || typeof password !== "string" || password.length < 8) {
    return { ok: false, error: "Invalid credentials" };
  }
  const cred = await signInWithEmailAndPassword(auth, email, password);
  return { ok: true, uid: cred.user.uid };
}

async function logout() {
  await signOut(auth);
  return { ok: true };
}

async function resetPassword(email) {
  if (!isValidEmail(email)) {
    return { ok: false, error: "Invalid email" };
  }
  await sendPasswordResetEmail(auth, email);
  return { ok: true };
}

export { signup, login, logout, resetPassword };