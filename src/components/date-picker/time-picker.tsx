import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ClockIcon } from "@/components/icon";
import { cn } from "@/lib/utils";
import { TimePickerPanel } from "./time-picker-panel";

export interface TimePickerProps {
  value?: { hours: number; minutes: number };
  onChange?: (time: { hours: number; minutes: number } | undefined) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
  label?: string;
  className?: string;
  wrapperClassName?: string;
  defaultHours?: number;
  defaultMinutes?: number;
}

export function TimePicker({
  value,
  onChange,
  placeholder = "hh:mm",
  disabled = false,
  error = false,
  helperText,
  label,
  className,
  wrapperClassName,
  defaultHours = 9,
  defaultMinutes = 0,
}: TimePickerProps) {
  const [open, setOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState<
    { hours: number; minutes: number } | undefined
  >(value);
  const containerRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  const handleTimeChange = useCallback(
    (hours: number, minutes: number) => {
      const newTime = { hours, minutes };
      setSelectedTime(newTime);
      onChange?.(newTime);
    },
    [onChange]
  );

  const formatTime = useCallback(
    (time: { hours: number; minutes: number } | undefined) => {
      if (!time) return "";
      const hours = String(time.hours).padStart(2, "0");
      const minutes = String(time.minutes).padStart(2, "0");
      return `${hours}:${minutes}`;
    },
    []
  );

  const formattedTime = useMemo(
    () => (selectedTime ? formatTime(selectedTime) : placeholder),
    [selectedTime, formatTime, placeholder]
  );

  useEffect(() => {
    setSelectedTime(value);
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node) &&
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <div className={cn("flex w-full flex-col gap-0.5", wrapperClassName)}>
      {label && (
        <label className="text-sm leading-[22px] text-foreground">
          {label}
        </label>
      )}

      <div ref={containerRef} className="relative">
        <button
          type="button"
          onClick={() => !disabled && setOpen(!open)}
          disabled={disabled}
          className={cn(
            "flex h-10 w-full items-center overflow-hidden rounded-lg border bg-white transition-colors",
            error ? "border-destructive" : "border-input focus:border-ring",
            disabled && "cursor-not-allowed bg-muted opacity-50",
            className
          )}
        >
          <div className="flex flex-1 items-center gap-3 px-3 py-2">
            <div className="flex flex-1 items-center gap-3">
              <span
                className={cn(
                  "text-sm leading-[22px] font-normal",
                  selectedTime ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {formattedTime}
              </span>
            </div>
            <div className="flex flex-1 items-center justify-end gap-2">
              <ClockIcon className="size-5 text-primary" />
            </div>
          </div>
        </button>

        {open && (
          <div
            ref={popoverRef}
            className={cn(
              "absolute top-full left-0 z-50 mt-1 flex flex-col items-start overflow-hidden rounded-xl border border-border bg-white shadow-[0px_16px_36px_0px_rgba(61,65,81,0.1)]",
              "animate-in fade-in-0 zoom-in-95"
            )}
          >
            <TimePickerPanel
              hours={selectedTime?.hours ?? defaultHours}
              minutes={selectedTime?.minutes ?? defaultMinutes}
              onChange={handleTimeChange}
              className="p-4"
            />
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
