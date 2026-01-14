import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { slugify } from "@/lib/utils";
import { TermDataProps } from "@/components/provider";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const audioDir = path.join(process.cwd(), "public/audios");
const termsPath = path.resolve(__dirname, "../data/terms.json");

// simple distance for typo detection
const distance = (a: string, b: string) => {
  if (Math.abs(a.length - b.length) > 2) return 99;
  let mismatches = 0;
  const len = Math.min(a.length, b.length);
  for (let i = 0; i < len; i++) {
    if (a[i] !== b[i]) mismatches++;
    if (mismatches > 2) return 99;
  }
  return mismatches + Math.abs(a.length - b.length);
};

const splitName = (raw: string) => {
  const match = raw.match(/^(.*?)\s*\((.*?)\)$/);
  if (!match) return { base: raw, extra: "" };
  return { base: match[1], extra: match[2] };
};

const syncAudioWithTerms = () => {
  console.log(`Reading audio directory: ${audioDir}\n`);

  const files = fs.readdirSync(audioDir);
  const terms = JSON.parse(fs.readFileSync(termsPath, "utf8"));

  const audioMap: Record<string, string> = {};

  // Normal rename step
  for (const file of files) {
    if (!file.endsWith(".m4a")) continue;

    const base = path.parse(file).name;
    const slug = slugify(base);
    const newName = `${slug}.m4a`;

    if (file !== newName) {
      console.log(`Renamed: ${file} -> ${newName}`);
      fs.renameSync(path.join(audioDir, file), path.join(audioDir, newName));
    }

    audioMap[slug] = `/audios/${newName}`;
  }

  const updatedTerms = terms.map((term: TermDataProps) => {
    const { base, extra } = splitName(term.name as string);

    const baseSlug = slugify(base);
    const extraSlug = slugify(extra);
    const fullSlug = extra ? `${baseSlug}-${extraSlug}` : baseSlug;

    // 1. exact fullSlug match
    if (audioMap[fullSlug]) {
      console.log(`Matched: ${term.name} -> ${audioMap[fullSlug]}`);
      return { ...term, audio: audioMap[fullSlug] };
    }

    // 2. baseSlug match
    if (audioMap[baseSlug]) {
      console.log(`Matched: ${term.name} -> ${audioMap[baseSlug]}`);
      return { ...term, audio: audioMap[baseSlug] };
    }

    // 3. fuzzy: slug startsWith baseSlug
    const fuzzyKey = Object.keys(audioMap).find((k) => k.startsWith(baseSlug));

    if (fuzzyKey) {
      console.log(`Matched: ${term.name} -> ${audioMap[fuzzyKey]}`);
      return { ...term, audio: audioMap[fuzzyKey] };
    }

    // 4. typo correction: distance <= 2
    const correctedKey = Object.keys(audioMap).find(
      (k) => distance(k, baseSlug) <= 2,
    );

    if (correctedKey) {
      console.log(
        `Matched (corrected): ${term.name} -> ${audioMap[correctedKey]}`,
      );
      return { ...term, audio: audioMap[correctedKey] };
    }

    console.log(`No match: ${term.name}`);
    return term;
  });

  fs.writeFileSync(termsPath, JSON.stringify(updatedTerms, null, 2));
  console.log("\nDone updating terms.json\n");
};

syncAudioWithTerms();
