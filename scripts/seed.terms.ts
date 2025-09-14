import { slugify } from "@/lib/utils";
import { client } from "@/sanity/lib/client";
import { TERM_QUERYResult } from "@/sanity/types";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataPath = path.resolve(__dirname, "../data/terms.json");

// Public folder for local assets
const publicDir = path.resolve(process.cwd(), "public");

async function uploadImageIfExists(urlFromJson: string) {
  if (!urlFromJson || typeof urlFromJson !== "string") return null;
  const localRel = urlFromJson.replace(/^\//, ""); // strip leading slash
  const localPath = path.resolve(publicDir, localRel);
  if (!fs.existsSync(localPath)) {
    console.warn(`Illustration not found: ${localPath} — skipping.`);
    return null;
  }

  const fileBuffer = fs.readFileSync(localPath);
  const asset = await client.assets.upload("image", fileBuffer, {
    filename: path.basename(localPath),
  });

  return {
    _type: "image",
    asset: {
      _type: "reference",
      _ref: asset._id,
    },
  };
}

async function main() {
  const raw = fs.readFileSync(dataPath, "utf8");
  const terms: TERM_QUERYResult = JSON.parse(raw);

  let tx = client.transaction();

  if (!terms.length) {
    console.log("No terms found.");
    return;
  }

  for (const term of terms) {
    const name = term?.name?.trim();

    console.log(`Found ${terms.length} terms. Seeding...`);

    if (!name) {
      console.warn("Skipping term with missing name");
      continue;
    }

    const illustration =
      term.illustration &&
      term.illustration.asset &&
      term.illustration.asset.url
        ? await uploadImageIfExists(term.illustration.asset.url)
        : null;

    const slugCurrent = slugify(name);
    const _id = slugCurrent ? `term-${slugCurrent}` : `term-${Date.now()}`;

    const doc = {
      _id,
      _type: "term",
      name,
      author: term.author ?? "",
      definition: term.definition ?? "",
      technicalDefinition: term.technicalDefinition ?? "",
      audio: term.audio ?? "",
      approved: true,
      illustration: illustration ?? undefined,
    };

    tx = tx.createOrReplace(doc);
  }

  const res = await tx.commit();
  console.log(`Seeded ${res.results?.length ?? 0} term documents.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
