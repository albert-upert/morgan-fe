import { Link } from "@tanstack/react-router";
import type { ChangeEvent } from "react";
import { useCallback, useState } from "react";

import { Breadcrumb } from "uper-ui/breadcrumb";
import { Button } from "uper-ui/button";
import { CaretLeftIcon, SearchIcon, SortIcon, TrashIcon } from "uper-ui/icon";
import { Input } from "uper-ui/input";
import { Pagination } from "uper-ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "uper-ui/table";
import { Typography } from "uper-ui/typography";

interface ClassData {
  id: number;
  name: string;
  courseCode: string;
  courseName: string;
  participantsFilled: number;
  participantsApproved: number;
  capacity: number;
}

// Mock data for the table
const mockClassData: Array<ClassData> = [
  {
    id: 1,
    name: "Agama Buddha dan Etika (MBKM)-CS3-2024",
    courseCode: "10001",
    courseName: "Agama Buddha dan Etika",
    participantsFilled: 0,
    participantsApproved: 0,
    capacity: 70,
  },
  {
    id: 2,
    name: "Algoritma dan Struktur Data-CS3-2024",
    courseCode: "52204",
    courseName: "Algoritma dan Struktur Data",
    participantsFilled: 64,
    participantsApproved: 11,
    capacity: 65,
  },
  {
    id: 3,
    name: "Aljabar Linear dan Aplikasinya-CS3-2024",
    courseCode: "52203",
    courseName: "Aljabar Linear dan Aplikasinya",
    participantsFilled: 55,
    participantsApproved: 0,
    capacity: 75,
  },
  {
    id: 4,
    name: "Analisis dan Perancangan Perangkat Lunak-CS5-2024",
    courseCode: "52302",
    courseName: "Analisis dan Perancangan Perangkat Lunak",
    participantsFilled: 47,
    participantsApproved: 0,
    capacity: 55,
  },
  {
    id: 5,
    name: "Bahasa Indonesia-CS1-2024",
    courseCode: "10101",
    courseName: "Bahasa Indonesia",
    participantsFilled: 49,
    participantsApproved: 49,
    capacity: 55,
  },
  {
    id: 6,
    name: "Bahasa Inggris I-CS1-2024",
    courseCode: "10102",
    courseName: "Bahasa Inggris I",
    participantsFilled: 49,
    participantsApproved: 49,
    capacity: 55,
  },
  {
    id: 7,
    name: "Basis Data-CS3-2024",
    courseCode: "52206",
    courseName: "Basis Data",
    participantsFilled: 55,
    participantsApproved: 0,
    capacity: 65,
  },
  {
    id: 8,
    name: "Berpikir Komputasi-CS1-2024",
    courseCode: "52102",
    courseName: "Berpikir Komputasi",
    participantsFilled: 49,
    participantsApproved: 49,
    capacity: 55,
  },
  {
    id: 9,
    name: "Berpikir Kritis-CS1-2024",
    courseCode: "10104",
    courseName: "Berpikir Kritis",
    participantsFilled: 49,
    participantsApproved: 49,
    capacity: 55,
  },
  {
    id: 10,
    name: "Capstone Design (MBKM)-CS6-2024",
    courseCode: "24310",
    courseName: "Capstone Design",
    participantsFilled: 0,
    participantsApproved: 0,
    capacity: 70,
  },
];

export function ClassListView() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(7);
  const totalPages = 81;

  const handleSearch = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  }, []);

  const handleSort = useCallback(() => {
    console.warn("Sort clicked");
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const handlePageSizeChange = useCallback((size: number) => {
    setPageSize(size);
    setCurrentPage(1);
  }, []);

  const handleDeleteParticipants = useCallback((classId: number) => {
    console.warn("Delete participants for class:", classId);
  }, []);

  return (
    <div className="flex flex-col gap-5 pt-5">
      <Breadcrumb
        items={[
          { href: "/", label: "Beranda" },
          { href: "/auto-assign", label: "Auto Assign Peserta Kelas" },
          { label: "Daftar Kelas" },
        ]}
      />
      <Typography variant="h6">Daftar Kelas</Typography>

      <Link to="/auto-assign">
        <Button size="lg" variant="tertiary">
          <CaretLeftIcon />
          Auto Assign
        </Button>
      </Link>

      <div className="flex flex-col gap-5 rounded-xl border border-border bg-white p-5">
        {/* Header */}
        <Typography variant="body-medium-bold">
          Daftar Kelas - Hasil Auto Assign
        </Typography>

        {/* Search and Sort */}
        <div className="flex items-center justify-between">
          <div className="w-[400px]">
            <Input
              placeholder="Nama Mata Ajar / Kode Mata Ajar"
              value={searchQuery}
              onChange={handleSearch}
              endIcon={<SearchIcon className="size-5 text-muted-foreground" />}
            />
          </div>
          <Button size="lg" variant="secondary" onClick={handleSort}>
            Urutkan
            <SortIcon className="size-5" />
          </Button>
        </div>

        {/* Table */}
        <Table>
          <TableHeader className="bg-gray-200">
            <TableRow>
              <TableHead>Nama</TableHead>
              <TableHead>Kode Mata Ajar</TableHead>
              <TableHead>Nama Mata Ajar</TableHead>
              <TableHead>Peserta/Disetujui/Kapasitas</TableHead>
              <TableHead colSpan={2}>Operasi</TableHead>
              <TableHead>Hapus Peserta</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockClassData.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="text-left">{item.name}</TableCell>
                <TableCell>{item.courseCode}</TableCell>
                <TableCell>{item.courseName}</TableCell>
                <TableCell>
                  {item.participantsFilled}/{item.participantsApproved}/
                  {item.capacity}
                </TableCell>
                <TableCell>
                  <Link
                    to="/auto-assign/participants-filled/$classId"
                    params={{ classId: String(item.id) }}
                    className="text-sm text-blue-500 hover:underline"
                  >
                    Peserta Diisi
                  </Link>
                </TableCell>
                <TableCell>
                  <Link
                    to="/auto-assign/participants-approved/$classId"
                    params={{ classId: String(item.id) }}
                    className="text-sm text-blue-500 hover:underline"
                  >
                    Peserta Disetujui
                  </Link>
                </TableCell>
                <TableCell>
                  <button
                    type="button"
                    onClick={() => handleDeleteParticipants(item.id)}
                    className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
                  >
                    <TrashIcon className="size-4" />
                    Hapus
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          pageSize={pageSize}
          pageSizeOptions={[5, 7, 10, 20]}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
          showPageSizeSelector={true}
          showResultsInfo={true}
          showSearchPage={false}
        />
      </div>
    </div>
  );
}
