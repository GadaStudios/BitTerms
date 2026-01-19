import { env } from "@/lib/env";

export const siteConfig = {
  default: {
    title: "BitTerms",
    description: "Bitcoin terminologies finally made simple.",
  },
  about: {
    title: "About",
    description:
      "Learn more about our mission, and how we aim to make Bitcoin terminology accessible to everyone.",
  },
  suggest: {
    title: "Suggest a Term",
    description:
      "Submit a Bitcoin term for review and possible inclusion in BitTerms.",
  },
  url: env.siteUrl,
};
