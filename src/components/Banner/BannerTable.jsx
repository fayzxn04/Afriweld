import React, { useEffect } from "react";
import { ITEMS_PER_PAGE } from "../../utils/utilConst";
import { Checkbox, Pagination, Paper, Table } from "@mantine/core";
import BannerRow from "./BannerRow";
import NoResult from "../common/NoResult";
import ConfirmationModal from "../common/ConfirmationModal";
import { usePagination } from "../../hooks/usePagination";

const BannerTable = ({
  banners,
  filters,
  showModal,
  setShowModal,
  selectedBanners,
  setSelectedBanners,
  deleteSelectedBanners,
  loadingDelete,
}) => {
  const { currentPage, handlePageChange, paginatedItems, totalPages } =
    usePagination(banners, ITEMS_PER_PAGE);

  useEffect(() => {
    handlePageChange(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  const selectBanner = (e, banner) => {
    if (e.target.checked) {
      setSelectedBanners((prevState) => [...prevState, banner]);
    } else {
      setSelectedBanners((prevState) =>
        prevState.filter((selectedBanner) => selectedBanner.id !== banner.id)
      );
    }
  };

  const onSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedBanners(paginatedItems);
    } else {
      setSelectedBanners([]);
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
                    selectedBanners.length > 0 &&
                    paginatedItems.length === selectedBanners.length
                  }
                  onChange={(e) => onSelectAll(e)}
                />
              </Table.Th>
              <Table.Th>Banner Type</Table.Th>
              <Table.Th>Image</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {paginatedItems.length > 0 ? (
              paginatedItems.map((banner) => (
                <BannerRow
                  key={banner.id}
                  banner={banner}
                  selectBanner={selectBanner}
                  selectedBanners={selectedBanners}
                />
              ))
            ) : (
              <NoResult />
            )}
          </Table.Tbody>
        </Table>
      </Paper>

      {banners?.length > ITEMS_PER_PAGE && (
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
          if (selectedBanners.length > 0) {
            deleteSelectedBanners();
          }
        }}
        confirmText="Delete"
      >
        Are you sure you want to delete Selected Banner?
      </ConfirmationModal>
    </>
  );
};

export default BannerTable;
