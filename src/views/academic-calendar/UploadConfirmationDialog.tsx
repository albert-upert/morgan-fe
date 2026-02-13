import { Button } from "uper-ui/button";
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "uper-ui/dialog";
import { InfoIcon } from "uper-ui/icon";

interface UploadConfirmationDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function UploadConfirmationDialog({
  open,
  setOpen,
}: UploadConfirmationDialogProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent side="center" showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Tunggu Sebentar</DialogTitle>
          <InfoIcon className="absolute right-5 size-8 text-muted-foreground" />
        </DialogHeader>
        <DialogBody>
          <DialogDescription>
            Apakah Anda yakin untuk mengunggah Event Kalender Akademik dari
            (csv/xlsx)?
          </DialogDescription>
          <DialogFooter className="w-full">
            <Button
              variant="outline"
              size="lg"
              className="w-full border-destructive text-destructive hover:bg-destructive/10"
              onClick={() => setOpen(false)}
            >
              Tidak
            </Button>
            <Button variant="primary" size="lg" className="w-full">
              Ya, Simpan
            </Button>
          </DialogFooter>
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
}
