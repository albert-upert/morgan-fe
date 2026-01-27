import { Link } from "@tanstack/react-router";
import { useCallback, useState } from "react";
import { Breadcrumb } from "@/components/breadcrumb";
import { Button } from "@/components/button";
import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
} from "@/components/dropdown";
import { PencilIcon, SearchIcon, SortIcon } from "@/components/icon";
import { Input } from "@/components/input";
import { Pagination } from "@/components/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/table";
import { Tag } from "@/components/tags";
import { Typography } from "@/components/typography";
import { DetailUserDialog } from "./DetailUserDialog";
import { ResetPasswordDialog } from "./ResetPasswordDialog";

interface User {
  id: number;
  nip: string;
  email: string;
  name: string;
  username: string;
  createdAt: string;
  status: string;
}

const userData: Array<User> = [
  {
    id: 12,
    nip: "17720012",
    email: "email.test@gmail.com",
    name: "Andrea Kimi Antonelli",
    username: "kimi12",
    createdAt: "26-05-2024, 08.00 WIB",
    status: "Aktif",
  },
  {
    id: 63,
    nip: "17720063",
    email: "email.test@gmail.com",
    name: "George Russel",
    username: "george63",
    createdAt: "26-05-2024, 08.00 WIB",
    status: "Tidak Aktif",
  },
  {
    id: 3,
    nip: "17720033",
    email: "email.test@gmail.com",
    name: "Max Verstappen",
    username: "max33",
    createdAt: "26-05-2024, 08.00 WIB",
    status: "Aktif",
  },
];

const filterList = [
  { label: "Urutkan", key: "" },
  { label: "Aktif", key: "active" },
  { label: "Tidak Aktif", key: "inactive" },
  { label: "A-Z", key: "nama,asc" },
  { label: "Z-A", key: "nama,desc" },
  { label: "Terbaru", key: "created_at,desc" },
  { label: "Terlama", key: "created_at,asc" },
];

export function UserListView() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [openUserDetailDialog, setOpenUserDetailDialog] =
    useState<boolean>(false);
  const [openResetPasswordDialog, setOpenResetPasswordDialog] =
    useState<boolean>(false);

  const handleResetPassword = useCallback((selectUser: User) => {
    setOpenResetPasswordDialog(true);
    setSelectedUser(selectUser);
  }, []);

  const handleUserDetail = useCallback((selectUser: User) => {
    setOpenUserDetailDialog(true);
    setSelectedUser(selectUser);
  }, []);

  return (
    // diset pakai padding top
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
            label: "Management Pengguna",
          },
        ]}
      />
      <Typography variant="body-large-bold">Manajemen Pengguna</Typography>
      <div className="flex justify-end">
        <Link to="/configuration/user-management/create">
          <Button size="lg" variant="primary">
            Tambah Pengguna Baru
          </Button>
        </Link>
      </div>
      <div className="rounded-lg border border-gray-400 bg-white">
        <div className="grid grid-cols-2 p-5">
          <Input
            size="lg"
            placeholder="NIP/NIM"
            endIcon={<SearchIcon className="size-5 text-muted-foreground" />}
          />
          <div className="flex justify-end">
            <Dropdown>
              <DropdownTrigger asChild>
                <Button size="lg" variant="secondary">
                  {selectedFilter ?? "Urutkan"}
                  <SortIcon />
                </Button>
              </DropdownTrigger>
              <DropdownContent>
                {filterList.map((item) => (
                  <DropdownItem
                    key={item.key}
                    onSelect={() => setSelectedFilter(item.label)}
                  >
                    {item.label}
                  </DropdownItem>
                ))}
              </DropdownContent>
            </Dropdown>
          </div>
        </div>
      </div>
      <Table className="bg-background">
        <TableHeader>
          <TableRow>
            <TableHead>NIP/NIM</TableHead>
            <TableHead>Nama</TableHead>
            <TableHead>Username</TableHead>
            <TableHead>Created At:</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Reset</TableHead>
            <TableHead>Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {userData.map((user) => (
            <TableRow key={user.nip}>
              <TableCell>{user.nip}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.createdAt}</TableCell>
              <TableCell>
                {user.status === "Aktif" ? (
                  <Tag color="green" type="filled" size="lg" className="w-full">
                    Aktif
                  </Tag>
                ) : (
                  <Tag
                    color="green"
                    type="with-border"
                    size="lg"
                    className="w-full"
                  >
                    Tidak Aktif
                  </Tag>
                )}
              </TableCell>
              <TableCell>
                <Button
                  onClick={() => handleResetPassword(user)}
                  size="md"
                  variant="ghost"
                  className="text-blue-500"
                >
                  Reset Password
                </Button>
              </TableCell>
              <TableCell>
                <div className="flex justify-center">
                  <Button
                    onClick={() => handleUserDetail(user)}
                    size="md"
                    variant="ghost"
                  >
                    <SearchIcon className="text-gray-800" />
                    Lihat
                  </Button>
                  <Link
                    to="/configuration/user-management/$id/edit"
                    params={{ id: String(user.id) }}
                  >
                    <Button size="md" variant="tertiary">
                      <PencilIcon />
                      Ubah
                    </Button>
                  </Link>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination
        currentPage={currentPage}
        totalPages={2}
        totalItems={3}
        pageSize={pageSize}
        onPageChange={setCurrentPage}
        onPageSizeChange={setPageSize}
      />

      {selectedUser && (
        <ResetPasswordDialog
          open={openResetPasswordDialog}
          user={selectedUser}
          setOpen={setOpenResetPasswordDialog}
        />
      )}

      {selectedUser && (
        <DetailUserDialog
          open={openUserDetailDialog}
          user={selectedUser}
          setOpen={setOpenUserDetailDialog}
        />
      )}
    </div>
  );
}
