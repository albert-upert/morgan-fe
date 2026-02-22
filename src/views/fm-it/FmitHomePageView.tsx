import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AttendanceIcon, BillIcon, NotificationIcon } from "uper-ui/icon";
import { Typography } from "uper-ui/typography";
import { getAllReports } from "@/services/api/reportService";

export function FmitHomePageView() {
  const name = "Agus";
  const [activeTicketId, setActiveTicketId] = useState<string | number | null>(null);

  useEffect(() => {
    const checkActiveTicket = async () => {
      try {
        const data = await getAllReports();
        const activeReport = data.find(
          (r) =>
            r.status === "Petugas dalam Perjalanan" || r.status === "Sedang Dikerjakan"
        );
        setActiveTicketId(activeReport ? activeReport.id : null);
      } catch (error) {
        console.error("Error fetching reports:", error);
      }
    };
    checkActiveTicket();
  }, []);

  return (
    <div className="flex flex-col gap-8">
      {/* Greeting */}
      <div className="">
        <Typography variant="body-medium" className="text-gray-800">
          Selamat Datang, {name}!
        </Typography>
      </div>

      {/* Primary actions */}
      <div className="flex flex-col gap-4">
        <Link to="/fm-it/ticket-list" search={{ filter: "available" }}>
          <div className="flex items-center gap-3 rounded-2xl bg-primary px-5 py-4 text-white">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl">
              <NotificationIcon className="h-12 w-12" color="white" />
            </div>
            <div className="flex flex-col">
              <Typography variant="body-large-semibold" className="text-white">
                Lihat dan Ambil Tiket
              </Typography>
              <Typography variant="caption-small" className="text-white">
                Lihat daftar laporan tiket
              </Typography>
            </div>
          </div>
        </Link>

        {activeTicketId !== null ? (
          <Link to="/fm-it/ticket-detail/$id" params={{ id: String(activeTicketId) }}>
            <div className="flex items-center gap-3 rounded-2xl bg-primary px-5 py-4 text-white">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl">
                <BillIcon className="h-12 w-12" color="white" />
              </div>
              <div className="flex flex-col">
                <Typography variant="body-large-bold" className="text-white">
                  Tiket Anda
                </Typography>
                <Typography variant="caption-small" className="text-white">
                  Lihat detail status tiket yang anda kerjakan
                </Typography>
              </div>
            </div>
          </Link>
        ) : (
          <div className="flex items-center gap-3 rounded-2xl bg-gray-200 px-5 py-4 text-gray-400 cursor-not-allowed">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl">
              <BillIcon className="h-12 w-12" color="gray" />
            </div>
            <div className="flex flex-col">
              <Typography variant="body-large-semibold" className="text-gray-600">
                Tiket Anda
              </Typography>
              <Typography variant="caption-small" className="text-gray-400">
                Silahkan ambil tiket anda terlebih dahulu!
              </Typography>
            </div>
          </div>
        )}

        <Link to="/fm-it/ticket-list" search={{ filter: "history" }}>
          <div className="flex items-center gap-3 rounded-2xl bg-primary px-5 py-4 text-white">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl">
              <AttendanceIcon className="h-12 w-12" color="white" />
            </div>
            <div className="flex flex-col">
              <Typography variant="body-large-bold" className="text-white">
                Riwayat Tiket Anda
              </Typography>
              <Typography variant="caption-small" className="text-white">
                Daftar laporan yang pernah anda kerjakan
              </Typography>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
