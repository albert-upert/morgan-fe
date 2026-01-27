import { Link, useNavigate } from "@tanstack/react-router";
import type { ChangeEvent, DragEvent } from "react";
import { useCallback, useRef, useState } from "react";

import { Breadcrumb } from "@/components/breadcrumb";
import { Button } from "@/components/button";
import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
} from "@/components/dropdown";
import {
  CaretDownIcon,
  CaretLeftIcon,
  InfoIcon,
  UploadIcon,
} from "@/components/icon";
import { Tag } from "@/components/tags";
import { Typography } from "@/components/typography";

const lectureTypeOptions = [
  { label: "Reguler", value: "regular" },
  { label: "Non-Reguler", value: "non-regular" },
  { label: "Karyawan", value: "employee" },
];

const studyProgramOptions = [
  { label: "Ilmu Kimia", value: "chemistry" },
  { label: "Teknik Kimia", value: "chemical-engineering" },
  { label: "Teknik Perminyakan", value: "petroleum-engineering" },
  { label: "Teknik Industri", value: "industrial-engineering" },
];

export function ImportFetView() {
  const navigate = useNavigate();
  const [selectedLectureType, setSelectedLectureType] = useState("Reguler");
  const [selectedStudyProgram, setSelectedStudyProgram] =
    useState("Ilmu Kimia");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        setSelectedFile(file);
      }
    },
    []
  );

  const handleDrop = useCallback((event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    const { files } = event.dataTransfer;
    if (files.length === 0) {
      return;
    }

    const file = files[0];
    if (file.name.endsWith(".csv")) {
      setSelectedFile(file);
    }
  }, []);

  const handleDragOver = useCallback((event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleChooseFile = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleCancel = useCallback(() => {
    setSelectedFile(null);
  }, []);

  const handleUpload = useCallback(() => {
    if (selectedFile) {
      console.log("Uploading file:", selectedFile.name, {
        lectureType: selectedLectureType,
        studyProgram: selectedStudyProgram,
      });
      // Navigate to preview page after upload
      navigate({ to: "/course-schedule/import-preview" });
    }
  }, [selectedFile, selectedLectureType, selectedStudyProgram, navigate]);

  const handleDownloadSample = useCallback(() => {
    console.log("Download sample data");
  }, []);

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

      <Link to="/course-schedule">
        <Button size="lg" variant="tertiary">
          <CaretLeftIcon />
          Jadwal Kuliah Program Studi
        </Button>
      </Link>

      <div className="flex flex-col gap-5 rounded-xl border border-border bg-white pb-5">
        {/* Header */}
        <div className="flex flex-col gap-4 px-5 py-3">
          <div className="flex items-center gap-2.5 py-2">
            <Typography variant="h6">
              Impor Jadwal Kuliah dari File FET
            </Typography>
            <InfoIcon className="size-6 text-gray-800" />
          </div>

          {/* Filters */}
          <div className="flex items-center gap-10">
            <div className="flex items-center gap-3">
              <Typography variant="body-medium-bold">
                Program Perkuliahan
              </Typography>
              <Dropdown>
                <DropdownTrigger asChild>
                  <Tag
                    color="red"
                    type="with-border"
                    className="cursor-pointer"
                  >
                    {selectedLectureType}
                    <CaretDownIcon className="size-4" />
                  </Tag>
                </DropdownTrigger>
                <DropdownContent>
                  {lectureTypeOptions.map((option) => (
                    <DropdownItem
                      key={option.value}
                      onSelect={() => setSelectedLectureType(option.label)}
                    >
                      {option.label}
                    </DropdownItem>
                  ))}
                </DropdownContent>
              </Dropdown>
            </div>

            <div className="flex items-center gap-3">
              <Typography variant="body-medium-bold">Program Studi</Typography>
              <Dropdown>
                <DropdownTrigger asChild>
                  <Tag
                    color="red"
                    type="with-border"
                    className="cursor-pointer"
                  >
                    {selectedStudyProgram}
                    <CaretDownIcon className="size-4" />
                  </Tag>
                </DropdownTrigger>
                <DropdownContent>
                  {studyProgramOptions.map((option) => (
                    <DropdownItem
                      key={option.value}
                      onSelect={() => setSelectedStudyProgram(option.label)}
                    >
                      {option.label}
                    </DropdownItem>
                  ))}
                </DropdownContent>
              </Dropdown>
            </div>
          </div>

          {/* Upload Section */}
          <div className="flex items-start justify-between rounded-xl border border-border bg-gray-100 p-5">
            <div className="flex gap-[60px]">
              {/* File Info */}
              <div className="flex flex-col gap-2">
                <Typography variant="body-small">
                  Allowed Type: [.csv]
                </Typography>
                <button
                  type="button"
                  onClick={handleDownloadSample}
                  className="text-left text-xs leading-5 text-blue-500 hover:underline"
                >
                  Download Sample Data (.csv)
                </button>
              </div>

              {/* Upload Area */}
              <div className="flex w-[339px] flex-col gap-0.5">
                <Typography variant="body-small">
                  Impor CSV Jadwal Kuliah File
                </Typography>
                <div
                  className={`flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed bg-white py-6 ${
                    isDragging ? "border-primary bg-red-50" : "border-border"
                  }`}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                >
                  <UploadIcon className="size-6 text-gray-600" />
                  <Typography variant="body-medium-bold">
                    Tarik & letakkan file di sini
                  </Typography>
                  <Typography variant="body-small">Atau</Typography>
                  <Button
                    size="lg"
                    variant="secondary"
                    onClick={handleChooseFile}
                    className="w-[120px]"
                  >
                    Pilih File
                  </Button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".csv"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                  <Typography variant="body-small">.csv | 5MB</Typography>
                  {selectedFile && (
                    <Typography variant="body-small" className="text-green-600">
                      File dipilih: {selectedFile.name}
                    </Typography>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-5">
              <Button size="lg" variant="secondary" onClick={handleCancel}>
                Batal
              </Button>
              <Button
                size="lg"
                variant="primary"
                onClick={handleUpload}
                disabled={!selectedFile}
              >
                Unggah
                <UploadIcon className="size-5" />
              </Button>
            </div>
          </div>

          {/* Instructions */}
          <div className="flex items-center justify-center rounded-xl border border-border bg-gray-50 p-5">
            <div className="w-full text-xs leading-5 text-gray-800">
              <p>
                File yang diterima adalah file .csv dengan pemisah antar kolom
                berupa titik koma ","
              </p>
              <p>Ada beberapa ketentuan dalam file FET yang akan diunggah:</p>
              <br />
              <ul className="list-disc pl-5 text-primary">
                <li>
                  Nama mata kuliah harus sama dengan yang ada di SIUP. Download{" "}
                  <button
                    type="button"
                    className="text-blue-500 underline"
                    onClick={() => console.log("Download course list")}
                  >
                    disini
                  </button>
                </li>
                <li>
                  Nama dosen harus sama dengan yang ada di SIUP. Download{" "}
                  <button
                    type="button"
                    className="text-blue-500 underline"
                    onClick={() => console.log("Download instructor list")}
                  >
                    disini
                  </button>
                </li>
                <li>
                  Nama kelas yang dibuat adalah gabungan dari "Subject-Students
                  Sets"
                </li>
                <li>Semua pengajar di-set sebagai pengajar utama</li>
              </ul>
              <br />
              <br />
              <p>Contoh isi file:</p>
              <p className="text-gray-600">
                Activity Id; Day; Hour; Students Sets; Subject; Teachers;
                Activity Tags: Room; Comments 1;Monday: 07:00-07:30;GL1-2018;
                UP001#Kalkulus I; Pengajar 1; FTEP;2505;
              </p>
              <br />
              <br />
              <p>Jumlah Data : 0</p>
              <p>Jumlah Data Sukses: 0</p>
              <p>Jumlah Data Gagal :</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
