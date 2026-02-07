import type { ComponentProps, ReactNode } from "react";
import { Button, ButtonLink } from "@/components/button";

import { Tag } from "@/components/tags";
import { cn } from "@/lib/utils";

export interface TableCustomHeaderProps {
  children: ReactNode;
  className?: string;
}

export function TableCustomHeader({
  children,
  className,
}: TableCustomHeaderProps) {
  return (
    <div
      data-slot="table-custom-header"
      className={cn(
        "flex items-center justify-between rounded-t-xl border-b p-5",
        "bg-gradient-to-y from-white to-navbar-gradient-end",
        className
      )}
    >
      {children}
    </div>
  );
}

export function TableContent({ className, ...props }: ComponentProps<"table">) {
  return (
    <table
      data-slot="table"
      className={cn("w-full caption-bottom text-sm", className)}
      {...props}
    />
  );
}

export function Table({ className, ...props }: ComponentProps<"table">) {
  return (
    <div
      data-slot="table-container"
      className="no-scrollbar relative w-full overflow-x-auto rounded-xl border"
    >
      <TableContent className={className} {...props} />
    </div>
  );
}

export interface TableWithCustomHeaderProps {
  children: ReactNode;
  className?: string;
}

export function TableWithCustomHeader({
  className,
  children,
}: TableWithCustomHeaderProps) {
  return (
    <div
      data-slot="table-container"
      className={cn(
        "no-scrollbar relative w-full overflow-x-auto rounded-xl border",
        className
      )}
    >
      {children}
    </div>
  );
}

export function TableHeader({ className, ...props }: ComponentProps<"thead">) {
  return (
    <thead
      data-slot="table-header"
      className={cn(
        "bg-gradient-to-r from-white to-navbar-gradient-end [&_tr]:border-b",
        className
      )}
      {...props}
    />
  );
}

export function TableBody({ className, ...props }: ComponentProps<"tbody">) {
  return (
    <tbody
      data-slot="table-body"
      className={cn("[&_tr:last-child]:border-0", className)}
      {...props}
    />
  );
}

export function TableFooter({ className, ...props }: ComponentProps<"tfoot">) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn(
        "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
        className
      )}
      {...props}
    />
  );
}

export function TableRow({ className, ...props }: ComponentProps<"tr">) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
        className
      )}
      {...props}
    />
  );
}

export function TableHead({ className, ...props }: ComponentProps<"th">) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        "px-3 py-5 text-center align-middle font-['Poppins'] text-sm font-semibold whitespace-nowrap text-foreground [&:has([role=checkbox])]:pr-0",
        className
      )}
      {...props}
    />
  );
}

export function TableCell({ className, ...props }: ComponentProps<"td">) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        "px-2 py-3 text-center align-middle font-['Poppins'] text-xs whitespace-nowrap [&:has([role=checkbox])]:pr-0",
        className
      )}
      {...props}
    />
  );
}

export function TableCaption({
  className,
  ...props
}: ComponentProps<"caption">) {
  return (
    <caption
      data-slot="table-caption"
      className={cn("mt-4 text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}

export interface ColumnDefinition<T> {
  key: string;
  header: string;
  render: (item: T, index: number) => ReactNode;
  className?: string;
}

export interface ActionDefinition<T> {
  key: string;
  label: string;
  icon?: ReactNode;
  variant?:
    | "primary"
    | "secondary"
    | "tertiary"
    | "destructive"
    | "outline"
    | "ghost";
  size?: "lg" | "md" | "icon" | "icon-md";
  onClick?: (item: T) => void;
  to?: string;
  params?: Record<string, string> | ((item: T) => Record<string, string>);
}

export interface DataTableProps<T> {
  data: Array<T>;
  columns: Array<ColumnDefinition<T>>;
  actions?: Array<ActionDefinition<T>>;
  emptyMessage?: string;
  className?: string;
}

export function DataTable<T>({
  data,
  columns,
  actions,
  emptyMessage = "No data available",
  className = "",
}: DataTableProps<T>) {
  return (
    <div className={`rounded-md border ${className}`}>
      <Table>
        <TableHeader className="bg-muted/50">
          <TableRow>
            {columns.map((column) => (
              <TableHead
                key={column.key}
                className={`font-semibold ${column.className || ""}`}
              >
                {column.header}
              </TableHead>
            ))}
            {actions && actions.length > 0 && (
              <TableHead className="text-center font-semibold">
                Actions
              </TableHead>
            )}
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={columns.length + (actions ? 1 : 0)}
                className="h-24 text-center"
              >
                {emptyMessage}
              </TableCell>
            </TableRow>
          ) : (
            data.map((item, index) => (
              <TableRow
                key={index}
                className="transition-colors hover:bg-muted/50"
              >
                {columns.map((column) => (
                  <TableCell key={column.key} className={column.className}>
                    {column.render(item, index)}
                  </TableCell>
                ))}
                {actions && actions.length > 0 && (
                  <TableCell>
                    <div className="flex justify-center gap-6">
                      {actions.map((action) => {
                        const commonProps = {
                          variant: action.variant || "outline",
                          size: action.size || "md",
                          className: "gap-1",
                          children: (
                            <>
                              {action.icon}
                              {action.label}
                            </>
                          ),
                        };

                        if (action.to) {
                          const params =
                            typeof action.params === "function"
                              ? action.params(item)
                              : action.params;

                          return (
                            <ButtonLink
                              key={action.key}
                              to={action.to}
                              params={params}
                              {...commonProps}
                            />
                          );
                        }

                        return (
                          <Button
                            key={action.key}
                            onClick={() => action.onClick?.(item)}
                            {...commonProps}
                          />
                        );
                      })}
                    </div>
                  </TableCell>
                )}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

// Helper functions for common render patterns
export const renderTag = (
  content: ReactNode,
  color: "red" | "green" | "green-light" | "yellow" | "blue" = "blue",
  className: string = ""
) => (
  <Tag color={color} type="filled" className={className}>
    {content}
  </Tag>
);

export const renderIdTag = (id: string) =>
  renderTag(id, "blue", "font-mono text-xs");

export const renderNameWithDescription = (
  name: string,
  description?: string | null
) => (
  <div className="flex flex-col">
    <span className="font-medium">{name}</span>
    {description && (
      <span className="text-xs text-muted-foreground">{description}</span>
    )}
  </div>
);

export const renderStatusTag = (
  status: string | null,
  colorMap: Record<string, "red" | "green" | "green-light" | "yellow" | "blue">,
  fallback: string = "Unknown"
) => {
  const statusKey = (status ?? "").toLowerCase();
  const color = statusKey in colorMap ? colorMap[statusKey] : "blue";
  return renderTag(status || fallback, color);
};
