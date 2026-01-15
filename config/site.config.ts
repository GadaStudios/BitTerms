import { env } from "@/lib/env";

export const siteConfig = {
  default: {
    title: "BitTerms",
    description:
      "The open-source project dedicated to demystifying Bitcoin terminology with clear definitions and friendly visuals.",
  },
  about: {
    title: "About",
    description:
      "Learn more about BitTerms, our mission, and how we aim to make Bitcoin terminology accessible to everyone.",
  },
  suggest: {
    title: "Suggest a Term",
    description: "Suggest a new term to be added to the BitTerms database.",
  },
  url: env.siteUrl,
};
