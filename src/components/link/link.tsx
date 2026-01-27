import { Link as RouterLink } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface LinkProps {
  to: string;
  children: ReactNode;
  className?: string;
}

export function Link({ to, children, className }: LinkProps) {
  return (
    <RouterLink
      to={to}
      className={cn("text-primary hover:underline", className)}
    >
      {children}
    </RouterLink>
  );
}

export default Link;
