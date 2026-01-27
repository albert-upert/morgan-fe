import { Link } from "@tanstack/react-router";
import { useCallback, useState } from "react";
import { Breadcrumb } from "@/components/breadcrumb";
import { Button } from "@/components/button";
import { InfoIcon } from "@/components/icon";
import {
  TableBody,
  TableCell,
  TableContent,
  TableCustomHeader,
  TableHead,
  TableHeader,
  TableRow,
  TableWithCustomHeader,
} from "@/components/table";
import { Tag } from "@/components/tags";
import { Typography } from "@/components/typography";
import { UploadConfirmationDialog } from "./UploadConfirmationDialog";

interface AcademicCalendarDetail {
  id: number;
  name: string;
  start_date: string;
  end_date: string;
  type: string;
}

const detailAcademicCalendar: Array<AcademicCalendarDetail> = [
  {
    id: 1,
    name: "Masa pembayaran cicilan 1",
    start_date: "04 Maret 2025, 00:05",
    end_date: "04 Juli 2026, 23:59",
    type: "Event Global",
  },
  {
    id: 2,
    name: "Masa pembayaran semester ganjil",
    start_date: "03 januari 2026, 00:05",
    end_date: "03 Maret 2026, 23:59",
    type: "Event UPER",
  },
];

export function UploadEventCalendarResultView() {
  const [save, setSave] = useState<boolean>(false);

  const handleSave = useCallback(() => {
    setSave(true);
  }, []);
  return (
    <div className="flex flex-col gap-5 pt-5">
      <Breadcrumb
        items={[
          {
            href: "/",
            label: "Beranda",
          },
          {
            href: "/academic-calendar",
            label: "Kalender Akademik",
          },
          {
            label: "Unggah Event Kalender Akademik",
          },
        ]}
      />
      <Typography variant="h6">Unggah Event Kalender Akademik</Typography>
      <div className="flex flex-col gap-5 rounded-xl border border-border bg-white p-5">
        <div className="flex items-center gap-2 py-2">
          <Typography variant="h5">Impor Event Kalender Akademik</Typography>
          <InfoIcon className="size-6 text-gray-800" />
        </div>
        <TableWithCustomHeader>
          <TableCustomHeader className="justify-center bg-callout-blue-bg">
            <Typography variant="body-medium-bold" className="text-center">
              Event Kalender Akademik
            </Typography>
          </TableCustomHeader>
          <TableContent>
            <TableHeader>
              <TableRow>
                <TableHead>Nama Event</TableHead>
                <TableHead>Tanggal Mulai</TableHead>
                <TableHead>Tanggal Selesai</TableHead>
                <TableHead>Event</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {detailAcademicCalendar.map((event) => (
                <TableRow>
                  <TableCell>{event.name}</TableCell>
                  <TableCell>{event.start_date}</TableCell>
                  <TableCell>{event.end_date}</TableCell>
                  <TableCell>
                    {event.type === "Event Global" ? (
                      <Tag color="blue" size="md" rounded="pill" type="filled">
                        Event Global
                      </Tag>
                    ) : (
                      <Tag
                        color="yellow"
                        size="md"
                        rounded="pill"
                        type="filled"
                      >
                        Event Uper
                      </Tag>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </TableContent>
        </TableWithCustomHeader>
      </div>
      <div className="flex justify-end gap-5 rounded-xl border border-border bg-white p-5">
        <Link to="/academic-calendar/upload">
          <Button variant="secondary" className="w-35">
            Batal
          </Button>
        </Link>

        <Button onClick={() => handleSave()} variant="primary" className="w-35">
          Simpan
        </Button>
      </div>
      <UploadConfirmationDialog open={save} setOpen={setSave} />
    </div>
  );
}
