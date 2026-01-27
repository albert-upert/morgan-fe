import type { Meta, StoryObj } from "@storybook/react";
import type { MouseEvent, ReactNode } from "react";
import {
  ContinueIcon,
  DownloadIcon,
  ExternalLinkIcon,
  SettingIcon,
} from "@/components/icon";
import Typography from "@/components/typography/typography";
import { cn } from "@/lib/utils";

// Mock Link component for Storybook (avoids router context requirement)
function MockLink({
  children,
  className,
  href = "#",
  onClick,
}: {
  children: ReactNode;
  className?: string;
  href?: string;
  onClick?: (event: MouseEvent) => void;
}) {
  return (
    <a
      href={href}
      className={cn("text-primary hover:underline", className)}
      onClick={(e) => {
        e.preventDefault();
        onClick?.(e);
      }}
    >
      {children}
    </a>
  );
}

const meta = {
  title: "Components/Link",
  component: MockLink,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    className: {
      control: "text",
      description: "Custom CSS classes",
    },
    href: {
      control: "text",
      description: "The destination path (use 'to' prop in actual Link)",
    },
  },
} satisfies Meta<typeof MockLink>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default Link
export const Default: Story = {
  args: {
    href: "/example",
    children: "Default Link",
  },
};

// Custom color
export const AccentColor: Story = {
  args: {
    href: "/example",
    className: "text-accent",
    children: "Accent Color Link",
  },
};

// No underline
export const NoUnderline: Story = {
  args: {
    href: "/example",
    className: "hover:no-underline",
    children: "No Underline on Hover",
  },
};

// Inside Typography
export const InsideTypography: Story = {
  args: {
    href: "/example",
    children: "",
  },
  render: () => (
    <div className="space-y-4">
      <Typography variant="body-medium">
        This is a paragraph with an{" "}
        <MockLink href="/inline">inline link</MockLink> inside the text.
      </Typography>

      <Typography variant="body-small" className="text-gray-700">
        Read more about our{" "}
        <MockLink href="/terms">terms and conditions</MockLink> before
        proceeding.
      </Typography>

      <Typography variant="caption">
        Need help? <MockLink href="/support">Contact support</MockLink>
      </Typography>
    </div>
  ),
};

// Different colors
export const ColorVariations: Story = {
  args: {
    href: "/example",
    children: "",
  },
  render: () => (
    <div className="space-y-2">
      <div>
        <MockLink href="/example">Primary Color (Default)</MockLink>
      </div>
      <div>
        <MockLink href="/example" className="text-accent">
          Accent Color
        </MockLink>
      </div>
      <div>
        <MockLink href="/example" className="text-gray-700">
          Gray Color
        </MockLink>
      </div>
      <div>
        <MockLink href="/example" className="text-secondary">
          Secondary Color
        </MockLink>
      </div>
    </div>
  ),
};

// In a Card context
export const InCardContext: Story = {
  args: {
    href: "/example",
    children: "",
  },
  render: () => (
    <div className="w-[300px] rounded-lg border p-4 shadow-sm">
      <Typography variant="body-medium-bold" className="mb-2">
        Card Title
      </Typography>
      <Typography variant="body-small" className="mb-4 text-gray-700">
        This is a card description with a{" "}
        <MockLink href="/details">learn more</MockLink> link embedded in the
        text.
      </Typography>
      <div className="flex gap-2">
        <MockLink href="/action1" className="text-sm">
          Action 1
        </MockLink>
        <MockLink href="/action2" className="text-sm text-accent">
          Action 2
        </MockLink>
      </div>
    </div>
  ),
};

// Breadcrumb style navigation
export const BreadcrumbStyle: Story = {
  args: {
    href: "/example",
    children: "",
  },
  render: () => (
    <nav className="flex items-center gap-2 text-sm">
      <MockLink href="/home">Home</MockLink>
      <span className="text-gray-400">/</span>
      <MockLink href="/products">Products</MockLink>
      <span className="text-gray-400">/</span>
      <span className="text-gray-800">Current Page</span>
    </nav>
  ),
};

// Clickable Card - Entire card is a link
export const ClickableCard: Story = {
  args: {
    href: "/example",
    children: "",
  },
  render: () => (
    <div className="flex flex-wrap gap-4">
      {/* Simple Clickable Card */}
      <MockLink
        href="/product/1"
        className="block w-[280px] rounded-lg border p-4 shadow-sm transition-shadow hover:no-underline hover:shadow-md"
      >
        <div className="mb-3 aspect-video rounded-lg bg-gray-200" />
        <Typography variant="body-medium-bold" className="mb-1 text-inherit">
          Product Name
        </Typography>
        <Typography variant="body-small" className="mb-2 text-gray-700">
          Short description of the product goes here.
        </Typography>
        <Typography variant="body-medium-bold" className="text-primary">
          $99.00
        </Typography>
      </MockLink>

      {/* Card with Image */}
      <MockLink
        href="/article/1"
        className="group block w-[280px] overflow-hidden rounded-lg border shadow-sm transition-shadow hover:no-underline hover:shadow-md"
      >
        <div className="aspect-video bg-gray-300 transition-transform group-hover:scale-105" />
        <div className="p-4">
          <Typography variant="caption" className="mb-1 text-gray-600">
            Technology
          </Typography>
          <Typography variant="body-medium-bold" className="mb-2 text-inherit">
            Article Title Here
          </Typography>
          <Typography variant="body-small" className="text-gray-700">
            A brief summary of the article content...
          </Typography>
        </div>
      </MockLink>

      {/* Horizontal Card */}
      <MockLink
        href="/user/1"
        className="flex w-[350px] items-center gap-4 rounded-lg border p-4 shadow-sm transition-shadow hover:no-underline hover:shadow-md"
      >
        <div className="h-16 w-16 shrink-0 rounded-full bg-avatar-bg" />
        <div className="min-w-0 flex-1">
          <Typography variant="body-medium-bold" className="text-inherit">
            John Doe
          </Typography>
          <Typography variant="body-small" className="text-gray-700">
            Software Engineer
          </Typography>
          <Typography variant="caption" className="text-gray-600">
            john.doe@example.com
          </Typography>
        </div>
      </MockLink>
    </div>
  ),
};

// Clickable Card Grid
export const ClickableCardGrid: Story = {
  args: {
    href: "/example",
    children: "",
  },
  render: () => (
    <div className="grid grid-cols-3 gap-4">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <MockLink
          key={i}
          href={`/item/${i}`}
          className="block rounded-lg border p-4 shadow-sm transition-all hover:border-primary hover:no-underline hover:shadow-md"
        >
          <div className="mb-3 aspect-square rounded-lg bg-gray-200" />
          <Typography variant="body-small-bold" className="mb-1 text-inherit">
            Item {i}
          </Typography>
          <Typography variant="caption" className="text-gray-600">
            Description for item {i}
          </Typography>
        </MockLink>
      ))}
    </div>
  ),
};

// Clickable Button - Link styled as button
export const ClickableButton: Story = {
  args: {
    href: "/example",
    children: "",
  },
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      {/* Primary Button Link */}
      <MockLink
        href="/action"
        className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary/90 hover:no-underline"
      >
        Primary Button
      </MockLink>

      {/* Secondary Button Link */}
      <MockLink
        href="/action"
        className="inline-flex items-center justify-center rounded-lg bg-secondary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-secondary/90 hover:no-underline"
      >
        Secondary Button
      </MockLink>

      {/* Outline Button Link */}
      <MockLink
        href="/action"
        className="inline-flex items-center justify-center rounded-lg border border-primary px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/10 hover:no-underline"
      >
        Outline Button
      </MockLink>

      {/* Ghost Button Link */}
      <MockLink
        href="/action"
        className="inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-gray-100 hover:no-underline"
      >
        Ghost Button
      </MockLink>

      {/* Small Button Link */}
      <MockLink
        href="/action"
        className="inline-flex items-center justify-center rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-primary/90 hover:no-underline"
      >
        Small Button
      </MockLink>

      {/* Large Button Link */}
      <MockLink
        href="/action"
        className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-base font-medium text-white transition-colors hover:bg-primary/90 hover:no-underline"
      >
        Large Button
      </MockLink>

      {/* Icon Button Link */}
      <MockLink
        href="/settings"
        className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-gray-300 text-gray-700 transition-colors hover:bg-gray-100 hover:no-underline"
      >
        <SettingIcon className="h-5 w-5" />
      </MockLink>
    </div>
  ),
};

// Button Link with Icon and Text
export const ButtonWithIcon: Story = {
  args: {
    href: "/example",
    children: "",
  },
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      {/* Button with left icon */}
      <MockLink
        href="/download"
        className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary/90 hover:no-underline"
      >
        <DownloadIcon className="h-4 w-4" />
        Download
      </MockLink>

      {/* Button with right icon */}
      <MockLink
        href="/next"
        className="inline-flex items-center gap-2 rounded-lg bg-secondary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-secondary/90 hover:no-underline"
      >
        Continue
        <ContinueIcon className="h-4 w-4" />
      </MockLink>

      {/* Outline button with icon */}
      <MockLink
        href="/external"
        className="inline-flex items-center gap-2 rounded-lg border border-primary px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/10 hover:no-underline"
      >
        <ExternalLinkIcon className="h-4 w-4" />
        External Link
      </MockLink>
    </div>
  ),
};
