import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type TypographyVariant =
  // Headings
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  // Body Large
  | "body-large"
  | "body-large-bold"
  | "body-large-semibold"
  | "body-large-italic"
  // Body Medium
  | "body-medium"
  | "body-medium-bold"
  | "body-medium-semibold"
  | "body-medium-italic"
  // Body Small
  | "body-small"
  | "body-small-bold"
  | "body-small-semibold"
  | "body-small-italic"
  // Caption
  | "caption"
  | "caption-bold"
  | "caption-semibold"
  | "caption-italic"
  // Pixie
  | "pixie"
  | "pixie-bold"
  | "pixie-semibold"
  | "pixie-italic";

export type TypographyElement =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "p"
  | "span"
  | "div"
  | "label";

export interface TypographyProps {
  variant?: TypographyVariant;
  children: ReactNode;
  className?: string;
  as?: TypographyElement;
}

const variantStyles: Record<TypographyVariant, string> = {
  // Headings - Based on Figma specs
  h1: "font-poppins text-[56px] font-bold leading-[64px]", // Desktop/Heading/H1
  h2: "font-poppins text-[48px] font-bold leading-[54px]", // Desktop/Heading/H2
  h3: "font-poppins text-[36px] font-bold leading-[46px]", // Desktop/Heading/H3
  h4: "font-poppins text-[32px] font-bold leading-[38px]", // Desktop/Heading/H4
  h5: "font-poppins text-[24px] font-bold leading-[32px]", // Desktop/Heading/H5
  h6: "font-poppins text-[20px] font-bold leading-[28px]", // Desktop/Heading/H6

  // Body Large (20px) - Desktop/Body/Large
  "body-large": "font-poppins text-[20px] font-normal leading-[28px]",
  "body-large-bold": "font-poppins text-[20px] font-bold leading-[28px]",
  "body-large-semibold":
    "font-poppins text-[20px] font-semibold leading-[28px]",
  "body-large-italic":
    "font-poppins text-[20px] font-normal italic leading-[28px]",

  // Body Medium (16px) - Desktop/Body/Medium
  "body-medium": "font-poppins text-[16px] font-normal leading-[24px]",
  "body-medium-bold": "font-poppins text-[16px] font-bold leading-[24px]",
  "body-medium-semibold":
    "font-poppins text-[16px] font-semibold leading-[24px]",
  "body-medium-italic":
    "font-poppins text-[16px] font-normal italic leading-[24px]",

  // Body Small (14px) - Desktop/Body/Small
  "body-small": "font-poppins text-[14px] font-normal leading-[22px]",
  "body-small-bold": "font-poppins text-[14px] font-bold leading-[22px]",
  "body-small-semibold":
    "font-poppins text-[14px] font-semibold leading-[22px]",
  "body-small-italic":
    "font-poppins text-[14px] font-normal italic leading-[22px]",

  // Caption (12px) - Desktop/Caption/Caption
  caption: "font-poppins text-[12px] font-normal leading-[20px]",
  "caption-bold": "font-poppins text-[12px] font-bold leading-[20px]",
  "caption-semibold": "font-poppins text-[12px] font-semibold leading-[20px]",
  "caption-italic":
    "font-poppins text-[12px] font-normal italic leading-[20px]",

  // Pixie (10px) - Desktop/Caption/Pixie
  pixie: "font-poppins text-[10px] font-normal leading-[12px]",
  "pixie-bold": "font-poppins text-[10px] font-bold leading-[12px]",
  "pixie-semibold": "font-poppins text-[10px] font-semibold leading-[12px]",
  "pixie-italic": "font-poppins text-[10px] font-normal italic leading-[12px]",
};

const defaultElements: Record<TypographyVariant, TypographyElement> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  "body-large": "p",
  "body-large-bold": "p",
  "body-large-semibold": "p",
  "body-large-italic": "p",
  "body-medium": "p",
  "body-medium-bold": "p",
  "body-medium-semibold": "p",
  "body-medium-italic": "p",
  "body-small": "p",
  "body-small-bold": "p",
  "body-small-semibold": "p",
  "body-small-italic": "p",
  caption: "span",
  "caption-bold": "span",
  "caption-semibold": "span",
  "caption-italic": "span",
  pixie: "span",
  "pixie-bold": "span",
  "pixie-semibold": "span",
  "pixie-italic": "span",
};

export default function Typography({
  variant = "body-medium",
  children,
  className,
  as,
}: TypographyProps) {
  const Component = as || defaultElements[variant];

  return (
    <Component
      className={cn("text-gray-800", variantStyles[variant], className)}
    >
      {children}
    </Component>
  );
}
