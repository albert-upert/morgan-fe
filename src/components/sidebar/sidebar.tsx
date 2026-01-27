import { Link, useLocation } from "@tanstack/react-router";
import type { ComponentType, MouseEventHandler } from "react";
import { memo, useCallback, useMemo, useState } from "react";
import {
  AdminIcon,
  AlertIcon,
  AssignIcon,
  BillIcon,
  BookIcon,
  BubbleIcon,
  CaretUpIcon,
  CourseIcon,
  CurriculumIcon,
  DashboardIcon,
  FileIcon,
  ListIcon,
  LockIcon,
  MailIcon,
  MessageIcon,
  ProfileIcon,
  ScheduleIcon,
  SettingIcon,
} from "@/components/icon";

import Typography from "@/components/typography/typography";
import { cn } from "@/lib/utils";

interface SidebarProps {
  userType: string;
  isCollapsed: boolean;
  onToggle: () => void;
}

interface SubMenuItem {
  to: string;
  label: string;
}

interface NavItemProps {
  to: string;
  icon: ComponentType<{ className?: string; color?: string }>;
  label: string;
  isActive: boolean;
  isCollapsed: boolean;
  hasDropdown?: boolean;
  subMenuItems?: Array<SubMenuItem>;
  isExpanded?: boolean;
  onToggleExpand?: () => void;
}

const NavItem = memo(function NavItem({
  to,
  icon: Icon,
  label,
  isActive,
  isCollapsed,
  hasDropdown = false,
  subMenuItems,
  isExpanded,
  onToggleExpand,
}: NavItemProps) {
  const location = useLocation();
  const pathname = location.pathname;

  const handleClick: MouseEventHandler<HTMLAnchorElement> = useCallback(
    (e) => {
      if (hasDropdown && subMenuItems && onToggleExpand) {
        e.preventDefault();
        onToggleExpand();
      }
    },
    [hasDropdown, subMenuItems, onToggleExpand]
  );

  return (
    <>
      <Link
        to={to}
        onClick={handleClick}
        className={`group relative flex items-center transition-all ${
          isActive
            ? "border-r border-border bg-sidebar-accent"
            : "bg-white hover:bg-gray-100"
        }`}
      >
        {isActive && (
          <div className="h-12 w-1 shrink-0 rounded-tr-lg rounded-br-lg bg-primary" />
        )}
        <div
          className={`flex flex-1 items-center gap-3 px-3 py-3 ${!isActive ? "pl-4" : ""}`}
        >
          <Icon
            className={cn(
              "h-6 w-6 shrink-0",
              isActive ? "text-primary" : "text-foreground"
            )}
          />
          {isCollapsed ? (
            <div className="absolute left-full z-50 ml-2 rounded bg-gray-800 px-2 py-1 text-xs whitespace-nowrap text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
              {label}
            </div>
          ) : (
            <div className="flex flex-1 items-center justify-between gap-3 pr-3">
              <span
                className={`text-base font-medium whitespace-nowrap ${
                  isActive ? "text-primary" : "text-foreground"
                }`}
              >
                {label}
              </span>
              {hasDropdown && (
                <CaretUpIcon
                  className={`h-4 w-4 transition-transform ${
                    isActive ? "text-primary" : "text-gray-800"
                  } ${isExpanded ? "" : "rotate-180"}`}
                />
              )}
            </div>
          )}
        </div>
      </Link>

      {/* Submenu */}
      {hasDropdown && subMenuItems && isExpanded && !isCollapsed && (
        <div className="border-r border-b border-border bg-gray-100">
          {subMenuItems.map((item) => {
            const isSubActive = pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center border-r border-b border-border px-3 py-3 pl-[60px] transition-colors ${
                  isSubActive ? "bg-gray-100" : "bg-gray-100 hover:bg-gray-50"
                }`}
              >
                <Typography
                  variant="body-medium"
                  className={isSubActive ? "font-bold text-primary" : ""}
                  as="span"
                >
                  {item.label}
                </Typography>
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
});

export default function Sidebar({
  isCollapsed,
  onToggle: _onToggle,
}: SidebarProps) {
  const location = useLocation();
  const pathname = location.pathname;
  const [isConfigExpanded, setIsConfigExpanded] = useState(
    pathname.startsWith("/configuration")
  );

  const toggleConfigExpanded = useCallback(() => {
    setIsConfigExpanded((prev) => !prev);
  }, []);

  const configurationSubMenu = useMemo<Array<SubMenuItem>>(
    () => [
      {
        to: "/configuration/user-management",
        label: "Manajemen Pengguna",
      },
      {
        to: "/configuration/role-management",
        label: "Manajemen Peran",
      },
      { to: "/configuration/academic/period", label: "Akademik" },
      { to: "/configuration/institution", label: "Institusi" },
      { to: "/configuration/users", label: "Pengguna" },
      {
        to: "/configuration/academic-period",
        label: "Periode Akademik",
      },
      {
        to: "/configuration/course-type",
        label: "Jenis Mata Kuliah",
      },
      { to: "/configuration/research", label: "Riset" },
      { to: "/configuration/roles", label: "Peran" },
      { to: "/configuration/administration", label: "Administrasi" },
      {
        to: "/configuration/survey-questions",
        label: "Pertanyaan Survei",
      },
    ],
    []
  );

  return (
    <div
      className={`relative flex h-full max-h-screen flex-col bg-white ${isCollapsed ? "overflow-visible" : "overflow-y-auto"}`}
    >
      {/* Header with Logo */}
      <div className="flex h-[120px] items-center justify-center border-r border-border bg-white px-[59px] pt-5">
        <Link to="/" className="flex h-24 w-full items-center justify-center">
          <img
            src="/images/logo-banner.png"
            className="h-full max-w-full object-contain"
            alt="logo"
          />
        </Link>
      </div>

      {/* System Title */}
      {!isCollapsed && (
        <div className="flex h-[49px] items-center justify-center border-r border-b border-border bg-white px-4 py-3">
          <div className="flex flex-col items-center gap-0.5">
            {/* Text */}
            <Typography
              variant="caption"
              className="text-center text-accent"
              as="p"
            >
              Sistem <span className="text-primary">Informasi</span>{" "}
              <span className="text-secondary">Akademik</span>
            </Typography>
            {/* Decorative underlines */}
            <div className="flex items-center justify-center gap-1">
              <div className="h-0.5 w-10 bg-accent" />
              <div className="h-0.5 w-[54px] bg-primary" />
              <div className="h-0.5 w-[59px] bg-secondary" />
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div
        className={`flex-1 border-r border-border ${isCollapsed ? "overflow-hidden" : "overflow-y-auto"}`}
      >
        <nav className="flex flex-col">
          <NavItem
            to="/"
            icon={DashboardIcon}
            label="Beranda"
            isActive={pathname === "/"}
            isCollapsed={isCollapsed}
          />
          <NavItem
            to="/curriculum/list"
            icon={CurriculumIcon}
            label="Kurikulum"
            isActive={pathname.startsWith("/curriculum")}
            isCollapsed={isCollapsed}
          />
          <NavItem
            to="/course"
            icon={CourseIcon}
            label="Mata Kuliah"
            isActive={pathname === "/course" || pathname.startsWith("/course/")}
            isCollapsed={isCollapsed}
          />
          <NavItem
            to="/course-schedule"
            icon={ScheduleIcon}
            label="Jadwal Kuliah"
            isActive={pathname.startsWith("/course-schedule")}
            isCollapsed={isCollapsed}
          />
          <NavItem
            to="/auto-assign"
            icon={AssignIcon}
            label="Auto Assign Peserta Kelas"
            isActive={pathname.startsWith("/auto-assign")}
            isCollapsed={isCollapsed}
          />
          <NavItem
            to="/profile"
            icon={ProfileIcon}
            label="Profile"
            isActive={pathname.startsWith("/profile")}
            isCollapsed={isCollapsed}
          />
          <NavItem
            to="/academic-calendar"
            icon={AdminIcon}
            label="Kalendar Akademik"
            isActive={pathname.startsWith("/academic-calendar")}
            isCollapsed={isCollapsed}
          />
          <NavItem
            to="/messages"
            icon={MailIcon}
            label="Pesan"
            isActive={pathname.startsWith("/messages")}
            isCollapsed={isCollapsed}
          />
          <NavItem
            to="/announcements"
            icon={AlertIcon}
            label="Pengumuman"
            isActive={pathname.startsWith("/announcements")}
            isCollapsed={isCollapsed}
          />
          <NavItem
            to="/configuration"
            icon={SettingIcon}
            label="Konfigurasi"
            isActive={pathname.startsWith("/configuration")}
            isCollapsed={isCollapsed}
            hasDropdown={true}
            subMenuItems={configurationSubMenu}
            isExpanded={isConfigExpanded}
            onToggleExpand={toggleConfigExpanded}
          />
          <NavItem
            to="/staff-management"
            icon={BubbleIcon}
            label="Manajemen Staf Pengajar"
            isActive={pathname.startsWith("/staff-management")}
            isCollapsed={isCollapsed}
          />
          <NavItem
            to="/research"
            icon={BookIcon}
            label="Penelitian"
            isActive={pathname.startsWith("/research")}
            isCollapsed={isCollapsed}
          />
          <NavItem
            to="/payment"
            icon={BillIcon}
            label="Pembayaran (Mahasiswa)"
            isActive={pathname.startsWith("/payment")}
            isCollapsed={isCollapsed}
          />
          <NavItem
            to="/reports"
            icon={FileIcon}
            label="Laporan"
            isActive={pathname.startsWith("/reports")}
            isCollapsed={isCollapsed}
          />
          <NavItem
            to="/survey"
            icon={ListIcon}
            label="Manajemen Survei"
            isActive={pathname.startsWith("/survey")}
            isCollapsed={isCollapsed}
          />
          <NavItem
            to="/faq"
            icon={MessageIcon}
            label="Manajemen FAQ"
            isActive={pathname.startsWith("/faq")}
            isCollapsed={isCollapsed}
          />
          <NavItem
            to="/guide"
            icon={BookIcon}
            label="Petunjuk Penggunaan"
            isActive={pathname.startsWith("/guide")}
            isCollapsed={isCollapsed}
          />
          <NavItem
            to="/change-password"
            icon={LockIcon}
            label="Ganti Kata Sandi"
            isActive={pathname.startsWith("/change-password")}
            isCollapsed={isCollapsed}
          />
        </nav>
      </div>

      {/* Footer */}
      {!isCollapsed && (
        <div className="border-t border-r border-border bg-white px-[6px] py-10">
          <Typography variant="caption" className="text-center" as="p">
            Copyright © 2025 Universitas Pertamina.
            <br />
            All Rights Reserved.
          </Typography>
        </div>
      )}
    </div>
  );
}
