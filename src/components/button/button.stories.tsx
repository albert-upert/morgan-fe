import type { Meta, StoryObj } from "@storybook/react";
import { ArrowRightIcon, DownloadIcon, PlusIcon } from "@/components/icon";
import { Button } from "./button";

const meta = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "primary",
        "secondary",
        "tertiary",
        "destructive",
        "outline",
        "ghost",
      ],
    },
    size: {
      control: "select",
      options: ["lg", "md", "icon", "icon-md"],
    },
    disabled: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// Variant Stories
export const Primary: Story = {
  args: {
    children: "Button",
    variant: "primary",
    size: "lg",
  },
};

export const Secondary: Story = {
  args: {
    children: "Button",
    variant: "secondary",
    size: "lg",
  },
};

export const Tertiary: Story = {
  args: {
    children: "Button",
    variant: "tertiary",
    size: "lg",
  },
};

export const Destructive: Story = {
  args: {
    children: "Delete",
    variant: "destructive",
    size: "lg",
  },
};

export const Outline: Story = {
  args: {
    children: "Button",
    variant: "outline",
    size: "lg",
  },
};

export const Ghost: Story = {
  args: {
    children: "Button",
    variant: "ghost",
    size: "lg",
  },
};

// Size Stories
export const Large: Story = {
  args: {
    children: "Large Button",
    size: "lg",
  },
};

export const Medium: Story = {
  args: {
    children: "Medium Button",
    size: "md",
  },
};

// State Stories
export const Disabled: Story = {
  args: {
    children: "Disabled",
    disabled: true,
    variant: "primary",
  },
};

export const DisabledSecondary: Story = {
  args: {
    children: "Disabled",
    disabled: true,
    variant: "secondary",
  },
};

// Icon Button Stories
export const IconButton: Story = {
  args: {
    children: <PlusIcon />,
    size: "icon",
    variant: "primary",
  },
};

export const IconButtonSecondary: Story = {
  args: {
    children: <PlusIcon />,
    size: "icon",
    variant: "secondary",
  },
};

export const IconButtonTertiary: Story = {
  args: {
    children: <PlusIcon />,
    size: "icon",
    variant: "tertiary",
  },
};

export const IconButtonMedium: Story = {
  args: {
    children: <PlusIcon />,
    size: "icon-md",
    variant: "primary",
  },
};

// Button with Icons
export const WithIconLeft: Story = {
  args: {
    children: (
      <>
        <PlusIcon />
        Add Item
      </>
    ),
    variant: "primary",
    size: "lg",
  },
};

export const WithIconRight: Story = {
  args: {
    children: (
      <>
        Continue
        <ArrowRightIcon />
      </>
    ),
    variant: "primary",
    size: "lg",
  },
};

export const SecondaryWithIcon: Story = {
  args: {
    children: (
      <>
        <DownloadIcon />
        Download
      </>
    ),
    variant: "secondary",
    size: "lg",
  },
};

// All Variants Comparison
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="tertiary">Tertiary</Button>
      </div>
      <div className="flex gap-4">
        <Button variant="destructive">Destructive</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
      </div>
    </div>
  ),
};

// All States Comparison
export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <p className="text-xs font-medium text-gray-500">Primary States</p>
        <div className="flex gap-4">
          <Button variant="primary">Default</Button>
          <Button variant="primary" className="hover:bg-brand/90">
            Hover
          </Button>
          <Button variant="primary" className="active:bg-brand/80">
            Pressed
          </Button>
          <Button variant="primary" disabled>
            Disabled
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-xs font-medium text-gray-500">Secondary States</p>
        <div className="flex gap-4">
          <Button variant="secondary">Default</Button>
          <Button variant="secondary" className="hover:bg-brand/5">
            Hover
          </Button>
          <Button variant="secondary" className="active:bg-brand/10">
            Pressed
          </Button>
          <Button variant="secondary" disabled>
            Disabled
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-xs font-medium text-gray-500">Tertiary States</p>
        <div className="flex gap-4">
          <Button variant="tertiary">Default</Button>
          <Button variant="tertiary" className="hover:bg-brand/5">
            Hover
          </Button>
          <Button variant="tertiary" className="active:bg-brand/10">
            Pressed
          </Button>
          <Button variant="tertiary" disabled>
            Disabled
          </Button>
        </div>
      </div>
    </div>
  ),
};

// Size Comparison
export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button size="lg">Large (40px)</Button>
      <Button size="md">Medium (30px)</Button>
      <div className="flex gap-2">
        <Button size="icon">
          <PlusIcon />
        </Button>
        <Button size="icon-md">
          <PlusIcon />
        </Button>
      </div>
    </div>
  ),
};

// Icon Buttons Grid
export const IconButtonsGrid: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <p className="text-xs font-medium text-gray-500">Large Icon Buttons</p>
        <div className="flex gap-4">
          <Button size="icon" variant="primary">
            <PlusIcon />
          </Button>
          <Button size="icon" variant="secondary">
            <PlusIcon />
          </Button>
          <Button size="icon" variant="tertiary">
            <PlusIcon />
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-xs font-medium text-gray-500">Medium Icon Buttons</p>
        <div className="flex gap-4">
          <Button size="icon-md" variant="primary">
            <PlusIcon />
          </Button>
          <Button size="icon-md" variant="secondary">
            <PlusIcon />
          </Button>
          <Button size="icon-md" variant="tertiary">
            <PlusIcon />
          </Button>
        </div>
      </div>
    </div>
  ),
};

// Real-world Examples
export const RealWorldExample: Story = {
  render: () => (
    <div className="flex flex-col gap-6 rounded-lg border border-gray-200 p-6">
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold">Confirm Your Action</h3>
        <p className="text-sm text-gray-600">
          Are you sure you want to save these changes?
        </p>
      </div>
      <div className="flex gap-3">
        <Button variant="secondary" className="flex-1">
          Cancel
        </Button>
        <Button variant="primary" className="flex-1">
          Save Changes
        </Button>
      </div>
    </div>
  ),
};
