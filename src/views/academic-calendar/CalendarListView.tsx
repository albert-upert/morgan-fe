import { Link } from "@tanstack/react-router";
import { Breadcrumb } from "@/components/breadcrumb";
import { Button } from "@/components/button";
import { SearchIcon } from "@/components/icon";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/table";
import { Tag } from "@/components/tags";
import { Typography } from "@/components/typography";

interface AcademicCalendar {
  id: number;
  academic_period: string;
  semester: string;
  start_date: string;
  end_date: string;
  status?: string;
}

const academicCalendarData: Array<AcademicCalendar> = [
  {
    id: 1,
    academic_period: "2025-1",
    semester: "Ganjil",
    start_date: "02 September 2025, 00:02",
    end_date: "02 Januari 2025, 23:59",
  },
  {
    id: 2,
    academic_period: "2025-1",
    semester: "Pendek",
    start_date: "03 Januari 2026, 00:02",
    end_date: "03 Maret 2026, 23:59",
    status: "Sedang Berlangsung",
  },
  {
    id: 3,
    academic_period: "2025-1",
    semester: "Genap",
    start_date: "04 Maret 2026, 00:02",
    end_date: "04 Juli 2026, 23:59",
  },
];

export function CalendarListView() {
  return (
    <div className="flex flex-col gap-5 pt-5">
      <Breadcrumb
        items={[
          {
            href: "/",
            label: "Beranda",
          },
          {
            label: "Kalender Akademik",
          },
        ]}
      />
      <Typography variant="h6">
        Kalender Akademik - Universitas Pertamina
      </Typography>
      <div className="flex flex-col gap-5 rounded-xl border border-border bg-white p-5">
        <Typography variant="body-medium-bold">
          Tahun Akademik 2025-2026
        </Typography>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Periode Akademik</TableHead>
              <TableHead>Semester</TableHead>
              <TableHead>Tanggal Mulai</TableHead>
              <TableHead>Tanggal Berakhir</TableHead>
              <TableHead>Aksi</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {academicCalendarData.map((calendar) => (
              <TableRow>
                <TableCell>{calendar.academic_period}</TableCell>
                <TableCell>{calendar.semester}</TableCell>
                <TableCell>{calendar.start_date}</TableCell>
                <TableCell>{calendar.end_date}</TableCell>
                <TableCell>
                  <Link
                    to="/academic-calendar/$id"
                    params={{ id: String(calendar.id) }}
                  >
                    <Button size="md" variant="ghost">
                      <SearchIcon />
                      Lihat
                    </Button>
                  </Link>
                </TableCell>
                <TableCell>
                  {calendar.status ? (
                    <Tag color="blue" type="filled" size="md" rounded="pill">
                      Sedang Berlangsung
                    </Tag>
                  ) : (
                    ""
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex justify-end">
          <Link to="/academic-calendar/generate-academic-history">
            <Button variant="primary">Generate Riwayat Akademik</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
