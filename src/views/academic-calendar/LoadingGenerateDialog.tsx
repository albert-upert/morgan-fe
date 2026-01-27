import { Dialog, DialogContent } from "@/components/dialog";
import { Loading } from "@/components/loading";

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
