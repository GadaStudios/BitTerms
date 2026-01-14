import { NextResponse } from "next/server";

// This route no longer serves GET requests for fetching data from Sanity.
// Please use the Sanity client directly in your components or helper modules (e.g. `sanity/lib/queries.ts`).
export async function GET() {
  return NextResponse.json(
    { error: "Deprecated: use Sanity client directly (sanity/lib/queries.ts)" },
    { status: 410 },
  );
}
