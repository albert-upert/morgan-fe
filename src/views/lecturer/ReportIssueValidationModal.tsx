import { Button } from "uper-ui/button";
import { Typography } from "uper-ui/typography";

export function ReportIssueValidationModal({
  open,
  onOpenChange,
  onBack,
  onConfirm,
  isSubmitting = false,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onBack: () => void;
  onConfirm: () => void;
  isSubmitting?: boolean;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-9999">
      <Button
        type="button"
        variant="secondary"
        className="absolute inset-0 h-auto w-auto cursor-default border-0 bg-black/20 p-0"
        aria-label="Tutup modal"
        onClick={() => onOpenChange(false)}
      />

      <div className="absolute inset-0 flex items-center justify-center px-6">
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="report-issue-validation-title"
          aria-describedby="report-issue-validation-desc"
          className="w-full max-w-[412px] overflow-hidden rounded-xl bg-white shadow-lg"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="border-b border-border bg-muted px-5 py-4">
            <div id="report-issue-validation-title">
              <Typography
                variant="body-medium"
                className="w-full text-center font-semibold"
              >
                Tunggu Sebentar
              </Typography>
            </div>
            <p id="report-issue-validation-desc" className="sr-only">
              Konfirmasi sebelum mengirim laporan kendala aset.
            </p>
          </div>

          <div className="px-5 pt-3">
            <Typography
              variant="body-small"
              className="text-center text-gray-800"
            >
              Apakah anda yakin sudah mengisi semua kendala aset dengan benar?
            </Typography>
          </div>

          <div className="flex items-center gap-3 bg-white px-5 py-4">
            <Button
              variant="secondary"
              className="flex-1"
              disabled={isSubmitting}
              onClick={onBack}
            >
              <Typography
                variant="body-medium"
                className="text-center text-primary"
              >
                Cek Kembali
              </Typography>
            </Button>
            <Button
              variant="primary"
              className="flex-1"
              disabled={isSubmitting}
              onClick={onConfirm}
            >
              <Typography
                variant="body-medium"
                className="text-center text-white"
              >
                {isSubmitting ? "Mengirim..." : "Ya, Laporkan"}
              </Typography>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
