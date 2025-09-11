import React from "react";
import Link from "next/link";
import Image from "next/image";

import introData from "@/data/intro.json";
import Wrapper from "@/components/wrapper";
import { buttonVariants } from "@/components/ui/button";

export const Intro = () => {
  return (
    <section className="pt-24 md:pt-[152px] lg:pt-48">
      <Wrapper>
        <div className="grid grid-cols-1 gap-8 md:gap-16 lg:grid-cols-2">
          <div className="flex flex-col gap-4">
            {introData.map((intro, index) => (
              <div
                key={intro.title || index}
                style={{
                  backgroundColor: intro.bgColor,
                  borderColor: intro.borderColor,
                  transform: `rotate(${Number(intro.rotate) * -1}deg)`,
                }}
                className="mx-auto flex max-w-[472px] items-center gap-2 rounded-3xl border px-6 py-6 nth-[2]:z-10 nth-[2]:-mt-1 nth-[2]:-mb-6 md:rounded-4xl md:px-8 lg:mx-0 lg:max-w-max"
              >
                <div className="flex flex-1 flex-col gap-3 md:gap-4">
                  <p className="text-base font-semibold md:text-[22px]">
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
                  className="size-[85px] object-cover md:size-[113px]"
                />
              </div>
            ))}
          </div>

          <div className="mx-auto flex max-w-2xl flex-col justify-center gap-4 text-center md:gap-8 md:text-start lg:mx-0 lg:max-w-[472px]">
            <h3 className="leading-none font-normal">Welcome to BiT Terms</h3>
            <div className="flex flex-col gap-4">
              <p className="text-base tracking-tight md:text-lg lg:text-xl">
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
                className: "mx-auto w-max md:mx-0",
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
