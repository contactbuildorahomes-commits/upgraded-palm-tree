import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: import.meta.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: import.meta.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const isClient = typeof window !== "undefined";
const app = isClient ? initializeApp(firebaseConfig) : undefined;
const auth = isClient && app ? getAuth(app) : { currentUser: null };
if (isClient && app) {
  setPersistence(auth, browserLocalPersistence);
}
const db = isClient && app ? getFirestore(app) : undefined;
const storage = isClient && app ? getStorage(app) : undefined;

export { app, auth, db, storage };