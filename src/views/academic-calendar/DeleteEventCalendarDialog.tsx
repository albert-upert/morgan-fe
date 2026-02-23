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

interface DeleteEventDialogProps {
  open: boolean;
  eventId: number | null;
  setOpen: (open: boolean) => void;
}

export function DeleteEventCalendarDialog({
  open,
  eventId: _eventId,
  setOpen,
}: DeleteEventDialogProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent side="center" showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Hapus Event Kalendar Akademik</DialogTitle>
          <DialogClose>
            <TrashIcon className="h-8 w-8 text-gray-800" />
          </DialogClose>
        </DialogHeader>
        <DialogBody>
          <DialogDescription>
            Apakah Anda yakin ingin menghapus event kalendar akademik ini?
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
                console.warn("Hapus");
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
