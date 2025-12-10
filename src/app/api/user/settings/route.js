const settings = globalThis.__userSettings ?? (globalThis.__userSettings = {});

export async function PATCH(request) {
  try {
    const body = await request.json();
    settings.default = { ...(settings.default ?? {}), ...body };
    return Response.json({ success: true, settings: settings.default });
  } catch {
    return Response.json({ error: "Failed to update settings" }, { status: 500 });
  }
}

export async function GET() {
  return Response.json({ settings: settings.default ?? {} });
}