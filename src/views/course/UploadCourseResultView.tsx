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

interface UploadedCourse {
  id: number;
  code: string;
  name: string;
  credits: number;
  semester: number;
  courseType: string;
}

const uploadedCourseData: Array<UploadedCourse> = [
  {
    id: 1,
    code: "12001",
    name: "Geologi Pemboran",
    credits: 2,
    semester: 7,
    courseType: "Mata Kuliah Program Studi",
  },
  {
    id: 2,
    code: "12002",
    name: "Praktikum Kimia Dasar I",
    credits: 1,
    semester: 1,
    courseType: "Mata Kuliah Dasar Umum",
  },
  {
    id: 3,
    code: "12001",
    name: "Fisika Dasar I",
    credits: 2,
    semester: 1,
    courseType: "Mata Kuliah Dasar Umum",
  },
  {
    id: 4,
    code: "12002",
    name: "Praktikum Fisika Dasar I",
    credits: 1,
    semester: 1,
    courseType: "Mata Kuliah Dasar Umum",
  },
  {
    id: 5,
    code: "12001",
    name: "Kalkulus I",
    credits: 2,
    semester: 1,
    courseType: "Mata Kuliah Dasar Umum",
  },
  {
    id: 6,
    code: "12002",
    name: "Praktikum Geologi Fisik",
    credits: 1,
    semester: 1,
    courseType: "Mata Kuliah Program Studi",
  },
  {
    id: 7,
    code: "12001",
    name: "Kimia Dasar II",
    credits: 2,
    semester: 2,
    courseType: "Mata Kuliah Dasar Umum",
  },
  {
    id: 8,
    code: "12002",
    name: "Praktikum Kimia Dasar II",
    credits: 1,
    semester: 2,
    courseType: "Mata Kuliah Dasar Umum",
  },
  {
    id: 9,
    code: "12001",
    name: "Fisika Dasar II",
    credits: 2,
    semester: 2,
    courseType: "Mata Kuliah Dasar Umum",
  },
  {
    id: 10,
    code: "12002",
    name: "Praktikum Fisika Dasar II",
    credits: 1,
    semester: 2,
    courseType: "Mata Kuliah Dasar Umum",
  },
];

export function UploadCourseResultView() {
  const navigate = useNavigate();

  const handleCancel = useCallback(() => {
    navigate({ to: "/course/upload" });
  }, [navigate]);

  const handleSave = useCallback(() => {
    console.log("Save courses:", uploadedCourseData);
    navigate({ to: "/course" });
  }, [navigate]);

  return (
    <div className="flex flex-col gap-5 pt-5">
      <Breadcrumb
        items={[
          { href: "/", label: "Beranda" },
          { href: "/course", label: "Mata Kuliah" },
          { label: "Unggah Mata Kuliah" },
        ]}
      />
      <Typography variant="h6">Unggah Mata Kuliah</Typography>

      <Link to="/course" className="flex items-center gap-1 text-primary">
        <CaretLeftIcon className="size-5" />
        <span className="text-base">Mata Kuliah</span>
      </Link>

      <div className="flex flex-col gap-5 rounded-xl border border-border bg-white pb-5">
        <div className="flex items-center gap-2 p-5">
          <Typography variant="h5">Impor Mata Kuliah</Typography>
          <InfoIcon className="size-6 text-gray-800" />
        </div>

        <div className="px-5">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Kode Mata Kuliah</TableHead>
                <TableHead>Nama Mata Kuliah</TableHead>
                <TableHead>Jumlah SKS</TableHead>
                <TableHead>Semester</TableHead>
                <TableHead>Jenis Mata Kuliah</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {uploadedCourseData.map((course, index) => (
                <TableRow
                  key={course.id}
                  className={index % 2 === 0 ? "bg-white" : "bg-muted"}
                >
                  <TableCell>{course.code}</TableCell>
                  <TableCell>{course.name}</TableCell>
                  <TableCell>{course.credits}</TableCell>
                  <TableCell>{course.semester}</TableCell>
                  <TableCell>{course.courseType}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="flex items-center justify-end gap-5 rounded-xl bg-white p-5">
        <Button variant="secondary" size="lg" onClick={handleCancel}>
          Batal
        </Button>
        <Button variant="primary" size="lg" onClick={handleSave}>
          Simpan
        </Button>
      </div>
    </div>
  );
}
