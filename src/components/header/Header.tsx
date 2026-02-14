import type { MouseEventHandler, ReactNode } from "react";
import { useState } from "react";
import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
} from "uper-ui/dropdown";
import {
  LogoutIcon,
  NotificationIcon,
  ProfileIcon,
  SettingIcon,
} from "uper-ui/icon";
import { Typography } from "uper-ui/typography";

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
  onLogoutClick?: MouseEventHandler<HTMLButtonElement>;
}

export function Header({
  variant: _variant = "default",
  logoSrc = "/images/logo-banner.png",
  logoAlt = "MORGAN",
  title = "MORGAN",
  subtitle = "Sistem Pelaporan Aset",
  maxWidthClassName,
  className,
  onNotificationClick,
  onSettingsClick,
  onLogoutClick,
}: HeaderProps) {
  const resolvedMaxWidth = maxWidthClassName || "max-w-5xl";

  const fullName = "Meredita Susanty";
  const role = "Dosen";
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <header
      className={cn(
        "mx-auto max-w-[412px] bg-linear-to-l from-navbar-gradient-end to-background",
        className
      )}
    >
      <div
        className={cn(
          "flex items-center justify-between px-[24px] py-[12px]",
          resolvedMaxWidth
        )}
      >
        {/* Top row */}
        <div className="flex items-center gap-[4px]">
          <img
            src={logoSrc}
            alt={logoAlt}
            className="h-[33.44px] w-[47.81px] shrink-0 object-contain"
          />
          <div className="flex flex-col gap-0 p-2">
            <div className="flex justify-between">
              {title.split("").map((char, i) => (
                <span
                  key={i}
                  className="text-[17px] leading-none font-semibold text-gray-800"
                >
                  {char}
                </span>
              ))}
            </div>

            <Typography
              variant="caption-pixie"
              className="font-semibold text-gray-800"
            >
              {subtitle}
            </Typography>
          </div>
        </div>

        <div className="flex items-center gap-[6px]">
          <Dropdown open={openMenu} onOpenChange={setOpenMenu} modal={false}>
            <DropdownTrigger asChild>
              <button
                type="button"
                className="flex items-center gap-[6px] rounded-lg"
                aria-label="Buka menu profil"
              >
                <div className="flex h-[32px] w-[32px] items-center justify-center rounded-full bg-blue-100">
                  <ProfileIcon className="h-[32px] w-[32px] text-blue-500" />
                </div>
                <div className="flex flex-col text-left">
                  <Typography
                    variant="body-large-semibold"
                    className="text-gray-800"
                  >
                    {fullName.length > 8 ? fullName.slice(0, 8) : fullName}
                  </Typography>
                  <Typography variant="caption-pixie" className="text-gray-800">
                    {role}
                  </Typography>
                </div>
              </button>
            </DropdownTrigger>

            <DropdownContent
              align="end"
              sideOffset={2}
              className="w-[200px] rounded-xl border border-border bg-white p-2 shadow-lg"
            >
              <DropdownItem
                className="flex items-center gap-3 rounded-lg px-3 py-2"
                onSelect={(e) => {
                  e.preventDefault();
                  setOpenMenu(false);
                  onNotificationClick?.(
                    e as unknown as React.MouseEvent<HTMLButtonElement>
                  );
                }}
              >
                <NotificationIcon className="h-5 w-5" />
                <Typography variant="body-small" className="text-gray-800">
                  Notifikasi
                </Typography>
              </DropdownItem>

              <DropdownItem
                className="flex items-center gap-3 rounded-lg px-3 py-2"
                onSelect={(e) => {
                  e.preventDefault();
                  setOpenMenu(false);
                  onSettingsClick?.(
                    e as unknown as React.MouseEvent<HTMLButtonElement>
                  );
                }}
              >
                <SettingIcon className="h-5 w-5" />
                <Typography variant="body-small" className="text-gray-800">
                  Pengaturan
                </Typography>
              </DropdownItem>

              <DropdownItem
                className="flex items-center gap-3 rounded-lg px-3 py-2"
                onSelect={(e) => {
                  e.preventDefault();
                  setOpenMenu(false);
                  onLogoutClick?.(
                    e as unknown as React.MouseEvent<HTMLButtonElement>
                  );
                }}
              >
                <LogoutIcon className="h-5 w-5" />
                <Typography variant="body-small" className="text-gray-800">
                  Keluar
                </Typography>
              </DropdownItem>
            </DropdownContent>
          </Dropdown>
        </div>
      </div>
    </header>
  );
}
