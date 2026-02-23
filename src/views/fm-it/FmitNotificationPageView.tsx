import { useNavigate } from "@tanstack/react-router";
import React, { useState } from "react";
import { Button } from "uper-ui/button";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CautionIcon,
  ClockIcon,
  NotificationIcon,
} from "uper-ui/icon";
import { Typography } from "uper-ui/typography";

export type Notification = {
  id: number;
  date: string;
  tipe: "task" | "reminder" | "info";
  title: string;
  description: string;
  timestamp: string;
  isNew?: boolean;
};

export function FmitNotificationPageView() {
  const navigate = useNavigate();

  const home = () => {
    navigate({
      href: "/fm-it/home",
    });
  };

  const [notifications, setNotifications] = useState<Array<Notification>>([
    {
      id: 1,
      date: "Jumat, 20 Feb 2026",
      tipe: "task",
      title: "Tiket Baru: Critical!",
      description:
        "Server R. IT Down. Segera menuju lokasi. SLA Respon: 15 menit.",
      timestamp: new Date(Date.now() - 1000 * 60 * 1).toISOString(),
      isNew: true,
    },
    {
      id: 2,
      date: "Jumat, 20 Feb 2026",
      tipe: "reminder",
      title: "SLA Hampir Habis!",
      description:
        "Tiket #TK-901(Smartboard Mati) tersisa 10 menit sebelum melanggar SLA",
      timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
      isNew: true,
    },
    {
      id: 3,
      date: "Jumat, 20 Feb 2026",
      tipe: "info",
      title: "Tugas Preventive Maintenance ",
      description: "Jadwal bulanan pengecekan UPS Gedung Rektorat tersedia.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
    },
    {
      id: 4,
      date: "Kamis, 19 Feb 2026",
      tipe: "task",
      title: "Tiket Baru Masuk",
      description: "Laporan lampu mati di Ruang Rapat Utama",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 28).toISOString(), // 1 day 4 hours ago
    },
    {
      id: 5,
      date: "Minggu Lalu",
      tipe: "info",
      title: "Update Sistem",
      description: "Sistem MORGAN telah diperbarui ke versi 2.0",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(), // 5 days ago
    },
  ]);

  const getRelativeTime = (isoString: string) => {
    const date = new Date(isoString);
    const now = new Date();

    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return "Sekarang";
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) return `${diffInMinutes} menit yang lalu`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    return `${diffInHours} jam yang lalu`;
  };

  const handleNotificationClick = (id: number) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id
          ? { ...notification, isNew: false }
          : notification
      )
    );
  };

  const groupedNotifications = notifications.reduce(
    (acc, curr) => {
      if (!acc[curr.date]) {
        acc[curr.date] = [];
      }
      acc[curr.date]?.push(curr);
      return acc;
    },
    {} as Record<string, Array<Notification> | undefined>
  );

  const getIcon = (tipe: string) => {
    switch (tipe) {
      case "task":
        return <CautionIcon className="h-5 w-5" color="red" />;
      case "reminder":
        return <ClockIcon className="h-5 w-5" color="red" />;
      default:
        return <NotificationIcon className="h-5 w-5" color="red" />;
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Back */}
      <div className="">
        <Button className="px-3" variant="tertiary" onClick={home}>
          <React.Fragment key=".0">
            <ArrowLeftIcon />
            Kembali
          </React.Fragment>
        </Button>
      </div>

      <div className="">
        <Typography variant="h4-semibold">Notifikasi</Typography>
      </div>

      <div className="flex flex-col gap-6">
        {Object.keys(groupedNotifications).map((date) => (
          <div key={date} className="flex flex-col gap-3">
            <Typography variant="body-small-semibold">{date}</Typography>
            <div className="flex w-full flex-col">
              {groupedNotifications[date]?.map((item) => (
                <div
                  key={item.id}
                  className={`flex w-full flex-col border-b border-dashed p-3 ${item.isNew ? "bg-gray-200" : ""}`}
                  onClick={() => handleNotificationClick(item.id)}
                >
                  <div className="flex w-full flex-row items-start gap-3">
                    <div className="flex h-5 w-5 items-center justify-center">
                      {getIcon(item.tipe)}
                    </div>

                    <div className="flex w-full flex-col gap-1">
                      <div className="flex w-full flex-row items-start justify-between">
                        <Typography variant="body-small-semibold">
                          {item.title}
                        </Typography>
                        <Typography
                          variant="caption-pixie"
                          className="text-gray-600"
                        >
                          {getRelativeTime(item.timestamp)}
                        </Typography>
                      </div>

                      <Typography variant="caption-small" className="">
                        {item.description}
                      </Typography>

                      {(item.tipe === "task" || item.tipe === "reminder") && (
                        <Button className="h-fit w-fit p-1" variant="tertiary">
                          <Typography
                            variant="caption-pixie"
                            className="text-red-500"
                          >
                            {item.tipe === "task"
                              ? "Terima Tugas"
                              : "Lihat Detail"}
                          </Typography>
                          <React.Fragment key=".0">
                            <ArrowRightIcon />
                          </React.Fragment>
                        </Button>
                      )}
                    </div>

                    {item.isNew && (
                      <div className="mb-auto h-2 w-2 rounded-full bg-red-500"></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
