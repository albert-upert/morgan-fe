import { Link } from "@tanstack/react-router";
import type { ComponentType } from "react";
import { Typography } from "uper-ui/typography";
import { cn } from "@/lib/utils";

interface MainMenuProps {
  to: string;
  icon: ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

export function MainMenu({
  to,
  icon: Icon,
  title,
  description,
}: MainMenuProps) {
  return (
    <div className="mt-4 flex flex-col gap-4">
      <Link
        to={to}
        className={cn(
          "flex items-center gap-3 rounded-2xl bg-red-400 p-4 text-white",
          "transition-transform active:scale-[0.98]"
        )}
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-xl">
          <Icon className="h-full w-full text-white" />
        </div>

        <div className="flex flex-col">
          <Typography variant="body-medium-semibold" className="text-white">
            {title}
          </Typography>
          <Typography variant="caption-small" className="text-white">
            {description}
          </Typography>
        </div>
      </Link>
    </div>
  );
}
