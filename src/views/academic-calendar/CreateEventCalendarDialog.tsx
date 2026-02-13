import type { ReactNode } from "react";
import { useCallback, useState } from "react";
import { Button } from "uper-ui/button";
import { DatePicker } from "uper-ui/date-picker";
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogFooter,
} from "uper-ui/dialog";
import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
} from "uper-ui/dropdown";
import { CaretDownIcon } from "uper-ui/icon";
import { Typography } from "uper-ui/typography";
import { CreateConfirmationDialog } from "./CreateConfirmationDialog";

interface CreateEventProps {
  open: boolean;
  eventId: number | null;
  mode?: "create" | "edit";
  setOpen: (open: boolean) => void;
}

const academicEvent = [
  { label: "Perkuliahan Semester Pendek", value: "pendek" },
  { label: "Perkuliahan Semester Ganjil", value: "ganjil" },
  { label: "Perkuliahan Semester Genap", value: "genap" },
];

export function CreateEventCalendarDialog({
  open,
  eventId: _eventId,
  mode = "create",
  setOpen,
}: CreateEventProps) {
  const [selectedEvent, setSelectedEvent] = useState(
    "Perkuliahan Semester Pendek"
  );
  const [date, setDate] = useState<Date | null>(null);
  const isEditMode = mode === "edit";

  const [confirmation, setConfirmation] = useState<boolean>(false);
  const handleSave = useCallback(() => {
    console.warn("Tersimpan");
    setOpen(false);
    setConfirmation(true);
  }, []);

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          side="center"
          className="data-[side=center]:max-w-3xl"
          showCloseButton={false}
        >
          <DialogBody className="items-start rounded-t-xl border-t">
            <Typography variant="body-medium-bold">
              {isEditMode ? "Ubah Event Akademik" : "Tambah Event Akademik"}
            </Typography>
            <FormRow label="Nama Event">
              <div className="flex w-full justify-start">
                <Dropdown>
                  <DropdownTrigger className="w-full">
                    <Button
                      variant="outline"
                      className="w-full justify-between"
                    >
                      {selectedEvent} <CaretDownIcon className="size-5" />
                    </Button>
                  </DropdownTrigger>
                  <DropdownContent>
                    {academicEvent.map((option) => (
                      <DropdownItem
                        key={option.value}
                        onSelect={() => setSelectedEvent(option.label)}
                      >
                        {option.label}
                      </DropdownItem>
                    ))}
                  </DropdownContent>
                </Dropdown>
              </div>
            </FormRow>
            <FormRow label="Tanggal Mulai">
              <DatePicker
                placeholder="dd-mm-yyyy, hh:mm"
                value={date}
                onChange={setDate}
                suffixText=""
              />
            </FormRow>
            <FormRow label="Tanggal Selesai">
              <DatePicker
                placeholder="dd-mm-yyyy, hh:mm"
                value={date}
                onChange={setDate}
                suffixText=""
              />
            </FormRow>
            <DialogFooter className="self-end">
              <DialogClose asChild>
                <Button variant="secondary" className="w-38">
                  Batal
                </Button>
              </DialogClose>
              <Button
                onClick={() => handleSave()}
                variant="primary"
                className="w-38"
              >
                Simpan
              </Button>
            </DialogFooter>
          </DialogBody>
        </DialogContent>
      </Dialog>
      <CreateConfirmationDialog
        open={confirmation}
        setOpen={setConfirmation}
        onSave={() => {}}
      />
    </div>
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
    <div className="grid w-full grid-cols-[1fr_2fr] items-center">
      <Typography variant="body-small-bold">{label}</Typography>
      {children}
    </div>
  );
}
