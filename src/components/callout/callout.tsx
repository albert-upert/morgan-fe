import { forwardRef } from "react";
import type { ComponentProps, ReactNode } from "react";
import { CloseIcon, ErrorIcon } from "@/components/icon";
import Typography from "@/components/typography/typography";
import { cn } from "@/lib/utils";

export type CalloutVariant = "red" | "blue" | "gray" | "yellow";

export interface CalloutProps extends ComponentProps<"div"> {
  variant?: CalloutVariant;
  message: ReactNode;
  action?: ReactNode;
  showIcon?: boolean;
  showClose?: boolean;
  onClose?: () => void;
  onActionClick?: () => void;
}

const variantStyles: Record<
  CalloutVariant,
  {
    container: string;
    border: string;
    icon: string;
    message: string;
    action: string;
  }
> = {
  red: {
    container: "bg-callout-red-bg",
    border: "border-red-400",
    icon: "text-red-600",
    message: "text-gray-800",
    action: "text-red-600",
  },
  blue: {
    container: "bg-callout-blue-bg",
    border: "border-accent",
    icon: "text-accent",
    message: "text-gray-800",
    action: "text-accent",
  },
  gray: {
    container: "bg-gray-200",
    border: "border-gray-400",
    icon: "text-gray-800",
    message: "text-gray-800",
    action: "text-gray-800",
  },
  yellow: {
    container: "bg-yellow-50",
    border: "border-yellow-500",
    icon: "text-yellow-600",
    message: "text-gray-800",
    action: "text-yellow-600",
  },
};

export const Callout = forwardRef<HTMLDivElement, CalloutProps>(
  (
    {
      variant = "red",
      message,
      action,
      showIcon = true,
      showClose = true,
      onClose,
      onActionClick,
      className,
      ...props
    },
    ref
  ) => {
    const styles = variantStyles[variant];

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(
          "flex items-center gap-3 rounded-xl border-[1.5px] p-4",
          styles.container,
          styles.border,
          className
        )}
        {...props}
      >
        {showIcon && (
          <ErrorIcon
            className={cn("h-[14px] w-[14px] shrink-0", styles.icon)}
          />
        )}

        <div className="flex flex-1 items-center gap-4">
          <Typography
            variant="pixie"
            className={cn("text-inherit", styles.message)}
            as="p"
          >
            {message}
          </Typography>

          {action && (
            <button
              onClick={onActionClick}
              className={cn("shrink-0 hover:underline", styles.action)}
              type="button"
            >
              <Typography variant="pixie-bold" className="text-inherit">
                {action}
              </Typography>
            </button>
          )}
        </div>

        {showClose && (
          <button
            onClick={onClose}
            className="shrink-0 text-gray-800 hover:opacity-70"
            type="button"
            aria-label="Close"
          >
            <CloseIcon className="size-4" />
          </button>
        )}
      </div>
    );
  }
);

Callout.displayName = "Callout";
