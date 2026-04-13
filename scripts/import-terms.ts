import { createClient } from "@sanity/client";
import fs from "node:fs";
import readline from "node:readline";
import { slugify } from "../lib/utils"; // adjust path if needed

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  token: process.env.SANITY_WRITE_TOKEN,
  apiVersion: "2025-02-19",
  useCdn: false,
});

async function importTerms(filePath: string, language: string) {
  const rl = readline.createInterface({
    input: fs.createReadStream(filePath),
    crlfDelay: Infinity,
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mutations: any[] = [];

  for await (const line of rl) {
    if (!line.trim()) continue;

    const doc = JSON.parse(line);

    // Ensure the document has the correct language field
    doc.language = language;

    // Generate a new, language-specific _id using the slug
    const slug = doc.slug?.current || slugify(doc.name);
    const newId = `term-${slug}-${language}`;

    // Preserve illustration/audio references (they are already asset refs)
    // Remove fields that should not be set during import
    delete doc._createdAt;
    delete doc._updatedAt;
    delete doc._rev;
    delete doc._system;

    // Override the _id
    doc._id = newId;

    mutations.push({
      createIfNotExists: doc, // won't overwrite existing documents
    });
  }

  // Batch commit
  while (mutations.length) {
    const chunk = mutations.splice(0, 50);
    await client.mutate(chunk);
    console.log(`Imported ${chunk.length} terms`);
  }

  console.log(`✅ Done importing ${language} terms from ${filePath}`);
}

// Usage:
const args = process.argv.slice(2);
if (args.length < 2) {
  console.error(
    "Usage: bun run import-terms.ts ndjson/<file.ndjson> <language>",
  );
  process.exit(1);
}
const [filePath, language] = args;

importTerms(filePath, language).catch(console.error);
