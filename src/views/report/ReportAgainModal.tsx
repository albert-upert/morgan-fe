import { useMemo, useState } from "react";
import { Button } from "uper-ui/button";
import { Typography } from "uper-ui/typography";

export type ReportAgainTag = "Masih Bermasalah" | "Rusak Lagi" | "Lainnya";

export function ReportAgainModal({
  open,
  onOpenChange,
  onSubmit,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (payload: { tags: Array<ReportAgainTag>; note: string }) => void;
}) {
  const tags = useMemo<Array<ReportAgainTag>>(
    () => ["Masih Bermasalah", "Rusak Lagi", "Lainnya"],
    []
  );
  const [selectedTags, setSelectedTags] = useState<Array<ReportAgainTag>>([]);
  const [note, setNote] = useState("");

  const canSubmit = selectedTags.length > 0 || note.trim().length > 0;

  if (!open) return null;

  function Chip({
    label,
    active,
    onClick,
  }: {
    label: ReportAgainTag;
    active: boolean;
    onClick: () => void;
  }) {
    return (
      <Button
        type="button"
        onClick={onClick}
        variant={active ? "primary" : "secondary"}
        className={`rounded-md border px-3 py-1 ${
          active
            ? "border-primary bg-primary text-white"
            : "border-red-200 bg-white text-primary"
        }`}
      >
        <Typography variant="caption-small" className="text-inherit">
          {label}
        </Typography>
      </Button>
    );
  }

  return (
    <div className="fixed inset-0 z-9999">
      <Button
        type="button"
        variant="secondary"
        className="absolute inset-0 h-auto w-auto cursor-default border-0 bg-black/30 p-0"
        aria-label="Tutup modal"
        onClick={() => onOpenChange(false)}
      />

      <div className="absolute inset-0 flex items-center justify-center px-6">
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="report-again-title"
          className="w-full max-w-[412px] overflow-hidden rounded-xl bg-white shadow-lg"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="border-b border-border bg-[#F5F5F5] px-4 py-3">
            <div id="report-again-title">
              <Typography
                variant="body-medium-semibold"
                className="text-center text-gray-900"
              >
                Laporkan Kembali
              </Typography>
            </div>
          </div>

          <div className="space-y-4 px-4 py-4">
            <div className="rounded-xl border border-border px-4 py-3">
              <Typography
                variant="body-medium-semibold"
                className="text-center text-gray-800"
              >
                Jelaskan Masalah
              </Typography>
              <div className="w-full border-b border-border pb-2" />

              <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
                {tags.map((t) => (
                  <Chip
                    key={t}
                    label={t}
                    active={selectedTags.includes(t)}
                    onClick={() =>
                      setSelectedTags((prev) =>
                        prev.includes(t)
                          ? prev.filter((x) => x !== t)
                          : [...prev, t]
                      )
                    }
                  />
                ))}
              </div>

              <div className="mt-3 w-full rounded-lg border border-border">
                <div className="mt-2 rounded-lg border border-gray-200 bg-white px-3 py-1">
                  <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    className="min-h-[92px] w-full resize-none bg-transparent text-sm text-gray-900 outline-none placeholder:text-gray-400"
                    placeholder="Berikan Catatan Feedback"
                    maxLength={100}
                  />
                </div>
              </div>

              <div className="text-right">
                <Typography variant="caption-pixie" className="text-gray-600">
                  {note.length}/100
                </Typography>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button
                type="button"
                variant="secondary"
                className="w-full border border-red-300 bg-white text-primary hover:bg-red-50"
                onClick={() => onOpenChange(false)}
              >
                Batal
              </Button>
              <Button
                type="button"
                variant="primary"
                className="w-full disabled:bg-gray-300 disabled:text-gray-600 disabled:hover:bg-gray-300"
                disabled={!canSubmit}
                onClick={() => {
                  onSubmit?.({ tags: selectedTags, note });
                  onOpenChange(false);
                }}
              >
                Kirim
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
