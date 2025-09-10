import { useCallback, useEffect, useMemo, useState } from "react";
import HeaderExport from "../common/HeaderExport";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteAddress, getAllAddresses } from "../../services/address";
// import { deleteFile } from "../../utils/utilFunction";
import { setAddresses } from "../../redux/reducers/addressReducer";
import { Stack } from "@mantine/core";
import AddressTable from "./AddressTable";
import LoaderIndicator from "../common/LoaderIndicator";

function AddressTablePage() {
  const [showModal, setShowModal] = useState(false);
  const [selectedAddresses, setSelectedAddresses] = useState([]);
  const [filters, setFilters] = useState({
    title: "All",
  });
  const [loadingDelete, setLoadingDelete] = useState(false);
  const { addresses, loading } = useSelector((state) => state.address);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const deleteSelectedAddresses = async () => {
    setLoadingDelete(true);
    try {
      await Promise.all(
        selectedAddresses.map(async (address) => {
          await deleteAddress(address.id);
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

  const fetchAddress = useCallback(async () => {
    const data = await getAllAddresses();
    dispatch(setAddresses(data));
  }, [dispatch]);

  useEffect(() => {
    fetchAddress();
  }, []);

  // Filter addresses
  const filteredAddresses = useMemo(() => {
    let filterData = addresses;

    if (filters.title !== "All") {
      filterData = filterData.filter(
        (address) => address.title === filters.title
      );
    }

    return filterData;
  }, [addresses, filters]);

  // Prepare export data
  const getExportData = useMemo(() => {
    const data = filteredAddresses.map((address) => ({
      name: address.name,
      address1: address.address1,
      address2: address.address2,
      city: address.city,
      district: address.district,
      latitude: address.latitude,
      longitude: address.longitude,
      phoneNumber: address.phoneNumber,
    }));
    return data;
  }, [filteredAddresses]);

  return (
    <Stack gap={0}>
      <HeaderExport
        data={getExportData}
        page={"Address"}
        link={"/address/addAddress"}
        setShowModal={setShowModal}
        showDeleteBtn={selectedAddresses.length > 0}
        hasButtonAccess={true}
      />
      {loading ? (
        <LoaderIndicator />
      ) : (
        <AddressTable
          addresses={filteredAddresses}
          filters={filters}
          showModal={showModal}
          setShowModal={setShowModal}
          selectedAddresses={selectedAddresses}
          setSelectedAddresses={setSelectedAddresses}
          deleteSelectedAddresses={deleteSelectedAddresses}
          loadingDelete={loadingDelete}
        />
      )}
    </Stack>
  );
}

export default AddressTablePage;
