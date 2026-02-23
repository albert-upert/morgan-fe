import { useState } from "react";
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
import { Input } from "uper-ui/input";
import { Typography } from "uper-ui/typography";

interface User {
  id: number;
  nip: string;
  email: string;
  name: string;
  username: string;
  createdAt: string;
  status: string;
}

interface ResetPasswordDialogProps {
  open: boolean;
  user: User;
  setOpen: (open: boolean) => void;
}

export function ResetPasswordDialog({
  open,
  user,
  setOpen,
}: ResetPasswordDialogProps) {
  const [step, setStep] = useState<"form" | "success">("form");

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        setOpen(value);
        if (!value) {
          setStep("form");
        }
      }}
    >
      <DialogContent side="center" showCloseButton={false}>
        {step === "form" ? (
          <>
            <DialogHeader className="border-b border-gray-400 bg-gray-50">
              <DialogTitle>Reset Password Pengguna</DialogTitle>
            </DialogHeader>

            <DialogBody>
              <div className="flex self-start">
                <Typography variant="body-medium-bold">
                  Informasi Detail Pengguna
                </Typography>
              </div>
              <div className="grid w-full grid-cols-2 grid-rows-4 items-start justify-start gap-y-5">
                <label htmlFor="nip">
                  <Typography variant="body-small-bold">NIP</Typography>
                </label>
                <Input id="nip" disabled value={user.nip} />
                <label htmlFor="nama_lengkap" className="font-semibold">
                  <Typography variant="body-small-bold">
                    Nama Lengkap
                  </Typography>
                </label>
                <Input id="nama_lengkap" value={user.name} disabled />
                <label htmlFor="username" className="font-semibold">
                  <Typography variant="body-small-bold">Username</Typography>
                </label>
                <Input id="username" disabled value={user.username} />
                <label htmlFor="email" className="font-semibold">
                  <Typography variant="body-small-bold">Email</Typography>
                </label>
                <Input id="email" type="email" disabled value={user.email} />
              </div>

              <DialogFooter className="w-full flex-col">
                <div className="flex self-start">
                  <Typography variant="body-medium-bold">
                    Reset Password
                  </Typography>
                </div>

                <div className="flex w-full gap-4">
                  <DialogClose asChild>
                    <Button variant="secondary" className="flex-1">
                      Batal
                    </Button>
                  </DialogClose>

                  <Button
                    className="flex-1"
                    onClick={() => {
                      setStep("success");
                    }}
                  >
                    Reset Password
                  </Button>
                </div>
              </DialogFooter>
            </DialogBody>
          </>
        ) : (
          <>
            <DialogHeader className="border-b border-gray-400 bg-gray-100">
              <DialogTitle>Berhasil</DialogTitle>
            </DialogHeader>

            <DialogBody>
              <DialogDescription>
                Email untuk mereset kata sandi telah berhasil dikirim.
              </DialogDescription>

              <DialogFooter>
                <Button onClick={() => setOpen(false)}>Oke</Button>
              </DialogFooter>
            </DialogBody>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
