import { useMemo, useState } from "react";
import { Button } from "uper-ui/button";
import { Typography } from "uper-ui/typography";

type FeedbackTag = "Cepat" | "Baik Sekali" | "Lainnya";

function StarIcon({
  filled,
  className,
}: {
  filled: boolean;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className ?? "h-6 w-6"}
      aria-hidden="true"
    >
      <path
        d="M12 17.27l-5.18 3.05 1.4-5.96L3.5 9.97l6.18-.53L12 3.8l2.32 5.64 6.18.53-4.72 4.39 1.4 5.96z"
        fill={filled ? "#F59E0B" : "none"}
        stroke="#F59E0B"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Chip({
  label,
  active,
  onClick,
}: {
  label: FeedbackTag;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-md border px-3 py-1 ${
        active
          ? "border-primary bg-primary text-white"
          : "border-red-200 bg-white text-primary"
      }`}
    >
      <Typography variant="caption-small" className="text-inherit">
        {label}
      </Typography>
    </button>
  );
}

export function ConfirmCompletionModal({
  open,
  onOpenChange,
  onSubmit,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (payload: {
    rating: number;
    tags: Array<FeedbackTag>;
    note: string;
  }) => void;
}) {
  const tags = useMemo<Array<FeedbackTag>>(
    () => ["Cepat", "Baik Sekali", "Lainnya"],
    []
  );

  const [rating, setRating] = useState<number>(0);
  const [selectedTags, setSelectedTags] = useState<Array<FeedbackTag>>([]);
  const [note, setNote] = useState("");

  const canSubmit = rating > 0;

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-9999">
      <button
        type="button"
        className="absolute inset-0 cursor-default bg-black/30"
        aria-label="Tutup modal"
        onClick={() => onOpenChange(false)}
      />

      <div className="absolute inset-0 flex items-center justify-center px-6">
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="confirm-completion-title"
          className="w-full max-w-[412px] overflow-hidden rounded-xl bg-white shadow-lg"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="border-b border-border bg-[#F5F5F5] px-4 py-3">
            <div id="confirm-completion-title">
              <Typography
                variant="body-medium-semibold"
                className="text-center text-gray-900"
              >
                Konfirmasi Penyelesaian Laporan
              </Typography>
            </div>
          </div>

          <div className="space-y-4 px-4 py-4">
            <div className="flex flex-col justify-center rounded-xl border border-border px-4 py-3">
              <Typography
                variant="body-medium-semibold"
                className="text-center text-gray-800"
              >
                Berikan Rating Kepuasan
              </Typography>
              <div className="w-full border-b border-border pb-2"></div>

              <div className="mt-3 flex items-center justify-center gap-3">
                {Array.from({ length: 5 }).map((_, i) => {
                  const v = i + 1;
                  const filled = v <= rating;
                  return (
                    <button
                      key={v}
                      type="button"
                      className="flex flex-col items-center gap-1"
                      onClick={() => setRating(v)}
                      aria-label={`Rating ${v}`}
                    >
                      <StarIcon filled={filled} className="h-6 w-6" />
                      <Typography
                        variant="caption-small"
                        className="text-gray-800"
                      >
                        {v}
                      </Typography>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="rounded-xl border border-border px-4 py-3">
              <Typography
                variant="body-medium-semibold"
                className="text-center text-gray-800"
              >
                Feedback Anda
              </Typography>
              <div className="w-full border-b border-border pb-2"></div>
              <div className="mt-3 flex items-center justify-center gap-2">
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
                  onSubmit?.({ rating, tags: selectedTags, note });
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
