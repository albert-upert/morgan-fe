import { Link } from "@tanstack/react-router";
import { useCallback, useState } from "react";
import { Button } from "@/components/button";
import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
} from "@/components/dropdown";
import { CaretDownIcon, PencilIcon, TrashIcon } from "@/components/icon";
import { Pagination } from "@/components/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/table";
import { Typography } from "@/components/typography";

interface CourseEquivalence {
  id: number;
  oldCode: string;
  oldCourseName: string;
  oldCredits: number;
  newCode: string;
  newCourseName: string;
  newCredits: number;
  studyProgram: string;
}

const equivalenceData: Array<CourseEquivalence> = [
  {
    id: 1,
    oldCode: "SPFA212100",
    oldCourseName: "Ilmu Sosial Dasar",
    oldCredits: 3,
    newCode: "SPFA212200",
    newCourseName: "Pengantar Ilmu Sosial",
    newCredits: 3,
    studyProgram: "Ilmu Komputer",
  },
  {
    id: 2,
    oldCode: "SPFA212104",
    oldCourseName: "Pengantar Ilmu Politik",
    oldCredits: 3,
    newCode: "SPFA212204",
    newCourseName: "Dasar Ilmu Politik",
    newCredits: 3,
    studyProgram: "Ilmu Komputer",
  },
  {
    id: 3,
    oldCode: "SPFA212105",
    oldCourseName: "Sejarah Sosial Politik Indonesia",
    oldCredits: 3,
    newCode: "SPFA212205",
    newCourseName: "Sejarah Politik Indonesia",
    newCredits: 3,
    studyProgram: "Ilmu Komputer",
  },
  {
    id: 4,
    oldCode: "SPFA212106",
    oldCourseName: "Sistem Sosial Politik Indonesia",
    oldCredits: 3,
    newCode: "SPFA212206",
    newCourseName: "Sistem Politik Indonesia",
    newCredits: 3,
    studyProgram: "Ilmu Komputer",
  },
  {
    id: 5,
    oldCode: "SPFA212107",
    oldCourseName: "Pengantar Ilmu Hubungan Internasional",
    oldCredits: 3,
    newCode: "SPFA212207",
    newCourseName: "Dasar Hubungan Internasional",
    newCredits: 3,
    studyProgram: "Ilmu Komputer",
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

export function CurriculumEquivalenceTab() {
  const [selectedLectureProgram, setSelectedLectureProgram] =
    useState("Reguler");
  const [selectedStudyProgram, setSelectedStudyProgram] =
    useState("Ilmu Komputer");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);

  const totalPages = Math.ceil(equivalenceData.length / pageSize);

  const handleEdit = useCallback((equivalence: CourseEquivalence) => {
    console.log("Edit equivalence:", equivalence);
  }, []);

  const handleDelete = useCallback((equivalence: CourseEquivalence) => {
    console.log("Delete equivalence:", equivalence);
  }, []);

  return (
    <div className="flex flex-col gap-5">
      <Typography variant="h5">Ekuivalensi Mata Kuliah</Typography>

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

      <Table>
        <TableHeader className="bg-gray-400">
          <TableRow>
            <TableHead>Kode Lama</TableHead>
            <TableHead>Matkul Kurikulum Lama</TableHead>
            <TableHead>SKS Lama</TableHead>
            <TableHead>Kode Baru</TableHead>
            <TableHead>Matkul Kurikulum Baru</TableHead>
            <TableHead>SKS Baru</TableHead>
            <TableHead>Program Studi</TableHead>
            <TableHead>Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {equivalenceData.map((equivalence, index) => (
            <TableRow
              key={equivalence.id}
              className={index % 2 === 0 ? "bg-muted" : "bg-white"}
            >
              <TableCell>{equivalence.oldCode}</TableCell>
              <TableCell>{equivalence.oldCourseName}</TableCell>
              <TableCell>{equivalence.oldCredits}</TableCell>
              <TableCell>{equivalence.newCode}</TableCell>
              <TableCell>{equivalence.newCourseName}</TableCell>
              <TableCell>{equivalence.newCredits}</TableCell>
              <TableCell>{equivalence.studyProgram}</TableCell>
              <TableCell>
                <div className="flex items-center justify-center gap-4">
                  <Button
                    onClick={() => handleEdit(equivalence)}
                    size="md"
                    variant="tertiary"
                  >
                    <PencilIcon />
                    Ubah
                  </Button>
                  <Button
                    onClick={() => handleDelete(equivalence)}
                    size="md"
                    variant="ghost"
                    className="text-gray-500"
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

      <div className="flex justify-between">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={equivalenceData.length}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          onPageSizeChange={setPageSize}
          showPageSizeSelector
          showResultsInfo
          showSearchPage
        />

        <div className="flex gap-3">
          <Link to="/curriculum/equivalence/upload">
            <Button size="lg" variant="secondary">
              Unggah Ekuivalensi
            </Button>
          </Link>
          <Link to="/curriculum/equivalence/create">
            <Button size="lg" variant="primary">
              Tambah Ekuivalensi
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
