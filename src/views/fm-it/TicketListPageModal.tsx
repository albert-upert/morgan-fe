import { useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { Accordion } from "uper-ui/accordion";
import { Button } from "uper-ui/button";
import { Callout } from "uper-ui/callout";
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
  CaretDownIcon,
  CaretUpIcon,
  CautionIcon,
  CloseIcon,
  FileIcon,
  OpenIcon,
} from "uper-ui/icon";
import { Separator } from "uper-ui/separator";
import { Tag } from "uper-ui/tags";
import { Textarea } from "uper-ui/textarea";
import { Typography } from "uper-ui/typography";
import type { Report } from "@/types/report";


export function TicketListModal({
  open,
  onOpenChange,
  reportDetail,
  onRequestSubmit,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  reportDetail: Report;
  resetToken?: number;
  onRequestSubmit?: (payload: Report) => void;
}) {
  const [selected, setLocation] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const validLocation = selected !== null;

  useEffect(() => {
    if (reportDetail.photoUrl) {
      const url = reportDetail.photoUrl;
      setPhotoUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [reportDetail.photoUrl]);

  const cancel = useCallback(() => {
    onOpenChange(false);
    setShowPreview(false);
    setLocation(null);
  }, []);

  const navigate = useNavigate();
  const accept = useCallback(() => {
    onOpenChange(false);
    setShowPreview(false);
    setLocation(null);
    onRequestSubmit?.(reportDetail);

    if (selected) {
      sessionStorage.setItem("user_location", selected);
    }

    sessionStorage.setItem("show_ticket_accepted_toast", "true");

    navigate({
      to: "/fm-it/ticket-detail/$id",
      params: {
        id: String(reportDetail.id),
      },
    });
  }, [selected]);
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

  const toggleAccordion = useCallback((id: string) => {
    setExpandedItems((prev) => ({ ...prev, [id]: !prev[id] }));
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
              <div className="flex w-full flex-col gap-3">
                {reportDetail.assets.map((item, index) => {
                  const isExpanded = expandedItems[item[index]] || false;
                  return (
                    <div className="w-full border border-gray-400 bg-gray-100 rounded-lg">
                      <Button 
                        size="lg"
                        variant="ghost"
                        className="w-full h-full p-4 flex flex-row items-center justify-between"
                        onClick={() =>  toggleAccordion(item[index])}
                      >
                          <div className="flex items-center justify-start gap-2 w-full h-full">
                            <div className="h-5 w-5 flex justify-center items-center">
                              <CautionIcon className="h-4 w-4" color="red"/> 
                            </div>
                            <Typography variant="caption-small-semibold">{item}</Typography>
                            <div className="h-5 w-5 flex justify-center items-center ml-auto">
                              {isExpanded ? 
                                <CaretUpIcon className="h-4 w-4"/> 
                                : <CaretDownIcon className="h-4 w-4"/>
                              }
                            </div>
                          </div>
                      </Button>
                      <Accordion 
                        title="" 
                        key={index} 
                        className="border-0 bg-transparent [&_[data-slot=accordion-content]]:px-0 [&_[data-slot=accordion-header]]:hidden"
                        expanded={isExpanded}
                      >
                        <div className="flex flex-col gap-3">
                          <div className="flex flex-col items-start gap-1">
                            <Typography variant="caption-small-semibold"  className="text-gray-600">Jenis Masalah</Typography>
                            <Tag color="red" type="filled" size="lg" rounded="default" className="px-3">
                              <Typography variant="body-small" className="text-white">
                                Rusak
                              </Typography>
                            </Tag>
                          </div>
    
                          <div className="flex flex-col items-start gap-1">
                            <Typography variant="caption-small-semibold"  className="text-gray-600">Detail Kendala</Typography>
                            <Textarea
                              className="bg-white"
                              value={reportDetail.description}
                              disabled
                            />                  
                          </div>
    
                          <div className="flex flex-col items-start gap-1">
                            <Typography variant="caption-small-semibold"  className="text-gray-600">Bukti Foto</Typography>
                            <Button
                              onClick={() => {
                                setShowPreview(true);
                                setPhotoUrl(reportDetail.photoUrl);
                              }}
                              className="flex w-full flex-row items-center justify-between gap-3"
                              variant="outline"
                            >
                              <div>
                                <FileIcon />
                              </div>
    
                              <div className="flex grow justify-start">
                                {reportDetail.photoUrl}
                              </div>
    
                              <div>
                                <OpenIcon />
                              </div>
                            </Button>
                          </div>
                        </div>
                      </Accordion>
                    </div>
                )})}
              </div>

              {!selected && (
                <div className="flex w-full flex-row justify-start">
                  <Callout variant="yellow" message="Silahkan pilih lokasi saat ini terlebih dahulu." showClose={false} showIcon={true} />
                </div> 
              )}

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

            </DialogBody>
            <DialogFooter className="flex w-full flex-row justify-between gap-3 px-4 py-3">
              <Button onClick={cancel} className="w-full" variant="secondary">
                Batal
              </Button>
              <Button
                className="w-full"
                variant="primary"
                disabled={!validLocation}
                onClick={accept}
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
