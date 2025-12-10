const images = globalThis.__profileImages ?? (globalThis.__profileImages = new Map());

export async function GET(request) {
  const url = new URL(request.url);
  const id = url.searchParams.get("id") ?? "default";
  const data = images.get(id);
  if (!data) return Response.json({ error: "Not found" }, { status: 404 });
  return Response.json({ imageDataURL: data });
}