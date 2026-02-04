import { Button } from "uper-ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "uper-ui/dialog";
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
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        side="center"
        showCloseButton={false}
        className="w-full p-0 data-[side=center]:w-[calc(100%-48px)] data-[side=center]:max-w-[412px]"
      >
        <DialogHeader className="border-b border-border bg-muted px-5 py-[16px]">
          <DialogTitle textVariant="caption-bold" className="text-center">
            <Typography
              variant="body-medium"
              className="w-full text-center font-semibold"
            >
              Tunggu Sebentar
            </Typography>
          </DialogTitle>
        </DialogHeader>

        <div className="px-5 py-[12px]">
          <Typography
            variant="body-small"
            className="text-center text-gray-800"
          >
            Apakah anda yakin sudah mengisi semua kendala aset dengan benar?
          </Typography>
        </div>

        <DialogFooter className="flex items-center gap-3 rounded-b-xl bg-white px-5 py-4">
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
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
