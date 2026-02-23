import { Link } from "@tanstack/react-router";
import type { MouseEventHandler, ReactNode } from "react";
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

  title?: Array<string>;
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
  title = ["M", "O", "R", "G", "A", "N"],
  subtitle = "Sistem Pelaporan Aset",
  maxWidthClassName,
  className,
  onNotificationClick,
  onSettingsClick,
  onLogoutClick,
}: HeaderProps) {
  const resolvedMaxWidth = maxWidthClassName || "max-w-auto";
  const name = "Agus";
  const role = "Teknisi IT";

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
          <div className="flex flex-col content-between gap-1">
            <div className="flex flex-row justify-between">
              {title.map((item, index) => (
                <Typography
                  key={index}
                  variant="body-large-semibold"
                  className="leading-4 text-gray-800"
                >
                  {item}
                </Typography>
              ))}
            </div>

            <Typography variant="caption-pixie-semibold" className="">
              {subtitle}
            </Typography>
          </div>

          <Dropdown>
            <DropdownTrigger asChild>
              <button className="ml-auto flex items-center gap-1 outline-none">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                  <ProfileIcon />
                </div>

                <div className="flex flex-col items-center">
                  <Typography variant="body-large-semibold">{name}</Typography>
                  <Typography variant="caption-pixie">{role}</Typography>
                </div>
              </button>
            </DropdownTrigger>
            <DropdownContent align="end" className="w-48">
              <DropdownItem className="gap-2">
                <Link
                  to="/fm-it/notification"
                  className="flex items-center gap-2"
                >
                  <NotificationIcon className="h-5 w-5" />
                  <Typography variant="body-small">Notifikasi</Typography>
                </Link>
              </DropdownItem>
              <DropdownItem className="gap-2">
                <SettingIcon className="h-5 w-5" />
                <Typography variant="body-small">Pengaturan</Typography>
              </DropdownItem>
              <DropdownItem className="gap-2">
                <LogoutIcon className="h-5 w-5" />
                <Typography variant="body-small">Keluar</Typography>
              </DropdownItem>
            </DropdownContent>
          </Dropdown>
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
