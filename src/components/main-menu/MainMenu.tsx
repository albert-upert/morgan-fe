import { Link } from "@tanstack/react-router";
import { Button } from "uper-ui/button";
import { MailIcon } from "uper-ui/icon";
import { Typography } from "uper-ui/typography";

export interface MainMenuProps {
  onReportListClick?: () => void;
}

export function MainMenu({ onReportListClick }: MainMenuProps) {
  return (
    <div className="mt-4 flex flex-col gap-4">
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
            asChild
            className="w-full rounded-xl bg-white text-red-400 hover:bg-white/90"
            variant="primary"
          >
            <Link to="/lecturer/scan">
              <span className="flex items-center justify-center gap-2">
                <Typography variant="body-medium" className="text-red-400">
                  Pindai Kode QR
                </Typography>
              </span>
            </Link>
          </Button>
        </div>
      </div>

      <a
        href="#"
        className="block"
        onClick={(e) => {
          e.preventDefault();
          onReportListClick?.();
        }}
      >
        <div className="flex items-center gap-3 rounded-2xl bg-red-400 p-4 text-white">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl">
            <MailIcon className="h-10 w-10" color="white" />
          </div>
          <div className="flex flex-col">
            <Typography variant="body-medium-semibold" className="text-white">
              Daftar Laporan
            </Typography>
            <Typography variant="caption-small" className="text-white">
              Lihat daftar laporan anda
            </Typography>
          </div>
        </div>
      </a>
    </div>
  );
}
