import { Link } from "@tanstack/react-router";
import { Button } from "@/components/button";
import { Card, CardContent } from "@/components/card";
import { MailIcon } from "@/components/icon";
import Typography from "@/components/typography/typography";

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
    <div className="inline-flex items-center rounded-full bg-sky-500 px-3 py-1 text-[10px] font-semibold text-white">
      {label}
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
        <div className="rounded-2xl bg-[#EF4444] p-4 text-white">
          <Typography variant="body-medium-bold" className="text-white">
            Ada masalah aset?
          </Typography>
          <Typography variant="pixie" className="mt-1 text-white/90">
            Pindai QR code di ruangan untuk melapor.
          </Typography>

          <div className="mt-4">
            <Button
              asChild
              className="w-full rounded-xl bg-white text-[#EF4444] hover:bg-white/90"
              variant="primary"
            >
              <Link to="/dosen/scan">
                <span className="flex items-center justify-center gap-2">
                  <MailIcon className="h-5 w-5" color="currentColor" />
                  Pindai Kode QR
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
          <div className="flex items-center gap-3 rounded-2xl bg-[#EF4444] p-4 text-white">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20">
              <MailIcon className="h-6 w-6" color="white" />
            </div>
            <div className="flex flex-col">
              <Typography variant="body-medium-bold" className="text-white">
                Daftar Laporan
              </Typography>
              <Typography variant="pixie" className="text-white/90">
                Lihat daftar laporan anda
              </Typography>
            </div>
          </div>
        </a>
      </div>

      {/* Activity */}
      <div className="mt-5">
        <Typography variant="body-medium-bold" className="text-gray-900">
          Aktivitas Terakhir
        </Typography>

        <Card className="mt-3" elevation="low">
          <CardContent className="p-4">
            <div className="flex flex-col gap-4">
              {activityItems.map((item) => (
                <div key={item.id} className="flex items-start gap-3">
                  <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-gray-200">
                    <Typography variant="pixie-bold" className="text-gray-700">
                      S
                    </Typography>
                  </div>

                  <div className="flex flex-1 flex-col gap-2">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <Typography
                          variant="body-small-bold"
                          className="truncate"
                        >
                          {item.title}
                        </Typography>
                        <Typography
                          variant="pixie"
                          className="mt-0.5 text-gray-600"
                        >
                          {item.location}
                        </Typography>
                      </div>
                      <StatusPill label={item.statusLabel} />
                    </div>

                    <Typography variant="pixie" className="text-gray-600">
                      {item.date}
                    </Typography>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
