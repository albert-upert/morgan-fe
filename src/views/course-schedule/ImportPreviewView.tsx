import { Link, useNavigate } from "@tanstack/react-router";
import { useCallback } from "react";

import { Breadcrumb } from "@/components/breadcrumb";
import { Button } from "@/components/button";
import { CaretLeftIcon, InfoIcon } from "@/components/icon";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/table";
import { Typography } from "@/components/typography";

interface ImportedScheduleData {
  id: number;
  semester: number;
  courseName: string;
  className: string;
  capacity: number;
  schedule: string;
  room: string;
  instructor: string;
}

// Mock data for preview - in real implementation this would come from the uploaded file
const mockImportedData: Array<ImportedScheduleData> = [
  {
    id: 1,
    semester: 1,
    courseName: "Bahasa Indonesia",
    className: "Bahasa Indonesia-CE1-2024",
    capacity: 50,
    schedule: "Selasa (13:00-14:40)",
    room: "Ruang 2201",
    instructor: "Acep Iwan Saidi",
  },
  {
    id: 2,
    semester: 1,
    courseName: "Kalkulus I",
    className: "Kalkulus I-CE1-2024",
    capacity: 45,
    schedule: "Senin (07:00-08:40)",
    room: "Ruang 2505",
    instructor: "Ahmad Fauzi",
  },
  {
    id: 3,
    semester: 1,
    courseName: "Fisika Dasar",
    className: "Fisika Dasar-CE1-2024",
    capacity: 40,
    schedule: "Rabu (09:00-10:40)",
    room: "Ruang 2302",
    instructor: "Budi Santoso",
  },
];

export function ImportPreviewView() {
  const navigate = useNavigate();

  const handleCancel = useCallback(() => {
    navigate({ to: "/course-schedule/import" });
  }, [navigate]);

  const handleSave = useCallback(() => {
    // In real implementation, this would save the imported data
    console.log("Saving imported data:", mockImportedData);
    navigate({ to: "/course-schedule" });
  }, [navigate]);

  return (
    <div className="flex flex-col gap-5 pt-5">
      <Breadcrumb
        items={[
          { href: "/", label: "Beranda" },
          { href: "/course-schedule", label: "Jadwal Kuliah" },
          { label: "Unggah Jadwal Kuliah Program Studi" },
        ]}
      />
      <Typography variant="h6">Unggah Jadwal Kuliah Program Studi</Typography>

      <Link to="/course-schedule/import">
        <Button size="lg" variant="tertiary">
          <CaretLeftIcon />
          Impor Jadwal Kuliah
        </Button>
      </Link>

      <div className="flex flex-col gap-5 rounded-xl border border-border bg-white">
        {/* Header */}
        <div className="flex items-center gap-2.5 px-5 py-5">
          <Typography variant="h6">
            Impor Jadwal Kuliah dari File FET
          </Typography>
          <InfoIcon className="size-6 text-gray-800" />
        </div>

        {/* Table */}
        <div className="px-5">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Semester</TableHead>
                <TableHead>Mata Kuliah</TableHead>
                <TableHead>Nama Kelas</TableHead>
                <TableHead>Kapasitas</TableHead>
                <TableHead>Jadwal</TableHead>
                <TableHead>Pengajar</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockImportedData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.semester}</TableCell>
                  <TableCell>{item.courseName}</TableCell>
                  <TableCell>{item.className}</TableCell>
                  <TableCell>{item.capacity}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span>{item.schedule}</span>
                      <span className="text-gray-500">[{item.room}]</span>
                    </div>
                  </TableCell>
                  <TableCell>{item.instructor}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Footer with action buttons */}
        <div className="flex items-center justify-end gap-5 border-t border-border px-5 py-4">
          <Button size="lg" variant="secondary" onClick={handleCancel}>
            Batal
          </Button>
          <Button size="lg" variant="primary" onClick={handleSave}>
            Simpan
          </Button>
        </div>
      </div>
    </div>
  );
}
