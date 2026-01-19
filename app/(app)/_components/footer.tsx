"use client";
import Link from "next/link";
import { Route } from "next";
import Image from "next/image";
import { usePathname } from "next/navigation";

import Wrapper from "../../../components/wrapper";
import { FOOTER_SOCIALS } from "@/lib/constants";
import { buttonVariants } from "@/components/ui/button";
import { isActivePath } from "@/lib/utils";

const footerRoutes = [
  { name: "About", href: "/about" },
  { name: "How to contribute", href: "/about#guideline" },
  { name: "Suggest a term", href: "/suggest" },
];

export const Footer = () => {
  const pathname = usePathname();

  return (
    <footer className="text-background bg-foreground relative mt-24 overflow-x-clip md:mt-[152px]">
      <div className="pointer-events-none absolute -top-16 left-0 size-full bg-[url('/svg/texture.svg')] bg-cover" />
      <div className="pointer-events-none absolute -top-16 -right-60 size-full bg-[url('/svg/texture.svg')] bg-cover" />

      <Wrapper className="relative overflow-clip pt-5">
        <div className="flex flex-col gap-8 md:gap-16">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="flex flex-wrap items-center gap-3 sm:gap-2">
              {footerRoutes.map((route, idx) => {
                const isActive = isActivePath(route.href, pathname);

                return (
                  <Link
                    key={idx}
                    href={route.href as Route}
                    className={buttonVariants({
                      variant: "outline2",
                      className:
                        isActive &&
                        "text-primary border-primary shadow-[0px_5px_12px_0px_#FFCF991A,0px_21px_21px_0px_#FFCF9917,0px_47px_28px_0px_#FFCF990D,0px_84px_34px_0px_#FFCF9903,0px_131px_37px_0px_#FFCF9900]",
                    })}
                  >
                    <span>{route.name}</span>
                  </Link>
                );
              })}
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
                    className={buttonVariants({ variant: "outline2" })}
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
