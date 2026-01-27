import type { Meta, StoryObj } from "@storybook/react";
import { IpkTag, SemesterTag, Tag } from "./tags";

const meta = {
  title: "Components/Tags",
  component: Tag,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Tag color="red" type="with-border" size="xl" rounded="default">
      Label Tag
    </Tag>
  ),
};

export const AllColors: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Tag color="red" type="with-border">
        Red Tag
      </Tag>
      <Tag color="green" type="with-border">
        Green Tag
      </Tag>
      <Tag color="yellow" type="with-border">
        Yellow Tag
      </Tag>
      <Tag color="blue" type="with-border">
        Blue Tag
      </Tag>
    </div>
  ),
};

export const AllTypes: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Monochrome</h4>
        <div className="flex flex-wrap gap-4">
          <Tag color="red" type="monochrome">
            Red
          </Tag>
          <Tag color="green" type="monochrome">
            Green
          </Tag>
          <Tag color="yellow" type="monochrome">
            Yellow
          </Tag>
          <Tag color="blue" type="monochrome">
            Blue
          </Tag>
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-medium">With Border</h4>
        <div className="flex flex-wrap gap-4">
          <Tag color="red" type="with-border">
            Red
          </Tag>
          <Tag color="green" type="with-border">
            Green
          </Tag>
          <Tag color="yellow" type="with-border">
            Yellow
          </Tag>
          <Tag color="blue" type="with-border">
            Blue
          </Tag>
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-medium">Filled</h4>
        <div className="flex flex-wrap gap-4">
          <Tag color="red" type="filled">
            Red
          </Tag>
          <Tag color="green" type="filled">
            Green
          </Tag>
          <Tag color="yellow" type="filled">
            Yellow
          </Tag>
          <Tag color="blue" type="filled">
            Blue
          </Tag>
        </div>
      </div>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Extra Large (XL)</h4>
        <div className="flex flex-wrap gap-4">
          <Tag color="red" type="with-border" size="xl">
            Label Tag
          </Tag>
          <Tag color="green" type="filled" size="xl">
            Label Tag
          </Tag>
          <Tag color="blue" type="monochrome" size="xl">
            Label Tag
          </Tag>
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-medium">Large (LG)</h4>
        <div className="flex flex-wrap gap-4">
          <Tag color="red" type="with-border" size="lg">
            Label Tag
          </Tag>
          <Tag color="green" type="filled" size="lg">
            Label Tag
          </Tag>
          <Tag color="blue" type="monochrome" size="lg">
            Label Tag
          </Tag>
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-medium">Medium (MD)</h4>
        <div className="flex flex-wrap gap-4">
          <Tag color="red" type="with-border" size="md">
            Label Tag
          </Tag>
          <Tag color="green" type="filled" size="md">
            Label Tag
          </Tag>
          <Tag color="blue" type="monochrome" size="md">
            Label Tag
          </Tag>
        </div>
      </div>
    </div>
  ),
};

export const AllRounded: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Default Rounded</h4>
        <div className="flex flex-wrap gap-4">
          <Tag color="red" type="with-border" rounded="default">
            Label Tag
          </Tag>
          <Tag color="green" type="filled" rounded="default">
            Label Tag
          </Tag>
          <Tag color="blue" type="monochrome" rounded="default">
            Label Tag
          </Tag>
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-medium">Pill Rounded</h4>
        <div className="flex flex-wrap gap-4">
          <Tag color="red" type="with-border" rounded="pill">
            Label Tag
          </Tag>
          <Tag color="green" type="filled" rounded="pill">
            Label Tag
          </Tag>
          <Tag color="blue" type="monochrome" rounded="pill">
            Label Tag
          </Tag>
        </div>
      </div>
    </div>
  ),
};

export const AllVariations: Story = {
  render: () => (
    <div className="w-[900px] space-y-8">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Red Tags</h3>
        <div className="grid grid-cols-6 gap-4">
          <Tag color="red" type="monochrome" size="xl">
            Label Tag
          </Tag>
          <Tag color="red" type="monochrome" size="lg">
            Label Tag
          </Tag>
          <Tag color="red" type="monochrome" size="md">
            Label Tag
          </Tag>
          <Tag color="red" type="monochrome" size="xl" rounded="pill">
            Label Tag
          </Tag>
          <Tag color="red" type="monochrome" size="lg" rounded="pill">
            Label Tag
          </Tag>
          <Tag color="red" type="monochrome" size="md" rounded="pill">
            Label Tag
          </Tag>

          <Tag color="red" type="with-border" size="xl">
            Label Tag
          </Tag>
          <Tag color="red" type="with-border" size="lg">
            Label Tag
          </Tag>
          <Tag color="red" type="with-border" size="md">
            Label Tag
          </Tag>
          <Tag color="red" type="with-border" size="xl" rounded="pill">
            Label Tag
          </Tag>
          <Tag color="red" type="with-border" size="lg" rounded="pill">
            Label Tag
          </Tag>
          <Tag color="red" type="with-border" size="md" rounded="pill">
            Label Tag
          </Tag>

          <Tag color="red" type="filled" size="xl">
            Label Tag
          </Tag>
          <Tag color="red" type="filled" size="lg">
            Label Tag
          </Tag>
          <Tag color="red" type="filled" size="md">
            Label Tag
          </Tag>
          <Tag color="red" type="filled" size="xl" rounded="pill">
            Label Tag
          </Tag>
          <Tag color="red" type="filled" size="lg" rounded="pill">
            Label Tag
          </Tag>
          <Tag color="red" type="filled" size="md" rounded="pill">
            Label Tag
          </Tag>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Green Tags</h3>
        <div className="grid grid-cols-6 gap-4">
          <Tag color="green" type="monochrome" size="xl">
            Label Tag
          </Tag>
          <Tag color="green" type="monochrome" size="lg">
            Label Tag
          </Tag>
          <Tag color="green" type="monochrome" size="md">
            Label Tag
          </Tag>
          <Tag color="green" type="monochrome" size="xl" rounded="pill">
            Label Tag
          </Tag>
          <Tag color="green" type="monochrome" size="lg" rounded="pill">
            Label Tag
          </Tag>
          <Tag color="green" type="monochrome" size="md" rounded="pill">
            Label Tag
          </Tag>

          <Tag color="green" type="with-border" size="xl">
            Label Tag
          </Tag>
          <Tag color="green" type="with-border" size="lg">
            Label Tag
          </Tag>
          <Tag color="green" type="with-border" size="md">
            Label Tag
          </Tag>
          <Tag color="green" type="with-border" size="xl" rounded="pill">
            Label Tag
          </Tag>
          <Tag color="green" type="with-border" size="lg" rounded="pill">
            Label Tag
          </Tag>
          <Tag color="green" type="with-border" size="md" rounded="pill">
            Label Tag
          </Tag>

          <Tag color="green" type="filled" size="xl">
            Label Tag
          </Tag>
          <Tag color="green" type="filled" size="lg">
            Label Tag
          </Tag>
          <Tag color="green" type="filled" size="md">
            Label Tag
          </Tag>
          <Tag color="green" type="filled" size="xl" rounded="pill">
            Label Tag
          </Tag>
          <Tag color="green" type="filled" size="lg" rounded="pill">
            Label Tag
          </Tag>
          <Tag color="green" type="filled" size="md" rounded="pill">
            Label Tag
          </Tag>
        </div>
      </div>
    </div>
  ),
};

export const SemesterTags: Story = {
  render: () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Semester Tags</h3>
      <div className="flex flex-wrap gap-3">
        <SemesterTag semester="1" />
        <SemesterTag semester="2" />
        <SemesterTag semester="3" />
        <SemesterTag semester="4" />
        <SemesterTag semester="5" />
        <SemesterTag semester="6" />
        <SemesterTag semester="7" />
        <SemesterTag semester="8" />
        <SemesterTag semester="pendek" />
      </div>
    </div>
  ),
};

export const IpkTags: Story = {
  render: () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">IPK Tags</h3>
      <div className="flex flex-col gap-4">
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Default State</h4>
          <IpkTag
            ipk="IPK : 3.58"
            iconSrc="https://www.figma.com/api/mcp/asset/4b479d6e-f0d2-4879-8c2e-bcc2748dcf1e"
          />
        </div>
        <div className="space-y-2 rounded bg-gray-800 p-4">
          <h4 className="text-sm font-medium text-white">Disabled State</h4>
          <IpkTag
            ipk="IPK : 3.58"
            disabled
            iconSrc="https://www.figma.com/api/mcp/asset/4b479d6e-f0d2-4879-8c2e-bcc2748dcf1e"
          />
        </div>
      </div>
    </div>
  ),
};

export const RealWorldExample: Story = {
  render: () => (
    <div className="w-[600px] space-y-6">
      <h3 className="text-lg font-semibold">Status Tags Example</h3>

      <div className="rounded-lg border border-border bg-white p-4">
        <div className="mb-3 flex items-center justify-between">
          <h4 className="font-medium">Order #12345</h4>
          <Tag color="green" type="filled" size="lg">
            Completed
          </Tag>
        </div>
        <p className="text-sm text-muted-foreground">
          Order delivered successfully on Jan 5, 2026
        </p>
      </div>

      <div className="rounded-lg border border-border bg-white p-4">
        <div className="mb-3 flex items-center justify-between">
          <h4 className="font-medium">Order #12344</h4>
          <Tag color="yellow" type="filled" size="lg">
            Processing
          </Tag>
        </div>
        <p className="text-sm text-muted-foreground">
          Order is being processed and will ship soon
        </p>
      </div>

      <div className="rounded-lg border border-border bg-white p-4">
        <div className="mb-3 flex items-center justify-between">
          <h4 className="font-medium">Order #12343</h4>
          <Tag color="blue" type="filled" size="lg">
            Shipped
          </Tag>
        </div>
        <p className="text-sm text-muted-foreground">
          Order shipped via FedEx, tracking: FD123456789
        </p>
      </div>

      <div className="rounded-lg border border-border bg-white p-4">
        <div className="mb-3 flex items-center justify-between">
          <h4 className="font-medium">Order #12342</h4>
          <Tag color="red" type="filled" size="lg">
            Cancelled
          </Tag>
        </div>
        <p className="text-sm text-muted-foreground">
          Order cancelled by customer
        </p>
      </div>
    </div>
  ),
};

export const StudentProfile: Story = {
  render: () => (
    <div className="w-[500px] space-y-6">
      <h3 className="text-lg font-semibold">Student Profile</h3>

      <div className="rounded-lg border border-border bg-white p-6">
        <div className="mb-4 flex items-center gap-4">
          <div className="flex size-16 items-center justify-center rounded-full bg-muted">
            <span className="text-2xl font-bold">JS</span>
          </div>
          <div>
            <h4 className="text-lg font-semibold">John Smith</h4>
            <p className="text-sm text-muted-foreground">Student ID: 2021001</p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              Current Semester
            </span>
            <SemesterTag semester="5" />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              Academic Performance
            </span>
            <IpkTag
              ipk="IPK : 3.58"
              iconSrc="https://www.figma.com/api/mcp/asset/4b479d6e-f0d2-4879-8c2e-bcc2748dcf1e"
            />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Status</span>
            <Tag color="green" type="filled" size="lg">
              Active
            </Tag>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Program</span>
            <Tag color="blue" type="with-border" size="lg">
              Computer Science
            </Tag>
          </div>
        </div>
      </div>
    </div>
  ),
};
