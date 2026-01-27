import { cva } from "class-variance-authority";
import type { VariantProps } from "class-variance-authority";
import {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  useCallback,
  useEffect,
  useState,
} from "react";
import type { ChangeEvent, ComponentProps } from "react";
import { cn } from "@/lib/utils";

export const radioVariants = cva(
  "peer relative inline-flex shrink-0 cursor-pointer items-center justify-center rounded-full border-[1.5px] transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
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

export interface RadioProps
  extends
    Omit<ComponentProps<"input">, "size" | "type">,
    VariantProps<typeof radioVariants> {
  onValueChange?: (checked: boolean) => void;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ className, size, checked, onValueChange, disabled, ...props }, ref) => {
    const [isChecked, setIsChecked] = useState(checked || false);

    const handleChange = useCallback(
      (event: ChangeEvent<HTMLInputElement>) => {
        const newChecked = event.target.checked;
        setIsChecked(newChecked);
        onValueChange?.(newChecked);
        props.onChange?.(event);
      },
      [onValueChange, props]
    );

    useEffect(() => {
      if (checked !== undefined) {
        setIsChecked(checked);
      }
    }, [checked]);

    return (
      <div className="relative inline-flex items-center">
        <input
          ref={ref}
          type="radio"
          className="peer absolute opacity-0"
          checked={isChecked}
          onChange={handleChange}
          disabled={disabled}
          {...props}
        />
        <div
          data-slot="radio"
          className={cn(
            radioVariants({ size }),
            isChecked
              ? "border-primary bg-white"
              : "border-input bg-background",
            disabled && "opacity-50",
            className
          )}
        >
          {isChecked && (
            <div
              className={cn(
                "rounded-full bg-primary",
                size === "sm" ? "size-[6px]" : "size-2"
              )}
            />
          )}
        </div>
      </div>
    );
  }
);

Radio.displayName = "Radio";

export interface RadioGroupProps extends ComponentProps<"div"> {
  value?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
}

export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ className, children, value, onValueChange, disabled, ...props }, ref) => {
    const [selectedValue, setSelectedValue] = useState(value || "");

    useEffect(() => {
      if (value !== undefined) {
        setSelectedValue(value);
      }
    }, [value]);

    const handleValueChange = useCallback((itemValue: string) => {
      setSelectedValue(itemValue);
      onValueChange?.(itemValue);
    }, []);

    return (
      <div
        ref={ref}
        role="radiogroup"
        className={cn("flex flex-col gap-2", className)}
        {...props}
      >
        {Children.map(children, (child) => {
          if (
            isValidElement<RadioGroupItemProps>(child) &&
            child.type === RadioGroupItem
          ) {
            return cloneElement(child, {
              ...child.props,
              checked: child.props.value === selectedValue,
              onValueChange: () => handleValueChange(child.props.value),
              disabled: disabled || child.props.disabled,
            });
          }
          return child;
        })}
      </div>
    );
  }
);

RadioGroup.displayName = "RadioGroup";

export interface RadioGroupItemProps extends RadioProps {
  value: string;
  label?: string;
}

export const RadioGroupItem = forwardRef<HTMLInputElement, RadioGroupItemProps>(
  ({ className, label, size, value, ...props }, ref) => {
    return (
      <label className="flex cursor-pointer items-center gap-2">
        <Radio
          ref={ref}
          size={size}
          className={className}
          value={value}
          {...props}
        />
        {label && (
          <span className="text-sm font-normal text-foreground">{label}</span>
        )}
      </label>
    );
  }
);

RadioGroupItem.displayName = "RadioGroupItem";
