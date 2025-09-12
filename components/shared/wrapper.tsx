import * as React from "react";
import { cn } from "@/lib/utils";

const Wrapper = React.forwardRef<HTMLElement, React.ComponentProps<"section">>(
  ({ children, className, ...props }, ref) => {
    return (
      <section
        ref={ref}
        className={cn("mx-auto w-full max-w-[1030px] px-5", className)}
        {...props}
      >
        {children}
      </section>
    );
  }
);

Wrapper.displayName = "Wrapper";

export default Wrapper;
