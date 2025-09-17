/** @format */

import { usePagination } from "../../hooks/usePagination";
import { Checkbox, Flex, Pagination, Paper, Table, Text } from "@mantine/core";
import PortalRow from "./PortalRow";
// import PropTypes from "prop-types";
import { useEffect } from "react";
import ConfirmationModal from "../common/ConfirmationModal";
import { ITEMS_PER_PAGE } from "../../utils/utilConst";

const PortalTable = ({
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
      setSelectedUsers((prevState) => [...prevState, user]);
    } else {
      setSelectedUsers((prevState) =>
        prevState.filter((selectedUser) => selectedUser.id !== user.id)
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
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>
                <Checkbox
                  checked={
                    selectedUsers.length > 0 &&
                    paginatedItems.length === selectedUsers.length
                  }
                  onChange={(e) => onSelectAll(e)}
                />
              </Table.Th>
              <Table.Th>Name</Table.Th>
              <Table.Th>Email</Table.Th>
              <Table.Th>Role</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {paginatedItems.length > 0 ? (
              paginatedItems.map((user) => (
                <PortalRow
                  key={user.id}
                  user={user}
                  selectUser={selectUser}
                  selectedUsers={selectedUsers}
                />
              ))
            ) : (
              <Text fz={24} fw={500} mt={20} ml={20}>
                No Results found
              </Text>
            )}
          </Table.Tbody>
        </Table>
      </Paper>

      {users?.length > ITEMS_PER_PAGE && (
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
        Are you sure you want to delete Selected Portal User?
      </ConfirmationModal>
    </>
  );
};

// PortalUserTable.propTypes = {
//   users: PropTypes.array.isRequired,
//   filters: PropTypes.object.isRequired,
//   showModal: PropTypes.bool.isRequired,
//   setShowModal: PropTypes.func.isRequired,
//   selectedUsers: PropTypes.array.isRequired,
//   setSelectedUsers: PropTypes.func.isRequired,
//   deleteSelectedUsers: PropTypes.func.isRequired,
//   loadingDelete: PropTypes.bool.isRequired,
// };

export default PortalTable;
