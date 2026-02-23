import { Button } from "uper-ui/button";
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "uper-ui/dialog";
import { TickCircleIcon } from "uper-ui/icon";

interface SuccessGenerateDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function SuccessGenerateDialog({
  open,
  setOpen,
}: SuccessGenerateDialogProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent side="center" showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Selesai</DialogTitle>
          <TickCircleIcon className="h-5 w-5 text-green-500" />
        </DialogHeader>
        <DialogBody>
          <DialogDescription>
            Proses Generate Riwayat Akademik telah berhasil untuk 200 mahasiswa.
            Data mahasiswa tersebut dapat diunduh melalui OneDrive.
          </DialogDescription>
          <DialogFooter>
            <DialogClose>
              <Button variant="primary">Oke</Button>
            </DialogClose>
          </DialogFooter>
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
}
