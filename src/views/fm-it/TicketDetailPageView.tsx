import { useNavigate, useParams } from "@tanstack/react-router";
import React, { useCallback, useEffect, useState } from "react";
import { Accordion } from "uper-ui/accordion";
import { Button } from "uper-ui/button";
import { Callout } from "uper-ui/callout";
import { Card, CardContent } from "uper-ui/card";
import { FileUpload } from "uper-ui/file-upload"
import {
  ArrowLeftIcon,
  BuildingIcon,
  CaretDownIcon,
  CaretUpIcon,
  CautionIcon,
  FileIcon,
  OpenIcon,
  ProfileIcon,
  ScheduleIcon,
  StarIcon,
  SyncIcon,
} from "uper-ui/icon";
import { Tag } from "uper-ui/tags";
import { Textarea } from "uper-ui/textarea";
import { Toaster, toast } from "uper-ui/toast";
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
  // const [onOpenChange, setOnOpenChange] = useState(false);
  const [updateProgressTicket, setUpdatingProgressTicket] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const [report, setData] = useState<Report | null>(null);
  // const [loading, setLoading] = useState<boolean>(true);
  // const [error, setError] = useState<string | null>(null);

  const [photoUrl, setPhotoUrl] = useState<string>("");
  // const [userLocation, setUserLocation] = useState<string>("-");

  const [uploadedFiles, setUploadedFiles] = useState<Array<File>>([]);
  const [technicalNote, setTechnicalNote] = useState<string>("");

  // useEffect(() => {
  //   const savedLocation = sessionStorage.getItem("user_location");
  //   if (savedLocation) {
  //     setUserLocation(savedLocation);
  //   }
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getReportById(id);
      setData(result);
      // try {
      //   setLoading(true);
      //   const result = await getReportById(id);
      //   setData(result);
      // } catch (_err) {
      //   setError("Data gagal dimuat");
      // } finally {
      //   setLoading(false);
      // }
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
    getTimelineByTicketId(id).then((data) => {
      const sortedData = data.sort(
        (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );
      setTimelines(sortedData);
    });
  }, [id]);

  useEffect(() =>{
    const shouldShowToast = sessionStorage.getItem("show_ticket_accepted_toast");
    if (shouldShowToast === "true") {
      toast.default("Tiket berhasil diterima!", {
        action: {
          label: "Tutup",
          onClick: () => {}
        }
      });
      sessionStorage.removeItem("show_ticket_accepted_toast");
  }}, []);

  const getNewStatus = (status: string) => {
    switch (status) {
      case "Menunggu Diterima oleh Petugas":
        return "Petugas dalam Perjalanan";
      case "Petugas dalam Perjalanan":
        return "Sedang Dikerjakan";
      case "Sedang Dikerjakan":
        return "Laporan Selesai";
      case "Laporan Selesai":
        return "Pelapor Memberikan Feedback";
      default:
        return "Menunggu Diterima oleh Petugas";
    }
  };

  const changeStatus = async (newStatus: TicketStatus) => {
    try {
      setUpdatingProgressTicket(true);
      await updateTicketStatus(id, newStatus, technicalNote);

      const updatedTimelines = await getTimelineByTicketId(id);
      setTimelines(updatedTimelines);

      const updatedReport = await getReportById(id);
      setData(updatedReport);

      setOpenModal(false);
    } catch (_error) {
      console.error("Gagal mengubah status");
    } finally {
      setUpdatingProgressTicket(false);
    }
  };

  const calloutMessage = (status: string) => {
    switch (status) {
      case "Petugas dalam Perjalanan":
        return "Anda sedang menuju ruangan pelapor. Mohon ubah status perbaikan di bawah ini jika anda mulai mengerjakan perbaikan.";
      case "Sedang Dikerjakan":
        return "Anda sedang mengerjakan perbaikan. Jangan lupa untuk mencatat laporan teknis perbaikan. Jika sudah, konfirmasi penyelesaian tugas anda di bawah ini.";
      case "Laporan Selesai":
        return "Anda telah selesai mengerjakan perbaikan. Tunggu pelapor memberikan konfirmasi atas penanganan anda!"
      case "Pelapor Memberikan Feedback":
        return "Tiket anda telah dikonfirmasi dan tidak ada masalah lagi!. Terima kasih atas penanganan anda!";
      default:
        return "Anda sedang menuju ruangan pelapor. Mohon ubah status perbaikan di bawah ini jika anda mulai mengerjakan perbaikan.";
  }
}

  const feedback = ["Cepat", "Baik Sekali"];
  const feedbackMessage = "Respon Cepat, Ramah";
  const feedbackRating = 3;

  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});
  const toggleAccordion = useCallback((id: string) => {
    setExpandedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  }, []);

  // if (loading) return <div>Sedang memuat data...</div>;
  // if (error) return <div className="text-red-500">{error}</div>;
  if (!report) return <div>Data kosong.</div>;

  // Ambil status terakhir dari timeline (paling atas/baru), jika kosong gunakan status dari report
  const currentStatus =
    timelines.length > 0 ? timelines[0].status : report.status;
  const nextStatus = getNewStatus(currentStatus as string);

  return (
    <div className="flex flex-col gap-6">
      {/* Back */}
      <div className="">
        <Toaster/>
        <Button variant="tertiary" onClick={home}>
          <React.Fragment key=".0">
            <ArrowLeftIcon />
            Beranda
          </React.Fragment>
        </Button>
      </div>

      {/* Ticket Detail */}
      
      <div className="flex items-center">
        <Typography variant="h4-semibold">Detail Laporan</Typography>
      </div>

      <Card className="bg-gray-100" elevation="none">
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="flex flex-row items-center">
              <div className="flex flex-col">
                  <Typography variant="h5">
                    Ruang {report.room}
                  </Typography>

                <div className="flex flex-row justify-start items-center">
                  <div className="flex items-center justify-center h-5 w-5">
                    <BuildingIcon className="h-4 w-4"/>
                  </div>

                  <div className="flex items-center h-full">
                    <Typography variant="caption-small" className="text-gray-600">
                      Gedung {report.building}
                    </Typography>
                  </div>
                </div>
              </div>

              <div className="ml-auto mb-auto">
                <Tag type="monochrome" color="red" size="md" rounded="pill" className="bg-red-50 px-3">
                  <Typography variant="caption-small" className="text-red-600">
                    {report.id}
                  </Typography>
                </Tag>
              </div>
            </div>

            <div className="flex flex-col items-center gap-2">
              <div className="flex flex-row items-center justify-start gap-2 w-full bg-gray-200 p-2">
                <div className="h-8 w-8 bg-gray-300 flex items-center justify-center rounded-lg">
                  <ProfileIcon className="h-6 w-6"/>
                </div>

                <div className="flex flex-col">
                    <Typography variant="caption-small-semibold" className="text-gray-600">
                      Pelapor
                    </Typography> 

                    <Typography variant="caption-small" className="text-gray-600">
                      {report.reporter} ({report.reporterRole})
                    </Typography>
                </div>
              </div>

              <div className="flex flex-row items-center justify-start gap-2 w-full bg-gray-200 p-2">
                <div className="h-8 w-8 bg-gray-300 flex items-center justify-center rounded-lg">
                  <ScheduleIcon className="h-6 w-6"/>
                </div>

                <div className="flex flex-col">
                    <Typography variant="caption-small-semibold" className="text-gray-600">
                      Tanggal
                    </Typography> 

                    <Typography variant="caption-small" className="text-gray-600">
                      {report.date} | {report.time}
                    </Typography>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Repair Status */}
      <Card className="bg-gray-100" elevation="none">
        <CardContent className="flex flex-col gap-4">
          <Typography variant="h5">
            Daftar Aset Bermasalah
          </Typography>
          <div className="flex w-full flex-col gap-2">
            {report.assets.map((item, index) => {
              const isExpanded = expandedItems[item[index]] || false;
              return (
                <div className="w-full border border-gray-400 rounded-lg">
                  <Button 
                    size="lg"
                    variant="ghost"
                    className="w-full h-full p-4 flex flex-row items-center justify-between"
                    onClick={() =>  toggleAccordion(item[index])}
                  >
                      <div className="flex items-center justify-start gap-2 w-full h-full">
                        <div className="h-5 w-5 flex justify-center items-center">
                          <CautionIcon className="h-4 w-4" color="red"/> 
                        </div>
                        <Typography variant="caption-small-semibold">{item}</Typography>
                        <div className="h-5 w-5 flex justify-center items-center ml-auto">
                          {isExpanded ? 
                            <CaretUpIcon className="h-4 w-4"/> 
                            : <CaretDownIcon className="h-4 w-4"/>
                          }
                        </div>
                      </div>
                  </Button>
                  <Accordion 
                    title="" 
                    key={index} 
                    className="border-0 bg-transparent [&_[data-slot=accordion-content]]:px-0 [&_[data-slot=accordion-header]]:hidden"
                    expanded={isExpanded}
                  >
                    <div className="flex flex-col gap-3">
                      <div className="flex flex-col items-start gap-1">
                        <Typography variant="caption-small-semibold"  className="text-gray-600">Jenis Masalah</Typography>
                        <Tag color="red" type="filled" size="lg" rounded="default" className="px-3">
                          <Typography variant="body-small" className="text-white">
                            Rusak
                          </Typography>
                        </Tag>
                      </div>

                      <div className="flex flex-col items-start gap-1">
                        <Typography variant="caption-small-semibold"  className="text-gray-600">Detail Kendala</Typography>
                        <Textarea
                          className="bg-white"
                          value={report.description}
                          disabled
                        />                  
                      </div>

                      <div className="flex flex-col items-start gap-1">
                        <Typography variant="caption-small-semibold"  className="text-gray-600">Bukti Foto</Typography>
                        <Button
                          onClick={() => {
                            setShowPreview(true);
                            setPhotoUrl(report.photoUrl);
                            setOpenModal(true);
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
                      </div>
                    </div>
                  </Accordion>
                </div>
            )})}
          </div>
        </CardContent>
      </Card>

      {/* Repair Status */}
      <Card className="bg-gray-100" elevation="none">
        <CardContent className="flex flex-col gap-3">
          <Typography variant="h5">
            Status Perbaikan
          </Typography>

          <Callout 
            // message={calloutMessage(report.status)}
            message={calloutMessage(currentStatus)}
            variant={currentStatus === "Sedang Dikerjakan" ||
              currentStatus === "Pelapor Memberikan Feedback" ?
              "blue"
              : "yellow"
            }
            showClose={false}
            showIcon={true}
            className="w-full"
          />
          {currentStatus === "Sedang Dikerjakan" && (
            <div className="flex flex-col justify-center gap-3">
              <div className="flex flex-col items-start gap-1 w-full">
                <Typography variant="caption-small-semibold" className="text-gray-600">Catatan Teknis</Typography>
                <Textarea
                  showCount={true}
                  maxLength={150}
                  helperText=" "
                  value={technicalNote}
                  onChange={(e) => setTechnicalNote(e.target.value)}
                />
              </div>

              <div>
                <Typography variant="caption-small-semibold" className="text-gray-600">Lampirkan Foto</Typography>
                <FileUpload
                  variant="button"
                  accept="image/*"
                  files={uploadedFiles}
                  onFilesChange={(files) => setUploadedFiles(files)}
                  onRemoveFile={(index) =>
                    setUploadedFiles((prev) => prev.filter((_, i) => i !== index))
                  }
                />
              </div>
            </div>
          )}
          {currentStatus !== "Laporan Selesai" && currentStatus !== "Pelapor Memberikan Feedback"  && (
            <Button
              variant="primary"
              className="w-full"
              size="lg"
              disabled={currentStatus === "Sedang Dikerjakan" && (uploadedFiles.length === 0 || !technicalNote)}
              onClick={() => {
                setOpenModal(true);
              }}
            >
              <React.Fragment key=".0">
                <SyncIcon />
                Ubah Status {nextStatus}
              </React.Fragment>
            </Button>
          )}
          {/* HANYA UNTUK UJI COBA TAMPILAN FEEDBACK PENGGUNA */}
          {currentStatus === "Laporan Selesai" && (
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
          )}
          <TicketDetailModal
            open={openModal}
            onOpenChange={setOpenModal}
            photoUrl={photoUrl}
            showPreview={showPreview}
            setShowPreview={setShowPreview}
            onConfirm={() => changeStatus(nextStatus as TicketStatus)}
            isUpdating={updateProgressTicket}
            nextStatus={nextStatus}
          />
        </CardContent>
      </Card>

      {currentStatus === "Pelapor Memberikan Feedback" && (
        <Card className="bg-gray-100" elevation="none">
          <CardContent className="flex flex-col gap-3">
            <Typography variant="h5">Riwayat Penanganan</Typography>
            <div className="flex items-center gap-2">
              <div className="flex">
                <div className="h-17 w-17 flex items-center justify-center">
                  <div className="h-13 w-13 bg-blue-100 rounded-full flex items-center justify-center">
                    <ProfileIcon className="h-11 w-11"/>
                  </div>
                </div>

                <div className="mb-auto h-2 w-2 bg-green-500 rounded-full">
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <Typography variant="body-small-semibold">Agus Bagus</Typography>

                <div className="flex flex-col justify-center">
                  <Typography variant="caption-small">+62 812-3456-7891</Typography>
                  <Typography variant="caption-pixie">Teknisi IT</Typography>
                </div>
              </div>
            </div>  

            <div className="flex flex-col gap-2">
              <Typography variant="caption-small-semibold" className="text-gray-600">Masukan dari Pelapor:</Typography>

              <div className="flex items-center gap-2">
                {feedback.map((item, index) => (
                  <Tag color="red" type="filled" size="lg" key={index}>
                    <Typography variant="caption-small" className="text-white">
                      {item}
                    </Typography>
                  </Tag>
                ))}
              </div>

              <div className="border border-gray-400 rounded-lg flex flex-col gap-1 p-4">
                <div className="flex gap-1 items-center justify-center">
                  {Array.from({ length: feedbackRating }).map((_, index) => (
                    <StarIcon key={index} className="h-5 w-5" />
                  ))}
                </div>

                <div className="flex items-center justify-center">
                  <Typography variant="caption-small">"{feedbackMessage}"</Typography>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Repair Progress */}
      <Card className="bg-gray-100" elevation="none">
        <CardContent className="flex flex-col gap-3">
          <Typography variant="body-medium-bold">Status Saat Ini</Typography>

          <div className="relative">
            {timelines.map((item, index) => {
              if (item.status as string === "Pelapor Memberikan Feedback") {
                return null;
              }

              const isLatest = index === 0;
              const isLastItem = index === timelines.length - 1;

              return (
                <div key={item.id} className="mb-1 flex gap-2">
                  {/* Time */}
                  <div className="flex w-20 flex-col">
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
                    {!isLastItem && <Typography variant="caption-pixie" className="text-xs text-gray-500 my-2">0j 2m</Typography>}
                  </div>

                  {/* TimeLine */}
                  <div className="relative flex flex-col items-center">
                    <div
                      className={`z-10 h-4 w-4 rounded-full border-2 ${
                        isLatest
                          ? "border-red-500 bg-white"
                          : "border-red-500 bg-red-500"
                      }`}
                    ></div>

                    {!isLastItem && (
                      <div className="absolute top-4 h-full translate-x-[0.5px] transform border-l-2 border-dashed border-red-500"></div>
                    )}
                  </div>

                  {/* Status */}
                  <div className="flex-1">
                    <Tag
                      type="filled"
                      size="md"
                      rounded="pill"
                      className={isLatest ?
                        "bg-primary"
                        : "bg-gray-300"
                      }
                    >
                      <Typography 
                        variant="caption-small" 
                        className={isLatest ?
                        "text-white"
                        : "text-gray-600"}
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
