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
  PencilIcon,
  PlusIcon,
  SearchIcon,
  SortIcon,
  TrashIcon,
  UploadIcon,
} from "uper-ui/icon";
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

import type { CourseDetail } from "./ViewCourseDialog";
import { ViewCourseDialog } from "./ViewCourseDialog";

interface Course {
  id: number;
  code: string;
  name: string;
  credits: number;
  semester: number;
  courseType: string;
}

const courseData: Array<Course> = [
  {
    id: 1,
    code: "12001",
    name: "Geologi Pemboran",
    credits: 2,
    semester: 7,
    courseType: "Mata Kuliah Program Studi",
  },
  {
    id: 2,
    code: "12002",
    name: "Praktikum Kimia Dasar I",
    credits: 1,
    semester: 1,
    courseType: "Mata Kuliah Dasar Umum",
  },
  {
    id: 3,
    code: "12001",
    name: "Fisika Dasar I",
    credits: 2,
    semester: 1,
    courseType: "Mata Kuliah Dasar Umum",
  },
  {
    id: 4,
    code: "12002",
    name: "Praktikum Fisika Dasar I",
    credits: 1,
    semester: 1,
    courseType: "Mata Kuliah Dasar Umum",
  },
  {
    id: 5,
    code: "12001",
    name: "Kalkulus I",
    credits: 2,
    semester: 1,
    courseType: "Mata Kuliah Dasar Umum",
  },
  {
    id: 6,
    code: "12002",
    name: "Praktikum Geologi Fisik",
    credits: 1,
    semester: 1,
    courseType: "Mata Kuliah Program Studi",
  },
  {
    id: 7,
    code: "12001",
    name: "Kimia Dasar II",
    credits: 2,
    semester: 2,
    courseType: "Mata Kuliah Dasar Umum",
  },
  {
    id: 8,
    code: "12002",
    name: "Praktikum Kimia Dasar II",
    credits: 1,
    semester: 2,
    courseType: "Mata Kuliah Dasar Umum",
  },
  {
    id: 9,
    code: "12001",
    name: "Fisika Dasar II",
    credits: 2,
    semester: 2,
    courseType: "Mata Kuliah Dasar Umum",
  },
  {
    id: 10,
    code: "12002",
    name: "Praktikum Fisika Dasar II",
    credits: 1,
    semester: 2,
    courseType: "Mata Kuliah Dasar Umum",
  },
];

const studyProgramOptions = [
  { label: "Ilmu Komputer", value: "computer-science" },
  { label: "Teknik Kimia", value: "chemical-engineering" },
  { label: "Teknik Perminyakan", value: "petroleum-engineering" },
  { label: "Teknik Industri", value: "industrial-engineering" },
];

const sortOptions = [
  { label: "A-Z", value: "nama,asc" },
  { label: "Z-A", value: "nama,desc" },
  { label: "Terbaru", value: "created_at,desc" },
  { label: "Terlama", value: "created_at,asc" },
];

export function CourseListView() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStudyProgram, setSelectedStudyProgram] =
    useState("Program Studi");
  const [selectedSort, setSelectedSort] = useState("Urutkan");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<CourseDetail | null>(
    null
  );

  const totalPages = Math.ceil(courseData.length / pageSize);

  const handleView = useCallback((course: Course) => {
    // Transform course to CourseDetail for the dialog
    const courseDetail: CourseDetail = {
      id: course.id,
      code: course.code,
      name: course.name,
      nameEnglish: "Drilling Geology",
      shortName: "GP",
      credits: course.credits,
      semester: course.semester,
      objective: "Mata Kuliah Baru",
      courseType: course.courseType,
      coordinator: "Prof. Rina Hartati, Ph.D",
      specialCourse: "Bukan Mata Kuliah Spesial",
      openForOtherProdi: "Tidak",
      requiredCourse: "Tidak",
      campusMerdeka: "Tidak",
      capstoneCourse: "Tidak",
      practicalCourse: "Tidak",
      finalProjectCourse: "Tidak",
      minorCourse: "Tidak",
      isActive: true,
      prerequisiteCourses: [
        {
          id: 1,
          code: "52204",
          name: "Algoritma dan Struktur Data",
          type: "Co-Requisite",
        },
      ],
    };
    setSelectedCourse(courseDetail);
    setIsViewDialogOpen(true);
  }, []);

  const handleDelete = useCallback((course: Course) => {
    console.warn("Delete course:", course);
  }, []);

  return (
    <div className="flex flex-col gap-5 pt-5">
      <Breadcrumb
        items={[{ href: "/", label: "Beranda" }, { label: "Mata Kuliah" }]}
      />
      <Typography variant="h6">Mata Kuliah</Typography>

      <div className="flex flex-col gap-5 rounded-xl border border-border bg-white p-5">
        <Typography variant="h5">Daftar Mata Kuliah</Typography>

        <div className="flex items-center justify-between gap-5">
          <Input
            placeholder="Kode Mata Kuliah / Nama Mata Kuliah / Jenis Mata Kuliah"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onClear={() => setSearchQuery("")}
            endIcon={<SearchIcon />}
            wrapperClassName="max-w-md"
          />

          <div className="flex items-center gap-3">
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

            <Dropdown>
              <DropdownTrigger asChild>
                <Button size="lg" variant="secondary">
                  {selectedSort}
                  <SortIcon className="size-5" />
                </Button>
              </DropdownTrigger>
              <DropdownContent>
                {sortOptions.map((option) => (
                  <DropdownItem
                    key={option.value}
                    onSelect={() => setSelectedSort(option.label)}
                  >
                    {option.label}
                  </DropdownItem>
                ))}
              </DropdownContent>
            </Dropdown>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Kode Mata Kuliah</TableHead>
              <TableHead>Nama Mata Kuliah</TableHead>
              <TableHead>Jumlah SKS</TableHead>
              <TableHead>Semester</TableHead>
              <TableHead>Jenis Mata Kuliah</TableHead>
              <TableHead>Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {courseData.map((course, index) => (
              <TableRow
                key={course.id}
                className={index % 2 === 0 ? "bg-muted" : "bg-white"}
              >
                <TableCell>{course.code}</TableCell>
                <TableCell>{course.name}</TableCell>
                <TableCell>{course.credits}</TableCell>
                <TableCell>{course.semester}</TableCell>
                <TableCell>{course.courseType}</TableCell>
                <TableCell>
                  <div className="flex items-center justify-center gap-4">
                    <Button
                      onClick={() => handleView(course)}
                      size="md"
                      variant="ghost"
                    >
                      <SearchIcon />
                      View
                    </Button>
                    <Link
                      to="/course/$id/edit"
                      params={{ id: String(course.id) }}
                    >
                      <Button size="md" variant="tertiary">
                        <PencilIcon />
                        Edit
                      </Button>
                    </Link>

                    <Button
                      onClick={() => handleDelete(course)}
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

        <div className="flex justify-end gap-3">
          <Button size="lg" variant="secondary" asChild>
            <Link to="/course/upload">
              Unggah Mata Kuliah
              <UploadIcon className="size-5" />
            </Link>
          </Button>
          <Button size="lg" variant="primary" asChild>
            <Link to="/course/create">
              Tambah Mata Kuliah Baru
              <PlusIcon className="size-5 text-white" />
            </Link>
          </Button>
        </div>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={courseData.length}
        pageSize={pageSize}
        onPageChange={setCurrentPage}
        onPageSizeChange={setPageSize}
        showPageSizeSelector
        showResultsInfo
        showSearchPage
      />

      <ViewCourseDialog
        open={isViewDialogOpen}
        onOpenChange={setIsViewDialogOpen}
        course={selectedCourse}
      />
    </div>
  );
}
