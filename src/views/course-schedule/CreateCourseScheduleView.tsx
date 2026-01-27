import { Link, useParams } from "@tanstack/react-router";
import { useCallback, useState } from "react";

import { Breadcrumb } from "@/components/breadcrumb";
import { Button } from "@/components/button";
import { DatePicker } from "@/components/date-picker";
import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
} from "@/components/dropdown";
import {
  CaretDownIcon,
  CaretLeftIcon,
  CourseIcon,
  PencilIcon,
  TrashIcon,
} from "@/components/icon";
import { Input } from "@/components/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/table";
import { Typography } from "@/components/typography";

import type { ClassSchedule as ClassScheduleData } from "./AddClassScheduleDialog";
import { AddClassScheduleDialog } from "./AddClassScheduleDialog";
import type { Instructor as InstructorData } from "./AddInstructorDialog";
import { AddInstructorDialog } from "./AddInstructorDialog";
import type { Course } from "./SelectCourseDialog";
import { SelectCourseDialog } from "./SelectCourseDialog";

const periodOptions = [
  { label: "2024/2025 Ganjil", value: "2024-2025-1" },
  { label: "2024/2025 Genap", value: "2024-2025-2" },
  { label: "2023/2024 Ganjil", value: "2023-2024-1" },
  { label: "2023/2024 Genap", value: "2023-2024-2" },
];

const lectureTypeOptions = [
  { label: "Reguler", value: "regular" },
  { label: "Non-Reguler", value: "non-regular" },
  { label: "Karyawan", value: "employee" },
];

const studyProgramOptions = [
  { label: "Ilmu Kimia", value: "chemistry" },
  { label: "Teknik Kimia", value: "chemical-engineering" },
  { label: "Teknik Perminyakan", value: "petroleum-engineering" },
  { label: "Teknik Industri", value: "industrial-engineering" },
];

const mbkmClassOptions = [
  { label: "Ya", value: "yes" },
  { label: "Tidak", value: "no" },
];

interface Instructor {
  id: number;
  name: string;
  status: string;
}

interface ClassSchedule {
  id: number;
  day: string;
  startTime: string;
  endTime: string;
  room: string;
}

interface CreateCourseScheduleViewProps {
  mode?: "create" | "edit";
}

export function CreateCourseScheduleView({
  mode = "create",
}: CreateCourseScheduleViewProps) {
  const { id: _id } = useParams({ strict: false });
  const isEditMode = mode === "edit";
  const [selectedPeriod, setSelectedPeriod] = useState("");
  const [selectedLectureType, setSelectedLectureType] = useState("");
  const [selectedStudyProgram, setSelectedStudyProgram] = useState("");
  const [courseName, setCourseName] = useState("");
  const [className, setClassName] = useState("");
  const [shortName, setShortName] = useState("");
  const [capacity, setCapacity] = useState("");
  const [selectedMbkmClass, setSelectedMbkmClass] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  // Instructors list
  const [instructors, setInstructors] = useState<Array<Instructor>>([]);

  // Class schedules list
  const [classSchedules, setClassSchedules] = useState<Array<ClassSchedule>>(
    []
  );

  // Selected course
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  // Dialog states
  const [isSelectCourseDialogOpen, setIsSelectCourseDialogOpen] =
    useState(false);
  const [isAddInstructorDialogOpen, setIsAddInstructorDialogOpen] =
    useState(false);
  const [isAddClassScheduleDialogOpen, setIsAddClassScheduleDialogOpen] =
    useState(false);

  const handleAddInstructor = useCallback(() => {
    setIsAddInstructorDialogOpen(true);
  }, []);

  const handleInstructorSelected = useCallback((instructor: InstructorData) => {
    setInstructors((prev) => [
      ...prev,
      {
        id: instructor.id,
        name: instructor.name,
        status: "Pengajar Utama",
      },
    ]);
  }, []);

  const handleEditInstructor = useCallback((instructor: Instructor) => {
    console.log("Edit instructor:", instructor);
  }, []);

  const handleDeleteInstructor = useCallback((id: number) => {
    setInstructors((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const handleAddClassSchedule = useCallback(() => {
    setIsAddClassScheduleDialogOpen(true);
  }, []);

  const handleClassScheduleConfirmed = useCallback(
    (schedule: Omit<ClassScheduleData, "id">) => {
      setClassSchedules((prev) => [
        ...prev,
        {
          id: Date.now(),
          day: schedule.day,
          startTime: schedule.startTime,
          endTime: schedule.endTime,
          room: schedule.room,
        },
      ]);
    },
    []
  );

  const handleEditClassSchedule = useCallback((schedule: ClassSchedule) => {
    console.log("Edit schedule:", schedule);
  }, []);

  const handleDeleteClassSchedule = useCallback((id: number) => {
    setClassSchedules((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const handleOpenSelectCourseDialog = useCallback(() => {
    setIsSelectCourseDialogOpen(true);
  }, []);

  const handleCourseSelected = useCallback((course: Course) => {
    setSelectedCourse(course);
    setCourseName(course.name);
  }, []);

  const handleCancel = useCallback(() => {
    console.log("Cancel");
  }, []);

  const handleSave = useCallback(() => {
    console.log("Save course schedule", {
      selectedPeriod,
      selectedLectureType,
      selectedStudyProgram,
      selectedCourse,
      courseName,
      className,
      shortName,
      capacity,
      selectedMbkmClass,
      startDate,
      endDate,
      instructors,
      classSchedules,
    });
  }, [
    selectedPeriod,
    selectedLectureType,
    selectedStudyProgram,
    selectedCourse,
    courseName,
    className,
    shortName,
    capacity,
    selectedMbkmClass,
    startDate,
    endDate,
    instructors,
    classSchedules,
  ]);

  return (
    <div className="flex flex-col gap-5 pt-5">
      <Breadcrumb
        items={[
          { href: "/", label: "Beranda" },
          { href: "/course-schedule", label: "Jadwal Kuliah" },
          {
            label: isEditMode
              ? "Ubah Jadwal Kuliah Program Studi"
              : "Tambah Jadwal Kuliah Program Studi",
          },
        ]}
      />
      <Typography variant="h6">
        {isEditMode
          ? "Ubah Jadwal Kuliah Program Studi"
          : "Tambah Jadwal Kuliah Program Studi"}
      </Typography>

      <Link to="/course-schedule">
        <Button size="lg" variant="tertiary">
          <CaretLeftIcon />
          Jadwal Kuliah Program Studi
        </Button>
      </Link>

      <div className="flex flex-col gap-5">
        {/* Informasi Kelas Card */}
        <div className="flex flex-col gap-0 rounded-xl border border-gray-400 bg-white pb-5">
          <div className="p-5">
            <Typography variant="body-medium-bold">Informasi Kelas</Typography>
          </div>

          <div className="flex flex-col">
            {/* Periode */}
            <div className="flex items-center gap-5 px-5 py-3">
              <div className="w-[200px]">
                <Typography variant="body-small-bold">Periode</Typography>
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
                          selectedPeriod ? "text-gray-800" : "text-gray-600"
                        }
                      >
                        {selectedPeriod || "-Pilih Periode-"}
                      </span>
                      <CaretDownIcon className="size-5" />
                    </Button>
                  </DropdownTrigger>
                  <DropdownContent>
                    {periodOptions.map((option) => (
                      <DropdownItem
                        key={option.value}
                        onSelect={() => setSelectedPeriod(option.label)}
                      >
                        {option.label}
                      </DropdownItem>
                    ))}
                  </DropdownContent>
                </Dropdown>
              </div>
            </div>

            {/* Program Perkuliahan & Program Studi */}
            <div className="flex items-center gap-5 px-5 py-3">
              <div className="flex flex-1 items-center gap-5">
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
                            selectedLectureType
                              ? "text-gray-800"
                              : "text-gray-600"
                          }
                        >
                          {selectedLectureType || "-Pilih Program Perkuliahan-"}
                        </span>
                        <CaretDownIcon className="size-5" />
                      </Button>
                    </DropdownTrigger>
                    <DropdownContent>
                      {lectureTypeOptions.map((option) => (
                        <DropdownItem
                          key={option.value}
                          onSelect={() => setSelectedLectureType(option.label)}
                        >
                          {option.label}
                        </DropdownItem>
                      ))}
                    </DropdownContent>
                  </Dropdown>
                </div>
              </div>

              <div className="flex flex-1 items-center gap-5">
                <div className="w-[200px]">
                  <Typography variant="body-small-bold">
                    Program Studi
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
                            selectedStudyProgram
                              ? "text-gray-800"
                              : "text-gray-600"
                          }
                        >
                          {selectedStudyProgram || "-Pilih Program Studi"}
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
                </div>
              </div>
            </div>

            {/* Nama Mata Kuliah */}
            <div className="flex items-center gap-5 px-5 py-3">
              <div className="w-[200px]">
                <Typography variant="body-small-bold">
                  Nama Mata Kuliah
                </Typography>
              </div>
              <div className="flex flex-1 items-center gap-3">
                <Input
                  size="lg"
                  placeholder="Pilih Mata Kuliah"
                  value={courseName}
                  onChange={(e) => setCourseName(e.target.value)}
                  disabled
                  wrapperClassName="flex-1"
                />
                <Button
                  size="lg"
                  variant="primary"
                  onClick={handleOpenSelectCourseDialog}
                >
                  <CourseIcon className="size-5" />
                  Pilih Mata Kuliah
                </Button>
              </div>
            </div>

            {/* Nama Kelas */}
            <div className="flex items-center gap-5 px-5 py-3">
              <div className="w-[200px]">
                <Typography variant="body-small-bold">Nama Kelas</Typography>
              </div>
              <div className="flex-1">
                <Input
                  size="lg"
                  placeholder="Masukan Nama Kelas. Contoh: Makroekonomi-EC2"
                  value={className}
                  onChange={(e) => setClassName(e.target.value)}
                />
              </div>
            </div>

            {/* Nama Singkat */}
            <div className="flex items-center gap-5 px-5 py-3">
              <div className="w-[200px]">
                <Typography variant="body-small-bold">Nama Singkat</Typography>
              </div>
              <div className="flex-1">
                <Input
                  size="lg"
                  placeholder="Masukan Nama Singkat. Contoh: EC2"
                  value={shortName}
                  onChange={(e) => setShortName(e.target.value)}
                />
              </div>
            </div>

            {/* Kapasitas Peserta & Kelas MBKM */}
            <div className="flex items-center gap-5 px-5 py-3">
              <div className="flex flex-1 items-center gap-5">
                <div className="w-[200px]">
                  <Typography variant="body-small-bold">
                    Kapasitas Peserta
                  </Typography>
                </div>
                <div className="flex-1">
                  <Input
                    size="lg"
                    placeholder="Masukan Kapasitas. Contoh: 50"
                    value={capacity}
                    onChange={(e) => setCapacity(e.target.value)}
                    type="number"
                  />
                </div>
              </div>

              <div className="flex flex-1 items-center gap-5">
                <div className="w-[200px]">
                  <Typography variant="body-small-bold">Kelas MBKM</Typography>
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
                            selectedMbkmClass
                              ? "text-gray-800"
                              : "text-gray-600"
                          }
                        >
                          {selectedMbkmClass || "-Pilih Kelas MBKM-"}
                        </span>
                        <CaretDownIcon className="size-5" />
                      </Button>
                    </DropdownTrigger>
                    <DropdownContent>
                      {mbkmClassOptions.map((option) => (
                        <DropdownItem
                          key={option.value}
                          onSelect={() => setSelectedMbkmClass(option.label)}
                        >
                          {option.label}
                        </DropdownItem>
                      ))}
                    </DropdownContent>
                  </Dropdown>
                </div>
              </div>
            </div>

            {/* Tanggal Mulai & Tanggal Berakhir */}
            <div className="flex items-center gap-5 px-5 py-3">
              <div className="flex flex-1 items-center gap-5">
                <div className="w-[200px]">
                  <Typography variant="body-small-bold">
                    Tanggal Mulai
                  </Typography>
                </div>
                <div className="flex-1">
                  <DatePicker
                    value={startDate}
                    onChange={setStartDate}
                    placeholder="dd-mm-yyyy"
                    showTime={false}
                    suffixText=""
                  />
                </div>
              </div>

              <div className="flex flex-1 items-center gap-5">
                <div className="w-[200px]">
                  <Typography variant="body-small-bold">
                    Tanggal Berakhir
                  </Typography>
                </div>
                <div className="flex-1">
                  <DatePicker
                    value={endDate}
                    onChange={setEndDate}
                    placeholder="dd-mm-yyyy"
                    showTime={false}
                    suffixText=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Daftar Pengajar Card */}
        <div className="flex flex-col rounded-xl border border-gray-400 bg-white pb-5">
          <div className="flex items-center justify-between px-5 py-5">
            <Typography variant="body-medium-bold">Daftar Pengajar</Typography>
            <Button size="lg" variant="primary" onClick={handleAddInstructor}>
              Tambah Pengajar
            </Button>
          </div>

          <div className="px-5">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nama Pengajar</TableHead>
                  <TableHead>Status Pengajar</TableHead>
                  <TableHead>Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {instructors.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={3} className="py-8 text-center">
                      <Typography
                        variant="body-small"
                        className="text-muted-foreground"
                      >
                        Belum ada pengajar
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  instructors.map((instructor) => (
                    <TableRow key={instructor.id}>
                      <TableCell>{instructor.name}</TableCell>
                      <TableCell>{instructor.status}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            size="md"
                            variant="tertiary"
                            onClick={() => handleEditInstructor(instructor)}
                          >
                            <PencilIcon />
                            Edit
                          </Button>
                          <Button
                            size="md"
                            variant="ghost"
                            className="text-gray-500"
                            onClick={() =>
                              handleDeleteInstructor(instructor.id)
                            }
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

        {/* Daftar Jadwal Kelas Card */}
        <div className="flex flex-col rounded-xl border border-gray-400 bg-white pb-5">
          <div className="flex items-center justify-between px-5 py-5">
            <Typography variant="body-medium-bold">
              Daftar Jadwal Kelas
            </Typography>
            <Button
              size="lg"
              variant="primary"
              onClick={handleAddClassSchedule}
            >
              Tambah Jadwal Kelas
            </Button>
          </div>

          <div className="px-5">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Hari</TableHead>
                  <TableHead>Waktu Mulai Kelas</TableHead>
                  <TableHead>Waktu Selesai Kelas</TableHead>
                  <TableHead>Ruangan</TableHead>
                  <TableHead>Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {classSchedules.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="py-8 text-center">
                      <Typography
                        variant="body-small"
                        className="text-muted-foreground"
                      >
                        Belum ada jadwal kelas
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  classSchedules.map((schedule) => (
                    <TableRow key={schedule.id}>
                      <TableCell>{schedule.day}</TableCell>
                      <TableCell>{schedule.startTime}</TableCell>
                      <TableCell>{schedule.endTime}</TableCell>
                      <TableCell>{schedule.room}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            size="md"
                            variant="tertiary"
                            onClick={() => handleEditClassSchedule(schedule)}
                          >
                            <PencilIcon />
                            Edit
                          </Button>
                          <Button
                            size="md"
                            variant="ghost"
                            className="text-gray-500"
                            onClick={() =>
                              handleDeleteClassSchedule(schedule.id)
                            }
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

      <SelectCourseDialog
        open={isSelectCourseDialogOpen}
        onOpenChange={setIsSelectCourseDialogOpen}
        onSelect={handleCourseSelected}
      />

      <AddInstructorDialog
        open={isAddInstructorDialogOpen}
        onOpenChange={setIsAddInstructorDialogOpen}
        onSelect={handleInstructorSelected}
      />

      <AddClassScheduleDialog
        open={isAddClassScheduleDialogOpen}
        onOpenChange={setIsAddClassScheduleDialogOpen}
        onConfirm={handleClassScheduleConfirmed}
      />
    </div>
  );
}
