import { Link } from "@tanstack/react-router";
import { useCallback, useState } from "react";
import { Button } from "@/components/button";
import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
} from "@/components/dropdown";
import {
  PencilIcon,
  SearchIcon,
  SortIcon,
  TrashIcon,
  UploadIcon,
} from "@/components/icon";
import { Input } from "@/components/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/table";
import { Tag } from "@/components/tags";
import { DeleteEventDialog } from "./DeleteEventDialog";
import { DetailEventDialog } from "./DetailEventDialog";

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

const filterList = [
  { label: "Urutkan", key: "" },
  { label: "Aktif", key: "active" },
  { label: "Tidak Aktif", key: "inactive" },
  { label: "A-Z", key: "nama,asc" },
  { label: "Z-A", key: "nama,desc" },
  { label: "Terbaru", key: "created_at,desc" },
  { label: "Terlama", key: "created_at,asc" },
];

export function EventListTab() {
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [eventId, setEventId] = useState<number | null>(null);
  const [viewDialog, setViewDialog] = useState<boolean>(false);
  const [deleteDialog, setDeleteDialog] = useState<boolean>(false);

  const handleView = useCallback((event: number) => {
    setViewDialog(true);
    setEventId(event);
  }, []);

  const handleDelete = useCallback((event: number) => {
    setDeleteDialog(true);
    setEventId(event);
  }, []);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-end gap-5">
        <Link to="/configuration/academic/event/upload">
          <Button variant="secondary">
            Upload Event Akademik <UploadIcon />
          </Button>
        </Link>

        <Link to="/configuration/academic/event/create">
          <Button>Tambah Event Akademik</Button>
        </Link>
      </div>
      <div className="grid grid-cols-2 rounded-lg border border-gray-400 p-5">
        <Input
          size="lg"
          placeholder="Nama Event"
          endIcon={<SearchIcon className="size-5 text-muted-foreground" />}
        />
        <div className="flex justify-end">
          <Dropdown>
            <DropdownTrigger asChild>
              <Button size="lg" variant="secondary">
                {selectedFilter ?? "Urutkan"}
                <SortIcon></SortIcon>
              </Button>
            </DropdownTrigger>
            <DropdownContent>
              {filterList.map((item) => (
                <DropdownItem
                  key={item.key}
                  onSelect={() => setSelectedFilter(item.label)}
                >
                  {item.label}
                </DropdownItem>
              ))}
            </DropdownContent>
          </Dropdown>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="py-2 whitespace-normal">Nama Event</TableHead>
            <TableHead className="py-5 whitespace-normal">
              Event Nilai
            </TableHead>
            <TableHead className="py-5 whitespace-normal">Event IRS</TableHead>
            <TableHead className="py-5 whitespace-normal">
              Event Lulus
            </TableHead>
            <TableHead className="py-5 whitespace-normal">
              Event Registrasi
            </TableHead>
            <TableHead className="py-5 whitespace-normal">
              Event Yudisium
            </TableHead>
            <TableHead className="py-5 whitespace-normal">
              Event Survei
            </TableHead>
            <TableHead className="py-5 whitespace-normal">
              Event Dosen
            </TableHead>
            <TableHead className="py-5 whitespace-normal">Status</TableHead>
            <TableHead className="py-5 whitespace-normal">Aksi</TableHead>
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
              <TableCell className="w-54">
                <div className="flex justify-center">
                  <Button
                    onClick={() => handleView(event.id)}
                    size="md"
                    variant="ghost"
                  >
                    <SearchIcon />
                    Lihat
                  </Button>
                  <Link
                    to="/configuration/academic/event/$id/edit"
                    params={{ id: String(event.id) }}
                  >
                    <Button size="md" variant="tertiary">
                      <PencilIcon />
                      Ubah
                    </Button>
                  </Link>
                  <Button
                    onClick={() => handleDelete(event.id)}
                    size="md"
                    variant="ghost"
                    className="text-gray-600"
                  >
                    <TrashIcon />
                    Hapus
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {eventId && (
        <DeleteEventDialog
          open={deleteDialog}
          eventId={eventId}
          setOpen={setDeleteDialog}
        />
      )}

      {eventId && (
        <DetailEventDialog
          open={viewDialog}
          eventId={eventId}
          setOpen={setViewDialog}
        />
      )}
    </div>
  );
}
