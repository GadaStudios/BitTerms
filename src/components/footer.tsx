import React from "react";
import Image from "next/image";
import { MdOutlineEmail } from "react-icons/md";
import { FaGithub } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa6";

import Wrapper from "./wrapper";

export const Footer = () => {
  return (
    <footer className="mt-24 md:mt-[152px] relative text-background">
      <div className="bg-[url('/texture.svg')] bg-cover bg-repeat absolute size-full -top-16 left-0" />
      {/* <div className="bg-[url('/hero-texture.svg')] bg-no-repeat bg-cover absolute size-full -top-16 -right-60" /> */}

      <Wrapper className="relative pt-5 overflow-clip">
        <div className="flex flex-col gap-8">
          <div className="flex items-center flex-wrap gap-6 justify-between">
            <div className="flex items-center gap-3 sm:gap-2 flex-wrap">
              <div className="rounded-full border border-background/20 py-[13px] px-[18px]">
                <span>Terms</span>
              </div>
              <div className="rounded-full border border-background/20 py-[13px] px-[18px]">
                <span>How to contribute</span>
              </div>
              <div className="rounded-full border border-background/20 py-[13px] px-[18px]">
                <span>Suggest a term</span>
              </div>
            </div>

            <div className="flex items-center gap-3 sm:gap-2 flex-wrap">
              <div className="rounded-full border border-background/20 py-[13px] px-[18px]">
                <MdOutlineEmail className="size-5" />
              </div>
              <div className="rounded-full border border-background/20 py-[13px] px-[18px]">
                <FaGithub className="size-5" />
              </div>
              <div className="rounded-full border border-background/20 py-[13px] px-[18px]">
                <FaXTwitter className="size-5" />
              </div>
              <div className="rounded-full border border-background/20 py-[13px] px-[18px]">
                <FaLinkedinIn className="size-5" />
              </div>
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
