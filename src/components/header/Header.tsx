import { useNavigate } from "@tanstack/react-router";
import type { MouseEventHandler, ReactNode } from "react";
import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
} from "uper-ui/dropdown";
import { LogoutIcon, NotificationIcon, ProfileIcon, SettingIcon } from "uper-ui/icon";
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
}

export function Header({
  variant: _variant = "default",
  logoSrc = "/images/logo-banner.png",
  logoAlt = "MORGAN",
  title = ["M", "O", "R", "G", "A", "N"],
  subtitle = "Sistem Pelaporan Aset",
  maxWidthClassName,
  className,
}: HeaderProps) {
  const resolvedMaxWidth = maxWidthClassName || "max-w-auto";
  const name = "Agus";
  const role = "Teknisi IT";

  const navigate = useNavigate();
  const notification = () => {
    navigate ({
      to: "/fm-it/notification",
    });
  };

  return (
    <header
      className={cn(
        "max-w-auto bg-linear-to-l from-navbar-gradient-end to-background",
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

            <Typography
              variant="caption-pixie-semibold"
              className=""
            >
              {subtitle}
            </Typography>
          </div>
          
          <Dropdown>
            <DropdownTrigger asChild>
              <button className="ml-auto flex items-center gap-1 outline-none">
                <div className="flex items-center justify-center h-8 w-8 bg-blue-100 rounded-full">
                  <ProfileIcon />
                </div>

                <div className="flex flex-col items-center">
                  <Typography variant="body-large-semibold">{name}</Typography>
                  <Typography variant="caption-pixie">{role}</Typography>
                </div>
              </button>
            </DropdownTrigger>
            <DropdownContent align="end" className="w-48">
              <DropdownItem className="gap-2" onSelect={notification}>
                  <NotificationIcon className="h-5 w-5" />
                  <Typography variant="body-small">Notifikasi</Typography>
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
      </div>
    </header>
  );
}
