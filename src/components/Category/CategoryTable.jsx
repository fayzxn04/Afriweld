import React, { useEffect } from "react";
import { ITEMS_PER_PAGE } from "../../utils/utilConst";
import { Checkbox, Pagination, Paper, Table } from "@mantine/core";
import CategoryRow from "./CategoryRow";
import NoResult from "../common/NoResult";
import ConfirmationModal from "../common/ConfirmationModal";
import { usePagination } from "../../hooks/usePagination";

const CategoryTable = ({
  categories,
  filters,
  showModal,
  setShowModal,
  selectedCategories,
  setSelectedCategories,
  deleteSelectedCategories,
  loadingDelete,
}) => {
  const { currentPage, handlePageChange, paginatedItems, totalPages } =
    usePagination(categories, ITEMS_PER_PAGE);

  useEffect(() => {
    handlePageChange(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  const selectCategory = (e, category) => {
    if (e.target.checked) {
      setSelectedCategories((prevState) => [...prevState, category]);
    } else {
      setSelectedCategories((prevState) =>
        prevState.filter(
          (selectedCategory) => selectedCategory.id !== category.id
        )
      );
    }
  };

  const onSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedCategories(paginatedItems);
    } else {
      setSelectedCategories([]);
    }
  };

  return (
    <>
      <Paper>
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>
                <Checkbox
                  checked={
                    selectedCategories.length > 0 &&
                    paginatedItems.length === selectedCategories.length
                  }
                  onChange={(e) => onSelectAll(e)}
                />
              </Table.Th>
              <Table.Th>Category Name</Table.Th>
              <Table.Th>Description</Table.Th>
              <Table.Th>Image</Table.Th>
              <Table.Th>Banner Image</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {paginatedItems.length > 0 ? (
              paginatedItems.map((category) => (
                <CategoryRow
                  key={category.id}
                  category={category}
                  selectCategory={selectCategory}
                  selectedCategories={selectedCategories}
                />
              ))
            ) : (
              <NoResult />
            )}
          </Table.Tbody>
        </Table>
      </Paper>

      {categories?.length > ITEMS_PER_PAGE && (
        <Flex mt={20} justify="center" align="center">
          <Pagination
            total={totalPages}
            value={currentPage}
            onChange={handlePageChange}
          />
        </Flex>
      )}
      <ConfirmationModal
        showModal={showModal}
        setShowModal={setShowModal}
        loading={loadingDelete}
        onConfirm={() => {
          if (selectedCategories.length > 0) {
            deleteSelectedCategories();
          }
        }}
        confirmText="Delete"
      >
        Are you sure you want to delete Selected Categories?
      </ConfirmationModal>
    </>
  );
};

export default CategoryTable;
