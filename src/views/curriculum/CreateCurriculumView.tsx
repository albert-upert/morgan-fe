import { Link, useParams } from "@tanstack/react-router";
import { useCallback, useState } from "react";
import { Breadcrumb } from "@/components/breadcrumb";
import { Button } from "@/components/button";
import { Checkbox } from "@/components/checkbox";
import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
} from "@/components/dropdown";
import { CaretDownIcon, CaretLeftIcon, CourseIcon } from "@/components/icon";
import { Input } from "@/components/input";
import { Switch } from "@/components/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/table";
import { Typography } from "@/components/typography";
import { CreateCurriculumDialog } from "./CreateCurriculumDialog";

interface CourseType {
  id: number;
  name: string;
  minimumCredits: number;
}

interface AssignedCourse {
  id: number;
  code: string;
  name: string;
  credits: number;
  studyProgram: string;
  courseType: string;
  selected: boolean;
}

const courseTypes: Array<CourseType> = [
  { id: 1, name: "Mata Kuliah Dasar Teknik", minimumCredits: 0 },
  { id: 2, name: "Mata Kuliah Dasar Umum", minimumCredits: 0 },
  { id: 3, name: "Mata Kuliah Program Studi", minimumCredits: 0 },
  { id: 4, name: "Mata Kuliah Sains Dasar", minimumCredits: 0 },
  { id: 5, name: "Mata Kuliah Univeristas Pertamina", minimumCredits: 0 },
];

const assignedCoursesData: Array<AssignedCourse> = [
  {
    id: 1,
    code: "UP0011",
    name: "Agama dan Etika",
    credits: 2,
    studyProgram: "Komunikasi",
    courseType: "Mata Kuliah Dasar Umum",
    selected: true,
  },
  {
    id: 2,
    code: "10004",
    name: "Agama Katolik dan Etika",
    credits: 2,
    studyProgram: "Komunikasi",
    courseType: "Mata Kuliah Dasar Umum",
    selected: true,
  },
  {
    id: 3,
    code: "52204",
    name: "Algoritma dan Struktur Data",
    credits: 3,
    studyProgram: "Ilmu Komputer",
    courseType: "Mata Kuliah Program Studi",
    selected: true,
  },
  {
    id: 4,
    code: "52204",
    name: "Aljabar Linear dan Aplikasinya",
    credits: 3,
    studyProgram: "Ilmu Komputer",
    courseType: "Mata Kuliah Program Studi",
    selected: true,
  },
  {
    id: 5,
    code: "21033",
    name: "Aplikasi Teknologi EBT",
    credits: 3,
    studyProgram: "Teknik Elektro",
    courseType: "Mata Kuliah Program Studi",
    selected: true,
  },
  {
    id: 6,
    code: "10101",
    name: "Bahasa Indonesia",
    credits: 2,
    studyProgram: "Komunikasi",
    courseType: "Mata Kuliah Program Studi",
    selected: true,
  },
  {
    id: 7,
    code: "UP1103",
    name: "Bahasa Inggris I",
    credits: 2,
    studyProgram: "Hubungan Internasional",
    courseType: "Mata Kuliah Program Studi",
    selected: true,
  },
  {
    id: 8,
    code: "UP1203",
    name: "Bahasa Inggris II",
    credits: 2,
    studyProgram: "Hubungan Internasional",
    courseType: "Mata Kuliah Program Studi",
    selected: true,
  },
  {
    id: 9,
    code: "10103",
    name: "Bahasa Inggris II",
    credits: 2,
    studyProgram: "Hubungan Internasional",
    courseType: "Mata Kuliah Program Studi",
    selected: true,
  },
  {
    id: 10,
    code: "UP1203",
    name: "Bahasa Inggris II",
    credits: 2,
    studyProgram: "Hubungan Internasional",
    courseType: "Mata Kuliah Program Studi",
    selected: true,
  },
];

const lectureProgramOptions = [
  { label: "Program Perkuliahan", value: "" },
  { label: "Double Degree", value: "double-degree" },
  { label: "International", value: "international" },
  { label: "Reguler", value: "reguler" },
  { label: "Karyawan", value: "karyawan" },
];

interface CreateCurriculumViewProps {
  mode?: "create" | "edit";
}

export function CreateCurriculumView({
  mode = "create",
}: CreateCurriculumViewProps) {
  const { id } = useParams({ strict: false });
  const isEditMode = mode === "edit";
  const [isActive, setIsActive] = useState(false);
  const [selectedLectureProgram, setSelectedLectureProgram] =
    useState<string>("");
  const [curriculumName, setCurriculumName] = useState("");
  const [description, setDescription] = useState("");
  const [requiredCredits, setRequiredCredits] = useState("");
  const [electiveCredits, setElectiveCredits] = useState("");
  const [totalCredits, setTotalCredits] = useState("");
  const [courseTypesData, setCourseTypesData] =
    useState<Array<CourseType>>(courseTypes);
  const [assignedCourses, setAssignedCourses] =
    useState<Array<AssignedCourse>>(assignedCoursesData);
  const [openCreateCurriculumDialog, setOpenCreateCurriculumDialog] =
    useState<boolean>(false);

  const handleSelectAllCourses = useCallback((checked: boolean) => {
    setAssignedCourses((prev) =>
      prev.map((course) => ({ ...course, selected: checked }))
    );
  }, []);

  const handleSelectCourse = useCallback(
    (courseId: number, checked: boolean) => {
      setAssignedCourses((prev) =>
        prev.map((course) =>
          course.id === courseId ? { ...course, selected: checked } : course
        )
      );
    },
    []
  );

  const allCoursesSelected = assignedCourses.every((course) => course.selected);

  const handleCourseTypeCreditsChange = useCallback(
    (courseTypeId: number, value: string) => {
      setCourseTypesData((prev) =>
        prev.map((item) =>
          item.id === courseTypeId
            ? { ...item, minimumCredits: parseInt(value) || 0 }
            : item
        )
      );
    },
    []
  );

  const handleCancel = useCallback(() => {
    // Reset form or navigate back
  }, []);

  const handleSave = useCallback(() => {
    // Save curriculum data
    console.log({
      lectureProgram: selectedLectureProgram,
      curriculumName,
      description,
      requiredCredits,
      electiveCredits,
      totalCredits,
      isActive,
      courseTypes: courseTypesData,
    });
    setOpenCreateCurriculumDialog(true);
  }, []);

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
            label: isEditMode ? "Ubah Kurikulum" : "Tambah Kurikulum",
          },
        ]}
      />
      <Typography variant="h6">
        {isEditMode ? "Ubah Kurikulum" : "Tambah Kurikulum"}
      </Typography>

      <Link to="/curriculum/$type" params={{ type: "list" }}>
        <Button size="lg" variant="tertiary">
          <CaretLeftIcon />
          Daftar Kurikulum
        </Button>
      </Link>

      <div className="flex flex-col gap-5">
        {/* Detail Kurikulum Card */}
        <div className="flex flex-col gap-0 rounded-xl border border-gray-400 bg-white pb-5">
          <div className="p-5">
            <Typography variant="body-medium-bold">
              Detail Kurikulum 2025 - Teknik Kimia
            </Typography>
          </div>

          <div className="flex flex-col">
            {/* Program Studi - Disabled */}
            <div className="flex items-center gap-[105px] px-5 py-3">
              <div className="w-[200px]">
                <Typography variant="body-small-bold">Program Studi</Typography>
              </div>
              <div className="flex-1">
                <Input
                  size="lg"
                  placeholder="Teknik Kimia"
                  disabled
                  className="bg-gray-100"
                />
              </div>
            </div>

            {/* Program Perkuliahan - Dropdown */}
            <div className="flex items-center gap-[105px] px-5 py-3">
              <div className="w-[200px]">
                <Typography variant="body-small-bold">
                  Program Perkuliahan
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
                          selectedLectureProgram
                            ? "text-gray-800"
                            : "text-gray-600"
                        }
                      >
                        {selectedLectureProgram || "Program Perkuliahan"}
                      </span>
                      <CaretDownIcon className="size-5" />
                    </Button>
                  </DropdownTrigger>
                  <DropdownContent>
                    {lectureProgramOptions.slice(1).map((option) => (
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
            </div>

            {/* Nama Kurikulum */}
            <div className="flex items-center gap-[105px] px-5 py-3">
              <div className="w-[200px]">
                <Typography variant="body-small-bold">
                  Nama Kurikulum
                </Typography>
              </div>
              <div className="flex-1">
                <Input
                  size="lg"
                  placeholder="Nama Kurikulum"
                  value={curriculumName}
                  onChange={(e) => setCurriculumName(e.target.value)}
                />
              </div>
            </div>

            {/* Deskripsi */}
            <div className="flex items-center gap-[105px] px-5 py-3">
              <div className="w-[200px]">
                <Typography variant="body-small-bold">Deskripsi</Typography>
              </div>
              <div className="flex-1">
                <Input
                  size="lg"
                  placeholder="Deskripsi"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>

            {/* SKS Mata Kuliah Wajib */}
            <div className="flex items-center gap-[105px] px-5 py-3">
              <div className="w-[200px]">
                <Typography variant="body-small-bold">
                  SKS Mata Kuliah Wajib
                </Typography>
              </div>
              <div className="flex-1">
                <Input
                  size="lg"
                  placeholder="SKS Mata Kuliah Wajib"
                  value={requiredCredits}
                  onChange={(e) => setRequiredCredits(e.target.value)}
                  type="number"
                />
              </div>
            </div>

            {/* SKS Mata Kuliah Pilihan */}
            <div className="flex items-center gap-[105px] px-5 py-3">
              <div className="w-[200px]">
                <Typography variant="body-small-bold">
                  SKS Mata Kuliah Pilihan
                </Typography>
              </div>
              <div className="flex-1">
                <Input
                  size="lg"
                  placeholder="SKS Mata Kuliah Pilihan"
                  value={electiveCredits}
                  onChange={(e) => setElectiveCredits(e.target.value)}
                  type="number"
                />
              </div>
            </div>

            {/* Total SKS */}
            <div className="flex items-center gap-[105px] px-5 py-3">
              <div className="w-[200px]">
                <Typography variant="body-small-bold">Total SKS</Typography>
              </div>
              <div className="flex-1">
                <Input
                  size="lg"
                  placeholder="Total SKS"
                  value={totalCredits}
                  onChange={(e) => setTotalCredits(e.target.value)}
                  type="number"
                />
              </div>
            </div>

            {/* Status */}
            <div className="flex items-center gap-[105px] px-5 py-3">
              <div className="w-[200px]">
                <Typography variant="body-small-bold">Status</Typography>
              </div>
              <div className="flex items-center gap-3">
                <Switch checked={isActive} onCheckedChange={setIsActive} />
                <Typography variant="body-small-bold">
                  {isActive ? "Aktif" : "Tidak Aktif"}
                </Typography>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 rounded-xl border border-gray-400 bg-white pb-5">
          <div className="flex flex-col">
            <div className="flex items-center px-5 py-5">
              <Typography variant="body-medium-bold">
                Jenis Mata Kuliah - Minimum SKS
              </Typography>
            </div>

            <div className="flex flex-col px-5">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-1/2">Jenis Mata Kuliah</TableHead>
                    <TableHead className="w-1/2">Minimum SKS</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {courseTypesData.map((courseType) => (
                    <TableRow key={courseType.id}>
                      <TableCell>
                        <Typography variant="body-small">
                          {courseType.name}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-center">
                          <Input
                            size="lg"
                            placeholder="Minimum SKS"
                            className="w-[250px]"
                            value={
                              courseType.minimumCredits === 0
                                ? ""
                                : courseType.minimumCredits.toString()
                            }
                            onChange={(e) =>
                              handleCourseTypeCreditsChange(
                                courseType.id,
                                e.target.value
                              )
                            }
                            type="number"
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center px-5 py-5">
              <Typography variant="body-medium-bold">
                Daftar Mata Kuliah yang telah di assign
              </Typography>
            </div>

            <div className="flex flex-col px-5">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[60px]">
                      <div className="flex items-center justify-center">
                        <Checkbox
                          checked={allCoursesSelected}
                          onCheckedChange={handleSelectAllCourses}
                        />
                      </div>
                    </TableHead>
                    <TableHead>Kode Mata Kuliah</TableHead>
                    <TableHead>Nama</TableHead>
                    <TableHead>Jumlah SKS</TableHead>
                    <TableHead>Program Studi</TableHead>
                    <TableHead>Jenis Mata Kuliah</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {assignedCourses.map((course) => (
                    <TableRow key={course.id} className="bg-[#eff4cd]">
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
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between rounded-xl bg-white p-5">
          <div className="flex items-center gap-5">
            <Button
              size="lg"
              variant="secondary"
              className="w-[151px]"
              onClick={handleCancel}
              disabled
            >
              Batal
            </Button>
            <Button
              size="lg"
              variant="primary"
              className="w-[151px]"
              onClick={handleSave}
            >
              Simpan
            </Button>
          </div>
          <Link
            to={
              isEditMode
                ? "/curriculum/equivalence/$id/edit"
                : "/curriculum/assign-courses"
            }
            params={isEditMode && id && { id }}
          >
            <Button size="lg" variant="primary">
              Tetapkan Mata kuliah
              <CourseIcon />
            </Button>
          </Link>
        </div>
      </div>

      <CreateCurriculumDialog
        open={openCreateCurriculumDialog}
        setOpen={setOpenCreateCurriculumDialog}
        onSave={() => {}}
      />
    </div>
  );
}
