import React from "react";
import { Button } from "uper-ui/button";
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "uper-ui/dialog";
import { SyncIcon } from "uper-ui/icon";
import { Separator } from "uper-ui/separator";
import { Typography } from "uper-ui/typography";

export function TicketDetailModal({
  open,
  onOpenChange,
  onConfirm,
  isUpdating,
  nextStatus,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  isUpdating: boolean;
  nextStatus: string;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        side="center"
        showCloseButton={false}
        className="w-full data-[side=center]:w-[calc(100%-48px)] data-[side=center]:max-w-[412px]"
      >
        <DialogHeader>
          <DialogTitle>
            <Typography variant="body-medium-bold">
              Ubah Status Perbaikan
            </Typography>
          </DialogTitle>
        </DialogHeader>

        <Separator />

        <DialogBody className="px-4 py-3">
          <Typography variant="body-small" className="text-center">
            Apakah anda yakin ingin mengubah status perbaikan tiket ini menjadi{" "}
            <strong>{nextStatus}</strong>?
          </Typography>
        </DialogBody>

        <DialogFooter className="px-4 py-3">
          <Button
            variant="primary"
            className="w-full"
            size="lg"
            onClick={onConfirm}
            disabled={isUpdating}
          >
            {isUpdating ? (
              "Memproses..."
            ) : (
              <React.Fragment key=".0">
                <SyncIcon />
                Ya, {nextStatus}
              </React.Fragment>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
