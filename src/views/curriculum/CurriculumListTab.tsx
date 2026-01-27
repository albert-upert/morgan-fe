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
  CaretDownIcon,
  PencilIcon,
  SearchIcon,
  TrashIcon,
} from "@/components/icon";
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

interface Curriculum {
  id: number;
  name: string;
  lectureProgram: string;
  lectureProgramColor: string;
  description: string;
  totalCredits: number;
  status: "active" | "inactive";
}

const curriculumData: Array<Curriculum> = [
  {
    id: 1,
    name: "Kurikulum 2025 - Teknik Kimia - DD",
    lectureProgram: "Double Degree",
    lectureProgramColor: "#e5edab",
    description: "Kurikulum 2025 - Double Degree",
    totalCredits: 155,
    status: "active",
  },
  {
    id: 2,
    name: "Kurikulum 2025 - Teknik Kimia - Int",
    lectureProgram: "International",
    lectureProgramColor: "#99d8ff",
    description: "Kurikulum 2025 - International",
    totalCredits: 141,
    status: "active",
  },
  {
    id: 3,
    name: "Kurikulum 2020 - Teknik Kimia - R",
    lectureProgram: "Reguler",
    lectureProgramColor: "#fbdadb",
    description: "Kurikulum 2020 - Reguler",
    totalCredits: 144,
    status: "inactive",
  },
  {
    id: 4,
    name: "Kurikulum 2020 - Teknik Kimia - K",
    lectureProgram: "Karyawan",
    lectureProgramColor: "#fef3c0",
    description: "Kurikulum 2020 - Karyawan",
    totalCredits: 95,
    status: "inactive",
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

export function CurriculumListTab() {
  const [selectedLectureProgram, setSelectedLectureProgram] = useState("Semua");
  const [selectedStudyProgram, setSelectedStudyProgram] =
    useState("Ilmu Komputer");

  const handleView = useCallback((curriculum: Curriculum) => {
    console.log("View curriculum:", curriculum);
  }, []);

  const handleDelete = useCallback((curriculum: Curriculum) => {
    console.log("Delete curriculum:", curriculum);
  }, []);

  return (
    <div className="flex flex-col gap-5">
      <Typography variant="h5">Daftar Kurikulum</Typography>

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
            <TableHead>Nama</TableHead>
            <TableHead>Program Perkuliahan</TableHead>
            <TableHead>Deskripsi</TableHead>
            <TableHead>Total SKS</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {curriculumData.map((curriculum) => (
            <TableRow key={curriculum.id}>
              <TableCell>{curriculum.name}</TableCell>
              <TableCell>
                <div
                  className="rounded px-3 py-1 text-center"
                  style={{
                    backgroundColor: curriculum.lectureProgramColor,
                  }}
                >
                  {curriculum.lectureProgram}
                </div>
              </TableCell>
              <TableCell>{curriculum.description}</TableCell>
              <TableCell>{curriculum.totalCredits}</TableCell>
              <TableCell>
                {curriculum.status === "active" ? (
                  <Tag color="green" type="filled" size="lg" className="w-20">
                    Aktif
                  </Tag>
                ) : (
                  <Tag
                    color="green-light"
                    type="filled"
                    size="lg"
                    className="w-20"
                  >
                    Tidak Aktif
                  </Tag>
                )}
              </TableCell>
              <TableCell>
                <div className="flex items-center justify-center gap-6">
                  <Button
                    onClick={() => handleView(curriculum)}
                    size="md"
                    variant="ghost"
                  >
                    <SearchIcon />
                    Lihat
                  </Button>
                  <Link
                    to="/curriculum/$id/edit"
                    params={{ id: String(curriculum.id) }}
                  >
                    <Button size="md" variant="tertiary">
                      <PencilIcon />
                      Ubah
                    </Button>
                  </Link>
                  <Button
                    onClick={() => handleDelete(curriculum)}
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

      <div className="flex justify-end">
        <Link to="/curriculum/create">
          <Button size="lg" variant="primary" className="w-[180px]">
            Tambah Kurikulum
          </Button>
        </Link>
      </div>
    </div>
  );
}
