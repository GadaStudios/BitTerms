import { cn } from "@/lib/utils";
import React from "react";

interface Props {
  className?: string;
  index: number;
  label: string;
  description: string;
}

export const AboutCard: React.FC<Props> = ({
  className,
  index,
  label,
  description,
}) => {
  return (
    <div className="flex w-full items-start gap-5 rounded-3xl border p-5 md:max-w-[472px] md:gap-6 md:p-6">
      <div
        className={cn(
          "text-background flex size-8 shrink-0 items-center justify-center rounded-xl text-base font-bold md:size-10 md:text-lg",
          className,
        )}
      >
        {index + 1}
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-lg font-semibold md:text-xl lg:text-[22px]">
          {label}
        </p>
        <p className="text-[15px] font-normal tracking-tight md:text-base">
          {description}
        </p>
      </div>
    </div>
  );
};
