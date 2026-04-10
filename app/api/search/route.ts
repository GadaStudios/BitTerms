import { NextResponse } from "next/server";
import { client, writeClient } from "@/sanity/lib/client";

export async function POST(req: Request) {
  try {
    const { term, slug } = await req.json();
    if (!term) {
      return NextResponse.json({ error: "Missing term" }, { status: 400 });
    }

    // Normalize search
    const normalized = term.trim().toLowerCase();

    // Try to find existing searchTerm doc
    const existing = await client.fetch(
      `*[_type == "searchTerm" && (lower(term) == $term || (defined(slug) && slug == $slug))][0]{_id, searchCount}`,
      { term: normalized, slug: slug || "" },
    );

    if (existing) {
      // Increment count using writeClient
      await writeClient
        .patch(existing._id)
        .inc({ searchCount: 1 })
        .set({ lastSearched: new Date().toISOString() })
        .commit();
    } else {
      // Create new doc using writeClient
      await writeClient.create({
        _type: "searchTerm",
        term: normalized,
        slug: slug,
        searchCount: 1,
        lastSearched: new Date().toISOString(),
      });
    }

    // Additionally, increment searchPopularity on the matching term document using writeClient
    const termDoc = await client.fetch(
      `*[_type == "term" && (lower(name) == $term || (defined(slug.current) && slug.current == $slug))][0]{ _id }`,
      { term: normalized, slug: slug || "" },
    );

    if (termDoc?._id) {
      await writeClient
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
