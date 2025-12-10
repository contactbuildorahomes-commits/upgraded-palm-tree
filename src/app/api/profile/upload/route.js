const images = globalThis.__profileImages ?? (globalThis.__profileImages = new Map());

export async function POST(request) {
  try {
    const { imageDataURL, userId } = await request.json();
    if (!imageDataURL || typeof imageDataURL !== "string") {
      return Response.json({ error: "Invalid image" }, { status: 400 });
    }
    const id = userId ?? "default";
    images.set(id, imageDataURL);
    return Response.json({ success: true, url: `/api/profile/image?id=${encodeURIComponent(id)}` });
  } catch {
    return Response.json({ error: "Upload failed" }, { status: 500 });
  }
}