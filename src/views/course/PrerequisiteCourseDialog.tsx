import { useCallback, useState } from "react";

import { Button } from "uper-ui/button";
import { Checkbox } from "uper-ui/checkbox";
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "uper-ui/dialog";
import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
} from "uper-ui/dropdown";
import { CaretDownIcon, SearchIcon } from "uper-ui/icon";
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

export interface PrerequisiteCourse {
  id: number;
  code: string;
  name: string;
  credits: number;
  semester: number;
  courseType: string;
  prerequisiteType: string;
}

interface PrerequisiteCourseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (courses: Array<PrerequisiteCourse>) => void;
}

const prerequisiteTypeOptions = [
  { label: "Setara", value: "equivalent" },
  { label: "Prasyarat", value: "prerequisite" },
  { label: "Bersamaan", value: "concurrent" },
];

// Sample course data
const availableCourses: Array<Omit<PrerequisiteCourse, "prerequisiteType">> = [
  {
    id: 1,
    code: "12001",
    name: "Ekskursi Geologi Regional",
    credits: 2,
    semester: 7,
    courseType: "Mata Kuliah Program Studi",
  },
  {
    id: 2,
    code: "12002",
    name: "Kapita Selekta Geologi III",
    credits: 2,
    semester: 7,
    courseType: "Mata Kuliah Program Studi",
  },
  {
    id: 3,
    code: "12003",
    name: "Kimia Dasar I",
    credits: 2,
    semester: 7,
    courseType: "Mata Kuliah Program Studi",
  },
  {
    id: 4,
    code: "12004",
    name: "Praktikum Kimia Dasar I",
    credits: 2,
    semester: 7,
    courseType: "Mata Kuliah Program Studi",
  },
  {
    id: 5,
    code: "12005",
    name: "Fisika Dasar I",
    credits: 2,
    semester: 7,
    courseType: "Mata Kuliah Program Studi",
  },
];

export function PrerequisiteCourseDialog({
  open,
  onOpenChange,
  onConfirm,
}: PrerequisiteCourseDialogProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedCourses, setSelectedCourses] = useState<
    Map<number, PrerequisiteCourse>
  >(new Map());

  const totalPages = Math.ceil(availableCourses.length / pageSize);

  const handleCheckboxChange = useCallback(
    (
      course: Omit<PrerequisiteCourse, "prerequisiteType">,
      checked: boolean
    ) => {
      setSelectedCourses((prev) => {
        const newMap = new Map(prev);
        if (checked) {
          newMap.set(course.id, {
            ...course,
            prerequisiteType: "",
          });
        } else {
          newMap.delete(course.id);
        }
        return newMap;
      });
    },
    []
  );

  const handlePrerequisiteTypeChange = useCallback(
    (courseId: number, type: string) => {
      setSelectedCourses((prev) => {
        const newMap = new Map(prev);
        const course = newMap.get(courseId);
        if (course) {
          newMap.set(courseId, {
            ...course,
            prerequisiteType: type,
          });
        }
        return newMap;
      });
    },
    []
  );

  const handleSearch = useCallback(() => {
    console.warn("Search:", searchQuery);
  }, [searchQuery]);

  const handleCancel = useCallback(() => {
    setSelectedCourses(new Map());
    setSearchQuery("");
    onOpenChange(false);
  }, [onOpenChange]);

  const handleConfirm = useCallback(() => {
    const coursesArray = Array.from(selectedCourses.values()).filter(
      (course) => course.prerequisiteType !== ""
    );
    onConfirm(coursesArray);
    setSelectedCourses(new Map());
    setSearchQuery("");
    onOpenChange(false);
  }, [selectedCourses, onConfirm, onOpenChange]);

  const isConfirmDisabled =
    selectedCourses.size === 0 ||
    Array.from(selectedCourses.values()).some(
      (course) => course.prerequisiteType === ""
    );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="overflow-hidden rounded-xl border border-border p-0 data-[side=center]:max-w-[1106px]"
        showCloseButton
      >
        <DialogHeader className="rounded-t-xl border-0 border-b">
          <DialogTitle>Daftar Mata Kuliah Prasyarat</DialogTitle>
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
                endIcon={<SearchIcon />}
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
                    <TableHead className="w-[56px]" />
                    <TableHead className="w-[150px]">
                      Kode Mata Kuliah
                    </TableHead>
                    <TableHead className="w-[227px]">
                      Nama Mata Kuliah
                    </TableHead>
                    <TableHead className="w-[73px]">SKS</TableHead>
                    <TableHead className="w-[100px]">Semester</TableHead>
                    <TableHead className="w-[210px]">
                      Jenis Mata Kuliah
                    </TableHead>
                    <TableHead className="w-[250px]">Tipe Prasyarat</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {availableCourses.map((course, index) => {
                    const isSelected = selectedCourses.has(course.id);
                    const selectedCourse = selectedCourses.get(course.id);

                    return (
                      <TableRow
                        key={course.id}
                        className={index % 2 === 0 ? "bg-white" : "bg-muted"}
                      >
                        <TableCell className="text-center">
                          <Checkbox
                            checked={isSelected}
                            onCheckedChange={(checked) =>
                              handleCheckboxChange(course, checked)
                            }
                          />
                        </TableCell>
                        <TableCell className="text-center">
                          {course.code}
                        </TableCell>
                        <TableCell className="text-center">
                          {course.name}
                        </TableCell>
                        <TableCell className="text-center">
                          {course.credits}
                        </TableCell>
                        <TableCell className="text-center">
                          {course.semester}
                        </TableCell>
                        <TableCell className="text-center">
                          {course.courseType}
                        </TableCell>
                        <TableCell>
                          <Dropdown>
                            <DropdownTrigger asChild>
                              <Button
                                size="md"
                                variant="outline"
                                className="w-full justify-between"
                              >
                                <span
                                  className={
                                    selectedCourse?.prerequisiteType
                                      ? "text-gray-800"
                                      : "text-gray-600"
                                  }
                                >
                                  {selectedCourse?.prerequisiteType ||
                                    "-Pilih Tipe Prasyarat-"}
                                </span>
                                <CaretDownIcon className="size-4" />
                              </Button>
                            </DropdownTrigger>
                            <DropdownContent>
                              {prerequisiteTypeOptions.map((option) => (
                                <DropdownItem
                                  key={option.value}
                                  onSelect={() =>
                                    handlePrerequisiteTypeChange(
                                      course.id,
                                      option.label
                                    )
                                  }
                                >
                                  {option.label}
                                </DropdownItem>
                              ))}
                            </DropdownContent>
                          </Dropdown>
                        </TableCell>
                      </TableRow>
                    );
                  })}
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
            <div className="flex items-center gap-3">
              <Button size="lg" variant="secondary" onClick={handleCancel}>
                Batal
              </Button>
              <Button
                size="lg"
                variant="primary"
                onClick={handleConfirm}
                disabled={isConfirmDisabled}
              >
                Tambahkan Sebagai Mata Kuliah Prasyarat
              </Button>
            </div>
          </div>
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
}
