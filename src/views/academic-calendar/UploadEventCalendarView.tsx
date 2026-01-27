import { Link, useNavigate } from "@tanstack/react-router";
import { useCallback, useState } from "react";
import { Breadcrumb } from "@/components/breadcrumb";
import { Button } from "@/components/button";
import { FileUpload } from "@/components/file-upload";
import { CaretLeftIcon, InfoIcon, UploadIcon } from "@/components/icon";
import { Typography } from "@/components/typography";

export function UploadEventCalendarView() {
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
    navigate({ to: "/academic-calendar/upload-result" });
  }, [files, navigate]);

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
            href: "/academic-calendar",
            label: "Lihat Event Kalender Akademik",
          },
          {
            label: "Unggah Event",
          },
        ]}
      />
      <Typography variant="h6">Unggah Event</Typography>

      <Link
        to="/academic-calendar"
        className="flex items-center gap-1 text-primary"
      >
        <CaretLeftIcon className="size-5" />
        <span className="text-base">Event Akademik </span>
      </Link>

      <div className="flex flex-col gap-5 rounded-xl border border-border bg-white p-5">
        <div className="flex items-center gap-2 py-2">
          <Typography variant="h5">Impor Event Kalender Akademik</Typography>
          <InfoIcon className="size-6 text-gray-800" />
        </div>
        <div className="flex items-start justify-between py-5">
          <div className="flex items-start gap-15">
            <div className="flex flex-col gap-2">
              <p className="text-sm text-foreground">
                Allowed Type: [.xlsx, xls, .csv]
              </p>
              <div className="flex flex-col text-xs text-[#0076be]">
                <a href="#" className="hover:underline">
                  Download Sample Data (.xlsx)
                </a>
                <a href="#" className="hover:underline">
                  Download Sample Data (.csv)
                </a>
              </div>
            </div>

            <FileUpload
              label="Impor File Event Akademik"
              accept=".xls,.xlsx,.csv"
              maxSize={5}
              files={files}
              onFilesChange={handleFilesChange}
              onRemoveFile={handleRemoveFile}
              className="w-85"
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
            <p>
              File yang diterima adalah file .csv dengan pemisah antar kolom
              berupa titik koma ","
            </p>
            <p>Urutan kolom sebagai berikut:</p>
            <p>&nbsp;</p>
            <ul className="mb-0 ml-5 list-disc text-primary">
              <li>kode: kode mata kuliah*)</li>
              <li>nama: nama mata kuliah *)</li>
              <li>sks: jumlah sks mata kuliah *)</li>
              <li>semester: semester mata kuliah *)</li>
              <li>tujuan: tujuan mata kuliah</li>
              <li>deskripsi: deskripsi singkat mata kuliah</li>
              <li>
                jenis: jenis mata kuliah, pilih salah satu dari Mata Kuliah
                Dasar Teknik, Mata Kuliah Dasar Umum, Mata Kuliah Program Studi,
                Mata Kuliah Sains Dasar, Mata Kuliah Universitas Pertamina*)
              </li>
              <li>koordinator: NIP Dosen koordinator</li>
              <li>spesial: y/n, y jika mata kuliah spesial, n jika tidak *)</li>
              <li>
                dibuka: y/n, y jika mata kuliah dibuka untuk prodi lain, n jika
                tidak *)
              </li>
              <li>wajib: y/n, y jika mata kuliah wajib, n jika tidak *)</li>
              <li>mbkm: y/n, y jika mata kuliah MBKM, n jika tidak *)</li>
              <li>aktif: y/n, y jika mata kuliah aktif, n jika tidak *)</li>
              <li>prasyarat mata kuliah: kode mata kuliah prasyarat</li>
              <li>namasingkat: nama singkat atau akronim mata kuliah *)</li>
              <li>
                *) required, jika mata kuliah sudah ada, jika ada ulang akan
                mengganti data sebelumnya, prasyarat mata kuliah hanya 1
              </li>
            </ul>
            <br />
            <br />
            <p>
              kode; nama; sks; semester; tujuan; deskripsi; jenis; koordinator;
              spesial; dibuka; wajib; mbkm; aktif; prasyarat; namasingkat
            </p>
            <p>
              UP001; Kalkulus; 3; 1; '', '', Mata Kuliah Dasar Umum; 116020; n;
              y; y; n; y; ''; K; y
            </p>
            <p>
              UP002; Kimia Dasar 2; 2; 1; '', '', Mata Kuliah Dasar Umum;
              116024; n; y; y; n; y; UP003-UP321; KD2; y
            </p>
            <br />
            <br />
            <p>Jumlah Data: 0</p>
            <p>Jumlah Data Sukses: 0</p>
            <p>Jumlah Data Gagal:</p>
          </div>
        </div>
      </div>
    </div>
  );
}
