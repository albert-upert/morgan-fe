import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Button } from "@/components/button";
import { ArrowRightIcon, CaretDownIcon } from "@/components/icon";
import {
  Dropdown,
  DropdownAsyncSearch,
  DropdownCheckboxItem,
  DropdownContent,
  DropdownItem,
  DropdownLabel,
  DropdownRadioGroup,
  DropdownRadioItem,
  DropdownSearch,
  DropdownSeparator,
  DropdownSub,
  DropdownSubContent,
  DropdownSubTrigger,
  DropdownTrigger,
} from "./dropdown";

const meta = {
  title: "Components/Dropdown",
  component: Dropdown,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [selected, setSelected] = useState<string | null>(null);

    return (
      <div className="flex flex-col gap-4">
        <Dropdown>
          <DropdownTrigger asChild>
            <Button variant="outline">
              Open Menu
              <CaretDownIcon />
            </Button>
          </DropdownTrigger>
          <DropdownContent>
            <DropdownItem onSelect={() => setSelected("Profile")}>
              Profile
            </DropdownItem>
            <DropdownItem onSelect={() => setSelected("Settings")}>
              Settings
            </DropdownItem>
            <DropdownItem onSelect={() => setSelected("Team")}>
              Team
            </DropdownItem>
            <DropdownSeparator />
            <DropdownItem onSelect={() => setSelected("Logout")}>
              Logout
            </DropdownItem>
          </DropdownContent>
        </Dropdown>
        {selected && (
          <div className="text-sm">
            <strong>Selected:</strong> {selected}
          </div>
        )}
      </div>
    );
  },
};

export const WithIcons: Story = {
  render: () => {
    const [selected, setSelected] = useState<string | null>(null);

    return (
      <div className="flex flex-col gap-4">
        <Dropdown>
          <DropdownTrigger asChild>
            <Button variant="outline">
              Options
              <CaretDownIcon />
            </Button>
          </DropdownTrigger>
          <DropdownContent>
            <DropdownItem onSelect={() => setSelected("Profile")}>
              Profile
              <ArrowRightIcon className="ml-auto" />
            </DropdownItem>
            <DropdownItem onSelect={() => setSelected("Settings")}>
              Settings
              <ArrowRightIcon className="ml-auto" />
            </DropdownItem>
            <DropdownItem onSelect={() => setSelected("Team")}>
              Team
              <ArrowRightIcon className="ml-auto" />
            </DropdownItem>
          </DropdownContent>
        </Dropdown>
        {selected && (
          <div className="text-sm">
            <strong>Selected:</strong> {selected}
          </div>
        )}
      </div>
    );
  },
};

export const WithCheckbox: Story = {
  render: () => {
    const [checked1, setChecked1] = useState(false);
    const [checked2, setChecked2] = useState(true);
    const [checked3, setChecked3] = useState(false);

    return (
      <Dropdown>
        <DropdownTrigger asChild>
          <Button variant="outline">
            Select Items
            <CaretDownIcon />
          </Button>
        </DropdownTrigger>
        <DropdownContent>
          <DropdownLabel>Select Options</DropdownLabel>
          <DropdownSeparator />
          <DropdownCheckboxItem
            checked={checked1}
            onCheckedChange={setChecked1}
          >
            Option 1
          </DropdownCheckboxItem>
          <DropdownCheckboxItem
            checked={checked2}
            onCheckedChange={setChecked2}
          >
            Option 2
          </DropdownCheckboxItem>
          <DropdownCheckboxItem
            checked={checked3}
            onCheckedChange={setChecked3}
          >
            Option 3
          </DropdownCheckboxItem>
        </DropdownContent>
      </Dropdown>
    );
  },
};

export const WithRadioGroup: Story = {
  render: () => {
    const [value, setValue] = useState("option1");

    return (
      <Dropdown>
        <DropdownTrigger asChild>
          <Button variant="outline">
            Select One
            <CaretDownIcon />
          </Button>
        </DropdownTrigger>
        <DropdownContent>
          <DropdownLabel>Choose an option</DropdownLabel>
          <DropdownSeparator />
          <DropdownRadioGroup value={value} onValueChange={setValue}>
            <DropdownRadioItem value="option1">Option 1</DropdownRadioItem>
            <DropdownRadioItem value="option2">Option 2</DropdownRadioItem>
            <DropdownRadioItem value="option3">Option 3</DropdownRadioItem>
          </DropdownRadioGroup>
        </DropdownContent>
      </Dropdown>
    );
  },
};

export const WithSubMenu: Story = {
  render: () => {
    const [selected, setSelected] = useState<string | null>(null);

    return (
      <div className="flex flex-col gap-4">
        <Dropdown>
          <DropdownTrigger asChild>
            <Button variant="outline">
              More Options
              <CaretDownIcon />
            </Button>
          </DropdownTrigger>
          <DropdownContent>
            <DropdownItem onSelect={() => setSelected("Profile")}>
              Profile
            </DropdownItem>
            <DropdownItem onSelect={() => setSelected("Settings")}>
              Settings
            </DropdownItem>
            <DropdownSub>
              <DropdownSubTrigger>More Tools</DropdownSubTrigger>
              <DropdownSubContent>
                <DropdownItem onSelect={() => setSelected("Save Page As...")}>
                  Save Page As...
                </DropdownItem>
                <DropdownItem
                  onSelect={() => setSelected("Create Shortcut...")}
                >
                  Create Shortcut...
                </DropdownItem>
                <DropdownItem onSelect={() => setSelected("Name Window...")}>
                  Name Window...
                </DropdownItem>
                <DropdownSeparator />
                <DropdownItem onSelect={() => setSelected("Developer Tools")}>
                  Developer Tools
                </DropdownItem>
              </DropdownSubContent>
            </DropdownSub>
            <DropdownSeparator />
            <DropdownItem onSelect={() => setSelected("Logout")}>
              Logout
            </DropdownItem>
          </DropdownContent>
        </Dropdown>
        {selected && (
          <div className="text-sm">
            <strong>Selected:</strong> {selected}
          </div>
        )}
      </div>
    );
  },
};

export const WithDestructiveAction: Story = {
  render: () => {
    const [selected, setSelected] = useState<string | null>(null);

    return (
      <div className="flex flex-col gap-4">
        <Dropdown>
          <DropdownTrigger asChild>
            <Button variant="outline">
              Actions
              <CaretDownIcon />
            </Button>
          </DropdownTrigger>
          <DropdownContent>
            <DropdownItem onSelect={() => setSelected("Edit")}>
              Edit
            </DropdownItem>
            <DropdownItem onSelect={() => setSelected("Duplicate")}>
              Duplicate
            </DropdownItem>
            <DropdownItem onSelect={() => setSelected("Archive")}>
              Archive
            </DropdownItem>
            <DropdownSeparator />
            <DropdownItem
              variant="destructive"
              onSelect={() => setSelected("Delete")}
            >
              Delete
            </DropdownItem>
          </DropdownContent>
        </Dropdown>
        {selected && (
          <div className="text-sm">
            <strong>Selected:</strong> {selected}
          </div>
        )}
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => {
    const [selected, setSelected] = useState<string | null>(null);

    return (
      <div className="flex flex-col gap-4">
        <Dropdown>
          <DropdownTrigger asChild>
            <Button variant="outline">
              Options
              <CaretDownIcon />
            </Button>
          </DropdownTrigger>
          <DropdownContent>
            <DropdownItem onSelect={() => setSelected("Available Option")}>
              Available Option
            </DropdownItem>
            <DropdownItem disabled>Disabled Option</DropdownItem>
            <DropdownItem onSelect={() => setSelected("Another Option")}>
              Another Option
            </DropdownItem>
          </DropdownContent>
        </Dropdown>
        {selected && (
          <div className="text-sm">
            <strong>Selected:</strong> {selected}
          </div>
        )}
      </div>
    );
  },
};

export const LongList: Story = {
  render: () => {
    const [selected, setSelected] = useState<string | null>(null);

    return (
      <div className="flex flex-col gap-4">
        <Dropdown>
          <DropdownTrigger asChild>
            <Button variant="outline">
              Select Item
              <CaretDownIcon />
            </Button>
          </DropdownTrigger>
          <DropdownContent className="max-h-[300px]">
            {Array.from({ length: 20 }, (_, i) => (
              <DropdownItem
                key={i}
                onSelect={() => setSelected(`Item ${i + 1}`)}
              >
                Item {i + 1}
              </DropdownItem>
            ))}
          </DropdownContent>
        </Dropdown>
        {selected && (
          <div className="text-sm">
            <strong>Selected:</strong> {selected}
          </div>
        )}
      </div>
    );
  },
};

export const WithGroups: Story = {
  render: () => {
    const [selected, setSelected] = useState<string | null>(null);

    return (
      <div className="flex flex-col gap-4">
        <Dropdown>
          <DropdownTrigger asChild>
            <Button variant="outline">
              Organize
              <CaretDownIcon />
            </Button>
          </DropdownTrigger>
          <DropdownContent className="w-56">
            <DropdownLabel>Account</DropdownLabel>
            <DropdownItem onSelect={() => setSelected("Profile")}>
              Profile
            </DropdownItem>
            <DropdownItem onSelect={() => setSelected("Billing")}>
              Billing
            </DropdownItem>
            <DropdownItem onSelect={() => setSelected("Settings")}>
              Settings
            </DropdownItem>
            <DropdownSeparator />
            <DropdownLabel>Team</DropdownLabel>
            <DropdownItem onSelect={() => setSelected("Invite Users")}>
              Invite Users
            </DropdownItem>
            <DropdownItem onSelect={() => setSelected("Team Settings")}>
              Team Settings
            </DropdownItem>
            <DropdownSeparator />
            <DropdownItem
              variant="destructive"
              onSelect={() => setSelected("Leave Team")}
            >
              Leave Team
            </DropdownItem>
          </DropdownContent>
        </Dropdown>
        {selected && (
          <div className="text-sm">
            <strong>Selected:</strong> {selected}
          </div>
        )}
      </div>
    );
  },
};

export const RealWorldExample: Story = {
  render: () => {
    const [notifications, setNotifications] = useState({
      email: true,
      push: false,
      sms: true,
    });

    return (
      <div className="flex flex-col gap-4">
        <h3 className="text-lg font-semibold">User Settings</h3>
        <Dropdown>
          <DropdownTrigger asChild>
            <Button variant="outline" className="w-[200px] justify-between">
              Settings
              <CaretDownIcon />
            </Button>
          </DropdownTrigger>
          <DropdownContent className="w-[200px]">
            <DropdownLabel>Notification Preferences</DropdownLabel>
            <DropdownSeparator />
            <DropdownCheckboxItem
              checked={notifications.email}
              onCheckedChange={(checked) =>
                setNotifications({ ...notifications, email: !!checked })
              }
            >
              Email Notifications
            </DropdownCheckboxItem>
            <DropdownCheckboxItem
              checked={notifications.push}
              onCheckedChange={(checked) =>
                setNotifications({ ...notifications, push: !!checked })
              }
            >
              Push Notifications
            </DropdownCheckboxItem>
            <DropdownCheckboxItem
              checked={notifications.sms}
              onCheckedChange={(checked) =>
                setNotifications({ ...notifications, sms: !!checked })
              }
            >
              SMS Notifications
            </DropdownCheckboxItem>
            <DropdownSeparator />
            <DropdownItem onSelect={() => alert("Manage Preferences clicked")}>
              Manage Preferences
            </DropdownItem>
          </DropdownContent>
        </Dropdown>
        <div className="text-sm text-gray-600">
          <p>Email: {notifications.email ? "✓" : "✗"}</p>
          <p>Push: {notifications.push ? "✓" : "✗"}</p>
          <p>SMS: {notifications.sms ? "✓" : "✗"}</p>
        </div>
      </div>
    );
  },
};

export const AllStates: Story = {
  render: () => {
    const [selected, setSelected] = useState<string | null>(null);
    const [checkboxStates, setCheckboxStates] = useState({
      unchecked1: false,
      checked: true,
      unchecked2: false,
    });

    return (
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-medium">Default State</h3>
          <Dropdown>
            <DropdownTrigger asChild>
              <Button variant="outline">Default Items</Button>
            </DropdownTrigger>
            <DropdownContent>
              <DropdownItem onSelect={() => setSelected("Item 1")}>
                Item 1
              </DropdownItem>
              <DropdownItem onSelect={() => setSelected("Item 2")}>
                Item 2
              </DropdownItem>
              <DropdownItem onSelect={() => setSelected("Item 3")}>
                Item 3
              </DropdownItem>
            </DropdownContent>
          </Dropdown>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-medium">With Checkbox (Selected)</h3>
          <Dropdown>
            <DropdownTrigger asChild>
              <Button variant="outline">Checkbox Items</Button>
            </DropdownTrigger>
            <DropdownContent>
              <DropdownCheckboxItem
                checked={checkboxStates.unchecked1}
                onCheckedChange={(checked) =>
                  setCheckboxStates({
                    ...checkboxStates,
                    unchecked1: !!checked,
                  })
                }
              >
                Option 1
              </DropdownCheckboxItem>
              <DropdownCheckboxItem
                checked={checkboxStates.checked}
                onCheckedChange={(checked) =>
                  setCheckboxStates({ ...checkboxStates, checked: !!checked })
                }
              >
                Option 2
              </DropdownCheckboxItem>
              <DropdownCheckboxItem
                checked={checkboxStates.unchecked2}
                onCheckedChange={(checked) =>
                  setCheckboxStates({
                    ...checkboxStates,
                    unchecked2: !!checked,
                  })
                }
              >
                Option 3
              </DropdownCheckboxItem>
            </DropdownContent>
          </Dropdown>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-medium">With Destructive Action</h3>
          <Dropdown>
            <DropdownTrigger asChild>
              <Button variant="outline">Actions</Button>
            </DropdownTrigger>
            <DropdownContent>
              <DropdownItem onSelect={() => setSelected("Edit")}>
                Edit
              </DropdownItem>
              <DropdownItem onSelect={() => setSelected("Copy")}>
                Copy
              </DropdownItem>
              <DropdownSeparator />
              <DropdownItem
                variant="destructive"
                onSelect={() => setSelected("Delete")}
              >
                Delete
              </DropdownItem>
            </DropdownContent>
          </Dropdown>
        </div>

        {selected && (
          <div className="text-sm">
            <strong>Selected:</strong> {selected}
          </div>
        )}
      </div>
    );
  },
};

// Mock data for search examples
interface Country {
  id: number;
  name: string;
  code: string;
  continent: string;
}

const countries: Array<Country> = [
  { id: 1, name: "United States", code: "US", continent: "North America" },
  { id: 2, name: "Canada", code: "CA", continent: "North America" },
  { id: 3, name: "United Kingdom", code: "GB", continent: "Europe" },
  { id: 4, name: "Germany", code: "DE", continent: "Europe" },
  { id: 5, name: "France", code: "FR", continent: "Europe" },
  { id: 6, name: "Japan", code: "JP", continent: "Asia" },
  { id: 7, name: "China", code: "CN", continent: "Asia" },
  { id: 8, name: "India", code: "IN", continent: "Asia" },
  { id: 9, name: "Brazil", code: "BR", continent: "South America" },
  { id: 10, name: "Australia", code: "AU", continent: "Oceania" },
  { id: 11, name: "Mexico", code: "MX", continent: "North America" },
  { id: 12, name: "Italy", code: "IT", continent: "Europe" },
  { id: 13, name: "Spain", code: "ES", continent: "Europe" },
  { id: 14, name: "South Korea", code: "KR", continent: "Asia" },
  { id: 15, name: "Indonesia", code: "ID", continent: "Asia" },
];

export const WithSearch: Story = {
  render: () => {
    const [selectedCountry, setSelectedCountry] = useState<Country | null>(
      null
    );

    return (
      <div className="flex flex-col gap-4">
        <DropdownSearch
          items={countries}
          searchPlaceholder="Search countries..."
          searchKeys={["name", "code"]}
          emptyMessage="No countries found"
          inputClassName="w-[250px]"
        >
          {({ filteredItems }) =>
            filteredItems.map((country) => (
              <DropdownItem
                key={country.id}
                onSelect={() => setSelectedCountry(country)}
              >
                <div className="flex items-center justify-between gap-2">
                  <span>{country.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {country.code}
                  </span>
                </div>
              </DropdownItem>
            ))
          }
        </DropdownSearch>
        {selectedCountry && (
          <div className="text-sm">
            <p>
              <strong>Selected:</strong> {selectedCountry.name}
            </p>
            <p>
              <strong>Code:</strong> {selectedCountry.code}
            </p>
            <p>
              <strong>Continent:</strong> {selectedCountry.continent}
            </p>
          </div>
        )}
      </div>
    );
  },
};

export const WithSearchAndGroups: Story = {
  render: () => {
    const [selectedCountry, setSelectedCountry] = useState<Country | null>(
      null
    );

    return (
      <div className="flex flex-col gap-4">
        <DropdownSearch
          items={countries}
          searchPlaceholder="Search countries..."
          searchKeys={["name", "code", "continent"]}
          inputClassName="w-[250px]"
          contentClassName="w-[250px]"
        >
          {({ filteredItems }) => {
            const groupedByContinent = filteredItems.reduce((map, country) => {
              const list = map.get(country.continent);
              if (list) {
                list.push(country);
              } else {
                map.set(country.continent, [country]);
              }
              return map;
            }, new Map<string, Array<Country>>());

            return Array.from(groupedByContinent.entries()).map(
              ([continent, continentCountries], index) => (
                <div key={continent}>
                  {index !== 0 && <DropdownSeparator />}
                  <DropdownLabel>{continent}</DropdownLabel>
                  {continentCountries.map((country) => (
                    <DropdownItem
                      key={country.id}
                      onSelect={() => setSelectedCountry(country)}
                    >
                      {country.name}
                    </DropdownItem>
                  ))}
                </div>
              )
            );
          }}
        </DropdownSearch>
        {selectedCountry && (
          <div className="text-sm text-muted-foreground">
            Selected: {selectedCountry.name} ({selectedCountry.continent})
          </div>
        )}
      </div>
    );
  },
};

// Mock async API function
const mockFetchUsers = async (
  query: string
): Promise<
  Array<{ id: number; name: string; email: string; role: string }>
> => {
  await new Promise((resolve) => setTimeout(resolve, 800));

  const users = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
    { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "Editor" },
    {
      id: 4,
      name: "Alice Williams",
      email: "alice@example.com",
      role: "User",
    },
    {
      id: 5,
      name: "Charlie Brown",
      email: "charlie@example.com",
      role: "Admin",
    },
    { id: 6, name: "Diana Prince", email: "diana@example.com", role: "User" },
    { id: 7, name: "Ethan Hunt", email: "ethan@example.com", role: "Editor" },
    {
      id: 8,
      name: "Fiona Gallagher",
      email: "fiona@example.com",
      role: "User",
    },
    {
      id: 9,
      name: "George Wilson",
      email: "george@example.com",
      role: "Admin",
    },
    {
      id: 10,
      name: "Hannah Montana",
      email: "hannah@example.com",
      role: "User",
    },
  ];

  const lowerQuery = query.toLowerCase();
  return users.filter(
    (user) =>
      user.name.toLowerCase().includes(lowerQuery) ||
      user.email.toLowerCase().includes(lowerQuery) ||
      user.role.toLowerCase().includes(lowerQuery)
  );
};

export const WithAsyncSearch: Story = {
  render: () => {
    const [selectedUser, setSelectedUser] = useState<{
      id: number;
      name: string;
      email: string;
      role: string;
    } | null>(null);

    return (
      <div className="flex flex-col gap-4">
        <DropdownAsyncSearch
          fetchItems={mockFetchUsers}
          searchPlaceholder="Type to search users..."
          loadingMessage="Searching users..."
          emptyMessage="No users found"
          debounceMs={500}
          minSearchLength={2}
          inputClassName="w-[300px]"
          contentClassName="w-[300px]"
        >
          {({ items }) =>
            items.map((user) => (
              <DropdownItem
                key={user.id}
                onSelect={() => setSelectedUser(user)}
              >
                <div className="flex flex-col gap-0.5">
                  <span className="font-medium">{user.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {user.email}
                  </span>
                </div>
              </DropdownItem>
            ))
          }
        </DropdownAsyncSearch>
        {selectedUser && (
          <div className="text-sm">
            <p>
              <strong>Name:</strong> {selectedUser.name}
            </p>
            <p>
              <strong>Email:</strong> {selectedUser.email}
            </p>
            <p>
              <strong>Role:</strong> {selectedUser.role}
            </p>
          </div>
        )}
      </div>
    );
  },
};

export const WithAsyncSearchAndError: Story = {
  render: () => {
    const [_selectedUser, setSelectedUser] = useState<{
      id: number;
      name: string;
      email: string;
    } | null>(null);

    const mockFetchUsersWithError = async (
      query: string
    ): Promise<Array<{ id: number; name: string; email: string }>> => {
      await new Promise((resolve) => setTimeout(resolve, 800));

      if (query.toLowerCase().includes("error")) {
        throw new Error("Failed to fetch users");
      }

      const users = [{ id: 1, name: "Test User", email: "test@example.com" }];

      return users.filter((user) =>
        user.name.toLowerCase().includes(query.toLowerCase())
      );
    };

    return (
      <div className="flex flex-col gap-4">
        <div className="text-sm text-muted-foreground">
          Try searching for "error" to see error state
        </div>
        <DropdownAsyncSearch
          fetchItems={mockFetchUsersWithError}
          searchPlaceholder="Type 'error' to trigger error..."
          loadingMessage="Loading..."
          emptyMessage="No results"
          errorMessage="Oops! Something went wrong"
          inputClassName="w-[300px]"
          contentClassName="w-[300px]"
        >
          {({ items }) =>
            items.map((user) => (
              <DropdownItem
                key={user.id}
                onSelect={() => setSelectedUser(user)}
              >
                <div className="flex flex-col gap-0.5">
                  <span className="font-medium">{user.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {user.email}
                  </span>
                </div>
              </DropdownItem>
            ))
          }
        </DropdownAsyncSearch>
      </div>
    );
  },
};
