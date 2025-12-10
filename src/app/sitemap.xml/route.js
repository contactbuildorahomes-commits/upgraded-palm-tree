const paths = [
  "/",
  "/welcome",
  "/features",
  "/dashboard",
  "/account/firebase-signin",
  "/account/firebase-signup",
  "/summarizer",
  "/rewriter",
  "/notes",
  "/eli5",
  "/report",
];

export async function GET(request) {
  const origin = new URL(request.url).origin;
  const urls = paths
    .map((p) => `<url><loc>${origin}${p}</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>`) 
    .join("");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`;
  return new Response(xml, {
    headers: { "Content-Type": "application/xml" },
  });
}