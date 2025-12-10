const store = globalThis.__activityStore ?? (globalThis.__activityStore = []);

export async function POST(request) {
  try {
    const body = await request.json();
    const entry = {
      tool: body.tool,
      inputLength: body.inputLength ?? 0,
      outputLength: body.outputLength ?? 0,
      ts: Date.now(),
    };
    store.push(entry);
    return Response.json({ success: true });
  } catch {
    return Response.json({ error: "Failed to save activity" }, { status: 500 });
  }
}

export async function GET() {
  const recent = store.slice(-20).reverse();
  return Response.json({ recent });
}