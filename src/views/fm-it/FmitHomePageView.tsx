import { Link } from "@tanstack/react-router";
import { AttendanceIcon, BillIcon, NotificationIcon } from "uper-ui/icon";
import { Typography } from "uper-ui/typography";

export function FmitHomePageView() {
  const name = "Budi";

  return (
    <div className="">
      {/* Greeting */}
      <div className="mb-32px] mt-[90px]">
        <Typography variant="body-medium" className="text-gray-800">
          Selamat Datang, {name}!
        </Typography>
      </div>

      {/* Primary actions */}
      <div className="mt-16 flex flex-col gap-4">
        <Link to="/fm-it/ticket-list">
          <div className="flex items-center gap-3 rounded-2xl bg-primary px-6 py-4 text-white">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl">
              <NotificationIcon className="h-12 w-12" color="white" />
            </div>
            <div className="flex flex-col">
              <Typography variant="body-medium-bold" className="text-white">
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
          <div className="flex items-center gap-3 rounded-2xl bg-primary px-6 py-4 text-white">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl">
              <BillIcon className="h-12 w-12" color="white" />
            </div>
            <div className="flex flex-col">
              <Typography variant="body-medium-bold" className="text-white">
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
          <div className="flex items-center gap-3 rounded-2xl bg-primary px-6 py-4 text-white">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl">
              <AttendanceIcon className="h-12 w-12" color="white" />
            </div>
            <div className="flex flex-col">
              <Typography variant="body-medium-bold" className="text-white">
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
