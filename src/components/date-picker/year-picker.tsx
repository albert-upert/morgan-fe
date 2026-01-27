import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
} from "@/components/dropdown";
import { CalendarIcon } from "@/components/icon";
import { cn } from "@/lib/utils";

export interface YearPickerProps {
  value: number | null;
  onChange?: (year: number | null) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
  label?: string;
  className?: string;
  wrapperClassName?: string;
  minYear?: number;
  maxYear?: number;
}

export function YearPicker({
  value,
  onChange,
  placeholder = "Pilih tahun",
  disabled = false,
  error = false,
  helperText,
  label,
  className,
  wrapperClassName,
  minYear = new Date().getFullYear() - 50,
  maxYear = new Date().getFullYear() + 10,
}: YearPickerProps) {
  const [open, setOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState<number | null>(value);

  const years = useMemo(() => {
    const yearList = [];
    for (let year = maxYear; year >= minYear; year--) {
      yearList.push(year);
    }
    return yearList;
  }, [minYear, maxYear]);

  const handleYearChange = useCallback(
    (year: number) => {
      setSelectedYear(year);
      onChange?.(year);
      setOpen(false);
    },
    [onChange]
  );

  const formattedYear = useMemo(
    () => (selectedYear ? String(selectedYear) : placeholder),
    [selectedYear, placeholder]
  );

  useEffect(() => {
    setSelectedYear(value);
  }, [value]);

  return (
    <div className={cn("flex w-full flex-col gap-0.5", wrapperClassName)}>
      {label && (
        <label className="text-sm leading-[22px] text-foreground">
          {label}
        </label>
      )}

      <Dropdown open={open} onOpenChange={setOpen}>
        <DropdownTrigger asChild disabled={disabled}>
          <button
            type="button"
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
                    selectedYear ? "text-foreground" : "text-muted-foreground"
                  )}
                >
                  {formattedYear}
                </span>
              </div>
              <div className="flex flex-1 items-center justify-end gap-2">
                <CalendarIcon className="size-5 text-primary" />
              </div>
            </div>
          </button>
        </DropdownTrigger>
        <DropdownContent className="max-h-[300px] w-[var(--radix-dropdown-menu-trigger-width)]">
          {years.map((year) => (
            <DropdownItem
              key={year}
              onSelect={(event) => {
                event.preventDefault();
                handleYearChange(year);
              }}
              className={cn(
                "cursor-pointer text-sm leading-[22px] font-normal",
                year === selectedYear &&
                  "bg-red-500 text-white hover:bg-red-500 hover:text-white focus:bg-red-500 focus:text-white"
              )}
            >
              {year}
            </DropdownItem>
          ))}
        </DropdownContent>
      </Dropdown>

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
