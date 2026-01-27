import { Link } from "@tanstack/react-router";
import { useCallback, useState } from "react";
import { Breadcrumb } from "@/components/breadcrumb";
import { Button } from "@/components/button";
import { CaretLeftIcon, InfoIcon } from "@/components/icon";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/table";
import { Tag } from "@/components/tags";
import { Typography } from "@/components/typography";
import { UploadEventDialog } from "./UploadEventDialog";

interface EventAkademik {
  id: number;
  nama_event: string;
  event_nilai: boolean;
  event_irs: boolean;
  event_lulus: boolean;
  event_registrasi: boolean;
  event_yudisium: boolean;
  event_survei: boolean;
  event_dosen: boolean;
  status: string;
}

const dataEvent: Array<EventAkademik> = [
  {
    id: 1,
    nama_event: "Perkuliahan Semester Pendek",
    event_nilai: true,
    event_irs: true,
    event_lulus: false,
    event_registrasi: false,
    event_yudisium: false,
    event_survei: false,
    event_dosen: false,
    status: "Aktif",
  },
  {
    id: 2,
    nama_event: "Persetujuan Kartu Rencana Studi",
    event_nilai: true,
    event_irs: true,
    event_lulus: false,
    event_registrasi: false,
    event_yudisium: false,
    event_survei: false,
    event_dosen: false,
    status: "Aktif",
  },
  {
    id: 1,
    nama_event: "Perwalian Semester Ganjil",
    event_nilai: true,
    event_irs: true,
    event_lulus: false,
    event_registrasi: false,
    event_yudisium: false,
    event_survei: false,
    event_dosen: false,
    status: "Tidak Aktif",
  },
];

export function UploadEventResultView() {
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
            href: "/configuration",
            label: "Konfigurasi",
          },
          {
            href: "/configuration/academic",
            label: "Akademik",
          },
          {
            label: "Upload Event Akademik",
          },
        ]}
      />
      <Typography variant="h6">Upload Event Akademik</Typography>
      <Link
        to="/configuration/academic/$type"
        params={{ type: "event" }}
        className="flex items-center gap-1 text-primary"
      >
        <CaretLeftIcon className="size-5" />
        <span className="text-base">Event Akademik </span>
      </Link>
      <div className="flex flex-col gap-5 rounded-xl border border-border bg-white p-5">
        <div className="flex items-center gap-2 py-2">
          <Typography variant="h5">Impor Event Akademik</Typography>
          <InfoIcon className="size-6 text-gray-800" />
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="whitespace-normal">Nama Event</TableHead>
              <TableHead className="whitespace-normal">Event Nilai</TableHead>
              <TableHead className="whitespace-normal">Event IRS</TableHead>
              <TableHead className="whitespace-normal">Event Lulus</TableHead>
              <TableHead className="whitespace-normal">
                Event Registrasi
              </TableHead>
              <TableHead className="whitespace-normal">
                Event Yudisium
              </TableHead>
              <TableHead className="whitespace-normal">Event Survei</TableHead>
              <TableHead className="whitespace-normal">Event Dosen</TableHead>
              <TableHead className="whitespace-normal">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dataEvent.map((event) => (
              <TableRow key={event.id}>
                <TableCell>{event.nama_event}</TableCell>
                <TableCell>{event.event_nilai ? "Ya" : "Tidak"}</TableCell>
                <TableCell>{event.event_irs ? "Ya" : "Tidak"}</TableCell>
                <TableCell>{event.event_lulus ? "Ya" : "Tidak"}</TableCell>
                <TableCell>{event.event_registrasi ? "Ya" : "Tidak"}</TableCell>
                <TableCell>{event.event_yudisium ? "Ya" : "Tidak"}</TableCell>
                <TableCell>{event.event_survei ? "Ya" : "Tidak"}</TableCell>
                <TableCell>{event.event_dosen ? "Ya" : "Tidak"}</TableCell>
                <TableCell>
                  {event.status === "Aktif" ? (
                    <Tag color="green" type="filled" size="lg" className="w-25">
                      Aktif
                    </Tag>
                  ) : (
                    <Tag
                      color="green"
                      type="with-border"
                      size="lg"
                      className="w-25"
                    >
                      Tidak Aktif
                    </Tag>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex justify-end gap-5">
          <Link to="/configuration/academic/event/upload">
            <Button variant="secondary">Batal</Button>
          </Link>

          <Button onClick={() => handleSave()} variant="primary">
            Simpan Event Akademik
          </Button>
        </div>
      </div>

      <UploadEventDialog open={save} setOpen={setSave} onSave={() => {}} />
    </div>
  );
}
