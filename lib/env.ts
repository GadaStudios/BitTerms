import { assertValue } from "./utils";

const siteUrl = assertValue(
  process.env.NEXT_PUBLIC_SITE_URL,
  "Missing environment variable: NEXT_PUBLIC_SITE_URL"
);

const githubUrl = assertValue(
  process.env.NEXT_PUBLIC_GITHUB_URL,
  "Missing environment variable: NEXT_PUBLIC_GITHUB_URL"
);


const env = {
  siteUrl,
  githubUrl,
};

export { env };
