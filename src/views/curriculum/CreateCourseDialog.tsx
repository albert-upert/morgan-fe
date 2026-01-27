import { useCallback, useState } from "react";

import { Button } from "@/components/button";
import { Checkbox } from "@/components/checkbox";
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/dialog";
import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
} from "@/components/dropdown";
import { CaretDownIcon } from "@/components/icon";
import { Input } from "@/components/input";
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

export interface Course {
  id: number;
  code: string;
  name: string;
  credits: number;
  studyProgram: string;
  courseType: string;
  selected: boolean;
}

const courseTypeOptions = [
  { label: "Semua", value: "semua" },
  { label: "Mata Kuliah Dasar Teknik", value: "mkdt" },
  { label: "Mata Kuliah Dasar Umum", value: "mkdu" },
  { label: "Mata Kuliah Program Studi", value: "mkps" },
  { label: "Mata Kuliah Sains Dasar", value: "mksd" },
  { label: "Mata Kuliah Universitas Pertamina", value: "mkup" },
];

const coursesData: Array<Course> = [
  {
    id: 1,
    code: "10001",
    name: "Agama Buddha dan Etika",
    credits: 2,
    studyProgram: "Komunikasi",
    courseType: "Mata Kuliah Dasar Umum",
    selected: false,
  },
  {
    id: 2,
    code: "UP0011",
    name: "Agama dan Etika",
    credits: 2,
    studyProgram: "Komunikasi",
    courseType: "Mata Kuliah Dasar Umum",
    selected: false,
  },
  {
    id: 3,
    code: "10002",
    name: "Agama Hindu dan Etika",
    credits: 2,
    studyProgram: "Komunikasi",
    courseType: "Mata Kuliah Dasar Umum",
    selected: false,
  },
  {
    id: 4,
    code: "10003",
    name: "Agama Islam dan Etika",
    credits: 2,
    studyProgram: "Komunikasi",
    courseType: "Mata Kuliah Dasar Umum",
    selected: false,
  },
  {
    id: 5,
    code: "10004",
    name: "Agama Katolik dan Etika",
    credits: 2,
    studyProgram: "Komunikasi",
    courseType: "Mata Kuliah Dasar Umum",
    selected: false,
  },
];

interface CreateCourseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddCourses: (courses: Array<Course>) => void;
}

export function CreateCourseDialog({
  open,
  onOpenChange,
  onAddCourses,
}: CreateCourseDialogProps) {
  const [selectedCourseType, setSelectedCourseType] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [courses, setCourses] = useState<Array<Course>>(coursesData);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const totalItems = courses.length;
  const totalPages = Math.ceil(totalItems / pageSize);

  const handleSelectCourse = useCallback(
    (courseId: number, checked: boolean) => {
      setCourses((prev) =>
        prev.map((course) =>
          course.id === courseId ? { ...course, selected: checked } : course
        )
      );
    },
    []
  );

  const handleSearch = useCallback(() => {
    console.log("Search:", {
      courseType: selectedCourseType,
      query: searchQuery,
    });
  }, [selectedCourseType, searchQuery]);

  const handleCancel = useCallback(() => {
    setCourses(coursesData);
    setSelectedCourseType("");
    setSearchQuery("");
    onOpenChange(false);
  }, [onOpenChange]);

  const handleAdd = useCallback(() => {
    const selectedCourses = courses.filter((course) => course.selected);
    onAddCourses(selectedCourses);
    setCourses(coursesData);
    setSelectedCourseType("");
    setSearchQuery("");
    onOpenChange(false);
  }, [courses, onAddCourses, onOpenChange]);

  const hasSelectedCourses = courses.some((course) => course.selected);
  const isSearchDisabled = !selectedCourseType && !searchQuery;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-h-[90vh] overflow-y-auto rounded-xl border border-border p-0 data-[side=center]:max-w-[1106px]"
        showCloseButton
      >
        <DialogHeader className="rounded-t-xl border-0 border-b">
          <DialogTitle>Daftar Mata Kuliah</DialogTitle>
        </DialogHeader>

        <DialogBody className="gap-0 rounded-b-xl border-0 p-0">
          {/* Filter Section */}
          <div className="flex flex-col">
            {/* Jenis Mata Kuliah */}
            <div className="flex items-center gap-[105px] px-5 py-3">
              <div className="w-[200px]">
                <Typography variant="body-small-bold">
                  Jenis Mata Kuliah
                </Typography>
              </div>
              <div className="flex-1">
                <Dropdown>
                  <DropdownTrigger asChild>
                    <Button
                      size="lg"
                      variant="outline"
                      className="w-full justify-between"
                    >
                      <span
                        className={
                          selectedCourseType ? "text-gray-800" : "text-gray-500"
                        }
                      >
                        {selectedCourseType || "Pilih Jenis Mata Kuliah"}
                      </span>
                      <CaretDownIcon className="size-5" />
                    </Button>
                  </DropdownTrigger>
                  <DropdownContent>
                    {courseTypeOptions.map((option) => (
                      <DropdownItem
                        key={option.value}
                        onSelect={() => setSelectedCourseType(option.label)}
                      >
                        {option.label}
                      </DropdownItem>
                    ))}
                  </DropdownContent>
                </Dropdown>
              </div>
            </div>

            {/* Mata Kuliah */}
            <div className="flex items-center gap-[105px] px-5 py-3">
              <div className="w-[200px]">
                <Typography variant="body-small-bold">Mata Kuliah</Typography>
              </div>
              <div className="flex-1">
                <Input
                  size="lg"
                  placeholder="Ketik Mata Kuliah"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-5 px-5 pt-2.5 pb-5">
            <Button
              variant="secondary"
              size="lg"
              className="w-[151px]"
              onClick={handleCancel}
              disabled={!selectedCourseType && !searchQuery}
            >
              Batal
            </Button>
            <Button
              variant="primary"
              size="lg"
              className="w-[151px]"
              onClick={handleSearch}
              disabled={isSearchDisabled}
            >
              Cari
            </Button>
          </div>

          {/* Table Section */}
          <div className="p-5">
            <Table>
              <TableHeader className="bg-gray-400">
                <TableRow>
                  <TableHead className="w-[60px]" />
                  <TableHead>Kode Mata Kuliah</TableHead>
                  <TableHead>Nama</TableHead>
                  <TableHead>Jumlah SKS</TableHead>
                  <TableHead>Program Studi</TableHead>
                  <TableHead>Jenis Mata Kuliah</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {courses.map((course, index) => (
                  <TableRow
                    key={course.id}
                    className={index % 2 === 0 ? "bg-white" : "bg-muted"}
                  >
                    <TableCell>
                      <div className="flex items-center justify-center">
                        <Checkbox
                          checked={course.selected}
                          onCheckedChange={(checked) =>
                            handleSelectCourse(course.id, checked)
                          }
                        />
                      </div>
                    </TableCell>
                    <TableCell>{course.code}</TableCell>
                    <TableCell>{course.name}</TableCell>
                    <TableCell>{course.credits}</TableCell>
                    <TableCell>{course.studyProgram}</TableCell>
                    <TableCell>{course.courseType}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* Pagination and Add Button */}
            <div className="flex items-center justify-between py-5">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={totalItems}
                pageSize={pageSize}
                onPageChange={setCurrentPage}
                onPageSizeChange={setPageSize}
                showResultsInfo
              />
              <Button
                variant="primary"
                size="lg"
                className="w-[200px]"
                onClick={handleAdd}
                disabled={!hasSelectedCourses}
              >
                Tambahkan
              </Button>
            </div>
          </div>
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
}
