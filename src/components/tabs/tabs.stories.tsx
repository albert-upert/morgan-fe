import type { Meta, StoryObj } from "@storybook/react";
import {
  AttendanceIcon,
  DashboardIcon,
  GradeIcon,
  ScheduleIcon,
} from "@/components/icon";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";

const meta = {
  title: "Components/Tabs",
  component: Tabs,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const UnderlineDefault: Story = {
  render: () => (
    <Tabs defaultValue="tab1" className="w-[600px]">
      <TabsList variant="underline">
        <TabsTrigger value="tab1" variant="underline">
          Label
        </TabsTrigger>
        <TabsTrigger value="tab2" variant="underline">
          Label
        </TabsTrigger>
        <TabsTrigger value="tab3" variant="underline">
          Label
        </TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">
        <div className="p-4 text-sm text-gray-600">
          Content for Tab 1. This tab uses the underline variant with a red
          bottom border when active.
        </div>
      </TabsContent>
      <TabsContent value="tab2">
        <div className="p-4 text-sm text-gray-600">Content for Tab 2.</div>
      </TabsContent>
      <TabsContent value="tab3">
        <div className="p-4 text-sm text-gray-600">Content for Tab 3.</div>
      </TabsContent>
    </Tabs>
  ),
};

export const UnderlineWithIcons: Story = {
  render: () => (
    <Tabs defaultValue="dashboard" className="w-[600px]">
      <TabsList variant="underline">
        <TabsTrigger value="dashboard" variant="underline">
          <DashboardIcon className="h-5 w-5" />
          Label
        </TabsTrigger>
        <TabsTrigger value="grades" variant="underline">
          <GradeIcon className="h-5 w-5" />
          Label
        </TabsTrigger>
        <TabsTrigger value="attendance" variant="underline">
          <AttendanceIcon className="h-5 w-5" />
          Label
        </TabsTrigger>
      </TabsList>
      <TabsContent value="dashboard">
        <div className="p-4 text-sm text-gray-600">
          Dashboard content goes here.
        </div>
      </TabsContent>
      <TabsContent value="grades">
        <div className="p-4 text-sm text-gray-600">
          Grades content goes here.
        </div>
      </TabsContent>
      <TabsContent value="attendance">
        <div className="p-4 text-sm text-gray-600">
          Attendance content goes here.
        </div>
      </TabsContent>
    </Tabs>
  ),
};

export const PillTabs: Story = {
  render: () => (
    <Tabs defaultValue="tab1" className="w-[400px]">
      <TabsList variant="pill">
        <TabsTrigger value="tab1" variant="pill">
          Label
        </TabsTrigger>
        <TabsTrigger value="tab2" variant="pill">
          Label
        </TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">
        <div className="p-4 text-sm text-gray-600">
          Content for Pill Tab 1. This variant uses a rounded pill design with a
          background highlight.
        </div>
      </TabsContent>
      <TabsContent value="tab2">
        <div className="p-4 text-sm text-gray-600">Content for Pill Tab 2.</div>
      </TabsContent>
    </Tabs>
  ),
};

export const FolderTabs: Story = {
  render: () => (
    <Tabs defaultValue="tab1" className="w-[600px]">
      <TabsList variant="folder">
        <TabsTrigger value="tab1" variant="folder">
          Label
        </TabsTrigger>
        <TabsTrigger value="tab2" variant="folder">
          Label
        </TabsTrigger>
        <TabsTrigger value="tab3" variant="folder">
          Label
        </TabsTrigger>
      </TabsList>
      <TabsContent value="tab1" variant="folder">
        <div className="rounded-b-lg border border-t-0 border-border p-4 text-sm text-gray-600">
          Content for Folder Tab 1. This variant looks like traditional folder
          tabs.
        </div>
      </TabsContent>
      <TabsContent value="tab2" variant="folder">
        <div className="rounded-b-lg border border-t-0 border-border p-4 text-sm text-gray-600">
          Content for Folder Tab 2.
        </div>
      </TabsContent>
      <TabsContent value="tab3" variant="folder">
        <div className="rounded-b-lg border border-t-0 border-border p-4 text-sm text-gray-600">
          Content for Folder Tab 3.
        </div>
      </TabsContent>
    </Tabs>
  ),
};

export const WithNotificationBadge: Story = {
  render: () => (
    <Tabs defaultValue="all" className="w-[600px]">
      <TabsList variant="underline">
        <TabsTrigger value="all" variant="underline">
          All
          <span className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">
            12
          </span>
        </TabsTrigger>
        <TabsTrigger value="unread" variant="underline">
          Unread
          <span className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">
            3
          </span>
        </TabsTrigger>
        <TabsTrigger value="archived" variant="underline">
          Archived
        </TabsTrigger>
      </TabsList>
      <TabsContent value="all">
        <div className="p-4 text-sm text-gray-600">All messages (12 total)</div>
      </TabsContent>
      <TabsContent value="unread">
        <div className="p-4 text-sm text-gray-600">
          Unread messages (3 total)
        </div>
      </TabsContent>
      <TabsContent value="archived">
        <div className="p-4 text-sm text-gray-600">Archived messages</div>
      </TabsContent>
    </Tabs>
  ),
};

export const DisabledTab: Story = {
  render: () => (
    <Tabs defaultValue="tab1" className="w-[600px]">
      <TabsList variant="underline">
        <TabsTrigger value="tab1" variant="underline">
          Active Tab
        </TabsTrigger>
        <TabsTrigger value="tab2" variant="underline" disabled>
          Disabled Tab
        </TabsTrigger>
        <TabsTrigger value="tab3" variant="underline">
          Another Tab
        </TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">
        <div className="p-4 text-sm text-gray-600">
          Content for the active tab.
        </div>
      </TabsContent>
      <TabsContent value="tab3">
        <div className="p-4 text-sm text-gray-600">
          Content for another tab.
        </div>
      </TabsContent>
    </Tabs>
  ),
};

export const LongTabLabels: Story = {
  render: () => (
    <Tabs defaultValue="tab1" className="w-[800px]">
      <TabsList variant="underline">
        <TabsTrigger value="tab1" variant="underline">
          Student Information
        </TabsTrigger>
        <TabsTrigger value="tab2" variant="underline">
          Academic Records
        </TabsTrigger>
        <TabsTrigger value="tab3" variant="underline">
          Financial Aid
        </TabsTrigger>
        <TabsTrigger value="tab4" variant="underline">
          Course Registration
        </TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">
        <div className="p-4 text-sm text-gray-600">
          Student information content.
        </div>
      </TabsContent>
      <TabsContent value="tab2">
        <div className="p-4 text-sm text-gray-600">
          Academic records content.
        </div>
      </TabsContent>
      <TabsContent value="tab3">
        <div className="p-4 text-sm text-gray-600">Financial aid content.</div>
      </TabsContent>
      <TabsContent value="tab4">
        <div className="p-4 text-sm text-gray-600">
          Course registration content.
        </div>
      </TabsContent>
    </Tabs>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex w-[800px] flex-col gap-8">
      <div>
        <h3 className="mb-4 text-sm font-semibold text-gray-700">
          Underline Tabs
        </h3>
        <Tabs defaultValue="tab1">
          <TabsList variant="underline">
            <TabsTrigger value="tab1" variant="underline">
              Label
            </TabsTrigger>
            <TabsTrigger value="tab2" variant="underline">
              Label
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div>
        <h3 className="mb-4 text-sm font-semibold text-gray-700">Pill Tabs</h3>
        <Tabs defaultValue="tab1">
          <TabsList variant="pill">
            <TabsTrigger value="tab1" variant="pill">
              Label
            </TabsTrigger>
            <TabsTrigger value="tab2" variant="pill">
              Label
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div>
        <h3 className="mb-4 text-sm font-semibold text-gray-700">
          Folder Tabs
        </h3>
        <Tabs defaultValue="tab1">
          <TabsList variant="folder">
            <TabsTrigger value="tab1" variant="folder">
              Label
            </TabsTrigger>
            <TabsTrigger value="tab2" variant="folder">
              Label
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div>
        <h3 className="mb-4 text-sm font-semibold text-gray-700">
          Tabs with Icons
        </h3>
        <Tabs defaultValue="tab1">
          <TabsList variant="underline">
            <TabsTrigger value="tab1" variant="underline">
              <DashboardIcon className="h-5 w-5" />
              Label
            </TabsTrigger>
            <TabsTrigger value="tab2" variant="underline">
              <ScheduleIcon className="h-5 w-5" />
              Label
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  ),
};

export const RealWorldExample: Story = {
  render: () => (
    <div className="w-[800px] rounded-lg border border-gray-200 bg-white p-6">
      <h2 className="mb-6 text-2xl font-bold">Student Dashboard</h2>
      <Tabs defaultValue="overview">
        <TabsList variant="underline" className="mb-6">
          <TabsTrigger value="overview" variant="underline">
            <DashboardIcon className="h-5 w-5" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="grades" variant="underline">
            <GradeIcon className="h-5 w-5" />
            Grades
          </TabsTrigger>
          <TabsTrigger value="attendance" variant="underline">
            <AttendanceIcon className="h-5 w-5" />
            Attendance
          </TabsTrigger>
          <TabsTrigger value="schedule" variant="underline">
            <ScheduleIcon className="h-5 w-5" />
            Schedule
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="space-y-4">
            <div className="rounded-lg bg-gray-50 p-4">
              <h3 className="mb-2 font-semibold">Welcome Back!</h3>
              <p className="text-sm text-gray-600">
                You have 3 upcoming assignments and 2 unread messages.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="rounded-lg border border-gray-200 p-4">
                <p className="text-2xl font-bold text-primary">3.85</p>
                <p className="text-sm text-gray-600">Current GPA</p>
              </div>
              <div className="rounded-lg border border-gray-200 p-4">
                <p className="text-2xl font-bold text-primary">95%</p>
                <p className="text-sm text-gray-600">Attendance</p>
              </div>
              <div className="rounded-lg border border-gray-200 p-4">
                <p className="text-2xl font-bold text-primary">6</p>
                <p className="text-sm text-gray-600">Active Courses</p>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="grades">
          <div className="space-y-3">
            <div className="flex items-center justify-between rounded-lg border border-gray-200 p-4">
              <div>
                <p className="font-medium">Database Systems</p>
                <p className="text-sm text-gray-600">CS 301</p>
              </div>
              <p className="text-xl font-bold text-primary">A</p>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-gray-200 p-4">
              <div>
                <p className="font-medium">Web Development</p>
                <p className="text-sm text-gray-600">CS 205</p>
              </div>
              <p className="text-xl font-bold text-primary">A-</p>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-gray-200 p-4">
              <div>
                <p className="font-medium">Data Structures</p>
                <p className="text-sm text-gray-600">CS 202</p>
              </div>
              <p className="text-xl font-bold text-primary">B+</p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="attendance">
          <div className="rounded-lg border border-gray-200 p-4">
            <p className="mb-4 text-lg font-semibold">Attendance Summary</p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Total Classes:</span>
                <span className="font-medium">120</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Attended:</span>
                <span className="font-medium text-green-600">114</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Absent:</span>
                <span className="font-medium text-red-600">6</span>
              </div>
              <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-gray-200">
                <div className="h-full w-[95%] bg-primary" />
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="schedule">
          <div className="space-y-3">
            <div className="rounded-lg border-l-4 border-primary bg-gray-50 p-4">
              <p className="font-medium">Database Systems</p>
              <p className="text-sm text-gray-600">Monday, 09:00 - 11:00</p>
              <p className="text-sm text-gray-600">Room 301</p>
            </div>
            <div className="rounded-lg border-l-4 border-primary bg-gray-50 p-4">
              <p className="font-medium">Web Development</p>
              <p className="text-sm text-gray-600">Tuesday, 13:00 - 15:00</p>
              <p className="text-sm text-gray-600">Room 205</p>
            </div>
            <div className="rounded-lg border-l-4 border-primary bg-gray-50 p-4">
              <p className="font-medium">Data Structures</p>
              <p className="text-sm text-gray-600">Wednesday, 10:00 - 12:00</p>
              <p className="text-sm text-gray-600">Room 202</p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  ),
};
