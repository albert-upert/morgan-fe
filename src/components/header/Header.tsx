import type { MouseEventHandler, ReactNode } from "react";
import Typography from "@/components/typography/typography";
import { cn } from "@/lib/utils";

export type HeaderVariant = "default" | "home";

export interface HeaderProfile {
  name: string;
  subtitle?: string;
  avatar?: ReactNode;
}

export interface HeaderProps {
  /**
   * - default: header untuk selain home page
   * - home: header khusus home page (punya area profil + action icons)
   */
  variant?: HeaderVariant;

  /**
   * Logo di kiri (contoh: logo Universitas / logo app).
   * Default: `/images/logo-blue.png`
   */
  logoSrc?: string;
  logoAlt?: string;

  title?: string;
  subtitle?: string;

  /**
   * Dipakai untuk mengatur lebar container (mobile vs desktop).
   * Default: `home -> max-w-md`, selain itu `max-w-5xl`.
   */
  maxWidthClassName?: string;

  className?: string;

  /**
   * Hanya dipakai pada variant `home`
   */
  profile?: HeaderProfile;
  showDivider?: boolean;
  notificationHasDot?: boolean;
  onNotificationClick?: MouseEventHandler<HTMLButtonElement>;
  onSettingsClick?: MouseEventHandler<HTMLButtonElement>;
}

export function Header({
  variant: _variant = "default",
  logoSrc = "/images/logo-banner.png",
  logoAlt = "MORGAN",
  title = "MORGAN",
  subtitle = "Sistem Pelaporan Aset",
  maxWidthClassName,
  className,
}: HeaderProps) {
  const resolvedMaxWidth = maxWidthClassName || "max-w-5xl";

  return (
    <header
      className={cn(
        "mx-auto max-w-[412px] bg-linear-to-l from-[#FFECED] to-[#FFFFFF]",
        className
      )}
    >
      <div className={cn("px-[24px] py-[16px]", resolvedMaxWidth)}>
        {/* Top row */}
        <div className="flex items-center gap-4">
          <img
            src={logoSrc}
            alt={logoAlt}
            className="h-[40px] w-[62.81px] shrink-0 object-contain"
          />
          <div className="flex flex-col">
            <Typography
              variant="body-small-bold"
              className="leading-4 text-gray-800"
            >
              {title}
            </Typography>
            <Typography
              variant="caption"
              className="leading-4 font-semibold text-gray-800"
            >
              {subtitle}
            </Typography>
          </div>
        </div>
      </div>
    </header>
  );
}
