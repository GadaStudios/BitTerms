import { FaGithub } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa6";
import { MdOutlineEmail } from "react-icons/md";

import { env } from "./env";

const FOOTER_SOCIALS = [
  {
    name: "Email",
    icon: MdOutlineEmail,
  },
  {
    name: "GitHub",
    icon: FaGithub,
    href: env.githubUrl,
  },
  {
    name: "X",
    icon: FaXTwitter,
  },
  {
    name: "LinkedIn",
    icon: FaLinkedinIn,
  },
];

const ABC_FILTERS = [
  "all",
  ...Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i)),
  "symbol",
];

const INTRO_DATA = [
  {
    title: "CoinJoin",
    description:
      "CoinJoin mixes your Bitcoin with others in one transaction to make it harder to trace, for more privacy.",
    illustration: "coinjoin",
    bgColor: "#F9FDE5",
    borderColor: "#D6FF0066",
    rotate: 2.83,
  },
  {
    title: "Hash",
    description:
      "A hash is a shuffled digital fingerprint used to secure Bitcoin data.",
    illustration: "hash",
    bgColor: "#FFF8F0",
    borderColor: "#F7931B66",
    rotate: -3.33,
  },
  {
    title: "Node",
    description:
      "A node is a computer that helps run, support, and share information on the Bitcoin network.",
    illustration: "node",
    bgColor: "#EEF7FF",
    borderColor: "#3A9CFF66",
    rotate: 0.6,
  },
];

const SUPPORT_DATA = [
  {
    title: "Terms Simplification",
    description:
      "We turn complex Bitcoin lingo into plain, everyday language. If you can explain it to a friend over coffee, to a 9 year old, or to a grandpa,  you’ll find it here.",
    icon: "✏️",
  },
  {
    title: "Illustrations",
    description:
      "We pair clear definitions with simple illustrations to make learning intuitive. Because sometimes, a sketch does what a paragraph can’t; it bridges the gap between confusion and clarity.",
    icon: "🎨",
  },
  {
    title: "Open Source",
    description:
      "Add your own plain-language definitions, suggest edits, share feedback, or upload visuals. Every contribution makes Bitcoin clearer for someone else. Bit by bit, together, we build understanding.",
    icon: "🌐",
  },
];

const PROCESS_DATA = [
  {
    title: "Fork and Suggest",
    description:
      "Start by forking the BitTerms repository on GitHub. You can suggest edits, illustrations, or new terms via pull requests.",
  },
  {
    title: "Use the Contribution Template",
    description:
      "Follow our structured template when submitting new terms or edits, it helps us review faster.",
  },
  {
    title: "Be Respectful and Collaborative",
    description:
      "BitTerms is a team effort. Share feedback kindly, stay open to suggestions, and respect other contributors.",
  },
  {
    title: "Check the Issues Tab",
    description:
      "Look out for open tasks, terms needing illustrations, or definitions that need simplification, make a suggestion where you feel most confident.",
  },
];

const GUIDELINE_DATA = [
  {
    title: "Terms Simplification Guide",
    guides: [
      {
        label: "Write for Everyone",
        description:
          "Use everyday, beginner-friendly language. Avoid jargon or overly technical terms unless absolutely necessary, and explain them if used.",
      },
      {
        label: "Keep it Short",
        description:
          "Aim for 1–2 clear sentences per simplified definition. Imagine you’re explaining it to a curious 12-year-old.",
      },
      {
        label: "No Dashes or Complex Formatting",
        description:
          "Avoid using long dashes or overly structured formats, keep it conversational and human.",
      },
      {
        label: "Stay True to its Meaning",
        description:
          "While simplifying, don’t distort the original meaning. Cross-check with the standard definition to ensure accuracy.",
      },
    ],
  },
  {
    title: "Illustration Guide",
    guides: [
      {
        label: "Use the Stickman Style",
        description:
          "All illustrations should follow the playful, minimalist stickman style we've adopted, simple shapes, clear actions, and expressive gestures.",
      },
      {
        label: "Match the Definition",
        description:
          "Illustrations should visually represent the simplified definition of the term, helping users understand it at a glance.",
      },
      {
        label: "White Background Only",
        description:
          "Keep all illustrations on a plain white background to maintain visual consistency across the project.",
      },
      {
        label: "Use Vector Format",
        description:
          "Submit your illustrations as scalable vector graphics (SVG or high-res PNG) to ensure they remain sharp and adaptable.",
      },
    ],
  },
];

export {
  FOOTER_SOCIALS,
  ABC_FILTERS,
  INTRO_DATA,
  SUPPORT_DATA,
  PROCESS_DATA,
  GUIDELINE_DATA,
};
