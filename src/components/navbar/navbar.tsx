import { Link, useRouter } from "@tanstack/react-router";
import { useCallback, useMemo, useState } from "react";
import { Button } from "@/components/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/dialog";
import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
} from "@/components/dropdown";
import {
  BurgerMenuIcon,
  NotificationIcon,
  SearchIcon,
  SettingIcon,
} from "@/components/icon";

import { Separator } from "@/components/separator";
import Typography from "@/components/typography/typography";
import { clearToken } from "@/lib/auth";

interface NavbarProps {
  userType: string;
  isCollapsed?: boolean;
  onToggle?: () => void;
}

export default function Navbar({ userType }: NavbarProps) {
  const user = useMemo(
    () => ({
      name: "Karla Suswono",
      email: "karla@universitaspertamina.ac.id",
    }),
    []
  );

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  const router = useRouter();

  const handleLogout = useCallback(() => {
    clearToken();
    router.navigate({
      to: "/login",
    });
  }, [router]);

  // Memoize date formatting options
  const dateOptions = useMemo<Intl.DateTimeFormatOptions>(
    () => ({
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    []
  );

  const timeOptions = useMemo<Intl.DateTimeFormatOptions>(
    () => ({
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Asia/Jakarta",
    }),
    []
  );

  // Get current date and time
  const currentDate = new Date();
  const formattedDate = useMemo(
    () => currentDate.toLocaleDateString("id-ID", dateOptions),
    [currentDate, dateOptions]
  );
  const formattedTime = useMemo(
    () => currentDate.toLocaleTimeString("id-ID", timeOptions) + " WIB",
    [currentDate, timeOptions]
  );

  return (
    <header className="flex w-full border-b border-border bg-background">
      <Dialog open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        {!isMobileMenuOpen && (
          <DialogTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="m-4 block shrink-0 md:hidden"
            >
              <div className="flex items-center justify-center">
                <BurgerMenuIcon className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </div>
            </Button>
          </DialogTrigger>
        )}

        <DialogContent
          side="left"
          className="flex w-80 max-w-[80vw] flex-col p-0"
          aria-describedby={undefined}
        >
          <DialogTitle className="sr-only">Mobile Navigation</DialogTitle>

          <div className="flex h-14 items-center justify-between border-b px-4">
            <Link
              to="/"
              className="flex items-center gap-2 font-semibold"
              onClick={closeMobileMenu}
            >
              <img
                src="/images/logo-banner.png"
                className="h-auto w-8"
                width={32}
                height={40}
                loading="lazy"
                alt="logo"
              />
              <Typography variant="body-small-bold" as="span">
                SIAKUP
              </Typography>
            </Link>
          </div>
          <div className="border-t p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-avatar-bg" />
                <div className="min-w-0 flex-1">
                  <Typography
                    variant="body-small-bold"
                    className="truncate"
                    as="p"
                  >
                    {user.name}
                  </Typography>
                  <Typography
                    variant="caption-small"
                    className="text-gray-600 capitalize"
                    as="p"
                  >
                    {userType}
                  </Typography>
                </div>
              </div>
              <Button
                variant="ghost"
                size="md"
                onClick={handleLogout}
                className="text-red-600 hover:bg-red-50 hover:text-red-700"
              >
                Logout
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Left Section - Welcome and Search */}
      <div className="flex flex-1 flex-col gap-2 border-r border-border px-5 py-[30px]">
        <div className="flex items-center gap-[91px]">
          <Typography variant="h5" as="h1">
            Selamat Datang, {user.name.split(" ")[0]}!
          </Typography>

          {/* Search Input */}
          <div className="hidden w-[301px] items-center gap-3 rounded-lg border border-input bg-background px-3 py-2 lg:flex">
            <SearchIcon className="h-5 w-5 text-gray-600" />
            <input
              type="text"
              placeholder="Cari"
              className="flex-1 bg-transparent text-sm text-muted-foreground outline-none"
            />
          </div>
        </div>

        {/* Date and Time */}
        <div className="flex flex-col gap-1">
          <Typography variant="body-small" className="text-gray-600" as="p">
            {formattedDate}
          </Typography>
          <Typography variant="caption-pixie" className="text-gray-600" as="p">
            {formattedTime}
          </Typography>
        </div>
      </div>

      {/* Right Section - User Info with gradient background */}
      <div className="flex flex-col gap-2 bg-gradient-to-r from-background to-navbar-gradient-end px-10 py-[30px]">
        <div className="flex items-center gap-[85px]">
          {/* User Avatar and Name */}
          <Dropdown>
            <DropdownTrigger asChild>
              <button className="flex items-center gap-3 transition-opacity hover:opacity-80">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-avatar-bg" />
                <Typography variant="body-medium-bold" as="p">
                  {user.name}
                </Typography>
              </button>
            </DropdownTrigger>
            <DropdownContent align="end" className="w-48">
              <div className="px-2 py-1.5">
                <Typography variant="body-small-bold" as="p">
                  {user.name}
                </Typography>
                <Typography
                  variant="caption-small"
                  className="text-gray-600 capitalize"
                  as="p"
                >
                  {userType}
                </Typography>
              </div>
              <Separator />
              <DropdownItem
                onClick={handleLogout}
                className="text-red-600 focus:bg-red-50 focus:text-red-700"
              >
                Logout
              </DropdownItem>
            </DropdownContent>
          </Dropdown>

          {/* Notification and Settings Icons */}
          <div className="flex items-center gap-5">
            <button className="transition-opacity hover:opacity-80">
              <NotificationIcon className="h-8 w-8" />
            </button>
            <button className="transition-opacity hover:opacity-80">
              <SettingIcon className="h-8 w-8" />
            </button>
          </div>
        </div>

        {/* Academic Period Info */}
        <div className="flex flex-col gap-1">
          <Typography variant="caption-small" className="text-gray-600" as="p">
            Periode Akademik: 2024 - 2025
          </Typography>
          <Typography variant="caption-pixie" className="text-gray-600" as="p">
            (Admin - Universitas Pertamina)
          </Typography>
        </div>
      </div>
    </header>
  );
}
