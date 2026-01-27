import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { CalendarIcon } from "@/components/icon";
import { cn } from "@/lib/utils";
import { Calendar } from "./calendar";
import { TimePickerPanel } from "./time-picker-panel";

export interface DatePickerProps {
  value: Date | null;
  onChange: (date: Date | null) => void;
  placeholder?: string;
  showTime?: boolean;
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
  label?: string;
  className?: string;
  wrapperClassName?: string;
  suffixText?: string;
}

export function DatePicker({
  value,
  onChange,
  placeholder = "dd-mm-yyyy, hh:mm",
  showTime = true,
  disabled = false,
  error = false,
  helperText,
  label,
  className,
  wrapperClassName,
  suffixText = "Years",
}: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(value);
  const containerRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  const handleDateChange = useCallback(
    (date: Date | null) => {
      setSelectedDate(date);
      if (!showTime && date) {
        onChange(date);
        setOpen(false);
      }
    },
    [showTime, onChange]
  );

  const handleTimeChange = useCallback(
    (hours: number, minutes: number) => {
      if (selectedDate) {
        const newDate = new Date(selectedDate);
        newDate.setHours(hours);
        newDate.setMinutes(minutes);
        setSelectedDate(newDate);
        onChange(newDate);
      }
    },
    [selectedDate, onChange]
  );

  const formatDate = useCallback(
    (date: Date | null) => {
      if (!date) return "";

      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();

      if (showTime) {
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        return `${day}-${month}-${year}, ${hours}:${minutes}`;
      }

      return `${day}-${month}-${year}`;
    },
    [showTime]
  );

  const formattedDate = useMemo(
    () => (selectedDate ? formatDate(selectedDate) : placeholder),
    [selectedDate, formatDate, placeholder]
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      const isOutsideContainer =
        containerRef.current && !containerRef.current.contains(target);
      const isOutsidePopover =
        popoverRef.current && !popoverRef.current.contains(target);
      const isInsideDropdownPortal =
        target.closest('[data-slot="dropdown-menu-content"]') !== null;

      if (isOutsideContainer && isOutsidePopover && !isInsideDropdownPortal) {
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
                  selectedDate ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {formattedDate}
              </span>
            </div>
            <div className="flex flex-1 items-center justify-end gap-2">
              <CalendarIcon className="size-5 text-primary" />
            </div>
          </div>
          {suffixText && (
            <div className="flex h-10 items-center justify-center border-l border-border bg-muted px-3 py-2.5">
              <span className="text-sm leading-[22px] font-normal whitespace-nowrap text-muted-foreground">
                {suffixText}
              </span>
            </div>
          )}
        </button>

        {open && (
          <div
            ref={popoverRef}
            className={cn(
              "absolute top-full left-0 z-50 mt-1 flex flex-col items-start overflow-hidden rounded-xl border border-border bg-white shadow-[0px_16px_36px_0px_rgba(61,65,81,0.1)]",
              "animate-in fade-in-0 zoom-in-95",
              "sm:flex-row"
            )}
          >
            <div className="w-full border-b border-border sm:w-auto sm:border-r sm:border-b-0">
              <Calendar
                selected={selectedDate}
                onSelect={handleDateChange}
                className="p-4"
              />
            </div>
            {showTime && (
              <TimePickerPanel
                hours={selectedDate?.getHours() ?? 9}
                minutes={selectedDate?.getMinutes() ?? 30}
                onChange={handleTimeChange}
                className="p-4"
              />
            )}
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
