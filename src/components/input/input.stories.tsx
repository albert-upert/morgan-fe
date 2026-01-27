import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { SearchIcon } from "@/components/icon";
import { Input } from "./input";

const meta = {
  title: "Components/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="w-[345px]">
      <Input label="Label" placeholder="Placeholder" helperText="Helper text" />
    </div>
  ),
};

export const LargeSize: Story = {
  render: () => (
    <div className="w-[345px] space-y-4">
      <Input
        size="lg"
        label="Label"
        placeholder="Placeholder"
        helperText="Helper text"
      />
      <Input
        size="lg"
        label="Label"
        placeholder="Placeholder"
        defaultValue="Filled value"
        helperText="Helper text"
      />
    </div>
  ),
};

export const MediumSize: Story = {
  render: () => (
    <div className="w-[345px] space-y-4">
      <Input
        size="md"
        label="Label"
        placeholder="Placeholder"
        helperText="Helper text"
      />
      <Input
        size="md"
        label="Label"
        placeholder="Placeholder"
        defaultValue="Filled value"
        helperText="Helper text"
      />
    </div>
  ),
};

export const SmallSize: Story = {
  render: () => (
    <div className="w-[345px] space-y-4">
      <Input
        size="sm"
        label="Label"
        placeholder="Placeholder"
        helperText="Helper text"
      />
      <Input
        size="sm"
        label="Label"
        placeholder="Placeholder"
        defaultValue="Filled value"
        helperText="Helper text"
      />
    </div>
  ),
};

export const WithClearButton: Story = {
  render: () => {
    const [value, setValue] = useState("Sample text");
    return (
      <div className="w-[345px]">
        <Input
          label="Label"
          placeholder="Placeholder"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onClear={() => setValue("")}
          helperText="Helper text"
        />
      </div>
    );
  },
};

export const WithStartIcon: Story = {
  render: () => (
    <div className="w-[345px] space-y-4">
      <Input
        size="lg"
        label="Label"
        placeholder="Placeholder"
        startIcon={<SearchIcon className="size-5 text-muted-foreground" />}
        helperText="Helper text"
      />
      <Input
        size="md"
        label="Label"
        placeholder="Placeholder"
        startIcon={<SearchIcon className="size-5 text-muted-foreground" />}
        helperText="Helper text"
      />
      <Input
        size="sm"
        label="Label"
        placeholder="Placeholder"
        startIcon={<SearchIcon className="size-3 text-muted-foreground" />}
        helperText="Helper text"
      />
    </div>
  ),
};

export const WithEndIcon: Story = {
  render: () => (
    <div className="w-[345px] space-y-4">
      <Input
        size="lg"
        label="Label"
        placeholder="Placeholder"
        endIcon={<SearchIcon className="size-5 text-muted-foreground" />}
        helperText="Helper text"
      />
      <Input
        size="md"
        label="Label"
        placeholder="Placeholder"
        endIcon={<SearchIcon className="size-5 text-muted-foreground" />}
        helperText="Helper text"
      />
      <Input
        size="sm"
        label="Label"
        placeholder="Placeholder"
        endIcon={<SearchIcon className="size-3 text-muted-foreground" />}
        helperText="Helper text"
      />
    </div>
  ),
};

export const WithPrefix: Story = {
  render: () => (
    <div className="w-[345px] space-y-4">
      <Input
        size="lg"
        label="Label"
        placeholder="0.00"
        prefix="Rp"
        helperText="Helper text"
      />
      <Input
        size="md"
        label="Label"
        placeholder="0.00"
        prefix="Rp"
        helperText="Helper text"
      />
      <Input
        size="sm"
        label="Label"
        placeholder="0.00"
        prefix="Rp"
        helperText="Helper text"
      />
    </div>
  ),
};

export const WithSuffix: Story = {
  render: () => (
    <div className="w-[345px] space-y-4">
      <Input
        size="lg"
        label="Label"
        placeholder="Placeholder"
        suffix="Years"
        helperText="Helper text"
      />
      <Input
        size="md"
        label="Label"
        placeholder="Placeholder"
        suffix="Years"
        helperText="Helper text"
      />
      <Input
        size="sm"
        label="Label"
        placeholder="Placeholder"
        suffix="Years"
        helperText="Helper text"
      />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="w-[345px] space-y-4">
      <Input
        size="lg"
        label="Label"
        placeholder="Placeholder"
        disabled
        helperText="Helper text"
      />
      <Input
        size="lg"
        label="Label"
        placeholder="Placeholder"
        defaultValue="Filled value"
        disabled
        helperText="Helper text"
      />
    </div>
  ),
};

export const ErrorState: Story = {
  render: () => (
    <div className="w-[345px] space-y-4">
      <Input
        size="lg"
        label="Label"
        placeholder="Placeholder"
        error
        helperText="Helper text"
      />
      <Input
        size="lg"
        label="Label"
        placeholder="Placeholder"
        defaultValue="Invalid value"
        error
        helperText="Helper text"
      />
    </div>
  ),
};

export const AllStates: Story = {
  render: () => (
    <div className="w-[800px] space-y-6">
      <div>
        <h3 className="mb-4 text-sm font-semibold text-gray-700">Large Size</h3>
        <div className="grid grid-cols-3 gap-4">
          <Input size="lg" label="Default" placeholder="Placeholder" />
          <Input
            size="lg"
            label="Typing"
            placeholder="Placeholder"
            defaultValue="User input"
          />
          <Input
            size="lg"
            label="Filled"
            placeholder="Placeholder"
            defaultValue="Filled value"
          />
          <Input
            size="lg"
            label="Disabled"
            placeholder="Placeholder"
            disabled
          />
          <Input
            size="lg"
            label="Error Empty"
            placeholder="Placeholder"
            error
            helperText="Error message"
          />
          <Input
            size="lg"
            label="Error Filled"
            placeholder="Placeholder"
            defaultValue="Invalid"
            error
            helperText="Error message"
          />
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-sm font-semibold text-gray-700">
          Medium Size
        </h3>
        <div className="grid grid-cols-3 gap-4">
          <Input size="md" label="Default" placeholder="Placeholder" />
          <Input
            size="md"
            label="Typing"
            placeholder="Placeholder"
            defaultValue="User input"
          />
          <Input
            size="md"
            label="Filled"
            placeholder="Placeholder"
            defaultValue="Filled value"
          />
          <Input
            size="md"
            label="Disabled"
            placeholder="Placeholder"
            disabled
          />
          <Input
            size="md"
            label="Error Empty"
            placeholder="Placeholder"
            error
            helperText="Error message"
          />
          <Input
            size="md"
            label="Error Filled"
            placeholder="Placeholder"
            defaultValue="Invalid"
            error
            helperText="Error message"
          />
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-sm font-semibold text-gray-700">Small Size</h3>
        <div className="grid grid-cols-3 gap-4">
          <Input size="sm" label="Default" placeholder="Placeholder" />
          <Input
            size="sm"
            label="Typing"
            placeholder="Placeholder"
            defaultValue="User input"
          />
          <Input
            size="sm"
            label="Filled"
            placeholder="Placeholder"
            defaultValue="Filled value"
          />
          <Input
            size="sm"
            label="Disabled"
            placeholder="Placeholder"
            disabled
          />
          <Input
            size="sm"
            label="Error Empty"
            placeholder="Placeholder"
            error
            helperText="Error message"
          />
          <Input
            size="sm"
            label="Error Filled"
            placeholder="Placeholder"
            defaultValue="Invalid"
            error
            helperText="Error message"
          />
        </div>
      </div>
    </div>
  ),
};

export const RealWorldExample: Story = {
  render: () => {
    const [searchValue, setSearchValue] = useState("");
    const [priceValue, setPriceValue] = useState("");
    const [yearValue, setYearValue] = useState("2024");
    const [emailValue, setEmailValue] = useState("");
    const [emailError, setEmailError] = useState(false);

    const validateEmail = (email: string) => {
      const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      setEmailError(!isValid && email.length > 0);
    };

    return (
      <div className="w-[600px] space-y-6">
        <h3 className="text-lg font-semibold">User Registration Form</h3>

        <Input
          label="Search"
          placeholder="Search for products..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onClear={() => setSearchValue("")}
          startIcon={<SearchIcon className="size-5 text-muted-foreground" />}
          helperText="Enter keywords to search"
        />

        <Input
          label="Price"
          type="number"
          placeholder="0.00"
          prefix="Rp"
          value={priceValue}
          onChange={(e) => setPriceValue(e.target.value)}
          helperText="Enter amount in Rupiah"
        />

        <Input
          label="Experience"
          type="number"
          placeholder="Enter years"
          value={yearValue}
          onChange={(e) => setYearValue(e.target.value)}
          suffix="Years"
          helperText="Years of experience"
        />

        <Input
          label="Email Address"
          type="email"
          placeholder="name@example.com"
          value={emailValue}
          onChange={(e) => {
            setEmailValue(e.target.value);
            validateEmail(e.target.value);
          }}
          error={emailError}
          helperText={
            emailError
              ? "Please enter a valid email"
              : "We'll never share your email"
          }
        />

        <Input
          label="Phone Number"
          type="tel"
          placeholder="+62 812 3456 7890"
          helperText="Include country code"
        />

        <Input
          label="Discount Code"
          placeholder="Enter code"
          disabled
          helperText="Discount codes are currently unavailable"
        />
      </div>
    );
  },
};
