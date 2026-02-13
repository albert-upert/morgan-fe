import { useCallback, useState } from "react";

import { Button } from "uper-ui/button";
import { TimePicker } from "uper-ui/date-picker";
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "uper-ui/dialog";
import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
} from "uper-ui/dropdown";
import { CaretDownIcon } from "uper-ui/icon";
import { Typography } from "uper-ui/typography";

export interface ClassSchedule {
  id: number;
  day: string;
  room: string;
  startTime: string;
  endTime: string;
}

interface AddClassScheduleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (schedule: Omit<ClassSchedule, "id">) => void;
}

const dayOptions = [
  { label: "Senin", value: "monday" },
  { label: "Selasa", value: "tuesday" },
  { label: "Rabu", value: "wednesday" },
  { label: "Kamis", value: "thursday" },
  { label: "Jumat", value: "friday" },
  { label: "Sabtu", value: "saturday" },
];

const roomOptions = [
  { label: "Ruang A101", value: "A101" },
  { label: "Ruang A102", value: "A102" },
  { label: "Ruang B201", value: "B201" },
  { label: "Ruang B202", value: "B202" },
  { label: "Ruang C301", value: "C301" },
];

export function AddClassScheduleDialog({
  open,
  onOpenChange,
  onConfirm,
}: AddClassScheduleDialogProps) {
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedRoom, setSelectedRoom] = useState("");
  const [startTime, setStartTime] = useState<
    { hours: number; minutes: number } | undefined
  >(undefined);
  const [endTime, setEndTime] = useState<
    { hours: number; minutes: number } | undefined
  >(undefined);

  const formatTime = (time: { hours: number; minutes: number } | undefined) => {
    if (!time) return "";
    const hours = String(time.hours).padStart(2, "0");
    const minutes = String(time.minutes).padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const handleCancel = useCallback(() => {
    setSelectedDay("");
    setSelectedRoom("");
    setStartTime(undefined);
    setEndTime(undefined);
    onOpenChange(false);
  }, [onOpenChange]);

  const handleConfirm = useCallback(() => {
    onConfirm({
      day: selectedDay,
      room: selectedRoom,
      startTime: formatTime(startTime),
      endTime: formatTime(endTime),
    });
    setSelectedDay("");
    setSelectedRoom("");
    setStartTime(undefined);
    setEndTime(undefined);
    onOpenChange(false);
  }, [selectedDay, selectedRoom, startTime, endTime, onConfirm, onOpenChange]);

  const isConfirmDisabled =
    !selectedDay || !selectedRoom || !startTime || !endTime;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="overflow-hidden rounded-xl border border-border p-0 data-[side=center]:max-w-[640px]"
        showCloseButton
      >
        <DialogHeader className="rounded-t-xl border-0 border-b">
          <DialogTitle>Tambah Jadwal Kelas</DialogTitle>
        </DialogHeader>

        <DialogBody className="gap-3 rounded-b-xl border-0 p-0">
          {/* Form Section */}
          <div className="w-full px-5 py-3">
            <div className="flex flex-col rounded-lg border border-border">
              {/* Hari */}
              <div className="flex items-center gap-5 px-5 py-3">
                <div className="w-[200px]">
                  <Typography variant="body-small-bold">Hari</Typography>
                </div>
                <div className="flex-1">
                  <Dropdown>
                    <DropdownTrigger asChild>
                      <Button
                        size="md"
                        variant="outline"
                        className="w-full justify-between"
                      >
                        <span
                          className={
                            selectedDay ? "text-gray-800" : "text-gray-600"
                          }
                        >
                          {selectedDay || "-Pilih Hari-"}
                        </span>
                        <CaretDownIcon className="size-5" />
                      </Button>
                    </DropdownTrigger>
                    <DropdownContent>
                      {dayOptions.map((option) => (
                        <DropdownItem
                          key={option.value}
                          onSelect={() => setSelectedDay(option.label)}
                        >
                          {option.label}
                        </DropdownItem>
                      ))}
                    </DropdownContent>
                  </Dropdown>
                </div>
              </div>

              {/* Ruangan */}
              <div className="flex items-center gap-5 px-5 py-3">
                <div className="w-[200px]">
                  <Typography variant="body-small-bold">Ruangan</Typography>
                </div>
                <div className="flex-1">
                  <Dropdown>
                    <DropdownTrigger asChild>
                      <Button
                        size="md"
                        variant="outline"
                        className="w-full justify-between"
                      >
                        <span
                          className={
                            selectedRoom ? "text-gray-800" : "text-gray-600"
                          }
                        >
                          {selectedRoom || "-Pilih Ruangan-"}
                        </span>
                        <CaretDownIcon className="size-5" />
                      </Button>
                    </DropdownTrigger>
                    <DropdownContent>
                      {roomOptions.map((option) => (
                        <DropdownItem
                          key={option.value}
                          onSelect={() => setSelectedRoom(option.label)}
                        >
                          {option.label}
                        </DropdownItem>
                      ))}
                    </DropdownContent>
                  </Dropdown>
                </div>
              </div>

              {/* Jam Mulai Kelas */}
              <div className="flex items-center gap-5 px-5 py-3">
                <div className="w-[200px]">
                  <Typography variant="body-small-bold">
                    Jam Mulai Kelas
                  </Typography>
                </div>
                <div className="flex-1">
                  <TimePicker
                    value={startTime}
                    onChange={setStartTime}
                    placeholder="hh:mm"
                  />
                </div>
              </div>

              {/* Jam Selesai Kelas */}
              <div className="flex items-center gap-5 px-5 py-3">
                <div className="w-[200px]">
                  <Typography variant="body-small-bold">
                    Jam Selesai Kelas
                  </Typography>
                </div>
                <div className="flex-1">
                  <TimePicker
                    value={endTime}
                    onChange={setEndTime}
                    placeholder="hh:mm"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Footer Section */}
          <div className="flex w-full items-center justify-end gap-5 px-5 py-5">
            <Button size="lg" variant="secondary" onClick={handleCancel}>
              Batal
            </Button>
            <Button
              size="lg"
              variant="primary"
              onClick={handleConfirm}
              disabled={isConfirmDisabled}
            >
              Tambahkan Jadwal
            </Button>
          </div>
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
}
