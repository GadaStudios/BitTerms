import { SITE_URL } from "@/lib/env";

export const siteConfig = {
  default: {
    title: "BitTerms",
    description:
      "BitTerms help you ease into Bitcoin with less jargon and no confusion. It meets wherever you are, helping you make sense of Bitcoin, one clear definition at a time, with friendly visuals so you understand and remember.",
  },
  terms: {
    title: "Terms",
    description:
      "Find or search for terms you want to know about and see a simplified definition with accompanied illustration",
  },
  suggest: {
    title: "Suggest a Term",
    description:
      "Confusing jargon? Not here. From the market woman to the tech bro, BitTerms helps everyone make sense of Bitcoin, one simple definition at a time.",
  },
  url: SITE_URL as string,
};
