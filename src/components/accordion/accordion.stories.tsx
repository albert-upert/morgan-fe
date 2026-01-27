import type { Meta, StoryObj } from "@storybook/react";
import Typography from "@/components/typography/typography";
import { Accordion, AccordionGroup, AccordionRow } from "./accordion";

const meta = {
  title: "Components/Accordion",
  component: Accordion,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: "text",
      description: "The title displayed in the accordion header",
    },
    defaultExpanded: {
      control: "boolean",
      description: "Whether the accordion starts expanded",
    },
    variant: {
      control: "select",
      options: ["default", "gradient"],
      description: "Visual variant of the accordion",
    },
    data: {
      control: "object",
      description:
        "Dynamic data array for key-value rows (auto-stripes based on index)",
    },
  },
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Accordion
export const Default: Story = {
  args: {
    title: "User Role",
    defaultExpanded: false,
  },
  render: (args) => (
    <div className="w-[700px]">
      <Accordion {...args}>
        <div className="space-y-2">
          <Typography variant="body-small" className="text-gray-700">
            This is the accordion content. You can put any React children here.
          </Typography>
        </div>
      </Accordion>
    </div>
  ),
};

// Expanded by default
export const ExpandedByDefault: Story = {
  args: {
    title: "User Role",
    defaultExpanded: true,
  },
  render: (args) => (
    <div className="w-[700px]">
      <Accordion {...args}>
        <div className="space-y-2">
          <Typography variant="body-small" className="text-gray-700">
            This accordion starts expanded by default.
          </Typography>
        </div>
      </Accordion>
    </div>
  ),
};

// Sample data for dynamic rendering
const personalData = [
  { label: "Nama Mahasiswa", value: "Fauzan Akmal Mukhlas" },
  { label: "Nomor Induk Mahasiswa", value: "105221015" },
  { label: "Judul Tugas Akhir", value: "-" },
  { label: "Nomor Induk Kependudukan", value: "33333333333333333" },
  { label: "Kota Lahir", value: "Jakarta Selatan" },
  { label: "Tanggal Lahir", value: "01 - 02 - 2025" },
  { label: "Agama", value: "Islam" },
  { label: "Jenis Kelamin", value: "Pria" },
  { label: "Kewarganegaraan", value: "WNI" },
  { label: "Email", value: "siup@universitaspertamina.ac.id" },
];

// Gradient Variant with Dynamic Data (matching Figma design)
export const GradientVariant: Story = {
  args: {
    title: "Data Pribadi",
    defaultExpanded: true,
    variant: "gradient",
    data: personalData,
  },
  render: (args) => (
    <div className="w-[700px]">
      <Accordion {...args} />
    </div>
  ),
};

// Gradient Variant with Manual Children (for custom content)
export const GradientVariantManual: Story = {
  args: {
    title: "Data Pribadi",
    defaultExpanded: true,
    variant: "gradient",
  },
  render: (args) => (
    <div className="w-[700px]">
      <Accordion {...args}>
        <AccordionRow
          label="Nama Mahasiswa"
          value="Fauzan Akmal Mukhlas"
          striped
        />
        <AccordionRow label="Nomor Induk Mahasiswa" value="105221015" />
        <AccordionRow label="Judul Tugas Akhir" value="-" striped />
        <AccordionRow
          label="Nomor Induk Kependudukan"
          value="33333333333333333"
        />
        <AccordionRow label="Kota Lahir" value="Jakarta Selatan" striped />
        <AccordionRow label="Tanggal Lahir" value="01 - 02 - 2025" />
        <AccordionRow label="Agama" value="Islam" striped />
        <AccordionRow label="Jenis Kelamin" value="Pria" />
        <AccordionRow label="Kewarganegaraan" value="WNI" striped />
        <AccordionRow label="Email" value="siup@universitaspertamina.ac.id" />
      </Accordion>
    </div>
  ),
};

// Gradient Variant Collapsed
export const GradientVariantCollapsed: Story = {
  args: {
    title: "Data Pribadi",
    defaultExpanded: false,
    variant: "gradient",
  },
  render: (args) => (
    <div className="w-[700px]">
      <Accordion {...args}>
        <AccordionRow
          label="Nama Mahasiswa"
          value="Fauzan Akmal Mukhlas"
          striped
        />
        <AccordionRow label="Nomor Induk Mahasiswa" value="105221015" />
      </Accordion>
    </div>
  ),
};

// With Table Content (original design)
export const WithTableContent: Story = {
  args: {
    title: "User Role",
    defaultExpanded: true,
  },
  render: (args) => (
    <div className="w-[700px]">
      <Accordion {...args}>
        <div className="overflow-hidden rounded-xl border border-border">
          {/* Table Header */}
          <div className="flex items-center justify-center border-b border-border bg-gradient-to-r from-card to-navbar-gradient-end px-0 py-5">
            <div className="flex w-[200px] items-center justify-center p-2">
              <Typography variant="body-medium-bold">Nama Role</Typography>
            </div>
            <div className="flex w-[200px] items-center justify-center p-2">
              <Typography variant="body-medium-bold">Nama Institusi</Typography>
            </div>
          </div>
          {/* Table Rows */}
          <div className="flex items-center justify-center border-b border-border bg-muted px-0 py-3">
            <div className="flex w-[200px] items-center justify-center p-2">
              <Typography variant="body-small" className="text-gray-700">
                Admin Fakultas
              </Typography>
            </div>
            <div className="flex w-[200px] items-center justify-center p-2">
              <Typography variant="body-small-bold">Teknik Elektro</Typography>
            </div>
          </div>
          <div className="flex items-center justify-center border-b border-border bg-muted px-0 py-3">
            <div className="flex w-[200px] items-center justify-center p-2">
              <Typography variant="body-small" className="text-gray-700">
                Admin Program Studi
              </Typography>
            </div>
            <div className="flex w-[200px] items-center justify-center p-2">
              <Typography variant="body-small-bold">Teknik Elektro</Typography>
            </div>
          </div>
          <div className="flex items-center justify-center bg-muted px-0 py-3">
            <div className="flex w-[200px] items-center justify-center p-2">
              <Typography variant="body-small" className="text-gray-700">
                Admin Sistem
              </Typography>
            </div>
            <div className="flex w-[200px] items-center justify-center p-2">
              <Typography variant="body-small-bold">Teknik Elektro</Typography>
            </div>
          </div>
        </div>
      </Accordion>
    </div>
  ),
};

// With Simple List Content
export const WithListContent: Story = {
  args: {
    title: "Settings",
    defaultExpanded: true,
  },
  render: (args) => (
    <div className="w-[500px]">
      <Accordion {...args}>
        <ul className="space-y-3">
          <li className="flex items-center gap-3">
            <div className="size-2 rounded-full bg-primary" />
            <Typography variant="body-small">General Settings</Typography>
          </li>
          <li className="flex items-center gap-3">
            <div className="size-2 rounded-full bg-primary" />
            <Typography variant="body-small">Privacy Settings</Typography>
          </li>
          <li className="flex items-center gap-3">
            <div className="size-2 rounded-full bg-primary" />
            <Typography variant="body-small">Notification Settings</Typography>
          </li>
        </ul>
      </Accordion>
    </div>
  ),
};

// Accordion Group
export const Group: Story = {
  args: {
    title: "",
  },
  render: () => (
    <div className="w-[500px]">
      <AccordionGroup>
        <Accordion title="Section 1" defaultExpanded>
          <Typography variant="body-small" className="text-gray-700">
            Content for section 1. This section is expanded by default.
          </Typography>
        </Accordion>
        <Accordion title="Section 2">
          <Typography variant="body-small" className="text-gray-700">
            Content for section 2.
          </Typography>
        </Accordion>
        <Accordion title="Section 3">
          <Typography variant="body-small" className="text-gray-700">
            Content for section 3.
          </Typography>
        </Accordion>
      </AccordionGroup>
    </div>
  ),
};

// Exclusive Accordion Group (only one can be open at a time)
export const ExclusiveGroup: Story = {
  args: {
    title: "",
  },
  render: () => (
    <div className="w-[500px]">
      <AccordionGroup exclusive>
        <Accordion title="FAQ Question 1">
          <Typography variant="body-small" className="text-gray-700">
            Answer to FAQ question 1. In exclusive mode, only one accordion can
            be open at a time.
          </Typography>
        </Accordion>
        <Accordion title="FAQ Question 2">
          <Typography variant="body-small" className="text-gray-700">
            Answer to FAQ question 2. Opening this will close the others.
          </Typography>
        </Accordion>
        <Accordion title="FAQ Question 3">
          <Typography variant="body-small" className="text-gray-700">
            Answer to FAQ question 3.
          </Typography>
        </Accordion>
      </AccordionGroup>
    </div>
  ),
};

// Sample data for multiple accordions
const academicData = [
  { label: "Program Studi", value: "Teknik Informatika" },
  { label: "Fakultas", value: "Fakultas Teknologi Industri" },
  { label: "Angkatan", value: "2021" },
];

const parentData = [
  { label: "Nama Ayah", value: "Ahmad" },
  { label: "Nama Ibu", value: "Maulini" },
];

const smtaData = [
  { label: "Nama Sekolah", value: "SMA Negeri 1 Jakarta" },
  { label: "Tahun Lulus", value: "2021" },
  { label: "Jurusan", value: "IPA" },
];

// Multiple Gradient Accordions with Dynamic Data (matching Figma design)
export const MultipleGradientAccordions: Story = {
  args: {
    title: "",
  },
  render: () => (
    <div className="w-[700px] space-y-4">
      <Accordion
        title="Data Pribadi"
        variant="gradient"
        defaultExpanded
        data={personalData}
      />
      <Accordion title="Data Akademik" variant="gradient" data={academicData} />
      <Accordion title="Data Orang Tua" variant="gradient" data={parentData} />
      <Accordion title="Data SMTA" variant="gradient" data={smtaData} />
    </div>
  ),
};

// With Custom Children
export const WithCustomChildren: Story = {
  args: {
    title: "Custom Content",
    defaultExpanded: true,
  },
  render: (args) => (
    <div className="w-[500px]">
      <Accordion {...args}>
        <div className="flex flex-col gap-4">
          <div className="rounded-lg bg-muted p-4">
            <Typography variant="body-small-bold" className="mb-2">
              Card Inside Accordion
            </Typography>
            <Typography variant="body-small" className="text-gray-700">
              You can put any content here, including cards, forms, tables, etc.
            </Typography>
          </div>
          <div className="flex gap-2">
            <button className="rounded-lg bg-primary px-4 py-2 text-primary-foreground">
              Action 1
            </button>
            <button className="rounded-lg border border-border px-4 py-2">
              Action 2
            </button>
          </div>
        </div>
      </Accordion>
    </div>
  ),
};
