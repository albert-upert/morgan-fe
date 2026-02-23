import { Dialog, DialogContent } from "uper-ui/dialog";
import { Loading } from "uper-ui/loading";

interface LoadingDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function LoadingGenerateDialog({ open, setOpen }: LoadingDialogProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent side="center" showCloseButton={false}>
        <div className="flex justify-center py-10">
          <Loading indeterminate text="loading..." />
        </div>
      </DialogContent>
    </Dialog>
  );
}
