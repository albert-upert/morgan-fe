import { Tooltip as RadixTooltip } from "radix-ui";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type TooltipPosition = "top" | "right" | "bottom" | "left";

export interface TooltipProps {
  children: ReactNode;
  content: ReactNode;
  side?: TooltipPosition;
  align?: "start" | "center" | "end";
  delayDuration?: number;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
  sideOffset?: number;
}

export function Tooltip({
  children,
  content,
  side = "top",
  align = "center",
  delayDuration = 200,
  open,
  defaultOpen = false,
  onOpenChange,
  className,
  sideOffset = 8,
}: TooltipProps) {
  return (
    <RadixTooltip.Provider delayDuration={delayDuration}>
      <RadixTooltip.Root
        open={open}
        defaultOpen={defaultOpen}
        onOpenChange={onOpenChange}
      >
        <RadixTooltip.Trigger asChild>{children}</RadixTooltip.Trigger>
        <RadixTooltip.Portal>
          <RadixTooltip.Content
            side={side}
            align={align}
            sideOffset={sideOffset}
            className={cn(
              "z-50 overflow-hidden rounded-lg bg-gray-800 px-2 py-2 shadow-[0px_8px_24px_0px_rgba(61,65,81,0.15)]",
              "animate-in fade-in-0 zoom-in-95",
              "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
              "data-[side=bottom]:slide-in-from-top-2",
              "data-[side=left]:slide-in-from-right-2",
              "data-[side=right]:slide-in-from-left-2",
              "data-[side=top]:slide-in-from-bottom-2",
              className
            )}
          >
            <p className="font-['Poppins'] text-xs leading-5 whitespace-pre-wrap text-white">
              {content}
            </p>
            <RadixTooltip.Arrow
              className="fill-gray-800"
              width={16}
              height={8}
            />
          </RadixTooltip.Content>
        </RadixTooltip.Portal>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  );
}
