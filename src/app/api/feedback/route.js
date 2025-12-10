import sql from "@/app/api/utils/sql";
import { auth } from "@/auth";

export async function POST(request) {
  try {
    const session = await auth();

    const body = await request.json();
    const { rating, comment, user_name } = body;

    // Validate rating
    if (!rating || rating < 1 || rating > 5) {
      return Response.json(
        { error: "Rating must be between 1 and 5" },
        { status: 400 },
      );
    }

    // Insert feedback into database
    const result = await sql`
      INSERT INTO feedback (user_id, user_name, rating, comment)
      VALUES (${session?.user?.id || null}, ${user_name || "Anonymous"}, ${rating}, ${comment || ""})
      RETURNING id, rating, comment, created_at
    `;

    return Response.json({
      success: true,
      feedback: result[0],
    });
  } catch (error) {
    console.error("Error submitting feedback:", error);
    return Response.json(
      { error: "Failed to submit feedback" },
      { status: 500 },
    );
  }
}

export async function GET(request) {
  try {
    // Only allow authenticated users to view feedback (optional)
    const session = await auth();
    if (!session?.user?.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get all feedback (you might want to limit this to admins only)
    const feedback = await sql`
      SELECT id, user_name, rating, comment, created_at
      FROM feedback
      ORDER BY created_at DESC
    `;

    return Response.json({
      success: true,
      feedback,
    });
  } catch (error) {
    console.error("Error fetching feedback:", error);
    return Response.json(
      { error: "Failed to fetch feedback" },
      { status: 500 },
    );
  }
}
