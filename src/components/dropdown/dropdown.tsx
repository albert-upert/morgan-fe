import { DropdownMenu } from "radix-ui";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { ComponentProps, MouseEvent, ReactNode } from "react";
import { CaretRightIcon, CheckIcon, SearchIcon } from "@/components/icon";
import { Input } from "@/components/input";
import { cn } from "@/lib/utils";

export function Dropdown({
  ...props
}: ComponentProps<typeof DropdownMenu.Root>) {
  return <DropdownMenu.Root data-slot="dropdown-menu" {...props} />;
}

export function DropdownPortal({
  ...props
}: ComponentProps<typeof DropdownMenu.Portal>) {
  return <DropdownMenu.Portal data-slot="dropdown-menu-portal" {...props} />;
}

export function DropdownTrigger({
  ...props
}: ComponentProps<typeof DropdownMenu.Trigger>) {
  return <DropdownMenu.Trigger data-slot="dropdown-menu-trigger" {...props} />;
}

export function DropdownContent({
  className,
  align = "start",
  sideOffset = 4,
  ...props
}: ComponentProps<typeof DropdownMenu.Content>) {
  return (
    <DropdownMenu.Portal>
      <DropdownMenu.Content
        data-slot="dropdown-menu-content"
        sideOffset={sideOffset}
        align={align}
        className={cn(
          "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 z-50 max-h-(--radix-dropdown-menu-content-available-height) w-(--radix-dropdown-menu-trigger-width) min-w-[200px] origin-(--radix-dropdown-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-lg border border-border bg-background p-1 shadow-[0px_16px_36px_0px_rgba(61,65,81,0.1)] duration-100 data-[state=closed]:overflow-hidden",
          className
        )}
        {...props}
      />
    </DropdownMenu.Portal>
  );
}

export function DropdownGroup({
  ...props
}: ComponentProps<typeof DropdownMenu.Group>) {
  return <DropdownMenu.Group data-slot="dropdown-menu-group" {...props} />;
}

export function DropdownItem({
  className,
  inset,
  variant = "default",
  onSelect,
  onClick,
  ...props
}: ComponentProps<typeof DropdownMenu.Item> & {
  inset?: boolean;
  variant?: "default" | "destructive";
}) {
  const handleSelect = useCallback(
    (event: Event) => {
      onSelect?.(event);
    },
    [onSelect]
  );

  const handleClick = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      onClick?.(event);
    },
    [onClick]
  );

  return (
    <DropdownMenu.Item
      data-slot="dropdown-menu-item"
      data-inset={inset}
      data-variant={variant}
      onSelect={handleSelect}
      onClick={handleClick}
      className={cn(
        "group/dropdown-menu-item relative flex cursor-pointer items-center gap-2 rounded-sm px-3 py-2 text-sm outline-hidden transition-colors select-none",
        "text-foreground hover:bg-muted focus:bg-muted",
        "data-[variant=destructive]:text-destructive data-[variant=destructive]:hover:bg-[var(--red-50)] data-[variant=destructive]:focus:bg-[var(--red-50)]",
        "data-disabled:pointer-events-none data-disabled:opacity-50",
        "data-inset:pl-8",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  );
}

export function DropdownCheckboxItem({
  className,
  children,
  checked,
  onCheckedChange,
  onSelect,
  ...props
}: ComponentProps<typeof DropdownMenu.CheckboxItem>) {
  const handleCheckedChange = useCallback(
    (value: boolean) => {
      onCheckedChange?.(value);
    },
    [onCheckedChange]
  );

  const handleSelect = useCallback(
    (event: Event) => {
      onSelect?.(event);
    },
    [onSelect]
  );

  return (
    <DropdownMenu.CheckboxItem
      data-slot="dropdown-menu-checkbox-item"
      className={cn(
        "relative flex cursor-pointer items-center gap-2 rounded-sm py-2 pr-3 pl-8 text-sm outline-hidden transition-colors select-none",
        "text-foreground hover:bg-muted focus:bg-muted",
        "data-[state=checked]:bg-[var(--red-50)] data-[state=checked]:text-foreground",
        "data-disabled:pointer-events-none data-disabled:opacity-50",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      checked={checked}
      onCheckedChange={handleCheckedChange}
      onSelect={handleSelect}
      {...props}
    >
      <span
        className="pointer-events-none absolute left-2 flex size-4 items-center justify-center rounded-[3px] border border-border data-[state=checked]:border-primary data-[state=checked]:bg-primary"
        data-slot="dropdown-menu-checkbox-item-indicator"
        data-state={checked ? "checked" : "unchecked"}
      >
        <DropdownMenu.ItemIndicator>
          <CheckIcon className="size-3 text-white" strokeWidth={3} />
        </DropdownMenu.ItemIndicator>
      </span>
      {children}
    </DropdownMenu.CheckboxItem>
  );
}

export function DropdownRadioGroup({
  ...props
}: ComponentProps<typeof DropdownMenu.RadioGroup>) {
  return (
    <DropdownMenu.RadioGroup data-slot="dropdown-menu-radio-group" {...props} />
  );
}

export function DropdownRadioItem({
  className,
  children,
  onSelect,
  ...props
}: ComponentProps<typeof DropdownMenu.RadioItem>) {
  const handleSelect = useCallback(
    (event: Event) => {
      onSelect?.(event);
    },
    [onSelect]
  );

  return (
    <DropdownMenu.RadioItem
      data-slot="dropdown-menu-radio-item"
      onSelect={handleSelect}
      className={cn(
        "relative flex cursor-pointer items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden transition-colors select-none",
        "text-foreground hover:bg-muted focus:bg-muted",
        "data-disabled:pointer-events-none data-disabled:opacity-50",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      <span
        className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center"
        data-slot="dropdown-menu-radio-item-indicator"
      >
        <DropdownMenu.ItemIndicator>
          <CheckIcon />
        </DropdownMenu.ItemIndicator>
      </span>
      {children}
    </DropdownMenu.RadioItem>
  );
}

export function DropdownLabel({
  className,
  inset,
  ...props
}: ComponentProps<typeof DropdownMenu.Label> & {
  inset?: boolean;
}) {
  return (
    <DropdownMenu.Label
      data-slot="dropdown-menu-label"
      data-inset={inset}
      className={cn(
        "px-2 py-1.5 text-sm font-semibold data-inset:pl-8",
        className
      )}
      {...props}
    />
  );
}

export function DropdownSeparator({
  className,
  ...props
}: ComponentProps<typeof DropdownMenu.Separator>) {
  return (
    <DropdownMenu.Separator
      data-slot="dropdown-menu-separator"
      className={cn("-mx-1 my-1 h-px bg-border", className)}
      {...props}
    />
  );
}

export function DropdownShortcut({
  className,
  ...props
}: ComponentProps<"span">) {
  return (
    <span
      data-slot="dropdown-menu-shortcut"
      className={cn(
        "ml-auto text-xs tracking-widest text-muted-foreground group-focus/dropdown-menu-item:text-accent-foreground",
        className
      )}
      {...props}
    />
  );
}

export function DropdownSub({
  ...props
}: ComponentProps<typeof DropdownMenu.Sub>) {
  return <DropdownMenu.Sub data-slot="dropdown-menu-sub" {...props} />;
}

export function DropdownSubTrigger({
  className,
  inset,
  children,
  ...props
}: ComponentProps<typeof DropdownMenu.SubTrigger> & {
  inset?: boolean;
}) {
  return (
    <DropdownMenu.SubTrigger
      data-slot="dropdown-menu-sub-trigger"
      data-inset={inset}
      className={cn(
        "flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden transition-colors select-none",
        "text-foreground hover:bg-muted focus:bg-muted",
        "data-open:bg-muted",
        "data-inset:pl-8",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      {children}
      <CaretRightIcon className="ml-auto" />
    </DropdownMenu.SubTrigger>
  );
}

export function DropdownSubContent({
  className,
  ...props
}: ComponentProps<typeof DropdownMenu.SubContent>) {
  return (
    <DropdownMenu.SubContent
      data-slot="dropdown-menu-sub-content"
      className={cn(
        "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 z-50 min-w-32 origin-(--radix-dropdown-menu-content-transform-origin) overflow-hidden rounded-md bg-popover p-1 text-popover-foreground shadow-lg ring-1 ring-foreground/10 duration-100",
        className
      )}
      {...props}
    />
  );
}

interface DropdownSearchProps<T> {
  items: Array<T>;
  searchPlaceholder?: string;
  searchKeys?: Array<keyof T>;
  emptyMessage?: string;
  contentClassName?: string;
  inputClassName?: string;
  children: (props: {
    filteredItems: Array<T>;
    searchValue: string;
    onSearchChange: (value: string) => void;
  }) => ReactNode;
}

export function DropdownSearch<T extends object>({
  items,
  searchPlaceholder = "Search...",
  searchKeys = [],
  emptyMessage = "No results found",
  contentClassName,
  inputClassName,
  children,
}: DropdownSearchProps<T>) {
  const [searchValue, setSearchValue] = useState("");
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredItems = useMemo(() => {
    if (!searchValue.trim()) return items;

    const lowerSearch = searchValue.toLowerCase();
    return items.filter((item) => {
      if (searchKeys.length === 0) {
        return Object.values(item).some((value) =>
          String(value).toLowerCase().includes(lowerSearch)
        );
      }

      return searchKeys.some((key) =>
        String(item[key]).toLowerCase().includes(lowerSearch)
      );
    });
  }, [items, searchValue, searchKeys]);

  const handleClear = useCallback(() => {
    setSearchValue("");
    setOpen(false);
  }, []);

  // Refocus input when dropdown opens
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [open]);

  return (
    <Dropdown open={open} onOpenChange={setOpen} modal={false}>
      <DropdownTrigger asChild onClick={(e) => e.preventDefault()}>
        <div>
          <Input
            ref={inputRef}
            type="text"
            placeholder={searchPlaceholder}
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
              if (!open) setOpen(true);
            }}
            onClick={() => setOpen(true)}
            onKeyDown={(e) => e.stopPropagation()}
            onClear={searchValue ? handleClear : undefined}
            endIcon={<SearchIcon />}
            size="lg"
            className={inputClassName}
          />
        </div>
      </DropdownTrigger>
      <DropdownContent className={cn("p-1", contentClassName)}>
        <div className="max-h-[300px] overflow-y-auto">
          {filteredItems.length === 0 ? (
            <div className="px-3 py-6 text-center text-sm text-muted-foreground">
              {emptyMessage}
            </div>
          ) : (
            children({
              filteredItems,
              searchValue,
              onSearchChange: setSearchValue,
            })
          )}
        </div>
      </DropdownContent>
    </Dropdown>
  );
}

interface DropdownAsyncSearchProps<T> {
  fetchItems: (query: string) => Promise<Array<T>>;
  searchPlaceholder?: string;
  emptyMessage?: string;
  loadingMessage?: string;
  errorMessage?: string;
  debounceMs?: number;
  minSearchLength?: number;
  contentClassName?: string;
  inputClassName?: string;
  children: (props: {
    items: Array<T>;
    isLoading: boolean;
    error: string | null;
    searchValue: string;
    onSearchChange: (value: string) => void;
  }) => ReactNode;
}

export function DropdownAsyncSearch<T extends object>({
  fetchItems,
  searchPlaceholder = "Search...",
  emptyMessage = "No results found",
  loadingMessage = "Loading...",
  errorMessage = "Failed to load results",
  debounceMs = 300,
  minSearchLength = 1,
  contentClassName,
  inputClassName,
  children,
}: DropdownAsyncSearchProps<T>) {
  const [searchValue, setSearchValue] = useState("");
  const [items, setItems] = useState<Array<T>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const fetchData = useCallback(
    async (query: string) => {
      if (query.length < minSearchLength) {
        setItems([]);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const results = await fetchItems(query);
        setItems(results);
      } catch {
        setError(errorMessage);
        setItems([]);
      } finally {
        setIsLoading(false);
      }
    },
    [fetchItems, minSearchLength, errorMessage]
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchData(searchValue);
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [searchValue, debounceMs, fetchData]);

  const handleClear = useCallback(() => {
    setSearchValue("");
    setItems([]);
    setError(null);
    setOpen(false);
  }, []);

  // Refocus input when dropdown opens
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [open]);

  return (
    <Dropdown open={open} onOpenChange={setOpen} modal={false}>
      <DropdownTrigger asChild onClick={(e) => e.preventDefault()}>
        <div>
          <Input
            ref={inputRef}
            type="text"
            placeholder={searchPlaceholder}
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
              if (!open) setOpen(true);
            }}
            onClick={() => setOpen(true)}
            onKeyDown={(e) => e.stopPropagation()}
            onClear={searchValue ? handleClear : undefined}
            endIcon={<SearchIcon />}
            size="lg"
            className={inputClassName}
          />
        </div>
      </DropdownTrigger>
      <DropdownContent className={cn("p-1", contentClassName)}>
        <div className="max-h-[300px] overflow-y-auto">
          {isLoading ? (
            <div className="px-3 py-6 text-center text-sm text-muted-foreground">
              {loadingMessage}
            </div>
          ) : error ? (
            <div className="px-3 py-6 text-center text-sm text-destructive">
              {error}
            </div>
          ) : items.length === 0 && searchValue.length >= minSearchLength ? (
            <div className="px-3 py-6 text-center text-sm text-muted-foreground">
              {emptyMessage}
            </div>
          ) : searchValue.length < minSearchLength ? (
            <div className="px-3 py-6 text-center text-sm text-muted-foreground">
              Type at least {minSearchLength} character
              {minSearchLength > 1 ? "s" : ""} to search
            </div>
          ) : (
            children({
              items,
              isLoading,
              error,
              searchValue,
              onSearchChange: setSearchValue,
            })
          )}
        </div>
      </DropdownContent>
    </Dropdown>
  );
}
