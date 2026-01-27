import type { Meta } from "@storybook/react";
import { useState } from "react";
import { Pagination } from "./pagination";

const meta = {
  title: "Components/Pagination",
  component: Pagination,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    onPageChange: { action: "page changed" },
    onPageSizeChange: { action: "page size changed" },
  },
} satisfies Meta<typeof Pagination>;

export default meta;

export const Default = {
  render: function DefaultRender() {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);

    return (
      <div className="w-full min-w-[900px]">
        <Pagination
          currentPage={currentPage}
          totalPages={322}
          totalItems={1610}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          onPageSizeChange={setPageSize}
        />
      </div>
    );
  },
};

export const StartPosition = {
  render: function StartPositionRender() {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);

    return (
      <div className="w-full min-w-[900px]">
        <Pagination
          currentPage={currentPage}
          totalPages={322}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          onPageSizeChange={setPageSize}
        />
      </div>
    );
  },
};

export const MiddlePosition = {
  render: function MiddlePositionRender() {
    const [currentPage, setCurrentPage] = useState(161);
    const [pageSize, setPageSize] = useState(5);

    return (
      <div className="w-full min-w-[900px]">
        <Pagination
          currentPage={currentPage}
          totalPages={322}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          onPageSizeChange={setPageSize}
        />
      </div>
    );
  },
};

export const EndPosition = {
  render: function EndPositionRender() {
    const [currentPage, setCurrentPage] = useState(322);
    const [pageSize, setPageSize] = useState(5);

    return (
      <div className="w-full min-w-[900px]">
        <Pagination
          currentPage={currentPage}
          totalPages={322}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          onPageSizeChange={setPageSize}
        />
      </div>
    );
  },
};

export const WithoutPageSizeSelector = {
  render: function WithoutPageSizeSelectorRender() {
    const [currentPage, setCurrentPage] = useState(1);

    return (
      <div className="w-full min-w-[700px]">
        <Pagination
          currentPage={currentPage}
          totalPages={50}
          onPageChange={setCurrentPage}
          showPageSizeSelector={false}
        />
      </div>
    );
  },
};

export const WithoutResultsInfo = {
  render: function WithoutResultsInfoRender() {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    return (
      <div className="w-full min-w-[800px]">
        <Pagination
          currentPage={currentPage}
          totalPages={100}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          onPageSizeChange={setPageSize}
          showResultsInfo={false}
        />
      </div>
    );
  },
};

export const WithoutSearchPage = {
  render: function WithoutSearchPageRender() {
    const [currentPage, setCurrentPage] = useState(5);
    const [pageSize, setPageSize] = useState(5);

    return (
      <div className="w-full min-w-[800px]">
        <Pagination
          currentPage={currentPage}
          totalPages={100}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          onPageSizeChange={setPageSize}
          showSearchPage={false}
        />
      </div>
    );
  },
};

export const MinimalPagination = {
  render: function MinimalPaginationRender() {
    const [currentPage, setCurrentPage] = useState(3);

    return (
      <div className="w-full min-w-[500px]">
        <Pagination
          currentPage={currentPage}
          totalPages={10}
          onPageChange={setCurrentPage}
          showPageSizeSelector={false}
          showResultsInfo={false}
          showSearchPage={false}
        />
      </div>
    );
  },
};

export const SmallDataset = {
  render: function SmallDatasetRender() {
    const [currentPage, setCurrentPage] = useState(2);
    const [pageSize, setPageSize] = useState(5);

    return (
      <div className="w-full min-w-[900px]">
        <Pagination
          currentPage={currentPage}
          totalPages={5}
          totalItems={25}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          onPageSizeChange={setPageSize}
        />
      </div>
    );
  },
};

export const LargeDataset = {
  render: function LargeDatasetRender() {
    const [currentPage, setCurrentPage] = useState(500);
    const [pageSize, setPageSize] = useState(20);

    return (
      <div className="w-full min-w-[900px]">
        <Pagination
          currentPage={currentPage}
          totalPages={1000}
          totalItems={20000}
          pageSize={pageSize}
          pageSizeOptions={[10, 20, 50, 100]}
          onPageChange={setCurrentPage}
          onPageSizeChange={setPageSize}
        />
      </div>
    );
  },
};

export const CustomPageSizeOptions = {
  render: function CustomPageSizeOptionsRender() {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(25);

    return (
      <div className="w-full min-w-[900px]">
        <Pagination
          currentPage={currentPage}
          totalPages={100}
          totalItems={2500}
          pageSize={pageSize}
          pageSizeOptions={[25, 50, 75, 100]}
          onPageChange={setCurrentPage}
          onPageSizeChange={setPageSize}
        />
      </div>
    );
  },
};

export const InteractiveDemonstration = {
  render: function InteractiveDemonstrationRender() {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const totalItems = 3220;
    const totalPages = Math.ceil(totalItems / pageSize);

    return (
      <div className="w-full space-y-6">
        <div className="rounded-lg border border-border bg-white p-6">
          <h3 className="mb-4 text-lg font-semibold">Data Table (Simulated)</h3>
          <div className="space-y-2">
            {Array.from({
              length: Math.min(
                pageSize,
                totalItems - (currentPage - 1) * pageSize
              ),
            }).map((_, i) => {
              const itemNumber = (currentPage - 1) * pageSize + i + 1;
              return (
                <div
                  key={itemNumber}
                  className="flex items-center justify-between rounded border border-border px-4 py-2"
                >
                  <span className="text-sm text-foreground">
                    Item #{itemNumber}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Data content here
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          onPageSizeChange={(newSize) => {
            setPageSize(newSize);
            setCurrentPage(1);
          }}
        />
      </div>
    );
  },
};

export const RealWorldExample = {
  render: function RealWorldExampleRender() {
    const [productsPage, setProductsPage] = useState(1);
    const [productsPageSize, setProductsPageSize] = useState(10);

    const [ordersPage, setOrdersPage] = useState(1);
    const [ordersPageSize, setOrdersPageSize] = useState(5);

    const [usersPage, setUsersPage] = useState(50);

    return (
      <div className="w-full space-y-8">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Products List</h3>
          <div className="rounded-lg border border-border bg-white p-4">
            <p className="text-sm text-muted-foreground">
              Products data would be displayed here...
            </p>
          </div>
          <Pagination
            currentPage={productsPage}
            totalPages={156}
            totalItems={1560}
            pageSize={productsPageSize}
            onPageChange={setProductsPage}
            onPageSizeChange={setProductsPageSize}
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Orders History</h3>
          <div className="rounded-lg border border-border bg-white p-4">
            <p className="text-sm text-muted-foreground">
              Orders data would be displayed here...
            </p>
          </div>
          <Pagination
            currentPage={ordersPage}
            totalPages={84}
            totalItems={420}
            pageSize={ordersPageSize}
            onPageChange={setOrdersPage}
            onPageSizeChange={setOrdersPageSize}
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Users (Simple Pagination)</h3>
          <div className="rounded-lg border border-border bg-white p-4">
            <p className="text-sm text-muted-foreground">
              Users data would be displayed here...
            </p>
          </div>
          <Pagination
            currentPage={usersPage}
            totalPages={200}
            onPageChange={setUsersPage}
            showPageSizeSelector={false}
            showResultsInfo={true}
            showSearchPage={true}
          />
        </div>
      </div>
    );
  },
};

export const AllVariations = {
  render: function AllVariationsRender() {
    const [page1, setPage1] = useState(1);
    const [page2, setPage2] = useState(161);
    const [page3, setPage3] = useState(322);
    const [pageSize, setPageSize] = useState(5);

    return (
      <div className="w-full space-y-8">
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Start Position (Page 1)</h4>
          <Pagination
            currentPage={page1}
            totalPages={322}
            pageSize={pageSize}
            onPageChange={setPage1}
            onPageSizeChange={setPageSize}
          />
        </div>

        <div className="space-y-2">
          <h4 className="text-sm font-medium">Middle Position (Page 161)</h4>
          <Pagination
            currentPage={page2}
            totalPages={322}
            pageSize={pageSize}
            onPageChange={setPage2}
            onPageSizeChange={setPageSize}
          />
        </div>

        <div className="space-y-2">
          <h4 className="text-sm font-medium">End Position (Page 322)</h4>
          <Pagination
            currentPage={page3}
            totalPages={322}
            pageSize={pageSize}
            onPageChange={setPage3}
            onPageSizeChange={setPageSize}
          />
        </div>
      </div>
    );
  },
};
