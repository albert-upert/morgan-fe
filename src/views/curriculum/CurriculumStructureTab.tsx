import { useCallback, useState } from "react";
import { Button } from "@/components/button";
import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
} from "@/components/dropdown";
import { CaretDownIcon, CaretUpIcon } from "@/components/icon";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/tabs";
import { Typography } from "@/components/typography";

interface Course {
  id: number;
  code: string;
  name: string;
  credits: number;
}

interface Semester {
  id: number;
  name: string;
  totalCredits: number;
  courses: Array<Course>;
}

const semesterData: Array<Semester> = [
  {
    id: 1,
    name: "Semester 1",
    totalCredits: 24,
    courses: [
      { id: 1, code: "SPFA212100", name: "Ilmu Sosial Dasar", credits: 3 },
      { id: 2, code: "SPFA212104", name: "Pengantar Ilmu Politik", credits: 3 },
      {
        id: 3,
        code: "SPFA212100",
        name: "Sejarah Sosial Politik Indonesia",
        credits: 3,
      },
      {
        id: 4,
        code: "SPFA212100",
        name: "Sistem Sosial Politik Indonesia",
        credits: 3,
      },
      {
        id: 5,
        code: "SPFA212100",
        name: "Pengantar Ilmu Hubungan Internasional",
        credits: 3,
      },
      { id: 6, code: "SPFA212100", name: "Diplomasi", credits: 3 },
      {
        id: 7,
        code: "SPFA212100",
        name: "Organisasi Internasional",
        credits: 3,
      },
      { id: 8, code: "SPFA212100", name: "Penulisan Akademik", credits: 3 },
      { id: 9, code: "SPFA212100", name: "PPSMB", credits: 3 },
    ],
  },
  {
    id: 2,
    name: "Semester 2",
    totalCredits: 24,
    courses: [
      { id: 10, code: "SPFA212101", name: "Ekonomi Politik", credits: 3 },
      { id: 11, code: "SPFA212102", name: "Hukum Internasional", credits: 3 },
      { id: 12, code: "SPFA212103", name: "Teori Politik", credits: 3 },
    ],
  },
  {
    id: 3,
    name: "Semester 3",
    totalCredits: 24,
    courses: [
      { id: 13, code: "SPFA212104", name: "Politik Luar Negeri", credits: 3 },
      { id: 14, code: "SPFA212105", name: "Studi Kawasan Asia", credits: 3 },
    ],
  },
  {
    id: 4,
    name: "Semester 4",
    totalCredits: 24,
    courses: [
      { id: 15, code: "SPFA212106", name: "Metode Penelitian", credits: 3 },
      { id: 16, code: "SPFA212107", name: "Statistik Sosial", credits: 3 },
    ],
  },
  {
    id: 5,
    name: "Semester 5",
    totalCredits: 24,
    courses: [
      { id: 17, code: "SPFA212108", name: "Seminar", credits: 3 },
      { id: 18, code: "SPFA212109", name: "Magang", credits: 3 },
    ],
  },
  {
    id: 6,
    name: "Semester 6",
    totalCredits: 15,
    courses: [
      { id: 19, code: "SPFA212110", name: "Skripsi", credits: 6 },
      { id: 20, code: "SPFA212111", name: "KKN", credits: 3 },
    ],
  },
];

const lectureProgramOptions = [
  { label: "Semua", value: "semua" },
  { label: "Double Degree", value: "double-degree" },
  { label: "International", value: "international" },
  { label: "Reguler", value: "reguler" },
  { label: "Karyawan", value: "karyawan" },
];

interface CourseCardProps {
  course: Course;
}

function CourseCard({ course }: CourseCardProps) {
  return (
    <div className="relative flex flex-col gap-2 overflow-hidden rounded-xl border border-gray-300 bg-white p-4">
      {/* Decorative background */}
      <div className="pointer-events-none absolute top-0 right-0 h-full w-1/2">
        <svg
          className="h-full w-full"
          viewBox="0 0 150 100"
          preserveAspectRatio="xMaxYMid slice"
        >
          <ellipse cx="120" cy="80" rx="80" ry="60" fill="#FFECED" />
          <ellipse cx="100" cy="60" rx="60" ry="50" fill="#99D8FF" />
          <ellipse cx="80" cy="40" rx="50" ry="40" fill="#FEF3C0" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <Typography variant="body-medium-bold" className="line-clamp-2">
          {course.name}
        </Typography>
        <Typography variant="body-small" className="text-gray-600">
          <span className="font-bold">{course.credits} SKS</span> |{" "}
          {course.code}
        </Typography>
      </div>
    </div>
  );
}

interface SemesterAccordionProps {
  semester: Semester;
  isExpanded: boolean;
  onToggle: () => void;
}

function SemesterAccordion({
  semester,
  isExpanded,
  onToggle,
}: SemesterAccordionProps) {
  return (
    <div className="border-b border-gray-200">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between px-2 py-4"
      >
        <div className="flex items-center gap-2">
          <Typography variant="body-medium-bold" className="text-primary">
            {semester.name}
          </Typography>
          <Typography variant="body-medium" className="text-primary">
            (Total {semester.totalCredits} SKS)
          </Typography>
        </div>
        {isExpanded ? (
          <CaretUpIcon className="size-5 text-gray-600" />
        ) : (
          <CaretDownIcon className="size-5 text-gray-600" />
        )}
      </button>

      {isExpanded && (
        <div className="grid grid-cols-3 gap-4 px-2 pb-4">
          {semester.courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      )}
    </div>
  );
}

export function CurriculumStructureTab() {
  const [selectedLectureProgram, setSelectedLectureProgram] = useState("Semua");
  const [expandedSemesters, setExpandedSemesters] = useState<Set<number>>(
    new Set([1])
  );

  const handleToggleSemester = useCallback((semesterId: number) => {
    setExpandedSemesters((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(semesterId)) {
        newSet.delete(semesterId);
      } else {
        newSet.add(semesterId);
      }
      return newSet;
    });
  }, []);

  return (
    <div className="flex flex-col gap-5">
      <Typography variant="h5">Struktur Kurikulum</Typography>

      {/* Filter */}
      <div className="flex items-center gap-3">
        <Typography variant="body-medium-bold">Program Perkuliahan</Typography>
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

      {/* Course Type Tabs */}
      <Tabs defaultValue="required">
        <TabsList variant="folder">
          <TabsTrigger
            value="required"
            variant="folder"
            className="data-[state=active]:bg-muted"
          >
            Mata Kuliah Wajib
          </TabsTrigger>
          <TabsTrigger
            value="elective"
            variant="folder"
            className="data-[state=active]:bg-muted"
          >
            Mata Kuliah Pilihan
          </TabsTrigger>
        </TabsList>

        <TabsContent value="required" variant="folder" className="bg-muted">
          <div className="flex flex-col">
            {semesterData.map((semester) => (
              <SemesterAccordion
                key={semester.id}
                semester={semester}
                isExpanded={expandedSemesters.has(semester.id)}
                onToggle={() => handleToggleSemester(semester.id)}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="elective">
          <div className="flex flex-col">
            <div className="flex items-center justify-center py-10">
              <Typography variant="body-medium" className="text-gray-500">
                Belum ada mata kuliah pilihan yang tersedia.
              </Typography>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
