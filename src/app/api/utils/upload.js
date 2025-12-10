async function upload({ url, buffer, base64 }) {
  if (buffer instanceof Uint8Array) {
    return { url: url || "", mimeType: null };
  }
  if (typeof base64 === "string" && base64.startsWith("data:")) {
    return { url: url || "", mimeType: null };
  }
  return { url: url || "", mimeType: null };
}
export { upload };
export default upload;