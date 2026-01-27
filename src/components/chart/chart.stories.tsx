import type { Meta, StoryObj } from "@storybook/react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  XAxis,
  YAxis,
} from "recharts";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "./chart";
import type { ChartConfig } from "./chart";

const meta = {
  title: "Components/Chart",
  component: ChartContainer,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ChartContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample data for charts
const monthlyData = [
  { month: "Jan", sales: 186, revenue: 80, profit: 40 },
  { month: "Feb", sales: 305, revenue: 200, profit: 120 },
  { month: "Mar", sales: 237, revenue: 120, profit: 70 },
  { month: "Apr", sales: 273, revenue: 190, profit: 100 },
  { month: "May", sales: 209, revenue: 130, profit: 85 },
  { month: "Jun", sales: 214, revenue: 140, profit: 95 },
  { month: "Jul", sales: 310, revenue: 220, profit: 130 },
  { month: "Aug", sales: 280, revenue: 180, profit: 110 },
  { month: "Sep", sales: 245, revenue: 160, profit: 90 },
  { month: "Oct", sales: 290, revenue: 210, profit: 125 },
  { month: "Nov", sales: 320, revenue: 240, profit: 145 },
  { month: "Dec", sales: 350, revenue: 280, profit: 170 },
];

const categoryData = [
  { category: "Electronics", value: 400 },
  { category: "Clothing", value: 300 },
  { category: "Food", value: 200 },
  { category: "Books", value: 150 },
  { category: "Toys", value: 100 },
];

const pieData = [
  { name: "Desktop", value: 400 },
  { name: "Mobile", value: 300 },
  { name: "Tablet", value: 200 },
  { name: "Other", value: 100 },
];

// Chart configs
const lineChartConfig = {
  sales: {
    label: "Sales",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

const multiLineChartConfig = {
  sales: {
    label: "Sales",
    color: "hsl(var(--chart-1))",
  },
  revenue: {
    label: "Revenue",
    color: "hsl(var(--chart-2))",
  },
  profit: {
    label: "Profit",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

const barChartConfig = {
  sales: {
    label: "Sales",
    color: "hsl(var(--chart-1))",
  },
  revenue: {
    label: "Revenue",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

const areaChartConfig = {
  sales: {
    label: "Sales",
    color: "hsl(var(--chart-1))",
  },
  revenue: {
    label: "Revenue",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

const pieChartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
  tablet: {
    label: "Tablet",
    color: "hsl(var(--chart-3))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig;

// Basic Line Chart
export const LineChartBasic: Story = {
  args: {
    children: null,
    config: lineChartConfig,
  },
  render: () => (
    <div className="w-[600px]">
      <ChartContainer config={lineChartConfig}>
        <LineChart data={monthlyData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <ChartTooltip
            content={
              <ChartTooltipContent
                active={false}
                payload={[]}
                coordinate={undefined}
                accessibilityLayer={false}
                activeIndex={undefined}
              />
            }
          />
          <Line
            type="monotone"
            dataKey="sales"
            stroke="var(--color-chart-1)"
            strokeWidth={2}
          />
        </LineChart>
      </ChartContainer>
    </div>
  ),
};

// Multiple Lines Chart
export const LineChartMultiple: Story = {
  args: {
    children: null,
    config: multiLineChartConfig,
  },
  render: () => (
    <div className="w-[600px]">
      <ChartContainer config={multiLineChartConfig}>
        <LineChart data={monthlyData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <ChartTooltip
            content={
              <ChartTooltipContent
                active={false}
                payload={[]}
                coordinate={undefined}
                accessibilityLayer={false}
                activeIndex={undefined}
              />
            }
          />
          <ChartLegend content={<ChartLegendContent />} />
          <Line
            type="monotone"
            dataKey="sales"
            stroke="var(--color-chart-1)"
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="var(--color-chart-2)"
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="profit"
            stroke="var(--color-chart-3)"
            strokeWidth={2}
          />
        </LineChart>
      </ChartContainer>
    </div>
  ),
};

// Bar Chart
export const BarChartBasic: Story = {
  args: {
    children: null,
    config: barChartConfig,
  },
  render: () => (
    <div className="w-[600px]">
      <ChartContainer config={barChartConfig}>
        <BarChart data={monthlyData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <ChartTooltip
            content={
              <ChartTooltipContent
                active={false}
                payload={[]}
                coordinate={undefined}
                accessibilityLayer={false}
                activeIndex={undefined}
              />
            }
          />
          <Bar
            dataKey="sales"
            fill="var(--color-chart-1)"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ChartContainer>
    </div>
  ),
};

// Stacked Bar Chart
export const BarChartStacked: Story = {
  args: {
    children: null,
    config: barChartConfig,
  },
  render: () => (
    <div className="w-[600px]">
      <ChartContainer config={barChartConfig}>
        <BarChart data={monthlyData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <ChartTooltip
            content={
              <ChartTooltipContent
                active={false}
                payload={[]}
                coordinate={undefined}
                accessibilityLayer={false}
                activeIndex={undefined}
              />
            }
          />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar
            dataKey="sales"
            fill="var(--color-chart-1)"
            radius={[0, 0, 0, 0]}
          />
          <Bar
            dataKey="revenue"
            fill="var(--color-chart-2)"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ChartContainer>
    </div>
  ),
};

// Grouped Bar Chart
export const BarChartGrouped: Story = {
  args: {
    children: null,
    config: barChartConfig,
  },
  render: () => (
    <div className="w-[600px]">
      <ChartContainer config={barChartConfig}>
        <BarChart data={monthlyData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <ChartTooltip
            content={
              <ChartTooltipContent
                active={false}
                payload={[]}
                coordinate={undefined}
                accessibilityLayer={false}
                activeIndex={undefined}
              />
            }
          />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar
            dataKey="sales"
            fill="var(--color-chart-1)"
            radius={[4, 4, 0, 0]}
          />
          <Bar
            dataKey="revenue"
            fill="var(--color-chart-2)"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ChartContainer>
    </div>
  ),
};

// Area Chart
export const AreaChartBasic: Story = {
  args: {
    children: null,
    config: areaChartConfig,
  },
  render: () => (
    <div className="w-[600px]">
      <ChartContainer config={areaChartConfig}>
        <AreaChart data={monthlyData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <ChartTooltip
            content={
              <ChartTooltipContent
                active={false}
                payload={[]}
                coordinate={undefined}
                accessibilityLayer={false}
                activeIndex={undefined}
              />
            }
          />
          <Area
            type="monotone"
            dataKey="sales"
            stroke="var(--color-chart-1)"
            fill="var(--color-chart-1)"
            fillOpacity={0.2}
          />
        </AreaChart>
      </ChartContainer>
    </div>
  ),
};

// Stacked Area Chart
export const AreaChartStacked: Story = {
  args: {
    children: null,
    config: areaChartConfig,
  },
  render: () => (
    <div className="w-[600px]">
      <ChartContainer config={areaChartConfig}>
        <AreaChart data={monthlyData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <ChartTooltip
            content={
              <ChartTooltipContent
                active={false}
                payload={[]}
                coordinate={undefined}
                accessibilityLayer={false}
                activeIndex={undefined}
              />
            }
          />
          <ChartLegend content={<ChartLegendContent />} />
          <Area
            type="monotone"
            dataKey="sales"
            stroke="var(--color-chart-1)"
            fill="var(--color-chart-1)"
            fillOpacity={0.3}
            stackId="1"
          />
          <Area
            type="monotone"
            dataKey="revenue"
            stroke="var(--color-chart-2)"
            fill="var(--color-chart-2)"
            fillOpacity={0.3}
            stackId="1"
          />
        </AreaChart>
      </ChartContainer>
    </div>
  ),
};

// Pie Chart
export const PieChartBasic: Story = {
  args: {
    children: null,
    config: pieChartConfig,
  },
  render: () => (
    <div className="h-[400px] w-[400px]">
      <ChartContainer config={pieChartConfig}>
        <PieChart>
          <ChartTooltip
            content={
              <ChartTooltipContent
                active={false}
                payload={[]}
                coordinate={undefined}
                accessibilityLayer={false}
                activeIndex={undefined}
              />
            }
          />
          <Pie
            data={pieData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={120}
            label
          >
            <Cell fill="var(--color-chart-1)" />
            <Cell fill="var(--color-chart-2)" />
            <Cell fill="var(--color-chart-3)" />
            <Cell fill="var(--color-chart-4)" />
          </Pie>
        </PieChart>
      </ChartContainer>
    </div>
  ),
};

// Pie Chart with Legend
export const PieChartWithLegend: Story = {
  args: {
    children: null,
    config: pieChartConfig,
  },
  render: () => (
    <div className="h-[400px] w-[500px]">
      <ChartContainer config={pieChartConfig}>
        <PieChart>
          <ChartTooltip
            content={
              <ChartTooltipContent
                active={false}
                payload={[]}
                coordinate={undefined}
                accessibilityLayer={false}
                activeIndex={undefined}
              />
            }
          />
          <ChartLegend content={<ChartLegendContent />} />
          <Pie
            data={pieData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
          >
            <Cell fill="var(--color-chart-1)" />
            <Cell fill="var(--color-chart-2)" />
            <Cell fill="var(--color-chart-3)" />
            <Cell fill="var(--color-chart-4)" />
          </Pie>
        </PieChart>
      </ChartContainer>
    </div>
  ),
};

// Horizontal Bar Chart
export const BarChartHorizontal: Story = {
  args: {
    children: null,
    config: barChartConfig,
  },
  render: () => (
    <div className="w-[600px]">
      <ChartContainer config={barChartConfig}>
        <BarChart data={categoryData} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis dataKey="category" type="category" />
          <ChartTooltip
            content={
              <ChartTooltipContent
                active={false}
                payload={[]}
                coordinate={undefined}
                accessibilityLayer={false}
                activeIndex={undefined}
              />
            }
          />
          <Bar
            dataKey="value"
            fill="var(--color-chart-1)"
            radius={[0, 4, 4, 0]}
          />
        </BarChart>
      </ChartContainer>
    </div>
  ),
};

// Chart with Custom Tooltip
export const ChartWithCustomTooltip: Story = {
  args: {
    children: null,
    config: multiLineChartConfig,
  },
  render: () => (
    <div className="w-[600px]">
      <ChartContainer config={multiLineChartConfig}>
        <LineChart data={monthlyData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <ChartTooltip
            content={
              <ChartTooltipContent
                indicator="line"
                labelFormatter={(value) => `Month: ${value}`}
                active={false}
                payload={[]}
                coordinate={undefined}
                accessibilityLayer={false}
                activeIndex={undefined}
              />
            }
          />
          <ChartLegend content={<ChartLegendContent />} />
          <Line
            type="monotone"
            dataKey="sales"
            stroke="var(--color-chart-1)"
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="var(--color-chart-2)"
            strokeWidth={2}
          />
        </LineChart>
      </ChartContainer>
    </div>
  ),
};

// All Chart Types Showcase
export const AllChartTypes: Story = {
  args: {
    children: null,
    config: lineChartConfig,
  },
  render: () => (
    <div className="flex flex-col gap-8 p-8">
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold">Line Chart</h3>
        <div className="w-[600px]">
          <ChartContainer config={lineChartConfig}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    active={false}
                    payload={[]}
                    coordinate={undefined}
                    accessibilityLayer={false}
                    activeIndex={undefined}
                  />
                }
              />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="var(--color-chart-1)"
                strokeWidth={2}
              />
            </LineChart>
          </ChartContainer>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold">Bar Chart</h3>
        <div className="w-[600px]">
          <ChartContainer config={barChartConfig}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    active={false}
                    payload={[]}
                    coordinate={undefined}
                    accessibilityLayer={false}
                    activeIndex={undefined}
                  />
                }
              />
              <Bar
                dataKey="sales"
                fill="var(--color-chart-1)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ChartContainer>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold">Area Chart</h3>
        <div className="w-[600px]">
          <ChartContainer config={areaChartConfig}>
            <AreaChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    active={false}
                    payload={[]}
                    coordinate={undefined}
                    accessibilityLayer={false}
                    activeIndex={undefined}
                  />
                }
              />
              <Area
                type="monotone"
                dataKey="sales"
                stroke="var(--color-chart-1)"
                fill="var(--color-chart-1)"
                fillOpacity={0.2}
              />
            </AreaChart>
          </ChartContainer>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold">Pie Chart</h3>
        <div className="h-[400px] w-[400px]">
          <ChartContainer config={pieChartConfig}>
            <PieChart>
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    active={false}
                    payload={[]}
                    coordinate={undefined}
                    accessibilityLayer={false}
                    activeIndex={undefined}
                  />
                }
              />
              <ChartLegend content={<ChartLegendContent />} />
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
              >
                <Cell fill="var(--color-chart-1)" />
                <Cell fill="var(--color-chart-2)" />
                <Cell fill="var(--color-chart-3)" />
                <Cell fill="var(--color-chart-4)" />
              </Pie>
            </PieChart>
          </ChartContainer>
        </div>
      </div>
    </div>
  ),
};

// Dashboard Example
export const DashboardExample: Story = {
  args: {
    children: null,
    config: lineChartConfig,
  },
  render: () => (
    <div className="grid grid-cols-2 gap-6 rounded-lg border border-gray-200 p-6">
      <div className="flex flex-col gap-2">
        <h4 className="text-sm font-semibold text-gray-700">
          Monthly Sales Trend
        </h4>
        <div className="w-full">
          <ChartContainer config={lineChartConfig}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    active={false}
                    payload={[]}
                    coordinate={undefined}
                    accessibilityLayer={false}
                    activeIndex={undefined}
                  />
                }
              />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="var(--color-chart-1)"
                strokeWidth={2}
              />
            </LineChart>
          </ChartContainer>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h4 className="text-sm font-semibold text-gray-700">
          Revenue vs Profit
        </h4>
        <div className="w-full">
          <ChartContainer config={barChartConfig}>
            <BarChart data={monthlyData.slice(0, 6)}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    active={false}
                    payload={[]}
                    coordinate={undefined}
                    accessibilityLayer={false}
                    activeIndex={undefined}
                  />
                }
              />
              <ChartLegend content={<ChartLegendContent />} />
              <Bar
                dataKey="sales"
                fill="var(--color-chart-1)"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="revenue"
                fill="var(--color-chart-2)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ChartContainer>
        </div>
      </div>

      <div className="col-span-2 flex flex-col gap-2">
        <h4 className="text-sm font-semibold text-gray-700">
          Annual Performance
        </h4>
        <div className="w-full">
          <ChartContainer config={areaChartConfig}>
            <AreaChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    active={false}
                    payload={[]}
                    coordinate={undefined}
                    accessibilityLayer={false}
                    activeIndex={undefined}
                  />
                }
              />
              <ChartLegend content={<ChartLegendContent />} />
              <Area
                type="monotone"
                dataKey="sales"
                stroke="var(--color-chart-1)"
                fill="var(--color-chart-1)"
                fillOpacity={0.3}
                stackId="1"
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="var(--color-chart-2)"
                fill="var(--color-chart-2)"
                fillOpacity={0.3}
                stackId="1"
              />
            </AreaChart>
          </ChartContainer>
        </div>
      </div>
    </div>
  ),
};
