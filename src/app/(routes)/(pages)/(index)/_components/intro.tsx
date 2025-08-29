import React from "react";
import Link from "next/link";
import Image from "next/image";

import introData from "@/data/intro.json";
import Wrapper from "@/components/wrapper";
import { buttonVariants } from "@/components/ui/button";

export const Intro = () => {
  return (
    <section className="pt-24 md:pt-[152px]">
      <Wrapper>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16">
          <div className="flex flex-col gap-4">
            {introData.map((intro, index) => (
              <div
                key={intro.title || index}
                style={{
                  backgroundColor: intro.bgColor,
                  borderColor: intro.borderColor,
                  transform: `rotate(${Number(intro.rotate) * -1}deg)`,
                }}
                className="border flex items-center gap-2 max-w-[472px] lg:max-w-max mx-auto lg:mx-0 rounded-3xl md:rounded-4xl px-6 md:px-8 py-6 nth-[2]:z-10 nth-[2]:-mb-6 nth-[2]:-mt-1"
              >
                <div className="flex flex-col flex-1 gap-3 md:gap-4">
                  <p className="text-base md:text-[22px] font-semibold">
                    {intro.title}
                  </p>
                  <p className="text-xs sm:text-[13px] md:text-sm lg:text-base">
                    {intro.description}
                  </p>
                </div>

                <Image
                  src={`/${intro.illustration}.svg`}
                  alt={intro.title}
                  width={113}
                  height={113}
                  priority
                  quality={100}
                  className="object-cover size-[85px] md:size-[113px]"
                />
              </div>
            ))}
          </div>

          <div className="flex text-center justify-center md:text-start mx-auto lg:mx-0 flex-col gap-8 max-w-2xl lg:max-w-[472px]">
            <h3 className="font-normal leading-none">Welcome to BiT Terms</h3>
            <div className="flex flex-col gap-4">
              <p className="text-base md:text-lg lg:text-xl tracking-tight">
                Bitcoin can be a lot of “hash this”, “node that”. It’s like it
                has its own language. It’s almost normal to feel lost or even a
                little stressed trying to keep up. BitTerms is making bitcoin
                terms be regular words. We take those complicated Bitcoin terms
                and translate them into everyday conversation. No stress. Just
                learn at your own pace.
              </p>
            </div>

            <Link
              href="/terms"
              className={buttonVariants({
                size: "lg",
                className: "w-max mx-auto md:mx-0",
              })}
            >
              <span>See all terms</span>
            </Link>
          </div>
        </div>
      </Wrapper>
    </section>
  );
};
