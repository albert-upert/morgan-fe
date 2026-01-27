import { Link } from "@tanstack/react-router";
import { useCallback, useState } from "react";
import { Breadcrumb } from "@/components/breadcrumb";
import { Button } from "@/components/button";
import { CaretLeftIcon } from "@/components/icon";
import {
  TableBody,
  TableCell,
  TableContent,
  TableCustomHeader,
  TableRow,
  TableWithCustomHeader,
} from "@/components/table";
import { Typography } from "@/components/typography";
import { LoadingGenerateDialog } from "./LoadingGenerateDialog";
import { SuccessGenerateDialog } from "./SuccessGenerateDialog";

export function GenerateAcademicHistoryView() {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const handleGenerate = useCallback(() => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 3000);
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
            href: "/academic-calendar",
            label: "Kalender Akademik",
          },
          {
            label: "Generate Riwayat Akademik",
          },
        ]}
      />
      <Typography variant="h6">Generate Riwayat Akademik</Typography>
      <Link to="/academic-calendar">
        <Button size="lg" variant="tertiary">
          <CaretLeftIcon />
          Kalender Akademik
        </Button>
      </Link>
      <div className="flex flex-col gap-5 rounded-xl border border-border bg-white p-5">
        <Typography variant="body-medium-bold">
          Tahun Akademik 2025-2026
        </Typography>
        <div className="grid grid-cols-2 gap-5">
          <TableWithCustomHeader className="h-fit">
            <TableCustomHeader className="justify-center bg-callout-blue-bg">
              <Typography variant="body-medium-bold">
                Periode Akademik Sebelumnya 2024 -3
              </Typography>
            </TableCustomHeader>
            <TableContent>
              <TableBody>
                <TableRow className="divide-x">
                  <TableCell className="text-left">
                    Jumlah mahasiswa periode sebelumnya
                  </TableCell>
                  <TableCell>60</TableCell>
                </TableRow>
                <TableRow className="divide-x">
                  <TableCell className="text-left">
                    Jumlah mahasiswa lulus / DO / mengundurkan diri / transfer
                    periode sebelumnya
                  </TableCell>
                  <TableCell>40</TableCell>
                </TableRow>
              </TableBody>
            </TableContent>
          </TableWithCustomHeader>
          <TableWithCustomHeader>
            <TableCustomHeader className="justify-center bg-callout-blue-bg">
              <Typography variant="body-medium-bold">
                Periode Akademik Sebelumnya 2024 -3
              </Typography>
            </TableCustomHeader>
            <TableContent>
              <TableBody>
                <TableRow className="divide-x">
                  <TableCell className="text-left">
                    Jumlah mahasiswa lama periode ini
                  </TableCell>
                  <TableCell>60</TableCell>
                </TableRow>
                <TableRow className="divide-x">
                  <TableCell className="text-left">
                    Jumlah mahasiswa baru
                  </TableCell>
                  <TableCell>100</TableCell>
                </TableRow>
                <TableRow className="divide-x">
                  <TableCell className="text-left">
                    Jumlah mahasiswa dengan riwayat akademik
                  </TableCell>
                  <TableCell>0</TableCell>
                </TableRow>
              </TableBody>
            </TableContent>
          </TableWithCustomHeader>
        </div>
        <div className="flex justify-end gap-5">
          <Button variant="secondary">Kembali</Button>
          <Button onClick={() => handleGenerate()} variant="primary">
            Generate
          </Button>
        </div>
      </div>
      <LoadingGenerateDialog open={loading} setOpen={setLoading} />
      <SuccessGenerateDialog open={success} setOpen={setSuccess} />
    </div>
  );
}
