import type { ReactNode } from "react";
import { Checkbox } from "@/components/checkbox";
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/dialog";
import { InfoIcon } from "@/components/icon";
import { Input } from "@/components/input";
import { Switch } from "@/components/switch";
import { Typography } from "@/components/typography";

interface DetailEventDialogProps {
  open: boolean;
  eventId: number;
  setOpen: (open: boolean) => void;
}

const eventFlag = {
  nilai: true,
  irs: true,
  lulus: false,
  registrasi: false,
  yudisium: false,
  survey: false,
  dosen: false,
};

const eventData = {
  event_name: "Perkuliahan Semester Ganjil",
  flag: eventFlag,
  status: true,
};

export function DetailEventDialog({
  open,
  eventId: _eventId,
  setOpen,
}: DetailEventDialogProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        side="center"
        className="data-[side=center]:max-w-3xl"
        showCloseButton={false}
      >
        <DialogHeader>
          <DialogTitle>Lihat Event Akademik</DialogTitle>
          <DialogClose>
            <InfoIcon />
          </DialogClose>
        </DialogHeader>
        <DialogBody className="items-start">
          <Typography variant="body-medium-bold">Event Akademik</Typography>
          <div className="flex flex-col gap-6">
            <FormRow label="Nama Event">
              <Input value={eventData.event_name} disabled></Input>
            </FormRow>
            <FormRow label="Flag">
              <div className="ml-2 grid grid-cols-3 gap-8">
                <FormCheckBox label="Nilai">
                  <Checkbox checked={eventData.flag.nilai} disabled />
                </FormCheckBox>
                <FormCheckBox label="IRS">
                  <Checkbox checked={eventData.flag.irs} disabled />
                </FormCheckBox>
                <FormCheckBox label="Lulus">
                  <Checkbox checked={eventData.flag.lulus} disabled />
                </FormCheckBox>
                <FormCheckBox label="Registrasi">
                  <Checkbox checked={eventFlag.registrasi} disabled />
                </FormCheckBox>
                <FormCheckBox label="Yudisium">
                  <Checkbox checked={eventData.flag.yudisium} disabled />
                </FormCheckBox>
                <FormCheckBox label="Survey">
                  <Checkbox checked={eventData.flag.survey} disabled />
                </FormCheckBox>
                <FormCheckBox label="Dosen">
                  <Checkbox checked={eventData.flag.dosen} disabled />
                </FormCheckBox>
              </div>
            </FormRow>
            <FormRow label="Status">
              <div className="flex items-center gap-3">
                <Switch id="status" checked disabled />
                <span className="text-sm font-semibold">
                  {eventData.status ? "Aktif" : "Tidak Aktif"}
                </span>
              </div>
            </FormRow>
          </div>
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
}

function FormRow({
  label,
  children,
}: {
  label: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="grid w-full grid-cols-2 items-center">
      <Typography variant="body-small-bold">{label}</Typography>
      {children}
    </div>
  );
}

function FormCheckBox({
  label,
  children,
}: {
  label: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="flex items-center gap-3">
      {children}
      <label className="text-sm font-normal text-foreground">{label}</label>
    </div>
  );
}
