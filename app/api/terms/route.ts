import { NextRequest, NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const offset = Math.max(0, Number(searchParams.get("offset") || "0"));
    const limit = Math.min(Math.max(1, Number(searchParams.get("limit") || "30")), 100);
    const end = offset + limit;

    // Use a read-only client (CDN) for published content
    const readClient = client.withConfig({ useCdn: true, token: undefined });

    const query = `
      *[_type == "term" && approved == true]
        | order(name asc, _id asc)
        [$offset...$end]{
          _id,
          name,
          definition,
          technicalDefinition,
          illustration{
            _key,
            asset->{
              _id,
              url
            }
          },
          author,
          audio
        }
    `;

    const items = await readClient.fetch(query, { offset, end });
    const nextOffset = items.length < limit ? null : end;

    return NextResponse.json({ items, nextOffset });
  } catch (error) {
    console.error("/api/terms error", error);
    return NextResponse.json({ error: "Failed to fetch terms" }, { status: 500 });
  }
}