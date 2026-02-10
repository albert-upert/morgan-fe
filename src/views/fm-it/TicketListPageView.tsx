import { useNavigate } from "@tanstack/react-router";
import React, { useCallback, useEffect, useState } from "react";
import { Button } from "uper-ui/button";
import { Card, CardContent } from "uper-ui/card";
import {
  ArrowLeftIcon,
  BuildingIcon,
  CautionIcon,
  ClockIcon,
  RegistrationIcon,
  SyncIcon,
} from "uper-ui/icon";
import { Loading } from "uper-ui/loading";
import { Tag } from "uper-ui/tags";
import { Typography } from "uper-ui/typography";
import { getAllReports } from "@/services/api/reportService";
import type { Report } from "@/types/report";
import { TicketDetailModal } from "./TicketListPageModal";

export function TicketListView() {
  const [reports, setReports] = useState<Array<Report>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [openDetailModal, setOpenDetailModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        setLoading(true);
        const data = await getAllReports();
        setReports(data);
      } catch (_err) {
        setError("Gagal memuat daftar tiket");
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  const navigate = useNavigate();
  const home = useCallback(() => {
    navigate({
      to: "/fm-it/home",
    });
  }, []);

  const name = "Budi Santoso";
  const shift = "08.00 - 14.00 WIB";
  const area = "Griya Legita, Rektorat";

  if (loading)
    return <Loading indeterminate text="Sedang mengambil laporan..." />;
  if (error) return <div className="text-center text-red-500">{error}</div>;

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

      {/* Ticket List */}
      <div>
        <div className="mb-6">
          <Typography variant="body-large-bold">Daftar Tiket Masuk</Typography>
        </div>

        <div>
          <Card className="bg-gray-100" elevation="none">
            <CardContent>
              <div className="flex flex-col gap-2">
                <div className="flex flex-row items-center gap-3">
                  <RegistrationIcon className="h-6 w-6" color="red" />
                  <Typography variant="caption-small-bold">FM/IT:</Typography> {name}
                </div>

                <div className="flex flex-row items-center gap-3">
                  <ClockIcon className="h-6 w-6" color="red" />
                  <Typography variant="caption-small-bold">Shift:</Typography> {shift}
                </div>

                <div className="flex flex-row items-center gap-3">
                  <BuildingIcon className="h-6 w-6" color="red" />
                  <Typography variant="caption-small-bold">
                    Area Kerja:
                  </Typography>{" "}
                  {area}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Report List */}
      <div>
        <div className="mb-6">
          <Typography variant="body-medium-bold">Daftar Laporan</Typography>
        </div>

        {reports.length === 0 ? (
          <p className="text-center text-gray-500">Belum ada laporan.</p>
        ) : (
          reports.map((report: Report) => (
            <Card key={report.id} className="mt-4 bg-gray-100" elevation="none">
              <CardContent className="flex flex-col gap-3">
                {/* Report ID */}
                <div>
                  <Typography
                    className="text-primary"
                    variant="body-medium-bold"
                  >
                    {report.id}
                  </Typography>
                </div>

                {/* Report Detail */}
                <div className="flex flex-col gap-2">
                  <div className="flex flex-row items-center gap-3">
                    <SyncIcon className="h-6 w-6" />
                    <Tag color="red" type="filled" size="md" rounded="pill">
                      {report.status}
                    </Tag>
                  </div>
                  <div className="flex flex-row items-center gap-3">
                    <CautionIcon className="h-6 w-6" />
                    <Typography variant="caption-small-bold">
                      {report.assets.join(", ")}
                    </Typography>
                  </div>
                  <div className="flex flex-row items-center gap-3">
                    <BuildingIcon className="h-6 w-6" />
                    <Typography variant="caption-small-bold">
                      {report.room} - {report.building}
                    </Typography>
                  </div>
                  <div className="flex flex-row items-center gap-3">
                    <ClockIcon className="h-6 w-6" />
                    <Typography variant="caption-small-bold">
                      {report.date} | {report.time}
                    </Typography>
                  </div>
                </div>

                {/* See Detail Button */}
                <div className="">
                  <Button
                    onClick={() => {
                      setSelectedReport(report);
                      setOpenDetailModal(true);
                    }}
                    variant="primary"
                    className="w-full"
                    size="md"
                  >
                    Lihat Detail Laporan
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {selectedReport && (
        <TicketDetailModal
          open={openDetailModal}
          onOpenChange={setOpenDetailModal}
          reportDetail={selectedReport}
        />
      )}
    </div>
  );
}
