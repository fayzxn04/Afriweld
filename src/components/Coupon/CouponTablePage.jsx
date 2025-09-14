import { useCallback, useEffect, useMemo, useState } from "react";
import HeaderExport from "../common/HeaderExport";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteCoupon, getAllCoupons } from "../../services/coupon";
import { setCoupons } from "../../redux/reducers/couponReducer";
import { Stack } from "@mantine/core";
import CouponTable from "./CouponTable";
import LoaderIndicator from "../common/LoaderIndicator";

function CouponTablePage() {
  const [showModal, setShowModal] = useState(false);
  const [selectedCoupons, setSelectedCoupons] = useState([]);
  const [filters, setFilters] = useState({
    title: "All",
  });
  const [loadingDelete, setLoadingDelete] = useState(false);
  const { coupons, loading } = useSelector((state) => state.coupon);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const deleteSelectedCoupons = async () => {
    setLoadingDelete(true);
    try {
      await Promise.all(
        selectedCoupons.map(async (coupon) => {
          await deleteCoupon(coupon.id);
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

  const fetchCoupons = useCallback(async () => {
    const data = await getAllCoupons();
    dispatch(setCoupons(data));
  }, [dispatch]);

  useEffect(() => {
    fetchCoupons();
  }, []);

  // Filter coupons
  const filteredCoupons = useMemo(() => {
    let filterData = coupons;

    if (filters.title !== "All") {
      filterData = filterData.filter(
        (address) => address.title === filters.title
      );
    }

    return filterData;
  }, [coupons, filters]);

  // Prepare export data
  const getExportData = useMemo(() => {
    const data = filteredCoupons.map((coupon) => ({
      couponCode: coupon.couponCode,
      description: coupon.description,
      percentage: coupon.percentage,
      maxAmount: coupon.maxAmount,
      isActive: coupon.isActive,
      userIDs: coupon.userIDs,
    }));
    return data;
  }, [filteredCoupons]);

  return (
    <Stack gap={0}>
      <HeaderExport
        data={getExportData}
        page={"Coupons"}
        link={"/coupons/addCoupon"}
        setShowModal={setShowModal}
        showDeleteBtn={selectedCoupons.length > 0}
        hasButtonAccess={true}
      />
      {loading ? (
        <LoaderIndicator />
      ) : (
        <CouponTable
          coupons={filteredCoupons}
          filters={filters}
          showModal={showModal}
          setShowModal={setShowModal}
          selectedCoupons={selectedCoupons}
          setSelectedCoupons={setSelectedCoupons}
          deleteSelectedCoupons={deleteSelectedCoupons}
          loadingDelete={loadingDelete}
        />
      )}
    </Stack>
  );
}

export default CouponTablePage;
