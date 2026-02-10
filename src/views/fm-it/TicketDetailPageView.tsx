import { useNavigate, useParams } from "@tanstack/react-router";
import React, { useCallback, useEffect, useState } from "react";
import { Button } from "uper-ui/button";
import { Card, CardContent } from "uper-ui/card";
import { Dialog, DialogContent } from "uper-ui/dialog";
import {
  ArrowLeftIcon,
  BuildingIcon,
  CautionIcon,
  ClockIcon,
  CloseIcon,
  FileIcon,
  InfoIcon,
  NoteIcon,
  OpenIcon,
  RegistrationIcon,
  ScheduleIcon,
  SyncIcon,
} from "uper-ui/icon";
import { Tag } from "uper-ui/tags";
import { Textarea } from "uper-ui/textarea";
import { Typography } from "uper-ui/typography";
import {
  getTimelineByTicketId,
  updateTicketStatus,
} from "@/services/api/reportHistory";
import { getReportById } from "@/services/api/reportService";
import type { Report } from "@/types/report";
import type { TicketHistory, TicketStatus } from "@/types/ticketHistory";
import { TicketDetailModal } from "./TicketDetailPageModal";

export function TicketDetailView() {
  const { id } = useParams({ from: "/_layout/fm-it/ticket-detail/$id" });

  const [showPreview, setShowPreview] = useState(false);
  const [updateProgressTicket, setUpdatingProgressTicket] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const [report, setData] = useState<Report | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [photoUrl, setPhotoUrl] = useState<string>("");
  const [userLocation, setUserLocation] = useState<string>("-");

  useEffect(() => {
    const savedLocation = sessionStorage.getItem("user_location");
    if (savedLocation) {
      setUserLocation(savedLocation);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await getReportById(id);
        setData(result);
      } catch (_err) {
        setError("Data gagal dimuat");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const navigate = useNavigate();
  const home = useCallback(() => {
    navigate({
      to: "/fm-it/home",
    });
  }, []);

  const formatTime = (isoString: string) => {
    const date = new Date(isoString);
    // Format: 08.11
    return date
      .toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })
      .replace(".", ":");
  };

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    // Format: Min, 5 Okt
    return date.toLocaleDateString("id-ID", {
      weekday: "short",
      day: "numeric",
      month: "short",
    });
  };

  // State untuk Timeline
  const [timelines, setTimelines] = useState<Array<TicketHistory>>([]);

  // Fetch data (gabungkan di useEffect yang ada atau buat baru)
  useEffect(() => {
    getTimelineByTicketId(id).then((data) => setTimelines(data));
  }, [id]);

  const getStatusColorClasses = (status: TicketStatus) => {
    switch (status) {
      case "Menunggu Diterima oleh Petugas":
        return { color: "red", text: "text-white" };
      case "Petugas dalam Perjalanan":
        return { color: "yellow", text: "text-black" };
      case "Sedang Dikerjakan":
        return { color: "blue", text: "text-white" };
      case "Laporan Selesai":
        return { color: "green", text: "text-black" };
      default:
        return { color: "red", text: "text-white" };
    }
  };

  const getNewStatus = (status: string) => {
    switch (status) {
      case "Menunggu Diterima oleh Petugas":
        return "Petugas dalam Perjalanan";
      case "Petugas dalam Perjalanan":
        return "Sedang Dikerjakan";
      case "Sedang Dikerjakan":
        return "Laporan Selesai";
      case "Laporan Selesai":
        return "Laporan Selesai";
      default:
        return "Menunggu Diterima oleh Petugas";
    }
  };

  const changeStatus = async (newStatus: TicketStatus) => {
    try {
      setUpdatingProgressTicket(true);
      await updateTicketStatus(id, newStatus, "");

      const updatedTimelines = await getTimelineByTicketId(id);
      setTimelines(updatedTimelines);

      const updatedReport = await getReportById(id);
      setData(updatedReport);

      alert("Status berhasil diubah");
      setOpenModal(false);
    } catch (_error) {
      alert("Gagal mengubah status");
    } finally {
      setUpdatingProgressTicket(false);
    }
  };

  if (loading) return <div>Sedang memuat data...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!report) return <div>Data kosong.</div>;

  // Ambil status terakhir dari timeline (paling atas/baru), jika kosong gunakan status dari report
  const currentStatus =
    timelines.length > 0 ? timelines[0].status : report.status;
  const nextStatus = getNewStatus(currentStatus as string);

  return (
    <div className="flex flex-col gap-6">
      {/* Back */}
      <div className="">
        <Button variant="tertiary" onClick={home}>
          <React.Fragment key=".0">
            <ArrowLeftIcon />
            Beranda
          </React.Fragment>
        </Button>
      </div>

      {/* Ticket Detail */}
      <div>
        <div className="mb-6">
          <Typography variant="body-large-bold">Detail Tiket</Typography>
        </div>

        <div>
          <Card className="bg-gray-100" elevation="none">
            <CardContent>
              <div className="flex flex-col gap-2">
                <div className="flex flex-row items-center gap-3">
                  <NoteIcon className="h-6 w-6" color="red" />
                  <Typography variant="caption-small-bold">
                    Nomor Tiket:
                  </Typography>{" "}
                  {report.id}
                </div>

                <div className="flex flex-row items-center gap-3">
                  <BuildingIcon className="h-6 w-6" color="red" />
                  <Typography variant="caption-small-bold">
                    Ruang:
                  </Typography>{" "}
                  {report.room} - {report.building}
                </div>

                <div className="flex flex-row items-center gap-3">
                  <CautionIcon className="h-6 w-6" color="red" />
                  <Typography variant="caption-small-bold">Aset:</Typography>
                  {report.assets.join(", ")}
                </div>

                <div className="flex flex-row items-center gap-3">
                  <ScheduleIcon className="h-6 w-6" color="red" />
                  <Typography variant="caption-small-bold">Tanggal:</Typography>
                  {report.date} | {report.time}
                </div>

                <div className="flex flex-row items-center gap-3">
                  <RegistrationIcon className="h-6 w-6" color="red" />
                  <Typography variant="caption-small-bold">Pelapor:</Typography>
                  {report.reporter} ({report.reporterRole})
                </div>

                <div>
                  {/* File Attachment */}
                  <Button
                    onClick={() => {
                      if (report.photoUrl) {
                        setPhotoUrl(photoUrl);
                        setShowPreview(true);
                      }
                    }}
                    className="flex w-full flex-row items-center justify-between gap-3"
                    variant="outline"
                  >
                    <div>
                      <FileIcon />
                    </div>

                    <div className="flex grow justify-start">
                      {report.photoUrl}
                    </div>

                    <div>
                      <OpenIcon />
                    </div>
                  </Button>
                  {showPreview && (
                    <Dialog
                      open={showPreview}
                      onOpenChange={(next) => {
                        setShowPreview(next);
                        if (!next) {
                          // keep drafts for now; layout-only behavior
                        }
                      }}
                    >
                      <DialogContent
                        side="center"
                        showCloseButton={false}
                        className="w-full p-0 data-[side=center]:w-[calc(100%-48px)] data-[side=center]:max-w-[412px]"
                      >
                        <div className="h-min-content flex w-full flex-col items-center gap-4 p-3 data-[side=center]:w-[calc(100%-48px)] data-[side=center]:max-w-[412px]">
                          <Button
                            variant="secondary"
                            onClick={() => setShowPreview(false)}
                            className="absolute self-end"
                          >
                            <CloseIcon className="" />
                          </Button>
                          <img
                            src={photoUrl}
                            alt="Bukti Laporan"
                            className="h-auto max-h-[60vh] w-full rounded-lg border border-gray-200 bg-gray-50 object-contain"
                          />
                        </div>
                      </DialogContent>
                    </Dialog>
                  )}
                </div>

                <div>
                  <Textarea className="" value={report.description} disabled />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Repair Status */}
      <Card className="bg-gray-100" elevation="none">
        <CardContent className="flex flex-col gap-3">
          <div className="">
            <Typography variant="body-medium-bold">Status Perbaikan</Typography>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex flex-row items-center gap-3">
              <InfoIcon className="h-6 w-6" />
              <Typography variant="caption-small-bold">Posisi Anda:</Typography>
              {userLocation}
            </div>

            <div className="flex flex-row items-center gap-3">
              <ClockIcon className="h-6 w-6" />
              <Typography variant="caption-small-bold">
                Estimasi Perjalanan:
              </Typography>
              - 5 Menit
            </div>
          </div>

          <Button
            variant="primary"
            className="w-full"
            size="lg"
            onClick={() => {
              setOpenModal(true);
            }}
          >
            <React.Fragment key=".0">
              <SyncIcon />
              Ubah Status {nextStatus}
            </React.Fragment>
          </Button>
          <TicketDetailModal
            open={openModal}
            onOpenChange={setOpenModal}
            onConfirm={() => changeStatus(nextStatus as TicketStatus)}
            isUpdating={updateProgressTicket}
            nextStatus={nextStatus}
          />
        </CardContent>
      </Card>

      {/* Repair Progress */}
      <Card className="bg-gray-100" elevation="none">
        <CardContent className="flex flex-col gap-3">
          <div className="">
            <Typography variant="body-medium-bold">Status Saat Ini</Typography>
          </div>

          <div className="relative">
            {timelines.map((item, index) => {
              const isLatest = index === 0;
              const isLastItem = index === timelines.length - 1;
              const colors = getStatusColorClasses(item.status);

              return (
                <div key={item.id} className="mb-1 flex gap-2">
                  {/* Time */}
                  <div className="flex w-15 flex-col pt-1">
                    <Typography
                      variant="caption-pixie-bold"
                      className="font-bold text-gray-900"
                    >
                      {formatTime(item.timestamp)}
                    </Typography>
                    <Typography
                      variant="caption-pixie"
                      className="text-xs text-gray-500"
                    >
                      {formatDate(item.timestamp)}
                    </Typography>
                    {/* {!isLastItem && <Typography variant="caption-pixie" className="text-xs text-gray-500 mt-2">0j 2m</Typography>} */}
                  </div>

                  {/* TimeLine */}
                  <div className="relative flex flex-col items-center">
                    <div
                      className={`z-10 h-4 w-4 rounded-full border-2 ${
                        isLatest
                          ? "border-red-500 bg-red-500"
                          : "border-red-500 bg-white"
                      }`}
                    ></div>

                    {!isLastItem && (
                      <div className="absolute top-4 h-full translate-x-[0.5px] transform border-l-2 border-dashed border-red-500"></div>
                    )}
                  </div>

                  {/* Status */}
                  <div className="flex-1 pb-8">
                    <Tag
                      color={colors.color}
                      type="filled"
                      size="md"
                      rounded="pill"
                    >
                      <Typography
                        variant="caption-small"
                        className={colors.text}
                      >
                        {item.status}
                      </Typography>
                    </Tag>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

import { useNavigate, useParams } from "@tanstack/react-router";
import React, { useCallback, useEffect, useState } from "react";
import { Button } from "uper-ui/button";
import { Card, CardContent } from "uper-ui/card";
import { Dialog, DialogContent } from "uper-ui/dialog";
import {
  ArrowLeftIcon,
  BuildingIcon,
  CautionIcon,
  ClockIcon,
  CloseIcon,
  FileIcon,
  InfoIcon,
  NoteIcon,
  OpenIcon,
  RegistrationIcon,
  ScheduleIcon,
  SyncIcon,
} from "uper-ui/icon";
import { Tag } from "uper-ui/tags";
import { Textarea } from "uper-ui/textarea";
import { Typography } from "uper-ui/typography";
import {
  getTimelineByTicketId,
  updateTicketStatus,
} from "@/services/api/reportHistory";
import { getReportById } from "@/services/api/reportService";
import type { Report } from "@/types/report";
import type { TicketHistory, TicketStatus } from "@/types/ticketHistory";
import { TicketDetailModal } from "./TicketDetailPageModal";

export function TicketDetailView() {
  const { id } = useParams({ from: "/_layout/fm-it/ticket-detail/$id" });

  const [showPreview, setShowPreview] = useState(false);
  const [updateProgressTicket, setUpdatingProgressTicket] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const [report, setData] = useState<Report | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [photoUrl, setPhotoUrl] = useState<string>("");
  const [userLocation, setUserLocation] = useState<string>("-");

  useEffect(() => {
    const savedLocation = sessionStorage.getItem("user_location");
    if (savedLocation) {
      setUserLocation(savedLocation);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await getReportById(id);
        setData(result);
      } catch (_err) {
        setError("Data gagal dimuat");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const navigate = useNavigate();
  const home = useCallback(() => {
    navigate({
      to: "/fm-it/home",
    });
  }, []);

  const formatTime = (isoString: string) => {
    const date = new Date(isoString);
    // Format: 08.11
    return date
      .toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })
      .replace(".", ":");
  };

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    // Format: Min, 5 Okt
    return date.toLocaleDateString("id-ID", {
      weekday: "short",
      day: "numeric",
      month: "short",
    });
  };

  // State untuk Timeline
  const [timelines, setTimelines] = useState<Array<TicketHistory>>([]);

  // Fetch data (gabungkan di useEffect yang ada atau buat baru)
  useEffect(() => {
    getTimelineByTicketId(id).then((data) => setTimelines(data));
  }, [id]);

  const getStatusColorClasses = (status: TicketStatus) => {
    switch (status) {
      case "Menunggu Diterima oleh Petugas":
        return { color: "red", text: "text-white" };
      case "Petugas dalam Perjalanan":
        return { color: "yellow", text: "text-black" };
      case "Sedang Dikerjakan":
        return { color: "blue", text: "text-white" };
      case "Laporan Selesai":
        return { color: "green", text: "text-black" };
      default:
        return { color: "red", text: "text-white" };
    }
  };

  const getNewStatus = (status: string) => {
    switch (status) {
      case "Menunggu Diterima oleh Petugas":
        return "Petugas dalam Perjalanan";
      case "Petugas dalam Perjalanan":
        return "Sedang Dikerjakan";
      case "Sedang Dikerjakan":
        return "Laporan Selesai";
      case "Laporan Selesai":
        return "Laporan Selesai";
      default:
        return "Menunggu Diterima oleh Petugas";
    }
  };

  const changeStatus = async (newStatus: TicketStatus) => {
    try {
      setUpdatingProgressTicket(true);
      await updateTicketStatus(id, newStatus, "");

      const updatedTimelines = await getTimelineByTicketId(id);
      setTimelines(updatedTimelines);

      const updatedReport = await getReportById(id);
      setData(updatedReport);

      alert("Status berhasil diubah");
      setOpenModal(false);
    } catch (_error) {
      alert("Gagal mengubah status");
    } finally {
      setUpdatingProgressTicket(false);
    }
  };

  if (loading) return <div>Sedang memuat data...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!report) return <div>Data kosong.</div>;

  // Ambil status terakhir dari timeline (paling atas/baru), jika kosong gunakan status dari report
  const currentStatus =
    timelines.length > 0 ? timelines[0].status : report.status;
  const nextStatus = getNewStatus(currentStatus as string);

  return (
    <div className="flex flex-col gap-6">
      {/* Back */}
      <div className="">
        <Button variant="tertiary" onClick={home}>
          <React.Fragment key=".0">
            <ArrowLeftIcon />
            Beranda
          </React.Fragment>
        </Button>
      </div>

      {/* Ticket Detail */}
      <div>
        <div className="mb-6">
          <Typography variant="body-large-bold">Detail Tiket</Typography>
        </div>

        <div>
          <Card className="bg-gray-100" elevation="none">
            <CardContent>
              <div className="flex flex-col gap-2">
                <div className="flex flex-row items-center gap-3">
                  <NoteIcon className="h-6 w-6" color="red" />
                  <Typography variant="caption-bold">
                    Nomor Tiket:
                  </Typography>{" "}
                  {report.id}
                </div>

                <div className="flex flex-row items-center gap-3">
                  <BuildingIcon className="h-6 w-6" color="red" />
                  <Typography variant="caption-bold">Ruang:</Typography>{" "}
                  {report.room} - {report.building}
                </div>

                <div className="flex flex-row items-center gap-3">
                  <CautionIcon className="h-6 w-6" color="red" />
                  <Typography variant="caption-bold">Aset:</Typography>
                  {report.assets.join(", ")}
                </div>

                <div className="flex flex-row items-center gap-3">
                  <ScheduleIcon className="h-6 w-6" color="red" />
                  <Typography variant="caption-bold">Tanggal:</Typography>
                  {report.date} | {report.time}
                </div>

                <div className="flex flex-row items-center gap-3">
                  <RegistrationIcon className="h-6 w-6" color="red" />
                  <Typography variant="caption-bold">Pelapor:</Typography>
                  {report.reporter} ({report.reporterRole})
                </div>

                <div>
                  {/* File Attachment */}
                  <Button
                    onClick={() => {
                      if (report.photoUrl) {
                        setPhotoUrl(photoUrl);
                        setShowPreview(true);
                      }
                    }}
                    className="flex w-full flex-row items-center justify-between gap-3"
                    variant="outline"
                  >
                    <div>
                      <FileIcon />
                    </div>

                    <div className="flex grow justify-start">
                      {report.photoUrl}
                    </div>

                    <div>
                      <OpenIcon />
                    </div>
                  </Button>
                  {showPreview && (
                    <Dialog
                      open={showPreview}
                      onOpenChange={(next) => {
                        setShowPreview(next);
                        if (!next) {
                          // keep drafts for now; layout-only behavior
                        }
                      }}
                    >
                      <DialogContent
                        side="center"
                        showCloseButton={false}
                        className="w-full p-0 data-[side=center]:w-[calc(100%-48px)] data-[side=center]:max-w-[412px]"
                      >
                        <div className="h-min-content flex w-full flex-col items-center gap-4 p-3 data-[side=center]:w-[calc(100%-48px)] data-[side=center]:max-w-[412px]">
                          <Button
                            variant="secondary"
                            onClick={() => setShowPreview(false)}
                            className="absolute self-end"
                          >
                            <CloseIcon className="" />
                          </Button>
                          <img
                            src={photoUrl}
                            alt="Bukti Laporan"
                            className="h-auto max-h-[60vh] w-full rounded-lg border border-gray-200 bg-gray-50 object-contain"
                          />
                        </div>
                      </DialogContent>
                    </Dialog>
                  )}
                </div>

                <div>
                  <Textarea className="" value={report.description} disabled />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Repair Status */}
      <Card className="bg-gray-100" elevation="none">
        <CardContent className="flex flex-col gap-3">
          <div className="">
            <Typography variant="body-medium-bold">Status Perbaikan</Typography>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex flex-row items-center gap-3">
              <InfoIcon className="h-6 w-6" />
              <Typography variant="caption-bold">Posisi Anda:</Typography>
              {userLocation}
            </div>

            <div className="flex flex-row items-center gap-3">
              <ClockIcon className="h-6 w-6" />
              <Typography variant="caption-bold">
                Estimasi Perjalanan:
              </Typography>
              - 5 Menit
            </div>
          </div>

          <Button
            variant="primary"
            className="w-full"
            size="lg"
            onClick={() => {
              setOpenModal(true);
            }}
          >
            <React.Fragment key=".0">
              <SyncIcon />
              Ubah Status {nextStatus}
            </React.Fragment>
          </Button>
          <TicketDetailModal
            open={openModal}
            onOpenChange={setOpenModal}
            onConfirm={() => changeStatus(nextStatus as TicketStatus)}
            isUpdating={updateProgressTicket}
            nextStatus={nextStatus}
          />
        </CardContent>
      </Card>

      {/* Repair Progress */}
      <Card className="bg-gray-100" elevation="none">
        <CardContent className="flex flex-col gap-3">
          <div className="">
            <Typography variant="body-medium-bold">Status Saat Ini</Typography>
          </div>

          <div className="relative">
            {timelines.map((item, index) => {
              const isLatest = index === 0;
              const isLastItem = index === timelines.length - 1;
              const colors = getStatusColorClasses(item.status);

              return (
                <div key={item.id} className="mb-1 flex gap-2">
                  {/* Time */}
                  <div className="flex w-15 flex-col pt-1">
                    <Typography
                      variant="pixie-bold"
                      className="font-bold text-gray-900"
                    >
                      {formatTime(item.timestamp)}
                    </Typography>
                    <Typography
                      variant="pixie"
                      className="text-xs text-gray-500"
                    >
                      {formatDate(item.timestamp)}
                    </Typography>
                    {/* {!isLastItem && <Typography variant="pixie" className="text-xs text-gray-500 mt-2">0j 2m</Typography>} */}
                  </div>

                  {/* TimeLine */}
                  <div className="relative flex flex-col items-center">
                    <div
                      className={`z-10 h-4 w-4 rounded-full border-2 ${
                        isLatest
                          ? "border-red-500 bg-red-500"
                          : "border-red-500 bg-white"
                      }`}
                    ></div>

                    {!isLastItem && (
                      <div className="absolute top-4 h-full translate-x-[0.5px] transform border-l-2 border-dashed border-red-500"></div>
                    )}
                  </div>

                  {/* Status */}
                  <div className="flex-1 pb-8">
                    <Tag
                      color={colors.color}
                      type="filled"
                      size="md"
                      rounded="pill"
                    >
                      <Typography variant="caption" className={colors.text}>
                        {item.status}
                      </Typography>
                    </Tag>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
