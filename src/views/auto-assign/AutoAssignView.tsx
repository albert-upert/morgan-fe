import { Link } from "@tanstack/react-router";
import { useCallback, useState } from "react";

import { Breadcrumb } from "uper-ui/breadcrumb";
import { Button } from "uper-ui/button";
import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
} from "uper-ui/dropdown";
import { CaretDownIcon, ExternalLinkIcon } from "uper-ui/icon";
import { Input } from "uper-ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "uper-ui/table";
import { Typography } from "uper-ui/typography";

const programOptions = [
  { label: "Reguler", value: "regular" },
  { label: "Double Degree", value: "double-degree" },
  { label: "Karyawan", value: "employee" },
];

const periodOptions = [
  { label: "2024 - Ganjil", value: "2024-ganjil" },
  { label: "2024 - Genap", value: "2024-genap" },
  { label: "2023 - Ganjil", value: "2023-ganjil" },
  { label: "2023 - Genap", value: "2023-genap" },
];

const batchOptions = [
  { label: "2023", value: "2023" },
  { label: "2022", value: "2022" },
  { label: "2021", value: "2021" },
  { label: "2020", value: "2020" },
];

interface AssignedData {
  id: number;
  programName: string;
  period: string;
  batch: string;
}

// Mock data for the table
const mockAssignedData: Array<AssignedData> = [
  {
    id: 1,
    programName: "Reguler",
    period: "2024 - Ganjil",
    batch: "2023",
  },
  {
    id: 2,
    programName: "Double Degree",
    period: "2024 - Ganjil",
    batch: "2023",
  },
  {
    id: 3,
    programName: "Karyawan",
    period: "2024 - Ganjil",
    batch: "2023",
  },
];

export function AutoAssignView() {
  const [studyProgram] = useState("Teknik Kimia");
  const [selectedProgram, setSelectedProgram] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState("");
  const [selectedBatch, setSelectedBatch] = useState("");
  const [assignedData, setAssignedData] =
    useState<Array<AssignedData>>(mockAssignedData);

  const handleBack = useCallback(() => {
    // Handle back action
    console.warn("Back clicked");
  }, []);

  const handleAssign = useCallback(() => {
    if (selectedProgram && selectedPeriod && selectedBatch) {
      const newItem: AssignedData = {
        id: assignedData.length + 1,
        programName: selectedProgram,
        period: selectedPeriod,
        batch: selectedBatch,
      };
      setAssignedData([...assignedData, newItem]);
      console.warn("Assign clicked", {
        program: selectedProgram,
        period: selectedPeriod,
        batch: selectedBatch,
      });
    }
  }, [selectedProgram, selectedPeriod, selectedBatch, assignedData]);

  const handleViewClassList = useCallback(() => {
    console.warn("View class list clicked");
  }, []);

  return (
    <div className="flex flex-col gap-5 pt-5">
      <Breadcrumb
        items={[
          { href: "/", label: "Beranda" },
          { label: "Auto Assign Peserta Kelas Perkuliahan" },
        ]}
      />
      <Typography variant="h6">
        Auto Assign Peserta Kelas Perkuliahan
      </Typography>

      <div className="flex flex-col gap-5">
        {/* Filter Form */}
        <div className="flex flex-col rounded-xl border border-border bg-white pt-2.5 pb-5">
          {/* Program Studi - Read Only */}
          <div className="flex items-center gap-[105px] px-5 py-3">
            <div className="w-[200px]">
              <Typography variant="body-small-bold">Program Studi</Typography>
            </div>
            <Input
              value={studyProgram}
              disabled
              className="flex-1 bg-muted"
              wrapperClassName="flex-1"
            />
          </div>

          {/* Program */}
          <div className="flex items-center gap-[105px] px-5 py-3">
            <div className="w-[200px]">
              <Typography variant="body-small-bold">Program</Typography>
            </div>
            <div className="flex-1">
              <Dropdown>
                <DropdownTrigger asChild>
                  <button
                    type="button"
                    className="flex h-10 w-full items-center justify-between rounded-lg border border-input bg-white px-3 py-2 text-sm"
                  >
                    <span
                      className={
                        selectedProgram
                          ? "text-foreground"
                          : "text-muted-foreground"
                      }
                    >
                      {selectedProgram || "Program"}
                    </span>
                    <CaretDownIcon className="size-5 text-muted-foreground" />
                  </button>
                </DropdownTrigger>
                <DropdownContent>
                  {programOptions.map((option) => (
                    <DropdownItem
                      key={option.value}
                      onSelect={() => setSelectedProgram(option.label)}
                    >
                      {option.label}
                    </DropdownItem>
                  ))}
                </DropdownContent>
              </Dropdown>
            </div>
          </div>

          {/* Periode */}
          <div className="flex items-center gap-[105px] px-5 py-3">
            <div className="w-[200px]">
              <Typography variant="body-small-bold">Periode</Typography>
            </div>
            <div className="flex-1">
              <Dropdown>
                <DropdownTrigger asChild>
                  <button
                    type="button"
                    className="flex h-10 w-full items-center justify-between rounded-lg border border-input bg-white px-3 py-2 text-sm"
                  >
                    <span
                      className={
                        selectedPeriod
                          ? "text-foreground"
                          : "text-muted-foreground"
                      }
                    >
                      {selectedPeriod || "Periode"}
                    </span>
                    <CaretDownIcon className="size-5 text-muted-foreground" />
                  </button>
                </DropdownTrigger>
                <DropdownContent>
                  {periodOptions.map((option) => (
                    <DropdownItem
                      key={option.value}
                      onSelect={() => setSelectedPeriod(option.label)}
                    >
                      {option.label}
                    </DropdownItem>
                  ))}
                </DropdownContent>
              </Dropdown>
            </div>
          </div>

          {/* Angkatan */}
          <div className="flex items-center gap-[105px] px-5 py-3">
            <div className="w-[200px]">
              <Typography variant="body-small-bold">Angkatan</Typography>
            </div>
            <div className="flex-1">
              <Dropdown>
                <DropdownTrigger asChild>
                  <button
                    type="button"
                    className="flex h-10 w-full items-center justify-between rounded-lg border border-input bg-white px-3 py-2 text-sm"
                  >
                    <span
                      className={
                        selectedBatch
                          ? "text-foreground"
                          : "text-muted-foreground"
                      }
                    >
                      {selectedBatch || "Angkatan"}
                    </span>
                    <CaretDownIcon className="size-5 text-muted-foreground" />
                  </button>
                </DropdownTrigger>
                <DropdownContent>
                  {batchOptions.map((option) => (
                    <DropdownItem
                      key={option.value}
                      onSelect={() => setSelectedBatch(option.label)}
                    >
                      {option.label}
                    </DropdownItem>
                  ))}
                </DropdownContent>
              </Dropdown>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between rounded-xl bg-white p-5">
          <div className="flex items-center gap-5">
            <Button size="lg" variant="secondary" onClick={handleBack} disabled>
              Kembali
            </Button>
            <Button size="lg" variant="primary" onClick={handleAssign}>
              Assign
            </Button>
          </div>
          <div className="flex items-center gap-5">
            <Link to="/auto-assign/class-list">
              <Button size="lg" variant="primary" onClick={handleViewClassList}>
                Lihat Daftar Kelas
                <ExternalLinkIcon className="size-5" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Data Table */}
        <div className="rounded-xl border border-border bg-white p-5">
          <Table>
            <TableHeader className="bg-gray-300">
              <TableRow>
                <TableHead className="w-[44px]">No</TableHead>
                <TableHead className="w-[200px]">Nama Program</TableHead>
                <TableHead>Periode</TableHead>
                <TableHead className="w-[200px]">Angkatan</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {assignedData.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{item.programName}</TableCell>
                  <TableCell>{item.period}</TableCell>
                  <TableCell>{item.batch}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
