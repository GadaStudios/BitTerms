import { buttonVariants } from "@/components/ui/button";
import Wrapper from "@/components/wrapper";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function NotFound() {
  return (
    <div className="flex-1 bg-foreground text-background w-full min-h-dvh h-screen">
      <Wrapper className="flex flex-col items-center justify-center size-full">
        <div className="px-5 gap-4 flex flex-col items-center justify-center ">
          <Image
            src="/404.svg"
            alt="Page Not Found"
            width={806}
            height={485}
            className="object-contain"
          />

          <div className="flex items-center flex-col gap-2 md:gap-6 md:flex-row lg:gap-[51px]">
            <h1 className="lg:text-8xl">Page Not Found</h1>
            <Link
              href="/"
              className={buttonVariants({
                size: "lg",
              })}
            >
              Back to home page
            </Link>
          </div>
        </div>
      </Wrapper>
    </div>
  );
}
