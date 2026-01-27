import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { CaretDownIcon, CaretUpIcon } from "@/components/icon";
import { cn } from "@/lib/utils";

interface TimePickerPanelProps {
  hours: number;
  minutes: number;
  onChange: (hours: number, minutes: number) => void;
  className?: string;
}

const ITEM_HEIGHT = 44;

function useTimeScroll(initialValue: number, offset: number) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollTo = useCallback(
    (value: number) => {
      if (scrollRef.current) {
        const index = Math.max(0, value - offset);
        scrollRef.current.scrollTop = index * ITEM_HEIGHT;
      }
    },
    [offset]
  );

  useEffect(() => {
    scrollTo(initialValue);
  }, [initialValue, scrollTo]);

  return { scrollRef, scrollTo };
}

export function TimePickerPanel({
  hours,
  minutes,
  onChange,
  className,
}: TimePickerPanelProps) {
  const [selectedHour, setSelectedHour] = useState(hours);
  const [selectedMinute, setSelectedMinute] = useState(minutes);

  const { scrollRef: hourScrollRef, scrollTo: scrollToHour } = useTimeScroll(
    selectedHour,
    9
  );
  const { scrollRef: minuteScrollRef, scrollTo: scrollToMinute } =
    useTimeScroll(selectedMinute, 30);

  // Sync with prop changes
  useEffect(() => {
    setSelectedHour(hours);
    setSelectedMinute(minutes);
  }, [hours, minutes]);

  const handleHourChange = useCallback(
    (newHour: number) => {
      setSelectedHour(newHour);
      onChange(newHour, selectedMinute);
    },
    [onChange, selectedMinute]
  );

  const handleMinuteChange = useCallback(
    (newMinute: number) => {
      setSelectedMinute(newMinute);
      onChange(selectedHour, newMinute);
    },
    [onChange, selectedHour]
  );

  const incrementHour = useCallback(() => {
    const newHour = selectedHour === 23 ? 0 : selectedHour + 1;
    handleHourChange(newHour);
    scrollToHour(newHour);
  }, [selectedHour, handleHourChange, scrollToHour]);

  const decrementHour = useCallback(() => {
    const newHour = selectedHour === 0 ? 23 : selectedHour - 1;
    handleHourChange(newHour);
    scrollToHour(newHour);
  }, [selectedHour, handleHourChange, scrollToHour]);

  const incrementMinute = useCallback(() => {
    const newMinute = selectedMinute === 59 ? 0 : selectedMinute + 1;
    handleMinuteChange(newMinute);
    scrollToMinute(newMinute);
  }, [selectedMinute, handleMinuteChange, scrollToMinute]);

  const decrementMinute = useCallback(() => {
    const newMinute = selectedMinute === 0 ? 59 : selectedMinute - 1;
    handleMinuteChange(newMinute);
    scrollToMinute(newMinute);
  }, [selectedMinute, handleMinuteChange, scrollToMinute]);

  const hours24 = useMemo(() => Array.from({ length: 24 }, (_, i) => i), []);
  const minutes60 = useMemo(() => Array.from({ length: 60 }, (_, i) => i), []);

  return (
    <div
      className={cn(
        "flex h-[303px] w-full items-center justify-center gap-2 overflow-hidden bg-background sm:w-[161px]",
        className
      )}
    >
      <div className="flex shrink-0 flex-col gap-2">
        <button
          type="button"
          onClick={decrementHour}
          className="flex h-9 w-14 items-center justify-center rounded-lg transition-colors hover:bg-muted"
        >
          <CaretUpIcon className="size-5 text-foreground" />
        </button>

        <div
          ref={hourScrollRef}
          className="scrollbar-hide flex h-[176px] flex-col gap-2 overflow-y-auto"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {hours24.map((hour) => (
            <button
              key={hour}
              type="button"
              onClick={() => handleHourChange(hour)}
              className={cn(
                "flex h-9 w-14 shrink-0 items-center justify-center rounded-lg px-4 py-2 transition-colors hover:bg-muted",
                selectedHour === hour && "bg-red-50"
              )}
            >
              <p
                className={cn(
                  "text-sm leading-[22px] font-bold",
                  selectedHour === hour ? "text-red-500" : "text-foreground"
                )}
              >
                {String(hour).padStart(2, "0")}
              </p>
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={incrementHour}
          className="flex h-9 w-14 items-center justify-center rounded-lg transition-colors hover:bg-muted"
        >
          <CaretDownIcon className="size-5 text-foreground" />
        </button>
      </div>

      <div className="flex shrink-0 items-center justify-center px-0 py-2">
        <p className="text-sm leading-[22px] font-bold text-foreground">:</p>
      </div>

      <div className="flex shrink-0 flex-col gap-2">
        <button
          type="button"
          onClick={decrementMinute}
          className="flex h-9 w-14 items-center justify-center rounded-lg transition-colors hover:bg-muted"
        >
          <CaretUpIcon className="size-5 text-foreground" />
        </button>

        <div
          ref={minuteScrollRef}
          className="scrollbar-hide flex h-[176px] flex-col gap-2 overflow-y-auto"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {minutes60.map((minute) => (
            <button
              key={minute}
              type="button"
              onClick={() => handleMinuteChange(minute)}
              className={cn(
                "flex h-9 w-14 shrink-0 items-center justify-center rounded-lg px-4 py-2 transition-colors hover:bg-muted",
                selectedMinute === minute && "bg-red-50"
              )}
            >
              <p
                className={cn(
                  "text-sm leading-[22px] font-bold",
                  selectedMinute === minute ? "text-red-500" : "text-foreground"
                )}
              >
                {String(minute).padStart(2, "0")}
              </p>
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={incrementMinute}
          className="flex h-9 w-14 items-center justify-center rounded-lg transition-colors hover:bg-muted"
        >
          <CaretDownIcon className="size-5 text-foreground" />
        </button>
      </div>
    </div>
  );
}
