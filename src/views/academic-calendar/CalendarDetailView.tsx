import { Link } from "@tanstack/react-router";
import { useCallback, useState } from "react";
import { Breadcrumb } from "uper-ui/breadcrumb";
import { Button } from "uper-ui/button";
import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
} from "uper-ui/dropdown";
import {
  CaretDownIcon,
  CaretLeftIcon,
  PencilIcon,
  SyncIcon,
  TrashIcon,
  UploadIcon,
} from "uper-ui/icon";
import {
  TableBody,
  TableCell,
  TableContent,
  TableCustomHeader,
  TableHead,
  TableHeader,
  TableRow,
  TableWithCustomHeader,
} from "uper-ui/table";
import { Tag } from "uper-ui/tags";
import { Typography } from "uper-ui/typography";
import { CreateEventCalendarDialog } from "./CreateEventCalendarDialog";
import { DeleteEventCalendarDialog } from "./DeleteEventCalendarDialog";

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

const lectureProgramOptions = [
  { label: "Semua", value: "semua" },
  { label: "Double Degree", value: "double-degree" },
  { label: "International", value: "international" },
  { label: "Reguler", value: "reguler" },
  { label: "Karyawan", value: "karyawan" },
];

const studyProgramOptions = [
  { label: "Ilmu Komputer", value: "computer-science" },
  { label: "Teknik Kimia", value: "chemical-engineering" },
  { label: "Teknik Perminyakan", value: "petroleum-engineering" },
  { label: "Teknik Industri", value: "industrial-engineering" },
];

export function CalendarDetailView() {
  const [selectedLectureProgram, setSelectedLectureProgram] =
    useState("Reguler");
  const [selectedStudyProgram, setSelectedStudyProgram] =
    useState("Ilmu Komputer");

  const [create, setCreate] = useState<boolean>(false);
  const [deleteDialog, setDeleteDialog] = useState<boolean>(false);
  const [mode, setMode] = useState<"create" | "edit">("create");
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null);

  const handleCreate = useCallback(
    (eventId: number | null, nextMode: "create" | "edit") => {
      setMode(nextMode);
      setCreate(true);
      setSelectedEvent(eventId);
    },
    []
  );

  const handleDelete = useCallback((eventId: number | null) => {
    setSelectedEvent(eventId);
    setDeleteDialog(true);
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
            label: "Lihat Event Kalender Akademik",
          },
        ]}
      />
      <Typography variant="h6">
        Lihat Event Kalender Akademik - Universitas Pertamina - Periode Akademik
        2025 - 1 (Ganjil)
      </Typography>
      <Link to="/academic-calendar">
        <Button size="lg" variant="tertiary">
          <CaretLeftIcon />
          Kelender Akademik
        </Button>
      </Link>
      <div className="flex flex-col gap-5 rounded-xl border border-border bg-white p-5">
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-3">
            <Typography variant="body-medium-bold">
              Program Perkuliahan
            </Typography>
            <Dropdown>
              <DropdownTrigger asChild>
                <Button size="lg" variant="secondary">
                  {selectedLectureProgram}
                  <CaretDownIcon className="size-5" />
                </Button>
              </DropdownTrigger>
              <DropdownContent>
                {lectureProgramOptions.map((option) => (
                  <DropdownItem
                    key={option.value}
                    onSelect={() => setSelectedLectureProgram(option.label)}
                  >
                    {option.label}
                  </DropdownItem>
                ))}
              </DropdownContent>
            </Dropdown>
          </div>

          <div className="flex items-center gap-3">
            <Typography variant="body-medium-bold">Program Studi</Typography>
            <Dropdown>
              <DropdownTrigger asChild>
                <Button size="lg" variant="secondary">
                  {selectedStudyProgram}
                  <CaretDownIcon className="size-5" />
                </Button>
              </DropdownTrigger>
              <DropdownContent>
                {studyProgramOptions.map((option) => (
                  <DropdownItem
                    key={option.value}
                    onSelect={() => setSelectedStudyProgram(option.label)}
                  >
                    {option.label}
                  </DropdownItem>
                ))}
              </DropdownContent>
            </Dropdown>
          </div>
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
                <TableHead>Aksi</TableHead>
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
                  <TableCell>
                    <div className="flex items-center justify-center gap-2.5">
                      <Button
                        onClick={() => handleCreate(event.id, "edit")}
                        size="md"
                        variant="ghost"
                      >
                        <PencilIcon />
                        Ubah
                      </Button>
                      <Button
                        onClick={() => handleDelete(event.id)}
                        size="md"
                        variant="tertiary"
                      >
                        <TrashIcon />
                        Hapus
                      </Button>
                      <Button size="md" variant="ghost">
                        <SyncIcon />
                        Sync
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </TableContent>
        </TableWithCustomHeader>
        <div className="flex items-center justify-between">
          <div className="flex justify-start">
            <Link to="/academic-calendar">
              <Button variant="secondary">Kembali</Button>
            </Link>
          </div>
          <div className="flex justify-end gap-5">
            <Link to="/academic-calendar/upload">
              <Button variant="secondary">
                Import Event Kalender Akademik{" "}
                <UploadIcon className="h-5 w-5" />
              </Button>
            </Link>

            <Button
              onClick={() => handleCreate(null, "create")}
              variant="primary"
            >
              Tambah Event
            </Button>
          </div>
        </div>
      </div>

      <CreateEventCalendarDialog
        open={create}
        setOpen={setCreate}
        eventId={selectedEvent}
        mode={mode}
      />

      <DeleteEventCalendarDialog
        open={deleteDialog}
        setOpen={setDeleteDialog}
        eventId={selectedEvent}
      />
    </div>
  );
}
