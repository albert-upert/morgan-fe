import { Link, useNavigate } from "@tanstack/react-router";
import { useCallback } from "react";
import { Button, Card, CardContent, Tag, Typography } from "uper-ui";
import { ArrowBackIcon, BuildingIcon } from "uper-ui/icon";

const data_report = [
  {
    id: "1",
    room: "2402",
    building: "Griya Legita",
    status: "issue",
  },
  {
    id: "2",
    room: "2402",
    building: "Griya Legita",
    status: "issue",
  },
];

export function ReportHistoryPage() {
  const navigate = useNavigate();
  const toHomePage = useCallback(() => {
    navigate({
      to: "/lecturer/home",
    });
  }, [navigate]);

  return (
    <div className="flex flex-col gap-6 pb-6">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <Button variant="tertiary" onClick={toHomePage} className="w-fit">
          <ArrowBackIcon className="size-5" color="currentColor" />
          Daftar Ruangan
        </Button>

        <Typography variant="h4-semibold" className="text-gray-800">
          Daftar Laporan
        </Typography>
      </div>

      {/* Reports List */}
      <div className="flex flex-col gap-3">
        {data_report.filter((report) => report.status === "issue").length >
        0 ? (
          data_report
            .filter((report) => report.status === "issue")
            .map((report) => (
              <Link
                key={report.id}
                to="/housekeeping/checklist-report/$id"
                params={{ id: report.room }}
                className="block"
              >
                <Card className="rounded-xl border border-yellow-500 bg-yellow-50 p-4 transition-all">
                  <CardContent className="flex items-center justify-between gap-3 p-0">
                    <div className="flex items-center gap-3">
                      <BuildingIcon className="h-6 w-6 text-gray-800" />
                      <Typography
                        variant="body-small-semibold"
                        className="text-gray-800"
                      >
                        {report.room} - {report.building}
                      </Typography>
                    </div>
                    <Tag
                      color="yellow"
                      type="monochrome"
                      rounded="pill"
                      className="bg-yellow-400 px-3 py-1"
                    >
                      <Typography
                        variant="caption-small"
                        className="text-gray-800"
                      >
                        Ada Masalah
                      </Typography>
                    </Tag>
                  </CardContent>
                </Card>
              </Link>
            ))
        ) : (
          <Card className="border-0 p-6">
            <CardContent className="flex flex-col items-center justify-center gap-3 p-0">
              <Typography variant="body-medium" className="text-gray-600">
                Belum ada laporan
              </Typography>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
