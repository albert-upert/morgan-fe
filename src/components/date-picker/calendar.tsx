import { useCallback, useMemo, useState } from "react";
import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
} from "@/components/dropdown";
import {
  CaretDownIcon,
  CaretLeftIcon,
  CaretRightIcon,
} from "@/components/icon";
import { cn } from "@/lib/utils";

interface CalendarProps {
  selected: Date | null;
  onSelect?: (date: Date | null) => void;
  className?: string;
}

const DAYS = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];
const MONTHS = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

export function Calendar({ selected, onSelect, className }: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(
    selected ? selected.getMonth() : new Date().getMonth()
  );
  const [currentYear, setCurrentYear] = useState(
    selected ? selected.getFullYear() : new Date().getFullYear()
  );

  const today = useMemo(() => new Date(), []);

  const isToday = useCallback(
    (date: Date) => {
      return (
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
      );
    },
    [today]
  );

  const isSelected = useCallback(
    (date: Date) => {
      if (!selected) return false;
      return (
        date.getDate() === selected.getDate() &&
        date.getMonth() === selected.getMonth() &&
        date.getFullYear() === selected.getFullYear()
      );
    },
    [selected]
  );

  const getDaysInMonth = useCallback((month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  }, []);

  const getFirstDayOfMonth = useCallback((month: number, year: number) => {
    const day = new Date(year, month, 1).getDay();
    return day === 0 ? 6 : day - 1;
  }, []);

  const handlePreviousMonth = useCallback(() => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((prev) => prev - 1);
    } else {
      setCurrentMonth((prev) => prev - 1);
    }
  }, [currentMonth]);

  const handleNextMonth = useCallback(() => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((prev) => prev + 1);
    } else {
      setCurrentMonth((prev) => prev + 1);
    }
  }, [currentMonth]);

  const handleMonthSelect = useCallback((index: number) => {
    setCurrentMonth(index);
  }, []);

  const handleYearSelect = useCallback((year: number) => {
    setCurrentYear(year);
  }, []);

  const handleDateSelect = useCallback(
    (date: Date) => {
      onSelect?.(date);
    },
    [onSelect]
  );

  const yearOptions = useMemo(
    () => Array.from({ length: 11 }, (_, i) => currentYear - 5 + i),
    [currentYear]
  );

  const calendarDays = useMemo(() => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
    const daysInPrevMonth = getDaysInMonth(
      currentMonth === 0 ? 11 : currentMonth - 1,
      currentMonth === 0 ? currentYear - 1 : currentYear
    );

    const days = [];

    for (let i = firstDay - 1; i >= 0; i--) {
      const day = daysInPrevMonth - i;
      days.push(
        <button
          key={`prev-${day}`}
          type="button"
          disabled
          className="flex size-8 items-center justify-center rounded-lg p-2.5"
        >
          <span className="text-center text-sm leading-[22px] font-normal text-input">
            {day}
          </span>
        </button>
      );
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day);
      const isTodayDate = isToday(date);
      const isSelectedDate = isSelected(date);

      days.push(
        <button
          key={day}
          type="button"
          onClick={() => handleDateSelect(date)}
          className={cn(
            "relative flex size-8 flex-col items-center justify-center gap-2.5 rounded-lg p-2.5 transition-colors hover:bg-muted",
            isSelectedDate && "bg-red-400 hover:bg-red-400/90"
          )}
        >
          <span
            className={cn(
              "text-center text-sm leading-[22px] font-normal text-foreground",
              isSelectedDate && "text-white"
            )}
          >
            {day}
          </span>
          {isTodayDate && !isSelectedDate && (
            <div className="absolute bottom-[2px] left-1/2 size-1 -translate-x-1/2 rounded-full bg-red-500" />
          )}
        </button>
      );
    }

    const remainingDays = 42 - days.length;
    for (let day = 1; day <= remainingDays; day++) {
      days.push(
        <button
          key={`next-${day}`}
          type="button"
          disabled
          className="flex size-8 items-center justify-center rounded-lg p-2.5"
        >
          <span className="text-center text-sm leading-[22px] font-normal text-input">
            {day}
          </span>
        </button>
      );
    }

    return days;
  }, [
    currentMonth,
    currentYear,
    getDaysInMonth,
    getFirstDayOfMonth,
    handleDateSelect,
    isSelected,
    isToday,
  ]);

  return (
    <div
      className={cn(
        "flex h-auto w-full flex-col gap-4 sm:h-[302px] sm:w-[308px]",
        className
      )}
    >
      <div className="flex items-center gap-4 sm:gap-10">
        <div className="flex items-center gap-7">
          <button
            type="button"
            onClick={handlePreviousMonth}
            className="flex size-5 items-center justify-center transition-opacity hover:opacity-70"
          >
            <CaretLeftIcon className="size-5 text-foreground" />
          </button>
          <Dropdown>
            <DropdownTrigger asChild>
              <button
                type="button"
                className="h-auto w-[82px] border-none bg-transparent p-0 shadow-none hover:opacity-70 focus:ring-0"
              >
                <div className="flex items-center gap-1">
                  <p className="w-[66px] text-center text-sm leading-[22px] font-bold whitespace-pre-wrap text-foreground">
                    {MONTHS[currentMonth]}
                  </p>
                  <CaretDownIcon className="size-3 text-foreground" />
                </div>
              </button>
            </DropdownTrigger>
            <DropdownContent className="max-h-[200px]">
              {MONTHS.map((month, index) => (
                <DropdownItem
                  key={index}
                  onSelect={() => handleMonthSelect(index)}
                  className={cn(
                    "cursor-pointer text-sm leading-[22px] font-normal",
                    index === currentMonth &&
                      "bg-red-500 text-white hover:bg-red-500 hover:text-white focus:bg-red-500 focus:text-white"
                  )}
                >
                  {month}
                </DropdownItem>
              ))}
            </DropdownContent>
          </Dropdown>
          <button
            type="button"
            onClick={handleNextMonth}
            className="flex size-5 items-center justify-center transition-opacity hover:opacity-70"
          >
            <CaretRightIcon className="size-5 text-foreground" />
          </button>
        </div>
        <Dropdown>
          <DropdownTrigger asChild>
            <button
              type="button"
              className="h-auto w-auto border-none bg-transparent p-0 shadow-none hover:opacity-70 focus:ring-0"
            >
              <div className="flex items-center gap-1">
                <p className="text-center text-sm leading-[22px] font-bold text-foreground">
                  {currentYear}
                </p>
                <CaretDownIcon className="size-3 text-foreground" />
              </div>
            </button>
          </DropdownTrigger>
          <DropdownContent className="max-h-[200px]">
            {yearOptions.map((year) => (
              <DropdownItem
                key={year}
                onSelect={() => handleYearSelect(year)}
                className={cn(
                  "cursor-pointer text-sm leading-[22px] font-normal",
                  year === currentYear &&
                    "bg-red-500 text-white hover:bg-red-500 hover:text-white focus:bg-red-500 focus:text-white"
                )}
              >
                {year}
              </DropdownItem>
            ))}
          </DropdownContent>
        </Dropdown>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex w-full gap-2">
          {DAYS.map((day) => (
            <div
              key={day}
              className="flex size-8 items-center justify-center bg-background p-2.5"
            >
              <p className="text-sm leading-[22px] font-bold text-foreground">
                {day}
              </p>
            </div>
          ))}
        </div>

        <div className="grid w-full grid-cols-7 gap-2 sm:w-[272px]">
          {calendarDays}
        </div>
      </div>
    </div>
  );
}
