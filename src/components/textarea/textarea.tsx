import type { ComponentProps } from "react";
import { ClearIcon } from "@/components/icon";
import { cn } from "@/lib/utils";

export interface TextareaProps extends ComponentProps<"textarea"> {
  error?: boolean;
  helperText?: string;
  label?: string;
  maxLength?: number;
  showCount?: boolean;
  onClear?: () => void;
  wrapperClassName?: string;
}

export function Textarea({
  className,
  wrapperClassName,
  error = false,
  helperText,
  label,
  maxLength,
  showCount = false,
  onClear,
  disabled,
  value,
  ...props
}: TextareaProps) {
  const textLength = typeof value === "string" ? value.length : 0;
  const showClearButton = onClear && value && !disabled;

  return (
    <div className={cn("flex w-full flex-col gap-0.5", wrapperClassName)}>
      {label && (
        <label className="text-sm leading-[22px] text-foreground">
          {label}
        </label>
      )}
      <div className="relative">
        <textarea
          data-slot="textarea"
          disabled={disabled}
          value={value}
          maxLength={maxLength}
          className={cn(
            "flex min-h-[100px] w-full resize-y rounded-lg border bg-white px-3 py-2.5 text-sm text-foreground transition-colors outline-none placeholder:text-muted-foreground",
            error ? "border-destructive" : "border-input focus:border-ring",
            disabled && "cursor-not-allowed bg-muted opacity-50",
            className
          )}
          {...props}
        />
        {showClearButton && (
          <button
            type="button"
            onClick={onClear}
            className="absolute top-3 right-3 flex items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
          >
            <ClearIcon className="h-4 w-4" />
          </button>
        )}
      </div>
      {(helperText || showCount) && (
        <div className="flex items-center justify-between gap-2">
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
          {showCount && maxLength && (
            <span className="text-xs leading-5 whitespace-nowrap text-muted-foreground">
              {textLength}/{maxLength}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
