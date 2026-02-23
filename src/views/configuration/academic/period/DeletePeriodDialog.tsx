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
import { TrashIcon } from "uper-ui/icon";

interface DeletePeriodDialogProps {
  open: boolean;
  periodId: number;
  setOpen: (open: boolean) => void;
}

export function DeletePeriodDialog({
  open,
  periodId: _periodId,
  setOpen,
}: DeletePeriodDialogProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent side="center" showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Hapus Periode Akademik</DialogTitle>
          <DialogClose>
            <TrashIcon className="h-8 w-8 text-gray-800" />
          </DialogClose>
        </DialogHeader>
        <DialogBody>
          <DialogDescription>
            Apakah Anda yakin ingin menghapus periode akademik ini?
          </DialogDescription>
          <DialogFooter className="w-full">
            <DialogClose asChild>
              <Button variant="secondary" className="flex-1">
                Batal
              </Button>
            </DialogClose>
            <Button
              variant="primary"
              className="flex-1"
              onClick={() => {
                console.warn("");
              }}
            >
              Hapus
            </Button>
          </DialogFooter>
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
}
