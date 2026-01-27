import type { Meta, StoryObj } from "@storybook/react";
import Typography from "./typography";

const meta = {
  title: "Components/Typography",
  component: Typography,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "body-large",
        "body-large-bold",
        "body-large-italic",
        "body-medium",
        "body-medium-bold",
        "body-medium-italic",
        "body-small",
        "body-small-bold",
        "body-small-italic",
        "caption",
        "caption-bold",
        "caption-italic",
        "pixie",
        "pixie-bold",
        "pixie-italic",
      ],
      description: "Typography variant/style",
    },
    className: {
      control: "text",
      description: "Custom CSS classes (use for colors like text-primary)",
    },
    as: {
      control: "select",
      options: [
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "p",
        "span",
        "div",
        "label",
      ],
      description: "HTML element to render as",
    },
  },
} satisfies Meta<typeof Typography>;

export default meta;
type Story = StoryObj<typeof meta>;

// Heading variants
export const H1: Story = {
  args: {
    variant: "h1",
    children: "Heading 1",
  },
};

export const H2: Story = {
  args: {
    variant: "h2",
    children: "Heading 2",
  },
};

export const H3: Story = {
  args: {
    variant: "h3",
    children: "Selamat Datang, Karla!",
  },
};

export const H4: Story = {
  args: {
    variant: "h4",
    children: "Ubah Informasi",
  },
};

export const H5: Story = {
  args: {
    variant: "h5",
    children: "Heading 5",
  },
};

export const H6: Story = {
  args: {
    variant: "h6",
    children: "Edit Informasi Detail Pengguna",
  },
};

// Body variants
export const BodyLarge: Story = {
  args: {
    variant: "body-large",
    children: "This is body large text used for important content.",
  },
};

export const BodyLargeBold: Story = {
  args: {
    variant: "body-large-bold",
    children: "This is body large bold text for emphasized content.",
  },
};

export const BodyLargeItalic: Story = {
  args: {
    variant: "body-large-italic",
    children: "This is body large italic text for subtle emphasis.",
  },
};

export const BodyMedium: Story = {
  args: {
    variant: "body-medium",
    children: "This is body medium text, the default body text style.",
  },
};

export const BodyMediumBold: Story = {
  args: {
    variant: "body-medium-bold",
    children: "This is body medium bold text for emphasis.",
  },
};

export const BodyMediumItalic: Story = {
  args: {
    variant: "body-medium-italic",
    children: "This is body medium italic text for subtle emphasis.",
  },
};

export const BodySmall: Story = {
  args: {
    variant: "body-small",
    children: "Senin, 27 Juni 2022",
  },
};

export const BodySmallBold: Story = {
  args: {
    variant: "body-small-bold",
    children: "This is body small bold text.",
  },
};

export const BodySmallItalic: Story = {
  args: {
    variant: "body-small-italic",
    children: "This is body small italic text for subtle emphasis.",
  },
};

// Caption variants
export const Caption: Story = {
  args: {
    variant: "caption",
    children: "This is caption text for labels and hints.",
  },
};

export const CaptionBold: Story = {
  args: {
    variant: "caption-bold",
    children: "This is caption bold text for emphasized labels.",
  },
};

export const CaptionItalic: Story = {
  args: {
    variant: "caption-italic",
    children: "This is caption italic text for subtle emphasis.",
  },
};

// Pixie variants (smallest text)
export const Pixie: Story = {
  args: {
    variant: "pixie",
    children: "10.10 WIB",
  },
};

export const PixieBold: Story = {
  args: {
    variant: "pixie-bold",
    children: "Smallest bold text",
  },
};

export const PixieItalic: Story = {
  args: {
    variant: "pixie-italic",
    children: "Smallest italic text",
  },
};

// Color variations using className
export const BrandColor: Story = {
  args: {
    variant: "body-medium-bold",
    className: "text-primary",
    children: "Brand color text (text-primary)",
  },
};

export const SecondaryColor: Story = {
  args: {
    variant: "body-medium",
    className: "text-gray-700",
    children: "Secondary color text (text-gray-700)",
  },
};

export const MutedColor: Story = {
  args: {
    variant: "body-small",
    className: "text-gray-600",
    children: "Muted color text (text-gray-600)",
  },
};

// Complete typography scale showcase
export const AllVariants: Story = {
  args: {
    children: "",
  },
  render: () => (
    <div className="space-y-8">
      <div>
        <p className="mb-2 text-xs font-bold tracking-wider text-gray-500 uppercase">
          Headings
        </p>
        <div className="space-y-4">
          <Typography variant="h1">Heading 1 - 56px/64px Bold</Typography>
          <Typography variant="h2">Heading 2 - 48px/54px Bold</Typography>
          <Typography variant="h3">Heading 3 - 36px/46px Bold</Typography>
          <Typography variant="h4">Heading 4 - 32px/38px Bold</Typography>
          <Typography variant="h5">Heading 5 - 24px/32px Bold</Typography>
          <Typography variant="h6">Heading 6 - 20px/28px Bold</Typography>
        </div>
      </div>

      <div>
        <p className="mb-2 text-xs font-bold tracking-wider text-gray-500 uppercase">
          Body Large (20px/28px)
        </p>
        <div className="space-y-2">
          <Typography variant="body-large">Body Large - Regular</Typography>
          <Typography variant="body-large-bold">Body Large - Bold</Typography>
          <Typography variant="body-large-italic">
            Body Large - Italic
          </Typography>
        </div>
      </div>

      <div>
        <p className="mb-2 text-xs font-bold tracking-wider text-gray-500 uppercase">
          Body Medium (16px/24px) - Default
        </p>
        <div className="space-y-2">
          <Typography variant="body-medium">Body Medium - Regular</Typography>
          <Typography variant="body-medium-bold">Body Medium - Bold</Typography>
          <Typography variant="body-medium-italic">
            Body Medium - Italic
          </Typography>
        </div>
      </div>

      <div>
        <p className="mb-2 text-xs font-bold tracking-wider text-gray-500 uppercase">
          Body Small (14px/22px)
        </p>
        <div className="space-y-2">
          <Typography variant="body-small">Body Small - Regular</Typography>
          <Typography variant="body-small-bold">Body Small - Bold</Typography>
          <Typography variant="body-small-italic">
            Body Small - Italic
          </Typography>
        </div>
      </div>

      <div>
        <p className="mb-2 text-xs font-bold tracking-wider text-gray-500 uppercase">
          Caption (12px/20px)
        </p>
        <div className="space-y-2">
          <Typography variant="caption">Caption - Regular</Typography>
          <Typography variant="caption-bold">Caption - Bold</Typography>
          <Typography variant="caption-italic">Caption - Italic</Typography>
        </div>
      </div>

      <div>
        <p className="mb-2 text-xs font-bold tracking-wider text-gray-500 uppercase">
          Pixie (10px/12px)
        </p>
        <div className="space-y-2">
          <Typography variant="pixie">Pixie - Regular</Typography>
          <Typography variant="pixie-bold">Pixie - Bold</Typography>
          <Typography variant="pixie-italic">Pixie - Italic</Typography>
        </div>
      </div>

      <div>
        <p className="mb-2 text-xs font-bold tracking-wider text-gray-500 uppercase">
          Colors (via className)
        </p>
        <div className="space-y-2">
          <Typography variant="body-medium">
            Default Color - text-gray-800
          </Typography>
          <Typography variant="body-medium" className="text-gray-700">
            Secondary Color - text-gray-700
          </Typography>
          <Typography variant="body-medium" className="text-primary">
            Primary Color - text-primary
          </Typography>
          <Typography variant="body-medium" className="text-gray-600">
            Muted Color - text-gray-600
          </Typography>
          <Typography variant="body-medium" className="text-accent">
            Accent Color - text-accent
          </Typography>
        </div>
      </div>
    </div>
  ),
};

// Real-world examples from the design
export const DesignExamples: Story = {
  args: {
    children: "",
  },
  render: () => (
    <div className="space-y-6">
      <div>
        <Typography variant="h3">Selamat Datang, Karla!</Typography>
        <Typography variant="body-small" className="text-gray-700">
          Senin, 27 Juni 2022
        </Typography>
        <Typography variant="pixie" className="text-gray-700">
          10.10 WIB
        </Typography>
      </div>

      <div className="border-t pt-6">
        <Typography variant="h4">Ubah Informasi</Typography>
      </div>

      <div className="border-t pt-6">
        <Typography variant="h6">Edit Informasi Detail Pengguna</Typography>
        <Typography variant="body-small" className="mt-2 text-gray-700">
          Periode Akademik: 2024 - 2025
        </Typography>
        <Typography variant="pixie" className="text-gray-700">
          (Admin - Universitas Pertamina)
        </Typography>
      </div>
    </div>
  ),
};
