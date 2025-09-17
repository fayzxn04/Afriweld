import { useDispatch, useSelector } from "react-redux";
import { Stack } from "@mantine/core";
import HeaderExport from "../common/HeaderExport";
import { useEffect, useMemo, useState, useCallback } from "react";
// import PortalFilter from "./PortalFilter";
import PortalTable from "./PortalTable";
import { getAllPortalUsers } from "../../services/portalUser";
import { setPortalUsers } from "../../redux/reducers/portalUserReducer";
import { deletePortalUser } from "../../services/portalUser";
import { useNavigate } from "react-router-dom";
import LoaderIndicator from "../common/LoaderIndicator";

const PortalTablePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [filters, setFilters] = useState({
    searchQuery: "",
    role: "All",
  });
  const [loadingDelete, setLoadingDelete] = useState(false);
  const { portalUsers, loading } = useSelector((state) => state.portalUser);
  const { user } = useSelector((state) => state.app);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const deleteSelectedUsers = async () => {
    setLoadingDelete(true);
    try {
      await Promise.all(
        selectedUsers.map(async (user) => {
          await deletePortalUser(user.id);
        })
      );
      setLoadingDelete(false);
      setShowModal(false);
      navigate(0);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPortalUsers = useCallback(async () => {
    const data = await getAllPortalUsers();
    dispatch(setPortalUsers(data));
  }, [dispatch]);

  useEffect(() => {
    fetchPortalUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    let filterData = portalUsers;

    filterData = filterData.filter(
      (portalUser) => portalUser?.name !== user?.name
    );

    if (filters.role !== "All") {
      filterData = filterData.filter((user) => user?.role === filters.role);
    }
    if (filters.searchQuery) {
      filterData = filterData.filter(
        (user) =>
          user.name.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(filters.searchQuery.toLowerCase())
      );
    }
    return filterData;
  }, [portalUsers, filters, user]);

  const getExportData = useMemo(() => {
    return filteredUsers.map((portalUser) => ({
      Name: portalUser.name,
      Email: portalUser.email,
      Type: portalUser.role,
    }));
  }, [filteredUsers]);

  return (
    <Stack gap={0}>
      <HeaderExport
        data={getExportData}
        page="Portal User"
        link="/portalUsers/addPortalUser"
        setShowModal={setShowModal}
        showDeleteBtn={selectedUsers.length > 0}
        hasButtonAccess={
          user?.type === "superadmin" || user?.type === "admin" || true
        }
      />
      {/* <PortalFilter filters={filters} setFilters={setFilters} /> */}
      {loading ? (
        <LoaderIndicator />
      ) : (
        <PortalTable
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
};

export default PortalTablePage;
