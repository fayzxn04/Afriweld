import React, { useEffect } from "react";
import { ITEMS_PER_PAGE } from "../../utils/utilConst";
import { Checkbox, Pagination, Paper, Table, Flex } from "@mantine/core";
import UserRow from "./UserRow";
import NoResult from "../common/NoResult";
import ConfirmationModal from "../common/ConfirmationModal";
import { usePagination } from "../../hooks/usePagination";

const UserTable = ({
  users,
  filters,
  showModal,
  setShowModal,
  selectedUsers,
  setSelectedUsers,
  deleteSelectedUsers,
  loadingDelete,
}) => {
  const { currentPage, handlePageChange, paginatedItems, totalPages } =
    usePagination(users, ITEMS_PER_PAGE);

  useEffect(() => {
    handlePageChange(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  const selectUser = (e, user) => {
    if (e.target.checked) {
      setSelectedUsers((prev) => [...prev, user]);
    } else {
      setSelectedUsers((prev) =>
        prev.filter((selectedUser) => selectedUser.id !== user.id)
      );
    }
  };

  const onSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedUsers(paginatedItems);
    } else {
      setSelectedUsers([]);
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
                    selectedUsers.length > 0 &&
                    paginatedItems.length === selectedUsers.length
                  }
                  onChange={onSelectAll}
                />
              </Table.Th>
              <Table.Th> Name</Table.Th>
              <Table.Th> Email</Table.Th>
              <Table.Th> Phone Number</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {paginatedItems.length > 0 ? (
              paginatedItems.map((user) => (
                <UserRow
                  key={user.id}
                  user={user}
                  selectUser={selectUser}
                  selectedUsers={selectedUsers}
                />
              ))
            ) : (
              <NoResult />
            )}
          </Table.Tbody>
        </Table>
      </Paper>

      {users.length > ITEMS_PER_PAGE && (
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
          if (selectedUsers.length > 0) {
            deleteSelectedUsers();
          }
        }}
        confirmText="Delete"
      >
        Are you sure you want to delete Selected Users?
      </ConfirmationModal>
    </>
  );
};

export default UserTable;
