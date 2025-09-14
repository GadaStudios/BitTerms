import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const limitParam = Number(searchParams.get("limit") || "3");
    const limit = Math.min(Math.max(1, limitParam), 20);

    // Use a read-only client (CDN) for published content
    const readClient = client.withConfig({ useCdn: true, token: undefined });

    const query = `
      *[_type == "term" && approved == true]
        | order(coalesce(searchPopularity, 0) desc, name asc)[0...$limit]{
          _id,
          name,
          "searchPopularity": coalesce(searchPopularity, 0)
        }
    `;

    const items = await readClient.fetch(query, { limit });

    return NextResponse.json({ items });
  } catch (error) {
    console.error("/api/terms/top error", error);
    return NextResponse.json(
      { error: "Failed to fetch top terms" },
      { status: 500 },
    );
  }
}
