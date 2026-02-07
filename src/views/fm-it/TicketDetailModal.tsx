import { useCallback, useEffect, useState } from "react";
import { Button } from "uper-ui/button";
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "uper-ui/dialog";
import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
} from "uper-ui/dropdown";
import {
  BuildingIcon,
  CaretDownIcon,
  CautionIcon,
  ClockIcon,
  CloseIcon,
  FileIcon,
  OpenIcon,
  RegistrationIcon,
  SyncIcon,
} from "uper-ui/icon";
import { Separator } from "uper-ui/separator";
import { Tag } from "uper-ui/tags";
import { Textarea } from "uper-ui/textarea";
import { Typography } from "uper-ui/typography";

type Report = {
  id: string;
  status: string;
  assets: Array<string>;
  room: string;
  building: string;
  date: string;
  time: string;
  reporter: string;
  reporterRole: string;
  photo: File | null;
  description: string;
};

export function TicketDetailModal({
  open,
  onOpenChange,
  reportDetail,
  // onRequestSubmit,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  reportDetail: Report;
  resetToken?: number;
  // onRequestSubmit?: (payload: ReportIssuePayload) => void;
}) {
  const [selected, setLocation] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const validLocation = selected !== null;

  useEffect(() => {
    if (reportDetail.photo) {
      const url = URL.createObjectURL(reportDetail.photo);
      setPhotoUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [reportDetail.photo]);

  const cancel = useCallback(() => {
    onOpenChange(false);
    setShowPreview(false);
    setLocation(null);
  }, []);

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        onOpenChange(next);
        if (!next) {
          // keep drafts for now; layout-only behavior
        }
      }}
    >
      <DialogContent
        side="center"
        showCloseButton={false}
        className="w-full p-0 data-[side=center]:w-[calc(100%-48px)] data-[side=center]:max-w-[412px]"
      >
        {showPreview && photoUrl ? (
          <div className="h-min-content flex w-full flex-col items-center gap-4 p-3 data-[side=center]:w-[calc(100%-48px)] data-[side=center]:max-w-[412px]">
            <Button
              variant="secondary"
              onClick={() => setShowPreview(false)}
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
                  Konfirmasi Terima Tiket
                </Typography>
              </DialogTitle>
            </DialogHeader>

            <Separator />

            <DialogBody className="flex flex-col gap-3 px-4 py-3">
              <div className="flex w-full flex-col gap-2 rounded-lg bg-gray-100">
                <div>
                  <Typography
                    className="text-primary"
                    variant="body-medium-bold"
                  >
                    {reportDetail.id}
                  </Typography>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex flex-row items-center gap-3">
                    <SyncIcon className="h-6 w-6" />
                    <Tag color="red" type="filled" size="md" rounded="pill">
                      {reportDetail.status}
                    </Tag>
                  </div>
                  <div className="flex flex-row items-center gap-3">
                    <CautionIcon className="h-6 w-6" />
                    <Typography variant="caption-bold">
                      {reportDetail.assets.join(", ")}
                    </Typography>
                  </div>
                  <div className="flex flex-row items-center gap-3">
                    <BuildingIcon className="h-6 w-6" />
                    <Typography variant="caption-bold">
                      {reportDetail.room} - {reportDetail.building}
                    </Typography>
                  </div>
                  <div className="flex flex-row items-center gap-3">
                    <ClockIcon className="h-6 w-6" />
                    <Typography variant="caption-bold">
                      {reportDetail.date} | {reportDetail.time}
                    </Typography>
                  </div>
                  <div className="flex flex-row items-center gap-3">
                    <RegistrationIcon className="h-6 w-6" />
                    <Typography variant="caption-bold">
                      Pelapor: {reportDetail.reporter} (
                      {reportDetail.reporterRole})
                    </Typography>
                  </div>
                </div>

                <div>
                  {/* File Attachment */}
                  <Button
                    onClick={() => {
                      if (reportDetail.photo) setShowPreview(true);
                    }}
                    className="flex w-full flex-row items-center justify-between gap-3"
                    variant="outline"
                  >
                    <div>
                      <FileIcon />
                    </div>

                    <div className="flex grow justify-start">
                      {reportDetail.photo?.name}
                    </div>

                    <div>
                      <OpenIcon />
                    </div>
                  </Button>
                </div>

                <div>
                  <Textarea
                    className="bg-white"
                    value={reportDetail.description}
                    disabled
                  />
                </div>
              </div>

              <div className="w-full">
                <Dropdown>
                  <DropdownTrigger asChild>
                    <Button
                      className="row flex w-full items-center justify-between"
                      variant="outline"
                    >
                      <Typography variant="body-small">
                        {selected || "Pilih Lokasi Saat Ini"}
                      </Typography>
                      <CaretDownIcon className="h-12 w-12" />
                    </Button>
                  </DropdownTrigger>
                  <DropdownContent
                    align="end"
                    className="max-h-[200px] w-fit overflow-y-auto"
                  >
                    <DropdownItem
                      onSelect={() => setLocation("Lantai 1 Griya Legita")}
                    >
                      Lantai 1 Griya Legita
                    </DropdownItem>
                    <DropdownItem
                      onSelect={() => setLocation("Lantai 2 Griya Legita")}
                    >
                      Lantai 2 Griya Legita
                    </DropdownItem>
                    <DropdownItem
                      onSelect={() => setLocation("Lantai 3 Griya Legita")}
                    >
                      Lantai 3 Griya Legita
                    </DropdownItem>
                    <DropdownItem
                      onSelect={() => setLocation("Lantai 4 Griya Legita")}
                    >
                      Lantai 4 Griya Legita
                    </DropdownItem>
                    <DropdownItem
                      onSelect={() => setLocation("Lantai 5 Griya Legita")}
                    >
                      Lantai 5 Griya Legita
                    </DropdownItem>
                    <DropdownItem
                      onSelect={() => setLocation("Lantai 6 Griya Legita")}
                    >
                      Lantai 6 Griya Legita
                    </DropdownItem>
                    <DropdownItem
                      onSelect={() => setLocation("Lantai 7 Griya Legita")}
                    >
                      Lantai 7 Griya Legita
                    </DropdownItem>
                    <DropdownItem
                      onSelect={() => setLocation("Lantai 8 Griya Legita")}
                    >
                      Lantai 8 Griya Legita
                    </DropdownItem>
                  </DropdownContent>
                </Dropdown>
              </div>

              <div className="flex w-full flex-row justify-start">
                <Typography variant="body-small">
                  ** Silahkan pilih lokasi anda terlebih dahulu.
                </Typography>
              </div>
            </DialogBody>
            <DialogFooter className="flex w-full flex-row justify-between gap-3 px-4 py-3">
              <Button onClick={cancel} className="w-full" variant="secondary">
                Batal
              </Button>
              <Button
                className="w-full"
                variant="primary"
                disabled={!validLocation}
              >
                Terima Tiket
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
