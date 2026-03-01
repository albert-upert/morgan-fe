import { useNavigate } from "@tanstack/react-router";
import { useCallback, useMemo } from "react";
import { Button } from "uper-ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "uper-ui/card";
import { ArrowBackIcon, BuildingIcon, ProfileIcon } from "uper-ui/icon";
import { Tag } from "uper-ui/tags";
import { Typography } from "uper-ui/typography";

interface IRoom {
  id: string;
  code: string;
  name: string;
  status: "not-checked" | "checked";
}

interface IRoomListData {
  id: string;
  janitor: string;
  workAreas: Array<IWorkArea>;
  rooms: Array<IRoom>;
}

interface IWorkArea {
  id: string;
  building: string;
  floors: Array<string>;
}

const data_report: IRoomListData = {
  id: "1",
  janitor: "Agus Bagus",
  workAreas: [
    {
      id: "1",
      building: "Griya Legita",
      floors: ["Lt. 2", "Lt. 3", "Lt. 4"],
    },
    {
      id: "2",
      building: "Rektorat",
      floors: ["Lt. 1"],
    },
  ],
  rooms: [
    { id: "1", code: "2402", name: "Griya Legita", status: "not-checked" },
    { id: "2", code: "2403", name: "Griya Legita", status: "not-checked" },
    { id: "3", code: "2404", name: "Griya Legita", status: "not-checked" },
    { id: "4", code: "2301", name: "Griya Legita", status: "checked" },
    { id: "5", code: "2302", name: "Griya Legita", status: "checked" },
    { id: "6", code: "2303", name: "Griya Legita", status: "checked" },
    { id: "7", code: "1101", name: "Rektorat", status: "checked" },
  ],
};

export function ChecklistDashboardView() {
  const navigate = useNavigate();
  const completedRooms = data_report.rooms.filter(
    (room) => room.status === "checked"
  ).length;

  const totalRooms = data_report.rooms.length;
  const progressPercentage =
    totalRooms === 0 ? 0 : (completedRooms / totalRooms) * 100;

  // sort for not-checked first then checked
  const sortedRooms = useMemo(() => {
    const unchecked = data_report.rooms.filter(
      (room) => room.status === "not-checked"
    );
    const checked = data_report.rooms.filter(
      (room) => room.status === "checked"
    );
    return [...unchecked, ...checked];
  }, [data_report.rooms]);

  const toHomePage = useCallback(() => {
    navigate({
      to: "/lecturer/home", // TBF: /home
    });
  }, [navigate]);

  const toScanPage = useCallback(() => {
    navigate({
      to: "/housekeeping/scan", // TBF: /scan
    });
  }, [navigate]);

  return (
    <div className="flex flex-col gap-4">
      {/* Back Home Button */}
      <Button variant="tertiary" onClick={toHomePage} className="w-fit">
        <ArrowBackIcon className="size-5" color="currentColor" />
        Beranda
      </Button>

      {/* Title */}
      <Typography variant="h4-semibold" className="text-gray-900">
        Daftar Ruangan
      </Typography>

      {/* Info Card */}
      <Card className="border border-gray-400 bg-gray-100 p-2">
        <CardContent className="flex flex-col gap-4 p-2">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
              <ProfileIcon className="h-5 w-5 text-blue-500" />
            </div>

            <Typography
              variant="body-medium-semibold"
              className="text-gray-800"
            >
              {data_report.janitor}
            </Typography>

            <Tag
              color="red"
              type="monochrome"
              rounded="pill"
              className="ml-auto bg-red-50 px-3 py-1"
            >
              <Typography variant="caption-small" className="text-red-600">
                Janitor
              </Typography>
            </Tag>
          </div>

          <div className="flex items-center justify-start gap-2">
            <BuildingIcon className="h-6 w-6" />
            <div className="flex items-baseline gap-1">
              <Typography
                variant="body-small-semibold"
                className="text-gray-800"
              >
                Area Tanggung Jawab
              </Typography>
            </div>
          </div>

          {/* Work Areas */}
          <div className="flex flex-col gap-2">
            {data_report.workAreas.map((area) => (
              <Tag
                type="with-border"
                className="w-full justify-between rounded-sm border-gray-400 bg-gray-200 px-2 py-1"
              >
                <Typography variant="caption-small">
                  Gedung {area.building}
                </Typography>
                <div className="flex gap-1">
                  {area.floors.map((floor) => (
                    <Tag
                      key={floor}
                      type="with-border"
                      className="rounded-sm border-gray-400 bg-gray-300 px-1 py-1"
                    >
                      <Typography variant="caption-pixie-semibold">
                        {floor}
                      </Typography>
                    </Tag>
                  ))}
                </div>
              </Tag>
            ))}
          </div>

          {/* Progress Bar */}
          <div className="border-t border-gray-400">
            <div className="flex items-center justify-between">
              <Typography
                variant="body-small-semibold"
                className="pt-2 pb-1 text-gray-800"
              >
                Progres Harian:
              </Typography>
              <Typography variant="caption-small" className="text-gray-800">
                {completedRooms}/{totalRooms} Ruangan Selesai
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

      {/* QR Card */}
      <Card className="gap-1 bg-red-400 px-0 py-5">
        <CardHeader>
          <CardTitle>
            <Typography variant="body-large-semibold" className="text-white">
              Pindai QR Ruangan
            </Typography>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Typography variant="caption-small" className="text-white">
            Pindai kode QR yang tertera pada ruangan
          </Typography>
        </CardContent>
        <CardFooter className="w-full">
          <Button
            variant="ghost"
            className="w-full bg-white"
            onClick={toScanPage}
          >
            <Typography variant="body-medium" className="text-red-500">
              Pindai Kode QR
            </Typography>
          </Button>
        </CardFooter>
      </Card>

      {/* Room List sort by status not-checked to checked */}
      <div className="space-y-3 pb-4">
        {sortedRooms.map((room) => {
          const isChecked = room.status === "checked";

          return (
            <div
              key={room.id}
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
                  <Typography
                    variant="body-small-semibold"
                    className="text-gray-900"
                  >
                    {room.code} - {room.name}
                  </Typography>
                </div>
              </div>

              <Tag
                type="monochrome"
                rounded="pill"
                className={`inline-flex items-center px-3 py-1 ${
                  isChecked ? "bg-green-400" : "bg-red-400"
                }`}
              >
                <Typography
                  variant="caption-small"
                  className={isChecked ? "text-gray-900" : "text-white"}
                >
                  {isChecked ? "Sudah Dicek" : "Belum Dicek"}
                </Typography>
              </Tag>
            </div>
          );
        })}
      </div>
    </div>
  );
}
