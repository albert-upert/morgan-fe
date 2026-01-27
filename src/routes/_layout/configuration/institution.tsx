import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/configuration/institution")({
  component: Institution,
});

function Institution() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-[#262626]">Institusi</h1>
      </div>
      <div className="rounded-lg border border-[#d9d9d9] bg-white p-6">
        <p className="text-[#262626]">
          Halaman konfigurasi institusi akan ditampilkan di sini.
        </p>
      </div>
    </div>
  );
}
