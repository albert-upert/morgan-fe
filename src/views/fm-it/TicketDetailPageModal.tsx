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
import { CloseIcon, SyncIcon } from "uper-ui/icon";
import { Separator } from "uper-ui/separator";
import { Typography } from "uper-ui/typography";

export function TicketDetailModal({
  open,
  onOpenChange,
  photoUrl,
  showPreview,
  setShowPreview,
  onConfirm,
  isUpdating,
  nextStatus,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  photoUrl: string;
  showPreview: boolean;
  setShowPreview: (show: boolean) => void;
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
        {showPreview && photoUrl ? (
          <div className="h-min-content flex w-full flex-col items-center gap-4 p-3 data-[side=center]:w-[calc(100%-48px)] data-[side=center]:max-w-[412px]">
            <Button
              variant="secondary"
              onClick={() => {
                onOpenChange(false);
                setShowPreview(false);
              }}
              className="absolute self-end"
            >
              <CloseIcon className="" />
            </Button>
            <img
              src={photoUrl}
              alt="Bukti Laporan"
              className="h-auto max-h-[60vh] w-full rounded-lg border border-gray-200 bg-gray-50 object-contain"
            />
          </div>
        ) : (
          <>
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
                Apakah anda yakin ingin mengubah status perbaikan tiket ini
                menjadi {nextStatus}?
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
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
