import { Card, CardContent, Tag, Typography } from "uper-ui";
import { ArrowLeftIcon, BuildingIcon } from "uper-ui/icon";
import { Link } from "uper-ui/link";

const REPORTS = [
  {
    id: "rep-1",
    room: "2402",
    building: "Griya Legita",
  },
  {
    id: "rep-2",
    room: "2402",
    building: "Griya Legita",
  },
];

export function ReportHistoryPage() {
  const reports = REPORTS;

  return (
    <div className="flex flex-col gap-6 pb-6">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <Link
          to="/housekeeping/home"
          className="inline-flex items-center gap-2 text-red-500"
          aria-label="Kembali ke Beranda"
        >
          <ArrowLeftIcon className="h-5 w-5" color="currentColor" />
          <Typography variant="body-small" className="text-red-500">
            Beranda
          </Typography>
        </Link>

        <Typography variant="h4-semibold" className="text-gray-800">
          Daftar Laporan
        </Typography>
      </div>

      {/* Reports List */}
      <div className="flex flex-col gap-3">
        {reports.length > 0 ? (
          reports.map((report) => (
            <Link
              key={report.id}
              to={`/housekeeping/checklist-report/${report.room}?status=issue`}
              className="block"
            >
              <Card
                className="rounded-xl border border-yellow-500 bg-yellow-50 p-4 transition-all"
                elevation="none"
              >
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
          <Card className="border-0 p-6" elevation="none">
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
