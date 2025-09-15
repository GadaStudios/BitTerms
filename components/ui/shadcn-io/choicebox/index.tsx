"use client";

import { cn } from "@/lib/utils";
import { CircleIcon } from "lucide-react";
import { RadioGroup as RadioGroupPrimitive } from "radix-ui";
import type { ComponentProps, HTMLAttributes } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup } from "@/components/ui/radio-group";

export type ChoiceboxProps = ComponentProps<typeof RadioGroup>;

export const Choicebox = ({ className, ...props }: ChoiceboxProps) => (
  <RadioGroup className={cn("w-full", className)} {...props} />
);

export type ChoiceboxItemProps = RadioGroupPrimitive.RadioGroupItemProps;

export const ChoiceboxItem = ({
  className,
  children,
  disabled,
  ...props
}: ChoiceboxItemProps) => (
  <RadioGroupPrimitive.Item
    asChild
    className={cn(
      "text-left",
      '[&[data-state="checked"]]:border-primary',
      disabled && "disabled:pointer-events-none disabled:opacity-50",
    )}
    {...props}
  >
    <Card
      className={cn(
        "flex cursor-pointer flex-row items-start justify-between rounded-sm p-5 shadow-none transition-all sm:rounded-md sm:p-6",
        className,
      )}
    >
      {children}
    </Card>
  </RadioGroupPrimitive.Item>
);

export type ChoiceboxItemHeaderProps = ComponentProps<typeof CardHeader>;

export const ChoiceboxItemHeader = ({
  className,
  ...props
}: ComponentProps<typeof CardHeader>) => (
  <CardHeader className={cn("flex-1 p-0", className)} {...props} />
);

export type ChoiceboxItemTitleProps = ComponentProps<typeof CardTitle>;

export const ChoiceboxItemTitle = ({
  className,
  ...props
}: ChoiceboxItemTitleProps) => (
  <CardTitle
    className={cn("flex items-center gap-2 text-base", className)}
    {...props}
  />
);

export type ChoiceboxItemSubtitleProps = HTMLAttributes<HTMLSpanElement>;

export const ChoiceboxItemSubtitle = ({
  className,
  ...props
}: ChoiceboxItemSubtitleProps) => (
  <span
    className={cn("text-muted-foreground text-xs font-normal", className)}
    {...props}
  />
);

export type ChoiceboxItemDescriptionProps = ComponentProps<
  typeof CardDescription
>;

export const ChoiceboxItemDescription = ({
  className,
  ...props
}: ChoiceboxItemDescriptionProps) => (
  <CardDescription className={cn("text-sm", className)} {...props} />
);

export type ChoiceboxItemContentProps = ComponentProps<typeof CardContent>;

export const ChoiceboxItemContent = ({
  className,
  ...props
}: ChoiceboxItemContentProps) => (
  <CardContent
    className={cn(
      "border-input text-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:bg-input/30 dark:aria-invalid:ring-destructive/40 flex aspect-square size-4 shrink-0 items-center justify-center rounded-full border p-0 shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
      className,
    )}
    {...props}
  />
);

export type ChoiceboxItemIndicatorProps = ComponentProps<
  typeof RadioGroupPrimitive.RadioGroupIndicator
>;

export const ChoiceboxItemIndicator = ({
  className,
  ...props
}: ChoiceboxItemIndicatorProps) => (
  <RadioGroupPrimitive.Indicator asChild {...props}>
    <CircleIcon className={cn("fill-primary size-2", className)} />
  </RadioGroupPrimitive.Indicator>
);
