import { Link } from "@tanstack/react-router";
import React, { Fragment, useCallback, useState } from "react";
import { Breadcrumb } from "@/components/breadcrumb";
import { Button } from "@/components/button";
import { CaretLeftIcon, TrashIcon } from "@/components/icon";
import { Input } from "@/components/input";
import { Switch } from "@/components/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/table";
import { Typography } from "@/components/typography";
import { CreateRoleDialog } from "./CreateRoleDialog";
import { DeleteRoleDialog } from "./DeleteRoleDialog";

interface UserRole {
  id: number;
  role: string;
  institution: string;
  createdAt: string;
}

const userInformation = {
  nip: "1778910",
  name: "Toto Wolff",
  username: "Toto1263",
  email: "totowolff@gmail.com",
};

const userRoles = [
  {
    id: 1,
    role: "Admin Sistem",
    institution: "Teknik Elektro",
    createdAt: "26-05-2024, 08.00 WIB",
  },
  {
    id: 2,
    role: "Admin Fakultas",
    institution: "Teknik Elektro",
    createdAt: "26-05-2024, 08.00 WIB",
  },
];

export function EditUserView() {
  const [checked, setChecked] = useState(false);
  const [selectedUserRole, setSelectedUserRole] = useState<UserRole | null>(
    null
  );
  const [openDeleteUserRoleDialog, setOpenDeleteUserRoleDialog] =
    useState<boolean>(false);

  const handleDeleteUserRole = useCallback((selectUserRole: UserRole) => {
    setOpenDeleteUserRoleDialog(true);
    setSelectedUserRole(selectUserRole);
  }, []);

  return (
    <div className="flex flex-col gap-5 pt-5">
      <Breadcrumb
        items={[
          {
            href: "/",
            label: "Beranda",
          },
          {
            href: "/configuration",
            label: "Konfigurasi",
          },
          {
            href: "/configuration/user-management",
            label: "Manajemen Pengguna",
          },
          {
            label: "Ubah Informasi",
          },
        ]}
      />
      <Typography variant="body-large-bold">Ubah Informasi</Typography>
      <Link to="/configuration/user-management">
        <Button size="lg" variant="tertiary">
          <Fragment key=".0">
            <CaretLeftIcon />
            Manajemen Pengguna
          </Fragment>
        </Button>
      </Link>
      <div className="flex flex-col gap-5 rounded-lg border border-gray-400 bg-white p-5">
        <Typography variant="body-medium-bold">
          Edit Informasi Detail Pengguna
        </Typography>
        <div className="grid grid-cols-[minmax(13rem,15rem)_1fr] grid-rows-5 items-center justify-center gap-5">
          <label htmlFor="nip">
            <Typography variant="body-small-bold">NIP</Typography>
          </label>
          <Input id="nip" disabled value={userInformation.nip} />
          <label htmlFor="nama_lengkap" className="font-semibold">
            <Typography variant="body-small-bold">Nama Lengkap</Typography>
          </label>
          <Input id="nama_lengkap" value={userInformation.name} disabled />
          <label htmlFor="username" className="font-semibold">
            <Typography variant="body-small-bold">Username</Typography>
          </label>
          <Input id="username" disabled value={userInformation.username} />
          <label htmlFor="email" className="font-semibold">
            <Typography variant="body-small-bold">Email</Typography>
          </label>
          <Input
            id="email"
            type="email"
            disabled
            value={userInformation.email}
          />
          <label htmlFor="status" className="font-semibold">
            <Typography variant="body-small-bold">Status</Typography>
          </label>
          <div className="flex items-center gap-3">
            <Switch
              id="status"
              checked={checked}
              onCheckedChange={setChecked}
            />
            <span className="text-sm font-semibold">
              {checked ? "Aktif" : "Tidak Aktif"}
            </span>
          </div>
        </div>
        <div className="flex justify-end">
          <CreateRoleDialog />
        </div>
      </div>
      <div className="flex flex-col gap-5 rounded-lg border border-gray-400 bg-white p-5">
        <Typography variant="body-medium-bold">List Peran</Typography>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nama Peran</TableHead>
              <TableHead>Institusi</TableHead>
              <TableHead>Created At:</TableHead>
              <TableHead>Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {userRoles.map((data) => (
              <TableRow key={data.id}>
                <TableCell>{data.role}</TableCell>
                <TableCell>{data.institution}</TableCell>
                <TableCell>{data.createdAt}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleDeleteUserRole(data)}
                    variant="tertiary"
                  >
                    <TrashIcon />
                    Hapus
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {selectedUserRole && (
        <DeleteRoleDialog
          open={openDeleteUserRoleDialog}
          userRole={selectedUserRole}
          setOpen={setOpenDeleteUserRoleDialog}
        />
      )}
    </div>
  );
}
