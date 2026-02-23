import { Link, useNavigate } from "@tanstack/react-router";
import { useCallback } from "react";

import { Breadcrumb } from "uper-ui/breadcrumb";
import { Button } from "uper-ui/button";
import { CaretLeftIcon } from "uper-ui/icon";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "uper-ui/table";
import { Typography } from "uper-ui/typography";

interface UploadedEquivalence {
  id: number;
  oldCode: string;
  oldCourseName: string;
  oldCredits: number;
  newCode: string;
  newCourseName: string;
  newCredits: number;
  studyProgram: string;
}

const uploadedEquivalenceData: Array<UploadedEquivalence> = [
  {
    id: 1,
    oldCode: "CS0043",
    oldCourseName: "Teknologi E-Business dan Industri Kreatif TIK",
    oldCredits: 3,
    newCode: "10008",
    newCourseName: "Inovasi dan Kewirausahaan",
    newCredits: 2,
    studyProgram: "Ilmu Komputer",
  },
];

export function UploadEquivalenceResultView() {
  const navigate = useNavigate();

  const handleCancel = useCallback(() => {
    navigate({ to: "/curriculum/equivalence/upload" });
  }, [navigate]);

  const handleSave = useCallback(() => {
    console.warn("Save equivalences:", uploadedEquivalenceData);
    navigate({ to: "/curriculum/$type", params: { type: "equivalence" } });
  }, [navigate]);

  return (
    <div className="flex flex-col gap-5 pt-5">
      <Breadcrumb
        items={[
          { href: "/", label: "Beranda" },
          { href: "/curriculum/equivalence", label: "Ekuivalensi Mata Kuliah" },
          { label: "Unggah Ekuivalensi" },
        ]}
      />
      <Typography variant="h6">Unggah Ekuivalensi</Typography>

      <Link
        to="/curriculum/$type"
        params={{ type: "equivalence" }}
        className="flex items-center gap-1 text-primary"
      >
        <CaretLeftIcon className="size-5" />
        <span className="text-base">Ekuivalensi Mata Kuliah</span>
      </Link>

      <div className="flex flex-col gap-5 rounded-xl border border-border bg-white pb-5">
        <div className="p-5">
          <Typography variant="h5">Impor Ekuivalensi</Typography>
        </div>

        <div className="px-5">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Kode Lama</TableHead>
                <TableHead>Matkul Kurikulum Lama</TableHead>
                <TableHead>SKS Lama</TableHead>
                <TableHead>Kode Baru</TableHead>
                <TableHead>Matkul Kurikulum Baru</TableHead>
                <TableHead>SKS Baru</TableHead>
                <TableHead>Program Studi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {uploadedEquivalenceData.map((equivalence, index) => (
                <TableRow
                  key={equivalence.id}
                  className={index % 2 === 0 ? "bg-white" : "bg-muted"}
                >
                  <TableCell>{equivalence.oldCode}</TableCell>
                  <TableCell>{equivalence.oldCourseName}</TableCell>
                  <TableCell>{equivalence.oldCredits}</TableCell>
                  <TableCell>{equivalence.newCode}</TableCell>
                  <TableCell>{equivalence.newCourseName}</TableCell>
                  <TableCell>{equivalence.newCredits}</TableCell>
                  <TableCell>{equivalence.studyProgram}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-end gap-5 px-5">
          <Button
            variant="secondary"
            size="lg"
            className="w-[150px]"
            onClick={handleCancel}
          >
            Batal
          </Button>
          <Button
            variant="primary"
            size="lg"
            className="w-[150px]"
            onClick={handleSave}
          >
            Simpan
          </Button>
        </div>
      </div>
    </div>
  );
}
