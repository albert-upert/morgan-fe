import { cva } from "class-variance-authority";
import type { VariantProps } from "class-variance-authority";
import { forwardRef, useCallback, useEffect, useState } from "react";
import type { ChangeEvent, ComponentProps } from "react";
import { CheckIcon } from "@/components/icon";
import { cn } from "@/lib/utils";

export const checkboxVariants = cva(
  "peer relative inline-flex shrink-0 cursor-pointer items-center justify-center rounded border-[1.5px] transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      size: {
        sm: "size-[14px]",
        md: "size-4",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export interface CheckboxProps
  extends
    Omit<ComponentProps<"input">, "size" | "type">,
    VariantProps<typeof checkboxVariants> {
  onCheckedChange?: (checked: boolean) => void;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, size, checked, onCheckedChange, disabled, ...props }, ref) => {
    const [isChecked, setIsChecked] = useState(checked || false);

    const handleChange = useCallback(
      (event: ChangeEvent<HTMLInputElement>) => {
        const newChecked = event.target.checked;
        setIsChecked(newChecked);
        onCheckedChange?.(newChecked);
        props.onChange?.(event);
      },
      [onCheckedChange, props]
    );

    useEffect(() => {
      if (checked !== undefined) {
        setIsChecked(checked);
      }
    }, [checked]);

    return (
      <label className="relative inline-flex items-center">
        <input
          ref={ref}
          type="checkbox"
          className="peer absolute opacity-0"
          checked={isChecked}
          onChange={handleChange}
          disabled={disabled}
          {...props}
        />
        <div
          data-slot="checkbox"
          className={cn(
            checkboxVariants({ size }),
            isChecked
              ? "border-primary bg-primary"
              : "border-input bg-background",
            disabled && "opacity-50",
            className
          )}
        >
          {isChecked && (
            <CheckIcon
              className={cn(
                "text-white",
                size === "sm" ? "size-[10px]" : "size-3"
              )}
              strokeWidth={3}
            />
          )}
        </div>
      </label>
    );
  }
);

Checkbox.displayName = "Checkbox";
