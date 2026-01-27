"use client";

import { cva } from "class-variance-authority";
import type { VariantProps } from "class-variance-authority";
import {
  Children,
  cloneElement,
  isValidElement,
  useCallback,
  useMemo,
  useState,
} from "react";
import type { ComponentProps, ReactNode } from "react";
import { CaretDownIcon } from "@/components/icon/CaretDownIcon";
import { CaretUpIcon } from "@/components/icon/CaretUpIcon";
import Typography from "@/components/typography/typography";
import { cn } from "@/lib/utils";

const accordionVariants = cva("overflow-hidden rounded-xl border bg-card", {
  variants: {
    variant: {
      default: "border-border",
      gradient: "border-border",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const accordionHeaderVariants = cva(
  "flex w-full items-center justify-between transition-colors",
  {
    variants: {
      variant: {
        default: "cursor-pointer px-4 py-5 text-left hover:bg-muted",
        gradient:
          "rounded-t-xl bg-gradient-to-r from-card to-navbar-gradient-end px-4 py-5",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const accordionContentVariants = cva(
  "grid transition-all duration-300 ease-in-out",
  {
    variants: {
      variant: {
        default: "",
        gradient: "",
      },
      expanded: {
        true: "grid-rows-[1fr]",
        false: "grid-rows-[0fr]",
      },
    },
    compoundVariants: [
      {
        variant: "default",
        expanded: true,
        className: "pb-5",
      },
    ],
    defaultVariants: {
      variant: "default",
      expanded: false,
    },
  }
);

const accordionRowVariants = cva("flex w-full items-start", {
  variants: {
    striped: {
      true: "",
      false: "",
    },
  },
  defaultVariants: {
    striped: false,
  },
});

const accordionRowLabelVariants = cva(
  "flex w-[313px] shrink-0 items-center border-r border-b border-border px-5 py-2",
  {
    variants: {
      striped: {
        true: "bg-gray-300",
        false: "bg-muted",
      },
    },
    defaultVariants: {
      striped: false,
    },
  }
);

const accordionRowValueVariants = cva(
  "flex flex-1 items-center border-b border-border px-5 py-2",
  {
    variants: {
      striped: {
        true: "bg-muted",
        false: "bg-card",
      },
    },
    defaultVariants: {
      striped: false,
    },
  }
);

export type AccordionVariant = VariantProps<
  typeof accordionVariants
>["variant"];

export interface AccordionDataItem {
  label: string;
  value: ReactNode;
}

export interface AccordionProps
  extends
    Omit<ComponentProps<"div">, "title">,
    VariantProps<typeof accordionVariants> {
  /** Title displayed in the accordion header */
  title: string;
  /** Whether the accordion is expanded by default */
  defaultExpanded?: boolean;
  /** Controlled expanded state */
  expanded?: boolean;
  /** Callback when expanded state changes */
  onExpandedChange?: (expanded: boolean) => void;
  /** Content to render inside the accordion */
  children?: ReactNode;
  /** Dynamic data for key-value rows (auto-stripes based on index) */
  data?: Array<AccordionDataItem>;
  /** Custom action label for gradient variant (default: "Buka"/"Tutup") */
  actionLabel?: { open: string; close: string };
}

export function Accordion({
  title,
  defaultExpanded = false,
  expanded: controlledExpanded,
  onExpandedChange,
  children,
  data,
  className,
  variant = "default",
  actionLabel = { open: "Buka", close: "Tutup" },
  ...props
}: AccordionProps) {
  const [internalExpanded, setInternalExpanded] = useState(defaultExpanded);

  const isControlled = useMemo(
    () => controlledExpanded !== undefined,
    [controlledExpanded]
  );

  const isExpanded = useMemo(
    () => (isControlled ? controlledExpanded : internalExpanded),
    [isControlled, controlledExpanded, internalExpanded]
  );

  const handleToggle = useCallback(() => {
    const newExpanded = !isExpanded;
    if (!isControlled) {
      setInternalExpanded(newExpanded);
    }
    onExpandedChange?.(newExpanded);
  }, [isExpanded, isControlled, onExpandedChange]);

  return (
    <div
      data-slot="accordion"
      data-expanded={isExpanded}
      data-variant={variant}
      className={cn(accordionVariants({ variant }), className)}
      {...props}
    >
      <AccordionHeader
        title={title}
        expanded={isExpanded ?? false}
        onClick={handleToggle}
        variant={variant}
        actionLabel={actionLabel}
      />
      <AccordionContent
        expanded={isExpanded ?? false}
        variant={variant}
        data={data}
      >
        {children}
      </AccordionContent>
    </div>
  );
}

interface AccordionHeaderProps {
  title: string;
  expanded: boolean;
  onClick: () => void;
  variant: AccordionVariant;
  actionLabel: { open: string; close: string };
}

function AccordionHeader({
  title,
  expanded,
  onClick,
  variant,
  actionLabel,
}: AccordionHeaderProps) {
  if (variant === "gradient") {
    return (
      <div
        role="button"
        tabIndex={0}
        data-slot="accordion-header"
        onClick={onClick}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onClick();
          }
        }}
        aria-expanded={expanded}
        className={cn(accordionHeaderVariants({ variant }), "cursor-pointer")}
      >
        <Typography variant="body-medium-bold" as="span">
          {title}
        </Typography>
        <span className="inline-flex items-center gap-1 text-primary">
          <Typography variant="body-medium" as="span" className="text-primary">
            {expanded ? actionLabel.close : actionLabel.open}
          </Typography>
          {expanded ? (
            <CaretUpIcon className="size-5" />
          ) : (
            <CaretDownIcon className="size-5" />
          )}
        </span>
      </div>
    );
  }

  return (
    <div
      role="button"
      tabIndex={0}
      data-slot="accordion-header"
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
      aria-expanded={expanded}
      className={cn(accordionHeaderVariants({ variant }))}
    >
      <Typography variant="body-medium-bold" as="span">
        {title}
      </Typography>
      {expanded ? (
        <CaretUpIcon color="var(--foreground)" className="size-5" />
      ) : (
        <CaretDownIcon color="var(--foreground)" className="size-5" />
      )}
    </div>
  );
}

interface AccordionContentProps {
  expanded: boolean;
  children?: ReactNode;
  variant: AccordionVariant;
  data?: Array<AccordionDataItem>;
}

function AccordionContent({
  expanded,
  children,
  variant,
  data,
}: AccordionContentProps) {
  const contentClassName = useMemo(
    () =>
      cn(
        accordionContentVariants({
          variant,
          expanded,
        })
      ),
    [variant, expanded]
  );

  const innerClassName = useMemo(
    () => cn("overflow-hidden", variant === "default" && "px-5"),
    [variant]
  );

  const renderedContent = useMemo(() => {
    if (data && data.length > 0) {
      return (
        <>
          {data.map((item, index) => (
            <AccordionRow
              key={`${item.label}-${index}`}
              label={item.label}
              value={item.value}
              striped={index % 2 === 0}
            />
          ))}
        </>
      );
    }
    return children;
  }, [data, children]);

  return (
    <div data-slot="accordion-content" className={contentClassName}>
      <div className={innerClassName}>{renderedContent}</div>
    </div>
  );
}

// Key-value row component for data display accordion
export interface AccordionRowProps extends VariantProps<
  typeof accordionRowVariants
> {
  label: string;
  value: ReactNode;
  className?: string;
}

export function AccordionRow({
  label,
  value,
  striped = false,
  className,
}: AccordionRowProps) {
  return (
    <div
      data-slot="accordion-row"
      className={cn(accordionRowVariants({ striped }), className)}
    >
      <div className={cn(accordionRowLabelVariants({ striped }))}>
        <Typography variant="body-small" as="span">
          {label}
        </Typography>
      </div>
      <div className={cn(accordionRowValueVariants({ striped }))}>
        <Typography variant="body-small-bold" as="span">
          {value}
        </Typography>
      </div>
    </div>
  );
}

// Compound component exports for flexibility
export interface AccordionGroupProps extends ComponentProps<"div"> {
  /** Whether only one accordion can be expanded at a time */
  exclusive?: boolean;
  children: ReactNode;
}

export function AccordionGroup({
  exclusive = false,
  children,
  className,
  ...props
}: AccordionGroupProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const handleExpandedChange = useCallback(
    (index: number, expanded: boolean) => {
      if (exclusive) {
        setExpandedIndex(expanded ? index : null);
      }
    },
    [exclusive]
  );

  const renderedChildren = useMemo(() => {
    return Children.map(children, (child, index) => {
      if (isValidElement<AccordionProps>(child)) {
        if (exclusive) {
          return cloneElement(child, {
            expanded: expandedIndex === index,
            onExpandedChange: (expanded: boolean) =>
              handleExpandedChange(index, expanded),
          });
        }
      }
      return child;
    });
  }, [children, exclusive, expandedIndex, handleExpandedChange]);

  return (
    <div
      data-slot="accordion-group"
      className={cn("flex flex-col gap-4", className)}
      {...props}
    >
      {renderedChildren}
    </div>
  );
}
