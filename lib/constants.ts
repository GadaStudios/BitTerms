import { MdOutlineEmail } from "react-icons/md";
import { FaGithub } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa6";

export const socials = [
  {
    name: "Email",
    icon: MdOutlineEmail,
  },
  {
    name: "GitHub",
    icon: FaGithub,
    href: "https://github.com/BitTerms",
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

export const abcFilters = [
  "all",
  ...Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i)),
  "symbol",
];
