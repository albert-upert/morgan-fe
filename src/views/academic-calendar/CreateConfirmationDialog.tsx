import { Button } from "@/components/button";
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/dialog";
import { InfoIcon } from "@/components/icon";

interface CreateConfirmationDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onSave: () => void;
}

export function CreateConfirmationDialog({
  open,
  setOpen,
}: CreateConfirmationDialogProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent side="center" showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Tunggu Sebentar</DialogTitle>
          <InfoIcon className="absolute right-5 size-8 text-muted-foreground" />
        </DialogHeader>
        <DialogBody>
          <DialogDescription>
            Apakah anda yakin informasi anda sudah benar?
          </DialogDescription>
          <DialogFooter>
            <Button
              variant="outline"
              size="lg"
              className="w-full border-destructive text-destructive hover:bg-destructive/10"
              onClick={() => setOpen(false)}
            >
              Cek Kembali
            </Button>
            <Button variant="primary" size="lg" className="w-full">
              Ya, Simpan Sekarang
            </Button>
          </DialogFooter>
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
}
