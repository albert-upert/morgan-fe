import { Link, useParams } from "@tanstack/react-router";
import { useMemo } from "react";

import { Breadcrumb } from "@/components/breadcrumb";
import { Button } from "@/components/button";
import { CaretLeftIcon } from "@/components/icon";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/table";
import { Typography } from "@/components/typography";

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
    studentId: "105220046",
    studentName: "BIMASYAH IRWA ARTHDIGA PUTRA",
    status: "Disetujui",
    academicStatus: "Aktif",
  },
  {
    id: 2,
    studentId: "105220047",
    studentName: "IGNATIO DOUANE HURSEPUNY",
    status: "Disetujui",
    academicStatus: "Aktif",
  },
  {
    id: 3,
    studentId: "105222005",
    studentName: "SOFIA MELATI BAREUT RUNA",
    status: "Disetujui",
    academicStatus: "Aktif",
  },
  {
    id: 4,
    studentId: "105222007",
    studentName: "BAMBANG ISTIJAB",
    status: "Disetujui",
    academicStatus: "Aktif",
  },
  {
    id: 5,
    studentId: "105222005",
    studentName: "SOFIA MELATI BAREUT RUNA",
    status: "Disetujui",
    academicStatus: "Aktif",
  },
  {
    id: 6,
    studentId: "105222007",
    studentName: "BAMBANG ISTIJAB",
    status: "Disetujui",
    academicStatus: "Aktif",
  },
  {
    id: 7,
    studentId: "105222009",
    studentName: "GEMA FITRI RAMADANI",
    status: "Disetujui",
    academicStatus: "Aktif",
  },
  {
    id: 8,
    studentId: "105222015",
    studentName: "CATHERINE URIANA SHOLIA",
    status: "Disetujui",
    academicStatus: "Aktif",
  },
  {
    id: 9,
    studentId: "105222017",
    studentName: "NAUFAL ARVIN FATHURRAHMAN",
    status: "Disetujui",
    academicStatus: "Aktif",
  },
  {
    id: 10,
    studentId: "105222027",
    studentName: "ATHIRAH RASHIDA NAIMA",
    status: "Disetujui",
    academicStatus: "Aktif",
  },
  {
    id: 11,
    studentId: "105222033",
    studentName: "MOHAMAD DANDUNG SADAT",
    status: "Disetujui",
    academicStatus: "Aktif",
  },
  {
    id: 12,
    studentId: "105222035",
    studentName: "FITRIA NURHALIZA",
    status: "Disetujui",
    academicStatus: "Aktif",
  },
  {
    id: 13,
    studentId: "105222037",
    studentName: "BINTANG AKBAR ALIM",
    status: "Disetujui",
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

export function ParticipantsApprovedView() {
  const { classId } = useParams({
    from: "/_layout/auto-assign/participants-approved/$classId",
  });

  const classInfo = useMemo(() => {
    return mockClassInfo[classId];
  }, [classId]);

  return (
    <div className="flex flex-col gap-5 pt-5">
      <Breadcrumb
        items={[
          { href: "/", label: "Beranda" },
          { href: "/auto-assign", label: "Auto Assign Peserta Kelas" },
          { href: "/auto-assign/class-list", label: "Daftar Kelas" },
          { label: "Daftar Peserta Disetujui" },
        ]}
      />
      <Typography variant="h6">Daftar Peserta Kelas</Typography>

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
            Daftar Peserta Disetujui - Kelas {classInfo.className}
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
