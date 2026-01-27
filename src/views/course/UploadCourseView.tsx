import { Link, useNavigate } from "@tanstack/react-router";
import { useCallback, useState } from "react";

import { Breadcrumb } from "@/components/breadcrumb";
import { Button } from "@/components/button";
import { FileUpload } from "@/components/file-upload";
import { CaretLeftIcon, InfoIcon, UploadIcon } from "@/components/icon";
import { Typography } from "@/components/typography";

export function UploadCourseView() {
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
    console.log("Upload files:", files);
    navigate({ to: "/course/upload-result" });
  }, [files, navigate]);

  return (
    <div className="flex flex-col gap-5 pt-5">
      <Breadcrumb
        items={[
          { href: "/", label: "Beranda" },
          { href: "/course", label: "Mata Kuliah" },
          { label: "Upload Mata Kuliah" },
        ]}
      />
      <Typography variant="h6">Upload Mata Kuliah</Typography>

      <Link to="/course" className="flex items-center gap-1 text-primary">
        <CaretLeftIcon className="size-5" />
        <span className="text-base">Mata Kuliah</span>
      </Link>

      <div className="flex flex-col gap-5 rounded-xl border border-border bg-white p-5">
        <div className="flex items-center gap-2 py-2">
          <Typography variant="h5">Impor Mata Kuliah</Typography>
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
              label="Impor File Mata Kuliah"
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
                <span className="text-primary">kode: kode mata kuliah*)</span>
              </li>
              <li className="ms-[18px] mb-0">
                <span className="text-primary">nama: nama mata kuliah *)</span>
              </li>
              <li className="ms-[18px] mb-0">
                <span className="text-primary">
                  sks: jumlah sks mata kuliah *)
                </span>
              </li>
              <li className="ms-[18px] mb-0">
                <span className="text-primary">
                  semester: semester mata kuliah *)
                </span>
              </li>
              <li className="ms-[18px] mb-0">
                <span className="text-primary">tujuan: tujuan mata kuliah</span>
              </li>
              <li className="ms-[18px] mb-0">
                <span className="text-primary">
                  deskripsi: deskripsi singkat mata kuliah
                </span>
              </li>
              <li className="ms-[18px] mb-0">
                <span className="text-primary">
                  jenis: jenis mata kuliah, pilih salah satu dari Mata Kuliah
                  Dasar Teknik, Mata Kuliah Dasar Umum, Mata Kuliah Program
                  Studi, Mata Kuliah Sains Dasar, Mata Kuliah Universitas
                  Pertamina*)
                </span>
              </li>
              <li className="ms-[18px] mb-0">
                <span className="text-primary">
                  koordinator: NIP Dosen koordinator
                </span>
              </li>
              <li className="ms-[18px] mb-0">
                <span className="text-primary">
                  spesial: y/n, y jika mata kuliah spesial, n jika tidak *)
                </span>
              </li>
              <li className="ms-[18px] mb-0">
                <span className="text-primary">
                  dibuka: y/n, y jika mata kuliah dibuka untuk prodi lain, n
                  jika tidak *)
                </span>
              </li>
              <li className="ms-[18px] mb-0">
                <span className="text-primary">
                  wajib: y/n, y jika mata kuliah wajib, n jika tidak *)
                </span>
              </li>
              <li className="ms-[18px] mb-0">
                <span className="text-primary">
                  mbkm: y/n, y jika mata kuliah MBKM, n jika tidak *)
                </span>
              </li>
              <li className="ms-[18px] mb-0">
                <span className="text-primary">
                  aktif: y/n, y jika mata kuliah aktif, n jika tidak *)
                </span>
              </li>
              <li className="ms-[18px] mb-0">
                <span className="text-primary">
                  prasyarat mata kuliah: kode mata kuliah prasyarat
                </span>
              </li>
              <li className="ms-[18px] mb-0">
                <span className="text-primary">
                  namasingkat: nama singkat atau akronim mata kuliah *)
                </span>
              </li>
              <li className="ms-[18px]">
                <span className="text-primary">
                  *) required, jika mata kuliah sudah ada, jika ada ulang akan
                  mengganti data sebelumnya, prasyarat mata kuliah hanya 1
                </span>
              </li>
            </ul>
            <p className="mb-0">&nbsp;</p>
            <p className="mb-0">&nbsp;</p>
            <p className="mb-0">
              kode; nama; sks; semester; tujuan; deskripsi; jenis; koordinator;
              spesial; dibuka; wajib; mbkm; aktif; prasyarat; namasingkat
            </p>
            <p className="mb-0">
              UP001; Kalkulus; 3; 1; '', '', Mata Kuliah Dasar Umum; 116020; n;
              y; y; n; y; ''; K; y
            </p>
            <p className="mb-0">
              UP002; Kimia Dasar 2; 2; 1; '', '', Mata Kuliah Dasar Umum;
              116024; n; y; y; n; y; UP003-UP321; KD2; y
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
