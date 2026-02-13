import { Link } from "@tanstack/react-router";
import { AttendanceIcon, BillIcon, NotificationIcon } from "uper-ui/icon";
import { Typography } from "uper-ui/typography";

export function FmitHomePageView() {
  const name = "Agus";

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
        <Link to="/fm-it/ticket-list">
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

        <a
          href="#"
          className="block"
          onClick={(e) => {
            e.preventDefault();
          }}
        >
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
        </a>

        <a
          href="#"
          className="block"
          onClick={(e) => {
            e.preventDefault();
          }}
        >
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
        </a>
      </div>
    </div>
  );
}
