import React, { useEffect } from "react";
import { ITEMS_PER_PAGE } from "../../utils/utilConst";
import { Checkbox, Pagination, Paper, Table, Flex } from "@mantine/core";
import CouponRow from "./CouponRow";
import NoResult from "../common/NoResult";
import ConfirmationModal from "../common/ConfirmationModal";
import { usePagination } from "../../hooks/usePagination";

const CouponTable = ({
  coupons,
  filters,
  showModal,
  setShowModal,
  selectedCoupons,
  setSelectedCoupons,
  deleteSelectedCoupons,
  loadingDelete,
}) => {
  const { currentPage, handlePageChange, paginatedItems, totalPages } =
    usePagination(coupons, ITEMS_PER_PAGE);

  useEffect(() => {
    handlePageChange(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  const selectCoupon = (e, coupon) => {
    if (e.target.checked) {
      setSelectedCoupons((prev) => [...prev, coupon]);
    } else {
      setSelectedCoupons((prev) =>
        prev.filter((selectedCoupon) => selectedCoupon.id !== coupon.id)
      );
    }
  };

  const onSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedCoupons(paginatedItems);
    } else {
      setSelectedCoupons([]);
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
                    selectedCoupons.length > 0 &&
                    paginatedItems.length === selectedCoupons.length
                  }
                  onChange={onSelectAll}
                />
              </Table.Th>
              <Table.Th> Code</Table.Th>
              <Table.Th> Description</Table.Th>
              <Table.Th> Percentage</Table.Th>
              <Table.Th> Max Amount</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {paginatedItems.length > 0 ? (
              paginatedItems.map((coupon) => (
                <CouponRow
                  key={coupon.id}
                  coupon={coupon}
                  selectCoupon={selectCoupon}
                  selectedCoupons={selectedCoupons}
                />
              ))
            ) : (
              <NoResult />
            )}
          </Table.Tbody>
        </Table>
      </Paper>

      {coupons.length > ITEMS_PER_PAGE && (
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
          if (selectedCoupons.length > 0) {
            deleteSelectedCoupons();
          }
        }}
        confirmText="Delete"
      >
        Are you sure you want to delete Selected Coupons?
      </ConfirmationModal>
    </>
  );
};

export default CouponTable;
