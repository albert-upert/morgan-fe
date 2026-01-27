import { Link } from "@tanstack/react-router";
import { useState } from "react";
import type { ReactNode } from "react";
import { Breadcrumb } from "@/components/breadcrumb";
import { Button } from "@/components/button";
import { Checkbox } from "@/components/checkbox";
import { ArrowLeftIcon } from "@/components/icon";
import { Input } from "@/components/input";
import { Switch } from "@/components/switch";
import { Typography } from "@/components/typography";

interface EventFlag {
  nilai: boolean;
  irs: boolean;
  lulus: boolean;
  registrasi: boolean;
  yudisium: boolean;
  survey: boolean;
  dosen: boolean;
}

interface CreateEventViewProps {
  mode?: "create" | "edit";
}

export function CreateEventView({ mode = "create" }: CreateEventViewProps) {
  const isEditMode = mode === "edit";

  const [eventFlag, setEventFlag] = useState<EventFlag>({
    nilai: false,
    irs: false,
    lulus: false,
    registrasi: false,
    yudisium: false,
    survey: false,
    dosen: false,
  });

  const [status, setStatus] = useState(false);

  const handleCheckedChange =
    (key: keyof EventFlag) => (checked: boolean | "indeterminate") => {
      setEventFlag((prev) => ({
        ...prev,
        [key]: checked === true,
      }));
    };

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
            label: "Event Akademik",
          },
        ]}
      />
      <Typography variant="body-large-bold">
        {isEditMode ? "Ubah Event Akademik" : "Tambah Event Akademik"}
      </Typography>
      <Link to="/configuration/academic/$type" params={{ type: "event" }}>
        <Button size="lg" variant="tertiary">
          <ArrowLeftIcon className="text-primary" />
          Event Akademik
        </Button>
      </Link>
      <div className="flex flex-col gap-7 rounded-lg border border-gray-400 bg-white p-5">
        <Typography variant="body-medium-bold">
          {isEditMode ? "Ubah Event Akademik" : "Buat Event Akademik"}
        </Typography>
        <FormRow label="Tahun Akademik">
          <Input placeholder="Nama Event" />
        </FormRow>
        <FormRow label="Flag">
          <div className="flex flex-row gap-10">
            <FormCheckBox label="Nilai">
              <Checkbox
                checked={eventFlag.nilai}
                onCheckedChange={handleCheckedChange("nilai")}
              />
            </FormCheckBox>
            <FormCheckBox label="IRS">
              <Checkbox
                checked={eventFlag.irs}
                onCheckedChange={handleCheckedChange("irs")}
              />
            </FormCheckBox>
            <FormCheckBox label="Lulus">
              <Checkbox
                checked={eventFlag.lulus}
                onCheckedChange={handleCheckedChange("lulus")}
              />
            </FormCheckBox>
            <FormCheckBox label="Registrasi">
              <Checkbox
                checked={eventFlag.registrasi}
                onCheckedChange={handleCheckedChange("registrasi")}
              />
            </FormCheckBox>
            <FormCheckBox label="Yudisium">
              <Checkbox
                checked={eventFlag.yudisium}
                onCheckedChange={handleCheckedChange("yudisium")}
              />
            </FormCheckBox>
            <FormCheckBox label="Survey">
              <Checkbox
                checked={eventFlag.survey}
                onCheckedChange={handleCheckedChange("survey")}
              />
            </FormCheckBox>
            <FormCheckBox label="Dosen">
              <Checkbox
                checked={eventFlag.dosen}
                onCheckedChange={handleCheckedChange("dosen")}
              />
            </FormCheckBox>
          </div>
        </FormRow>
        <FormRow label="Status">
          <div className="flex items-center gap-3">
            <Switch id="status" checked={status} onCheckedChange={setStatus} />
            <span className="text-sm font-semibold">
              {status ? "Aktif" : "Tidak Aktif"}
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

function FormCheckBox({
  label,
  children,
}: {
  label: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="flex items-center gap-3">
      {children}
      <label className="text-sm font-normal text-foreground">{label}</label>
    </div>
  );
}
