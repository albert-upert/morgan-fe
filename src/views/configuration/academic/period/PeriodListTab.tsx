import { Link } from "@tanstack/react-router";
import { useCallback, useState } from "react";
import { Button } from "uper-ui/button";
import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
} from "uper-ui/dropdown";
import { PencilIcon, SearchIcon, SortIcon, TrashIcon } from "uper-ui/icon";
import { Input } from "uper-ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "uper-ui/table";
import { Tag } from "uper-ui/tags";
import { DeletePeriodDialog } from "./DeletePeriodDialog";
import { DetailPeriodDialog } from "./DetailPeriodDialog";

interface AcademicPeriod {
  id: number;
  year: string;
  semester: string;
  academic_year: string;
  status: string;
}

const dataPeriode: Array<AcademicPeriod> = [
  {
    id: 1,
    year: "2019",
    semester: "Ganjil",
    academic_year: "2019/2020",
    status: "Aktif",
  },
  {
    id: 2,
    year: "2019",
    semester: "Pendek",
    academic_year: "2019/2020",
    status: "Tidak Aktif",
  },
  {
    id: 3,
    year: "2019",
    semester: "Genap",
    academic_year: "2019/2020",
    status: "Aktif",
  },
  {
    id: 4,
    year: "2020",
    semester: "Ganjil",
    academic_year: "2020/2021",
    status: "Aktif",
  },
  {
    id: 5,
    year: "2020",
    semester: "Pendek",
    academic_year: "2020/2021",
    status: "Tidak Aktif",
  },
  {
    id: 6,
    year: "2020",
    semester: "Genap",
    academic_year: "2020/2021",
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

export function PeriodListTab() {
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [periodId, setPeriodId] = useState<number | null>(null);
  const [viewDialog, setViewDialog] = useState<boolean>(false);
  const [deleteDialog, setDeleteDialog] = useState<boolean>(false);

  const handleView = useCallback((selectPeriod: number) => {
    setViewDialog(true);
    setPeriodId(selectPeriod);
  }, []);

  const handleDelete = useCallback((selectPeriod: number) => {
    setDeleteDialog(true);
    setPeriodId(selectPeriod);
  }, []);
  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-end">
        <Link to="/configuration/academic/period/create">
          <Button>Tambah Periode Akademik</Button>
        </Link>
      </div>
      <div className="grid grid-cols-2 rounded-lg border border-gray-400 p-5">
        <Input
          size="lg"
          placeholder="year/Semester/year Akademik/Status"
          endIcon={<SearchIcon className="size-5 text-muted-foreground" />}
        />
        <div className="flex justify-end">
          <Dropdown>
            <DropdownTrigger asChild>
              <Button size="lg" variant="secondary">
                {selectedFilter ?? "Urutkan"}
                <SortIcon></SortIcon>
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
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>year</TableHead>
            <TableHead>Semester</TableHead>
            <TableHead>year Akademik</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {dataPeriode.map((period) => (
            <TableRow key={period.id}>
              <TableCell>{period.year}</TableCell>
              <TableCell>{period.semester}</TableCell>
              <TableCell>{period.academic_year}</TableCell>
              <TableCell>
                {period.status === "Aktif" ? (
                  <Tag color="green" type="filled" size="lg" className="w-25">
                    Aktif
                  </Tag>
                ) : (
                  <Tag
                    color="green"
                    type="with-border"
                    size="lg"
                    className="w-25"
                  >
                    Tidak Aktif
                  </Tag>
                )}
              </TableCell>
              <TableCell className="w-54">
                <div className="flex justify-center">
                  <Button
                    onClick={() => handleView(period.id)}
                    size="md"
                    variant="ghost"
                  >
                    <SearchIcon className="text-gray-800" />
                    Lihat
                  </Button>
                  <Link
                    to="/configuration/academic/period/$id/edit"
                    params={{ id: String(period.id) }}
                  >
                    <Button size="md" variant="tertiary">
                      <PencilIcon />
                      Ubah
                    </Button>
                  </Link>
                  <Button
                    onClick={() => handleDelete(period.id)}
                    size="md"
                    variant="ghost"
                    className="text-gray-600"
                  >
                    <TrashIcon />
                    Hapus
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {periodId && (
        <DetailPeriodDialog
          open={viewDialog}
          periodId={periodId}
          setOpen={setViewDialog}
        />
      )}

      {periodId && (
        <DeletePeriodDialog
          open={deleteDialog}
          periodId={periodId}
          setOpen={setDeleteDialog}
        />
      )}
    </div>
  );
}
