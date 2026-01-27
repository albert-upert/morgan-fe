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
import type { DateRange } from "./date-range-picker";

interface RangeCalendarProps {
  selected?: DateRange;
  onSelect?: (range: DateRange | undefined) => void;
  className?: string;
  numberOfMonths?: 1 | 2;
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

type DateState =
  | "default"
  | "today"
  | "disabled"
  | "selected"
  | "range-selected"
  | "today-selected";

export function RangeCalendar({
  selected,
  onSelect,
  className,
  numberOfMonths = 2,
}: RangeCalendarProps) {
  const [leftMonth, setLeftMonth] = useState(
    selected?.from ? selected.from.getMonth() : new Date().getMonth()
  );
  const [leftYear, setLeftYear] = useState(
    selected?.from ? selected.from.getFullYear() : new Date().getFullYear()
  );

  const [hoverDate, setHoverDate] = useState<Date | null>(null);

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

  const isSameDay = useCallback((date1: Date, date2: Date) => {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  }, []);

  const isStartDate = useCallback(
    (date: Date) => {
      if (!selected?.from) return false;
      return isSameDay(date, selected.from);
    },
    [selected?.from, isSameDay]
  );

  const isEndDate = useCallback(
    (date: Date) => {
      if (!selected?.to) return false;
      return isSameDay(date, selected.to);
    },
    [selected?.to, isSameDay]
  );

  const isInRange = useCallback(
    (date: Date) => {
      if (!selected?.from) return false;

      const endDate = selected.to || hoverDate;
      if (!endDate) return false;

      const start = selected.from < endDate ? selected.from : endDate;
      const end = selected.from < endDate ? endDate : selected.from;

      return date > start && date < end;
    },
    [selected?.from, selected?.to, hoverDate]
  );

  const getDateState = useCallback(
    (date: Date, isCurrentMonth: boolean): DateState => {
      if (!isCurrentMonth) return "disabled";

      const isTodayDate = isToday(date);
      const isStart = isStartDate(date);
      const isEnd = isEndDate(date);

      if (isStart || isEnd) {
        return isTodayDate ? "today-selected" : "selected";
      }

      if (isInRange(date)) {
        return "range-selected";
      }

      if (isTodayDate) return "today";

      return "default";
    },
    [isToday, isStartDate, isEndDate, isInRange]
  );

  const getDaysInMonth = useCallback((month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  }, []);

  const getFirstDayOfMonth = useCallback((month: number, year: number) => {
    const day = new Date(year, month, 1).getDay();
    return day === 0 ? 6 : day - 1;
  }, []);

  const handleDateClick = useCallback(
    (date: Date) => {
      if (!selected?.from || selected.to) {
        onSelect?.({ from: date, to: undefined });
      } else {
        if (date < selected.from) {
          onSelect?.({ from: date, to: selected.from });
        } else {
          onSelect?.({ from: selected.from, to: date });
        }
      }
    },
    [selected?.from, selected?.to, onSelect]
  );

  const handlePreviousMonth = useCallback(() => {
    if (leftMonth === 0) {
      setLeftMonth(11);
      setLeftYear((prev) => prev - 1);
    } else {
      setLeftMonth((prev) => prev - 1);
    }
  }, [leftMonth]);

  const handleNextMonth = useCallback(() => {
    if (leftMonth === 11) {
      setLeftMonth(0);
      setLeftYear((prev) => prev + 1);
    } else {
      setLeftMonth((prev) => prev + 1);
    }
  }, [leftMonth]);

  const handleMonthSelect = useCallback(
    (index: number, showNavigation: boolean, year: number) => {
      if (showNavigation) {
        setLeftMonth(index);
      } else {
        const newLeftMonth = index === 0 ? 11 : index - 1;
        const newLeftYear = index === 0 ? year - 1 : year;
        setLeftMonth(newLeftMonth);
        setLeftYear(newLeftYear);
      }
    },
    []
  );

  const handleYearSelect = useCallback((year: number) => {
    setLeftYear(year);
  }, []);

  const getRightMonth = useCallback(() => {
    if (leftMonth === 11) return 0;
    return leftMonth + 1;
  }, [leftMonth]);

  const getRightYear = useCallback(() => {
    if (leftMonth === 11) return leftYear + 1;
    return leftYear;
  }, [leftMonth, leftYear]);

  const renderDays = (month: number, year: number) => {
    const daysInMonth = getDaysInMonth(month, year);
    const firstDay = getFirstDayOfMonth(month, year);
    const daysInPrevMonth = getDaysInMonth(
      month === 0 ? 11 : month - 1,
      month === 0 ? year - 1 : year
    );

    const days = [];

    for (let i = firstDay - 1; i >= 0; i--) {
      const day = daysInPrevMonth - i;
      const prevMonth = month === 0 ? 11 : month - 1;
      const prevYear = month === 0 ? year - 1 : year;
      const date = new Date(prevYear, prevMonth, day);
      const state = getDateState(date, false);

      days.push(
        <DateItem
          key={`prev-${day}`}
          value={day}
          state={state}
          onClick={() => {}}
          onMouseEnter={() => {}}
          onMouseLeave={() => {}}
        />
      );
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const state = getDateState(date, true);

      days.push(
        <DateItem
          key={day}
          value={day}
          state={state}
          onClick={() => handleDateClick(date)}
          onMouseEnter={() => {
            if (selected?.from && !selected.to) {
              setHoverDate(date);
            }
          }}
          onMouseLeave={() => setHoverDate(null)}
        />
      );
    }

    const remainingDays = 42 - days.length;
    for (let day = 1; day <= remainingDays; day++) {
      const nextMonthVal = month === 11 ? 0 : month + 1;
      const nextYear = month === 11 ? year + 1 : year;
      const date = new Date(nextYear, nextMonthVal, day);
      const state = getDateState(date, false);

      days.push(
        <DateItem
          key={`next-${day}`}
          value={day}
          state={state}
          onClick={() => {}}
          onMouseEnter={() => {}}
          onMouseLeave={() => {}}
        />
      );
    }

    return days;
  };

  const yearOptions = Array.from({ length: 11 }, (_, i) => leftYear - 5 + i);

  const renderCalendar = (
    month: number,
    year: number,
    showNavigation: boolean
  ) => (
    <div className="flex h-auto w-full flex-col gap-4 overflow-hidden p-4 sm:h-[302px] sm:w-[308px]">
      <div className="flex items-center gap-10">
        <div className="flex items-center gap-7">
          {showNavigation ? (
            <button
              type="button"
              onClick={handlePreviousMonth}
              className="flex size-5 items-center justify-center transition-opacity hover:opacity-70"
            >
              <CaretLeftIcon className="size-5 text-foreground" />
            </button>
          ) : (
            <div className="size-5" />
          )}
          <Dropdown>
            <DropdownTrigger asChild>
              <button
                type="button"
                className="h-auto w-[82px] border-none bg-transparent p-0 shadow-none hover:opacity-70 focus:ring-0"
              >
                <div className="flex items-center gap-1">
                  <p className="w-[66px] text-center text-sm leading-[22px] font-bold whitespace-pre-wrap text-foreground">
                    {MONTHS[month]}
                  </p>
                  <CaretDownIcon className="size-3 text-foreground" />
                </div>
              </button>
            </DropdownTrigger>
            <DropdownContent className="max-h-[200px]">
              {MONTHS.map((monthName, index) => (
                <DropdownItem
                  key={index}
                  onSelect={(event) => {
                    event.preventDefault();
                    handleMonthSelect(index, showNavigation, year);
                  }}
                  className={cn(
                    "cursor-pointer text-sm leading-[22px] font-normal",
                    index === month &&
                      "bg-red-500 text-white hover:bg-red-500 hover:text-white focus:bg-red-500 focus:text-white"
                  )}
                >
                  {monthName}
                </DropdownItem>
              ))}
            </DropdownContent>
          </Dropdown>
          {!showNavigation ? (
            <button
              type="button"
              onClick={handleNextMonth}
              className="flex size-5 items-center justify-center transition-opacity hover:opacity-70"
            >
              <CaretRightIcon className="size-5 text-foreground" />
            </button>
          ) : (
            <div className="size-5" />
          )}
        </div>
        <Dropdown>
          <DropdownTrigger asChild>
            <button
              type="button"
              className="h-auto w-auto border-none bg-transparent p-0 shadow-none hover:opacity-70 focus:ring-0"
            >
              <div className="flex items-center gap-1">
                <p className="text-center text-sm leading-[22px] font-bold text-foreground">
                  {year}
                </p>
                <CaretDownIcon className="size-3 text-foreground" />
              </div>
            </button>
          </DropdownTrigger>
          <DropdownContent className="max-h-[200px]">
            {yearOptions.map((yearOption) => (
              <DropdownItem
                key={yearOption}
                onSelect={(event) => {
                  event.preventDefault();
                  handleYearSelect(yearOption);
                }}
                className={cn(
                  "cursor-pointer text-sm leading-[22px] font-normal",
                  yearOption === year &&
                    "bg-red-500 text-white hover:bg-red-500 hover:text-white focus:bg-red-500 focus:text-white"
                )}
              >
                {yearOption}
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

        <div className="grid w-[272px] grid-cols-7 gap-2">
          {renderDays(month, year)}
        </div>
      </div>
    </div>
  );

  return (
    <div className={cn("flex", className)}>
      {renderCalendar(leftMonth, leftYear, true)}
      {numberOfMonths === 2 &&
        renderCalendar(getRightMonth(), getRightYear(), false)}
    </div>
  );
}

interface DateItemProps {
  value: number;
  state: DateState;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

function DateItem({
  value,
  state,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: DateItemProps) {
  const isDisabled = state === "disabled";
  const isSelected = state === "selected";
  const isRangeSelected = state === "range-selected";
  const isToday = state === "today";
  const isTodaySelected = state === "today-selected";
  const isDefault = state === "default";

  return (
    <button
      type="button"
      disabled={isDisabled}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={cn(
        "relative flex size-8 flex-col items-center justify-center rounded-lg p-2.5 transition-colors",
        isDefault && "bg-white hover:bg-muted",
        isDisabled && "cursor-default bg-white",
        isSelected && "bg-red-400 hover:bg-red-400/90",
        isTodaySelected && "bg-red-500 hover:bg-red-500/90",
        isRangeSelected && "bg-red-50 hover:bg-red-50/80",
        isToday && "bg-white hover:bg-muted"
      )}
    >
      <span
        className={cn(
          "text-center text-sm leading-[22px] font-normal",
          isDefault && "text-foreground",
          isDisabled && "text-input",
          isSelected && "text-white",
          isTodaySelected && "text-white",
          isRangeSelected && "text-red-500",
          isToday && "text-foreground"
        )}
      >
        {value}
      </span>
      {(isToday || isTodaySelected) && (
        <div
          className={cn(
            "absolute bottom-[2px] left-1/2 size-1 -translate-x-1/2 rounded-full",
            isTodaySelected ? "bg-white" : "bg-red-500"
          )}
        />
      )}
    </button>
  );
}
