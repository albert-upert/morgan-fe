import { useNavigate } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { useCallback, useMemo, useState } from "react";
import { Button } from "uper-ui/button";
import { Card, CardContent } from "uper-ui/card";
import {
  ArrowBackIcon,
  BuildingIcon,
  CalendarIcon,
  CaretDownIcon,
  CaretUpIcon,
  ClockIcon,
  ProfileIcon,
} from "uper-ui/icon";
import { Typography } from "uper-ui/typography";

type ReportIssueType = "Rusak" | "Kurang" | "Hilang";

type ReportListItem = {
  id: string;
  routeId: string;
  statusLabel: string;
  timeLabel: string;
  dateLabel: string;
  locationLabel: string;
  reporterLabel: string;
  roomId: string;
  issues: Array<{ assetName: string; type: ReportIssueType }>;
};

function StatusPill({ label }: { label: string }) {
  return (
    <div className="rounded-full bg-primary px-3 py-[4px]">
      <Typography variant="caption-small" className="text-white">
        {label}
      </Typography>
    </div>
  );
}

function IssueTag({ label }: { label: ReportIssueType }) {
  return (
    <div className="rounded-md bg-gray-50 px-2 py-px">
      <Typography variant="caption-pixie" className="text-primary">
        {label}
      </Typography>
    </div>
  );
}

function MetaChip({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2 rounded-lg bg-gray-300 px-3 py-2">
      <div className="text-black">{icon}</div>
      <Typography
        variant="caption-small-semibold"
        className="overflow-hidden text-ellipsis whitespace-nowrap text-black"
      >
        {label}
      </Typography>
    </div>
  );
}

export function MyReportView() {
  const navigate = useNavigate();
  const reports = useMemo<Array<ReportListItem>>(
    () => [
      {
        id: "#FM-2025-0103",
        routeId: "FM-2025-0103",
        statusLabel: "Petugas dalam Perjalanan",
        timeLabel: "08:09 WIB",
        dateLabel: "05 Oktober 2025",
        locationLabel: "Griya Legita - 2805",
        reporterLabel: "Meredita Susanty (Dosen)",
        roomId: "2805",
        issues: [
          { assetName: "Fingerprint Absensi", type: "Rusak" },
          { assetName: "Kursi Kuliah (40 Unit)", type: "Kurang" },
        ],
      },
      {
        id: "#FM-2025-0101",
        routeId: "FM-2025-0101",
        statusLabel: "Sedang Dikerjakan",
        timeLabel: "08:09 WIB",
        dateLabel: "05 Oktober 2025",
        locationLabel: "Griya Legita - 2805",
        reporterLabel: "Meredita Susanty (Dosen)",
        roomId: "2805",
        issues: [
          { assetName: "Fingerprint Absensi", type: "Rusak" },
          { assetName: "Kursi Kuliah (40 Unit)", type: "Kurang" },
        ],
      },
      {
        id: "#FM-2025-0102",
        routeId: "FM-2025-0102",
        statusLabel: "Laporan Selesai",
        timeLabel: "08:09 WIB",
        dateLabel: "05 Oktober 2025",
        locationLabel: "Griya Legita - 2805",
        reporterLabel: "Meredita Susanty (Dosen)",
        roomId: "2805",
        issues: [
          { assetName: "Proyektor Epson", type: "Rusak" },
          { assetName: "AC Daikin", type: "Kurang" },
          { assetName: "Kabel HDMI", type: "Hilang" },
        ],
      },
    ],
    []
  );

  const [openReportId, setOpenReportId] = useState<string | null>(
    reports[0]?.id ?? null
  );

  const toHome = useCallback(() => {
    navigate({
      to: "/lecturer/home",
    });
  }, [navigate]);

  const toReportDetail = useCallback(
    (id: string) => {
      navigate({
        to: "/lecturer/report-detail-page/$id",
        params: { id: id },
      });
    },
    [navigate]
  );

  return (
    <div className="pt-4 pb-6">
      {/* Back Home Button */}
      <Button variant="tertiary" onClick={toHome}>
        <ArrowBackIcon className="size-5" color="currentColor" />
        Beranda
      </Button>

      <div className="mt-4">
        <Typography variant="h4" className="font-semibold text-gray-900">
          Daftar Laporan
        </Typography>
      </div>

      <div className="mt-4 space-y-4">
        {reports.map((r) => {
          const isOpen = openReportId === r.id;
          return (
            <Card
              key={r.id}
              className="border border-border bg-white py-4"
              elevation="low"
            >
              <CardContent className="px-4">
                <div className="flex items-center justify-between gap-3">
                  <Typography
                    variant="body-small-semibold"
                    className="text-gray-600"
                  >
                    {r.id}
                  </Typography>
                  <StatusPill label={r.statusLabel} />
                </div>

                <div className="mt-3 grid grid-cols-2 gap-2">
                  <MetaChip
                    icon={<ClockIcon className="size-5" color="currentColor" />}
                    label={r.timeLabel}
                  />
                  <MetaChip
                    icon={
                      <CalendarIcon className="size-5" color="currentColor" />
                    }
                    label={r.dateLabel}
                  />
                  <MetaChip
                    icon={
                      <BuildingIcon className="size-5" color="currentColor" />
                    }
                    label={r.locationLabel}
                  />
                  <MetaChip
                    icon={
                      <ProfileIcon className="size-5" color="currentColor" />
                    }
                    label={r.reporterLabel}
                  />
                </div>

                <button
                  type="button"
                  className="mt-3 flex w-full items-center justify-between gap-3"
                  onClick={() =>
                    setOpenReportId((prev) => (prev === r.id ? null : r.id))
                  }
                  aria-label={isOpen ? "Tutup daftar aset" : "Buka daftar aset"}
                >
                  <Typography variant="caption-small" className="text-gray-800">
                    ({r.issues.length}) Aset Bermasalah:
                  </Typography>
                  {isOpen ? (
                    <div className="rounded-full bg-gray-300">
                      <CaretUpIcon className="size-5 p-0" />
                    </div>
                  ) : (
                    <CaretDownIcon
                      className="size-5 p-0"
                      color="currentColor"
                    />
                  )}
                </button>

                {isOpen && (
                  <div className="mt-2 space-y-2">
                    {r.issues.map((issue) => (
                      <div
                        key={`${r.id}:${issue.assetName}`}
                        className="flex items-center justify-between gap-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2"
                      >
                        <Typography
                          variant="caption-small"
                          className="truncate text-black"
                        >
                          {issue.assetName}
                        </Typography>
                        <IssueTag label={issue.type} />
                      </div>
                    ))}
                  </div>
                )}

                <div className="mt-3">
                  <Button
                    variant="primary"
                    className="w-full"
                    onClick={() => toReportDetail(String(r.id))}
                  >
                    Lihat Detail Laporan
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
