import { cva } from "class-variance-authority";
import type { VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import Typography from "@/components/typography/typography";
import { cn } from "@/lib/utils";

export const tagVariants = cva(
  "inline-flex items-center justify-center font-normal whitespace-nowrap transition-colors",
  {
    variants: {
      color: {
        red: "",
        green: "",
        "green-light": "",
        yellow: "",
        blue: "",
      },
      type: {
        monochrome: "border-0 bg-transparent",
        "with-border": "border-[1.5px] bg-white",
        filled: "",
      },
      size: {
        xl: "px-3 py-2 text-base leading-6",
        lg: "px-2 py-1.5 text-xs leading-5",
        md: "px-2 py-1 text-[10px] leading-3",
      },
      rounded: {
        default: "rounded-lg",
        pill: "rounded-full",
      },
    },
    compoundVariants: [
      // Red color variants
      {
        color: "red",
        type: "monochrome",
        className: "text-[#ca161c]",
      },
      {
        color: "red",
        type: "with-border",
        className: "border-[#eb474d] text-[#eb474d]",
      },
      {
        color: "red",
        type: "filled",
        className: "bg-[#eb474d] text-white",
      },
      // Green color variants
      {
        color: "green",
        type: "monochrome",
        className: "text-[#98a725]",
      },
      {
        color: "green",
        type: "with-border",
        className: "border-[#98a725] text-[#98a725]",
      },
      {
        color: "green",
        type: "filled",
        className: "bg-[#d0de68] text-[#262626]",
      },
      // Green light color variants
      {
        color: "green-light",
        type: "monochrome",
        className: "text-[#98a725]",
      },
      {
        color: "green-light",
        type: "with-border",
        className: "border-[#fafbee] text-[#98a725]",
      },
      {
        color: "green-light",
        type: "filled",
        className: "bg-[#fafbee] text-[#98a725]",
      },
      // Yellow color variants
      {
        color: "yellow",
        type: "monochrome",
        className: "text-foreground",
      },
      {
        color: "yellow",
        type: "with-border",
        className: "border-[#fde05d] text-foreground",
      },
      {
        color: "yellow",
        type: "filled",
        className: "bg-[#fdd835] text-foreground",
      },
      // Blue color variants
      {
        color: "blue",
        type: "monochrome",
        className: "text-[#0065a3]",
      },
      {
        color: "blue",
        type: "with-border",
        className: "border-[#0097f5] text-[#0065a3]",
      },
      {
        color: "blue",
        type: "filled",
        className: "bg-[#0097f5] text-white",
      },
    ],
    defaultVariants: {
      color: "red",
      type: "with-border",
      size: "xl",
      rounded: "default",
    },
  }
);

export interface TagProps
  extends
    Omit<ComponentProps<"span">, "color">,
    VariantProps<typeof tagVariants> {}

export function Tag({
  className,
  color,
  type,
  size,
  rounded,
  ...props
}: TagProps) {
  return (
    <span
      data-slot="tag"
      className={cn(tagVariants({ color, type, size, rounded }), className)}
      {...props}
    />
  );
}

// Semester Tag Component
const semesterColors: Record<string, string> = {
  "1": "#e64325",
  "2": "#e64325",
  "3": "#e64325",
  "4": "#e64325",
  "5": "#e64325",
  "6": "#e64325",
  "7": "#e64325",
  "8": "#e64325",
  pendek: "#e64325",
};

export interface SemesterTagProps extends ComponentProps<"div"> {
  semester: "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "pendek";
}

export function SemesterTag({
  semester,
  className,
  ...props
}: SemesterTagProps) {
  const color = semesterColors[semester];
  const label = semester === "pendek" ? "Sem Dek" : `Semester ${semester}`;

  return (
    <div
      className={cn(
        "inline-flex items-center justify-center rounded-full border-[1.5px] border-white bg-white px-2 py-1.5",
        className
      )}
      style={{ color }}
      {...props}
    >
      <Typography variant="caption" className="text-center font-medium" as="p">
        {label}
      </Typography>
    </div>
  );
}

// IPK Tag Component
export interface IpkTagProps extends ComponentProps<"div"> {
  ipk: string;
  disabled?: boolean;
  iconSrc?: string;
}

export function IpkTag({
  ipk,
  disabled = false,
  iconSrc,
  className,
  ...props
}: IpkTagProps) {
  return (
    <div className={cn("inline-flex items-center gap-2", className)} {...props}>
      {iconSrc && (
        <div className="relative size-8 shrink-0">
          <img
            src={iconSrc}
            alt="IPK Icon"
            className="size-full object-cover"
          />
        </div>
      )}
      <Typography
        variant="body-medium"
        className={disabled ? "text-white" : "text-primary"}
        as="span"
      >
        {ipk}
      </Typography>
    </div>
  );
}
