import React from "react";
import Link from "next/link";
import Image from "next/image";

import Wrapper from "./wrapper";
import { socials } from "@/lib/constants";
import { Button, buttonVariants } from "@/components/ui/button";

export const Footer = () => {
  return (
    <footer className="text-background bg-foreground relative mt-24 overflow-x-clip md:mt-[152px]">
      <div className="pointer-events-none absolute -top-16 left-0 size-full bg-[url('/texture.svg')] bg-cover" />
      <div className="pointer-events-none absolute -top-16 -right-60 size-full bg-[url('/texture.svg')] bg-cover" />

      <Wrapper className="relative overflow-clip pt-5">
        <div className="flex flex-col gap-8">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="flex flex-wrap items-center gap-3 sm:gap-2">
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

            <div className="flex flex-wrap items-center gap-3 sm:gap-2">
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
            className="-mb-14 object-contain select-none sm:-mb-24 md:-mb-32 lg:-mb-36"
          />
        </div>
      </Wrapper>
    </footer>
  );
};
