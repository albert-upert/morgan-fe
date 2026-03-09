import { useLocation, useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Accordion } from "uper-ui/accordion";
import { Button } from "uper-ui/button";
import { Card, CardContent } from "uper-ui/card";
import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
} from "uper-ui/dropdown";
import {
  ArrowLeftIcon,
  BuildingIcon,
  CaretDownIcon,
  CaretUpIcon,
  ClockIcon,
  FilterIcon,
  ProfileIcon,
  ScheduleIcon,
  SearchIcon,
  StarIcon,
} from "uper-ui/icon";
import { Input } from "uper-ui/input";
import { Pagination } from "uper-ui/pagination";
import { Tag } from "uper-ui/tags";
import { Typography } from "uper-ui/typography";
import { getAllReports } from "@/services/api/reportService";
import type { Report } from "@/types/report";
import { TicketListModal } from "./TicketListPageModal";

export type Building = {
  name: string;
  floors: Array<string>;
};
const name = "Budi Santoso";
const shift = "07.00 - 13.00 WIB";
const sesi = "Pagi";
const rating = 4.8;
const taskDone = 80;
const area: Array<Building> = [
  { name: "Gedung Griya Legita", floors: ["Lt.1", "Lt.2"] },
  { name: "Gedung Rektorat", floors: ["Lt.1"] },
];
const role = "IT Support";

export function TicketListView() {
  const [reports, setReports] = useState<Array<Report>>([]);

  const [openDetailModal, setOpenDetailModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>(
    {}
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBuilding, setSelectedBuilding] = useState<string | null>(null);
  const itemsPerPage = 3;

  const location = useLocation();
  const filter = (location.search as { filter: string }).filter;

  const filteredReports = useMemo(
    () =>
      reports.filter((item) => {
        if (filter === "available") {
          return item.status === "Menunggu Petugas";
        }
        if (filter === "history") {
          return (
            item.status === "Laporan Selesai" ||
            item.status === "Pelapor Memberikan Feedback"
          );
        }
        if (filter === "active") {
          return (
            item.status === "Petugas dalam Perjalanan" ||
            item.status === "Sedang Dikerjakan"
          );
        }
        return true;
      }),
    [reports, filter]
  );

  const finalReports = useMemo(() => {
    if (selectedBuilding) {
      return filteredReports.filter(
        (item) => item.building === selectedBuilding
      );
    }
    return filteredReports;
  }, [filteredReports, selectedBuilding]);

  const totalPages = Math.ceil(finalReports.length / itemsPerPage);
  const paginatedReports = finalReports.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [filter, selectedBuilding]);

  useEffect(() => {
    const fetchAll = async () => {
      const data = await getAllReports();
      setReports(data);
    };

    fetchAll();
  }, []);

  const navigate = useNavigate();

  const home = useCallback(() => {
    navigate({
      to: "/$module/home",
      params: { module: "fm-it" },
    });
  }, [navigate]);

  const toggleAccordion = useCallback((id: string) => {
    setExpandedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  }, []);

  const hasActiveTicket = reports.some(
    (r) =>
      r.status === "Petugas dalam Perjalanan" ||
      r.status === "Sedang Dikerjakan"
  );

  const lihatDetail = useCallback(
    (item: Report) => {
      if (item.status === "Menunggu Petugas") {
        if (hasActiveTicket) {
          alert(
            "Anda sedang mengerjakan tiket lain. Selesaikan terlebih dahulu sebelum mengambil tiket baru."
          );
          return;
        }
        setOpenDetailModal(true);
        setSelectedReport(item);
      } else {
        navigate({
          to: "/fm-it/ticket-detail/$id",
          params: {
            id: String(item.id),
          },
        });
      }
    },
    [navigate, hasActiveTicket]
  );

  return (
    <div className="flex flex-col gap-6">
      {/* Back */}
      <div className="">
        <Button variant="tertiary" onClick={home}>
          <ArrowLeftIcon />
          Beranda
        </Button>
      </div>

      <div className="">
        <Typography variant="h4-semibold">Daftar Tiket Masuk</Typography>
      </div>

      {/* Staff Data */}
      <Card className="bg-gray-100">
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="flex flex-row items-center">
              <div className="items center flex flex-row gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                  <ProfileIcon className="h-6 w-6" />
                </div>

                <div className="flex flex-col">
                  <Typography variant="body-medium-semibold">{name}</Typography>

                  <div className="flex flex-row items-center justify-start">
                    <div className="flex h-full w-3 items-center justify-center">
                      <StarIcon className="h-3 w-3" />
                    </div>

                    <div className="flex h-full items-center">
                      <Typography
                        variant="caption-pixie"
                        className="text-gray-600"
                      >
                        {rating} ({taskDone} Tugas Selesai)
                      </Typography>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-auto ml-auto">
                <Tag
                  type="monochrome"
                  color="red"
                  size="md"
                  rounded="pill"
                  className="bg-red-50 px-3"
                >
                  <Typography variant="caption-small" className="text-red-600">
                    {role}
                  </Typography>
                </Tag>
              </div>
            </div>

            <div className="flex flex-col items-center gap-2">
              <div className="flex w-full flex-row items-center justify-start gap-2 bg-gray-200 p-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-300">
                  <ClockIcon className="h-6 w-6" />
                </div>

                <div className="flex flex-col">
                  <Typography
                    variant="body-small-semibold"
                    className="text-gray-600"
                  >
                    Shift: {sesi}
                  </Typography>

                  <Typography variant="caption-small" className="text-gray-600">
                    {shift}
                  </Typography>
                </div>
              </div>

              <div className="flex w-full flex-row items-center">
                <div className="flex h-8 w-8 items-center justify-center">
                  <BuildingIcon className="h-6 w-6" />
                </div>

                <div className="flex items-center">
                  <Typography variant="body-small-semibold">
                    Area Tanggung Jawab
                  </Typography>
                </div>
              </div>

              <div className="flex w-full flex-col items-center gap-2">
                {area.map((item, index) => (
                  <div
                    key={index}
                    className="flex w-full flex-row items-center justify-between rounded-lg border border-gray-400 bg-gray-200 p-2"
                  >
                    <div>
                      <Typography variant="caption-small">
                        {item.name}
                      </Typography>
                    </div>

                    <div className="flex items-center gap-1">
                      {item.floors.map((floor, indexf) => (
                        <div
                          key={indexf}
                          className="flex items-center justify-center bg-gray-300 p-1"
                        >
                          <Typography variant="caption-pixie-semibold">
                            {floor}
                          </Typography>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Ticket List */}
      <Card className="bg-gray-100">
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4">
              <div className="flex items-center">
                <Typography variant="h5">Daftar Laporan</Typography>
              </div>

              <div className="flex flex-row items-center justify-between gap-2">
                <div className="flex w-[284px] items-center">
                  <Input
                    size="lg"
                    placeholder="Cari laporan..."
                    startIcon={
                      <SearchIcon className="size-5 text-muted-foreground" />
                    }
                  />
                </div>

                <Dropdown>
                  <DropdownTrigger asChild>
                    <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-primary bg-white">
                      <FilterIcon className="h-5 w-5" color="red" />
                    </button>
                  </DropdownTrigger>
                  <DropdownContent align="end">
                    <DropdownItem onSelect={() => setSelectedBuilding(null)}>
                      Semua Gedung
                    </DropdownItem>
                    {Array.from(
                      new Set(filteredReports.map((item) => item.building))
                    )
                      .filter(Boolean)
                      .map((building) => (
                        <DropdownItem
                          key={building}
                          onSelect={() => setSelectedBuilding(building)}
                        >
                          {building}
                        </DropdownItem>
                      ))}
                  </DropdownContent>
                </Dropdown>
              </div>

              <div className="flex items-center">
                <div className="flex h-5 w-3 flex-col items-center justify-center">
                  <CaretUpIcon className="h-3 w-3" />
                  <CaretDownIcon className="h-3 w-3" />
                </div>

                <div className="flex items-center">
                  <Typography variant="caption-small">
                    ({finalReports.length}) Laporan ditemukan
                  </Typography>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              {paginatedReports.map((item, index) => {
                const isExpanded = expandedItems[item.id] || false;
                return (
                  <Card key={index} className="bg-gray-100">
                    <CardContent>
                      <div className="flex flex-col items-center gap-2">
                        <div className="flex w-full flex-row items-center justify-between">
                          <div className="flex items-center">
                            <Typography
                              variant="body-small-semibold"
                              className="text-gray-600"
                            >
                              {item.id}
                            </Typography>
                          </div>

                          <div className="flex items-center">
                            <Tag
                              color="red"
                              type="filled"
                              size="md"
                              rounded="pill"
                            >
                              <Typography
                                variant="caption-small"
                                className="text-white"
                              >
                                {item.status !== "Pelapor Memberikan Feedback"
                                  ? item.status
                                  : "Laporan Selesai"}
                              </Typography>
                            </Tag>
                          </div>
                        </div>

                        <div className="items-between flex w-full flex-col justify-between gap-2">
                          <div className="flex w-full flex-row items-center justify-between gap-2">
                            <div className="flex w-full flex-row items-center gap-1 rounded-lg bg-gray-300 p-2">
                              <ClockIcon className="h-5 w-5" />
                              <Typography variant="caption-pixie-semibold">
                                {item.time}
                              </Typography>
                            </div>

                            <div className="flex w-full flex-row items-center gap-1 rounded-lg bg-gray-300 p-2">
                              <ScheduleIcon className="h-5 w-5" />
                              <Typography variant="caption-pixie-semibold">
                                {item.date}
                              </Typography>
                            </div>
                          </div>

                          <div className="flex w-full min-w-0 flex-row items-center gap-2 overflow-hidden">
                            <div className="flex w-full flex-row items-center gap-1 overflow-x-auto rounded-lg bg-gray-300 p-2">
                              <div className="h-5 w-5 items-center justify-center">
                                <BuildingIcon className="h-5 w-5" />
                              </div>

                              <div className="flex w-full items-center">
                                <Typography
                                  variant="caption-pixie-semibold"
                                  className="text-nowrap"
                                >
                                  {item.building} - {item.room}
                                </Typography>
                              </div>
                            </div>

                            <div className="flex w-full flex-row items-center gap-1 overflow-x-auto rounded-lg bg-gray-300 p-2">
                              <div className="h-5 w-5 items-center justify-center">
                                <ProfileIcon className="h-5 w-5" />
                              </div>

                              <div className="flex w-full items-center">
                                <Typography
                                  variant="caption-pixie-semibold"
                                  className="text-nowrap"
                                >
                                  {item.reporter} ({item.reporterRole})
                                </Typography>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="w-full">
                          <Button
                            size="lg"
                            variant="ghost"
                            className="flex w-full flex-row items-center justify-between p-0"
                            onClick={() => toggleAccordion(item.id)}
                          >
                            <Typography variant="caption-small-semibold">
                              ({item.assets.length}) Aset Bermasalah:
                            </Typography>
                            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-300">
                              {isExpanded ? (
                                <CaretUpIcon className="h-4 w-4" />
                              ) : (
                                <CaretDownIcon className="h-4 w-4" />
                              )}
                            </div>
                          </Button>
                          <Accordion
                            title=""
                            expanded={isExpanded}
                            className="border-0 bg-transparent [&_[data-slot=accordion-content]]:px-0 [&_[data-slot=accordion-header]]:hidden"
                          >
                            <div className="items-between flex flex-col gap-1">
                              {item.assets.map((asset, assetIndex) => {
                                return (
                                  <div
                                    key={assetIndex}
                                    className="flex flex-row items-center justify-between rounded-lg border border-red-400 bg-red-50 p-2"
                                  >
                                    <Typography variant="caption-small">
                                      {asset}
                                    </Typography>
                                    <Tag
                                      type="monochrome"
                                      className="bg-white"
                                      size="lg"
                                    >
                                      <Typography
                                        variant="caption-pixie-semibold"
                                        className="text-primary"
                                      >
                                        Rusak
                                      </Typography>
                                    </Tag>
                                  </div>
                                );
                              })}
                            </div>
                          </Accordion>
                        </div>

                        <div className="w-full">
                          <Button
                            variant="primary"
                            className="h-7 w-full"
                            size="lg"
                            onClick={() => lihatDetail(item)}
                          >
                            <Typography
                              variant="body-small"
                              className="text-white"
                            >
                              Lihat Detail Laporan
                            </Typography>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages || 1}
              onPageChange={setCurrentPage}
              variant="simple"
              className="flex flex-row justify-between"
            />

            {selectedReport && (
              <TicketListModal
                open={openDetailModal}
                onOpenChange={setOpenDetailModal}
                reportDetail={selectedReport}
              />
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
