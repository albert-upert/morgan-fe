import { getRouteApi, useNavigate } from "@tanstack/react-router";
import { useCallback } from "react";
import { Button } from "uper-ui/button";
import { Card, CardContent } from "uper-ui/card";
import { ArrowRightIcon, BuildingIcon, CalendarIcon } from "uper-ui/icon";
import { Tag } from "uper-ui/tags";
import { Typography } from "uper-ui/typography";
import { MainMenu } from "@/components/main-menu";
import { getMainMenuByRole, resolveAppRole } from "@/lib/main-menu-list.config";

type ActivityLecturerItem = {
  id: string;
  title: string;
  location: string;
  date: string;
  statusLabel: string;
};

const activityLecturerItems: Array<ActivityLecturerItem> = [
  {
    id: "1",
    title: "Proyektor Epson, ...",
    location: "Griya Legita - 2805",
    date: "29 November 2025",
    statusLabel: "Sedang Dikerjakan",
  },
  {
    id: "2",
    title: "Proyektor Epson, ...",
    location: "Griya Legita - 2805",
    date: "29 November 2025",
    statusLabel: "Sedang Dikerjakan",
  },
  {
    id: "3",
    title: "Proyektor Epson, ...",
    location: "Griya Legita - 2805",
    date: "29 November 2025",
    statusLabel: "Sedang Dikerjakan",
  },
];

type ActivityHkItem = {
  id: string;
  code: string;
  name: string;
  status: "not-checked" | "checked";
};

const activityHkItems: Array<ActivityHkItem> = [
  {
    id: "1",
    code: "2402",
    name: "Griya Legita",
    status: "checked",
  },
  {
    id: "2",
    code: "2403",
    name: "Griya Legita",
    status: "checked",
  },
  {
    id: "3",
    code: "2404",
    name: "Griya Legita",
    status: "checked",
  },
  {
    id: "4",
    code: "2301",
    name: "Griya Legita",
    status: "checked",
  },
  {
    id: "5",
    code: "2302",
    name: "Griya Legita",
    status: "checked",
  },
];

export function HomePageView() {
  function StatusPill({ label }: { label: string }) {
    return (
      <div className="text-3 inline-flex items-center rounded-full bg-red-400 px-3 py-[3.5px] leading-none font-semibold text-white">
        <Typography
          variant="caption-pixie"
          className="font-regular text-3 text-white"
        >
          {label}
        </Typography>
      </div>
    );
  }
  const navigate = useNavigate();
  const layoutRoute = getRouteApi("/_layout");
  const user = layoutRoute.useLoaderData();
  const roleName = user?.roles?.[0]?.role_name;
  const appRole = resolveAppRole(roleName);
  const menus = getMainMenuByRole(appRole);
  const accessScanQr = appRole === "lecturer";
  const accessActivityLecturer = appRole === "lecturer";
  const accessActivityHk = appRole === "hk";
  const name = "Meredita";

  const toScanPage = useCallback(() => {
    navigate({
      to: "/scan",
    });
  }, [navigate]);

  const detailRoomChecklist = useCallback(
    (roomId: string) => {
      navigate({
        to: "/room-checklist/$id",
        params: { id: roomId },
      });
    },
    [navigate]
  );

  return (
    <div className="">
      {/* Greeting */}
      <div className="mt-4 mb-8">
        <Typography variant="body-medium-semibold" className="text-gray-800">
          Selamat Datang, {name}!
        </Typography>
      </div>

      {accessScanQr && (
        <div className="rounded-2xl bg-red-400 p-4 text-white">
          <Typography
            variant="body-large-semibold"
            className="leading-5 text-white"
          >
            Ada masalah aset?
          </Typography>
          <Typography variant="caption-small" className="text-white">
            Pindai QR code di ruangan untuk melapor.
          </Typography>

          <div className="mt-3">
            <Button
              className="w-full rounded-xl bg-white text-red-400 hover:bg-white/90"
              variant="primary"
              onClick={toScanPage}
            >
              <Typography variant="body-medium" className="text-red-400">
                Pindai Kode QR
              </Typography>
            </Button>
          </div>
        </div>
      )}

      {menus.map((menu) => (
        <MainMenu key={menu.id} {...menu} />
      ))}

      {accessActivityLecturer && (
        <div className="mt-10">
          <Card className="mt-3" elevation="low">
            <Typography
              variant="body-medium-semibold"
              className="px-4 text-gray-900"
            >
              Aktivitas Terakhir
            </Typography>
            <CardContent className="px-4">
              {activityLecturerItems.map((item, idx) => {
                const isLast = idx === activityLecturerItems.length - 1;
                return (
                  <div
                    key={item.id}
                    className={
                      !isLast
                        ? "mb-1 border-b border-dashed border-gray-400 pb-1"
                        : ""
                    }
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <Typography
                          variant="caption-small-semibold"
                          className="truncate text-gray-900"
                        >
                          {item.title}
                        </Typography>
                      </div>
                      <StatusPill label={item.statusLabel} />
                    </div>

                    <div className="mt-2 flex flex-wrap items-center gap-x-10 gap-y-2 text-gray-600">
                      <div className="inline-flex items-center gap-1">
                        <BuildingIcon className="size-5" color="currentColor" />
                        <Typography
                          variant="caption-pixie-semibold"
                          className="text-gray-600"
                        >
                          {item.location}
                        </Typography>
                      </div>
                      <div className="inline-flex items-center gap-1">
                        <CalendarIcon className="size-5" color="currentColor" />
                        <Typography
                          variant="caption-pixie-semibold"
                          className="text-gray-600"
                        >
                          {item.date}
                        </Typography>
                      </div>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>
      )}

      {accessActivityHk && (
        <div className="mt-10">
          <Card className="mt-3" elevation="low">
            <Typography
              variant="body-medium-semibold"
              className="px-4 text-gray-900"
            >
              Aktivitas Terakhir
            </Typography>
            <CardContent className="px-4">
              <div className="space-y-3 pb-4">
                {activityHkItems.map((room) => {
                  const isChecked = room.status === "checked";

                  return (
                    <div
                      key={room.id}
                      className={`flex items-center justify-between gap-4 rounded-xl border p-3 ${
                        isChecked
                          ? "border-green-500 bg-linear-to-r from-green-400 to-white"
                          : "border-red-500 bg-linear-to-r from-red-100 to-white"
                      }`}
                      onClick={() => detailRoomChecklist(room.id)}
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

                      <div className="flex items-center gap-2">
                        <Tag
                          type="monochrome"
                          rounded="pill"
                          className={`inline-flex items-center px-3 py-1 ${
                            isChecked ? "bg-green-400" : "bg-red-400"
                          }`}
                        >
                          <Typography
                            variant="caption-small"
                            className={
                              isChecked ? "text-gray-900" : "text-white"
                            }
                          >
                            {isChecked ? "Sudah Dicek" : "Belum Dicek"}
                          </Typography>
                        </Tag>

                        <ArrowRightIcon className="size-6 text-gray-800" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
