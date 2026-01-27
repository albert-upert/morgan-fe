import { Accordion, AccordionGroup } from "@/components/accordion";
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/dialog";
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

export interface CourseDetail {
  id: number;
  code: string;
  name: string;
  nameEnglish: string;
  shortName: string;
  credits: number;
  semester: number;
  objective: string;
  courseType: string;
  coordinator: string;
  specialCourse: string;
  openForOtherProdi: string;
  requiredCourse: string;
  campusMerdeka: string;
  capstoneCourse: string;
  practicalCourse: string;
  finalProjectCourse: string;
  minorCourse: string;
  isActive: boolean;
  prerequisiteCourses: Array<{
    id: number;
    code: string;
    name: string;
    type: string;
  }>;
}

interface ViewCourseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  course: CourseDetail | null;
}

export function ViewCourseDialog({
  open,
  onOpenChange,
  course,
}: ViewCourseDialogProps) {
  if (!course) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-h-[90vh] overflow-y-auto rounded-xl border border-border p-0 data-[side=center]:max-w-[955px]"
        showCloseButton
      >
        <DialogHeader className="rounded-t-xl border-0 border-b">
          <DialogTitle>Lihat Daftar Mata Kuliah</DialogTitle>
        </DialogHeader>

        <DialogBody className="gap-0 rounded-b-xl border-0 p-0">
          <AccordionGroup className="w-full gap-0">
            {/* Detail Mata Kuliah Section */}
            <Accordion
              title="Detail Mata Kuliah"
              defaultExpanded
              className="rounded-none border-x-0 border-t-0"
            >
              <div className="flex flex-col">
                {/* Kode Mata Kuliah */}
                <div className="flex items-center gap-5 py-3">
                  <div className="w-[200px]">
                    <Typography variant="body-small-bold">
                      Kode Mata Kuliah
                    </Typography>
                  </div>
                  <div className="flex-1">
                    <Input size="lg" value={course.code} disabled />
                  </div>
                </div>

                {/* Nama Mata Kuliah */}
                <div className="flex items-center gap-5 py-3">
                  <div className="w-[200px]">
                    <Typography variant="body-small-bold">
                      Nama Mata Kuliah
                    </Typography>
                  </div>
                  <div className="flex-1">
                    <Input size="lg" value={course.name} disabled />
                  </div>
                </div>

                {/* Mata Kuliah (Inggris) */}
                <div className="flex items-center gap-5 py-3">
                  <div className="w-[200px]">
                    <Typography variant="body-small-bold">
                      Mata Kuliah (Inggris)
                    </Typography>
                  </div>
                  <div className="flex-1">
                    <Input size="lg" value={course.nameEnglish} disabled />
                  </div>
                </div>

                {/* Nama Singkat */}
                <div className="flex items-center gap-5 py-3">
                  <div className="w-[200px]">
                    <Typography variant="body-small-bold">
                      Nama Singkat
                    </Typography>
                  </div>
                  <div className="flex-1">
                    <Input size="lg" value={course.shortName} disabled />
                  </div>
                </div>

                {/* Jumlah SKS */}
                <div className="flex items-center gap-5 py-3">
                  <div className="w-[200px]">
                    <Typography variant="body-small-bold">
                      Jumlah SKS
                    </Typography>
                  </div>
                  <div className="flex-1">
                    <Input
                      size="lg"
                      value={course.credits.toString()}
                      disabled
                    />
                  </div>
                </div>

                {/* Semester */}
                <div className="flex items-center gap-5 py-3">
                  <div className="w-[200px]">
                    <Typography variant="body-small-bold">Semester</Typography>
                  </div>
                  <div className="flex-1">
                    <Input
                      size="lg"
                      value={course.semester.toString()}
                      disabled
                    />
                  </div>
                </div>

                {/* Tujuan Mata Kuliah */}
                <div className="flex items-start gap-5 py-3">
                  <div className="w-[200px] pt-2">
                    <Typography variant="body-small-bold">
                      Tujuan Mata Kuliah
                    </Typography>
                  </div>
                  <div className="flex-1">
                    <Textarea value={course.objective} disabled rows={3} />
                  </div>
                </div>

                {/* Jenis Mata Kuliah & Koordinator Mata Kuliah */}
                <div className="flex items-center gap-1 py-3">
                  <div className="flex w-1/2 items-center gap-5">
                    <div className="w-[200px]">
                      <Typography variant="body-small-bold">
                        Jenis Mata Kuliah
                      </Typography>
                    </div>
                    <div className="flex-1">
                      <Input size="lg" value={course.courseType} disabled />
                    </div>
                  </div>
                  <div className="flex w-1/2 items-center gap-5">
                    <div className="w-[103px]">
                      <Typography variant="body-small-bold">
                        Koordinator Mata Kuliah
                      </Typography>
                    </div>
                    <div className="flex-1">
                      <Input size="lg" value={course.coordinator} disabled />
                    </div>
                  </div>
                </div>

                {/* Mata Kuliah Spesial & Dibuka untuk Prodi Lain */}
                <div className="flex items-center gap-1 py-3">
                  <div className="flex w-1/2 items-center gap-5">
                    <div className="w-[200px]">
                      <Typography variant="body-small-bold">
                        Mata Kuliah Spesial
                      </Typography>
                    </div>
                    <div className="flex-1">
                      <Input size="lg" value={course.specialCourse} disabled />
                    </div>
                  </div>
                  <div className="flex w-1/2 items-center gap-5">
                    <div className="w-[103px]">
                      <Typography variant="body-small-bold">
                        Dibuka untuk Prodi Lain
                      </Typography>
                    </div>
                    <div className="flex-1">
                      <Input
                        size="lg"
                        value={course.openForOtherProdi}
                        disabled
                      />
                    </div>
                  </div>
                </div>

                {/* Mata Kuliah Wajib & MK Kampus Merdeka */}
                <div className="flex items-center gap-1 py-3">
                  <div className="flex w-1/2 items-center gap-5">
                    <div className="w-[200px]">
                      <Typography variant="body-small-bold">
                        Mata Kuliah Wajib
                      </Typography>
                    </div>
                    <div className="flex-1">
                      <Input size="lg" value={course.requiredCourse} disabled />
                    </div>
                  </div>
                  <div className="flex w-1/2 items-center gap-5">
                    <div className="w-[103px]">
                      <Typography variant="body-small-bold">
                        MK Kampus Merdeka
                      </Typography>
                    </div>
                    <div className="flex-1">
                      <Input size="lg" value={course.campusMerdeka} disabled />
                    </div>
                  </div>
                </div>

                {/* Mata Kuliah Capstone & Mata Kuliah Kerja Praktik */}
                <div className="flex items-center gap-1 py-3">
                  <div className="flex w-1/2 items-center gap-5">
                    <div className="w-[200px]">
                      <Typography variant="body-small-bold">
                        Mata Kuliah Capstone
                      </Typography>
                    </div>
                    <div className="flex-1">
                      <Input size="lg" value={course.capstoneCourse} disabled />
                    </div>
                  </div>
                  <div className="flex w-1/2 items-center gap-5">
                    <div className="w-[103px]">
                      <Typography variant="body-small-bold">
                        Mata Kuliah Kerja Praktik
                      </Typography>
                    </div>
                    <div className="flex-1">
                      <Input
                        size="lg"
                        value={course.practicalCourse}
                        disabled
                      />
                    </div>
                  </div>
                </div>

                {/* Mata Kuliah Tugas Akhir & Mata Kuliah Minor */}
                <div className="flex items-center gap-1 py-3">
                  <div className="flex w-1/2 items-center gap-5">
                    <div className="w-[200px]">
                      <Typography variant="body-small-bold">
                        Mata Kuliah Tugas Akhir
                      </Typography>
                    </div>
                    <div className="flex-1">
                      <Input
                        size="lg"
                        value={course.finalProjectCourse}
                        disabled
                      />
                    </div>
                  </div>
                  <div className="flex w-1/2 items-center gap-5">
                    <div className="w-[103px]">
                      <Typography variant="body-small-bold">
                        Mata Kuliah Minor
                      </Typography>
                    </div>
                    <div className="flex-1">
                      <Input size="lg" value={course.minorCourse} disabled />
                    </div>
                  </div>
                </div>

                {/* Status */}
                <div className="flex items-center gap-5 py-3">
                  <div className="w-[200px]">
                    <Typography variant="body-small-bold">Status</Typography>
                  </div>
                  <div className="flex items-center gap-3">
                    <Switch checked={course.isActive} disabled />
                    <Typography
                      variant="body-small-bold"
                      className={course.isActive ? "" : "text-muted-foreground"}
                    >
                      {course.isActive ? "Aktif" : "Tidak Aktif"}
                    </Typography>
                  </div>
                </div>
              </div>
            </Accordion>

            {/* Mata Kuliah Prasyarat Section */}
            <Accordion
              title="Mata Kuliah Prasyarat"
              defaultExpanded
              className="rounded-none border-x-0 border-t-0"
            >
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted">
                    <TableHead>Kode Mata Kuliah</TableHead>
                    <TableHead>Nama Mata Kuliah Prasyarat</TableHead>
                    <TableHead>Tipe Prasyarat</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {course.prerequisiteCourses.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={3} className="py-8 text-center">
                        <Typography
                          variant="body-small"
                          className="text-muted-foreground"
                        >
                          Tidak ada mata kuliah prasyarat
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ) : (
                    course.prerequisiteCourses.map((prerequisite) => (
                      <TableRow key={prerequisite.id}>
                        <TableCell>{prerequisite.code}</TableCell>
                        <TableCell>{prerequisite.name}</TableCell>
                        <TableCell>{prerequisite.type}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </Accordion>
          </AccordionGroup>
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
}
