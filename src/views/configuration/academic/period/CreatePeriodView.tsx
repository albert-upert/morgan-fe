import { Link } from "@tanstack/react-router";
import { useState } from "react";
import type { ReactNode } from "react";
import { Breadcrumb } from "uper-ui/breadcrumb";
import { Button } from "uper-ui/button";
import { DatePicker, YearPicker } from "uper-ui/date-picker";
import { ArrowLeftIcon } from "uper-ui/icon";
import { Input } from "uper-ui/input";
import { RadioGroup, RadioGroupItem } from "uper-ui/radio";
import { Switch } from "uper-ui/switch";
import { Textarea } from "uper-ui/textarea";
import { Typography } from "uper-ui/typography";

interface CreatePeriodViewProps {
  mode?: "create" | "edit";
}

export function CreatePeriodView({ mode = "create" }: CreatePeriodViewProps) {
  const isEditMode = mode === "edit";

  const [selected, setSelected] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [date, setDate] = useState<Date | null>(null);
  const [checked, setChecked] = useState(false);
  const [year, setYear] = useState<number | null>(null);
  const generatedValue = year ? `${year}/${year + 1}` : "";

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
            href: "/configuration/academic",
            label: "Akademik",
          },
          {
            label: "Periode Akademik",
          },
        ]}
      />
      <Typography variant="body-large-bold">
        {isEditMode ? "Ubah Periode Akademik" : "Tambah Periode Akademik"}
      </Typography>
      <Link to="/configuration/academic/$type" params={{ type: "period" }}>
        <Button size="lg" variant="tertiary">
          <ArrowLeftIcon className="text-red-500" />
          Periode Akademik
        </Button>
      </Link>
      <div className="flex flex-col gap-7 rounded-lg border border-gray-400 bg-white p-5">
        <Typography variant="body-medium-bold">
          Buat Periode Akademik
        </Typography>
        <FormRow label="Tahun">
          <YearPicker
            placeholder="Pilih tahun"
            minYear={2020}
            maxYear={2025}
            value={year}
            onChange={setYear}
          />
        </FormRow>
        <FormRow label="Semester">
          <RadioGroup
            value={selected}
            onValueChange={setSelected}
            className="flex-row! gap-15"
          >
            <RadioGroupItem value="ganjil" label="Ganjil" />
            <RadioGroupItem value="pendek" label="Pendek" />
            <RadioGroupItem value="genap" label="Genap" />
          </RadioGroup>
        </FormRow>
        <FormRow label="Tahun Akademik">
          <Input
            value={generatedValue}
            placeholder='Auto Fill (Tahun yang dipilih + "/" + Tahun berikutnya)'
          />
        </FormRow>
        <div className="grid grid-cols-2 gap-15">
          <FormRow label="Tanggal Mulai">
            <DatePicker
              placeholder="dd-mm-yyyy, hh:mm"
              value={date}
              onChange={setDate}
              suffixText=""
            />
          </FormRow>
          <FormRow label="Tanggal Berakhir">
            <DatePicker
              placeholder="dd-mm-yyyy, hh:mm"
              value={date}
              onChange={setDate}
              suffixText=""
            />
          </FormRow>
        </div>
        <FormRow label="Deskripsi">
          <Textarea
            placeholder="Tulis deskripsi disini"
            value={deskripsi}
            onChange={(e) => setDeskripsi(e.target.value)}
            maxLength={280}
            showCount
            helperText="Maksimal 280 karakter"
          />
        </FormRow>
        <FormRow label="Status">
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
        </FormRow>
        <div className="flex justify-end gap-4">
          <Button variant="secondary" className="w-38">
            Batal
          </Button>
          <Button className="w-38">Simpan</Button>
        </div>
      </div>
    </div>
  );
}

function FormRow({
  label,
  children,
}: {
  label: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="grid grid-cols-[14rem_1fr] items-center">
      <Typography variant="body-small-bold">{label}</Typography>
      {children}
    </div>
  );
}
