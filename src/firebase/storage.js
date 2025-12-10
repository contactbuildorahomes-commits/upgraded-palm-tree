import { storage, db } from "@/firebase/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { auth } from "@/firebase/config";

async function uploadProfilePhoto(file) {
  if (!(file instanceof File)) {
    return { ok: false, error: "Invalid file" };
  }
  const user = auth.currentUser;
  if (!user) {
    return { ok: false, error: "Not authenticated" };
  }
  if (typeof window === "undefined") {
    return { ok: false, error: "Not in browser" };
  }
  const { default: imageCompression } = await import("browser-image-compression");
  const compressed = await imageCompression(file, { maxSizeMB: 0.5, maxWidthOrHeight: 1024, useWebWorker: true });
  const path = `profilePhotos/${user.uid}.jpg`;
  const r = ref(storage, path);
  await uploadBytes(r, compressed, { contentType: compressed.type || "image/jpeg" });
  const url = await getDownloadURL(r);
  const uref = doc(db, "users", user.uid);
  await setDoc(uref, { photoURL: url }, { merge: true });
  return { ok: true, url };
}

export { uploadProfilePhoto };