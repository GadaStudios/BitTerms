import Link from "next/link";
import Image from "next/image";

import Wrapper from "../../../components/wrapper";
import { FOOTER_SOCIALS } from "@/lib/constants";
import { buttonVariants } from "@/components/ui/button";

export const Footer = () => {
  return (
    <footer className="text-background bg-foreground relative mt-24 overflow-x-clip md:mt-[152px]">
      <div className="pointer-events-none absolute -top-16 left-0 size-full bg-[url('/svg/texture.svg')] bg-cover" />
      <div className="pointer-events-none absolute -top-16 -right-60 size-full bg-[url('/svg/texture.svg')] bg-cover" />

      <Wrapper className="relative overflow-clip pt-5">
        <div className="flex flex-col gap-8">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="flex flex-wrap items-center gap-3 sm:gap-2">
              <Link
                href="/about"
                className={buttonVariants({
                  variant: "outline2",
                })}
              >
                <span>About</span>
              </Link>
              <a
                href="/about#guideline"
                className={buttonVariants({
                  variant: "outline2",
                })}
              >
                <span>How to contribute</span>
              </a>
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
              {FOOTER_SOCIALS.map((social) => {
                const Comp = social.href ? Link : "span";

                return (
                  <Comp
                    key={social.name}
                    target="_blank"
                    href={{ pathname: social.href }}
                    rel={social.href ? "noopener noreferrer" : undefined}
                    aria-label={social.name}
                    title={social.name}
                    className={buttonVariants({
                      variant: "outline2",
                    })}
                  >
                    <social.icon className="size-5" />
                  </Comp>
                );
              })}
            </div>
          </div>

          <Image
            src="/svg/logo.svg"
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
