"use client";

import React from "react";
import Lenis from "@studio-freight/lenis";
import { usePathname } from "next/navigation";

export default function Provider({ children }: { children?: React.ReactNode }) {
  const lenis = React.useRef<Lenis | null>(null);
  const pathname = usePathname();

  React.useEffect(() => {
    if (lenis.current) lenis.current!.scrollTo(0, { immediate: true });
  }, [pathname, lenis]);

  React.useEffect(() => {
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return <React.Fragment>{children}</React.Fragment>;
}
