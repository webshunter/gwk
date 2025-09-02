"use client";

import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className = "",
}) => {
  const generatePageNumbers = (): (number | string)[] => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 7;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 4) {
        pages.push(1, 2, 3, 4, 5, "...", totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(
          1,
          "...",
          totalPages - 4,
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        );
      } else {
        pages.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages
        );
      }
    }
    return pages;
  };

  const pageNumbers = generatePageNumbers();

  if (totalPages <= 1) return null;

  return (
    <nav
      className={`flex items-center justify-center space-x-1 sm:space-x-2 ${className}`}
      aria-label="Pagination"
    >
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="group flex items-center justify-center w-25 h-25 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-lg transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-1"
        aria-label="Go to previous page"
      >
        <ChevronLeft className="w-10 h-10 group-hover:scale-110 transition-transform duration-200" />
      </button>

      {/* Page Numbers */}
      <div className="flex items-center space-x-1">
        {pageNumbers.map((page, index) => {
          if (page === "...") {
            return (
              <div
                key={index}
                className="flex items-center justify-center w-10 h-10 text-gray-400"
                aria-label="More pages"
              >
                <MoreHorizontal className="w-4 h-4" />
              </div>
            );
          }

          const isActive = currentPage === page;

          return (
            <button
              key={index}
              onClick={() => typeof page === "number" && onPageChange(page)}
              className={`
                flex items-center justify-center w-25 h-25 text-sm font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-1
                ${
                  isActive
                    ? "bg-gradient-to-r from-amber-500 to-yellow-600 text-white shadow-lg shadow-amber-500/25 scale-105"
                    : "text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 hover:border-gray-400 hover:scale-105"
                }
              `}
              aria-label={`Go to page ${page}`}
              aria-current={isActive ? "page" : undefined}
            >
              {page}
            </button>
          );
        })}
      </div>

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="group flex items-center justify-center w-25 h-25 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-lg transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-1"
        aria-label="Go to next page"
      >
        <ChevronRight className="w-10 h-10 group-hover:scale-110 transition-transform duration-200" />
      </button>

      {/* Mobile Page Info */}
      <div className="sm:hidden ml-4 text-sm text-gray-600">
        <span className="font-medium">{currentPage}</span>
        <span className="mx-1">/</span>
        <span>{totalPages}</span>
      </div>
    </nav>
  );
};

export default Pagination;
