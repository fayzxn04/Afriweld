import React, { useEffect } from "react";
import { ITEMS_PER_PAGE } from "../../utils/utilConst";
import { Checkbox, Pagination, Paper, Table, Flex } from "@mantine/core";
import OrderRow from "./OrderRow";
import NoResult from "../common/NoResult";
import ConfirmationModal from "../common/ConfirmationModal";
import { usePagination } from "../../hooks/usePagination";

const OrderTable = ({
  orders,
  filters,
  showModal,
  setShowModal,
  selectedOrders,
  setSelectedOrders,
  deleteSelectedOrders,
  loadingDelete,
}) => {
  const { currentPage, handlePageChange, paginatedItems, totalPages } =
    usePagination(orders, ITEMS_PER_PAGE);

  useEffect(() => {
    handlePageChange(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  const selectOrder = (e, order) => {
    if (e.target.checked) {
      setSelectedOrders((prev) => [...prev, order]);
    } else {
      setSelectedOrders((prev) =>
        prev.filter((selectedOrder) => selectedOrder.id !== order.id)
      );
    }
  };

  const onSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedOrders(paginatedItems);
    } else {
      setSelectedOrders([]);
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
                    selectedOrders.length > 0 &&
                    paginatedItems.length === selectedOrders.length
                  }
                  onChange={onSelectAll}
                />
              </Table.Th>
              <Table.Th> User </Table.Th>
              <Table.Th> Product</Table.Th>
              <Table.Th> Discount </Table.Th>
              <Table.Th> Delivery Charge </Table.Th>
              <Table.Th> Total Price </Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {paginatedItems.length > 0 ? (
              paginatedItems.map((order) => (
                <OrderRow
                  key={order.id}
                  order={order}
                  selectOrder={selectOrder}
                  selectedOrders={selectedOrders}
                />
              ))
            ) : (
              <NoResult />
            )}
          </Table.Tbody>
        </Table>
      </Paper>

      {orders.length > ITEMS_PER_PAGE && (
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
          if (selectedOrders.length > 0) {
            deleteSelectedOrders();
          }
        }}
        confirmText="Delete"
      >
        Are you sure you want to delete Selected Orders?
      </ConfirmationModal>
    </>
  );
};

export default OrderTable;
