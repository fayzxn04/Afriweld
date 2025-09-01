/** @format */

import { useState } from "react";

export const usePagination = (items, itemsPerPage) => {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const paginatedItems = items.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return {
    currentPage,
    handlePageChange,
    paginatedItems,
    totalPages: Math.ceil(items.length / itemsPerPage),
  };
};
