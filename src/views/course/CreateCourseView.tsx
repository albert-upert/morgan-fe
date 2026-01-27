import { Link, useParams } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";

import { Breadcrumb } from "@/components/breadcrumb";
import { Button } from "@/components/button";
import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
} from "@/components/dropdown";
import {
  CaretDownIcon,
  CaretLeftIcon,
  PencilIcon,
  TrashIcon,
} from "@/components/icon";
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
import { Textarea } from "@/components/textarea";
import { Typography } from "@/components/typography";

import type { PrerequisiteCourse } from "./PrerequisiteCourseDialog";
import { PrerequisiteCourseDialog } from "./PrerequisiteCourseDialog";

const courseTypeOptions = [
  { label: "Mata Kuliah Dasar Umum", value: "mkdu" },
  { label: "Mata Kuliah Dasar Teknik", value: "mkdt" },
  { label: "Mata Kuliah Program Studi", value: "mkps" },
  { label: "Mata Kuliah Sains Dasar", value: "mksd" },
];

const studyProgramOptions = [
  { label: "Ilmu Komputer", value: "computer-science" },
  { label: "Teknik Kimia", value: "chemical-engineering" },
  { label: "Teknik Perminyakan", value: "petroleum-engineering" },
  { label: "Teknik Industri", value: "industrial-engineering" },
];

const specialCourseOptions = [
  { label: "Tidak Ada", value: "none" },
  { label: "Mata Kuliah Spesial 1", value: "special-1" },
  { label: "Mata Kuliah Spesial 2", value: "special-2" },
];

const requiredCourseOptions = [
  { label: "Tidak Ada", value: "none" },
  { label: "Mata Kuliah Wajib 1", value: "required-1" },
  { label: "Mata Kuliah Wajib 2", value: "required-2" },
];

const capstoneCourseOptions = [
  { label: "Tidak Ada", value: "none" },
  { label: "Mata Kuliah Capstone 1", value: "capstone-1" },
  { label: "Mata Kuliah Capstone 2", value: "capstone-2" },
];

const finalProjectCourseOptions = [
  { label: "Tidak Ada", value: "none" },
  { label: "Tugas Akhir 1", value: "ta-1" },
  { label: "Tugas Akhir 2", value: "ta-2" },
];

const coordinatorOptions = [
  { label: "Dr. Ahmad Fauzi", value: "coordinator-1" },
  { label: "Prof. Budi Santoso", value: "coordinator-2" },
  { label: "Dr. Citra Dewi", value: "coordinator-3" },
];

const openForOtherProdiOptions = [
  { label: "Tidak", value: "no" },
  { label: "Ya - Semua Prodi", value: "all" },
  { label: "Ya - Prodi Tertentu", value: "specific" },
];

const campusMerdekaOptions = [
  { label: "Tidak", value: "no" },
  { label: "Ya", value: "yes" },
];

const practicalCourseOptions = [
  { label: "Tidak Ada", value: "none" },
  { label: "Praktikum 1", value: "practical-1" },
  { label: "Praktikum 2", value: "practical-2" },
];

const minorCourseOptions = [
  { label: "Tidak Ada", value: "none" },
  { label: "Minor 1", value: "minor-1" },
  { label: "Minor 2", value: "minor-2" },
];

interface CreateCourseViewProps {
  mode?: "create" | "edit";
}

export function CreateCourseView({ mode = "create" }: CreateCourseViewProps) {
  const { id } = useParams({ strict: false });
  const isEditMode = mode === "edit";

  // Form states
  const [courseCode, setCourseCode] = useState("");
  const [courseName, setCourseName] = useState("");
  const [courseNameEnglish, setCourseNameEnglish] = useState("");
  const [shortName, setShortName] = useState("");
  const [credits, setCredits] = useState("");
  const [semester, setSemester] = useState("");
  const [courseObjective, setCourseObjective] = useState("");
  const [description, setDescription] = useState("");
  const [bibliography, setBibliography] = useState("");
  const [isActive, setIsActive] = useState(false);

  // Dropdown states
  const [selectedCourseType, setSelectedCourseType] = useState("");
  const [selectedStudyProgram, setSelectedStudyProgram] = useState("");
  const [selectedSpecialCourse, setSelectedSpecialCourse] = useState("");
  const [selectedRequiredCourse, setSelectedRequiredCourse] = useState("");
  const [selectedCapstoneCourse, setSelectedCapstoneCourse] = useState("");
  const [selectedFinalProjectCourse, setSelectedFinalProjectCourse] =
    useState("");
  const [selectedCoordinator, setSelectedCoordinator] = useState("");
  const [selectedOpenForOtherProdi, setSelectedOpenForOtherProdi] =
    useState("");
  const [selectedCampusMerdeka, setSelectedCampusMerdeka] = useState("");
  const [selectedPracticalCourse, setSelectedPracticalCourse] = useState("");
  const [selectedMinorCourse, setSelectedMinorCourse] = useState("");

  // Prerequisite courses
  const [prerequisiteCourses, setPrerequisiteCourses] = useState<
    Array<PrerequisiteCourse>
  >([]);
  const [isPrerequisiteDialogOpen, setIsPrerequisiteDialogOpen] =
    useState(false);

  // Load course data when in edit mode
  useEffect(() => {
    if (isEditMode && id) {
      // Simulate loading course data - in real app this would be an API call
      setCourseCode("12002");
      setCourseName("Geologi Pemboran");
      setCourseNameEnglish("Drilling Geology");
      setShortName("GP");
      setCredits("2");
      setSemester("7");
      setCourseObjective("Mencerdaskan Kehidupan Bangsa");
      setDescription("Mata Kuliah Baru");
      setBibliography("");
      setIsActive(true);
      setSelectedCourseType("Mata Kuliah Program Studi");
      setSelectedCoordinator("Prof. Rina Hartati, Ph.D");
      setSelectedSpecialCourse("Bukan Mata Kuliah Spesial");
      setSelectedOpenForOtherProdi("Tidak");
      setSelectedRequiredCourse("Tidak");
      setSelectedCampusMerdeka("Tidak");
      setSelectedCapstoneCourse("Tidak");
      setSelectedPracticalCourse("Tidak");
      setSelectedFinalProjectCourse("Tidak");
      setSelectedMinorCourse("Tidak");
      setPrerequisiteCourses([
        {
          id: 1,
          code: "52204",
          name: "Algoritma dan Struktur Data",
          credits: 3,
          semester: 2,
          courseType: "Mata Kuliah Dasar Umum",
          prerequisiteType: "Co-Requisite",
        },
      ]);
    }
  }, [isEditMode, id]);

  const handleAddPrerequisite = useCallback(() => {
    setIsPrerequisiteDialogOpen(true);
  }, []);

  const handleEditPrerequisite = useCallback((course: PrerequisiteCourse) => {
    console.log("Edit prerequisite:", course);
  }, []);

  const handleConfirmPrerequisites = useCallback(
    (courses: Array<PrerequisiteCourse>) => {
      setPrerequisiteCourses((prev) => {
        const existingIds = new Set(prev.map((c) => c.id));
        const newCourses = courses.filter((c) => !existingIds.has(c.id));
        return [...prev, ...newCourses];
      });
    },
    []
  );

  const handleDeletePrerequisite = useCallback((id: number) => {
    setPrerequisiteCourses((prev) => prev.filter((course) => course.id !== id));
  }, []);

  const handleCancel = useCallback(() => {
    console.log("Cancel");
  }, []);

  const handleSave = useCallback(() => {
    console.log("Save course", {
      courseCode,
      courseName,
      courseNameEnglish,
      shortName,
      credits,
      semester,
      courseObjective,
      description,
      bibliography,
      isActive,
      selectedCourseType,
      selectedStudyProgram,
      selectedSpecialCourse,
      selectedRequiredCourse,
      selectedCapstoneCourse,
      selectedFinalProjectCourse,
      selectedCoordinator,
      selectedOpenForOtherProdi,
      selectedCampusMerdeka,
      selectedPracticalCourse,
      selectedMinorCourse,
      prerequisiteCourses,
    });
  }, [
    courseCode,
    courseName,
    courseNameEnglish,
    shortName,
    credits,
    semester,
    courseObjective,
    description,
    bibliography,
    isActive,
    selectedCourseType,
    selectedStudyProgram,
    selectedSpecialCourse,
    selectedRequiredCourse,
    selectedCapstoneCourse,
    selectedFinalProjectCourse,
    selectedCoordinator,
    selectedOpenForOtherProdi,
    selectedCampusMerdeka,
    selectedPracticalCourse,
    selectedMinorCourse,
    prerequisiteCourses,
  ]);

  const pageTitle = isEditMode ? "Edit Mata Kuliah" : "Tambah Mata Kuliah";

  return (
    <div className="flex flex-col gap-5 pt-5">
      <Breadcrumb
        items={[
          { href: "/", label: "Beranda" },
          { href: "/course", label: "Mata Kuliah" },
          { label: pageTitle },
        ]}
      />
      <Typography variant="h6">{pageTitle}</Typography>

      <Link to="/course">
        <Button size="lg" variant="tertiary">
          <CaretLeftIcon />
          Mata Kuliah
        </Button>
      </Link>

      <div className="flex flex-col gap-5">
        {/* Detail Mata Kuliah Card */}
        <div className="flex flex-col gap-0 rounded-xl border border-gray-400 bg-white pb-5">
          <div className="p-5">
            <Typography variant="body-medium-bold">
              Detail Mata Kuliah
            </Typography>
          </div>

          <div className="flex flex-col">
            {/* Kode Mata Kuliah */}
            <div className="flex items-center gap-[105px] px-5 py-3">
              <div className="w-[200px]">
                <Typography variant="body-small-bold">
                  Kode Mata Kuliah
                </Typography>
              </div>
              <div className="flex-1">
                <Input
                  size="lg"
                  placeholder="Masukkan Kode Mata Kuliah"
                  value={courseCode}
                  onChange={(e) => setCourseCode(e.target.value)}
                />
              </div>
            </div>

            {/* Nama Mata Kuliah */}
            <div className="flex items-center gap-[105px] px-5 py-3">
              <div className="w-[200px]">
                <Typography variant="body-small-bold">
                  Nama Mata Kuliah
                </Typography>
              </div>
              <div className="flex-1">
                <Input
                  size="lg"
                  placeholder="Masukkan Mata Kuliah"
                  value={courseName}
                  onChange={(e) => setCourseName(e.target.value)}
                />
              </div>
            </div>

            {/* Nama MK (Bhs Inggris) */}
            <div className="flex items-center gap-[105px] px-5 py-3">
              <div className="w-[200px]">
                <Typography variant="body-small-bold">
                  Nama MK (Bhs Inggris)
                </Typography>
              </div>
              <div className="flex-1">
                <Input
                  size="lg"
                  placeholder="Masukkan Mata Kuliah (Inggris)"
                  value={courseNameEnglish}
                  onChange={(e) => setCourseNameEnglish(e.target.value)}
                />
              </div>
            </div>

            {/* Nama Singkat */}
            <div className="flex items-center gap-[105px] px-5 py-3">
              <div className="w-[200px]">
                <Typography variant="body-small-bold">Nama Singkat</Typography>
              </div>
              <div className="flex-1">
                <Input
                  size="lg"
                  placeholder="Masukkan Nama Singkat"
                  value={shortName}
                  onChange={(e) => setShortName(e.target.value)}
                />
              </div>
            </div>

            {/* Jumlah SKS */}
            <div className="flex items-center gap-[105px] px-5 py-3">
              <div className="w-[200px]">
                <Typography variant="body-small-bold">Jumlah SKS</Typography>
              </div>
              <div className="flex-1">
                <Input
                  size="lg"
                  placeholder="Masukkan Jumlah SKS"
                  value={credits}
                  onChange={(e) => setCredits(e.target.value)}
                  type="number"
                />
              </div>
            </div>

            {/* Semester */}
            <div className="flex items-start gap-[105px] px-5 py-3">
              <div className="w-[200px] pt-2">
                <Typography variant="body-small-bold">Semester</Typography>
              </div>
              <div className="flex flex-1 flex-col gap-1">
                <Input
                  size="lg"
                  placeholder="Masukkan Semester"
                  value={semester}
                  onChange={(e) => setSemester(e.target.value)}
                  type="number"
                />
                <Typography variant="caption" className="text-muted-foreground">
                  Semester harus pada rentang 1-8
                </Typography>
              </div>
            </div>

            {/* Tujuan Mata Kuliah */}
            <div className="flex items-start gap-[105px] px-5 py-3">
              <div className="w-[200px] pt-2">
                <Typography variant="body-small-bold">
                  Tujuan Mata Kuliah
                </Typography>
              </div>
              <div className="flex-1">
                <Textarea
                  placeholder="Tujuan Mata Kuliah"
                  value={courseObjective}
                  onChange={(e) => setCourseObjective(e.target.value)}
                  maxLength={100}
                  showCount
                />
              </div>
            </div>

            {/* Deskripsi */}
            <div className="flex items-start gap-[105px] px-5 py-3">
              <div className="w-[200px] pt-2">
                <Typography variant="body-small-bold">Deskripsi</Typography>
              </div>
              <div className="flex-1">
                <Textarea
                  placeholder="Tuliskan Deskripsi"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  maxLength={100}
                  showCount
                />
              </div>
            </div>

            {/* Daftar Pustaka */}
            <div className="flex items-start gap-[105px] px-5 py-3">
              <div className="w-[200px] pt-2">
                <Typography variant="body-small-bold">
                  Daftar Pustaka
                </Typography>
              </div>
              <div className="flex-1">
                <Textarea
                  placeholder="Masukkan Daftar Pustaka"
                  value={bibliography}
                  onChange={(e) => setBibliography(e.target.value)}
                  maxLength={100}
                  showCount
                />
              </div>
            </div>

            {/* Jenis Mata Kuliah & Koordinator Mata Kuliah */}
            <div className="flex items-center gap-[105px] px-5 py-3">
              <div className="w-[200px]">
                <Typography variant="body-small-bold">
                  Jenis Mata Kuliah
                </Typography>
              </div>
              <div className="flex flex-1 items-center gap-5">
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
                        {selectedCourseType || "-Pilih Jenis Mata Kuliah-"}
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

                <div className="w-[200px]">
                  <Typography variant="body-small-bold">
                    Koordinator Mata Kuliah
                  </Typography>
                </div>

                <Dropdown>
                  <DropdownTrigger asChild>
                    <Button
                      size="lg"
                      variant="outline"
                      className="w-full justify-between"
                    >
                      <span
                        className={
                          selectedCoordinator
                            ? "text-gray-800"
                            : "text-gray-600"
                        }
                      >
                        {selectedCoordinator ||
                          "-Pilih Koordinator Mata Kuliah-"}
                      </span>
                      <CaretDownIcon className="size-5" />
                    </Button>
                  </DropdownTrigger>
                  <DropdownContent>
                    {coordinatorOptions.map((option) => (
                      <DropdownItem
                        key={option.value}
                        onSelect={() => setSelectedCoordinator(option.label)}
                      >
                        {option.label}
                      </DropdownItem>
                    ))}
                  </DropdownContent>
                </Dropdown>
              </div>
            </div>

            {/* Pilih Program Studi & Dibuka untuk Prodi Lain */}
            <div className="flex items-center gap-[105px] px-5 py-3">
              <div className="w-[200px]">
                <Typography variant="body-small-bold">
                  Pilih Program Studi
                </Typography>
              </div>
              <div className="flex flex-1 items-center gap-5">
                <Dropdown>
                  <DropdownTrigger asChild>
                    <Button
                      size="lg"
                      variant="outline"
                      className="w-full justify-between"
                    >
                      <span
                        className={
                          selectedStudyProgram
                            ? "text-gray-800"
                            : "text-gray-600"
                        }
                      >
                        {selectedStudyProgram || "-Pilih Program Studi-"}
                      </span>
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

                <div className="w-[200px]">
                  <Typography variant="body-small-bold">
                    Dibuka untuk Prodi Lain
                  </Typography>
                </div>

                <Dropdown>
                  <DropdownTrigger asChild>
                    <Button
                      size="lg"
                      variant="outline"
                      className="w-full justify-between"
                    >
                      <span
                        className={
                          selectedOpenForOtherProdi
                            ? "text-gray-800"
                            : "text-gray-600"
                        }
                      >
                        {selectedOpenForOtherProdi ||
                          "-Pilih Dibuka untuk Prodi Lain-"}
                      </span>
                      <CaretDownIcon className="size-5" />
                    </Button>
                  </DropdownTrigger>
                  <DropdownContent>
                    {openForOtherProdiOptions.map((option) => (
                      <DropdownItem
                        key={option.value}
                        onSelect={() =>
                          setSelectedOpenForOtherProdi(option.label)
                        }
                      >
                        {option.label}
                      </DropdownItem>
                    ))}
                  </DropdownContent>
                </Dropdown>
              </div>
            </div>

            {/* Mata Kuliah Spesial & MK Kampus Merdeka */}
            <div className="flex items-center gap-[105px] px-5 py-3">
              <div className="w-[200px]">
                <Typography variant="body-small-bold">
                  Mata Kuliah Spesial
                </Typography>
              </div>
              <div className="flex flex-1 items-center gap-5">
                <Dropdown>
                  <DropdownTrigger asChild>
                    <Button
                      size="lg"
                      variant="outline"
                      className="w-full justify-between"
                    >
                      <span
                        className={
                          selectedSpecialCourse
                            ? "text-gray-800"
                            : "text-gray-600"
                        }
                      >
                        {selectedSpecialCourse || "-Pilih Mata Kuliah Spesial-"}
                      </span>
                      <CaretDownIcon className="size-5" />
                    </Button>
                  </DropdownTrigger>
                  <DropdownContent>
                    {specialCourseOptions.map((option) => (
                      <DropdownItem
                        key={option.value}
                        onSelect={() => setSelectedSpecialCourse(option.label)}
                      >
                        {option.label}
                      </DropdownItem>
                    ))}
                  </DropdownContent>
                </Dropdown>

                <div className="w-[200px]">
                  <Typography variant="body-small-bold">
                    MK Kampus Merdeka
                  </Typography>
                </div>

                <Dropdown>
                  <DropdownTrigger asChild>
                    <Button
                      size="lg"
                      variant="outline"
                      className="w-full justify-between"
                    >
                      <span
                        className={
                          selectedCampusMerdeka
                            ? "text-gray-800"
                            : "text-gray-600"
                        }
                      >
                        {selectedCampusMerdeka || "-Pilih MK Kampus Merdeka-"}
                      </span>
                      <CaretDownIcon className="size-5" />
                    </Button>
                  </DropdownTrigger>
                  <DropdownContent>
                    {campusMerdekaOptions.map((option) => (
                      <DropdownItem
                        key={option.value}
                        onSelect={() => setSelectedCampusMerdeka(option.label)}
                      >
                        {option.label}
                      </DropdownItem>
                    ))}
                  </DropdownContent>
                </Dropdown>
              </div>
            </div>

            {/* Mata Kuliah Wajib & Mata Kuliah Kerja Praktik */}
            <div className="flex items-center gap-[105px] px-5 py-3">
              <div className="w-[200px]">
                <Typography variant="body-small-bold">
                  Mata Kuliah Wajib
                </Typography>
              </div>
              <div className="flex flex-1 items-center gap-5">
                <Dropdown>
                  <DropdownTrigger asChild>
                    <Button
                      size="lg"
                      variant="outline"
                      className="w-full justify-between"
                    >
                      <span
                        className={
                          selectedRequiredCourse
                            ? "text-gray-800"
                            : "text-gray-600"
                        }
                      >
                        {selectedRequiredCourse || "-Pilih Mata Kuliah Wajib-"}
                      </span>
                      <CaretDownIcon className="size-5" />
                    </Button>
                  </DropdownTrigger>
                  <DropdownContent>
                    {requiredCourseOptions.map((option) => (
                      <DropdownItem
                        key={option.value}
                        onSelect={() => setSelectedRequiredCourse(option.label)}
                      >
                        {option.label}
                      </DropdownItem>
                    ))}
                  </DropdownContent>
                </Dropdown>

                <div className="w-[200px]">
                  <Typography variant="body-small-bold">
                    Mata Kuliah Kerja Praktik
                  </Typography>
                </div>

                <Dropdown>
                  <DropdownTrigger asChild>
                    <Button
                      size="lg"
                      variant="outline"
                      className="w-full justify-between"
                    >
                      <span
                        className={
                          selectedPracticalCourse
                            ? "text-gray-800"
                            : "text-gray-600"
                        }
                      >
                        {selectedPracticalCourse || "-Pilih MK Kerja Praktik-"}
                      </span>
                      <CaretDownIcon className="size-5" />
                    </Button>
                  </DropdownTrigger>
                  <DropdownContent>
                    {practicalCourseOptions.map((option) => (
                      <DropdownItem
                        key={option.value}
                        onSelect={() =>
                          setSelectedPracticalCourse(option.label)
                        }
                      >
                        {option.label}
                      </DropdownItem>
                    ))}
                  </DropdownContent>
                </Dropdown>
              </div>
            </div>

            {/* Mata Kuliah Capstone & Mata Kuliah Minor */}
            <div className="flex items-center gap-[105px] px-5 py-3">
              <div className="w-[200px]">
                <Typography variant="body-small-bold">
                  Mata Kuliah Capstone
                </Typography>
              </div>
              <div className="flex flex-1 items-center gap-5">
                <Dropdown>
                  <DropdownTrigger asChild>
                    <Button
                      size="lg"
                      variant="outline"
                      className="w-full justify-between"
                    >
                      <span
                        className={
                          selectedCapstoneCourse
                            ? "text-gray-800"
                            : "text-gray-600"
                        }
                      >
                        {selectedCapstoneCourse ||
                          "-Pilih Mata Kuliah Capstone-"}
                      </span>
                      <CaretDownIcon className="size-5" />
                    </Button>
                  </DropdownTrigger>
                  <DropdownContent>
                    {capstoneCourseOptions.map((option) => (
                      <DropdownItem
                        key={option.value}
                        onSelect={() => setSelectedCapstoneCourse(option.label)}
                      >
                        {option.label}
                      </DropdownItem>
                    ))}
                  </DropdownContent>
                </Dropdown>

                <div className="w-[200px]">
                  <Typography variant="body-small-bold">
                    Mata Kuliah Minor
                  </Typography>
                </div>

                <Dropdown>
                  <DropdownTrigger asChild>
                    <Button
                      size="lg"
                      variant="outline"
                      className="w-full justify-between"
                    >
                      <span
                        className={
                          selectedMinorCourse
                            ? "text-gray-800"
                            : "text-gray-600"
                        }
                      >
                        {selectedMinorCourse || "-Pilih Mata Kuliah Minor-"}
                      </span>
                      <CaretDownIcon className="size-5" />
                    </Button>
                  </DropdownTrigger>
                  <DropdownContent>
                    {minorCourseOptions.map((option) => (
                      <DropdownItem
                        key={option.value}
                        onSelect={() => setSelectedMinorCourse(option.label)}
                      >
                        {option.label}
                      </DropdownItem>
                    ))}
                  </DropdownContent>
                </Dropdown>
              </div>
            </div>

            {/* Mata Kuliah Tugas Akhir */}
            <div className="flex items-center gap-[105px] px-5 py-3">
              <div className="w-[200px]">
                <Typography variant="body-small-bold">
                  Mata Kuliah Tugas Akhir
                </Typography>
              </div>
              <div className="flex-1">
                <Dropdown>
                  <DropdownTrigger asChild>
                    <Button
                      size="lg"
                      variant="outline"
                      className="w-full max-w-[300px] justify-between"
                    >
                      <span
                        className={
                          selectedFinalProjectCourse
                            ? "text-gray-800"
                            : "text-gray-600"
                        }
                      >
                        {selectedFinalProjectCourse ||
                          "-Pilih Mata Kuliah Tugas Akhir-"}
                      </span>
                      <CaretDownIcon className="size-5" />
                    </Button>
                  </DropdownTrigger>
                  <DropdownContent>
                    {finalProjectCourseOptions.map((option) => (
                      <DropdownItem
                        key={option.value}
                        onSelect={() =>
                          setSelectedFinalProjectCourse(option.label)
                        }
                      >
                        {option.label}
                      </DropdownItem>
                    ))}
                  </DropdownContent>
                </Dropdown>
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

        {/* Mata Kuliah Prasyarat Card */}
        <div className="flex flex-col rounded-xl border border-gray-400 bg-white pb-5">
          <div className="flex items-center justify-between px-5 py-5">
            <Typography variant="body-medium-bold">
              Mata Kuliah Prasyarat
            </Typography>
            <Button size="lg" variant="primary" onClick={handleAddPrerequisite}>
              Tambah Mata Kuliah Prasyarat
            </Button>
          </div>

          <div className="px-5">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Kode Mata Kuliah</TableHead>
                  <TableHead>Nama Mata Kuliah Prasyarat</TableHead>
                  <TableHead>Tipe Prasyarat</TableHead>
                  <TableHead>Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {prerequisiteCourses.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="py-8 text-center">
                      <Typography
                        variant="body-small"
                        className="text-muted-foreground"
                      >
                        Belum ada mata kuliah prasyarat
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  prerequisiteCourses.map((course) => (
                    <TableRow key={course.id}>
                      <TableCell>{course.code}</TableCell>
                      <TableCell>{course.name}</TableCell>
                      <TableCell>{course.prerequisiteType}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            size="md"
                            variant="tertiary"
                            onClick={() => handleEditPrerequisite(course)}
                          >
                            <PencilIcon />
                            Edit
                          </Button>
                          <Button
                            size="md"
                            variant="ghost"
                            className="text-gray-500"
                            onClick={() => handleDeletePrerequisite(course.id)}
                          >
                            <TrashIcon />
                            Hapus
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-5 rounded-xl bg-white p-5">
          <Button
            size="lg"
            variant="secondary"
            className="w-[151px]"
            onClick={handleCancel}
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
      </div>

      <PrerequisiteCourseDialog
        open={isPrerequisiteDialogOpen}
        onOpenChange={setIsPrerequisiteDialogOpen}
        onConfirm={handleConfirmPrerequisites}
      />
    </div>
  );
}
