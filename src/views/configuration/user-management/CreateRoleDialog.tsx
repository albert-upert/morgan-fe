import { useState } from "react";
import { Button } from "uper-ui/button";
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "uper-ui/dialog";
import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
} from "uper-ui/dropdown";
import { CaretDownIcon, InfoIcon } from "uper-ui/icon";
import { Typography } from "uper-ui/typography";

export function CreateRoleDialog() {
  const institutions = [
    { id: 1, label: "Ilmu Komputer" },
    { id: 2, label: "Teknik Mesin" },
    { id: 3, label: "Administrasi Niaga" },
  ];

  const roles = [
    { id: 1, label: "Admin Fakultas" },
    { id: 2, label: "Admin Sistem" },
    { id: 3, label: "Admin Program Studi" },
  ];

  const [selectedInstitusi, setSelectedInstitusi] = useState<string | null>(
    null
  );
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Tambah Peran</Button>
      </DialogTrigger>
      <DialogContent side="center" showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Tambah Peran Pengguna</DialogTitle>
          <InfoIcon className="absolute right-5 size-8 text-muted-foreground" />
        </DialogHeader>
        <DialogBody>
          <div className="grid w-full grid-cols-2 grid-rows-2 items-start justify-start gap-y-5">
            <Typography variant="body-medium-bold">
              Nama Peran (Role)
            </Typography>
            <Dropdown>
              <DropdownTrigger asChild>
                <Button
                  variant="outline"
                  className={`justify-between ${selectedRole ? "text-gray-800" : "text-gray-600"} `}
                >
                  {selectedRole ?? "Select Role"}
                  <CaretDownIcon />
                </Button>
              </DropdownTrigger>
              <DropdownContent>
                {roles.map((item) => (
                  <DropdownItem
                    key={item.id}
                    onSelect={() => setSelectedRole(item.label)}
                  >
                    {item.label}
                  </DropdownItem>
                ))}
              </DropdownContent>
            </Dropdown>
            <Typography variant="body-medium-bold">Nama Institusi</Typography>
            <Dropdown>
              <DropdownTrigger asChild>
                <Button
                  variant="outline"
                  className={`justify-between ${selectedInstitusi ? "text-gray-800" : "text-gray-600"} `}
                >
                  {selectedInstitusi ?? "Select Institusi"}
                  <CaretDownIcon />
                </Button>
              </DropdownTrigger>
              <DropdownContent>
                {institutions.map((item) => (
                  <DropdownItem
                    key={item.id}
                    onSelect={() => setSelectedInstitusi(item.label)}
                  >
                    {item.label}
                  </DropdownItem>
                ))}
              </DropdownContent>
            </Dropdown>
          </div>
          <DialogFooter className="w-full">
            <DialogClose asChild>
              <Button variant="secondary" className="flex-1">
                Batal
              </Button>
            </DialogClose>
            <Button variant="primary" className="flex-1">
              Tambah
            </Button>
          </DialogFooter>
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
}
