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
  ArrowLeftIcon,
  BuildingIcon,
  CalendarIcon,
  CheckIcon,
  FilterIcon,
  ProfileIcon,
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

  const allVisibleSelected = useMemo(() => {
    const selectable = filteredAssets.filter((a) => !a.reported);
    if (selectable.length === 0) return false;
    return selectable.every((a) => selectedIds.has(a.id));
  }, [filteredAssets, selectedIds]);

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
    <div className="pt-[16px]">
      <Link
        to="/lecturer/home"
        className="inline-flex items-center gap-2 text-red-500"
        aria-label="Kembali ke Beranda"
      >
        <ArrowLeftIcon className="h-[20px] w-[20px]" color="currentColor" />
        <Typography variant="body-small" className="text-red-500">
          Beranda
        </Typography>
      </Link>

      <div className="mt-4">
        <Typography
          variant="body-large"
          className="font-semibold text-gray-900"
        >
          Detail Aset Ruangan
        </Typography>
      </div>

      <Card className="mt-4 bg-gray-100" elevation="low">
        <CardContent className="px-4">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <Typography
                variant="body-large-semibold"
                className="text-gray-900"
              >
                Ruang {roomId}
              </Typography>
              <div className="mt-1 flex items-center gap-[4px] text-gray-600">
                <BuildingIcon
                  className="h-[20px] w-[20px]"
                  color="currentColor"
                />
                <Typography variant="caption-small" className="text-gray-600">
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
            <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 p-3">
              <div className="mt-0.5 text-gray-600">
                <ProfileIcon
                  className="h-[32px] w-[32px] rounded-[8px] bg-gray-300 p-[6px]"
                  color="currentColor"
                />
              </div>
              <div className="flex flex-col">
                <Typography
                  variant="caption-small-semibold"
                  className="text-gray-600"
                >
                  Pelapor
                </Typography>
                <Typography variant="body-small" className="text-gray-900">
                  Meredita Susanty (Dosen)
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
                <Typography
                  variant="caption-small-semibold"
                  className="text-gray-600"
                >
                  Tanggal
                </Typography>
                <Typography variant="body-small" className="text-gray-900">
                  05 Oktober 2025 | 08:09 WIB
                </Typography>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-4 bg-gray-100" elevation="low">
        <CardContent className="px-4">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <Typography
                variant="body-medium-semibold"
                className="text-gray-900"
              >
                Lapor Ketidaksesuaian Aset
              </Typography>
              <div className="mt-1 flex items-center gap-[4px] text-gray-600">
                <BuildingIcon
                  className="h-[20px] w-[20px]"
                  color="currentColor"
                />
                <Typography variant="caption-small" className="text-gray-600">
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
              startIcon={<SearchIcon className="h-[20px] w-[20px]" />}
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
                <DropdownItem
                  className={`text-base ${sortMode === "az" ? "bg-red-400 text-white" : ""}`}
                  onSelect={() => setSortMode("az")}
                >
                  A-Z
                  {sortMode === "az" && (
                    <CheckIcon className="ml-auto" strokeWidth={3} />
                  )}
                </DropdownItem>
                <DropdownItem
                  className={`text-base ${sortMode === "za" ? "bg-red-400 text-white" : ""}`}
                  onSelect={() => setSortMode("za")}
                >
                  Z-A
                  {sortMode === "za" && (
                    <CheckIcon className="ml-auto" strokeWidth={3} />
                  )}
                </DropdownItem>
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
                    {categoryFilter === cat && (
                      <CheckIcon className="ml-auto" strokeWidth={3} />
                    )}
                  </DropdownItem>
                ))}
              </DropdownContent>
            </Dropdown>
          </div>
          <div className="mt-3 flex items-center justify-between">
            <Typography variant="caption-small" className="text-gray-800">
              ({filteredAssets.length}) aset ditemukan
            </Typography>
            <button
              type="button"
              className="text-[12px] font-semibold text-primary"
              onClick={() => {
                setSelectedIds((prev) => {
                  const next = new Set(prev);
                  if (allVisibleSelected) {
                    filteredAssets.forEach((a) => {
                      if (!a.reported) next.delete(a.id);
                    });
                  } else {
                    filteredAssets.forEach((a) => {
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
          <div className="mt-3 space-y-2">
            {filteredAssets.map((asset) => {
              const isReported = !!asset.reported;
              const isSelected = selectedIds.has(asset.id);
              // reported items should show as checked, but remain disabled/non-interactive
              const checked = isReported || isSelected;
              return (
                <div
                  key={asset.id}
                  role="button"
                  aria-disabled={isReported}
                  tabIndex={isReported ? -1 : 0}
                  className={`flex items-center gap-3 rounded-xl border border-input p-3 select-none ${
                    isReported
                      ? "cursor-not-allowed bg-gray-100 opacity-70"
                      : checked
                        ? "cursor-pointer border-primary bg-primary-light"
                        : "cursor-pointer bg-white"
                  }`}
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
                    <Checkbox checked={checked} disabled={isReported} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex min-w-0 flex-col">
                        <Typography
                          variant="body-small"
                          className="truncate font-semibold text-gray-900"
                        >
                          {asset.name}
                        </Typography>
                        <Typography
                          variant="caption-small"
                          className={
                            asset.reported
                              ? "font-semibold text-yellow-500"
                              : checked
                                ? "font-semibold text-primary"
                                : "text-gray-600"
                          }
                        >
                          {asset.reported
                            ? "Sudah dilaporkan"
                            : checked
                              ? "Akan dilaporkan"
                              : asset.category}
                        </Typography>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Bottom CTA */}
      <div className="sticky bottom-0 -mx-[24px] mt-6 border-t border-gray-200 bg-white px-[24px] pt-3 pb-6">
        <Button
          className="w-full"
          variant="primary"
          disabled={selectedCount === 0}
          onClick={() => {
            setOpenReportModal(true);
          }}
        >
          Pilih Aset untuk Lapor
        </Button>
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
