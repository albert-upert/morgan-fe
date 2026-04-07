import type { ComponentType } from "react";
import {
  AttendanceIcon,
  BillIcon,
  FileIcon,
  MailIcon,
  NotificationIcon,
} from "uper-ui/icon";

export type AppRole = "lecturer" | "hk" | "supervisor" | "fm-it" | "admin";

export type MainMenuFeature =
  | "daftarLaporanDosen"
  | "daftarRuangan"
  | "daftarLaporanHk"
  | "lihatAmbilTiket"
  | "tiketAnda"
  | "riwayatTiketAnda";

type MainMenuItem = {
  id: number;
  feature: MainMenuFeature;
  to: string;
  icon: ComponentType<{ className?: string }>;
  title: string;
  description: string;
  variant: "primary";
  allowedRoles: ReadonlyArray<AppRole>;
};

export function resolveAppRole(roleName?: string | null): AppRole | null {
  const normalizedRole = (roleName ?? "").trim().toLowerCase();
  if (
    normalizedRole === "lecturer" ||
    normalizedRole === "fm-it" ||
    normalizedRole === "hk" ||
    normalizedRole === "admin" ||
    normalizedRole === "supervisor"
  ) {
    return normalizedRole;
  }
  return null;
}

export const MAIN_MENU_LIST_CONFIG: ReadonlyArray<MainMenuItem> = [
  {
    id: 1,
    feature: "daftarLaporanDosen",
    to: "/ticket",
    icon: MailIcon,
    title: "Daftar Laporan",
    description: "Lihat daftar laporan anda",
    variant: "primary",
    allowedRoles: ["lecturer"],
  },
  {
    id: 2,
    feature: "daftarRuangan",
    to: "/checklist-dashboard",
    icon: MailIcon,
    title: "Daftar Ruangan",
    description: "Lihat daftar ruangan yang harus di cek",
    variant: "primary",
    allowedRoles: ["hk"],
  },
  {
    id: 3,
    feature: "daftarLaporanHk",
    to: "/report-history",
    icon: FileIcon,
    title: "Daftar Laporan",
    description: "Lihat daftar laporan anda",
    variant: "primary",
    allowedRoles: ["hk"],
  },
  {
    id: 4,
    feature: "lihatAmbilTiket",
    to: "/ticket",
    icon: NotificationIcon,
    title: "Lihat dan Ambil Tiket",
    description: "Lihat daftar laporan tiket",
    variant: "primary",
    allowedRoles: ["fm-it"],
  },
  {
    id: 5,
    feature: "tiketAnda",
    to: "/ticket",
    icon: BillIcon,
    title: "Tiket Anda",
    description: "Lihat detail status tiket yang anda kerjakan",
    variant: "primary",
    allowedRoles: ["fm-it"],
  },
  {
    id: 6,
    feature: "riwayatTiketAnda",
    to: "/ticket",
    icon: AttendanceIcon,
    title: "Riwayat Tiket Anda",
    description: "Daftar laporan yang pernah anda kerjakan",
    variant: "primary",
    allowedRoles: ["fm-it"],
  },
];

export function getMainMenuByRole(role: AppRole | null) {
  if (!role) return [];
  return MAIN_MENU_LIST_CONFIG.filter((menu) =>
    menu.allowedRoles.includes(role)
  );
}
