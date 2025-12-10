const store = globalThis.__activityStore ?? (globalThis.__activityStore = []);

export async function GET() {
  const counts = store.reduce((acc, e) => {
    acc[e.tool] = (acc[e.tool] ?? 0) + 1;
    return acc;
  }, {});
  return Response.json({ counts });
}