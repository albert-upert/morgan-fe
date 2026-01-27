import { forwardRef, useCallback, useEffect, useState } from "react";
import type { ComponentProps } from "react";
import Typography from "@/components/typography/typography";
import { cn } from "@/lib/utils";

export interface SwitchProps extends Omit<
  ComponentProps<"button">,
  "onChange"
> {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(
  ({ className, checked, onCheckedChange, disabled, ...props }, ref) => {
    const [isChecked, setIsChecked] = useState(checked || false);

    const handleClick = useCallback(() => {
      if (!disabled) {
        const newChecked = !isChecked;
        setIsChecked(newChecked);
        onCheckedChange?.(newChecked);
      }
    }, [disabled, isChecked, onCheckedChange]);

    useEffect(() => {
      if (checked !== undefined) {
        setIsChecked(checked);
      }
    }, [checked]);

    return (
      <button
        ref={ref}
        type="button"
        role="switch"
        aria-checked={isChecked}
        data-slot="switch"
        data-state={isChecked ? "checked" : "unchecked"}
        onClick={handleClick}
        disabled={disabled}
        className={cn(
          "peer relative inline-flex h-[39px] w-[83px] shrink-0 cursor-pointer items-center overflow-hidden rounded-full transition-colors",
          "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none",
          "disabled:cursor-not-allowed",
          isChecked
            ? disabled
              ? "bg-gray-600"
              : "bg-secondary"
            : disabled
              ? "border-[1.6px] border-gray-400 bg-gray-50"
              : "border-[1.6px] border-gray-50 bg-gray-50",
          className
        )}
        {...props}
      >
        {/* ON Text - visible when checked */}
        <Typography
          variant="body-small-bold"
          className={cn(
            "pointer-events-none absolute top-1/2 left-[14.64px] -translate-y-1/2 whitespace-nowrap transition-opacity",
            isChecked
              ? disabled
                ? "text-gray-50 opacity-100"
                : "text-gray-800 opacity-100"
              : "text-gray-50 opacity-0"
          )}
          as="span"
        >
          ON
        </Typography>

        {/* OFF Text - visible when unchecked */}
        <Typography
          variant="body-small-bold"
          className={cn(
            "pointer-events-none absolute top-1/2 left-[40px] -translate-y-1/2 whitespace-nowrap uppercase transition-opacity",
            isChecked
              ? "opacity-0"
              : disabled
                ? "text-gray-600 opacity-100"
                : "text-gray-50 opacity-100"
          )}
          as="span"
        >
          OFF
        </Typography>

        {/* Toggle Circle */}
        <span
          className={cn(
            "pointer-events-none block size-[28.562px] rounded-full shadow-lg ring-0 transition-transform",
            disabled && !isChecked ? "bg-gray-400" : "bg-gray-50",
            isChecked ? "translate-x-[49.64px]" : "translate-x-[4.89px]"
          )}
        />
      </button>
    );
  }
);

Switch.displayName = "Switch";
