import { useCallback, useState } from "react";

import { Button } from "@/components/button";
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/dialog";
import { CaretDownIcon, CaretUpIcon } from "@/components/icon";
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
import { cn } from "@/lib/utils";

export interface CourseScheduleDetail {
  id: number;
  lectureProgram: string;
  studyProgram: string;
  period: string;
  courseName: string;
  className: string;
  shortName: string;
  capacity: number;
  mbkmClass: string;
  startDate: string;
  endDate: string;
  instructors: Array<{
    id: number;
    name: string;
    status: string;
  }>;
  schedules: Array<{
    id: number;
    day: string;
    startTime: string;
    endTime: string;
    room: string;
  }>;
}

interface ViewCourseScheduleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  schedule: CourseScheduleDetail | null;
  onPublish?: (schedule: CourseScheduleDetail) => void;
}

export function ViewCourseScheduleDialog({
  open,
  onOpenChange,
  schedule,
  onPublish,
}: ViewCourseScheduleDialogProps) {
  const [isClassInfoExpanded, setIsClassInfoExpanded] = useState(true);
  const [isInstructorsExpanded, setIsInstructorsExpanded] = useState(false);
  const [isSchedulesExpanded, setIsSchedulesExpanded] = useState(false);

  const handlePublish = useCallback(() => {
    if (schedule && onPublish) {
      onPublish(schedule);
    }
  }, [schedule, onPublish]);

  if (!schedule) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="overflow-hidden rounded-xl border border-border p-0 data-[side=center]:max-w-[823px]"
        showCloseButton
      >
        <DialogHeader className="rounded-t-xl border-0 border-b bg-gray-50">
          <DialogTitle>Lihat Jadwal Kuliah Program Studi</DialogTitle>
        </DialogHeader>

        <DialogBody className="max-h-[70vh] gap-0 overflow-y-auto rounded-b-xl border-0 p-0">
          {/* Informasi Kelas Section */}
          <div className="w-full border-b border-border bg-white">
            <button
              type="button"
              className="flex w-full items-center justify-between p-5"
              onClick={() => setIsClassInfoExpanded(!isClassInfoExpanded)}
            >
              <Typography variant="body-medium-bold">
                Informasi Kelas
              </Typography>
              {isClassInfoExpanded ? (
                <CaretUpIcon className="size-5" />
              ) : (
                <CaretDownIcon className="size-5" />
              )}
            </button>

            <div
              className={cn(
                "flex flex-col overflow-hidden transition-all duration-300",
                isClassInfoExpanded ? "max-h-[1000px] pb-5" : "max-h-0"
              )}
            >
              {/* Program Perkuliahan & Program Studi */}
              <div className="flex items-center">
                <div className="flex w-[460px] items-center gap-5 px-5 py-3">
                  <div className="w-[200px]">
                    <Typography variant="body-small-bold">
                      Program Perkuliahan
                    </Typography>
                  </div>
                  <div className="w-[200px]">
                    <Input
                      size="lg"
                      value={schedule.lectureProgram}
                      disabled
                      className="bg-gray-100"
                    />
                  </div>
                </div>
                <div className="flex flex-1 items-center gap-5 px-5 py-3">
                  <div className="w-[103px]">
                    <Typography variant="body-small-bold">
                      Program Studi
                    </Typography>
                  </div>
                  <div className="w-[200px]">
                    <Input
                      size="lg"
                      value={schedule.studyProgram}
                      disabled
                      className="bg-gray-100"
                    />
                  </div>
                </div>
              </div>

              {/* Periode */}
              <div className="flex items-center gap-5 px-5 py-3">
                <div className="w-[200px]">
                  <Typography variant="body-small-bold">Periode</Typography>
                </div>
                <div className="flex-1">
                  <Input
                    size="lg"
                    value={schedule.period}
                    disabled
                    className="bg-gray-100"
                  />
                </div>
              </div>

              {/* Nama Mata Kuliah */}
              <div className="flex items-center gap-5 px-5 py-3">
                <div className="w-[200px]">
                  <Typography variant="body-small-bold">
                    Nama Mata Kuliah
                  </Typography>
                </div>
                <div className="flex-1">
                  <Input
                    size="lg"
                    value={schedule.courseName}
                    disabled
                    className="bg-gray-100"
                  />
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
                    value={schedule.className}
                    disabled
                    className="bg-gray-100"
                  />
                </div>
              </div>

              {/* Nama Singkat */}
              <div className="flex items-center gap-5 px-5 py-3">
                <div className="w-[200px]">
                  <Typography variant="body-small-bold">
                    Nama Singkat
                  </Typography>
                </div>
                <div className="flex-1">
                  <Input
                    size="lg"
                    value={schedule.shortName}
                    disabled
                    className="bg-gray-100"
                  />
                </div>
              </div>

              {/* Kapasitas Peserta & Kelas MBKM */}
              <div className="flex items-center">
                <div className="flex w-[460px] items-center gap-5 px-5 py-3">
                  <div className="w-[200px]">
                    <Typography variant="body-small-bold">
                      Kapasitas Peserta
                    </Typography>
                  </div>
                  <div className="w-[200px]">
                    <Input
                      size="lg"
                      value={String(schedule.capacity)}
                      disabled
                      className="bg-gray-100"
                    />
                  </div>
                </div>
                <div className="flex flex-1 items-center gap-5 px-5 py-3">
                  <div className="w-[103px]">
                    <Typography variant="body-small-bold">
                      Kelas MBKM
                    </Typography>
                  </div>
                  <div className="w-[200px]">
                    <Input
                      size="lg"
                      value={schedule.mbkmClass}
                      disabled
                      className="bg-gray-100"
                    />
                  </div>
                </div>
              </div>

              {/* Tanggal Mulai & Tanggal Akhir */}
              <div className="flex items-center">
                <div className="flex w-[460px] items-center gap-5 px-5 py-3">
                  <div className="w-[200px]">
                    <Typography variant="body-small-bold">
                      Tanggal Mulai
                    </Typography>
                  </div>
                  <div className="w-[200px]">
                    <Input
                      size="lg"
                      value={schedule.startDate}
                      disabled
                      className="bg-gray-100"
                    />
                  </div>
                </div>
                <div className="flex flex-1 items-center gap-5 px-5 py-3">
                  <div className="w-[103px]">
                    <Typography variant="body-small-bold">
                      Tanggal Akhir
                    </Typography>
                  </div>
                  <div className="w-[200px]">
                    <Input
                      size="lg"
                      value={schedule.endDate}
                      disabled
                      className="bg-gray-100"
                    />
                  </div>
                </div>
              </div>

              {/* Publish Button */}
              <div className="flex justify-end px-5 pt-3">
                <Button size="lg" variant="primary" onClick={handlePublish}>
                  Publish
                </Button>
              </div>
            </div>
          </div>

          {/* Daftar Pengajar Section */}
          <div className="w-full border-b border-border bg-white">
            <button
              type="button"
              className="flex w-full items-center justify-between p-5"
              onClick={() => setIsInstructorsExpanded(!isInstructorsExpanded)}
            >
              <Typography variant="body-medium-bold">
                Daftar Pengajar
              </Typography>
              {isInstructorsExpanded ? (
                <CaretUpIcon className="size-5" />
              ) : (
                <CaretDownIcon className="size-5" />
              )}
            </button>

            <div
              className={cn(
                "overflow-hidden transition-all duration-300",
                isInstructorsExpanded ? "max-h-[500px] px-5 pb-5" : "max-h-0"
              )}
            >
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nama Pengajar</TableHead>
                    <TableHead>Status Pengajar</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {schedule.instructors.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={2} className="py-8 text-center">
                        <Typography
                          variant="body-small"
                          className="text-muted-foreground"
                        >
                          Belum ada pengajar
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ) : (
                    schedule.instructors.map((instructor, index) => (
                      <TableRow
                        key={instructor.id}
                        className={index % 2 === 0 ? "bg-muted" : "bg-white"}
                      >
                        <TableCell>{instructor.name}</TableCell>
                        <TableCell>{instructor.status}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Daftar Jadwal Kelas Section */}
          <div className="w-full border-b border-border bg-white">
            <button
              type="button"
              className="flex w-full items-center justify-between p-5"
              onClick={() => setIsSchedulesExpanded(!isSchedulesExpanded)}
            >
              <Typography variant="body-medium-bold">
                Daftar Jadwal Kelas
              </Typography>
              {isSchedulesExpanded ? (
                <CaretUpIcon className="size-5" />
              ) : (
                <CaretDownIcon className="size-5" />
              )}
            </button>

            <div
              className={cn(
                "overflow-hidden transition-all duration-300",
                isSchedulesExpanded ? "max-h-[500px] px-5 pb-5" : "max-h-0"
              )}
            >
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Hari</TableHead>
                    <TableHead>Waktu Mulai Kelas</TableHead>
                    <TableHead>Waktu Selesai Kelas</TableHead>
                    <TableHead>Ruangan</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {schedule.schedules.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="py-8 text-center">
                        <Typography
                          variant="body-small"
                          className="text-muted-foreground"
                        >
                          Belum ada jadwal kelas
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ) : (
                    schedule.schedules.map((scheduleItem, index) => (
                      <TableRow
                        key={scheduleItem.id}
                        className={index % 2 === 0 ? "bg-muted" : "bg-white"}
                      >
                        <TableCell>{scheduleItem.day}</TableCell>
                        <TableCell>{scheduleItem.startTime}</TableCell>
                        <TableCell>{scheduleItem.endTime}</TableCell>
                        <TableCell>{scheduleItem.room}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
}
