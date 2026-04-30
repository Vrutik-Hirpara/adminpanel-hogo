import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { themes } from "../../config/theme.config";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);
      
      if (currentPage > 3) {
        pages.push("...");
      }
      
      // Calculate start and end around current page
      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);
      
      // Adjust if we're near the boundaries to keep 3 buttons in the middle if possible
      if (currentPage <= 3) {
        end = 4;
      } else if (currentPage >= totalPages - 2) {
        start = totalPages - 3;
      }
      
      for (let i = start; i <= end; i++) {
        if (!pages.includes(i)) pages.push(i);
      }
      
      if (currentPage < totalPages - 2) {
        pages.push("...");
      }
      
      // Always show last page
      if (!pages.includes(totalPages)) pages.push(totalPages);
    }
    
    return pages;
  };

  // The user specifically asked for "only 3 button like <......456......>"
  // This usually means showing the range around current page.
  // Let's refine the logic to specifically show 3 buttons if possible.
  
  const getSpecificPageNumbers = () => {
    let start = Math.max(1, currentPage - 1);
    let end = Math.min(totalPages, start + 2);
    
    if (end === totalPages) {
      start = Math.max(1, end - 2);
    }
    
    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  const pages = getSpecificPageNumbers();

  return (
    <div className="flex items-center justify-center gap-2 mt-6 mb-4">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`p-2 rounded-lg transition-all duration-300 flex items-center justify-center ${
          currentPage === 1 
            ? "opacity-40 cursor-not-allowed" 
            : "hover:bg-gray-100 active:scale-95"
        }`}
        style={{ color: themes.textPrimary }}
      >
        <ChevronLeft size={20} />
      </button>

      {/* Optional Ellipsis for start */}
      {pages[0] > 1 && (
        <span className="text-gray-400 px-1">...</span>
      )}

      {/* Page Numbers */}
      <div className="flex items-center gap-1">
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-10 h-10 rounded-xl font-medium transition-all duration-300 flex items-center justify-center ${
              currentPage === page
                ? "shadow-lg shadow-blue-100"
                : "hover:bg-gray-50 text-gray-600"
            }`}
            style={{
              backgroundColor: currentPage === page ? themes.primary : "transparent",
              color: currentPage === page ? themes.textWhite : themes.textPrimary,
              border: currentPage === page ? `none` : `1px solid ${themes.borderLight}`,
            }}
          >
            {page}
          </button>
        ))}
      </div>

      {/* Optional Ellipsis for end */}
      {pages[pages.length - 1] < totalPages && (
        <span className="text-gray-400 px-1">...</span>
      )}

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`p-2 rounded-lg transition-all duration-300 flex items-center justify-center ${
          currentPage === totalPages 
            ? "opacity-40 cursor-not-allowed" 
            : "hover:bg-gray-100 active:scale-95"
        }`}
        style={{ color: themes.textPrimary }}
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
};

export default Pagination;
