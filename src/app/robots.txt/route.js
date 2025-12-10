export async function GET(request) {
  const origin = new URL(request.url).origin;
  const body = [
    "User-agent: *",
    "Allow: /",
    `Sitemap: ${origin}/sitemap.xml`,
  ].join("\n");
  return new Response(body, {
    headers: { "Content-Type": "text/plain" },
  });
}