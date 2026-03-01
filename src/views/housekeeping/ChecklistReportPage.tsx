import { useNavigate } from "@tanstack/react-router";
import { useCallback, useMemo, useState } from "react";
import { Button, Card, CardContent, Typography } from "uper-ui";
import { Accordion } from "uper-ui/accordion";
import { FileUpload } from "uper-ui/file-upload";
import {
  ArrowBackIcon,
  BuildingIcon,
  CalendarIcon,
  ErrorIcon,
  ProfileIcon,
} from "uper-ui/icon";
import { Tag } from "uper-ui/tags";

const data_report = {
  id: "1",
  roomCode: "2805",
  building: "Griya Legita",
  reportId: "#FM-2025-0103",
  supervisor: "Andi Maulidi (Supervisor IT)",
  timestamp: "05 Oktober 2025 | 08:09 WIB",
  issues: [
    {
      id: "1",
      name: "Meja Dosen",
      issueType: "Rusak",
      detail: "Contoh: Lampu proyektor mati total saat dinyalakan",
      fileName: "file-name.jpg",
    },
    {
      id: "2",
      name: "Remote AC",
      issueType: "Hilang",
      detail: "Remote tidak ditemukan di ruangan",
      fileName: "remote-ac.jpg",
    },
  ],
};

export function ChecklistReportView() {
  const navigate = useNavigate();
  const hasIssues = data_report.issues.length > 0;
  const [issueFiles, setIssueFiles] = useState<Record<string, Array<File>>>({});

  // Inisialisasi mock files untuk setiap issue
  const initializedIssueFiles = useMemo(() => {
    if (Object.keys(issueFiles).length === 0) {
      return data_report.issues.reduce(
        (acc, issue) => {
          acc[issue.id] = [
            new File(["mock"], issue.fileName, { type: "image/jpeg" }),
          ];
          return acc;
        },
        {} as Record<string, Array<File>>
      );
    }
    return issueFiles;
  }, [issueFiles]);

  const handleFilesChange = (issueId: string, files: Array<File>) => {
    setIssueFiles((prev) => ({
      ...prev,
      [issueId]: files,
    }));
  };

  const toReportHistoryPage = useCallback(() => {
    navigate({
      to: "/housekeeping/report-history",
    });
  }, [navigate]);

  return (
    <div className="flex flex-col gap-4 pb-4">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <Button
          variant="tertiary"
          onClick={toReportHistoryPage}
          className="w-fit"
        >
          <ArrowBackIcon className="size-5" color="currentColor" />
          Daftar Laporan
        </Button>

        <Typography variant="h4-semibold" className="text-gray-900">
          Detail Laporan
        </Typography>
      </div>

      {/* Room info card */}
      <Card className="border border-gray-400 bg-gray-100 p-4">
        <CardContent className="flex flex-col gap-3 p-0">
          <div className="flex items-start justify-between gap-3">
            <div className="flex flex-col gap-1">
              <Typography variant="h5" className="text-gray-800">
                Ruang {data_report.roomCode}
              </Typography>
              <div className="flex items-center gap-2">
                <BuildingIcon className="h-5 w-5 text-gray-600" />
                <Typography variant="caption-small" className="text-gray-600">
                  Gedung {data_report.building}
                </Typography>
              </div>
            </div>
            <Tag
              color="red"
              type="monochrome"
              size="md"
              rounded="pill"
              className="bg-red-50 px-2 py-1"
            >
              <Typography variant="caption-small" className="text-red-600">
                {data_report.reportId}
              </Typography>
            </Tag>
          </div>
          <div className="flex flex-col gap-2 p-2">
            <div className="flex items-start gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-300">
                <ProfileIcon className="h-6 w-6 text-gray-600" />
              </div>
              <div className="flex flex-col items-baseline gap-1">
                <Typography variant="caption-small" className="text-gray-600">
                  Supervisor
                </Typography>
                <Typography variant="caption-small" className="text-gray-800">
                  {data_report.supervisor}
                </Typography>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-300">
                <CalendarIcon className="h-6 w-6 text-gray-600" />
              </div>
              <div className="flex flex-col items-baseline gap-1">
                <Typography variant="caption-small" className="text-gray-600">
                  Tanggal
                </Typography>
                <Typography variant="caption-small" className="text-gray-800">
                  {data_report.timestamp}
                </Typography>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Status card */}
      <Card className="border border-gray-400 !bg-gray-100 bg-white p-1">
        <CardContent className="flex flex-col gap-3 p-3">
          <Typography variant="h5" className="text-gray-800">
            Status Ruangan
          </Typography>
          <div
            className={
              hasIssues
                ? "rounded-lg border border-red-300 bg-red-50 px-3 py-2"
                : "rounded-lg border border-blue-500 bg-blue-50 px-3 py-2"
            }
          >
            <div className="flex items-center gap-2">
              <ErrorIcon
                className={
                  hasIssues ? "h-5 w-5 text-red-500" : "h-8 w-8 text-blue-500"
                }
              />
              <Typography variant="caption-pixie" className="text-gray-800">
                {hasIssues
                  ? "Ada ketidaksesuaian aset pada ruangan ini dan laporan anda telah berhasil dikirim ke Supervisor!"
                  : "Semua aset pada ruangan ini sudah sesuai SOP dan laporan anda telah berhasil dikirim ke Supervisor!"}
              </Typography>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Problematic assets */}
      {hasIssues && (
        <Card className="border border-gray-400 !bg-gray-100 bg-white p-0">
          <CardContent className="flex flex-col gap-3 px-4 py-3">
            <Typography
              variant="body-medium-semibold"
              className="text-gray-900"
            >
              Daftar Aset Bermasalah
            </Typography>
            <div className="flex flex-col gap-3">
              {data_report.issues.map((issue) => {
                const accordionTitle = (
                  <div className="inline-flex items-center gap-2">
                    <ErrorIcon className="h-4 w-4 text-red-500" />
                    <Typography
                      variant="body-small-semibold"
                      className="text-gray-800"
                    >
                      {issue.name}
                    </Typography>
                  </div>
                );

                return (
                  <Accordion
                    key={issue.id}
                    title={accordionTitle as unknown as string}
                    className="rounded-xl border border-gray-400 bg-gray-100 !p-0 transition-all duration-300"
                  >
                    <div className="animate-in fade-in slide-in-from-top-2 space-y-2 duration-300">
                      {/* Issue Type */}
                      <div className="space-y-1.5">
                        <Typography
                          variant="caption-small"
                          className="text-gray-600"
                        >
                          Jenis Masalah
                        </Typography>
                        <div className="flex flex-wrap gap-2">
                          <Tag color="red" type="filled">
                            <Typography
                              variant="body-small"
                              className="text-white"
                            >
                              {issue.issueType}
                            </Typography>
                          </Tag>
                        </div>
                      </div>

                      {/* Detail */}
                      <div className="space-y-1.5">
                        <Typography
                          variant="caption-small"
                          className="text-gray-600"
                        >
                          Detail Kendala
                        </Typography>
                        <div className="rounded-lg border border-gray-400 bg-white px-3 py-2">
                          <Typography
                            variant="body-small"
                            className="text-gray-800"
                          >
                            {issue.detail}
                          </Typography>
                        </div>
                      </div>

                      {/* File Preview */}
                      <div className="space-y-1.5">
                        <Typography
                          variant="caption-small"
                          className="text-gray-600"
                        >
                          Bukti Foto
                        </Typography>
                        <FileUpload
                          files={initializedIssueFiles[issue.id]}
                          onFilesChange={(files) =>
                            handleFilesChange(issue.id, files)
                          }
                          accept=".jpg,.jpeg,.png"
                          variant="button"
                          buttonLabel="Pilih Bukti Foto"
                          imagePreviewModal
                          maxSize={10}
                        />
                      </div>
                    </div>
                  </Accordion>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
