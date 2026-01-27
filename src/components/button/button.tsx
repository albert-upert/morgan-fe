import { createLink } from "@tanstack/react-router";
import { cva } from "class-variance-authority";
import type { VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-lg font-medium whitespace-nowrap transition-all select-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-primary-foreground hover:bg-[var(--red-300)] active:bg-[var(--red-700)] disabled:bg-[var(--gray-300)] disabled:text-[var(--gray-500)]",
        secondary:
          "border border-primary bg-background text-primary hover:bg-[var(--red-50)] active:bg-[var(--red-100)] disabled:border-[var(--gray-400)] disabled:text-[var(--gray-500)]",
        tertiary:
          "bg-transparent text-primary hover:bg-[var(--red-50)] active:bg-[var(--red-100)] disabled:text-[var(--gray-500)]",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-[var(--red-300)] active:bg-[var(--red-700)] disabled:bg-[var(--gray-300)] disabled:text-[var(--gray-500)]",
        outline:
          "border border-border bg-background text-foreground hover:bg-muted active:bg-[var(--gray-300)] disabled:border-[var(--gray-400)] disabled:text-[var(--gray-500)]",
        ghost:
          "bg-transparent text-foreground hover:bg-muted active:bg-[var(--gray-300)] disabled:text-[var(--gray-500)]",
      },
      size: {
        lg: "h-10 gap-2 px-4 text-sm [&_svg]:size-5",
        md: "h-[30px] gap-1.5 px-3 text-sm [&_svg]:size-4",
        icon: "size-10 [&_svg]:size-5",
        "icon-md": "size-[30px] [&_svg]:size-4",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "lg",
    },
  }
);

export function Button({
  className,
  variant = "primary",
  size = "lg",
  asChild = false,
  ...props
}: ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot.Root : "button";

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export const ButtonLink = createLink(Button);
