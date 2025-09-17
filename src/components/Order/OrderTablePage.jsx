import { useCallback, useEffect, useMemo, useState } from "react";
import HeaderExport from "../common/HeaderExport";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteOrder, getAllOrders } from "../../services/order";
import { setOrders } from "../../redux/reducers/orderReducer";
import { Stack } from "@mantine/core";
import OrderTable from "./OrderTable";
import LoaderIndicator from "../common/LoaderIndicator";

function OrderTablePage() {
  const [showModal, setShowModal] = useState(false);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [filters, setFilters] = useState({
    title: "All",
  });
  const [loadingDelete, setLoadingDelete] = useState(false);
  const { orders, loading } = useSelector((state) => state.order);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const deleteSelectedOrders = async () => {
    setLoadingDelete(true);
    try {
      await Promise.all(
        selectedOrders.map(async (order) => {
          await deleteOrder(order.id);
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

  const fetchOrders = useCallback(async () => {
    const data = await getAllOrders();
    dispatch(setOrders(data));
  }, [dispatch]);

  useEffect(() => {
    fetchOrders();
  }, []);

  // Filter coupons
  const filteredOrders = useMemo(() => {
    let filterData = orders;

    if (filters.title !== "All") {
      filterData = filterData.filter(
        (address) => address.title === filters.title
      );
    }

    return filterData;
  }, [orders, filters]);

  // Prepare export data
  const getExportData = useMemo(() => {
    const data = filteredOrders.map((order) => ({
      subtotalPrice: order.subtotalPrice,
      discount: order.discount,
      deliveryCharge: order.deliveryCharge,
      totalPrice: order.totalPrice,
      address: order.address || null,
      product: order.product || null,
      user: order.user || null,
    }));
    return data;
  }, [filteredOrders]);

  return (
    <Stack gap={0}>
      <HeaderExport
        data={getExportData}
        page={"Orders"}
        link={"/orders/addOrder"}
        setShowModal={setShowModal}
        showDeleteBtn={selectedOrders.length > 0}
        hasButtonAccess={true}
      />
      {loading ? (
        <LoaderIndicator />
      ) : (
        <OrderTable
          orders={filteredOrders}
          filters={filters}
          showModal={showModal}
          setShowModal={setShowModal}
          selectedOrders={selectedOrders}
          setSelectedOrders={setSelectedOrders}
          deleteSelectedOrders={deleteSelectedOrders}
          loadingDelete={loadingDelete}
        />
      )}
    </Stack>
  );
}

export default OrderTablePage;
