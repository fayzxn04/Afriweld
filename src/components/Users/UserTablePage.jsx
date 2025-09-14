import { useCallback, useEffect, useMemo, useState } from "react";
import HeaderExport from "../common/HeaderExport";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteUser, getAllUsers } from "../../services/user";
// import { deleteFile } from "../../utils/utilFunction";
import { setUsers } from "../../redux/reducers/userReducer";
import { Stack } from "@mantine/core";
import UserTable from "./UserTable";
import LoaderIndicator from "../common/LoaderIndicator";

function UserTablePage() {
  const [showModal, setShowModal] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [filters, setFilters] = useState({
    title: "All",
  });
  const [loadingDelete, setLoadingDelete] = useState(false);
  const { users, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const deleteSelectedUsers = async () => {
    setLoadingDelete(true);
    try {
      await Promise.all(
        selectedUsers.map(async (user) => {
          await deleteUser(user.id);
          //   await deleteFile("image", `addresses/${address.id}`);
        })
      );
      setLoadingDelete(false);
      setShowModal(false);
      navigate(0);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUsers = useCallback(async () => {
    const data = await getAllUsers();
    dispatch(setUsers(data));
  }, [dispatch]);

  useEffect(() => {
    fetchUsers();
  }, []);

  // Filter users
  const filteredUsers = useMemo(() => {
    let filterData = users;

    if (filters.title !== "All") {
      filterData = filterData.filter((user) => user.title === filters.title);
    }

    return filterData;
  }, [users, filters]);

  // Prepare export data
  const getExportData = useMemo(() => {
    const data = filteredUsers.map((user) => ({
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
      isBusiness: user.isBusiness,
      businessName: user.businessName,
      businessType: user.businessType,
      vrnNumber: user.vrnNumber,
      tinNumber: user.tinNumber,
      defaultAddress: user.defaultAddress,
    }));
    return data;
  }, [filteredUsers]);

  return (
    <Stack gap={0}>
      <HeaderExport
        data={getExportData}
        page={"Users"}
        link={"/users/addUser"}
        setShowModal={setShowModal}
        showDeleteBtn={selectedUsers.length > 0}
        hasButtonAccess={true}
      />
      {loading ? (
        <LoaderIndicator />
      ) : (
        <UserTable
          users={filteredUsers}
          filters={filters}
          showModal={showModal}
          setShowModal={setShowModal}
          selectedUsers={selectedUsers}
          setSelectedUsers={setSelectedUsers}
          deleteSelectedUsers={deleteSelectedUsers}
          loadingDelete={loadingDelete}
        />
      )}
    </Stack>
  );
}

export default UserTablePage;
