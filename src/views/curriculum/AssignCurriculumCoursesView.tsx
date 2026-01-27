import { Link } from "@tanstack/react-router";
import { useCallback, useMemo, useState } from "react";
import { Breadcrumb } from "@/components/breadcrumb";
import { Button } from "@/components/button";
import { Checkbox } from "@/components/checkbox";
import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
} from "@/components/dropdown";
import { CaretDownIcon, CaretLeftIcon, SearchIcon } from "@/components/icon";
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

interface Course {
  id: number;
  code: string;
  name: string;
  credits: number;
  studyProgram: string;
  courseType: string;
}

const coursesData: Array<Course> = [
  {
    id: 1,
    code: "10001",
    name: "Agama Buddha dan Etika",
    credits: 2,
    studyProgram: "Komunikasi",
    courseType: "Mata Kuliah Dasar Umum",
  },
  {
    id: 2,
    code: "UP0011",
    name: "Agama dan Etika",
    credits: 2,
    studyProgram: "Komunikasi",
    courseType: "Mata Kuliah Dasar Umum",
  },
  {
    id: 3,
    code: "10002",
    name: "Agama Hindu dan Etika",
    credits: 2,
    studyProgram: "Komunikasi",
    courseType: "Mata Kuliah Dasar Umum",
  },
  {
    id: 4,
    code: "10003",
    name: "Agama Islam dan Etika",
    credits: 2,
    studyProgram: "Komunikasi",
    courseType: "Mata Kuliah Dasar Umum",
  },
  {
    id: 5,
    code: "10004",
    name: "Agama Katolik dan Etika",
    credits: 2,
    studyProgram: "Komunikasi",
    courseType: "Mata Kuliah Dasar Umum",
  },
  {
    id: 6,
    code: "10005",
    name: "Agama Konghucu dan Etika",
    credits: 2,
    studyProgram: "Komunikasi",
    courseType: "Mata Kuliah Dasar Umum",
  },
  {
    id: 7,
    code: "10006",
    name: "Agama Kristen dan Etika",
    credits: 2,
    studyProgram: "Komunikasi",
    courseType: "Mata Kuliah Dasar Umum",
  },
  {
    id: 8,
    code: "32038",
    name: "Akuntansi Perminyakan",
    credits: 3,
    studyProgram: "Ekonomi",
    courseType: "Mata Kuliah Program Studi",
  },
  {
    id: 9,
    code: "52204",
    name: "Algoritma dan Struktur Data",
    credits: 3,
    studyProgram: "Ilmu Komputer",
    courseType: "Mata Kuliah Program Studi",
  },
  {
    id: 10,
    code: "52204",
    name: "Aljabar Linear dan Aplikasinya",
    credits: 3,
    studyProgram: "Ilmu Komputer",
    courseType: "Mata Kuliah Program Studi",
  },
  {
    id: 11,
    code: "4208",
    name: "AMDAL",
    credits: 3,
    studyProgram: "Teknik Lingkungan",
    courseType: "Mata Kuliah Program Studi",
  },
  {
    id: 12,
    code: "GL4109",
    name: "Analisa Cekungan",
    credits: 2,
    studyProgram: "Teknik Geologi",
    courseType: "Mata Kuliah Program Studi",
  },
  {
    id: 13,
    code: "32037",
    name: "Analisis dan Evaluasi Ekonomi Migas",
    credits: 3,
    studyProgram: "Ekonomi",
    courseType: "Mata Kuliah Program Studi",
  },
  {
    id: 14,
    code: "32040",
    name: "Analisis Kebijakan Publik",
    credits: 3,
    studyProgram: "Ekonomi",
    courseType: "Mata Kuliah Program Studi",
  },
  {
    id: 15,
    code: "41203",
    name: "Analisis Struktur Statis Tertentu",
    credits: 3,
    studyProgram: "Teknik Sipil",
    courseType: "Mata Kuliah Program Studi",
  },
  {
    id: 16,
    code: "21033",
    name: "Aplikasi Teknologi EBT",
    credits: 3,
    studyProgram: "Teknik Elektro",
    courseType: "Mata Kuliah Program Studi",
  },
  {
    id: 17,
    code: "10101",
    name: "Bahasa Indonesia",
    credits: 2,
    studyProgram: "Komunikasi",
    courseType: "Mata Kuliah Program Studi",
  },
  {
    id: 18,
    code: "UP1103",
    name: "Bahasa Inggris I",
    credits: 2,
    studyProgram: "Hubungan Internasional",
    courseType: "Mata Kuliah Program Studi",
  },
  {
    id: 19,
    code: "10102",
    name: "Bahasa Inggris I",
    credits: 2,
    studyProgram: "Hubungan Internasional",
    courseType: "Mata Kuliah Program Studi",
  },
  {
    id: 20,
    code: "10103",
    name: "Bahasa Inggris II",
    credits: 2,
    studyProgram: "Hubungan Internasional",
    courseType: "Mata Kuliah Program Studi",
  },
];

const courseTypeOptions = [
  { label: "Pilih Mata Kuliah", value: "" },
  { label: "Mata Kuliah Dasar Umum", value: "mkdu" },
  { label: "Mata Kuliah Dasar Teknik", value: "mkdt" },
  { label: "Mata Kuliah Program Studi", value: "mkps" },
  { label: "Mata Kuliah Sains Dasar", value: "mksd" },
  { label: "Mata Kuliah Universitas Pertamina", value: "mkup" },
];

interface AssignCurriculumCoursesViewProps {
  mode?: "create" | "edit";
}

export function AssignCurriculumCoursesView({
  mode = "create",
}: AssignCurriculumCoursesViewProps) {
  const isEditMode = mode === "edit";
  const [selectedCourseType, setSelectedCourseType] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCourses, setSelectedCourses] = useState<Set<number>>(
    new Set()
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);

  const filteredCourses = useMemo(() => {
    return coursesData.filter((course) => {
      const matchesCourseType =
        !selectedCourseType || course.courseType === selectedCourseType;
      const matchesSearch =
        !searchQuery ||
        course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.code.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCourseType && matchesSearch;
    });
  }, [selectedCourseType, searchQuery]);

  const totalPages = useMemo(
    () => Math.ceil(filteredCourses.length / pageSize),
    [filteredCourses.length, pageSize]
  );

  const paginatedCourses = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredCourses.slice(startIndex, startIndex + pageSize);
  }, [filteredCourses, currentPage, pageSize]);

  const isAllSelected = useMemo(() => {
    return (
      paginatedCourses.length > 0 &&
      paginatedCourses.every((course) => selectedCourses.has(course.id))
    );
  }, [paginatedCourses, selectedCourses]);

  const handleSelectAll = useCallback(
    (checked: boolean) => {
      if (checked) {
        const newSelected = new Set(selectedCourses);
        paginatedCourses.forEach((course) => newSelected.add(course.id));
        setSelectedCourses(newSelected);
      } else {
        const newSelected = new Set(selectedCourses);
        paginatedCourses.forEach((course) => newSelected.delete(course.id));
        setSelectedCourses(newSelected);
      }
    },
    [paginatedCourses, selectedCourses]
  );

  const handleSelectCourse = useCallback(
    (courseId: number, checked: boolean) => {
      const newSelected = new Set(selectedCourses);
      if (checked) {
        newSelected.add(courseId);
      } else {
        newSelected.delete(courseId);
      }
      setSelectedCourses(newSelected);
    },
    [selectedCourses]
  );

  const handleSearch = useCallback(() => {
    setCurrentPage(1);
  }, []);

  const handleCancel = useCallback(() => {
    setSearchQuery("");
    setSelectedCourseType("");
    setCurrentPage(1);
  }, []);

  const handleAssign = useCallback(() => {
    console.log("Assigning courses:", Array.from(selectedCourses));
  }, [selectedCourses]);

  return (
    <div className="flex flex-col gap-5 pt-5">
      <Breadcrumb
        items={[
          {
            href: "/",
            label: "Beranda",
          },
          {
            href: "/curriculum/list",
            label: "Daftar Kurikulum",
          },
          {
            href: "/curriculum/create",
            label: isEditMode ? "Ubah Kurikulum" : "Tambah Kurikulum",
          },
          {
            label: isEditMode ? "Ubah Mata Kuliah" : "Tetapkan Mata Kuliah",
          },
        ]}
      />
      <Typography variant="h6">
        {isEditMode ? "Ubah Mata Kuliah" : "Tetapkan Mata Kuliah"}
      </Typography>

      <Link to="/curriculum/create">
        <Button size="lg" variant="tertiary">
          <CaretLeftIcon />
          {isEditMode ? "Ubah Kurikulum" : "Tambah Kurikulum"}
        </Button>
      </Link>

      <div className="flex flex-col gap-5">
        {/* Filter Section */}
        <div className="flex flex-col gap-5 rounded-xl border border-gray-400 bg-white p-5">
          <Typography variant="body-medium-bold">Daftar Mata Kuliah</Typography>

          <div className="mb-2 flex flex-col gap-4">
            {/* Jenis Mata Kuliah */}
            <div className="flex items-center gap-[105px]">
              <div className="w-[150px]">
                <Typography variant="body-small">Jenis mata Kuliah</Typography>
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
                          selectedCourseType ? "text-gray-800" : "text-gray-600"
                        }
                      >
                        {selectedCourseType || "Pilih Mata Kuliah"}
                      </span>
                      <CaretDownIcon className="size-5" />
                    </Button>
                  </DropdownTrigger>
                  <DropdownContent>
                    {courseTypeOptions.slice(1).map((option) => (
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

            {/* Mata Kuliah Search */}
            <div className="flex items-center gap-[105px]">
              <div className="w-[150px]">
                <Typography variant="body-small">Mata Kuliah</Typography>
              </div>
              <div className="flex-1">
                <Input
                  size="lg"
                  placeholder="Ketik Mata Kuliah"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  startIcon={<SearchIcon />}
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3">
              <Button
                size="lg"
                variant="secondary"
                className="w-[100px]"
                onClick={handleCancel}
              >
                Batal
              </Button>
              <Button
                size="lg"
                variant="secondary"
                className="w-[100px]"
                onClick={handleSearch}
              >
                Cari
              </Button>
            </div>
          </div>

          <Table>
            <TableHeader className="bg-muted">
              <TableRow>
                <TableHead className="w-[50px]">
                  <Checkbox
                    checked={isAllSelected}
                    onCheckedChange={handleSelectAll}
                  />
                </TableHead>
                <TableHead>Kode Mata Kuliah</TableHead>
                <TableHead>Nama</TableHead>
                <TableHead>Jumlah SKS</TableHead>
                <TableHead>Program Studi</TableHead>
                <TableHead>Jenis Mata Kuliah</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedCourses.map((course) => (
                <TableRow key={course.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedCourses.has(course.id)}
                      onCheckedChange={(checked) =>
                        handleSelectCourse(course.id, checked)
                      }
                    />
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

          <div className="flex items-center justify-end">
            <Button
              size="lg"
              variant="primary"
              className="w-full max-w-[151px]"
              onClick={handleAssign}
            >
              Tetapkan
            </Button>
          </div>
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filteredCourses.length}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          onPageSizeChange={setPageSize}
          showPageSizeSelector
          showResultsInfo
          showSearchPage
        />
      </div>
    </div>
  );
}
