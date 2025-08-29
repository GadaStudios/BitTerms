import * as React from "react";

const MOBILE_BREAKPOINT = 768;

export function useIsMobile(breakpoint = MOBILE_BREAKPOINT) {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(
    undefined
  );

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);

    const onChange = () => {
      const matches = mql.matches;
      setIsMobile((prev) => {
        if (prev !== matches) {
          return matches;
        }
        return prev;
      });
    };

    mql.addEventListener("change", onChange);
    // Set initial value
    onChange();

    return () => mql.removeEventListener("change", onChange);
  }, [breakpoint]);

  return !!isMobile;
}
