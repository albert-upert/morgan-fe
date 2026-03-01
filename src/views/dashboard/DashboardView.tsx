import { Typography } from "uper-ui";
import { Button } from "uper-ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "uper-ui/card";
import { Link } from "uper-ui/link";

export function DashboardView() {
  return (
    <div className="min-h-screen bg-[#F7F7FB]">
      {/* Content */}
      <main className="mx-auto w-full max-w-5xl space-y-4 px-4 py-6">
        <Card elevation="low">
          <CardHeader>
            <CardTitle>Dashboard</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <Typography variant="body-medium" className="text-gray-700">
              Ini layout dashboard baru untuk MORGAN. Konten dashboard bisa kamu
              isi sesuai kebutuhan (laporan terbaru, status, dsb).
            </Typography>

            <div className="flex flex-wrap gap-3">
              <Button asChild variant="primary">
                <Link to="/$module/home" params={{ module: "lecturer" }}>
                  Buka Dosen Home
                </Link>
              </Button>
              <Button asChild variant="secondary">
                <Link to="/login">Login</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
