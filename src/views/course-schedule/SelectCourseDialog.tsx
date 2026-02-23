import { useCallback, useState } from "react";

import { Button } from "uper-ui/button";
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "uper-ui/dialog";
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

export interface Course {
  id: number;
  code: string;
  name: string;
  courseType: string;
  credits: number;
  curriculum: string;
}

interface SelectCourseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (course: Course) => void;
}

// Sample course data
const availableCourses: Array<Course> = [
  {
    id: 1,
    code: "12001",
    name: "Akuisisi dan Pengolahan Data Seismik Refleksi",
    courseType: "Mata Kuliah Program Studi",
    credits: 2,
    curriculum: "Kurikulum 2021 - Teknik Geofisika",
  },
  {
    id: 2,
    code: "12002",
    name: "Analisis Sinyal Geofisika",
    courseType: "Mata Kuliah Program Studi",
    credits: 2,
    curriculum: "Kurikulum 2021 - Teknik Geofisika",
  },
  {
    id: 3,
    code: "12003",
    name: "Elektronika dan Instrumentasi Geofisika",
    courseType: "Mata Kuliah Program Studi",
    credits: 2,
    curriculum: "Kurikulum 2021 - Teknik Geofisika",
  },
  {
    id: 4,
    code: "12004",
    name: "Evaluasi Formasi",
    courseType: "Mata Kuliah Program Studi",
    credits: 2,
    curriculum: "Kurikulum 2021 - Teknik Geofisika",
  },
  {
    id: 5,
    code: "12005",
    name: "Fisika Batuan",
    courseType: "Mata Kuliah Dasar Umum",
    credits: 2,
    curriculum: "Kurikulum 2021 - Teknik Geofisika",
  },
];

export function SelectCourseDialog({
  open,
  onOpenChange,
  onSelect,
}: SelectCourseDialogProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const totalPages = Math.ceil(availableCourses.length / pageSize);

  const handleSearch = useCallback(() => {
    console.warn("Search:", searchQuery);
  }, [searchQuery]);

  const handleSelectCourse = useCallback(
    (course: Course) => {
      onSelect(course);
      setSearchQuery("");
      onOpenChange(false);
    },
    [onSelect, onOpenChange]
  );

  const handleCancel = useCallback(() => {
    setSearchQuery("");
    onOpenChange(false);
  }, [onOpenChange]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="overflow-hidden rounded-xl border border-border p-0 data-[side=center]:max-w-[1106px]"
        showCloseButton
      >
        <DialogHeader className="rounded-t-xl border-0 border-b">
          <DialogTitle>Daftar Mata Kuliah - Semester Ganjil</DialogTitle>
        </DialogHeader>

        <DialogBody className="gap-3 rounded-b-xl border-0 p-0">
          {/* Search Section */}
          <div className="flex w-full items-center gap-5 px-5 py-3">
            <div className="w-[200px]">
              <Typography variant="body-small-bold">
                Cari Mata Kuliah
              </Typography>
            </div>
            <div className="flex-1">
              <Input
                placeholder="Ketik Mata Kuliah / Kode Mata Kuliah"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onClear={() => setSearchQuery("")}
              />
            </div>
            <Button
              size="lg"
              variant="secondary"
              onClick={handleSearch}
              disabled={!searchQuery}
            >
              Cari
            </Button>
          </div>

          {/* Table Section */}
          <div className="w-full px-5 py-3">
            <div className="overflow-hidden rounded-xl border border-border">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-300">
                    <TableHead className="w-[150px]">
                      Kode Mata Kuliah
                    </TableHead>
                    <TableHead>Nama Mata Kuliah</TableHead>
                    <TableHead className="w-[194px]">
                      Jenis Mata Kuliah
                    </TableHead>
                    <TableHead className="w-[51px]">SKS</TableHead>
                    <TableHead className="w-[238px]">Kurikulum</TableHead>
                    <TableHead className="w-[182px]">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {availableCourses.map((course, index) => (
                    <TableRow
                      key={course.id}
                      className={index % 2 === 0 ? "bg-white" : "bg-muted"}
                    >
                      <TableCell className="text-center">
                        {course.code}
                      </TableCell>
                      <TableCell className="text-center">
                        {course.name}
                      </TableCell>
                      <TableCell className="text-center">
                        {course.courseType}
                      </TableCell>
                      <TableCell className="text-center">
                        {course.credits}
                      </TableCell>
                      <TableCell>
                        <ul className="list-inside list-disc text-center">
                          <li>{course.curriculum}</li>
                        </ul>
                      </TableCell>
                      <TableCell className="text-center">
                        <Button
                          size="md"
                          variant="primary"
                          onClick={() => handleSelectCourse(course)}
                        >
                          Pilih Mata Kuliah Ini
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Footer Section */}
          <div className="flex w-full items-center justify-between px-5 py-5">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={availableCourses.length}
              pageSize={pageSize}
              onPageChange={setCurrentPage}
              onPageSizeChange={setPageSize}
              showResultsInfo
            />
            <Button size="lg" variant="secondary" onClick={handleCancel}>
              Batal
            </Button>
          </div>
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
}
