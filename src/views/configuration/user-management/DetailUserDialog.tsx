import { Accordion } from "@/components/accordion";
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/dialog";
import { Input } from "@/components/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/table";
import { Typography } from "@/components/typography";

const userRoles = [
  {
    id: 1,
    role: "Admin Sistem",
    institution: "Teknik Elektro",
  },
  {
    id: 2,
    role: "Admin Fakultas",
    institution: "Teknik Elektro",
  },
];

interface User {
  id: number;
  nip: string;
  email: string;
  name: string;
  username: string;
  createdAt: string;
  status: string;
}

interface DetailUserDialogProps {
  open: boolean;
  user: User;
  setOpen: (open: boolean) => void;
}

export function DetailUserDialog({
  open,
  user,
  setOpen,
}: DetailUserDialogProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent side="center" className="data-[side=center]:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Lihat Informasi Detail Pengguna</DialogTitle>
        </DialogHeader>
        <DialogBody className="gap-0 px-0 py-0">
          <Accordion
            title="Informasi Detail Pengguna"
            className="w-full rounded-none"
          >
            <div className="grid w-full grid-cols-2 grid-rows-4 items-start justify-start gap-y-5">
              <label htmlFor="nip">
                <Typography variant="body-small-bold">NIP</Typography>
              </label>
              <Input id="nip" disabled value={user.nip} />
              <label htmlFor="nama_lengkap" className="font-semibold">
                <Typography variant="body-small-bold">Nama Lengkap</Typography>
              </label>
              <Input id="nama_lengkap" value={user.name} disabled />
              <label htmlFor="username" className="font-semibold">
                <Typography variant="body-small-bold">Username</Typography>
              </label>
              <Input id="username" disabled value={user.username} />
              <label htmlFor="email" className="font-semibold">
                <Typography variant="body-small-bold">Email</Typography>
              </label>
              <Input id="email" type="email" disabled value={user.email} />
            </div>
          </Accordion>
          <Accordion title="User Role" className="w-full rounded-t-none!">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nama Peran</TableHead>
                  <TableHead>Institusi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {userRoles.map((data) => (
                  <TableRow key={data.id}>
                    <TableCell>{data.role}</TableCell>
                    <TableCell>{data.institution}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Accordion>
          <DialogFooter></DialogFooter>
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
}
