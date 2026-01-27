import type { Meta, StoryObj } from "@storybook/react";
import { Tag } from "@/components/tags";
import {
  DataTable,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableContent,
  TableCustomHeader,
  TableHead,
  TableHeader,
  TableRow,
  TableWithCustomHeader,
} from "./table";

const meta = {
  title: "Components/Table",
  component: Table,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-25">Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">INV001</TableCell>
          <TableCell>Paid</TableCell>
          <TableCell>Credit Card</TableCell>
          <TableCell className="text-right">$250.00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">INV002</TableCell>
          <TableCell>Pending</TableCell>
          <TableCell>PayPal</TableCell>
          <TableCell className="text-right">$150.00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">INV003</TableCell>
          <TableCell>Unpaid</TableCell>
          <TableCell>Bank Transfer</TableCell>
          <TableCell className="text-right">$350.00</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};

interface User {
  id: string;
  name: string;
  email: string;
  status: "active" | "inactive";
}

const sampleData: Array<User> = [
  { id: "1", name: "John Doe", email: "john@example.com", status: "active" },
  { id: "2", name: "Jane Smith", email: "jane@example.com", status: "active" },
  {
    id: "3",
    name: "Bob Johnson",
    email: "bob@example.com",
    status: "inactive",
  },
];

export const DataTableExample: Story = {
  render: () => (
    <DataTable
      data={sampleData}
      columns={[
        {
          key: "id",
          header: "ID",
          render: (user) => <Tag color="blue">{user.id}</Tag>,
        },
        {
          key: "name",
          header: "Name",
          render: (user) => user.name,
        },
        {
          key: "email",
          header: "Email",
          render: (user) => user.email,
        },
        {
          key: "status",
          header: "Status",
          render: (user) => (
            <Tag color={user.status === "active" ? "green" : "red"}>
              {user.status}
            </Tag>
          ),
        },
      ]}
    />
  ),
};

export const EmptyDataTable: Story = {
  render: () => (
    <DataTable<User>
      data={[]}
      columns={[
        { key: "id", header: "ID", render: (item: User) => item.id },
        { key: "name", header: "Name", render: (item: User) => item.name },
      ]}
      emptyMessage="No users found"
    />
  ),
};

export const WithCustomHeader: Story = {
  render: () => (
    <TableWithCustomHeader>
      <TableCustomHeader>
        <p className="font-['Poppins'] text-base leading-6 font-bold text-foreground">
          Mata Kuliah [Menunggu Persetujuan]
        </p>
        <div className="flex items-center gap-5">
          <button
            disabled
            className="h-10 rounded-lg bg-gray-200 px-4 py-2 font-['Poppins'] text-base text-gray-500"
          >
            Setujui
          </button>
          <button className="h-10 rounded-lg border border-gray-300 bg-white px-4 py-2 font-['Poppins'] text-base">
            Tolak Pengajuan
          </button>
        </div>
      </TableCustomHeader>
      <TableContent>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">No</TableHead>
            <TableHead>Nama Kelas</TableHead>
            <TableHead>Nama Mata Kuliah</TableHead>
            <TableHead className="w-[60px]">SKS</TableHead>
            <TableHead className="w-[60px]">Nilai</TableHead>
            <TableHead>Prodi Lain</TableHead>
            <TableHead className="w-[100px]">Presensi Kehadiran</TableHead>
            <TableHead className="w-[75px]">Status UAS</TableHead>
            <TableHead className="w-[210px]">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>1</TableCell>
            <TableCell>Kerja Praktik - Ade Irawan - 2024 - 1</TableCell>
            <TableCell>52402 - Kerja Praktik</TableCell>
            <TableCell>2</TableCell>
            <TableCell>-</TableCell>
            <TableCell>Tidak</TableCell>
            <TableCell>100%</TableCell>
            <TableCell>OK</TableCell>
            <TableCell>
              <Tag color="yellow">Menunggu Persetujuan</Tag>
            </TableCell>
          </TableRow>
          <TableRow className="bg-muted/50">
            <TableCell>2</TableCell>
            <TableCell>Teori Bahasa dan Automata - CS2 - 2024</TableCell>
            <TableCell>52401 - Teori Bahasa dan Automata</TableCell>
            <TableCell>3</TableCell>
            <TableCell>-</TableCell>
            <TableCell>Tidak</TableCell>
            <TableCell>100%</TableCell>
            <TableCell>OK</TableCell>
            <TableCell>
              <Tag color="yellow">Menunggu Persetujuan</Tag>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>3</TableCell>
            <TableCell>Cipta Karsa - CS7 - 2024</TableCell>
            <TableCell>52401 - Cipta Karsa</TableCell>
            <TableCell>2</TableCell>
            <TableCell>-</TableCell>
            <TableCell>Tidak</TableCell>
            <TableCell>100%</TableCell>
            <TableCell>OK</TableCell>
            <TableCell>
              <Tag color="yellow">Menunggu Persetujuan</Tag>
            </TableCell>
          </TableRow>
        </TableBody>
      </TableContent>
    </TableWithCustomHeader>
  ),
};

export const CustomHeaderOnly: Story = {
  render: () => (
    <div className="rounded-xl border">
      <TableCustomHeader>
        <p className="font-['Poppins'] text-base leading-6 font-bold text-foreground">
          Daftar Mahasiswa
        </p>
        <div className="flex items-center gap-5">
          <button className="h-10 rounded-lg bg-primary px-4 py-2 font-['Poppins'] text-base text-white">
            Tambah
          </button>
          <button className="h-10 rounded-lg border border-gray-300 bg-white px-4 py-2 font-['Poppins'] text-base">
            Export
          </button>
        </div>
      </TableCustomHeader>
    </div>
  ),
};
