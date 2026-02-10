import { Link } from "@tanstack/react-router";
import { Button } from "uper-ui/button";
import { Card, CardContent } from "uper-ui/card";
import { BuildingIcon, CalendarIcon, MailIcon } from "uper-ui/icon";
import { Typography } from "uper-ui/typography";

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
    <div className="inline-flex items-center rounded-full bg-primary px-[12px] py-[3.5px] text-[12px] leading-none font-semibold text-white">
      <Typography variant="pixie" className="text-white">
        {label}
      </Typography>
    </div>
  );
}

export function DosenHomePageView() {
  const name = "Meredita";

  return (
    <div className="">
      {/* Greeting */}
      <div className="mt-[90px] mb-[32px]">
        <Typography variant="body-medium" className="text-gray-800">
          Selamat Datang, <span className="font-bold">{name}!</span>
        </Typography>
      </div>

      {/* Primary actions */}
      <div className="mt-4 flex flex-col gap-4">
        <div className="rounded-2xl bg-primary p-4 text-white">
          <Typography
            variant="body-medium-bold"
            className="leading-5 text-white"
          >
            Ada masalah aset?
          </Typography>
          <Typography variant="caption" className="text-white">
            Pindai QR code di ruangan untuk melapor.
          </Typography>

          <div className="mt-4">
            <Button
              asChild
              className="w-full rounded-xl bg-white text-primary hover:bg-white/90"
              variant="primary"
            >
              <Link to="/lecturer/scan">
                <span className="flex items-center justify-center gap-2">
                  <Typography variant="body-medium" className="text-primary">
                    Pindai Kode QR
                  </Typography>
                </span>
              </Link>
            </Button>
          </div>
        </div>

        <a
          href="#"
          className="block"
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          <div className="flex items-center gap-3 rounded-2xl bg-primary p-4 text-white">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl">
              <MailIcon className="h-10 w-10" color="white" />
            </div>
            <div className="flex flex-col">
              <Typography variant="body-medium-bold" className="text-white">
                Daftar Laporan
              </Typography>
              <Typography variant="caption" className="text-white">
                Lihat daftar laporan anda
              </Typography>
            </div>
          </div>
        </a>
      </div>

      {/* Activity */}
      <div className="mt-5">
        <Card className="mt-3" elevation="low">
          <Typography
            variant="body-medium-bold"
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
                      ? "mb-2 border-b border-dashed border-gray-400 pb-2"
                      : ""
                  }
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <Typography
                        variant="caption-bold"
                        className="truncate text-gray-900"
                      >
                        {item.title}
                      </Typography>
                    </div>
                    <StatusPill label={item.statusLabel} />
                  </div>

                  <div className="mt-2 flex flex-wrap items-center gap-x-6 gap-y-2 text-gray-600">
                    <div className="inline-flex items-center gap-2">
                      <BuildingIcon className="h-5 w-5" color="currentColor" />
                      <Typography
                        variant="pixie-bold"
                        className="text-gray-600"
                      >
                        {item.location}
                      </Typography>
                    </div>
                    <div className="inline-flex items-center gap-2">
                      <CalendarIcon className="h-5 w-5" color="currentColor" />
                      <Typography
                        variant="pixie-bold"
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
