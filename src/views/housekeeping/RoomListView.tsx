import { Link } from "@tanstack/react-router";
import { useMemo } from "react";
import { Button } from "uper-ui/button";
import { Card, CardContent } from "uper-ui/card";
import { ArrowLeftIcon, BuildingIcon, RegistrationIcon } from "uper-ui/icon";
import { Typography } from "uper-ui/typography";

interface Room {
  id: string;
  code: string;
  name: string;
  status: "not-checked" | "checked";
}

interface RoomListData {
  workArea: string;
  janitor: string;
  totalRooms: number;
  completedRooms: number;
  rooms: Array<Room>;
}

type RoomStatusLabelProps = {
  status: Room["status"];
};

function RoomStatusLabel({ status }: RoomStatusLabelProps) {
  const isChecked = status === "checked";

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 ${
        isChecked ? "bg-green-500" : "bg-red-500"
      }`}
    >
      <Typography
        variant="caption"
        className={isChecked ? "text-gray-900" : "text-white"}
      >
        {isChecked ? "Sudah Dicek" : "Belum Dicek"}
      </Typography>
    </span>
  );
}

type RoomItemProps = {
  room: Room;
};

function RoomItem({ room }: RoomItemProps) {
  const isChecked = room.status === "checked";

  return (
    <div
      className={`flex items-center justify-between gap-4 rounded-xl border p-3 ${
        isChecked
          ? "border-green-500 bg-linear-to-r from-green-400 to-white"
          : "border-red-500 bg-linear-to-r from-red-100 to-white"
      }`}
    >
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center">
          <BuildingIcon className="h-6 w-6 text-gray-800" />
        </div>
        <div className="flex flex-col">
          <Typography variant="caption-bold" className="text-gray-900">
            {room.code} - {room.name}
          </Typography>
        </div>
      </div>
      <RoomStatusLabel status={room.status} />
    </div>
  );
}

// Mock data untuk sementara
const MOCK_ROOM_DATA: RoomListData = {
  workArea: "Griya Legita Lt. 2, Lt. 3, Lt. 4",
  janitor: "Agus Bagus",
  totalRooms: 7,
  completedRooms: 4,
  rooms: [
    { id: "1", code: "2402", name: "Griya Legita", status: "not-checked" },
    { id: "2", code: "2403", name: "Griya Legita", status: "not-checked" },
    { id: "3", code: "2404", name: "Griya Legita", status: "not-checked" },
    { id: "4", code: "2301", name: "Griya Legita", status: "checked" },
    { id: "5", code: "2302", name: "Griya Legita", status: "checked" },
    { id: "6", code: "2303", name: "Griya Legita", status: "checked" },
    { id: "7", code: "2304", name: "Griya Legita", status: "checked" },
    { id: "8", code: "2305", name: "Griya Legita", status: "checked" },
    { id: "9", code: "2306", name: "Griya Legita", status: "checked" },
    { id: "10", code: "2307", name: "Griya Legita", status: "checked" },
  ],
};

export function RoomListView() {
  const data = MOCK_ROOM_DATA;

  const progressPercentage = (data.completedRooms / data.totalRooms) * 100;

  const sortedRooms = useMemo(() => {
    const unchecked = data.rooms.filter(
      (room) => room.status === "not-checked"
    );
    const checked = data.rooms.filter((room) => room.status === "checked");
    return [...unchecked, ...checked];
  }, [data.rooms]);

  return (
    <div className="pb-6">
      {/* Header */}
      <div className="mt-6 mb-5">
        <Link
          to="/housekeeping/home"
          className="inline-flex items-center gap-2 text-red-500"
          aria-label="Kembali ke Beranda"
        >
          <ArrowLeftIcon className="h-5 w-5" color="currentColor" />
          <Typography variant="body-small" className="text-red-500">
            Beranda
          </Typography>
        </Link>

        <Typography
          variant="body-large-semibold"
          className="mt-4 text-gray-900"
        >
          Daftar Ruangan
        </Typography>
      </div>

      {/* Info Card */}
      <Card
        className="mb-6 border border-gray-400 bg-gray-100"
        elevation="none"
      >
        <CardContent className="px-4">
          <div className="mb-3 flex items-start gap-2">
            <BuildingIcon className="h-5 w-5 text-primary" />
            <div className="flex items-baseline gap-1">
              <Typography variant="body-small-bold" className="text-gray-800">
                Area Kerja:
              </Typography>
              <Typography variant="body-small" className="text-gray-800">
                {data.workArea}
              </Typography>
            </div>
          </div>

          <div className="mb-3 flex items-start gap-2">
            <RegistrationIcon className="h-5 w-5 text-primary" />
            <div className="flex items-baseline gap-1">
              <Typography variant="body-small-bold" className="text-gray-800">
                Janitor:
              </Typography>
              <Typography variant="body-small" className="text-gray-800">
                {data.janitor}
              </Typography>
            </div>
          </div>

          <div className="border-t border-gray-400">
            <div className="mt-3 mb-2 flex items-center justify-between">
              <Typography variant="caption-bold" className="text-gray-800">
                Kemajuan:
              </Typography>
              <Typography variant="caption" className="text-gray-800">
                {data.completedRooms}/{data.totalRooms} Ruangan Selesai
              </Typography>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-gray-300">
              <div
                className="h-full bg-blue-500 transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Link to="/housekeeping/scan">
        <Button variant="primary" className="mb-6 w-full">
          <Typography variant="body-medium" className="text-white">
            Pindai QR Ruangan
          </Typography>
        </Button>
      </Link>

      {/* Room List */}
      <div className="space-y-3">
        {sortedRooms.map((room) => (
          <RoomItem key={room.id} room={room} />
        ))}
      </div>
    </div>
  );
}
