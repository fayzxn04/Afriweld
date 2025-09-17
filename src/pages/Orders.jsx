import { useLocation } from "react-router-dom";
import { Stack } from "@mantine/core";
import OrderTablePage from "../components/Order/OrderTablePage";
import OrderForm from "../components/Order/OrderForm";

const Orders = () => {
  const location = useLocation();
  const data = location.state;

  return (
    <Stack
      m={0}
      justify="space-between"
      style={{ height: "calc(100vh - 89px)" }}
    >
      {location.pathname === "/orders" ? (
        <OrderTablePage />
      ) : (
        <OrderForm data={data} />
      )}
    </Stack>
  );
};

export default Orders;
