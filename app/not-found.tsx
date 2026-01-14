import Image from "next/image";
import { Header } from "./(app)/_components/header";
import Wrapper from "@/components/wrapper";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="bg-foreground text-background h-screen">
      <Header />

      <Wrapper className="size-full md:max-w-[806px]">
        <div className="flex h-full flex-col items-center justify-center gap-4">
          <Image
            src="/svg/not-found.svg"
            alt="Page Not Found"
            width={806}
            height={485}
            priority
            quality={100}
            className="w-[90%] object-contain sm:w-full"
          />

          <div className="flex w-full flex-col items-center gap-2 sm:flex-row sm:gap-4 md:gap-8">
            <p className="font-mono text-6xl md:text-7xl lg:text-[80px]">
              Page not found
            </p>
            <Link
              href="/"
              className={buttonVariants({ size: "lg", className: "sm:flex-1" })}
            >
              <span>Back to home page</span>
            </Link>
          </div>
        </div>
      </Wrapper>
    </div>
  );
}
