export async function GET() {
  const body = "google-site-verification: google377430946836ecf2.html";
  return new Response(body, {
    headers: { "Content-Type": "text/html" },
  });
}