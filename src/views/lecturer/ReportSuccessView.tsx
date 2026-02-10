import { Link, useParams } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Callout } from "uper-ui/callout";
import { Card, CardContent } from "uper-ui/card";
import {
  ArrowLeftIcon,
  BuildingIcon,
  CalendarIcon,
  CaretDownIcon,
  CaretUpIcon,
  ErrorIcon,
  FileIcon,
  OpenIcon,
  ProfileIcon,
} from "uper-ui/icon";
import { toast } from "uper-ui/toast";
import { Typography } from "uper-ui/typography";
import { readLastReportSuccess } from "@/services/morgan/report-success-store";

function formatDateTime(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  // simple locale formatting (ID)
  return d.toLocaleString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function ReportSuccessView() {
  const { roomId } = useParams({
    from: "/_layout/lecturer/report-success/$roomId",
  });
  const data = useMemo(() => readLastReportSuccess(), []);
  const [openAssetId, setOpenAssetId] = useState<string | null>(null);
  const roomNameLabel = roomId ? `Ruang ${roomId}` : data?.roomName || "";

  useEffect(() => {
    toast.success("Laporan berhasil dibuat");
  }, []);

  if (!data) {
    return (
      <div className="pt-[16px]">
        <Link
          to="/lecturer/home"
          className="inline-flex items-center gap-2 text-red-500"
          aria-label="Kembali ke Beranda"
        >
          <ArrowLeftIcon className="h-[20px] w-[20px]" color="currentColor" />
          <Typography variant="body-small" className="text-red-500">
            Daftar Laporan
          </Typography>
        </Link>

        <div className="mt-6">
          <Typography variant="body-medium-bold" className="text-gray-900">
            Daftar Laporan
          </Typography>
          <Typography variant="body-small" className="mt-2 text-gray-700">
            Belum ada data laporan. Silakan buat laporan terlebih dahulu.
          </Typography>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-[16px]">
      <Link
        to="/lecturer/home"
        className="inline-flex items-center gap-2 text-red-500"
        aria-label="Kembali ke Beranda"
      >
        <ArrowLeftIcon className="h-[20px] w-[20px]" color="currentColor" />
        <Typography variant="body-small" className="text-red-500">
          Daftar Laporan
        </Typography>
      </Link>

      <div className="mt-4">
        <Typography variant="body-medium-bold" className="text-gray-900">
          Detail Laporan
        </Typography>
      </div>

      <Card className="mt-4 bg-gray-100" elevation="low">
        <CardContent className="px-4">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <Typography variant="body-large-bold" className="text-gray-900">
                {roomNameLabel || data.roomName}
              </Typography>
              <div className="mt-1 flex items-center gap-[4px] text-gray-600">
                <BuildingIcon
                  className="h-[20px] w-[20px]"
                  color="currentColor"
                />
                <Typography variant="caption" className="text-gray-600">
                  {data.buildingName}
                </Typography>
              </div>
            </div>
            <div className="shrink-0 rounded-full bg-red-50 px-3 py-[2px]">
              <Typography variant="caption" className="text-primary">
                Lantai 8
              </Typography>
            </div>
          </div>

          <div className="mt-4 space-y-2">
            <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 p-3">
              <div className="mt-0.5 text-gray-600">
                <ProfileIcon
                  className="h-[32px] w-[32px] rounded-[8px] bg-gray-300 p-[6px]"
                  color="currentColor"
                />
              </div>
              <div className="flex flex-col">
                <Typography variant="caption-bold" className="text-gray-600">
                  Pelapor
                </Typography>
                <Typography variant="body-small" className="text-gray-900">
                  {data.reporterName} ({data.reporterRoleLabel})
                </Typography>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 p-3">
              <div className="mt-0.5 text-gray-600">
                <CalendarIcon
                  className="h-[32px] w-[32px] rounded-[8px] bg-gray-300 p-[6px]"
                  color="currentColor"
                />
              </div>
              <div className="flex flex-col">
                <Typography variant="caption-bold" className="text-gray-600">
                  Tanggal
                </Typography>
                <Typography variant="body-small" className="text-gray-900">
                  {formatDateTime(data.createdAt)}
                </Typography>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mt-5">
        <Typography variant="body-medium-bold" className="text-gray-900">
          Daftar Aset Bermasalah
        </Typography>
      </div>
      <div className="mt-3 space-y-2">
        {data.issues.map((issue) => {
          const isOpen = openAssetId === issue.assetId;
          return (
            <div
              key={issue.assetId}
              className="rounded-xl border border-border bg-gray-100"
            >
              <button
                type="button"
                className="flex w-full items-center gap-3 px-4 py-3 text-left"
                onClick={() => {
                  setOpenAssetId((prev) =>
                    prev === issue.assetId ? null : issue.assetId
                  );
                }}
              >
                <ErrorIcon className="h-5 w-5 text-red-600" />
                <div className="flex min-w-0 flex-1 flex-col gap-1">
                  <Typography
                    variant="body-small"
                    className="truncate font-semibold text-gray-900"
                  >
                    {issue.assetName}
                  </Typography>
                </div>
                <div className="shrink-0 rounded-full bg-gray-100 p-2">
                  {isOpen ? (
                    <CaretUpIcon className="h-4 w-4" />
                  ) : (
                    <CaretDownIcon className="h-4 w-4" />
                  )}
                </div>
              </button>

              {isOpen && (
                <div className="px-4 pb-4">
                  <Typography variant="caption-bold" className="text-gray-600">
                    Jenis Masalah
                  </Typography>
                  <div className="mt-2">
                    <span className="inline-flex items-center rounded-lg bg-primary px-3 py-1 text-[12px] font-semibold text-white">
                      {issue.issueType}
                    </span>
                  </div>

                  <Typography
                    variant="caption-bold"
                    className="mt-3 text-gray-600"
                  >
                    Detail Kendala
                  </Typography>

                  <div className="mt-2 rounded-lg border border-gray-200 bg-white px-3 py-2">
                    <Typography variant="body-small" className="text-gray-900">
                      {issue.detail}
                    </Typography>
                  </div>

                  {issue.fileName && (
                    <>
                      <Typography
                        variant="caption-bold"
                        className="mt-3 text-gray-600"
                      >
                        Bukti Foto
                      </Typography>
                      <button
                        type="button"
                        className="mt-2 flex w-full items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-left"
                        onClick={() =>
                          toast.info("Preview foto belum tersedia")
                        }
                      >
                        <FileIcon className="h-5 w-5 text-gray-600" />
                        <Typography
                          variant="body-small"
                          className="min-w-0 flex-1 truncate text-gray-900"
                        >
                          {issue.fileName}
                        </Typography>
                        <OpenIcon className="h-5 w-5 text-gray-600" />
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <Card className="mt-3 bg-gray-100" elevation="low">
        <CardContent className="px-4">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="mt-5" />
              <Typography variant="body-medium-bold" className="text-gray-900">
                Status Saat Ini
              </Typography>

              <Typography variant="caption-bold" className="text-gray-600">
                {new Date(data.createdAt).toLocaleTimeString("id-ID", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Typography>
              <Typography variant="pixie" className="text-gray-600">
                WIB, Selesai
              </Typography>
            </div>

            <div className="shrink-0 rounded-full bg-primary px-3 py-[2px]">
              <Typography variant="caption" className="text-white">
                {data.statusLabel}
              </Typography>
            </div>
          </div>

          <div className="mt-3">
            <Callout
              variant="yellow"
              showClose={false}
              message="Aset akan memasuki notifikasi setelah laporan sudah diterima oleh petugas."
              className="px-4 py-3"
            />
          </div>
        </CardContent>
      </Card>

      <div className="mt-5">
        <Typography variant="body-medium-bold" className="text-gray-900">
          Petugas Piket Hari Ini
        </Typography>
      </div>

      <Card className="mt-3 bg-gray-100" elevation="low">
        <CardContent className="px-4">
          {[
            {
              name: "Agus Bagus",
              time: "08.00 - 13.00 WIB",
              role: "Teknisi IT",
            },
            {
              name: "Siti Rohimah",
              time: "08.00 - 13.00 WIB",
              role: "Teknisi IT",
            },
            {
              name: "Dimas Dava",
              time: "08.00 - 13.00 WIB",
              role: "Teknisi IT",
            },
          ].map((p) => (
            <div
              key={p.name}
              className="flex items-center gap-3 border-b border-gray-200 py-3 last:border-b-0"
            >
              <div className="h-10 w-10 rounded-full bg-gray-300" />
              <div className="flex min-w-0 flex-1 flex-col">
                <Typography variant="body-small-bold" className="text-gray-900">
                  {p.name}
                </Typography>
                <Typography variant="pixie" className="text-gray-700">
                  {p.time}
                </Typography>
                <Typography variant="pixie" className="text-gray-600">
                  {p.role}
                </Typography>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
