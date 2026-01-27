import { cva } from "class-variance-authority";
import type { VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { Typography } from "@/components/typography";
import { cn } from "@/lib/utils";

const loadingVariants = cva(
  "flex flex-col items-center justify-center gap-4 rounded-xl bg-white p-6",
  {
    variants: {
      size: {
        sm: "w-[300px]",
        md: "w-[420px]",
        lg: "w-[500px]",
        full: "w-full",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export interface LoadingProps
  extends ComponentProps<"div">, VariantProps<typeof loadingVariants> {
  /** Progress value from 0 to 100. If not provided, shows indeterminate animation */
  progress?: number;
  /** Text to display below the progress bar */
  text?: string;
  /** Whether to show the progress bar with animation */
  indeterminate?: boolean;
}

export function Loading({
  className,
  size,
  progress,
  text = "loading...",
  indeterminate = true,
  ...props
}: LoadingProps) {
  const isIndeterminate = indeterminate && progress === undefined;

  return (
    <div
      data-slot="loading"
      className={cn(loadingVariants({ size, className }))}
      {...props}
    >
      {/* Progress bar container */}
      <div className="h-10 w-full overflow-hidden rounded-[20px] border-2 border-[#e3e3e3] bg-[#f4f4f4]">
        {/* Progress bar fill */}
        <div
          className={cn(
            "h-full rounded-[12px] bg-[#2e9bff] transition-all duration-300",
            isIndeterminate && "animate-loading-progress"
          )}
          style={
            !isIndeterminate
              ? { width: `${Math.min(100, Math.max(0, progress ?? 0))}%` }
              : undefined
          }
        />
      </div>

      {/* Loading text */}
      <Typography variant="h5" className="text-center text-[#222]">
        {text}
      </Typography>
    </div>
  );
}
