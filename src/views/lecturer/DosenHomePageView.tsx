import { useNavigate } from "@tanstack/react-router";
import { useCallback } from "react";
import { Button } from "uper-ui/button";
import { Card, CardContent } from "uper-ui/card";
import { BuildingIcon, CalendarIcon } from "uper-ui/icon";
import { Typography } from "uper-ui/typography";
import { MainMenu } from "@/components/main-menu";
import { MAIN_MENU_LIST_CONFIG } from "@/lib/main-menu-list.config";

type ActivityItem = {
  id: string;
  title: string;
  location: string;
  date: string;
  statusLabel: string;
};

const activityItems: Array<ActivityItem> = [
  {
    id: "1",
    title: "Proyektor Epson, ...",
    location: "Griya Legita - 2805",
    date: "29 November 2025",
    statusLabel: "Sedang Dikerjakan",
  },
  {
    id: "2",
    title: "Proyektor Epson, ...",
    location: "Griya Legita - 2805",
    date: "29 November 2025",
    statusLabel: "Sedang Dikerjakan",
  },
  {
    id: "3",
    title: "Proyektor Epson, ...",
    location: "Griya Legita - 2805",
    date: "29 November 2025",
    statusLabel: "Sedang Dikerjakan",
  },
];

function StatusPill({ label }: { label: string }) {
  return (
    <div className="inline-flex items-center rounded-full bg-red-400 px-[12px] py-[3.5px] text-[12px] leading-none font-semibold text-white">
      <Typography
        variant="caption-pixie"
        className="font-regular text-[10px] text-white"
      >
        {label}
      </Typography>
    </div>
  );
}

export function DosenHomePageView() {
  const navigate = useNavigate();
  const name = "Meredita";

  const scanPageRedirect = useCallback(() => {
    navigate({
      to: "/lecturer/scan",
    });
  }, [navigate]);

  return (
    <div className="">
      {/* Greeting */}
      <div className="mt-[16px] mb-[32px]">
        <Typography variant="body-medium-semibold" className="text-gray-800">
          Selamat Datang, {name}!
        </Typography>
      </div>

      {/* BAGIAN SCAN PERMASALAHAN ASET INI HANYA UNTUK DOSEN */}
      <div className="rounded-2xl bg-red-400 p-4 text-white">
        <Typography
          variant="body-large-semibold"
          className="leading-5 text-white"
        >
          Ada masalah aset?
        </Typography>
        <Typography variant="caption-small" className="text-white">
          Pindai QR code di ruangan untuk melapor.
        </Typography>

        <div className="mt-3">
          <Button
            className="w-full rounded-xl bg-white text-red-400 hover:bg-white/90"
            variant="primary"
            onClick={scanPageRedirect}
          >
            <Typography variant="body-medium" className="text-red-400">
              Pindai Kode QR
            </Typography>
          </Button>
        </div>
      </div>

      {/* <MainMenu /> */}
      {MAIN_MENU_LIST_CONFIG.map((menu) => (
        <MainMenu key={menu.id} {...menu} />
      ))}

      {/* Activity */}
      <div className="mt-10">
        <Card className="mt-3" elevation="low">
          <Typography
            variant="body-medium-semibold"
            className="px-[16px] text-gray-900"
          >
            Aktivitas Terakhir
          </Typography>
          <CardContent className="px-[16px]">
            {activityItems.map((item, idx) => {
              const isLast = idx === activityItems.length - 1;
              return (
                <div
                  key={item.id}
                  className={
                    !isLast
                      ? "mb-1 border-b border-dashed border-gray-400 pb-1"
                      : ""
                  }
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <Typography
                        variant="caption-small-semibold"
                        className="truncate text-gray-900"
                      >
                        {item.title}
                      </Typography>
                    </div>
                    <StatusPill label={item.statusLabel} />
                  </div>

                  <div className="mt-2 flex flex-wrap items-center gap-x-10 gap-y-2 text-gray-600">
                    <div className="inline-flex items-center gap-1">
                      <BuildingIcon className="h-5 w-5" color="currentColor" />
                      <Typography
                        variant="caption-pixie-semibold"
                        className="text-gray-600"
                      >
                        {item.location}
                      </Typography>
                    </div>
                    <div className="inline-flex items-center gap-1">
                      <CalendarIcon className="h-5 w-5" color="currentColor" />
                      <Typography
                        variant="caption-pixie-semibold"
                        className="text-gray-600"
                      >
                        {item.date}
                      </Typography>
                    </div>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
