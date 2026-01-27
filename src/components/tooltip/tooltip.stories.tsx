import type { Meta } from "@storybook/react";
import { Button } from "@/components/button";
import {
  DownloadIcon,
  EditIcon,
  InfoIcon,
  ShareIcon,
  TrashIcon,
} from "@/components/icon";
import { Tooltip } from "./tooltip";

const meta = {
  title: "Components/Tooltip",
  component: Tooltip,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    side: {
      control: "select",
      options: ["top", "right", "bottom", "left"],
    },
    align: {
      control: "select",
      options: ["start", "center", "end"],
    },
    delayDuration: {
      control: "number",
    },
  },
} satisfies Meta<typeof Tooltip>;

export default meta;

export const Default = {
  render: () => (
    <div className="flex items-center justify-center p-20">
      <Tooltip content="Content for tooltip, don't forget to use simple,">
        <Button>Hover me</Button>
      </Tooltip>
    </div>
  ),
};

export const TopStart = {
  render: () => (
    <div className="flex items-center justify-center p-20">
      <Tooltip
        content="Content for tooltip, don't forget to use simple,"
        side="top"
        align="start"
      >
        <Button>Top Start</Button>
      </Tooltip>
    </div>
  ),
};

export const TopCenter = {
  render: () => (
    <div className="flex items-center justify-center p-20">
      <Tooltip
        content="Content for tooltip, don't forget to use simple,"
        side="top"
        align="center"
      >
        <Button>Top Center</Button>
      </Tooltip>
    </div>
  ),
};

export const TopEnd = {
  render: () => (
    <div className="flex items-center justify-center p-20">
      <Tooltip
        content="Content for tooltip, don't forget to use simple,"
        side="top"
        align="end"
      >
        <Button>Top End</Button>
      </Tooltip>
    </div>
  ),
};

export const BottomStart = {
  render: () => (
    <div className="flex items-center justify-center p-20">
      <Tooltip
        content="Content for tooltip, don't forget to use simple,"
        side="bottom"
        align="start"
      >
        <Button>Bottom Start</Button>
      </Tooltip>
    </div>
  ),
};

export const BottomCenter = {
  render: () => (
    <div className="flex items-center justify-center p-20">
      <Tooltip
        content="Content for tooltip, don't forget to use simple,"
        side="bottom"
        align="center"
      >
        <Button>Bottom Center</Button>
      </Tooltip>
    </div>
  ),
};

export const BottomEnd = {
  render: () => (
    <div className="flex items-center justify-center p-20">
      <Tooltip
        content="Content for tooltip, don't forget to use simple,"
        side="bottom"
        align="end"
      >
        <Button>Bottom End</Button>
      </Tooltip>
    </div>
  ),
};

export const LeftStart = {
  render: () => (
    <div className="flex items-center justify-center p-20">
      <Tooltip
        content="Content for tooltip, don't forget to use simple,"
        side="left"
        align="start"
      >
        <Button>Left Start</Button>
      </Tooltip>
    </div>
  ),
};

export const LeftCenter = {
  render: () => (
    <div className="flex items-center justify-center p-20">
      <Tooltip
        content="Content for tooltip, don't forget to use simple,"
        side="left"
        align="center"
      >
        <Button>Left Center</Button>
      </Tooltip>
    </div>
  ),
};

export const LeftEnd = {
  render: () => (
    <div className="flex items-center justify-center p-20">
      <Tooltip
        content="Content for tooltip, don't forget to use simple,"
        side="left"
        align="end"
      >
        <Button>Left End</Button>
      </Tooltip>
    </div>
  ),
};

export const RightStart = {
  render: () => (
    <div className="flex items-center justify-center p-20">
      <Tooltip
        content="Content for tooltip, don't forget to use simple,"
        side="right"
        align="start"
      >
        <Button>Right Start</Button>
      </Tooltip>
    </div>
  ),
};

export const RightCenter = {
  render: () => (
    <div className="flex items-center justify-center p-20">
      <Tooltip
        content="Content for tooltip, don't forget to use simple,"
        side="right"
        align="center"
      >
        <Button>Right Center</Button>
      </Tooltip>
    </div>
  ),
};

export const RightEnd = {
  render: () => (
    <div className="flex items-center justify-center p-20">
      <Tooltip
        content="Content for tooltip, don't forget to use simple,"
        side="right"
        align="end"
      >
        <Button>Right End</Button>
      </Tooltip>
    </div>
  ),
};

export const AllPositions = {
  render: () => (
    <div className="space-y-8 p-20">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Top Positions</h3>
        <div className="flex flex-wrap gap-4">
          <Tooltip
            content="Content for tooltip, don't forget to use simple,"
            side="top"
            align="start"
          >
            <Button variant="outline">Top Start</Button>
          </Tooltip>
          <Tooltip
            content="Content for tooltip, don't forget to use simple,"
            side="top"
            align="center"
          >
            <Button variant="outline">Top Center</Button>
          </Tooltip>
          <Tooltip
            content="Content for tooltip, don't forget to use simple,"
            side="top"
            align="end"
          >
            <Button variant="outline">Top End</Button>
          </Tooltip>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Bottom Positions</h3>
        <div className="flex flex-wrap gap-4">
          <Tooltip
            content="Content for tooltip, don't forget to use simple,"
            side="bottom"
            align="start"
          >
            <Button variant="outline">Bottom Start</Button>
          </Tooltip>
          <Tooltip
            content="Content for tooltip, don't forget to use simple,"
            side="bottom"
            align="center"
          >
            <Button variant="outline">Bottom Center</Button>
          </Tooltip>
          <Tooltip
            content="Content for tooltip, don't forget to use simple,"
            side="bottom"
            align="end"
          >
            <Button variant="outline">Bottom End</Button>
          </Tooltip>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Left Positions</h3>
        <div className="flex flex-col gap-4">
          <Tooltip
            content="Content for tooltip, don't forget to use simple,"
            side="left"
            align="start"
          >
            <Button variant="outline" className="w-fit">
              Left Start
            </Button>
          </Tooltip>
          <Tooltip
            content="Content for tooltip, don't forget to use simple,"
            side="left"
            align="center"
          >
            <Button variant="outline" className="w-fit">
              Left Center
            </Button>
          </Tooltip>
          <Tooltip
            content="Content for tooltip, don't forget to use simple,"
            side="left"
            align="end"
          >
            <Button variant="outline" className="w-fit">
              Left End
            </Button>
          </Tooltip>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Right Positions</h3>
        <div className="flex flex-col gap-4">
          <Tooltip
            content="Content for tooltip, don't forget to use simple,"
            side="right"
            align="start"
          >
            <Button variant="outline" className="w-fit">
              Right Start
            </Button>
          </Tooltip>
          <Tooltip
            content="Content for tooltip, don't forget to use simple,"
            side="right"
            align="center"
          >
            <Button variant="outline" className="w-fit">
              Right Center
            </Button>
          </Tooltip>
          <Tooltip
            content="Content for tooltip, don't forget to use simple,"
            side="right"
            align="end"
          >
            <Button variant="outline" className="w-fit">
              Right End
            </Button>
          </Tooltip>
        </div>
      </div>
    </div>
  ),
};

export const WithIcon = {
  render: () => (
    <div className="flex items-center justify-center p-20">
      <Tooltip content="This is helpful information about this feature">
        <InfoIcon className="size-5 cursor-pointer text-muted-foreground hover:text-foreground" />
      </Tooltip>
    </div>
  ),
};

export const WithText = {
  render: () => (
    <div className="flex items-center justify-center p-20">
      <p className="text-sm text-foreground">
        This is a paragraph with a{" "}
        <Tooltip content="This word has additional information">
          <span className="cursor-help border-b border-dashed border-foreground">
            tooltip
          </span>
        </Tooltip>{" "}
        in the middle of the text.
      </p>
    </div>
  ),
};

export const LongContent = {
  render: () => (
    <div className="flex items-center justify-center p-20">
      <Tooltip content="This is a longer tooltip with more detailed information. It demonstrates how the tooltip handles multi-line content and maintains proper formatting and readability.">
        <Button>Long Tooltip</Button>
      </Tooltip>
    </div>
  ),
};

export const ShortContent = {
  render: () => (
    <div className="flex items-center justify-center p-20">
      <Tooltip content="Quick tip!">
        <Button>Short Tooltip</Button>
      </Tooltip>
    </div>
  ),
};

export const WithDelay = {
  render: () => (
    <div className="flex items-center justify-center gap-4 p-20">
      <Tooltip content="No delay (instant)" delayDuration={0}>
        <Button variant="outline">No Delay</Button>
      </Tooltip>
      <Tooltip content="200ms delay (default)" delayDuration={200}>
        <Button variant="outline">200ms</Button>
      </Tooltip>
      <Tooltip content="500ms delay" delayDuration={500}>
        <Button variant="outline">500ms</Button>
      </Tooltip>
      <Tooltip content="1 second delay" delayDuration={1000}>
        <Button variant="outline">1 Second</Button>
      </Tooltip>
    </div>
  ),
};

export const RealWorldExample = {
  render: () => (
    <div className="w-[600px] space-y-6 p-8">
      <h3 className="text-lg font-semibold">User Profile Settings</h3>

      <div className="space-y-4">
        <div className="flex items-center justify-between rounded-lg border border-border bg-white p-4">
          <div className="flex items-center gap-3">
            <label className="text-sm font-medium">Email Notifications</label>
            <Tooltip content="Receive updates and alerts via email when important events occur in your account">
              <InfoIcon className="size-4 cursor-help text-muted-foreground" />
            </Tooltip>
          </div>
          <input type="checkbox" defaultChecked />
        </div>

        <div className="flex items-center justify-between rounded-lg border border-border bg-white p-4">
          <div className="flex items-center gap-3">
            <label className="text-sm font-medium">Two-Factor Auth</label>
            <Tooltip
              content="Add an extra layer of security by requiring a verification code in addition to your password"
              side="top"
              align="end"
            >
              <InfoIcon className="size-4 cursor-help text-muted-foreground" />
            </Tooltip>
          </div>
          <input type="checkbox" />
        </div>

        <div className="flex items-center justify-between rounded-lg border border-border bg-white p-4">
          <div className="flex items-center gap-3">
            <label className="text-sm font-medium">Public Profile</label>
            <Tooltip
              content="Make your profile visible to other users on the platform"
              side="bottom"
              align="center"
            >
              <InfoIcon className="size-4 cursor-help text-muted-foreground" />
            </Tooltip>
          </div>
          <input type="checkbox" defaultChecked />
        </div>
      </div>
    </div>
  ),
};

export const FormFieldExample = {
  render: () => (
    <div className="w-[400px] space-y-6 p-8">
      <h3 className="text-lg font-semibold">Create Account</h3>

      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">Username</label>
            <Tooltip
              content="Choose a unique username between 3-20 characters. Only letters, numbers, and underscores allowed."
              side="right"
              align="center"
            >
              <InfoIcon className="size-4 cursor-help text-muted-foreground" />
            </Tooltip>
          </div>
          <input
            type="text"
            className="w-full rounded-md border border-input px-3 py-2 text-sm"
            placeholder="Enter username"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">Password</label>
            <Tooltip
              content="Password must be at least 8 characters and include uppercase, lowercase, number, and special character."
              side="right"
              align="center"
            >
              <InfoIcon className="size-4 cursor-help text-muted-foreground" />
            </Tooltip>
          </div>
          <input
            type="password"
            className="w-full rounded-md border border-input px-3 py-2 text-sm"
            placeholder="Enter password"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">Email</label>
            <Tooltip
              content="We'll send a verification link to this email address"
              side="right"
              align="center"
            >
              <InfoIcon className="size-4 cursor-help text-muted-foreground" />
            </Tooltip>
          </div>
          <input
            type="email"
            className="w-full rounded-md border border-input px-3 py-2 text-sm"
            placeholder="Enter email"
          />
        </div>

        <Button className="w-full">Create Account</Button>
      </div>
    </div>
  ),
};

export const IconButtonsExample = {
  render: () => (
    <div className="flex items-center gap-4 p-20">
      <Tooltip content="Edit profile information" side="bottom" align="center">
        <button className="rounded-lg border border-border bg-white p-2 hover:bg-muted">
          <EditIcon className="size-5" />
        </button>
      </Tooltip>

      <Tooltip content="Delete this item" side="bottom" align="center">
        <button className="rounded-lg border border-border bg-white p-2 hover:bg-muted">
          <TrashIcon className="size-5" />
        </button>
      </Tooltip>

      <Tooltip content="Share with others" side="bottom" align="center">
        <button className="rounded-lg border border-border bg-white p-2 hover:bg-muted">
          <ShareIcon className="size-5" />
        </button>
      </Tooltip>

      <Tooltip content="Download file" side="bottom" align="center">
        <button className="rounded-lg border border-border bg-white p-2 hover:bg-muted">
          <DownloadIcon className="size-5" />
        </button>
      </Tooltip>
    </div>
  ),
};

export const TableExample = {
  render: () => (
    <div className="w-[700px] space-y-4 p-8">
      <h3 className="text-lg font-semibold">User Management</h3>

      <div className="overflow-hidden rounded-lg border border-border">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium">Name</th>
              <th className="px-4 py-3 text-left text-sm font-medium">
                <div className="flex items-center gap-2">
                  Role
                  <Tooltip
                    content="User roles determine access levels and permissions"
                    side="top"
                    align="center"
                  >
                    <InfoIcon className="size-4 cursor-help text-muted-foreground" />
                  </Tooltip>
                </div>
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium">
                Status
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            <tr className="border-t border-border">
              <td className="px-4 py-3 text-sm">John Doe</td>
              <td className="px-4 py-3 text-sm">Admin</td>
              <td className="px-4 py-3 text-sm">
                <span className="rounded-full bg-green-100 px-2 py-1 text-xs text-green-800">
                  Active
                </span>
              </td>
              <td className="px-4 py-3 text-sm">
                <div className="flex gap-2">
                  <Tooltip content="Edit user" side="top" align="center">
                    <button className="text-blue-600 hover:text-blue-800">
                      Edit
                    </button>
                  </Tooltip>
                  <Tooltip content="Delete user" side="top" align="center">
                    <button className="text-red-600 hover:text-red-800">
                      Delete
                    </button>
                  </Tooltip>
                </div>
              </td>
            </tr>
            <tr className="border-t border-border">
              <td className="px-4 py-3 text-sm">Jane Smith</td>
              <td className="px-4 py-3 text-sm">Editor</td>
              <td className="px-4 py-3 text-sm">
                <span className="rounded-full bg-green-100 px-2 py-1 text-xs text-green-800">
                  Active
                </span>
              </td>
              <td className="px-4 py-3 text-sm">
                <div className="flex gap-2">
                  <Tooltip content="Edit user" side="top" align="center">
                    <button className="text-blue-600 hover:text-blue-800">
                      Edit
                    </button>
                  </Tooltip>
                  <Tooltip content="Delete user" side="top" align="center">
                    <button className="text-red-600 hover:text-red-800">
                      Delete
                    </button>
                  </Tooltip>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  ),
};
