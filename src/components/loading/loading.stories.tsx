import type { Meta, StoryObj } from "@storybook/react";
import { Loading } from "./loading";

const meta = {
  title: "Components/Loading",
  component: Loading,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg", "full"],
      description: "Size of the loading component",
    },
    progress: {
      control: { type: "range", min: 0, max: 100, step: 1 },
      description: "Progress value from 0 to 100",
    },
    text: {
      control: "text",
      description: "Text to display below the progress bar",
    },
    indeterminate: {
      control: "boolean",
      description: "Whether to show indeterminate animation",
    },
  },
} satisfies Meta<typeof Loading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: "loading...",
    indeterminate: true,
  },
};

export const WithProgress: Story = {
  args: {
    progress: 60,
    text: "loading...",
    indeterminate: false,
  },
};

export const Small: Story = {
  args: {
    size: "sm",
    text: "loading...",
    indeterminate: true,
  },
};

export const Large: Story = {
  args: {
    size: "lg",
    text: "loading...",
    indeterminate: true,
  },
};

export const CustomText: Story = {
  args: {
    text: "Memproses data...",
    indeterminate: true,
  },
};

export const HalfProgress: Story = {
  args: {
    progress: 50,
    text: "50% selesai...",
    indeterminate: false,
  },
};

export const AlmostComplete: Story = {
  args: {
    progress: 90,
    text: "Hampir selesai...",
    indeterminate: false,
  },
};
