import { useCallback, useMemo, useState } from "react";
import type { KeyboardEvent } from "react";
import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
} from "@/components/dropdown";
import {
  CaretDownIcon,
  CaretLeftIcon,
  CaretRightIcon,
  CloseIcon,
  SearchIcon,
} from "@/components/icon";
import Typography from "@/components/typography/typography";
import { cn } from "@/lib/utils";

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems?: number;
  pageSize?: number;
  pageSizeOptions?: Array<number>;
  onPageChange: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  showPageSizeSelector?: boolean;
  showResultsInfo?: boolean;
  showSearchPage?: boolean;
  className?: string;
}

export function Pagination({
  currentPage,
  totalPages,
  totalItems: _totalItems,
  pageSize = 5,
  pageSizeOptions = [5, 10, 20, 50],
  onPageChange,
  onPageSizeChange,
  showPageSizeSelector = true,
  showResultsInfo = true,
  showSearchPage = true,
  className,
}: PaginationProps) {
  const [searchPageOpen, setSearchPageOpen] = useState(false);
  const [searchPageValue, setSearchPageValue] = useState("");

  const handlePageChange = useCallback(
    (page: number) => {
      if (page >= 1 && page <= totalPages) {
        onPageChange(page);
      }
    },
    [totalPages, onPageChange]
  );

  const handleSearchPageSubmit = useCallback(() => {
    const pageNum = parseInt(searchPageValue);
    if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= totalPages) {
      onPageChange(pageNum);
      setSearchPageOpen(false);
      setSearchPageValue("");
    }
  }, [searchPageValue, totalPages, onPageChange]);

  const handleSearchPageKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        handleSearchPageSubmit();
      } else if (event.key === "Escape") {
        setSearchPageOpen(false);
        setSearchPageValue("");
      }
    },
    [handleSearchPageSubmit]
  );

  const handleClearSearch = useCallback(() => {
    setSearchPageValue("");
  }, []);

  const handleToggleSearchPage = useCallback(() => {
    setSearchPageOpen((prev) => !prev);
  }, []);

  const handleCloseSearchPage = useCallback(() => {
    setSearchPageOpen(false);
  }, []);

  const pageNumbers = useMemo(() => {
    const pages: Array<number | "ellipsis"> = [];

    if (totalPages <= 7) {
      // Show all pages if total is 7 or less
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage <= 3) {
        // Near start: 1 2 3 ... last
        pages.push(2, 3, "ellipsis", totalPages);
      } else if (currentPage >= totalPages - 2) {
        // Near end: 1 ... last-2 last-1 last
        pages.push("ellipsis", totalPages - 2, totalPages - 1, totalPages);
      } else {
        // Middle: 1 ... current-1 current current+1 ... last
        pages.push(
          "ellipsis",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "ellipsis",
          totalPages
        );
      }
    }

    return pages.map((page, index) => {
      if (page === "ellipsis") {
        return (
          <div
            key={`ellipsis-${index}`}
            className="flex h-10 w-12 items-center justify-center rounded-xl"
          >
            <Typography
              variant="body-small"
              className="text-gray-600"
              as="span"
            >
              ...
            </Typography>
          </div>
        );
      }

      return (
        <button
          key={page}
          type="button"
          onClick={() => handlePageChange(page)}
          className={cn(
            "flex h-10 w-12 items-center justify-center rounded-xl text-sm font-normal transition-colors",
            page === currentPage
              ? "bg-primary-light text-primary"
              : "text-muted-foreground hover:bg-muted"
          )}
        >
          {page}
        </button>
      );
    });
  }, [totalPages, currentPage, handlePageChange]);

  return (
    <div className={cn("flex flex-wrap items-center gap-4", className)}>
      {/* Page Size Selector */}
      {showPageSizeSelector && onPageSizeChange && (
        <div className="flex items-center gap-3 px-4">
          <Typography variant="body-small" as="span">
            Tampilkan
          </Typography>
          <Dropdown>
            <DropdownTrigger asChild>
              <button
                type="button"
                className="flex h-10 w-[72px] items-center justify-between gap-2 rounded-lg border border-border bg-background px-3 text-foreground transition-colors hover:bg-muted"
              >
                <Typography variant="body-small" as="span">
                  {pageSize}
                </Typography>
                <CaretDownIcon className="size-4 opacity-50" />
              </button>
            </DropdownTrigger>
            <DropdownContent>
              {pageSizeOptions.map((size) => (
                <DropdownItem
                  key={size}
                  onClick={() => onPageSizeChange(size)}
                  className={cn(size === pageSize && "bg-muted")}
                >
                  {size}
                </DropdownItem>
              ))}
            </DropdownContent>
          </Dropdown>
          <Typography variant="body-small" as="span">
            Per Halaman
          </Typography>
        </div>
      )}

      {/* Results Info */}
      {showResultsInfo && (
        <div className="flex h-10 items-center px-4">
          <Typography variant="body-small" as="span">
            Hasil: {currentPage} dari {totalPages}
          </Typography>
        </div>
      )}

      {/* Page Numbers */}
      <div className="flex items-start">{pageNumbers}</div>

      {/* Previous/Next Buttons */}
      <div className="flex items-center gap-2">
        {currentPage > 1 && (
          <button
            type="button"
            onClick={() => handlePageChange(currentPage - 1)}
            className="flex h-10 items-center gap-1 rounded-lg border border-primary bg-background px-4 py-2 text-primary transition-colors hover:bg-muted"
          >
            <CaretLeftIcon className="size-5" />
            <Typography variant="body-small" className="text-primary" as="span">
              Sebelumnya
            </Typography>
          </button>
        )}

        {currentPage < totalPages && (
          <button
            type="button"
            onClick={() => handlePageChange(currentPage + 1)}
            className="flex h-10 items-center gap-1 rounded-lg border border-primary bg-background px-4 py-2 text-primary transition-colors hover:bg-muted"
          >
            <Typography variant="body-small" className="text-primary" as="span">
              Selanjutnya
            </Typography>
            <CaretRightIcon className="size-5" />
          </button>
        )}
      </div>

      {/* Search Page */}
      {showSearchPage && (
        <div className="relative">
          {!searchPageOpen ? (
            <button
              type="button"
              onClick={handleToggleSearchPage}
              className="flex h-10 items-center gap-1 rounded-lg border border-primary bg-background px-4 py-2 text-primary transition-colors hover:bg-muted"
            >
              <SearchIcon className="size-5" />
              <Typography
                variant="body-small"
                className="text-primary"
                as="span"
              >
                Cari Halaman
              </Typography>
            </button>
          ) : (
            <div className="flex h-10 w-80 items-center rounded-lg border border-primary bg-white">
              <button
                type="button"
                onClick={handleCloseSearchPage}
                className="flex h-10 items-center gap-1 rounded-l-lg border-r border-primary bg-background px-4 py-2 text-primary transition-colors hover:bg-muted"
              >
                <SearchIcon className="size-5" />
                <Typography
                  variant="body-small"
                  className="text-primary"
                  as="span"
                >
                  Cari Halaman
                </Typography>
              </button>
              <input
                type="text"
                value={searchPageValue}
                onChange={(e) => setSearchPageValue(e.target.value)}
                onKeyDown={handleSearchPageKeyDown}
                placeholder="Mulai ketik Angka"
                className="flex-1 px-3 py-2 text-sm font-normal text-foreground outline-none placeholder:text-muted-foreground"
                autoFocus
              />
              {searchPageValue && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="flex items-center justify-center px-3 text-muted-foreground transition-colors hover:text-foreground"
                >
                  <CloseIcon className="size-5" />
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
