import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { writeClient } from "@/sanity/lib/client";
import { slugify } from "@/lib/utils";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataPath = path.resolve(__dirname, "../data/terms.json");
const publicDir = path.resolve(process.cwd(), "public");

function formatError(err: unknown) {
  if (err instanceof Error) return err.message;
  try {
    return JSON.stringify(err);
  } catch {
    return String(err);
  }
}

async function uploadFileIfExists(relPath: string, type: "image" | "file") {
  if (!relPath || typeof relPath !== "string") return null;

  const clean = relPath.replace(/^\//, "");
  const full = path.resolve(publicDir, clean);

  if (!fs.existsSync(full)) {
    console.warn(`\nMissing asset: ${full}\n`);
    return null;
  }

  const buffer = fs.readFileSync(full);

  const asset = await writeClient.assets.upload(type, buffer, {
    filename: path.basename(full),
  });

  return {
    _type: "file",
    asset: {
      _type: "reference",
      _ref: asset._id,
    },
  };
}

async function uploadImage(relPath: string) {
  if (!relPath) return null;
  const clean = relPath.replace(/^\//, "");
  const full = path.resolve(publicDir, clean);

  if (!fs.existsSync(full)) {
    console.warn(`\nMissing illustration: ${full}\n`);
    return null;
  }

  const buffer = fs.readFileSync(full);

  const asset = await writeClient.assets.upload("image", buffer, {
    filename: path.basename(full),
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
  const terms = JSON.parse(raw);

  console.log(`\nFound ${terms.length} terms\n`);

  for (const term of terms) {
    try {
      const name = term.name?.trim();
      if (!name) {
        console.log("\nSkipping unnamed term\n");
        continue;
      }

      console.log(`Processing: ${name}`);

      const slug = slugify(name) || `term-${Date.now()}`;
      const _id = `term-${slug}`;

      const illustration =
        typeof term.illustration === "string"
          ? await uploadImage(term.illustration)
          : null;

      const audio =
        typeof term.audio === "string"
          ? await uploadFileIfExists(term.audio, "file")
          : null;

      const doc = {
        _id,
        _type: "term",
        name,
        definition: term.definition || "",
        technicalDefinition: term.technicalDefinition || "",
        audio: audio || undefined,
        illustration: illustration || undefined,
        approved: true,
      };

      const created = await writeClient.createOrReplace(doc);
      console.log(`\nSeeded: ${created._id}\n`);
    } catch (err) {
      console.error(`\nFailed: ${formatError(err)}`);
    }
  }

  console.log("\nAll done.");
}

// Global safety nets
process.on("unhandledRejection", (reason) => {
  console.error("Unhandled rejection:", formatError(reason));
});
process.on("uncaughtException", (err) => {
  console.error("Uncaught exception:", formatError(err));
});

main().catch((err) => {
  console.error("Fatal error:", formatError(err));
  process.exit(1);
});
