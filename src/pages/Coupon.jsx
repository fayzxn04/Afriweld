import { useLocation } from "react-router-dom";
import { Stack } from "@mantine/core";
import CouponTablePage from "../components/Coupon/CouponTablePage";
import CouponForm from "../components/Coupon/CouponForm";

const Coupon = () => {
  const location = useLocation();
  const data = location.state;

  return (
    <Stack
      m={0}
      justify="space-between"
      style={{ height: "calc(100vh - 89px)" }}
    >
      {location.pathname === "/coupons" ? (
        <CouponTablePage />
      ) : (
        <CouponForm data={data} />
      )}
    </Stack>
  );
};

export default Coupon;
