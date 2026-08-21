import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

/**
 * POST /api/revalidate
 *
 * Called by Prism's background sync worker after a successful Supabase push.
 * Instantly clears the Next.js ISR cache so the live site shows new products
 * within ~2 seconds instead of waiting for the 15-minute stale window.
 *
 * Auth: x-revalidation-secret header must match REVALIDATION_SECRET env var.
 */
export async function POST(request: NextRequest) {
  const secret = request.headers.get("x-revalidation-secret");

  if (!process.env.REVALIDATION_SECRET) {
    return NextResponse.json(
      { message: "REVALIDATION_SECRET is not configured on this server." },
      { status: 500 }
    );
  }

  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json(
      { message: "Invalid or missing x-revalidation-secret header." },
      { status: 401 }
    );
  }

  // Clear the Next.js ISR cache for all pages that use product data
  revalidatePath("/", "layout");

  return NextResponse.json({
    revalidated: true,
    now: Date.now(),
  });
}
