import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { MailIcon } from "uper-ui/icon";
import { Typography } from "uper-ui/typography";

interface ActionLinkProps {
  title: string;
  description: string;
  icon: ReactNode;
  href?: string;
}

function ActionLink({ title, description, icon, href = "#" }: ActionLinkProps) {
  return (
    <Link to={href} className="block">
      <div className="flex items-center gap-3 rounded-2xl bg-red-400 p-4 text-white">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl">
          {icon}
        </div>
        <div className="flex flex-col">
          <Typography variant="body-large-semibold" className="text-white">
            {title}
          </Typography>
          <Typography variant="caption-small" className="text-white">
            {description}
          </Typography>
        </div>
      </div>
    </Link>
  );
}

export function HousekeepingHomePage() {
  const name = "Agus";

  return (
    <div className="flex flex-col gap-8">
      {/* Greeting */}
      <div className="mt-28">
        <Typography variant="body-medium-semibold" className="text-gray-800">
          Selamat Datang, {name}!
        </Typography>
      </div>

      {/* Buttons */}
      <div className="flex flex-col gap-4">
        <ActionLink
          title="Daftar Ruangan"
          description="Lihat daftar ruangan yang harus di cek"
          icon={<MailIcon className="h-10 w-10" color="white" />}
          href="/housekeeping/checklist-dashboard"
        />
        <ActionLink
          title="Daftar Laporan"
          description="Lihat daftar laporan anda"
          icon={<MailIcon className="h-10 w-10" color="white" />}
          href="/housekeeping/report-history"
        />
      </div>
    </div>
  );
}
