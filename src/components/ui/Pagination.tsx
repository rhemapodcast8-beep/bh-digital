"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  totalPages: number;
}

export function Pagination({ totalPages }: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  if (totalPages <= 1) return null;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const getPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
        pages.push(i);
      } else if (
        (i === currentPage - 2 && i > 2) ||
        (i === currentPage + 2 && i < totalPages - 1)
      ) {
        pages.push("...");
      }
    }
    // Remove duplicate ellipsis
    return pages.filter((page, index, array) => {
      if (page === "..." && array[index - 1] === "...") {
        return false;
      }
      return true;
    });
  };

  return (
    <div className="flex justify-center items-center gap-2 mt-12 mb-8">
      {/* Previous Button */}
      {currentPage > 1 ? (
        <Link
          href={createPageURL(currentPage - 1)}
          className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium text-slate-300 bg-slate-900 border border-slate-800 hover:bg-slate-800 hover:text-white transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Anterior</span>
        </Link>
      ) : (
        <div className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium text-slate-600 bg-slate-900/50 border border-slate-800/50 cursor-not-allowed">
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Anterior</span>
        </div>
      )}

      {/* Page Numbers */}
      <div className="flex items-center gap-1">
        {getPageNumbers().map((page, index) => {
          if (page === "...") {
            return (
              <span key={index} className="px-3 py-2 text-slate-500">
                ...
              </span>
            );
          }

          const isCurrent = page === currentPage;
          return (
            <Link
              key={index}
              href={createPageURL(page)}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                isCurrent
                  ? "bg-[#D4AF37] text-slate-950 hover:bg-[#E5C05B]"
                  : "text-slate-300 bg-slate-900 border border-slate-800 hover:bg-slate-800 hover:text-white"
              }`}
            >
              {page}
            </Link>
          );
        })}
      </div>

      {/* Next Button */}
      {currentPage < totalPages ? (
        <Link
          href={createPageURL(currentPage + 1)}
          className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium text-slate-300 bg-slate-900 border border-slate-800 hover:bg-slate-800 hover:text-white transition-colors"
        >
          <span className="hidden sm:inline">Próxima</span>
          <ChevronRight className="w-4 h-4" />
        </Link>
      ) : (
        <div className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium text-slate-600 bg-slate-900/50 border border-slate-800/50 cursor-not-allowed">
          <span className="hidden sm:inline">Próxima</span>
          <ChevronRight className="w-4 h-4" />
        </div>
      )}
    </div>
  );
}
