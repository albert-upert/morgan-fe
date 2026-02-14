import { useNavigate } from "@tanstack/react-router";
import React, { useCallback, useEffect, useState } from "react";
import { Accordion } from "uper-ui/accordion";
import { Button } from "uper-ui/button";
import { Card, CardContent } from "uper-ui/card";
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
// import { Loading } from "uper-ui/loading";
import { Pagination } from "uper-ui/pagination";
import { Tag } from "uper-ui/tags";
import { Typography } from "uper-ui/typography";
import { getAllReports } from "@/services/api/reportService";
import type { Report } from "@/types/report";
import { TicketListModal } from "./TicketListPageModal";

export type Building = {
  name: string;
  floors: Array<string>;
}

export function TicketListView() {
  const [reports, setReports] = useState<Array<Report> >([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState<string | null>(null);

  const [openDetailModal, setOpenDetailModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const fetchAll = async () => {
      const data = await getAllReports();
      setReports(data);

      // try {
      //   setLoading(true);
      //   const data = await getAllReports();
      //   setReports(data);
      // } catch (_err) {
      //   setError("Gagal memuat daftar tiket");
      // } finally {
      //   setLoading(false);
      // }
    };

    fetchAll();
  }, []);

  const navigate = useNavigate();
  const home = useCallback(() => {
    navigate({
      to: "/fm-it/home",
    });
  }, []);

  const toggleAccordion = useCallback((id: string) => {
    setExpandedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  }, []);


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

  // if (loading)
  //   return (
  //     <div className="flex min-h-[80vh] w-full items-center justify-center">
  //       <Loading indeterminate text="Sedang mengambil laporan..." />
  //     </div>
  //   );
  // if (error) return <div className="text-center text-red-500">{error}</div>;

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

      <div className="">
        <Typography variant="h4-semibold">Daftar Tiket Masuk</Typography>
      </div>

      {/* Staff Data */}
      <Card className="bg-gray-100" elevation="none">
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="flex flex-row items-center">
              <div className="flex flex-row items center gap-3">
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <ProfileIcon className="h-6 w-6"/>
                </div>

                <div className="flex flex-col">
                    <Typography variant="body-medium-semibold">
                      {name}
                    </Typography>

                  <div className="flex flex-row justify-start items-center">
                    <div className="flex items-center justify-center h-full w-3">
                      <StarIcon className="h-3 w-3"/>
                    </div>

                    <div className="flex items-center h-full">
                      <Typography variant="caption-pixie" className="text-gray-600">
                        {rating} ({taskDone} Tugas Selesai)
                      </Typography>
                    </div>
                  </div>
                </div>
              </div>

              <div className="ml-auto mb-auto">
                <Tag type="monochrome" color="red" size="md" rounded="pill" className="bg-red-50 px-3">
                  <Typography variant="caption-small" className="text-red-600">
                    {role}
                  </Typography>
                </Tag>
              </div>
            </div>

            <div className="flex flex-col items-center gap-2">
              <div className="flex flex-row items-center justify-start gap-2 w-full bg-gray-200 p-2">
                <div className="h-8 w-8 bg-gray-300 flex items-center justify-center rounded-lg">
                  <ClockIcon className="h-6 w-6"/>
                </div>

                <div className="flex flex-col">
                    <Typography variant="body-small-semibold" className="text-gray-600">
                      Shift: {sesi}
                    </Typography>

                    <Typography variant="caption-small" className="text-gray-600">
                      {shift}
                    </Typography>
                </div>
              </div>

              <div className="flex flex-row w-full items-center">
                <div className="flex h-8 w-8 items-center justify-center">
                  <BuildingIcon className="h-6 w-6"/>
                </div>

                <div className="flex items-center">
                  <Typography variant="body-small-semibold">
                    Area Tanggung Jawab
                  </Typography>
                </div>
              </div>

              <div className="flex flex-col items-center w-full gap-2">
                {area.map((item, index) => (
                  <div key={index} className="flex flex-row items-center justify-between w-full p-2 bg-gray-200 rounded-lg border border-gray-400">
                    <div>
                      <Typography variant="caption-small">
                        {item.name}
                      </Typography>
                    </div>
                    
                    <div className="flex items-center gap-1">
                      {item.floors.map((floor, indexf) => (
                        <div key={indexf} className="flex items-center justify-center bg-gray-300 p-1">
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
      <Card className="bg-gray-100" elevation="none">
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4">
              <div className="flex items-center">
                <Typography variant="h5">
                  Daftar Laporan
                </Typography>
              </div>

              <div className="flex flex-row justify-between items-center gap-2">
                <div className="flex items-center w-[284px]">
                  <Input size="lg" placeholder="Cari laporan..." startIcon={<SearchIcon className="size-5 text-muted-foreground" />}/> 
                </div>

                <div className="flex items-center justify-center h-10 w-10 rounded-lg border border-primary">
                  <FilterIcon className="h-5 w-5"color="red"/>
                </div>
              </div>

              <div className="flex items-center">
                <div className="flex flex-col items-center justify-center h-5 w-3">
                  <CaretUpIcon className="h-3 w-3"/>
                  <CaretDownIcon className="h-3 w-3"/>
                </div>

                <div className="flex items-center">
                  <Typography variant="caption-small">
                    ({reports.length}) Laporan ditemukan
                  </Typography>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              {reports.map((item, index) => {
                const isExpanded = expandedItems[item.id] || false;
                return (
                  <Card key={index} className="bg-gray-100" elevation="none">
                    <CardContent>
                      <div className="flex flex-col items-center gap-2">
                        <div className="flex flex-row items-center justify-between w-full">
                          <div className="flex items-center">
                            <Typography variant="body-small-semibold" className="text-gray-600">
                              {item.id}
                            </Typography>
                          </div>

                          <div className="flex items-center">
                            <Tag color="red" type="filled" size="md" rounded="pill">
                              <Typography variant="caption-small" className="text-white">
                                {item.status}
                              </Typography>
                            </Tag>
                          </div>
                        </div>

                        <div className="flex flex-col items-between justify-between gap-2 w-full">
                          <div className="flex flex-row items-center justify-between gap-2 w-full">
                            <div className="flex flex-row items-center gap-1 w-full bg-gray-300 rounded-lg p-2">
                              <ClockIcon className="h-5 w-5"/>
                              <Typography variant="caption-pixie-semibold">
                                {item.time}
                              </Typography>
                            </div>

                            <div className="flex flex-row items-center gap-1 w-full bg-gray-300 rounded-lg p-2">
                              <ScheduleIcon className="h-5 w-5"/>
                              <Typography variant="caption-pixie-semibold">
                                {item.date}
                              </Typography>
                            </div>
                          </div>

                          <div className="flex flex-row items-center gap-2 w-full overflow-hidden min-w-0">
                            <div className="flex flex-row items-center gap-1 w-full bg-gray-300 rounded-lg p-2 overflow-x-auto">
                              <div className="h-5 w-5 items-center justify-center">
                                <BuildingIcon className="h-5 w-5"/>
                              </div>

                              <div className="flex items-center w-full">
                                <Typography variant="caption-pixie-semibold" className="text-nowrap">
                                  {item.building} - {item.room}
                                </Typography>
                              </div>
                            </div>

                            <div className="flex flex-row items-center gap-1 w-full bg-gray-300 rounded-lg p-2 overflow-x-auto">
                              <div className="h-5 w-5 items-center justify-center">
                                <ProfileIcon className="h-5 w-5"/>
                              </div>

                              <div className="flex items-center w-full">
                                <Typography variant="caption-pixie-semibold" className="text-nowrap">
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
                            className="w-full flex flex-row items-center justify-between p-0"
                            onClick={() =>  toggleAccordion(item.id)}
                          >
                            <Typography variant="caption-small-semibold">({item.assets.length}) Aset Bermasalah:</Typography>
                            <div className="h-7 w-7 bg-gray-300 rounded-full flex justify-center items-center">
                              {isExpanded ? 
                                <CaretUpIcon className="h-4 w-4"/> 
                                : <CaretDownIcon className="h-4 w-4"/>
                              }
                            </div>
                          </Button>
                          <Accordion 
                            title="" 
                            expanded={isExpanded} 
                            className="border-0 bg-transparent [&_[data-slot=accordion-content]]:px-0 [&_[data-slot=accordion-header]]:hidden"
                          >
                            <div className="flex flex-col items-between gap-1">
                              {item.assets.map((asset, assetIndex) => {
                                return(
                                  <div key={assetIndex} className="p-2 flex flex-row justify-between items-center border border-red-400 bg-red-50 rounded-lg">
                                    <Typography variant="caption-small">{asset}</Typography>
                                    <Tag type="monochrome" className="bg-white" size="lg">
                                      <Typography variant="caption-pixie-semibold" className="text-primary">
                                        Rusak
                                      </Typography>
                                    </Tag>
                                  </div>
                                )
                              })}
                            </div>
                          </Accordion>
                        </div>

                        <div className="w-full">
                          <Button
                            variant="primary"
                            className="w-full h-7"
                            size="lg"
                            onClick={() => {
                              setOpenDetailModal(true);
                              setSelectedReport(item);
                            }}
                          >
                            <Typography variant="body-small" className="text-white">Lihat Detail Laporan</Typography>
                          </Button>

                        {selectedReport && (
                          <TicketListModal
                            open={openDetailModal}
                            onOpenChange={setOpenDetailModal}
                            reportDetail={selectedReport}
                          />
                        )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
              <Pagination currentPage={1} totalPages={2} onPageChange={number => {}}></Pagination>
            <div>

            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
