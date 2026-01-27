import { cva } from "class-variance-authority";
import { useMemo } from "react";
import type { ComponentProps, ReactNode } from "react";
import { ClearIcon, ErrorIcon } from "@/components/icon";
import { cn } from "@/lib/utils";

const inputWrapperVariants = cva(
  "flex w-full items-center overflow-hidden rounded-lg border bg-white transition-colors",
  {
    variants: {
      size: {
        lg: "h-10",
        md: "h-[30px]",
        sm: "h-[22px]",
      },
      state: {
        default: "border-input",
        error: "border-destructive",
        disabled: "bg-muted",
      },
    },
    defaultVariants: {
      size: "lg",
      state: "default",
    },
  }
);

const inputVariants = cva(
  "h-full flex-1 bg-transparent px-3 py-2 text-sm transition-colors outline-none placeholder:text-muted-foreground",
  {
    variants: {
      size: {
        lg: "text-sm",
        md: "text-sm",
        sm: "text-xs",
      },
      state: {
        default: "text-foreground",
        error: "text-foreground",
        disabled: "cursor-not-allowed bg-muted text-muted-foreground",
      },
    },
    defaultVariants: {
      size: "lg",
      state: "default",
    },
  }
);

export interface InputProps extends Omit<
  ComponentProps<"input">,
  "prefix" | "size"
> {
  suffix?: ReactNode;
  prefix?: ReactNode;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  size?: "lg" | "md" | "sm";
  error?: boolean;
  helperText?: string;
  label?: string;
  onClear?: () => void;
}

export function Input({
  className,
  wrapperClassName,
  type,
  suffix,
  prefix,
  startIcon,
  endIcon,
  size = "lg",
  error = false,
  helperText,
  label,
  onClear,
  disabled,
  ...props
}: InputProps & { wrapperClassName?: string }) {
  const state = useMemo(
    () => (disabled ? "disabled" : error ? "error" : "default"),
    [disabled, error]
  );

  const showClearButton = useMemo(
    () => onClear && props.value && !disabled,
    [onClear, props.value, disabled]
  );

  const hasAdornments = useMemo(
    () => !!(suffix || prefix || startIcon || endIcon || showClearButton),
    [suffix, prefix, startIcon, endIcon, showClearButton]
  );

  const inputElement = useMemo(
    () => (
      <input
        type={type}
        data-slot="input"
        disabled={disabled}
        className={cn(
          inputVariants({ size, state }),
          "disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      />
    ),
    [type, disabled, size, state, className, props]
  );

  // Simple input without adornments
  if (!hasAdornments) {
    return (
      <div className={cn("flex w-full flex-col gap-0.5", wrapperClassName)}>
        {label && (
          <label className="text-sm leading-[22px] text-foreground">
            {label}
          </label>
        )}
        <input
          type={type}
          data-slot="input"
          disabled={disabled}
          className={cn(
            inputWrapperVariants({ size, state }),
            inputVariants({ size, state }),
            "disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          {...props}
        />
        {helperText && (
          <span
            className={cn(
              "text-xs leading-5",
              error ? "text-destructive" : "text-muted-foreground"
            )}
          >
            {helperText}
          </span>
        )}
      </div>
    );
  }

  // Input with adornments
  return (
    <div className={cn("flex w-full flex-col gap-0.5", wrapperClassName)}>
      {label && (
        <label className="text-sm leading-[22px] text-foreground">
          {label}
        </label>
      )}
      <div className={cn(inputWrapperVariants({ size, state }), className)}>
        {prefix && (
          <div
            className={cn(
              "flex h-full items-center justify-center border-r border-border bg-muted px-3 text-sm text-muted-foreground",
              size === "sm" && "text-xs"
            )}
          >
            {prefix}
          </div>
        )}
        {startIcon && (
          <div className="flex h-full items-center justify-center pl-3">
            <div
              className={cn(
                size === "lg" && "size-5",
                size === "md" && "size-5",
                size === "sm" && "size-3"
              )}
            >
              {startIcon}
            </div>
          </div>
        )}
        {inputElement}
        <div className="flex h-full items-center gap-2 pr-3">
          {showClearButton && (
            <button
              type="button"
              onClick={onClear}
              className="flex items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
            >
              <ClearIcon className={size === "sm" ? "size-3" : "size-5"} />
            </button>
          )}
          {endIcon && (
            <div
              className={cn(
                size === "lg" && "size-5",
                size === "md" && "size-5",
                size === "sm" && "size-3"
              )}
            >
              {endIcon}
            </div>
          )}
          {error && !endIcon && (
            <ErrorIcon
              className={cn(
                "text-destructive",
                size === "sm" ? "size-3" : "size-5"
              )}
            />
          )}
        </div>
        {suffix && (
          <div
            className={cn(
              "flex h-full items-center justify-center border-l border-border bg-muted px-3 text-sm text-muted-foreground",
              size === "sm" && "text-xs"
            )}
          >
            {suffix}
          </div>
        )}
      </div>
      {helperText && (
        <span
          className={cn(
            "text-xs leading-5",
            error ? "text-destructive" : "text-muted-foreground"
          )}
        >
          {helperText}
        </span>
      )}
    </div>
  );
}
