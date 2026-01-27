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
import { Textarea } from "@/components/textarea";
import { Typography } from "@/components/typography";

interface DetailPeriodDialogProps {
  open: boolean;
  periodId: number;
  setOpen: (open: boolean) => void;
}

const periodData = {
  year: 2025,
  academic_year: "2025/2026",
  date_start_end: "11-05-2025 s/d 31-12-2025 ",
  description: "Semester yang menyenangkan",
  status: true,
};

export function DetailPeriodDialog({
  open,
  periodId: _periodId,
  setOpen,
}: DetailPeriodDialogProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        side="center"
        className="data-[side=center]:max-w-3xl"
        showCloseButton={false}
      >
        <DialogHeader>
          <DialogTitle>Lihat Periode Akademik</DialogTitle>
          <DialogClose>
            <InfoIcon />
          </DialogClose>
        </DialogHeader>
        <DialogBody className="items-start">
          <Typography variant="body-medium-bold" className="self-start">
            Periode Akademik
          </Typography>
          <FormRow label="Tahun">
            <Input value={periodData.year} disabled></Input>
          </FormRow>
          <FormRow label="Semester">
            <div className="flex flex-row gap-10">
              <div className="flex items-center gap-3">
                <Checkbox checked disabled />
                <label className="text-sm font-normal text-foreground">
                  Ganjil
                </label>
              </div>
              <div className="flex items-center gap-3">
                <Checkbox checked={false} disabled />
                <label className="text-sm font-normal text-foreground">
                  Pendek
                </label>
              </div>
              <div className="flex items-center gap-3">
                <Checkbox checked={false} disabled />
                <label className="text-sm font-normal text-foreground">
                  Genap
                </label>
              </div>
            </div>
          </FormRow>
          <FormRow label="Tahun Akademik">
            <Input value={periodData.academic_year} disabled></Input>
          </FormRow>
          <FormRow label="Tanggal Mulai/Tanggal Berakhir">
            <Input value={periodData.date_start_end} disabled></Input>
          </FormRow>
          <FormRow label="Deskripsi">
            <Textarea value={periodData.description} disabled />
          </FormRow>
          <FormRow label="Status">
            <div className="flex items-center gap-3">
              <Switch id="status" checked disabled />
              <span className="text-sm font-semibold">
                {periodData.status ? "Aktif" : "Tidak Aktif"}
              </span>
            </div>
          </FormRow>
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
