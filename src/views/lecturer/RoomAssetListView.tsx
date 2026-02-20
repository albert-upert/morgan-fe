import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "@tanstack/react-router";

import { useEffect, useMemo, useState } from "react";
import { Button } from "uper-ui/button";
import { Card, CardContent } from "uper-ui/card";
import { Checkbox } from "uper-ui/checkbox";
import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownSeparator,
  DropdownTrigger,
} from "uper-ui/dropdown";
import {
  ArrowBackIcon,
  ArrowDownIconFilter,
  ArrowLeftIcon,
  ArrowUpIconFilter,
  BuildingIcon,
  CalendarIcon,
  FilterIcon,
  SearchIcon,
} from "uper-ui/icon";
import { Input } from "uper-ui/input";
import { toast } from "uper-ui/toast";
import { Typography } from "uper-ui/typography";
import { submitReportIssue } from "@/services/morgan/report-issue";
import {
  makeReportSuccessData,
  saveLastReportSuccess,
} from "@/services/morgan/report-success-store";
import { ReportIssueModal } from "@/views/lecturer/report-issue-modal";
import type { ReportIssuePayload } from "@/views/lecturer/report-issue-modal";
import { ReportIssueValidationModal } from "@/views/lecturer/report-issue-validation-modal";

type RoomAsset = {
  id: string;
  name: string;
  category: string;
  reported?: boolean;
};

type SortMode = "az" | "za";
type CategoryFilter = "all" | "Elektronik" | "Furnitur";

const categoryOptions: Array<Exclude<CategoryFilter, "all">> = [
  "Elektronik",
  "Furnitur",
];

const assetsSeed: Array<RoomAsset> = [
  {
    id: "ac-1",
    name: "Air Conditioner (AC) Daikin",
    category: "Elektronik",
    reported: true,
  },
  { id: "fp-1", name: "Fingerprint Absensi", category: "Elektronik" },
  { id: "chair-1", name: "Kursi Kuliah (40 unit)", category: "Furnitur" },
  { id: "desk-1", name: "Meja Dosen", category: "Furnitur" },
  { id: "proj-1", name: "Proyektor Epson EB-X05", category: "Elektronik" },
  { id: "remote-1", name: "Remote AC", category: "Elektronik" },
  { id: "smart-1", name: "Smartboard Samsung Flip", category: "Elektronik" },
];

export function RoomAssetListView() {
  const navigate = useNavigate();
  const { roomId: roomIdParam } = useParams({ strict: false });
  const roomId = roomIdParam ?? "0001";
  const [query, setQuery] = useState("");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(() => new Set());
  const [sortMode, setSortMode] = useState<SortMode>("az");
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("all");
  const [isOpen, setIsOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [openReportModal, setOpenReportModal] = useState(false);
  const [openValidationModal, setOpenValidationModal] = useState(false);
  const [pendingPayload, setPendingPayload] =
    useState<ReportIssuePayload | null>(null);
  const [reportResetToken, setReportResetToken] = useState(0);

  const reportedIds = useMemo(
    () => new Set(assetsSeed.filter((a) => a.reported).map((a) => a.id)),
    []
  );

  // Safety: ensure reported assets can never be selected
  useEffect(() => {
    setSelectedIds((prev) => {
      if (prev.size === 0) return prev;
      const next = new Set(prev);
      reportedIds.forEach((id) => next.delete(id));
      return next;
    });
  }, [reportedIds]);

  const filteredAssets = useMemo(() => {
    const q = query.trim().toLowerCase();

    const byQuery = q
      ? assetsSeed.filter((a) => a.name.toLowerCase().includes(q))
      : assetsSeed;

    const byCategory =
      categoryFilter === "all"
        ? byQuery
        : byQuery.filter((a) => a.category === categoryFilter);

    return [...byCategory].sort((a, b) =>
      sortMode === "az"
        ? a.name.localeCompare(b.name, "id")
        : b.name.localeCompare(a.name, "id")
    );
  }, [query, sortMode, categoryFilter]);

  const PAGE_SIZE = 5;
  const totalPages = Math.max(1, Math.ceil(filteredAssets.length / PAGE_SIZE));

  useEffect(() => {
    setPage((p) => Math.min(Math.max(1, p), totalPages));
  }, [totalPages]);

  const pagedAssets = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filteredAssets.slice(start, start + PAGE_SIZE);
  }, [filteredAssets, page]);

  const allVisibleSelected = useMemo(() => {
    const selectable = pagedAssets.filter((a) => !a.reported);
    if (selectable.length === 0) return false;
    return selectable.every((a) => selectedIds.has(a.id));
  }, [pagedAssets, selectedIds]);

  const selectedCount = selectedIds.size;

  const selectedAssetsForReport = useMemo(() => {
    return assetsSeed
      .filter((a) => !a.reported && selectedIds.has(a.id))
      .map((a) => ({ id: a.id, name: a.name }));
  }, [selectedIds]);

  const submitMutation = useMutation({
    mutationFn: (payload: ReportIssuePayload) => submitReportIssue(payload),
    onSuccess: (response, payload) => {
      const assetNameById = Object.fromEntries(
        selectedAssetsForReport.map((a) => [a.id, a.name])
      );
      const successData = makeReportSuccessData({
        payload,
        response,
        assetNameById,
        roomId,
      });
      saveLastReportSuccess(successData);

      setOpenValidationModal(false);
      setOpenReportModal(false);
      setPendingPayload(null);
      setReportResetToken((v) => v + 1);
      setSelectedIds(new Set());

      navigate({
        to: "/lecturer/report-success/$roomId",
        params: { roomId },
      });
    },
    onError: () => {
      toast.error("Gagal mengirim laporan. Coba lagi.");
    },
  });

  return (
    <div className="pt-4">
      <Link
        to="/lecturer/home"
        className="inline-flex items-center gap-2 text-red-500"
        aria-label="Kembali ke Beranda"
      >
        <ArrowBackIcon className="h-[20px] w-[20px]" color="currentColor" />
        <Typography variant="body-small" className="text-red-500">
          Beranda
        </Typography>
      </Link>

      <div className="mt-4">
        <Typography
          variant="h4"
          className="text-[20px] font-semibold text-gray-900"
        >
          Detail Aset Ruangan
        </Typography>
      </div>

      <Card className="my-5 border border-border bg-white py-4" elevation="low">
        <CardContent className="px-4">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <Typography
                variant="body-large-semibold"
                className="text-gray-900"
              >
                Ruang {roomId}
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
                  Gedung Griya Legita
                </Typography>
              </div>
            </div>
            <div className="shrink-0 rounded-full bg-red-50 px-3 py-[2px]">
              <Typography variant="caption-small" className="text-primary">
                Lantai 8
              </Typography>
            </div>
          </div>

          <div className="mt-4 space-y-2">
            <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-2">
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
                  05 Oktober 2025 | 08:09 WIB
                </Typography>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-6 border border-border bg-white py-4" elevation="low">
        <CardContent className="px-4">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <Typography
                variant="body-large-semibold"
                className="text-gray-900"
              >
                Lapor Ketidaksesuaian Aset
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
                  Gedung Griya Legita
                </Typography>
              </div>
            </div>
            <div className="shrink-0 rounded-full bg-red-50 px-3 py-[2px]">
              <Typography variant="caption-small" className="text-primary">
                R. 2805
              </Typography>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onClear={() => setQuery("")}
              placeholder="Cari aset..."
              startIcon={<SearchIcon className="ml-2 h-[20px] w-[20px]" />}
            />
            <Dropdown modal={false} open={isOpen} onOpenChange={setIsOpen}>
              <DropdownTrigger asChild>
                <button
                  type="button"
                  className={`flex h-[40px] w-[40px] items-center justify-center rounded-lg border border-primary text-primary ${isOpen ? "bg-primary-light" : "bg-white"}`}
                  aria-label="Filter"
                >
                  <FilterIcon
                    className="h-[20px] w-[20px]"
                    color="currentColor"
                  />
                </button>
              </DropdownTrigger>
              <DropdownContent
                align="end"
                sideOffset={8}
                className="min-w-[220px] p-2"
              >
                <DropdownSeparator className="my-2" />
                {categoryOptions.map((cat) => (
                  <DropdownItem
                    key={cat}
                    className={`text-base ${categoryFilter === cat ? "bg-red-400 text-white" : ""}`}
                    onSelect={() =>
                      setCategoryFilter((prev) => (prev === cat ? "all" : cat))
                    }
                  >
                    {cat}
                  </DropdownItem>
                ))}
              </DropdownContent>
            </Dropdown>
          </div>
          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center gap-1">
              <button
                type="button"
                className="flex flex-col items-center justify-center rounded-md px-1 py-0.5 leading-none"
                onClick={() =>
                  setSortMode((prev) => (prev === "az" ? "za" : "az"))
                }
                aria-label={
                  sortMode === "az"
                    ? "Ubah urutan menjadi Z-A"
                    : "Ubah urutan menjadi A-Z"
                }
              >
                <ArrowUpIconFilter
                  className={`h-[12px] w-[12px] ${
                    sortMode === "az" ? "text-primary" : "text-gray-400"
                  }`}
                  color="currentColor"
                />
                <ArrowDownIconFilter
                  className={`-mt-1 h-[12px] w-[12px] ${
                    sortMode === "za" ? "text-primary" : "text-gray-400"
                  }`}
                  color="currentColor"
                />
              </button>

              <Typography
                variant="body-small"
                className="text-[12px] text-gray-800"
              >
                ({filteredAssets.length}) aset ditemukan
              </Typography>
            </div>
            <button
              type="button"
              className="text-[12px] font-semibold text-primary"
              onClick={() => {
                setSelectedIds((prev) => {
                  const next = new Set(prev);
                  if (allVisibleSelected) {
                    pagedAssets.forEach((a) => {
                      if (!a.reported) next.delete(a.id);
                    });
                  } else {
                    pagedAssets.forEach((a) => {
                      if (!a.reported) next.add(a.id);
                    });
                  }
                  reportedIds.forEach((id) => next.delete(id));
                  return next;
                });
              }}
            >
              {allVisibleSelected ? "Batalkan" : "Pilih Semua"}
            </button>
          </div>
          <div className="mt-3 overflow-hidden bg-white">
            {pagedAssets.map((asset, idx) => {
              const isLast = idx === pagedAssets.length - 1;
              const isReported = !!asset.reported;
              const isSelected = selectedIds.has(asset.id);
              const checked = isReported || isSelected;

              return (
                <div
                  key={asset.id}
                  role="button"
                  aria-disabled={isReported}
                  tabIndex={isReported ? -1 : 0}
                  className={`mb-3 flex items-center gap-3 px-4 py-3 transition-colors select-none ${
                    isReported
                      ? "cursor-not-allowed rounded-xl border border-border bg-gray-50"
                      : checked
                        ? "cursor-pointer rounded-xl border border-primary bg-red-50"
                        : "cursor-pointer rounded-xl border border-border bg-white hover:bg-gray-50"
                  } ${!isLast ? "border-b border-border" : ""}`}
                  onClick={() => {
                    if (isReported) return;
                    setSelectedIds((prev) => {
                      const next = new Set(prev);
                      if (next.has(asset.id)) next.delete(asset.id);
                      else next.add(asset.id);
                      reportedIds.forEach((id) => next.delete(id));
                      return next;
                    });
                  }}
                  onKeyDown={(e) => {
                    if (isReported) return;
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setSelectedIds((prev) => {
                        const next = new Set(prev);
                        if (next.has(asset.id)) next.delete(asset.id);
                        else next.add(asset.id);
                        reportedIds.forEach((id) => next.delete(id));
                        return next;
                      });
                    }
                  }}
                >
                  <div className="pointer-events-none">
                    <Checkbox
                      checked={checked}
                      disabled={isReported}
                      className={`size-5 rounded-md border-2 [&>svg]:size-4 ${
                        isReported
                          ? "border-gray-600 bg-gray-600"
                          : checked
                            ? "border-primary bg-primary"
                            : "border-gray-600 bg-white"
                      }`}
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <Typography
                      variant="body-small"
                      className="truncate font-semibold text-gray-900"
                    >
                      {asset.name}
                    </Typography>
                    <Typography
                      variant="caption-small-semibold"
                      className={` ${
                        asset.reported
                          ? "text-yellow-500"
                          : checked
                            ? "text-primary"
                            : "text-gray-600"
                      }`}
                    >
                      {asset.reported
                        ? "Sudah dilaporkan"
                        : checked
                          ? "Akan dilaporkan"
                          : asset.category}
                    </Typography>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Bottom CTA */}
      <div className="sticky bottom-0 -mx-6 mt-6 border-t border-gray-200 bg-white px-6 pt-3 pb-6">
        <Button
          className={`w-full ${selectedCount === 0 ? "opacity-50" : ""}`}
          variant="primary"
          aria-disabled={selectedCount === 0}
          type="button"
          onClick={(e) => {
            e.preventDefault();
            if (selectedCount === 0) {
              toast.error("Pilih minimal 1 aset terlebih dahulu.");
              return;
            }
            // Delay open to avoid the same click being treated as an outside-interaction
            // which can immediately close Radix Dialog when opened programmatically.
            window.setTimeout(() => setOpenReportModal(true), 0);
          }}
        >
          Pilih Aset untuk Lapor
        </Button>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-4 flex items-center justify-center gap-2">
            <button
              type="button"
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-700 disabled:opacity-50"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              aria-label="Halaman sebelumnya"
            >
              <ArrowLeftIcon className="h-4 w-4" color="currentColor" />
            </button>

            {Array.from({ length: totalPages })
              .slice(0, 5)
              .map((_, i) => {
                const p = i + 1;
                const active = p === page;
                return (
                  <button
                    key={p}
                    type="button"
                    className={`flex h-8 w-8 items-center justify-center rounded-lg border text-[12px] font-semibold ${
                      active
                        ? "border-primary bg-primary text-white"
                        : "border-gray-200 bg-white text-gray-700"
                    }`}
                    onClick={() => setPage(p)}
                    aria-label={`Halaman ${p}`}
                  >
                    {p}
                  </button>
                );
              })}

            <button
              type="button"
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-700 disabled:opacity-50"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              aria-label="Halaman berikutnya"
            >
              <ArrowLeftIcon
                className="h-4 w-4 rotate-180"
                color="currentColor"
              />
            </button>
          </div>
        )}
      </div>

      <ReportIssueModal
        open={openReportModal}
        onOpenChange={setOpenReportModal}
        assets={selectedAssetsForReport}
        resetToken={reportResetToken}
        onRequestSubmit={(payload) => {
          setPendingPayload(payload);
          setOpenReportModal(false);
          setOpenValidationModal(true);
        }}
      />

      <ReportIssueValidationModal
        open={openValidationModal}
        onOpenChange={setOpenValidationModal}
        isSubmitting={submitMutation.isPending}
        onBack={() => {
          setOpenValidationModal(false);
          setOpenReportModal(true);
        }}
        onConfirm={() => {
          if (!pendingPayload) return;
          submitMutation.mutate(pendingPayload);
        }}
      />
    </div>
  );
}
