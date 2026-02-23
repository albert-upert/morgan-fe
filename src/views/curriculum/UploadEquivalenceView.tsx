import { Link, useNavigate } from "@tanstack/react-router";
import { useCallback, useState } from "react";

import { Breadcrumb } from "uper-ui/breadcrumb";
import { Button } from "uper-ui/button";
import { FileUpload } from "uper-ui/file-upload";
import { CaretLeftIcon, InfoIcon, UploadIcon } from "uper-ui/icon";
import { Typography } from "uper-ui/typography";

export function UploadEquivalenceView() {
  const navigate = useNavigate();
  const [files, setFiles] = useState<Array<File>>([]);

  const handleFilesChange = useCallback((newFiles: Array<File>) => {
    setFiles(newFiles);
  }, []);

  const handleRemoveFile = useCallback((index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const handleCancel = useCallback(() => {
    setFiles([]);
  }, []);

  const handleUpload = useCallback(() => {
    console.warn("Upload files:", files);
    navigate({ to: "/curriculum/equivalence/upload-result" });
  }, [files, navigate]);

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

      <div className="flex flex-col gap-5 rounded-xl border border-border bg-white p-5">
        <div className="flex items-center gap-2 py-2">
          <Typography variant="h5">Impor Ekuivalensi</Typography>
          <InfoIcon className="size-6 text-gray-800" />
        </div>

        <div className="flex items-start justify-between py-5">
          <div className="flex items-start gap-[60px]">
            <div className="flex flex-col gap-2">
              <p className="text-sm text-foreground">
                Allowed Type: [.xlsx, xls, .csv]
              </p>
              <div className="flex flex-col text-xs text-[#0076be]">
                <a href="#" className="hover:underline">
                  Unduh Sample Data (.xlsx)
                </a>
                <a href="#" className="hover:underline">
                  Unduh Sample Data (.csv)
                </a>
              </div>
            </div>

            <FileUpload
              label="Impor File Ekuivalensi"
              accept=".xls,.xlsx,.csv"
              maxSize={5}
              files={files}
              onFilesChange={handleFilesChange}
              onRemoveFile={handleRemoveFile}
              className="w-[339px]"
            />
          </div>

          <div className="flex items-center gap-5">
            <Button variant="outline" size="lg" onClick={handleCancel}>
              Batal
            </Button>
            <Button
              variant="primary"
              size="lg"
              onClick={handleUpload}
              disabled={files.length === 0}
            >
              Unggah
              <UploadIcon className="size-5" />
            </Button>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-muted p-5">
          <div className="text-xs leading-5 text-foreground">
            <p className="mb-0">
              File yang diterima adalah file .csv dengan pemisah antar kolom
              berupa titik koma ","
            </p>
            <p className="mb-0">Urutan kolom sebagai berikut:</p>
            <p className="mb-0">&nbsp;</p>
            <ul className="mb-0 list-disc">
              <li className="ms-[18px] mb-0">
                <span className="text-primary">kode: kode ekuivalensi*)</span>
              </li>
              <li className="ms-[18px] mb-0">
                <span className="text-primary">nama: nama ekuivalensi *)</span>
              </li>
              <li className="ms-[18px] mb-0">
                <span className="text-primary">
                  sks: jumlah sks mata kuliah *)
                </span>
              </li>
              <li className="ms-[18px]">
                <span className="text-primary">tujuan: ekuivalensi</span>
              </li>
            </ul>
            <p className="mb-0">&nbsp;</p>
            <p className="mb-0">&nbsp;</p>
          </div>
        </div>
      </div>
    </div>
  );
}
