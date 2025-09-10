import React, { useEffect } from "react";
import { ITEMS_PER_PAGE } from "../../utils/utilConst";
import { Checkbox, Pagination, Paper, Table, Flex } from "@mantine/core";
import AddressRow from "./AddressRow";
import NoResult from "../common/NoResult";
import ConfirmationModal from "../common/ConfirmationModal";
import { usePagination } from "../../hooks/usePagination";

const AddressTable = ({
  addresses,
  filters,
  showModal,
  setShowModal,
  selectedAddresses,
  setSelectedAddresses,
  deleteSelectedAddresses,
  loadingDelete,
}) => {
  const { currentPage, handlePageChange, paginatedItems, totalPages } =
    usePagination(addresses, ITEMS_PER_PAGE);

  useEffect(() => {
    handlePageChange(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  const selectAddress = (e, address) => {
    if (e.target.checked) {
      setSelectedAddresses((prev) => [...prev, address]);
    } else {
      setSelectedAddresses((prev) =>
        prev.filter((selectedAddress) => selectedAddress.id !== address.id)
      );
    }
  };

  const onSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedAddresses(paginatedItems);
    } else {
      setSelectedAddresses([]);
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
                    selectedAddresses.length > 0 &&
                    paginatedItems.length === selectedAddresses.length
                  }
                  onChange={onSelectAll}
                />
              </Table.Th>
              <Table.Th> Name</Table.Th>
              <Table.Th> Address 1</Table.Th>
              <Table.Th> Address 2</Table.Th>
              <Table.Th> City</Table.Th>
              <Table.Th> District</Table.Th>
              <Table.Th> Latitude</Table.Th>
              <Table.Th> Longitude</Table.Th>
              <Table.Th> Phone Number</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {paginatedItems.length > 0 ? (
              paginatedItems.map((address) => (
                <AddressRow
                  key={address.id}
                  address={address}
                  selectAddress={selectAddress}
                  selectedAddresses={selectedAddresses}
                />
              ))
            ) : (
              <NoResult />
            )}
          </Table.Tbody>
        </Table>
      </Paper>

      {addresses.length > ITEMS_PER_PAGE && (
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
          if (selectedAddresses.length > 0) {
            deleteSelectedAddresses();
          }
        }}
        confirmText="Delete"
      >
        Are you sure you want to delete Selected Address?
      </ConfirmationModal>
    </>
  );
};

export default AddressTable;
