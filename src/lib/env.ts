import { assertValue } from "./utils";

export const SITE_URL = assertValue(
  process.env.NEXT_PUBLIC_SITE_URL,
  "Missing NEXT_PUBLIC_SITE_URL"
);
