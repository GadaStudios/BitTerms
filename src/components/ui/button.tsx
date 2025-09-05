import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { FiLoader } from "react-icons/fi";

const buttonVariants = cva(
  "inline-flex items-center justify-center cursor-pointer gap-2 whitespace-nowrap rounded-full text-base font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-white hover:bg-[#3A3A3A] transition-colors duration-300 ease-out",
        outline: "border border-primary bg-transparent text-primary",
        secondary:
          "bg-secondary/80 text-secondary-foreground hover:bg-secondary transition-colors duration-300 ease-out",
        outline2:
          "border border-border hover:text-primary hover:border-primary bg-transparent transition-all duration-300 ease-out",
      },
      size: {
        default:
          "h-10 sm:h-12 px-4 sm:px-6 py-2 has-[>svg]:px-3 sm:has-[>svg]:px-4",
        lg: "h-13 sm:h-16 px-6 sm:px-8 has-[>svg]:px-4 sm:has-[>svg]:px-6",
        icon: "size-9 sm:size-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  isLoading = false,
  loadingText,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    isLoading?: boolean;
    loadingText?: string;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <>
          <FiLoader className="animate-spin size-4" />{" "}
          {loadingText && loadingText}
        </>
      ) : (
        props.children
      )}
    </Comp>
  );
}

export { Button, buttonVariants };
