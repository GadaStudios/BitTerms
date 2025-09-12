import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "@/lib/env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
  stega: { studioUrl: "/studio" },
  token: process.env.SANITY_WRITE_TOKEN,
});
