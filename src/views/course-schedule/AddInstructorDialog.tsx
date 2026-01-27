import { useCallback, useState } from "react";

import { Button } from "@/components/button";
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/dialog";
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
import { Typography } from "@/components/typography";

export interface Instructor {
  id: number;
  nip: string;
  name: string;
  studyProgram: string;
}

interface AddInstructorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (instructor: Instructor) => void;
}

// Sample instructor data
const availableInstructors: Array<Instructor> = [
  {
    id: 1,
    nip: "12001",
    name: "Ade Irawan, Ph. D",
    studyProgram: "Ilmu Komputer",
  },
  {
    id: 2,
    nip: "12001",
    name: "Dr. Tasmi, S.Si, M.Si",
    studyProgram: "Ilmu Komputer",
  },
  {
    id: 3,
    nip: "12001",
    name: "Rangga Ganzar Noegraha, Ph. D",
    studyProgram: "Ilmu Komputer",
  },
  {
    id: 4,
    nip: "12001",
    name: "Meredita Susanty, M.Sc",
    studyProgram: "Ilmu Komputer",
  },
  {
    id: 5,
    nip: "12001",
    name: "Randi Farmana Putra, M.Si",
    studyProgram: "Ilmu Komputer",
  },
];

export function AddInstructorDialog({
  open,
  onOpenChange,
  onSelect,
}: AddInstructorDialogProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const totalPages = Math.ceil(availableInstructors.length / pageSize);

  const handleSearch = useCallback(() => {
    console.log("Search:", searchQuery);
  }, [searchQuery]);

  const handleSelectInstructor = useCallback(
    (instructor: Instructor) => {
      onSelect(instructor);
      setSearchQuery("");
      onOpenChange(false);
    },
    [onSelect, onOpenChange]
  );

  const handleCancel = useCallback(() => {
    setSearchQuery("");
    onOpenChange(false);
  }, [onOpenChange]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="overflow-hidden rounded-xl border border-border p-0 data-[side=center]:max-w-[1106px]"
        showCloseButton
      >
        <DialogHeader className="rounded-t-xl border-0 border-b">
          <DialogTitle>Tambah Pengajar</DialogTitle>
        </DialogHeader>

        <DialogBody className="gap-3 rounded-b-xl border-0 p-0">
          {/* Search Section */}
          <div className="flex w-full items-center gap-5 px-5 py-3">
            <div className="w-[200px]">
              <Typography variant="body-small-bold">Cari Pengajar</Typography>
            </div>
            <div className="flex-1">
              <Input
                placeholder="Ketik NIP / Nama Pengajar / Pengajar Program Studi"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onClear={() => setSearchQuery("")}
              />
            </div>
            <Button
              size="lg"
              variant="secondary"
              onClick={handleSearch}
              disabled={!searchQuery}
            >
              Cari
            </Button>
          </div>

          {/* Table Section */}
          <div className="w-full px-5 py-3">
            <div className="overflow-hidden rounded-xl border border-border">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-300">
                    <TableHead className="w-[150px]">NIP</TableHead>
                    <TableHead>Nama Pengajar</TableHead>
                    <TableHead className="w-[238px]">
                      Pengajar Program Studi
                    </TableHead>
                    <TableHead className="w-[182px]">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {availableInstructors.map((instructor, index) => (
                    <TableRow
                      key={instructor.id}
                      className={index % 2 === 0 ? "bg-white" : "bg-muted"}
                    >
                      <TableCell className="text-center">
                        {instructor.nip}
                      </TableCell>
                      <TableCell className="text-center">
                        {instructor.name}
                      </TableCell>
                      <TableCell className="text-center">
                        {instructor.studyProgram}
                      </TableCell>
                      <TableCell className="text-center">
                        <Button
                          size="md"
                          variant="primary"
                          onClick={() => handleSelectInstructor(instructor)}
                        >
                          Pilih Pengajar Ini
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Footer Section */}
          <div className="flex w-full items-center justify-between px-5 py-5">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={availableInstructors.length}
              pageSize={pageSize}
              onPageChange={setCurrentPage}
              onPageSizeChange={setPageSize}
              showResultsInfo
            />
            <Button size="lg" variant="secondary" onClick={handleCancel}>
              Batal
            </Button>
          </div>
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
}
