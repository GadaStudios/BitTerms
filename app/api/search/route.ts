import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";

export async function POST(req: Request) {
  try {
    const { term } = await req.json();
    if (!term) {
      return NextResponse.json({ error: "Missing term" }, { status: 400 });
    }

    // Normalize search
    const normalized = term.trim().toLowerCase();

    // Try to find existing searchTerm doc
    const existing = await client.fetch(
      `*[_type == "searchTerm" && lower(term) == $term][0]{_id, searchCount}`,
      { term: normalized },
    );

    if (existing) {
      // Increment count
      await client
        .patch(existing._id)
        .inc({ searchCount: 1 })
        .set({ lastSearched: new Date().toISOString() })
        .commit();
    } else {
      // Create new doc
      await client.create({
        _type: "searchTerm",
        term: normalized,
        searchCount: 1,
        lastSearched: new Date().toISOString(),
      });
    }

    // Additionally, increment searchPopularity on the matching term document
    const termDoc = await client.fetch(
      `*[_type == "term" && lower(name) == $term][0]{ _id }`,
      { term: normalized },
    );

    if (termDoc?._id) {
      await client
        .patch(termDoc._id)
        .setIfMissing({ searchPopularity: 0 })
        .inc({ searchPopularity: 1 })
        .commit();
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to record search" },
      { status: 500 },
    );
  }
}
