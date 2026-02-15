import { Link, useParams } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { useMemo, useState } from "react";
import { Button } from "uper-ui/button";
import { Card, CardContent } from "uper-ui/card";
import {
  ArrowBackIcon,
  BuildingIcon,
  CalendarIcon,
  CaretDownIcon,
  CaretUpIcon,
  ClockIcon,
  ErrorIcon,
  FileIcon,
  OpenIcon,
} from "uper-ui/icon";
import { toast } from "uper-ui/toast";
import { Typography } from "uper-ui/typography";
import { ConfirmCompletionModal } from "@/views/lecturer/confirm-completion-modal";
import { ReportAgainModal } from "@/views/lecturer/report-again-modal";

type ReportIssueType = "Rusak" | "Kurang" | "Hilang";

type ReportDetail = {
  id: string; // FM-2025-0103
  ticketLabel: string; // #FM-2025-0103
  statusLabel: string; // Laporan Selesai, Menunggu Petugas
  roomLabel: string; // Ruang 2805
  buildingLabel: string;
  dateLabel: string;
  timeLabel: string;
  reporterLabel: string;
  issues: Array<{
    assetId: string;
    assetName: string;
    type: ReportIssueType;
    description: string;
    imageUrl: string | null;
  }>;
};

function MetaInfoBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-1 flex-col gap-0 rounded-lg bg-gray-300 px-3 py-2">
      <div className="flex items-center gap-1">
        {label === "Posisi Terakhir" ? (
          <BuildingIcon
            className="h-5 w-5 text-gray-600"
            color="currentColor"
          />
        ) : label === "Estimasi Tiba" ? (
          <ClockIcon className="h-5 w-5 text-gray-600" color="currentColor" />
        ) : null}
        <Typography variant="caption-pixie" className="text-gray-600">
          {label}
        </Typography>
      </div>
      <Typography variant="caption-small-bold" className="text-gray-900">
        {value}
      </Typography>
    </div>
  );
}

function Callout({
  tone,
  children,
}: {
  tone: "warning" | "info" | "danger" | "success";
  children: ReactNode;
}) {
  const styles =
    tone === "warning"
      ? "border-yellow-400 bg-yellow-50 text-black"
      : tone === "info"
        ? "border-blue-400 bg-[#E9EDF4] text-black"
        : tone === "danger"
          ? "border-red-400 bg-red-50 text-black"
          : "border-border bg-[#F5F5F5] text-black";

  const iconClass =
    tone === "warning"
      ? "text-yellow-400"
      : tone === "info"
        ? "text-blue-400"
        : tone === "danger"
          ? "text-red-400"
          : "text-gray-700";

  return (
    <div className={`flex gap-2 rounded-lg border px-3 py-3 ${styles}`}>
      <ErrorIcon className={`h-4 w-4 ${iconClass}`} color="currentColor" />
      <Typography variant="caption-small" className="text-inherit">
        {children}
      </Typography>
    </div>
  );
}

export function ReportDetailPageView() {
  const { id } = useParams({ strict: false });
  const [openAssetId, setOpenAssetId] = useState<string | null>(null);
  const [openConfirmCompletion, setOpenConfirmCompletion] = useState(false);
  const [openReportAgain, setOpenReportAgain] = useState(false);
  const [completionHistory, setCompletionHistory] = useState<null | {
    rating: number;
    tags: Array<"Cepat" | "Baik Sekali" | "Lainnya">;
    note: string;
  }>(null);
  const [reportAgainHistory, setReportAgainHistory] = useState<null | {
    tags: Array<"Masih Bermasalah" | "Rusak Lagi" | "Lainnya">;
    note: string;
  }>(null);

  const officer = useMemo(
    () => ({
      name: "Agus Bagus",
      phone: "+62 812-3456-7890",
      role: "Teknisi IT",
      lastPosition: "Griya Legita, Lantai 1",
      eta: "5-7 Menit",
    }),
    []
  );

  const historySummary = useMemo(() => {
    if (!completionHistory) return null;
    const tags = completionHistory.tags;
    if (tags.includes("Cepat") && tags.includes("Baik Sekali")) {
      return "Respon Cepat, Ramah";
    }
    if (tags.includes("Cepat")) return "Respon Cepat";
    if (tags.includes("Baik Sekali")) return "Pelayanan Baik Sekali";
    if (completionHistory.note.trim().length > 0)
      return completionHistory.note.trim();
    return "Terima kasih!";
  }, [completionHistory]);

  function StarIcon({
    filled,
    className,
  }: {
    filled: boolean;
    className?: string;
  }) {
    return (
      <svg
        viewBox="0 0 24 24"
        className={className ?? "h-5 w-5"}
        aria-hidden="true"
      >
        <path
          d="M12 17.27l-5.18 3.05 1.4-5.96L3.5 9.97l6.18-.53L12 3.8l2.32 5.64 6.18.53-4.72 4.39 1.4 5.96z"
          fill={filled ? "#F59E0B" : "none"}
          stroke="#F59E0B"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  const data = useMemo<ReportDetail>(() => {
    const ticket = id ? `#${id}` : "#FM-2025-0103";

    // simple mock mapping
    if (id === "FM-2025-0102") {
      return {
        id: "FM-2025-0102",
        ticketLabel: ticket,
        statusLabel: "Laporan Selesai",
        roomLabel: "Ruang 2805",
        buildingLabel: "Gedung Griya Legita",
        dateLabel: "05 Oktober 2025",
        timeLabel: "08:09 WIB",
        reporterLabel: "Meredita Susanty (Dosen)",
        issues: [
          {
            assetId: "proj",
            assetName: "Proyektor Epson",
            type: "Rusak",
            description: "Proyektor Epson rusak",
            imageUrl: null,
          },
          {
            assetId: "ac",
            assetName: "AC Daikin",
            type: "Kurang",
            description: "AC Daikin kurang",
            imageUrl: null,
          },
          {
            assetId: "hdmi",
            assetName: "Kabel HDMI",
            type: "Hilang",
            description: "Kabel HDMI hilang",
            imageUrl: null,
          },
        ],
      };
    }

    if (id === "FM-2025-0101") {
      return {
        id: "FM-2025-0101",
        ticketLabel: ticket,
        statusLabel: "Sedang Dikerjakan",
        roomLabel: "Ruang 2805",
        buildingLabel: "Gedung Griya Legita",
        dateLabel: "05 Oktober 2025",
        timeLabel: "08:09 WIB",
        reporterLabel: "Meredita Susanty (Dosen)",
        issues: [
          {
            assetId: "fp",
            assetName: "Fingerprint Absensi",
            type: "Rusak",
            description: "Fingerprint Absensi rusak",
            imageUrl: null,
          },
          {
            assetId: "chair",
            assetName: "Kursi Kuliah (40 Unit)",
            type: "Kurang",
            description: "Kursi Kuliah kurang 40 unit",
            imageUrl: null,
          },
        ],
      };
    }

    return {
      id: "FM-2025-0103",
      ticketLabel: ticket,
      statusLabel: "Petugas dalam Perjalanan",
      roomLabel: "Ruang 2805",
      buildingLabel: "Gedung Griya Legita",
      dateLabel: "05 Oktober 2025",
      timeLabel: "08:09 WIB",
      reporterLabel: "Meredita Susanty (Dosen)",
      issues: [
        {
          assetId: "fp",
          assetName: "Fingerprint Absensi",
          type: "Rusak",
          description: "Fingerprint Absensi rusak",
          imageUrl: null,
        },
        {
          assetId: "chair",
          assetName: "Kursi Kuliah (40 Unit)",
          type: "Kurang",
          description: "Kursi Kuliah kurang 40 unit",
          imageUrl: null,
        },
      ],
    };
  }, [id]);

  const statusTimeline = useMemo(() => {
    type DotTone = "solid" | "hollow";
    type PillTone = "primary" | "muted";
    type StatusItem = {
      key: string;
      time: string;
      date: string;
      durationToNext: string | null;
      pill: { label: string; tone: PillTone };
      dot: DotTone;
    };

    const dateShort = "Min, 5 Okt";
    const base = {
      done: { key: "done", time: "09.24", date: dateShort },
      working: { key: "working", time: "08.16", date: dateShort },
      travel: { key: "travel", time: "08.11", date: dateShort },
      waiting: { key: "waiting", time: "08.09", date: dateShort },
    } as const;

    const status = data.statusLabel;

    // (Design sekarang) = untuk Laporan Selesai
    if (status === "Laporan Selesai") {
      return [
        {
          ...base.done,
          durationToNext: "1j 8m",
          pill: { label: "Laporan Selesai", tone: "primary" },
          dot: "hollow",
        },
        {
          ...base.working,
          durationToNext: "0j 5m",
          pill: { label: "Sedang dikerjakan", tone: "muted" },
          dot: "solid",
        },
        {
          ...base.travel,
          durationToNext: "0j 2m",
          pill: { label: "Petugas dalam Perjalanan", tone: "muted" },
          dot: "solid",
        },
        {
          ...base.waiting,
          durationToNext: null,
          pill: { label: "Menunggu Petugas", tone: "muted" },
          dot: "solid",
        },
      ] satisfies Array<StatusItem>;
    }

    // Gambar 2: highlight Sedang Dikerjakan, tampil 3 step
    if (status === "Sedang Dikerjakan") {
      return [
        {
          ...base.working,
          durationToNext: "0j 5m",
          pill: { label: "Sedang dikerjakan", tone: "primary" },
          dot: "solid",
        },
        {
          ...base.travel,
          durationToNext: "0j 2m",
          pill: { label: "Petugas dalam Perjalanan", tone: "muted" },
          dot: "solid",
        },
        {
          ...base.waiting,
          durationToNext: null,
          pill: { label: "Menunggu Petugas", tone: "muted" },
          dot: "solid",
        },
      ] satisfies Array<StatusItem>;
    }

    // Gambar 1: highlight Petugas dalam Perjalanan, tampil 2 step
    if (status === "Petugas dalam Perjalanan") {
      return [
        {
          ...base.travel,
          durationToNext: "0j 2m",
          pill: { label: "Petugas dalam Perjalanan", tone: "primary" },
          dot: "solid",
        },
        {
          ...base.waiting,
          durationToNext: null,
          pill: { label: "Menunggu Petugas", tone: "muted" },
          dot: "solid",
        },
      ] satisfies Array<StatusItem>;
    }

    // Default
    return [
      {
        ...base.waiting,
        durationToNext: null,
        pill: { label: "Menunggu Petugas", tone: "primary" },
        dot: "solid",
      },
    ] satisfies Array<StatusItem>;
  }, [data.statusLabel]);

  return (
    <div className="pt-4 pb-6">
      <Link
        to="/lecturer/my-report"
        className="inline-flex items-center gap-2 text-red-500"
        aria-label="Kembali ke Daftar Laporan"
      >
        <ArrowBackIcon className="h-[20px] w-[20px]" color="currentColor" />
        <Typography variant="body-small" className="text-red-500">
          Daftar Laporan
        </Typography>
      </Link>

      <div className="mt-4">
        <Typography variant="body-medium-semibold" className="text-gray-900">
          Detail Laporan
        </Typography>
      </div>

      {/* Header detail */}
      <Card className="my-5 border border-border bg-white py-4" elevation="low">
        <CardContent className="px-4">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <Typography
                variant="body-large-semibold"
                className="text-gray-900"
              >
                {data.roomLabel}
              </Typography>
              <div className="flex items-center gap-[4px] text-gray-600">
                <BuildingIcon
                  className="h-[20px] w-[20px]"
                  color="currentColor"
                />
                <Typography
                  variant="body-small"
                  className="text-[12px] text-gray-600"
                >
                  {data.buildingLabel}
                </Typography>
              </div>
            </div>
            <div className="shrink-0 rounded-full bg-red-50 px-3 py-[2px]">
              <Typography variant="caption-small" className="text-primary">
                {data.ticketLabel}
              </Typography>
            </div>
          </div>

          <div className="mt-4 space-y-2">
            <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-2 py-2">
              <div className="mt-0.5 text-gray-600">
                <CalendarIcon
                  className="h-[32px] w-[32px] rounded-[8px] bg-gray-300 p-[6px]"
                  color="currentColor"
                />
              </div>
              <div className="flex flex-col">
                <Typography variant="caption-small" className="text-gray-600">
                  Tanggal
                </Typography>
                <Typography variant="caption-small" className="text-gray-900">
                  {data.dateLabel} | {data.timeLabel}
                </Typography>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Issues */}
      <Card className="border border-border bg-white py-4" elevation="low">
        <CardContent className="px-4">
          <Typography variant="body-large-semibold" className="text-gray-900">
            Daftar Aset Bermasalah
          </Typography>

          <div className="mt-3 space-y-2">
            {data.issues.map((issue) => {
              const isOpen = openAssetId === issue.assetId;
              return (
                <div
                  key={issue.assetId}
                  className="rounded-xl border border-border bg-white"
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
                    <ErrorIcon className="h-4 w-4 text-red-600" />
                    <div className="flex min-w-0 flex-1 flex-col gap-1">
                      <Typography
                        variant="body-small-semibold"
                        className="truncate text-gray-900"
                      >
                        {issue.assetName}
                      </Typography>
                    </div>
                    <div className="shrink-0 text-gray-700">
                      <div className={isOpen ? "rounded-full bg-gray-300" : ""}>
                        {isOpen ? (
                          <CaretUpIcon className="h-10 w-10 p-0" />
                        ) : (
                          <CaretDownIcon className="h-10 w-10 p-0" />
                        )}
                      </div>
                    </div>
                  </button>

                  {isOpen && (
                    <div className="border-t border-border bg-white px-4 pt-3 pb-4">
                      <Typography
                        variant="caption-small-semibold"
                        className="text-gray-600"
                      >
                        Jenis Masalah
                      </Typography>
                      <div className="my-1">
                        <span className="inline-flex items-center rounded-lg bg-primary px-3 py-1">
                          <Typography
                            variant="caption-small"
                            className="text-white"
                          >
                            {issue.type}
                          </Typography>
                        </span>
                      </div>

                      <Typography
                        variant="caption-small-semibold"
                        className="mt-3 text-gray-600"
                      >
                        Detail Kendala
                      </Typography>

                      <div className="mt-2 rounded-lg border border-border bg-white px-3 py-2">
                        <Typography
                          variant="body-small"
                          className="text-gray-900"
                        >
                          {issue.description}
                        </Typography>
                      </div>

                      {issue.imageUrl && (
                        <>
                          <Typography
                            variant="caption-small-semibold"
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
                              {issue.imageUrl}
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
        </CardContent>
      </Card>

      {/* Current status */}
      <Card className="mt-6 border border-border bg-white py-4" elevation="low">
        <CardContent className="px-4">
          <Typography variant="body-large-semibold" className="text-gray-900">
            Status Saat Ini
          </Typography>

          <div className="relative mt-4">
            {/* Vertical dashed line */}
            <div className="pointer-events-none absolute top-4 bottom-4 left-[94px] w-[2px] border-l-2 border-dashed border-red-500" />

            <div className="space-y-4">
              {statusTimeline.map((s) => (
                <div key={s.key}>
                  <div className="grid grid-cols-[72px_32px_1fr] items-center gap-2">
                    <div className="flex flex-col gap-0">
                      <Typography
                        variant="body-small-semibold"
                        className="text-gray-900"
                      >
                        {s.time}
                      </Typography>
                      <Typography
                        variant="caption-small"
                        className="text-gray-500"
                      >
                        {s.date}
                      </Typography>
                    </div>

                    <div className="relative flex h-10 items-center justify-center">
                      {s.dot === "hollow" || s.pill.tone !== "muted" ? (
                        <div className="h-4 w-4 rounded-full border-2 border-red-500 bg-white" />
                      ) : (
                        <div className="h-4 w-4 rounded-full bg-red-500" />
                      )}
                    </div>

                    <div className="flex items-center">
                      <div
                        className={`inline-flex items-center rounded-full px-4 py-2 ${
                          s.pill.tone === "primary"
                            ? "bg-red-500"
                            : "bg-gray-300"
                        }`}
                      >
                        <Typography
                          variant="caption-small"
                          className={
                            s.pill.tone === "primary"
                              ? "text-white"
                              : "text-gray-600"
                          }
                        >
                          {s.pill.label}
                        </Typography>
                      </div>
                    </div>
                  </div>

                  {s.durationToNext && (
                    <div className="my-4">
                      <Typography
                        variant="caption-small"
                        className="text-gray-500"
                      >
                        {s.durationToNext}
                      </Typography>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-3 border border-border bg-white py-4" elevation="low">
        {/* Officer / Ticket section - varies by status */}
        <div className="px-4">
          <Typography variant="body-large-semibold" className="text-gray-900">
            {data.statusLabel === "Laporan Selesai"
              ? completionHistory || reportAgainHistory
                ? "Riwayat Penanganan"
                : "Laporan Diselesaikan Oleh"
              : data.statusLabel === "Sedang Dikerjakan"
                ? "Petugas Piket"
                : "Tiket Diterima Oleh"}
          </Typography>
        </div>
        <CardContent className="px-4">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-gray-300" />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-lime-400" />
                <Typography
                  variant="body-small-semibold"
                  className="truncate text-gray-900"
                >
                  {officer.name}
                </Typography>
              </div>
              <div className="mt-2 ml-3 flex flex-col gap-0">
                <Typography variant="caption-small" className="text-gray-800">
                  {officer.phone}
                </Typography>
                <Typography variant="caption-pixie" className="text-gray-800">
                  {officer.role}
                </Typography>
              </div>
            </div>
          </div>

          {data.statusLabel === "Petugas dalam Perjalanan" && (
            <>
              <div className="mt-4 flex gap-3">
                <MetaInfoBox
                  label="Posisi Terakhir"
                  value={officer.lastPosition}
                />
                <MetaInfoBox label="Estimasi Tiba" value={officer.eta} />
              </div>
              <div className="mt-3">
                <Callout tone="warning">
                  Petugas sedang menuju laporan Anda. Mohon tunggu hingga
                  petugas tiba untuk penanganan langsung.
                </Callout>
              </div>
            </>
          )}

          {data.statusLabel === "Sedang Dikerjakan" && (
            <div className="mt-4">
              <Callout tone="info">
                Petugas sedang mengerjakan laporan Anda. Anda akan menerima
                notifikasi ketika laporan telah selesai.
              </Callout>
            </div>
          )}

          {data.statusLabel === "Laporan Selesai" && (
            <>
              {reportAgainHistory ? (
                <div className="mt-2 rounded-xl bg-white py-0">
                  <div className="">
                    <Typography
                      variant="caption-small"
                      className="text-gray-600"
                    >
                      Masukan dari Pelapor:
                    </Typography>
                  </div>
                  {reportAgainHistory.tags.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {reportAgainHistory.tags.map((t) => (
                        <span
                          key={t}
                          className="inline-flex items-center rounded-md bg-red-500 px-3 py-1"
                        >
                          <Typography
                            variant="caption-small"
                            className="text-white"
                          >
                            {t}
                          </Typography>
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="mt-3 rounded-lg border border-border bg-white p-3 text-center">
                    <Typography
                      variant="caption-small"
                      className="text-gray-700"
                    >
                      “{reportAgainHistory.note.trim() || "Masalah muncul lagi"}
                      ”
                    </Typography>
                  </div>

                  <div className="mt-3">
                    <Callout tone="danger">
                      Mohon maaf atas ketidaknyamanan ini. Laporan{" "}
                      {data.ticketLabel} telah dikembalikan ke status High
                      Priority.
                    </Callout>
                  </div>
                </div>
              ) : completionHistory ? (
                <div className="mt-2 rounded-xl bg-white py-0">
                  <div className="">
                    <Typography
                      variant="caption-small"
                      className="text-gray-600"
                    >
                      Masukan dari Pelapor:
                    </Typography>
                  </div>

                  {completionHistory.tags.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {completionHistory.tags.map((t) => (
                        <span
                          key={t}
                          className="inline-flex items-center rounded-md bg-red-500 px-3 py-1"
                        >
                          <Typography
                            variant="caption-small"
                            className="text-white"
                          >
                            {t}
                          </Typography>
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="mt-3 rounded-lg border border-border p-2 text-center">
                    <div className="flex items-center justify-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <StarIcon
                          key={i}
                          filled={i + 1 <= completionHistory.rating}
                          className="h-5 w-5"
                        />
                      ))}
                    </div>
                    <div className="mt-2 text-center">
                      <Typography
                        variant="caption-small"
                        className="text-gray-700"
                      >
                        “{historySummary}”
                      </Typography>
                    </div>
                  </div>

                  <div className="mt-3">
                    <Callout tone="success">
                      Terima kasih atas konfirmasi kamu.
                    </Callout>
                  </div>
                </div>
              ) : (
                <>
                  <div className="mt-4">
                    <Typography
                      variant="caption-small"
                      className="text-gray-700"
                    >
                      Apakah Masalah sudah Terselesaikan?
                    </Typography>
                  </div>

                  <div className="mt-3 space-y-2">
                    <Button
                      className="w-full"
                      variant="primary"
                      type="button"
                      onClick={() => setOpenConfirmCompletion(true)}
                    >
                      Konfirmasi Penyelesaian
                    </Button>
                    <Button
                      className="w-full"
                      variant="secondary"
                      type="button"
                      onClick={() => setOpenReportAgain(true)}
                    >
                      Masih Bermasalah?
                    </Button>
                  </div>

                  <div className="mt-3">
                    <Callout tone="danger">
                      Sistem akan menutup tiket otomatis dalam 23 jam 59 menit
                      jika tidak ada konfirmasi.
                    </Callout>
                  </div>
                </>
              )}
            </>
          )}
        </CardContent>
      </Card>

      <ConfirmCompletionModal
        open={openConfirmCompletion}
        onOpenChange={setOpenConfirmCompletion}
        onSubmit={({ rating, tags, note }) => {
          setCompletionHistory({ rating, tags, note });
          toast.success("Terima kasih atas konfirmasi kamu.");
        }}
      />

      <ReportAgainModal
        open={openReportAgain}
        onOpenChange={setOpenReportAgain}
        onSubmit={({ tags, note }) => {
          setReportAgainHistory({ tags, note });
          toast.success("Laporan ulang berhasil dikirim.");
        }}
      />
    </div>
  );
}
