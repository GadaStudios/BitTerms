import { NextResponse } from "next/server";

// Deprecated: use Sanity client directly via `sanity/lib/queries.ts` (QUERY_TOP_TERMS)
export async function GET() {
  return NextResponse.json(
    { error: "Deprecated: use Sanity client directly (sanity/lib/queries.ts)" },
    { status: 410 },
  );
}
