import {
  AttendanceIcon,
  BillIcon,
  FileIcon,
  MailIcon,
  NotificationIcon,
} from "uper-ui/icon";

export const MAIN_MENU_LIST_CONFIG = [
  {
    id: 1,
    to: "/lecturer/my-report",
    icon: MailIcon,
    title: "Daftar Laporan",
    description: "Lihat daftar laporan anda",
    variant: "primary",
  },
  {
    id: 2,
    to: "/housekeeping/checklist-dashboard",
    icon: MailIcon,
    title: "Daftar Ruangan",
    description: "Lihat daftar ruangan yang harus di cek",
    variant: "primary",
  },
  {
    id: 3,
    to: "/housekeeping/report-history",
    icon: FileIcon,
    title: "Daftar Laporan",
    description: "Lihat daftar laporan anda",
    variant: "primary",
  },
  {
    id: 4,
    to: "/fm-it/ticket-list",
    icon: NotificationIcon,
    title: "Lihat dan Ambil Tiket",
    description: "Lihat daftar laporan tiket",
    variant: "primary",
  },
  {
    id: 5,
    to: "/fm-it/ticket-detail",
    icon: BillIcon,
    title: "Tiket Anda",
    description: "Lihat detail status tiket yang anda kerjakan",
    variant: "primary",
  },
  {
    id: 6,
    to: "/fm-it/ticket-list",
    icon: AttendanceIcon,
    title: "Riwayat Tiket Anda",
    description: "Daftar laporan yang pernah anda kerjakan",
    variant: "primary",
  },
] as const;
