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
  DownloadIcon,
  FilterIcon,
  PencilIcon,
  PlusIcon,
  SearchIcon,
  TrashIcon,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "uper-ui/tabs";
import { Tag } from "uper-ui/tags";
import { Typography } from "uper-ui/typography";

import type { CourseScheduleDetail } from "./ViewCourseScheduleDialog";
import { ViewCourseScheduleDialog } from "./ViewCourseScheduleDialog";

interface Schedule {
  id: number;
  semester: number;
  courseName: string;
  className: string;
  capacity: number;
  schedules: Array<{
    day: string;
    time: string;
    room: string;
  }>;
  instructors: Array<string>;
}

const scheduleData: Array<Schedule> = [
  {
    id: 1,
    semester: 1,
    courseName: "Bahasa Indonesia",
    className: "Bahasa Indonesia-CE1-2024",
    capacity: 50,
    schedules: [{ day: "Selasa", time: "13:00 - 14:40", room: "Ruang 2201" }],
    instructors: ["Acep Iwan Saldi"],
  },
  {
    id: 2,
    semester: 1,
    courseName: "Bahasa Inggris I",
    className: "Bahasa Inggris I-CE1-2024",
    capacity: 50,
    schedules: [
      { day: "Selasa", time: "11:30 - 12:30", room: "Ruang 2801" },
      { day: "Rabu", time: "08:00 - 09:40", room: "Ruang 2801" },
    ],
    instructors: ["Rinaldi Medali Rachman"],
  },
  {
    id: 3,
    semester: 1,
    courseName: "Berpikir Kritis",
    className: "Berpikir Kritis-CE1A-2024",
    capacity: 70,
    schedules: [{ day: "Kamis", time: "09:00 - 10:40", room: "Ruang 2201" }],
    instructors: ["Alfiana Permata Sari"],
  },
  {
    id: 4,
    semester: 8,
    courseName: "Cipta Karsa",
    className: "Cipta Karsa-CE1-2024",
    capacity: 70,
    schedules: [
      { day: "Selasa", time: "15:30 - 17:10", room: "Ruang Kelas ABC" },
    ],
    instructors: ["Rinaldi Medali Rachman"],
  },
  {
    id: 5,
    semester: 5,
    courseName: "Desain Alat Industri Kimia",
    className: "Desain Alat Industri Kimia-CE5-2024",
    capacity: 65,
    schedules: [
      { day: "Selasa", time: "11:30 - 12:30", room: "Ruang 2801" },
      { day: "Rabu", time: "08:00 - 09:40", room: "Ruang Online" },
    ],
    instructors: ["Ayu Dahlianti", "Ika Dyah Widharyanti"],
  },
  {
    id: 6,
    semester: 7,
    courseName: "Desain Pabrik Kimia",
    className: "Desain Pabrik Kimia-Agung Nugroho 2024-1",
    capacity: 70,
    schedules: [
      { day: "Selasa", time: "15:30 - 17:10", room: "Ruang Kelas ABC" },
    ],
    instructors: ["Agung Nugroho"],
  },
  {
    id: 7,
    semester: 5,
    courseName: "Desain Pabrik Kimia",
    className: "Desain Pabrik Kimia-Alfiana Permata Sari 2024-1",
    capacity: 65,
    schedules: [
      { day: "Selasa", time: "11:30 - 12:30", room: "Ruang 2801" },
      { day: "Rabu", time: "08:00 - 09:40", room: "Ruang 2801" },
    ],
    instructors: ["Alfiana Permata Sari"],
  },
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

const roleOptions = [
  { label: "Admin Universitas", value: "admin-university" },
  { label: "Admin Fakultas", value: "admin-faculty" },
  { label: "Admin Program Studi", value: "admin-study-program" },
];

export function CourseScheduleListView() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchQueryParent, setSearchQueryParent] = useState("");
  const [selectedLectureType, setSelectedLectureType] = useState("Reguler");
  const [selectedStudyProgram, setSelectedStudyProgram] =
    useState("Ilmu Kimia");
  const [selectedRole, setSelectedRole] = useState("Admin Universitas");
  const [selectedStudyProgramParent, setSelectedStudyProgramParent] =
    useState("Teknik Kimia");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(7);
  const [activeTab, setActiveTab] = useState("study-program");
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [selectedScheduleDetail, setSelectedScheduleDetail] =
    useState<CourseScheduleDetail | null>(null);

  const totalPages = Math.ceil(scheduleData.length / pageSize);

  const handleView = useCallback((schedule: Schedule) => {
    // Convert Schedule to CourseScheduleDetail for the dialog
    const scheduleDetail: CourseScheduleDetail = {
      id: schedule.id,
      lectureProgram: "Reguler",
      studyProgram: "Ilmu Komputer",
      period: "2025-Ganjil",
      courseName: schedule.courseName,
      className: schedule.className,
      shortName: schedule.className.split("-").pop() || "",
      capacity: schedule.capacity,
      mbkmClass: "Tidak",
      startDate: "06-02-2025",
      endDate: "06-02-2025",
      instructors: schedule.instructors.map((name, index) => ({
        id: index + 1,
        name,
        status: index === 0 ? "Pengajar Utama" : "Pengajar Pendamping",
      })),
      schedules: schedule.schedules.map((s, index) => {
        const [startTime, endTime] = s.time.split(" - ");
        return {
          id: index + 1,
          day: s.day,
          startTime: startTime || "",
          endTime: endTime || "",
          room: s.room,
        };
      }),
    };
    setSelectedScheduleDetail(scheduleDetail);
    setIsViewDialogOpen(true);
  }, []);

  const handleDelete = useCallback((schedule: Schedule) => {
    console.warn("Delete schedule:", schedule);
  }, []);

  const handlePublish = useCallback((schedule: CourseScheduleDetail) => {
    console.warn("Publish schedule:", schedule);
    setIsViewDialogOpen(false);
  }, []);

  const renderScheduleCell = (schedules: Schedule["schedules"]) => {
    return (
      <div className="flex flex-col gap-1">
        {schedules.map((schedule, index) => (
          <div key={index} className="text-left">
            <p>
              • {schedule.day} ( {schedule.time} )
            </p>
            <p className="font-bold">[{schedule.room}]</p>
          </div>
        ))}
      </div>
    );
  };

  const renderInstructorsCell = (instructors: Array<string>) => {
    if (instructors.length === 1) {
      return <span>{instructors[0]}</span>;
    }
    return (
      <ul className="list-inside list-disc text-left">
        {instructors.map((instructor, index) => (
          <li key={index}>{instructor}</li>
        ))}
      </ul>
    );
  };

  return (
    <div className="flex flex-col gap-5 pt-5">
      <Breadcrumb
        items={[{ href: "/", label: "Beranda" }, { label: "Jadwal Kuliah" }]}
      />
      <Typography variant="h6">Jadwal Kuliah</Typography>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList variant="folder">
          <TabsTrigger value="study-program" variant="folder">
            Jadwal Kuliah Program Studi
          </TabsTrigger>
          <TabsTrigger value="parent-institution" variant="folder">
            Jadwal Kuliah Institusi Parent
          </TabsTrigger>
        </TabsList>

        <TabsContent value="study-program" variant="folder">
          <div className="flex flex-col gap-5 rounded-tr-xl rounded-b-xl bg-white p-5">
            <Typography variant="h5">Jadwal Kuliah Program Studi</Typography>

            <div className="flex items-center gap-5">
              <Typography variant="body-medium-bold">
                Program Perkuliahan
              </Typography>
              <Dropdown>
                <DropdownTrigger asChild>
                  <Tag color="red" type="filled" className="cursor-pointer">
                    {selectedLectureType}
                    <CaretDownIcon className="size-4" />
                  </Tag>
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

              <Typography variant="body-medium-bold">Program Studi</Typography>
              <Dropdown>
                <DropdownTrigger asChild>
                  <Tag color="red" type="filled" className="cursor-pointer">
                    {selectedStudyProgram}
                    <CaretDownIcon className="size-4" />
                  </Tag>
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

            <div className="flex items-center justify-between gap-5">
              <Input
                placeholder="Nama Pengajar / Nama Mata Kuliah / Hari"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onClear={() => setSearchQuery("")}
                endIcon={<SearchIcon />}
                wrapperClassName="max-w-md"
              />

              <Button size="lg" variant="secondary">
                Urutkan
                <FilterIcon className="size-5" />
              </Button>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Semester</TableHead>
                  <TableHead>Mata Kuliah</TableHead>
                  <TableHead>Nama Kelas</TableHead>
                  <TableHead>Kapasitas</TableHead>
                  <TableHead>Jadwal</TableHead>
                  <TableHead>Pengajar</TableHead>
                  <TableHead>Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {scheduleData.map((schedule, index) => (
                  <TableRow
                    key={schedule.id}
                    className={index % 2 === 0 ? "bg-muted" : "bg-white"}
                  >
                    <TableCell>{schedule.semester}</TableCell>
                    <TableCell>{schedule.courseName}</TableCell>
                    <TableCell>{schedule.className}</TableCell>
                    <TableCell>{schedule.capacity}</TableCell>
                    <TableCell>
                      {renderScheduleCell(schedule.schedules)}
                    </TableCell>
                    <TableCell>
                      {renderInstructorsCell(schedule.instructors)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center gap-2">
                        <Button
                          onClick={() => handleView(schedule)}
                          size="md"
                          variant="ghost"
                        >
                          <SearchIcon />
                          Lihat
                        </Button>
                        <Link
                          to="/course-schedule/$id/edit"
                          params={{ id: String(schedule.id) }}
                        >
                          <Button size="md" variant="tertiary">
                            <PencilIcon />
                            Ubah
                          </Button>
                        </Link>
                        <Button
                          onClick={() => handleDelete(schedule)}
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
              <Link to="/course-schedule/import">
                <Button size="lg" variant="secondary">
                  Impor File FET
                  <DownloadIcon className="size-5" />
                </Button>
              </Link>
              <Link to="/course-schedule/create">
                <Button size="lg" variant="primary">
                  Tambah Jadwal Baru
                  <PlusIcon className="size-5 text-white" />
                </Button>
              </Link>
              <Button size="lg" variant="primary">
                Publish
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="parent-institution" variant="folder">
          <div className="flex flex-col gap-5 rounded-tr-xl rounded-b-xl bg-white p-5">
            <Typography variant="h5">Jadwal Kuliah Institusi Parent</Typography>

            <div className="flex items-center gap-5">
              <Typography variant="body-medium-bold">Peran</Typography>
              <Dropdown>
                <DropdownTrigger asChild>
                  <Tag color="red" type="filled" className="cursor-pointer">
                    {selectedRole}
                    <CaretDownIcon className="size-4" />
                  </Tag>
                </DropdownTrigger>
                <DropdownContent>
                  {roleOptions.map((option) => (
                    <DropdownItem
                      key={option.value}
                      onSelect={() => setSelectedRole(option.label)}
                    >
                      {option.label}
                    </DropdownItem>
                  ))}
                </DropdownContent>
              </Dropdown>

              <Typography variant="body-medium-bold">Program Studi</Typography>
              <Dropdown>
                <DropdownTrigger asChild>
                  <Tag
                    color="red"
                    type="with-border"
                    className="cursor-pointer"
                  >
                    {selectedStudyProgramParent}
                    <CaretDownIcon className="size-4" />
                  </Tag>
                </DropdownTrigger>
                <DropdownContent>
                  {studyProgramOptions.map((option) => (
                    <DropdownItem
                      key={option.value}
                      onSelect={() =>
                        setSelectedStudyProgramParent(option.label)
                      }
                    >
                      {option.label}
                    </DropdownItem>
                  ))}
                </DropdownContent>
              </Dropdown>
            </div>

            <div className="flex items-center justify-between gap-5">
              <Input
                placeholder="Nama Pengajar / Nama Mata Kuliah / Hari"
                value={searchQueryParent}
                onChange={(e) => setSearchQueryParent(e.target.value)}
                onClear={() => setSearchQueryParent("")}
                endIcon={<SearchIcon />}
                wrapperClassName="max-w-md"
              />

              <Button size="lg" variant="secondary">
                Urutkan
                <FilterIcon className="size-5" />
              </Button>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Mata Kuliah</TableHead>
                  <TableHead>Nama Kelas</TableHead>
                  <TableHead>Kapasitas</TableHead>
                  <TableHead>Jadwal</TableHead>
                  <TableHead>Pengajar</TableHead>
                  <TableHead>Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {scheduleData.map((schedule, index) => (
                  <TableRow
                    key={schedule.id}
                    className={index % 2 === 0 ? "bg-muted" : "bg-white"}
                  >
                    <TableCell>{schedule.courseName}</TableCell>
                    <TableCell>{schedule.className}</TableCell>
                    <TableCell>{schedule.capacity}</TableCell>
                    <TableCell>
                      {renderScheduleCell(schedule.schedules)}
                    </TableCell>
                    <TableCell>
                      {renderInstructorsCell(schedule.instructors)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center gap-2">
                        <Button
                          onClick={() => handleView(schedule)}
                          size="md"
                          variant="ghost"
                        >
                          <SearchIcon />
                          Lihat
                        </Button>
                        <Link
                          to="/course-schedule/$id/edit"
                          params={{ id: String(schedule.id) }}
                        >
                          <Button size="md" variant="tertiary">
                            <PencilIcon />
                            Ubah
                          </Button>
                        </Link>
                        <Button
                          onClick={() => handleDelete(schedule)}
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
              <Link to="/course-schedule/import">
                <Button size="lg" variant="secondary">
                  Impor File FET
                  <DownloadIcon className="size-5" />
                </Button>
              </Link>
              <Link to="/course-schedule/create">
                <Button size="lg" variant="primary">
                  Tambah Jadwal Baru
                  <PlusIcon className="size-5 text-white" />
                </Button>
              </Link>
              <Button size="lg" variant="primary">
                Publish
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={81}
        pageSize={pageSize}
        onPageChange={setCurrentPage}
        onPageSizeChange={setPageSize}
        showPageSizeSelector
        showResultsInfo
        showSearchPage
      />

      <ViewCourseScheduleDialog
        open={isViewDialogOpen}
        onOpenChange={setIsViewDialogOpen}
        schedule={selectedScheduleDetail}
        onPublish={handlePublish}
      />
    </div>
  );
}
