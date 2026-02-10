import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export type CardElevation = "low" | "medium" | "high" | "none";

export interface CardProps extends ComponentProps<"div"> {
  size?: "default" | "sm";
  elevation?: CardElevation;
}

const elevationStyles: Record<CardElevation, string> = {
  low: "shadow-[0px_4px_8px_0px_rgba(61,65,81,0.2)]", // Product Card, Side Card
  medium: "shadow-[0px_8px_24px_0px_rgba(61,65,81,0.15)]", // Tooltip, Dropdown
  high: "shadow-[0px_16px_36px_0px_rgba(61,65,81,0.1)]", // Toast
  none: "shadow-none", // None
};

export function Card({
  className,
  size = "default",
  elevation = "low",
  ...props
}: CardProps) {
  return (
    <div
      data-slot="card"
      data-size={size}
      data-elevation={elevation}
      className={cn(
        "group/card flex flex-col gap-6 overflow-hidden rounded-xl border border-gray-300 bg-white py-6 text-sm text-gray-800 has-[>img:first-child]:pt-0 data-[size=sm]:gap-4 data-[size=sm]:py-4 *:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl",
        elevationStyles[elevation],
        className
      )}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "group/card-header @container/card-header grid auto-rows-min items-start gap-1 rounded-t-xl px-6 group-data-[size=sm]/card:px-4 has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto] [.border-b]:pb-6 group-data-[size=sm]/card:[.border-b]:pb-4",
        className
      )}
      {...props}
    />
  );
}

export function CardTitle({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn(
        "text-base leading-normal font-medium group-data-[size=sm]/card:text-sm",
        className
      )}
      {...props}
    />
  );
}

export function CardDescription({
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}

export function CardAction({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  );
}

export function CardContent({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-6 group-data-[size=sm]/card:px-4", className)}
      {...props}
    />
  );
}

export function CardFooter({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        "flex items-center rounded-b-xl px-6 group-data-[size=sm]/card:px-4 [.border-t]:pt-6 group-data-[size=sm]/card:[.border-t]:pt-4",
        className
      )}
      {...props}
    />
  );
}
