import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@/components/button";
import Typography from "@/components/typography/typography";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card";

const meta = {
  title: "Components/Card",
  component: Card,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["default", "sm"],
      description: "Card size variant",
    },
    elevation: {
      control: "select",
      options: ["low", "medium", "high"],
      description: "Shadow elevation level",
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    elevation: "low",
  },
  render: (args) => (
    <Card {...args} className="w-[350px]">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description goes here</CardDescription>
      </CardHeader>
      <CardContent>
        <p>This is the card content area where you can place any content.</p>
      </CardContent>
      <CardFooter>
        <Button>Action</Button>
      </CardFooter>
    </Card>
  ),
};

// Elevation Variants
export const LowElevation: Story = {
  args: {
    elevation: "low",
  },
  render: (args) => (
    <Card {...args} className="w-[350px]">
      <CardHeader>
        <CardTitle>Low Elevation</CardTitle>
        <CardDescription>
          Shadow: 0px 4px 8px rgba(61,65,81,0.2)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Typography variant="body-small" className="text-gray-700">
          Used for: Product Card, Side Card
        </Typography>
      </CardContent>
    </Card>
  ),
};

export const MediumElevation: Story = {
  args: {
    elevation: "medium",
  },
  render: (args) => (
    <Card {...args} className="w-[350px]">
      <CardHeader>
        <CardTitle>Medium Elevation</CardTitle>
        <CardDescription>
          Shadow: 0px 8px 24px rgba(61,65,81,0.15)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Typography variant="body-small" className="text-gray-700">
          Used for: Tooltip, Dropdown
        </Typography>
      </CardContent>
    </Card>
  ),
};

export const HighElevation: Story = {
  args: {
    elevation: "high",
  },
  render: (args) => (
    <Card {...args} className="w-[350px]">
      <CardHeader>
        <CardTitle>High Elevation</CardTitle>
        <CardDescription>
          Shadow: 0px 16px 36px rgba(61,65,81,0.1)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Typography variant="body-small" className="text-gray-700">
          Used for: Toast, Modal
        </Typography>
      </CardContent>
    </Card>
  ),
};

// Size Variants
export const Small: Story = {
  args: {
    size: "sm",
    elevation: "low",
  },
  render: (args) => (
    <Card {...args} className="w-[350px]">
      <CardHeader>
        <CardTitle>Small Card</CardTitle>
        <CardDescription>This is a smaller card variant</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Content in a small card.</p>
      </CardContent>
    </Card>
  ),
};

export const WithoutFooter: Story = {
  args: {
    elevation: "low",
  },
  render: (args) => (
    <Card {...args} className="w-[350px]">
      <CardHeader>
        <CardTitle>Simple Card</CardTitle>
        <CardDescription>A card without a footer</CardDescription>
      </CardHeader>
      <CardContent>
        <p>This card only has a header and content section.</p>
      </CardContent>
    </Card>
  ),
};

export const ContentOnly: Story = {
  args: {
    elevation: "low",
  },
  render: (args) => (
    <Card {...args} className="w-[350px]">
      <CardContent>
        <p>A minimal card with only content.</p>
      </CardContent>
    </Card>
  ),
};

// Comparison of all elevations
export const AllElevations: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <div>
        <Typography variant="h6" className="mb-4">
          Card Shadow Elevations
        </Typography>
        <div className="flex gap-6">
          <Card elevation="low" className="w-[240px]">
            <CardContent>
              <Typography variant="body-small-bold" className="mb-2">
                Low
              </Typography>
              <Typography variant="pixie" className="text-gray-700">
                Product Card
              </Typography>
            </CardContent>
          </Card>
          <Card elevation="medium" className="w-[240px]">
            <CardContent>
              <Typography variant="body-small-bold" className="mb-2">
                Medium
              </Typography>
              <Typography variant="pixie" className="text-gray-700">
                Dropdown
              </Typography>
            </CardContent>
          </Card>
          <Card elevation="high" className="w-[240px]">
            <CardContent>
              <Typography variant="body-small-bold" className="mb-2">
                High
              </Typography>
              <Typography variant="pixie" className="text-gray-700">
                Toast
              </Typography>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  ),
};

// Product Card Example (using low elevation)
export const ProductCard: Story = {
  args: {
    elevation: "low",
  },
  render: (args) => (
    <Card {...args} className="w-[280px]">
      <div className="aspect-square w-full bg-gray-200" />
      <CardHeader>
        <CardTitle>Product Name</CardTitle>
        <CardDescription>$99.00</CardDescription>
      </CardHeader>
      <CardContent>
        <Typography variant="body-small" className="text-gray-700">
          A brief product description goes here.
        </Typography>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Add to Cart</Button>
      </CardFooter>
    </Card>
  ),
};
