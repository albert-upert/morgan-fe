import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import Breadcrumb from "./breadcrumb";

const meta = {
  title: "Components/Breadcrumb",
  component: Breadcrumb,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    items: {
      control: "object",
      description: "Array of breadcrumb items with label and optional href",
    },
    onItemClick: {
      action: "itemClicked",
      description: "Callback fired when a breadcrumb item is clicked",
    },
  },
} satisfies Meta<typeof Breadcrumb>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [
      { label: "Beranda", href: "/" },
      { label: "Konfigurasi", href: "/konfigurasi" },
      { label: "Pengumuman" },
    ],
    onItemClick: fn(),
  },
};

export const TwoLevels: Story = {
  args: {
    items: [{ label: "Beranda", href: "/" }, { label: "Dashboard" }],
    onItemClick: fn(),
  },
};

export const FourLevels: Story = {
  args: {
    items: [
      { label: "Beranda", href: "/" },
      { label: "Konfigurasi", href: "/konfigurasi" },
      { label: "User Management", href: "/konfigurasi/user-management" },
      { label: "Detail" },
    ],
    onItemClick: fn(),
  },
};

export const SingleLevel: Story = {
  args: {
    items: [{ label: "Beranda" }],
    onItemClick: fn(),
  },
};

export const WithoutLinks: Story = {
  args: {
    items: [
      { label: "Beranda" },
      { label: "Konfigurasi" },
      { label: "Pengumuman" },
    ],
    onItemClick: fn(),
  },
};
