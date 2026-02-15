import { useParams, useSearch } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Dialog,
  DialogBody,
  DialogContent,
  DialogHeader,
  Typography,
} from "uper-ui";
import { Accordion } from "uper-ui/accordion";
import {
  ArrowLeftIcon,
  BuildingIcon,
  CalendarIcon,
  ErrorIcon,
  FileIcon,
  OpenIcon,
  ProfileIcon,
} from "uper-ui/icon";
import { Link } from "uper-ui/link";
import { Tag } from "uper-ui/tags";
import { toast } from "uper-ui/toast";

const MOCK_REPORT = {
  roomCode: "Ruang 2805",
  building: "Gedung Griya Legita",
  reportId: "#FM-2025-0103",
  supervisor: "Andi Maulidi (Supervisor IT)",
  timestamp: "05 Oktober 2025 | 08:09 WIB",
  issues: [
    {
      id: "asset-1",
      name: "Meja Dosen",
      issueType: "Rusak",
      detail: "Contoh: Lampu proyektor mati total saat dinyalakan",
      fileName: "file-name.jpg",
    },
    {
      id: "asset-2",
      name: "Remote AC",
      issueType: "Hilang",
      detail: "Remote tidak ditemukan di ruangan",
      fileName: "remote-ac.jpg",
    },
  ],
};

export function ChecklistReportView() {
  const { roomId } = useParams({
    from: "/_layout/housekeeping/checklist-report/$roomId",
  });
  const search = useSearch({
    from: "/_layout/housekeeping/checklist-report/$roomId",
  });

  const hasIssues = search.status === "issue";
  const [previewImage, setPreviewImage] = useState<{
    url: string;
    name: string;
  } | null>(null);

  useEffect(() => {
    toast.success("Laporan berhasil dikirim!");
  }, []);

  return (
    <div className="flex flex-col gap-4 pb-4">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <Link
          to="/housekeeping/checklist-dashboard"
          className="inline-flex items-center gap-2 text-red-500"
          aria-label="Kembali ke Beranda"
        >
          <ArrowLeftIcon className="h-5 w-5" color="currentColor" />
          <Typography variant="body-small" className="text-red-500">
            Beranda
          </Typography>
        </Link>

        <Typography variant="h4-semibold" className="text-gray-900">
          Detail Laporan
        </Typography>
      </div>

      {/* Room info card */}
      <Card className="border border-gray-400 bg-gray-100 p-4" elevation="none">
        <CardContent className="flex flex-col gap-3 p-0">
          <div className="flex items-start justify-between gap-3">
            <div className="flex flex-col gap-1">
              <Typography variant="h5" className="text-gray-800">
                {MOCK_REPORT.roomCode}
              </Typography>
              <div className="flex items-center gap-2">
                <BuildingIcon className="h-5 w-5 text-gray-600" />
                <Typography variant="caption-small" className="text-gray-600">
                  {MOCK_REPORT.building}
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
                {MOCK_REPORT.reportId}
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
                  {MOCK_REPORT.supervisor}
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
                  {MOCK_REPORT.timestamp}
                </Typography>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Status card */}
      <Card
        className="border border-gray-400 !bg-gray-100 bg-white p-1"
        elevation="none"
      >
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
        <Card
          className="border border-gray-400 !bg-gray-100 bg-white p-0"
          elevation="none"
        >
          <CardContent className="flex flex-col gap-3 px-4 py-3">
            <Typography
              variant="body-medium-semibold"
              className="text-gray-900"
            >
              Daftar Aset Bermasalah
            </Typography>
            <div className="flex animate-in flex-col gap-3 duration-500 fade-in">
              {MOCK_REPORT.issues.map((issue, idx) => {
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
                  <div
                    key={issue.id}
                    className="animate-in duration-300 fade-in slide-in-from-left-2"
                    style={{ animationDelay: `${idx * 100}ms` }}
                  >
                    <Accordion
                      title={accordionTitle as unknown as string}
                      className="rounded-xl border border-gray-400 bg-gray-100 !p-0 transition-all duration-300"
                    >
                      <div className="animate-in space-y-2 duration-300 fade-in slide-in-from-top-2">
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
                          <div className="flex items-center gap-3 rounded-lg border border-gray-300 bg-white px-3 py-2.5">
                            <FileIcon className="h-5 w-5 flex-shrink-0 text-gray-600" />
                            <Typography
                              variant="body-small"
                              className="flex-1 truncate text-gray-900"
                            >
                              {issue.fileName}
                            </Typography>
                            <button
                              type="button"
                              onClick={() =>
                                setPreviewImage({
                                  url: `/path/to/${issue.fileName}`,
                                  name: issue.fileName,
                                })
                              }
                              className="rounded p-1 hover:bg-gray-100"
                            >
                              <OpenIcon className="h-5 w-5 text-gray-600" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </Accordion>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Image Preview Modal */}
      {previewImage && (
        <Dialog
          open={!!previewImage}
          onOpenChange={(open) => !open && setPreviewImage(null)}
        >
          <DialogContent
            className="rounded-2xl p-0 data-[side=center]:w-[calc(100%-2rem)] data-[side=center]:max-w-sm"
            showCloseButton={true}
          >
            <DialogHeader className="!rounded-b-2xl border-b border-gray-300 bg-gray-100 px-5 py-4">
              <Typography variant="h5" className="text-gray-800">
                Preview Foto
              </Typography>
            </DialogHeader>
            <DialogBody className="items-stretch gap-0 border-0 bg-white p-4">
              <img
                src={previewImage.url}
                alt={previewImage.name}
                className="h-auto w-full rounded-lg object-contain"
              />
            </DialogBody>
          </DialogContent>
        </Dialog>
      )}

      {/* Debug */}
      <div className="hidden">
        <Typography variant="caption-pixie">Room ID: {roomId}</Typography>
      </div>
    </div>
  );
}
