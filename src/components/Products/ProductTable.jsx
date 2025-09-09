import React, { useEffect } from "react";
import { ITEMS_PER_PAGE } from "../../utils/utilConst";
import { Checkbox, Pagination, Paper, Table, Flex } from "@mantine/core";
import ProductRow from "./ProductRow";
import NoResult from "../common/NoResult";
import ConfirmationModal from "../common/ConfirmationModal";
import { usePagination } from "../../hooks/usePagination";

const ProductTable = ({
  products,
  filters,
  showModal,
  setShowModal,
  selectedProducts,
  setSelectedProducts,
  deleteSelectedProducts,
  loadingDelete,
}) => {
  const { currentPage, handlePageChange, paginatedItems, totalPages } =
    usePagination(products, ITEMS_PER_PAGE);

  useEffect(() => {
    handlePageChange(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  const selectProduct = (e, product) => {
    if (e.target.checked) {
      setSelectedProducts((prev) => [...prev, product]);
    } else {
      setSelectedProducts((prev) =>
        prev.filter((selectedProduct) => selectedProduct.id !== product.id)
      );
    }
  };

  const onSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedProducts(paginatedItems);
    } else {
      setSelectedProducts([]);
    }
  };

  return (
    <>
      <Paper>
        <Table highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>
                <Checkbox
                  checked={
                    selectedProducts.length > 0 &&
                    paginatedItems.length === selectedProducts.length
                  }
                  onChange={onSelectAll}
                />
              </Table.Th>
              <Table.Th>Product Name</Table.Th>
              <Table.Th>Description</Table.Th>
              <Table.Th>Dimensions</Table.Th>
              <Table.Th>Unit Weight</Table.Th>
              <Table.Th>Unit Price</Table.Th>
              <Table.Th>Wholesale Price</Table.Th>
              <Table.Th>Special Price</Table.Th>
              <Table.Th>Wholesale Qty</Table.Th>
              <Table.Th>Active</Table.Th>
              <Table.Th>Image</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {paginatedItems.length > 0 ? (
              paginatedItems.map((product) => (
                <ProductRow
                  key={product.id}
                  product={product}
                  selectProduct={selectProduct}
                  selectedProducts={selectedProducts}
                />
              ))
            ) : (
              <NoResult />
            )}
          </Table.Tbody>
        </Table>
      </Paper>

      {products?.length > ITEMS_PER_PAGE && (
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
          if (selectedProducts.length > 0) {
            deleteSelectedProducts();
          }
        }}
        confirmText="Delete"
      >
        Are you sure you want to delete Selected Products?
      </ConfirmationModal>
    </>
  );
};

export default ProductTable;
