import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MdOutlineEmail } from "react-icons/md";
import { FaGithub } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa6";

import Wrapper from "./wrapper";
import { Button, buttonVariants } from "./ui/button";

const socials = [
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

export const Footer = () => {
  return (
    <footer className="mt-24 md:mt-[152px] relative text-background bg-foreground overflow-x-clip">
      <div className="bg-[url('/texture.svg')] bg-cover bg-repeat absolute size-full -top-16 left-0" />
      <div className="bg-[url('/texture.svg')] bg-no-repeat bg-cover absolute size-full -top-16 -right-60" />

      <Wrapper className="relative pt-5 overflow-clip">
        <div className="flex flex-col gap-8">
          <div className="flex items-center flex-wrap gap-6 justify-between">
            <div className="flex items-center gap-3 sm:gap-2 flex-wrap">
              <Link
                href="/terms"
                className={buttonVariants({
                  variant: "outline2",
                })}
              >
                <span>Terms</span>
              </Link>
              <Button variant={"outline2"}>
                <span>How to contribute</span>
              </Button>
              <Link
                href="/suggest"
                className={buttonVariants({
                  variant: "outline2",
                })}
              >
                <span>Suggest a term</span>
              </Link>
            </div>

            <div className="flex items-center gap-3 sm:gap-2 flex-wrap">
              {socials.map((social) => (
                <Link
                  href={social.href || "#"}
                  target={social.href ? "_blank" : "_self"}
                  rel={social.href ? "noopener noreferrer" : undefined}
                  aria-label={social.name}
                  title={social.name}
                  key={social.name}
                  className={buttonVariants({
                    variant: "outline2",
                  })}
                >
                  <social.icon className="size-5" />
                </Link>
              ))}
            </div>
          </div>

          <Image
            src="/logo-white.svg"
            alt="logo"
            width={1010}
            height={310}
            priority
            quality={100}
            className="object-contain select-none -mb-14 sm:-mb-24 md:-mb-32 lg:-mb-36"
          />
        </div>
      </Wrapper>
    </footer>
  );
};
