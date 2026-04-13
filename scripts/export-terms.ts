import { createClient } from "@sanity/client";
import fs from "node:fs";
import type { Term } from "../sanity.types"; // adjust path

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  token: process.env.SANITY_WRITE_TOKEN,
  apiVersion: "2025-02-19",
  useCdn: false,
});

// GROQ (typed)
const query = `*[_type == "term"]`;

async function exportTerms() {
  const terms = await client.fetch<Term[]>(query);

  const stream = fs.createWriteStream("ndjson/terms_en.ndjson");

  for (const term of terms) {
    // Ensure valid NDJSON document
    const doc: Term = {
      ...term,
      language: term.language ?? "en",
      // normalize slug (important for import)
      slug: term.slug?.current
        ? { _type: "slug", current: term.slug.current }
        : undefined,
    };

    stream.write(JSON.stringify(doc) + "\n");
  }

  stream.end();

  console.log(`Exported ${terms.length} terms`);
}

exportTerms().catch(console.error);
