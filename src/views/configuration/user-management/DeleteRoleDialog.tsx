import { Button } from "@/components/button";
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/dialog";

interface UserRole {
  id: number;
  role: string;
  institution: string;
  createdAt: string;
}

interface DeleteRoleDialogProps {
  open: boolean;
  userRole: UserRole;
  setOpen: (open: boolean) => void;
}

export function DeleteRoleDialog({
  open,
  userRole: _userRole,
  setOpen,
}: DeleteRoleDialogProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent side="center" showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Hapus Peran Pengguna</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <DialogDescription>
            Apakah Anda yakin ingin menghapus peran ini?
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
                // TODO: panggil API delete di sini dengan id: {id}
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
