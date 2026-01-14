import { assertValue } from "./utils";

const siteUrl = assertValue(
  process.env.NEXT_PUBLIC_SITE_URL,
  "Missing environment variable: NEXT_PUBLIC_SITE_URL"
);

const githubUrl = assertValue(
  process.env.NEXT_PUBLIC_GITHUB_URL,
  "Missing environment variable: NEXT_PUBLIC_GITHUB_URL"
);

const contactEmail = assertValue(
  process.env.NEXT_PUBLIC_CONTACT_EMAIL,
  "Missing environment variable: NEXT_PUBLIC_CONTACT_EMAIL"
);

const linkedinUrl = assertValue(
  process.env.NEXT_PUBLIC_LINKEDIN_URL,
  "Missing environment variable: NEXT_PUBLIC_LINKEDIN_URL"
);

const twitterUrl = assertValue(
  process.env.NEXT_PUBLIC_TWITTER_URL,
  "Missing environment variable: NEXT_PUBLIC_TWITTER_URL"
)


const env = {
  siteUrl,
  githubUrl,
  contactEmail,
  linkedinUrl,
  twitterUrl
};

export { env };
