import { useNavigate, useParams } from "@tanstack/react-router";
import { useCallback, useMemo, useState } from "react";
import type { ComponentType } from "react";
import {
  Button,
  Card,
  CardContent,
  Checkbox,
  Dialog,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  Typography,
} from "uper-ui";
import { Accordion } from "uper-ui/accordion";
import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
} from "uper-ui/dropdown";
import {
  ArrowBackIcon,
  ArrowDownIcon,
  ArrowDownIconFilter,
  ArrowUpIconFilter,
  BuildingIcon,
  CalendarIcon,
  ControlIcon,
  DispensationIcon,
  ErrorIcon,
  SearchIcon,
} from "uper-ui/icon";
import { Input } from "uper-ui/input";
import { Link } from "uper-ui/link";
import { Pagination } from "uper-ui/pagination";
import { Tag } from "uper-ui/tags";
import { toast } from "uper-ui/toast";
import { ReportMismatchDialog } from "./ReportConditionModal";
import type {
  MismatchAsset,
  ReportMismatchPayload,
} from "./ReportConditionModal";

interface InfoRowProps {
  icon: ComponentType<{ className?: string }>;
  label: string;
  value: string;
}

function InfoRow({ icon: Icon, label, value }: InfoRowProps) {
  return (
    <div className="flex items-start gap-2">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-300">
        <Icon className="h-6 w-6 text-gray-600" />
      </div>
      <div className="flex flex-col items-baseline gap-1">
        <Typography variant="caption-small-semibold" className="text-gray-600">
          {label}
        </Typography>
        <Typography variant="caption-small" className="text-gray-800">
          {value}
        </Typography>
      </div>
    </div>
  );
}

// Mock data
type AssetStatus = "reported" | "unchecked";
type AssetCategory = "all" | "elektronik" | "furniture" | "lainnya";
type SortOrder = "asc" | "desc";

interface RoomAsset {
  id: string;
  name: string;
  status: AssetStatus;
  category?: AssetCategory;
  notes?: string;
  sopItems?: Array<string>;
  defaultExpanded?: boolean;
}

interface Room {
  code: string;
  building: string;
  floor: string;
  assets: Array<RoomAsset>;
}

const MOCK_ROOM_DATA: Room = {
  code: "Ruang 2805",
  building: "Gedung Griya Legita",
  floor: "Lantai 8",
  assets: [
    {
      id: "asset-1",
      name: "Air Conditioner (AC) Daikin",
      status: "reported",
      notes: "Sudah Dilaporkan",
    },
    {
      id: "asset-2",
      name: "Fingerprint Absensi",
      status: "unchecked",
      category: "elektronik",
      sopItems: [
        "Hembusan angin terasa dingin",
        "Swing berfungsi normal",
        "Tidak ada tetesan air (bocor)",
      ],
      defaultExpanded: true,
    },
    {
      id: "asset-3",
      name: "Kursi Kuliah (40 Unit)",
      status: "unchecked",
      category: "furniture",
      sopItems: [
        "Jumlah kursi sesuai kebutuhan",
        "Tidak ada kursi rusak",
        "Area bersih dan rapi",
      ],
    },
    {
      id: "asset-4",
      name: "Meja Dosen",
      status: "unchecked",
      category: "furniture",
    },
    {
      id: "asset-5",
      name: "Proyektor Epson EB-X05",
      status: "unchecked",
      category: "elektronik",
    },
    {
      id: "asset-6",
      name: "Remote AC",
      status: "unchecked",
      category: "elektronik",
    },
    {
      id: "asset-7",
      name: "Smartboard Samsung Flip",
      status: "unchecked",
      category: "elektronik",
    },
    {
      id: "asset-8",
      name: "Tas Penyimpanan",
      status: "unchecked",
      category: "furniture",
    },
    {
      id: "asset-9",
      name: "Tas Penyimpanan",
      status: "unchecked",
      category: "lainnya",
    },
    {
      id: "asset-10",
      name: "Tas Penyimpanan",
      status: "unchecked",
      category: "lainnya",
    },
    {
      id: "asset-11",
      name: "Tas Penyimpanan",
      status: "unchecked",
      category: "lainnya",
    },
    {
      id: "asset-12",
      name: "Tas Penyimpanan",
      status: "unchecked",
      category: "furniture",
    },
    {
      id: "asset-13",
      name: "Tas Penyimpanan",
      status: "unchecked",
      category: "lainnya",
    },
    {
      id: "asset-14",
      name: "Tas Penyimpanan",
      status: "unchecked",
      category: "lainnya",
    },
    {
      id: "asset-15",
      name: "Tas Penyimpanan",
      status: "unchecked",
      category: "furniture",
    },
    {
      id: "asset-16",
      name: "Tas Penyimpanan",
      status: "unchecked",
      category: "lainnya",
    },
  ],
};

function isAllSelected(
  selectedIds: Set<string>,
  selectableAssets: number
): boolean {
  return selectableAssets > 0 && selectedIds.size === selectableAssets;
}

function toggleAssetSelection(
  currentIds: Set<string>,
  assetId: string
): Set<string> {
  const next = new Set(currentIds);
  if (next.has(assetId)) {
    next.delete(assetId);
  } else {
    next.add(assetId);
  }
  return next;
}

function formatNowLabel() {
  const now = new Date();
  const date = now.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  const time = now.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  return `${date} | ${time} WIB`;
}

function filterAssetsByQuery(assets: Array<RoomAsset>, query: string) {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) return assets;
  return assets.filter((asset) =>
    asset.name.toLowerCase().includes(normalizedQuery)
  );
}

function filterAssetsByCategory(
  assets: Array<RoomAsset>,
  category: AssetCategory
) {
  if (category === "all") return assets;
  return assets.filter((asset) => asset.category === category);
}

function sortAssets(
  assets: Array<RoomAsset>,
  order: SortOrder
): Array<RoomAsset> {
  const sorted = [...assets].sort((a, b) => {
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();
    if (order === "asc") {
      return nameA.localeCompare(nameB);
    }
    return nameB.localeCompare(nameA);
  });
  return sorted;
}

function paginateAssets(
  assets: Array<RoomAsset>,
  currentPage: number,
  pageSize: number
) {
  const startIndex = (currentPage - 1) * pageSize;
  return assets.slice(startIndex, startIndex + pageSize);
}

export function RoomDetailView() {
  const { roomId: _roomId } = useParams({
    from: "/_layout/housekeeping/room-checklist/$roomId",
  });
  const navigate = useNavigate();

  // State: user interactions
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [reportingIds, setReportingIds] = useState<Set<string>>(new Set());
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<AssetCategory>("all");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showAllOkConfirm, setShowAllOkConfirm] = useState(false);
  const [reportingAssets, setReportingAssets] = useState<Array<MismatchAsset>>(
    []
  );
  const pageSize = 6;

  const categoryOptions = [
    { label: "Semua Kategori", value: "all" as const },
    { label: "Elektronik", value: "elektronik" as const },
    { label: "Furniture", value: "furniture" as const },
    { label: "Lainnya", value: "lainnya" as const },
  ];

  // Data: room detail source
  const [roomAssets] = useState<Array<RoomAsset>>(MOCK_ROOM_DATA.assets);

  const room = useMemo(
    () => ({ ...MOCK_ROOM_DATA, assets: roomAssets }),
    [roomAssets]
  );

  // Derived: formatted timestamp
  const nowLabel = useMemo(() => formatNowLabel(), []);

  // Derived: filtered and sorted list
  const filteredAssets = useMemo(() => {
    let assets = filterAssetsByQuery(room.assets, searchQuery);
    assets = filterAssetsByCategory(assets, categoryFilter);
    assets = sortAssets(assets, sortOrder);
    return assets;
  }, [room.assets, searchQuery, categoryFilter, sortOrder]);

  // Derived: count helpers
  const uncheckedAssets = useMemo(
    () => filteredAssets.filter((asset) => asset.status === "unchecked"),
    [filteredAssets]
  );

  const selectableCount = useMemo(
    () => uncheckedAssets.length,
    [uncheckedAssets]
  );

  const allSelected = useMemo(
    () => isAllSelected(selectedIds, selectableCount),
    [selectedIds, selectableCount]
  );

  // Derived: pagination
  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(filteredAssets.length / pageSize)),
    [filteredAssets.length, pageSize]
  );

  const pagedAssets = useMemo(
    () => paginateAssets(filteredAssets, currentPage, pageSize),
    [filteredAssets, currentPage, pageSize]
  );

  // Handlers: selection
  const handleToggleAsset = useCallback((id: string) => {
    setSelectedIds((prev) => toggleAssetSelection(prev, id));
  }, []);

  const handleToggleAll = useCallback(() => {
    if (allSelected) {
      setSelectedIds(new Set());
    } else {
      // Only select assets that are NOT reported
      const selectableAssets = room.assets
        .filter((a) => a.status === "unchecked")
        .map((a) => a.id);
      setSelectedIds(new Set(selectableAssets));
    }
  }, [allSelected, room.assets]);

  // Handlers: submit
  const handleSubmit = useCallback(() => {
    // Jika ada aset bermasalah, buka modal untuk input detail
    if (reportingIds.size > 0) {
      const problematicAssets = roomAssets
        .filter((asset) => reportingIds.has(asset.id))
        .map((asset) => ({ id: asset.id, name: asset.name }));

      setReportingAssets(problematicAssets);
      setShowReportModal(true);
      return;
    }

    // Jika tidak ada masalah dan tidak ada yang dicek, warning
    if (selectedIds.size === 0) {
      toast.error("Pilih minimal satu aset");
      return;
    }

    // Jika tidak ada masalah, tampilkan konfirmasi
    setShowAllOkConfirm(true);
  }, [selectedIds, reportingIds, roomAssets]);

  // Handlers: accordion
  const handleToggleExpanded = useCallback((assetId: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(assetId)) {
        next.delete(assetId);
      } else {
        next.add(assetId);
      }
      return next;
    });
  }, []);

  // Handlers: report toggle
  const handleToggleReport = useCallback(
    (assetId: string) => {
      const isCurrentlyReporting = reportingIds.has(assetId);

      if (isCurrentlyReporting) {
        // Cancel reporting - hapus dari reportingIds
        setReportingIds((prev) => {
          const next = new Set(prev);
          next.delete(assetId);
          return next;
        });
      } else {
        // Start reporting - tandai sebagai bermasalah (BELUM buka modal)
        setReportingIds((prev) => new Set(prev).add(assetId));
      }

      // Hapus dari selected jika user menandai sebagai bermasalah
      setSelectedIds((prev) => {
        if (!prev.has(assetId)) return prev;
        const next = new Set(prev);
        next.delete(assetId);
        return next;
      });
    },
    [reportingIds]
  );

  // Handlers: submit report
  const handleSubmitReport = useCallback(
    (_payload: ReportMismatchPayload) => {
      toast.success("Laporan berhasil dikirim!");

      // Reset state
      setShowReportModal(false);
      setReportingAssets([]);
      setReportingIds(new Set()); // Clear reporting IDs after submit
      navigate({
        to: "/housekeeping/checklist-report/$roomId",
        params: { roomId: _roomId },
        search: { status: "issue" },
      });
      // TODO: Send to API (both checked assets from selectedIds and problematic assets from payload)
    },
    [navigate, _roomId]
  );

  // Handlers: modal close
  const handleModalClose = useCallback((open: boolean) => {
    if (!open) {
      // When modal closes without submitting, keep reportingIds (user masih bisa edit)
      setReportingAssets([]);
    }
    setShowReportModal(open);
  }, []);

  const handleConfirmAllOk = useCallback(() => {
    toast.success("Laporan berhasil dikirim!");
    setShowAllOkConfirm(false);
    navigate({
      to: "/housekeeping/checklist-report/$roomId",
      params: { roomId: _roomId },
      search: { status: "ok" },
    });
  }, [navigate, _roomId]);

  // Handlers: pagination
  const handlePageChange = useCallback(
    (page: number) => {
      const nextPage = Math.min(Math.max(page, 1), totalPages);
      setCurrentPage(nextPage);
    },
    [totalPages]
  );

  // Handlers: search
  const handleSearchChange = useCallback((value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  }, []);

  return (
    <div className="flex flex-col gap-4 pb-4">
      {/* Page header */}
      <div className="flex flex-col gap-4">
        <Link
          to="/housekeeping/checklist-dashboard"
          className="inline-flex w-fit items-center gap-2 text-red-500"
          aria-label="Kembali ke Daftar Ruangan"
        >
          <ArrowBackIcon className="h-5 w-5" color="currentColor" />
          <Typography variant="body-small" className="text-red-500">
            Daftar Ruangan
          </Typography>
        </Link>

        <Typography variant="h4-semibold" className="text-gray-900">
          Detail Aset Ruangan
        </Typography>
      </div>

      {/* Page content */}
      <div className="flex flex-col gap-4">
        {/* Room info card */}
        <Card
          className="flex flex-col gap-3 border border-gray-300 bg-gray-100 px-4 py-3"
          elevation="none"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex flex-col gap-1">
              <Typography variant="h5" className="text-gray-900">
                {room.code}
              </Typography>
              <div className="flex items-center gap-2">
                <BuildingIcon className="h-5 w-5 text-gray-600" />
                <Typography variant="caption-small" className="text-gray-600">
                  {room.building}
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
                {room.floor}
              </Typography>
            </Tag>
          </div>
          <div className="flex flex-col gap-2">
            <InfoRow icon={CalendarIcon} label="Tanggal" value={nowLabel} />
          </div>
        </Card>

        {/* Asset list section */}
        <Card
          className="flex flex-col gap-3 border border-gray-300 bg-gray-100 py-0"
          elevation="none"
        >
          <CardContent className="p-0">
            {/* Asset header */}
            <div className="flex flex-col gap-3 px-4 py-3">
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1">
                  <Typography
                    variant="body-large-semibold"
                    className="text-gray-800"
                  >
                    Daftar Aset
                  </Typography>
                  <div className="flex items-center gap-2">
                    <BuildingIcon className="h-5 w-5 text-gray-600" />
                    <Typography
                      variant="caption-small"
                      className="text-gray-600"
                    >
                      {room.building}
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
                    {room.code.replace("Ruang ", "R. ")}
                  </Typography>
                </Tag>
              </div>

              {/* Search bar with category filter */}
              <div className="flex items-center justify-between gap-2">
                <Input
                  startIcon={<SearchIcon className="h-4 w-4 text-gray-600" />}
                  placeholder="Cari aset..."
                  className="w-full placeholder:text-gray-600"
                  size="lg"
                  value={searchQuery}
                  onChange={(event) => handleSearchChange(event.target.value)}
                />

                {/* Category filter dropdown */}
                <Dropdown
                  open={isFilterDropdownOpen}
                  onOpenChange={setIsFilterDropdownOpen}
                >
                  <DropdownTrigger asChild>
                    <Button
                      variant="secondary"
                      className={`flex h-10 w-10 items-center gap-2 border-red-300 px-3 text-red-500 ${
                        isFilterDropdownOpen ? "bg-red-100" : "hover:bg-red-100"
                      }`}
                    >
                      <ControlIcon className="h-4 w-4" />
                    </Button>
                  </DropdownTrigger>
                  <DropdownContent>
                    {categoryOptions.map((option) => (
                      <DropdownItem
                        key={option.value}
                        onSelect={() => {
                          setCategoryFilter(option.value);
                          setCurrentPage(1);
                        }}
                        className={
                          categoryFilter === option.value
                            ? "bg-red-400 text-gray-50"
                            : ""
                        }
                      >
                        {option.label}
                      </DropdownItem>
                    ))}
                  </DropdownContent>
                </Dropdown>
              </div>

              <Tag
                color="yellow"
                type="with-border"
                size="md"
                rounded="default"
                className="flex items-center justify-start gap-2 bg-yellow-50 px-2 py-1"
              >
                <ErrorIcon className="h-3 w-3 text-yellow-600" />
                <Typography variant="caption-pixie" className="text-gray-800">
                  Klik tombol "Lapor" apabila aset tidak sesuai SOP!
                </Typography>
              </Tag>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <button
                    onClick={() =>
                      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                    }
                    className="flex h-6 w-6 items-center justify-center rounded transition-colors"
                    title={`Urut ${sortOrder === "asc" ? "A-Z" : "Z-A"}`}
                  >
                    <div className="flex flex-col gap-0">
                      <ArrowUpIconFilter
                        className={`h-2 w-2 ${sortOrder === "asc" ? "text-gray-600" : "text-red-500"} `}
                      />
                      <ArrowDownIconFilter
                        className={`h-2 w-2 ${sortOrder === "asc" ? "text-red-500" : "text-gray-600"} `}
                      />
                    </div>
                  </button>
                  <Typography variant="caption-small" className="text-gray-800">
                    ({selectableCount}) aset belum di cek
                  </Typography>
                </div>
                <Button
                  variant="tertiary"
                  size="md"
                  className="px-0 text-red-500 hover:bg-transparent focus:bg-transparent active:bg-transparent"
                  onClick={handleToggleAll}
                >
                  <Typography
                    variant="caption-small-semibold"
                    className="text-red-500"
                  >
                    {allSelected ? "Batal Pilih Semua" : "Pilih Semua Sesuai"}
                  </Typography>
                </Button>
              </div>
            </div>

            {/* Asset cards */}
            <div className="flex flex-col gap-2 px-4 pb-4">
              {pagedAssets.map((asset) => {
                const isSelected = selectedIds.has(asset.id);
                const isReported = asset.status === "reported";
                const isReporting = reportingIds.has(asset.id);
                const hasSop = Boolean(
                  asset.sopItems && asset.sopItems.length > 0
                );
                const isExpanded = expandedIds.has(asset.id);

                return (
                  <div
                    key={asset.id}
                    className={`flex flex-col rounded-xl border ${
                      isReported
                        ? "border-gray-300 bg-white py-1"
                        : isReporting
                          ? `border-red-500 bg-red-50 ${isExpanded ? "!bg-gray-200" : ""}`
                          : isSelected
                            ? `border-green-500 bg-green-50 ${isExpanded ? "!bg-gray-200" : ""}`
                            : "border-gray-300 bg-white"
                    }`}
                  >
                    <div
                      className={`flex items-center justify-between gap-3 px-2 py-1 ${isExpanded ? "rounded-xl border-b " + (isReporting ? "border-red-500 bg-red-50" : "border-green-500 bg-green-50") : ""} `}
                    >
                      <div className="flex items-center justify-start gap-3">
                        {isReporting ? (
                          <div className="flex h-5 w-5 items-center justify-center">
                            <ErrorIcon className="h-5 w-5 text-red-500" />
                          </div>
                        ) : (
                          <Checkbox
                            checked={isReported || isSelected}
                            onCheckedChange={() => handleToggleAsset(asset.id)}
                            disabled={isReported || isReporting}
                            className={
                              isReported ? "!border-gray-600 !bg-gray-600" : ""
                            }
                          />
                        )}
                        <div className="flex flex-col gap-0">
                          <Typography
                            variant="body-small-semibold"
                            className={
                              isReported ? "text-gray-600" : "text-gray-900"
                            }
                          >
                            {asset.name}
                          </Typography>
                          <Typography
                            variant={
                              isSelected || isReporting
                                ? "caption-pixie-semibold"
                                : "caption-pixie"
                            }
                            className={
                              isReported
                                ? "text-yellow-500"
                                : isReporting
                                  ? "text-red-500"
                                  : isSelected
                                    ? "text-green-500"
                                    : "text-gray-600"
                            }
                          >
                            {isReported
                              ? "Sudah Dilaporkan"
                              : isReporting
                                ? "Ada masalah"
                                : isSelected
                                  ? "Sesuai SOP"
                                  : "Belum diperiksa"}
                          </Typography>
                        </div>
                      </div>
                      {!isReported && (
                        <div className="flex items-center justify-between gap-1">
                          <Button
                            variant="primary"
                            size="md"
                            onClick={() => handleToggleReport(asset.id)}
                            className={`${
                              isReporting
                                ? "bg-red-100 active:bg-red-200"
                                : isSelected
                                  ? "bg-green-100 active:bg-green-200"
                                  : "bg-gray-300 active:bg-gray-400"
                            } rounded-sm`}
                          >
                            <Typography
                              variant="caption-small-semibold"
                              className="text-red-500"
                            >
                              {isReporting ? "Batal" : "Lapor"}
                            </Typography>
                          </Button>
                          <Button
                            variant="secondary"
                            className="border-0 bg-transparent px-1 text-gray-600 hover:bg-transparent focus:bg-transparent active:bg-transparent"
                            onClick={() => handleToggleExpanded(asset.id)}
                            aria-label={
                              isExpanded
                                ? "Tutup standar kualitas"
                                : "Buka standar kualitas"
                            }
                          >
                            <div
                              className={`transition-transform duration-300 ${isExpanded ? "rotate-180" : "rotate-0"}`}
                            >
                              <ArrowDownIcon className="!h-6 !w-6 text-gray-800" />
                            </div>
                          </Button>
                        </div>
                      )}
                    </div>

                    {!isReported && (
                      <div>
                        <Accordion
                          title=""
                          expanded={isExpanded}
                          className="border-0 bg-gray-200 [&_[data-slot=accordion-content]]:px-0 [&_[data-slot=accordion-header]]:hidden"
                        >
                          <div className="flex flex-col gap-2 pt-2">
                            {hasSop ? (
                              <>
                                <Typography
                                  variant="caption-pixie-semibold"
                                  className="text-red-500"
                                >
                                  Standar Kualitas (SOP):
                                </Typography>
                                <ul className="list-disc space-y-0 pl-4">
                                  {asset.sopItems?.map((item) => (
                                    <li key={item}>
                                      <Typography
                                        variant="caption-pixie"
                                        className="text-gray-800"
                                      >
                                        {item}
                                      </Typography>
                                    </li>
                                  ))}
                                </ul>
                                <Typography
                                  variant="caption-pixie-italic"
                                  className="text-gray-800"
                                >
                                  *Jika salah satu poin tidak terpenuhi, mohon
                                  tandai sebagai "Lapor".
                                </Typography>
                              </>
                            ) : (
                              <Typography
                                variant="caption-pixie-italic"
                                className="text-gray-600"
                              >
                                SOP belum tersedia untuk aset ini.
                              </Typography>
                            )}
                          </div>
                        </Accordion>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Follow-up action */}
            <div className="px-4 pb-4">
              {(() => {
                const remainingCount = Math.max(
                  selectableCount - (selectedIds.size + reportingIds.size),
                  0
                );
                const isComplete = remainingCount === 0;

                return (
                  <Button
                    variant={isComplete ? "primary" : "secondary"}
                    className={`w-full ${isComplete ? "bg-red-500" : "border-0 bg-gray-300 text-gray-600 hover:bg-gray-300 focus:bg-gray-300 active:bg-gray-300"}`}
                    onClick={isComplete ? handleSubmit : undefined}
                  >
                    {isComplete && (
                      <DispensationIcon className="h-5 w-5 text-white" />
                    )}
                    <Typography
                      variant="body-medium"
                      className={isComplete ? "text-white" : "text-gray-600"}
                    >
                      {isComplete
                        ? "Kirim Laporan"
                        : `Cek (${remainingCount}) Aset Lagi`}
                    </Typography>
                  </Button>
                );
              })()}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center px-4 pb-4">
              <Pagination
                variant="simple"
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                showPageSizeSelector={false}
                showResultsInfo={false}
                showSearchPage={false}
                className="justify-center"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Report Modal */}
      <ReportMismatchDialog
        open={showReportModal}
        onOpenChange={handleModalClose}
        assets={reportingAssets}
        onSubmit={handleSubmitReport}
      />

      {/* All OK Confirm Modal */}
      <Dialog open={showAllOkConfirm} onOpenChange={setShowAllOkConfirm}>
        <DialogContent
          className="w-full rounded-2xl p-0 data-[side=center]:top-1/2 data-[side=center]:w-[calc(100%-2rem)] data-[side=center]:max-w-sm data-[side=center]:-translate-y-1/2"
          showCloseButton={false}
        >
          <DialogHeader className="justify-center border-b border-gray-300 bg-gray-100">
            <Typography variant="h5" className="text-gray-800">
              Tunggu Sebentar
            </Typography>
          </DialogHeader>
          <DialogBody className="border-0 bg-white">
            <Typography
              variant="body-medium"
              className="text-center text-gray-800"
            >
              Apakah anda yakin semua aset telah memenuhi standar SOP?
            </Typography>
          </DialogBody>
          <DialogFooter className="flex gap-3 rounded-b-lg bg-white px-4 pb-3">
            <Button
              onClick={() => setShowAllOkConfirm(false)}
              className="flex-1 border border-red-500 bg-white text-red-500 active:bg-white"
            >
              <Typography variant="body-medium" className="text-red-500">
                Cek Kembali
              </Typography>
            </Button>
            <Button
              onClick={handleConfirmAllOk}
              className="flex-1 bg-red-500 text-white hover:bg-red-600 active:bg-red-500"
            >
              <Typography variant="body-medium" className="text-white">
                Ya, Laporkan
              </Typography>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
