import { Link } from "@tanstack/react-router";
import { Fragment, useState } from "react";
import { Breadcrumb } from "@/components/breadcrumb";
import { Button } from "@/components/button";
import { DropdownItem, DropdownSearch } from "@/components/dropdown";
import { ArrowLeftIcon } from "@/components/icon";
import { Input } from "@/components/input";
import { Switch } from "@/components/switch";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/table";
import { Typography } from "@/components/typography";
import { CreateRoleDialog } from "./CreateRoleDialog";

interface User {
  id: number;
  nip: string | null;
  name: string;
  username: string;
  email: string;
}

const users: Array<User> = [
  {
    id: 12,
    nip: "17720012",
    name: "Andrea Kimi Antonelli",
    username: "kimi12",
    email: "kimi12@gmail.com",
  },
  {
    id: 63,
    nip: "17720063",
    name: "George Russel",
    username: "george63",
    email: "george63@gmail.com",
  },
  {
    id: 3,
    nip: "17720033",
    name: "Max Verstappen",
    username: "max33",
    email: "max33@gmail.com",
  },
];

export function CreateUserView() {
  const [checked, setChecked] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  return (
    <div className="flex flex-col gap-5 p-5">
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
            label: "Tambah Pengguna",
          },
        ]}
      />
      <Typography variant="body-large-bold">Pengguna Baru</Typography>
      <Link to="/configuration/user-management">
        <Button size="lg" variant="tertiary">
          <Fragment key=".0">
            <ArrowLeftIcon />
            Manajemen Pengguna
          </Fragment>
        </Button>
      </Link>
      <div className="flex flex-col gap-5 rounded-lg border border-gray-400 bg-white p-5">
        <Typography variant="body-medium-bold">Pengguna Baru</Typography>
        <div className="grid grid-cols-[minmax(13rem,15rem)_1fr] grid-rows-5 items-center justify-center gap-5">
          <label htmlFor="nip">
            <Typography variant="body-small-bold">NIP</Typography>
          </label>
          <DropdownSearch
            items={users}
            searchPlaceholder="Pilih NIP dari daftar Staf/Pengajar"
            searchKeys={["nip", "username"]}
            emptyMessage="NIP tidak ditemukan"
          >
            {({ filteredItems, onSearchChange }) =>
              filteredItems.map((user) => (
                <DropdownItem
                  key={user.id}
                  onSelect={() => {
                    setSelectedUser(user);
                    onSearchChange(user.nip ?? "");
                  }}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span>
                      {user.nip} - {user.username}
                    </span>
                  </div>
                </DropdownItem>
              ))
            }
          </DropdownSearch>
          <label htmlFor="nama_lengkap" className="font-semibold">
            <Typography variant="body-small-bold">Nama Lengkap</Typography>
          </label>
          <Input
            id="nama_lengkap"
            size="lg"
            placeholder="Auto Generate"
            value={selectedUser?.name}
          />
          <label htmlFor="username" className="font-semibold">
            <Typography variant="body-small-bold">Username</Typography>
          </label>
          <Input
            id="username"
            size="lg"
            placeholder="Auto Generate"
            value={selectedUser?.username}
          />
          <label htmlFor="email" className="font-semibold">
            <Typography variant="body-small-bold">Email</Typography>
          </label>
          <Input
            id="email"
            type="email"
            size="lg"
            placeholder="Auto Generate"
            value={selectedUser?.email}
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
          <TableBody></TableBody>
        </Table>
      </div>
    </div>
  );
}
