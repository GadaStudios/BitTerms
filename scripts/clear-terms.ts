import { client, writeClient } from "@/sanity/lib/client";

async function main() {
  try {
    // Fetch all term IDs
    const terms = await client.fetch<string[]>(`*[_type == "term"]._id`);

    if (!terms.length) {
      console.log("No terms found.");
      return;
    }

    console.log(`Found ${terms.length} terms. Deleting...`);

    let tx = writeClient.transaction();
    for (const id of terms) {
      tx = tx.delete(id);
    }

    const res = await tx.commit();
    console.log(`Deleted ${res.results?.length ?? 0} term documents.`);
  } catch (err) {
    console.error("Error clearing terms:", err);
    process.exit(1);
  }
}

main();
