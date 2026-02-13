import { Link, useParams } from "@tanstack/react-router";
import { useCallback, useMemo, useState } from "react";
import { toast } from "sonner";
import {
  AttendanceIcon,
  Button,
  Card,
  CardContent,
  Checkbox,
  Typography,
} from "uper-ui";
import {
  ArrowLeftIcon,
  BuildingIcon,
  CalendarIcon,
  RegistrationIcon,
} from "uper-ui/icon";

function StatusBadge({ isReported }: { isReported: boolean }) {
  if (!isReported) return null;

  return (
    <span className="inline-flex items-center rounded-full border border-yellow-500 bg-yellow-100 px-2.5 py-0.5">
      <Typography variant="caption-small" className="text-gray-900">
        Sudah Dilaporkan
      </Typography>
    </span>
  );
}

interface InfoRowProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}

function InfoRow({ icon: Icon, label, value }: InfoRowProps) {
  return (
    <div className="flex items-start gap-2">
      <Icon className="h-5 w-5 flex-shrink-0 text-primary" />
      <div className="flex items-baseline gap-1">
        <Typography variant="caption-small-bold" className="text-gray-800">
          {label}:
        </Typography>
        <Typography variant="caption-small" className="text-gray-800">
          {value}
        </Typography>
      </div>
    </div>
  );
}

// Mock data
interface RoomAsset {
  id: string;
  name: string;
  isReported: boolean;
}

interface Room {
  code: string;
  janitor: string;
  date: string;
  assets: Array<RoomAsset>;
}

const MOCK_ROOM_DATA: Room = {
  code: "2402 -  Griya Legita",
  janitor: "Dedi Permana",
  date: "05 Oktober 2025 | 08:09 WIB",
  assets: [
    { id: "asset-1", name: "Fingerprint", isReported: true },
    { id: "asset-2", name: "Proyektor Epson", isReported: false },
    { id: "asset-3", name: "Smartboard", isReported: false },
    { id: "asset-4", name: "Kursi (40)", isReported: false },
    { id: "asset-5", name: "Air Conditioner (AC)", isReported: false },
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

export function RoomDetailView() {
  const { roomId } = useParams({
    from: "/_layout/housekeeping/room-detail/$roomId",
  });

  // State management for asset selection
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  // Memoized filtered data to follow Open/Closed principle
  const room = useMemo(() => {
    // In a real app, fetch data based on roomId parameter
    return MOCK_ROOM_DATA;
  }, [roomId]);

  const selectableCount = useMemo(
    () => room.assets.filter((asset) => !asset.isReported).length,
    [room.assets]
  );

  const allSelected = useMemo(
    () => isAllSelected(selectedIds, selectableCount),
    [selectedIds, selectableCount]
  );

  // Handlers with useCallback
  const handleToggleAsset = useCallback((id: string) => {
    setSelectedIds((prev) => toggleAssetSelection(prev, id));
  }, []);

  const handleToggleAll = useCallback(() => {
    if (allSelected) {
      setSelectedIds(new Set());
    } else {
      // Only select assets that are NOT reported
      const selectableAssets = room.assets
        .filter((a) => !a.isReported)
        .map((a) => a.id);
      setSelectedIds(new Set(selectableAssets));
    }
  }, [allSelected, room.assets]);

  const handleSubmit = useCallback(() => {
    if (selectedIds.size === 0) {
      toast.error("Pilih minimal satu aset");
      return;
    }
    toast.success(`${selectedIds.size} aset dilaporkan`);
    // TODO: Send to API, then navigate back
  }, [selectedIds]);

  return (
    <div className="pb-6">
      {/* Header */}
      <div className="mt-6 mb-5">
        <Link
          to="/housekeeping/checklist-dashboard"
          className="inline-flex items-center gap-2 text-red-600"
          aria-label="Kembali ke Daftar Ruangan"
        >
          <ArrowLeftIcon className="h-5 w-5" color="currentColor" />
          <Typography variant="body-small" className="text-red-500">
            Daftar Ruangan
          </Typography>
        </Link>

        <Typography
          variant="body-large-semibold"
          className="mt-4 text-gray-900"
        >
          Detail Aset Ruangan
        </Typography>
      </div>

      {/* Main Content */}
      <div className="space-y-4">
        {/* Room Info Card */}
        <Card
          className="mb-6 gap-3 border border-gray-400 bg-gray-100 px-4 py-3"
          elevation="none"
        >
          <InfoRow icon={BuildingIcon} label="Ruang" value={room.code} />
          <InfoRow
            icon={RegistrationIcon}
            label="Janitor"
            value={room.janitor}
          />
          <InfoRow icon={CalendarIcon} label="Tanggal" value={room.date} />
        </Card>

        {/* Assets Section */}
        <Card
          className="mb-6 border border-gray-400 bg-gray-100 py-0"
          elevation="none"
        >
          <CardContent className="p-0">
            {/* Header */}
            <div className="px-4 py-3">
              <Typography
                variant="body-medium-semibold"
                className="text-gray-900"
              >
                Daftar Aset
              </Typography>
            </div>

            {/* Asset List */}
            <div className="divide-y">
              {room.assets.map((asset) => (
                <div
                  key={asset.id}
                  className={`mr-4 mb-2 ml-4 flex items-center gap-3 rounded-lg border p-2 ${
                    selectedIds.has(asset.id)
                      ? "border-red-500 bg-red-50 hover:bg-red-50/80"
                      : asset.isReported
                        ? "border-gray-300 bg-gray-200"
                        : "border-gray-300 bg-white hover:bg-gray-50"
                  }`}
                >
                  <Checkbox
                    checked={selectedIds.has(asset.id)}
                    onChange={() =>
                      !asset.isReported && handleToggleAsset(asset.id)
                    }
                    disabled={asset.isReported}
                  />
                  <div className="flex flex-1 items-center justify-between">
                    <Typography
                      variant="caption-small"
                      className={
                        asset.isReported ? "text-gray-600" : "text-gray-800"
                      }
                    >
                      {asset.name}
                    </Typography>
                    <StatusBadge isReported={asset.isReported} />
                  </div>
                </div>
              ))}
            </div>

            {/* Warning text inside Card */}
            <div className="px-4 py-1">
              <Typography variant="caption-pixie" className="text-gray-800">
                <span className="font-bold">** Jangan</span> centang aset yang
                bermasalah / tidak sesuai.
              </Typography>
            </div>

            {/* Choose all button */}
            <div className="px-4 py-4">
              <Button
                onClick={handleToggleAll}
                className={`w-full border border-red-500 !bg-white text-red-500 ${
                  allSelected ? "bg-red-50" : "bg-white"
                }`}
              >
                <Typography variant="body-medium" className="text-red-500">
                  {allSelected
                    ? "Batal Pilih Semua"
                    : "Pilih Semua Aset Sesuai"}
                </Typography>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Submit Report Button*/}
        <div>
          <Button
            onClick={handleSubmit}
            className="w-full !bg-red-500 text-white hover:bg-red-600"
            disabled={selectedIds.size === 0}
          >
            <AttendanceIcon className="h-5 w-5" color="white" />
            <Typography variant="body-medium" className="text-white">
              Kirim Laporan
            </Typography>
          </Button>
        </div>
      </div>
    </div>
  );
}
