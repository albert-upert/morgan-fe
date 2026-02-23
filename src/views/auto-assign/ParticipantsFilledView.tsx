import { Link, useParams } from "@tanstack/react-router";
import { useCallback, useMemo } from "react";

import { Breadcrumb } from "uper-ui/breadcrumb";
import { Button } from "uper-ui/button";
import { CaretLeftIcon, TrashIcon } from "uper-ui/icon";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "uper-ui/table";
import { Typography } from "uper-ui/typography";

interface ParticipantData {
  id: number;
  studentId: string;
  studentName: string;
  status: string;
  academicStatus: string;
}

// Mock data for the table
const mockParticipantsData: Array<ParticipantData> = [
  {
    id: 1,
    studentId: "105223001",
    studentName: "RAIHAN PUTRA AKBAR",
    status: "Telah Diisi",
    academicStatus: "Aktif",
  },
  {
    id: 2,
    studentId: "105223002",
    studentName: "GERALD EBERHARD",
    status: "Telah Diisi",
    academicStatus: "Aktif",
  },
  {
    id: 3,
    studentId: "105223003",
    studentName: "NAYLA PUTRI CAHYANI ZAHWADHIA",
    status: "Telah Diisi",
    academicStatus: "Aktif",
  },
  {
    id: 4,
    studentId: "105223004",
    studentName: "IKHSAN NUR ALIF",
    status: "Telah Diisi",
    academicStatus: "Aktif",
  },
  {
    id: 5,
    studentId: "105223005",
    studentName: "MUHAMMAD IRFAN WIRA KUSUMA",
    status: "Telah Diisi",
    academicStatus: "Aktif",
  },
  {
    id: 6,
    studentId: "105223006",
    studentName: "FLORENCE REGIS LAKE",
    status: "Telah Diisi",
    academicStatus: "Aktif",
  },
  {
    id: 7,
    studentId: "105223007",
    studentName: "SYIFAIRA MOFINA",
    status: "Telah Diisi",
    academicStatus: "Aktif",
  },
  {
    id: 8,
    studentId: "105223009",
    studentName: "FATIMAH IBTISAM",
    status: "Telah Diisi",
    academicStatus: "Aktif",
  },
  {
    id: 9,
    studentId: "105223010",
    studentName: "NESIA AYU SEKARWANGI",
    status: "Telah Diisi",
    academicStatus: "Aktif",
  },
  {
    id: 10,
    studentId: "105223011",
    studentName: "RATU RIZKI AMELIA",
    status: "Telah Diisi",
    academicStatus: "Aktif",
  },
  {
    id: 11,
    studentId: "105223012",
    studentName: "GUARDRIAN KHALIL AIMAN HARAHAP",
    status: "Telah Diisi",
    academicStatus: "Aktif",
  },
  {
    id: 12,
    studentId: "105223013",
    studentName: "GLORY HARDY FEBRIANDO SIANTURI",
    status: "Telah Diisi",
    academicStatus: "Aktif",
  },
  {
    id: 13,
    studentId: "105223014",
    studentName: "ALPHARD BINTANG ANANDITTO",
    status: "Telah Diisi",
    academicStatus: "Aktif",
  },
  {
    id: 14,
    studentId: "105223015",
    studentName: "MUHAMAD ADJIE PRATAMA",
    status: "Telah Diisi",
    academicStatus: "Aktif",
  },
  {
    id: 15,
    studentId: "105223016",
    studentName: "VIESTO PURNAMA PUTRA",
    status: "Telah Diisi",
    academicStatus: "Aktif",
  },
  {
    id: 16,
    studentId: "105223017",
    studentName: "MUHAMMAD ABIYYU ZAKY",
    status: "Telah Diisi",
    academicStatus: "Aktif",
  },
  {
    id: 17,
    studentId: "105223018",
    studentName: "IRFAN NATANAEL",
    status: "Telah Diisi",
    academicStatus: "Aktif",
  },
  {
    id: 18,
    studentId: "105223019",
    studentName: "MUH. ADJIE ZAKHA",
    status: "Telah Diisi",
    academicStatus: "Aktif",
  },
  {
    id: 19,
    studentId: "105223020",
    studentName: "RUBEN MUFLIH HAFIZHAN",
    status: "Telah Diisi",
    academicStatus: "Aktif",
  },
  {
    id: 20,
    studentId: "105223021",
    studentName: "MUHAMMAD ALI AKBAR",
    status: "Telah Diisi",
    academicStatus: "Aktif",
  },
];

// Mock class data
const mockClassInfo: Record<
  string,
  { name: string; courseName: string; className: string }
> = {
  "1": {
    name: "Agama Buddha dan Etika",
    courseName: "Agama Buddha dan Etika",
    className: "Agama Buddha dan Etika (MBKM)-CS3-2024",
  },
  "2": {
    name: "Algoritma dan Struktur Data",
    courseName: "Algoritma dan Struktur Data",
    className: "Algoritma dan Struktur Data-CS3-2024",
  },
  "3": {
    name: "Aljabar Linear dan Aplikasinya",
    courseName: "Aljabar Linear dan Aplikasinya",
    className: "Aljabar Linear dan Aplikasinya-CS3-2024",
  },
  "4": {
    name: "Analisis dan Perancangan Perangkat Lunak",
    courseName: "Analisis dan Perancangan Perangkat Lunak",
    className: "Analisis dan Perancangan Perangkat Lunak-CS5-2024",
  },
  "5": {
    name: "Bahasa Indonesia",
    courseName: "Bahasa Indonesia",
    className: "Bahasa Indonesia-CS1-2024",
  },
};

export function ParticipantsFilledView() {
  const { classId } = useParams({
    from: "/_layout/auto-assign/participants-filled/$classId",
  });

  const classInfo = useMemo(() => {
    return mockClassInfo[classId];
  }, [classId]);

  const handleDelete = useCallback((participantId: number) => {
    console.warn("Delete participant:", participantId);
  }, []);

  return (
    <div className="flex flex-col gap-5 pt-5">
      <Breadcrumb
        items={[
          { href: "/", label: "Beranda" },
          { href: "/auto-assign", label: "Auto Assign Peserta Kelas" },
          { href: "/auto-assign/class-list", label: "Daftar Kelas" },
          { label: "Daftar Peserta Diisi" },
        ]}
      />
      <Typography variant="h6">
        Daftar Peserta Kelas {classInfo.name}
      </Typography>

      <Link to="/auto-assign/class-list">
        <Button size="lg" variant="tertiary">
          <CaretLeftIcon />
          Daftar Kelas
        </Button>
      </Link>

      <div className="flex flex-col gap-5 rounded-xl border border-border bg-white p-5">
        {/* Header */}
        <div className="rounded-lg bg-gray-50 px-5 py-2.5">
          <Typography variant="body-medium-bold">
            Daftar Peserta Kelas - {classInfo.className}
          </Typography>
        </div>

        {/* Table */}
        <Table>
          <TableHeader className="bg-gray-200">
            <TableRow>
              <TableHead className="w-[44px]">No</TableHead>
              <TableHead className="w-[201px]">Nomor Induk Mahasiswa</TableHead>
              <TableHead>Nama Mahasiswa</TableHead>
              <TableHead className="w-[97px]">Status</TableHead>
              <TableHead className="w-[146px]">Status Akademik</TableHead>
              <TableHead className="w-[93px]">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockParticipantsData.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.studentId}</TableCell>
                <TableCell>{item.studentName}</TableCell>
                <TableCell>{item.status}</TableCell>
                <TableCell>{item.academicStatus}</TableCell>
                <TableCell>
                  <button
                    type="button"
                    onClick={() => handleDelete(item.id)}
                    className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
                  >
                    <TrashIcon className="size-4" />
                    Hapus
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
