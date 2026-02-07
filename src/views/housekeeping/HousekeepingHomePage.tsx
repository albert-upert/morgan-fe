import { Link } from "@tanstack/react-router";
import { DashboardIcon, MailIcon } from "uper-ui/icon";
import { Typography } from "uper-ui/typography";

interface ActionLinkProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href?: string;
}

function ActionLink({ title, description, icon, href = "#" }: ActionLinkProps) {
  return (
    <Link to={href} className="block">
      <div className="flex items-center gap-3 rounded-2xl bg-primary p-4 text-white">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl">
          {icon}
        </div>
        <div className="flex flex-col">
          <Typography variant="body-medium-bold" className="text-white">
            {title}
          </Typography>
          <Typography variant="caption" className="text-white">
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
    <div className="">
      {/* Greeting */}
      <div className="mt-[90px] mb-[32px]">
        <Typography variant="body-medium" className="text-gray-800">
          Selamat Datang, {name}!
        </Typography>
      </div>

      {/* Buttons */}
      <div className="flex flex-col gap-4">
        <ActionLink
          title="Lihat Daftar Ruangan"
          description="Daftar ruangan yang harus di cek"
          icon={<DashboardIcon className="h-10 w-10" color="white" />}
        />
        <ActionLink
          title="Daftar Laporan"
          description="Lihat daftar laporan anda"
          icon={<MailIcon className="h-10 w-10" color="white" />}
        />
      </div>
    </div>
  );
}
