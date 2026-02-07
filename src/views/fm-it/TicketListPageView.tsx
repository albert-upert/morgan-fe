import { useState } from "react";
import { Button } from "uper-ui/button";
import { Card, CardContent } from "uper-ui/card";
import {
  ArrowLeftIcon,
  BuildingIcon,
  CautionIcon,
  ClockIcon,
  RegistrationIcon,
  SyncIcon,
} from "uper-ui/icon";
import { Tag } from "uper-ui/tags";
import { Typography } from "uper-ui/typography";
import { TicketDetailModal } from "./TicketDetailModal";

type Report = {
  id: string;
  status: string;
  assets: Array<string>;
  room: string;
  building: string;
  date: string;
  time: string;
  reporter: string;
  reporterRole: string;
  photo: File | null;
  description: string;
};

const reportsSeed: Array<Report> = [
  {
    id: "#FM-2025-0103",
    status: "Menunggu Diterima oleh Petugas",
    assets: ["Proyektor Epson", "Air Conditioner (AC)"],
    room: "2805",
    building: "Griya Legita",
    date: "05 Oktober 2025",
    time: "08:09 WIB",
    reporter: "Dedi Permana",
    reporterRole: "Dosen",
    photo: new File(["dummy-image-content"], "bukti-kerusakan.jpg", {
      type: "image/jpeg",
    }),
    description:
      "Proyektor tidak mau menyala saat ditekan tombol power, dan AC meneteskan air.",
  },
  {
    id: "#FM-2025-0102",
    status: "Menunggu Diterima oleh Petugas",
    assets: ["Fingerprint"],
    room: "2808",
    building: "Griya Legita",
    date: "05 Oktober 2025",
    time: "08:30 WIB",
    reporter: "Siti Aminah",
    reporterRole: "Staff",
    photo: null,
    description: "Mesin fingerprint tidak merespon input jari.",
  },
];

export function TicketListView() {
  const name = "Budi Santoso";
  const shift = "08.00 - 14.00 WIB";
  const area = "Griya Legita, Rektorat";

  const [openDetailModal, setOpenDetailModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

  return (
    <div className="flex flex-col gap-6">
      {/* Back */}
      <div className="ml-8">
        <Button size="icon" variant="tertiary">
          <ArrowLeftIcon /> Beranda
        </Button>
      </div>

      {/* Ticket List */}
      <div>
        <div className="mb-6">
          <Typography variant="body-large-bold">Daftar Tiket Masuk</Typography>
        </div>

        <div>
          <Card className="bg-gray-100" elevation="none">
            <CardContent>
              <div className="flex flex-col gap-2">
                <div className="flex flex-row items-center gap-3">
                  <RegistrationIcon className="h-6 w-6" color="red" />
                  <Typography variant="caption-bold">FM/IT:</Typography> {name}
                </div>

                <div className="flex flex-row items-center gap-3">
                  <ClockIcon className="h-6 w-6" color="red" />
                  <Typography variant="caption-bold">Shift:</Typography> {shift}
                </div>

                <div className="flex flex-row items-center gap-3">
                  <BuildingIcon className="h-6 w-6" color="red" />
                  <Typography variant="caption-bold">
                    Area Kerja:
                  </Typography>{" "}
                  {area}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Report List */}
      <div>
        <div className="mb-6">
          <Typography variant="body-medium-bold">Daftar Laporan</Typography>
        </div>

        {reportsSeed.map((report) => (
          <Card key={report.id} className="mt-4 bg-gray-100" elevation="none">
            <CardContent className="flex flex-col gap-3">
              {/* Report ID */}
              <div>
                <Typography className="text-primary" variant="body-medium-bold">
                  {report.id}
                </Typography>
              </div>

              {/* Report Detail */}
              <div className="flex flex-col gap-2">
                <div className="flex flex-row items-center gap-3">
                  <SyncIcon className="h-6 w-6" />
                  <Tag color="red" type="filled" size="md" rounded="pill">
                    {report.status}
                  </Tag>
                </div>
                <div className="flex flex-row items-center gap-3">
                  <CautionIcon className="h-6 w-6" />
                  <Typography variant="caption-bold">
                    {report.assets.join(", ")}
                  </Typography>
                </div>
                <div className="flex flex-row items-center gap-3">
                  <BuildingIcon className="h-6 w-6" />
                  <Typography variant="caption-bold">
                    {report.room} - {report.building}
                  </Typography>
                </div>
                <div className="flex flex-row items-center gap-3">
                  <ClockIcon className="h-6 w-6" />
                  <Typography variant="caption-bold">
                    {report.date} | {report.time}
                  </Typography>
                </div>
              </div>

              {/* See Detail Button */}
              <div className="">
                <Button
                  onClick={() => {
                    setSelectedReport(report);
                    setOpenDetailModal(true);
                  }}
                  variant="primary"
                  className="w-full"
                  size="md"
                >
                  Lihat Detail Laporan
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedReport && (
        <TicketDetailModal
          open={openDetailModal}
          onOpenChange={setOpenDetailModal}
          reportDetail={selectedReport}
        />
      )}
    </div>
  );
}
