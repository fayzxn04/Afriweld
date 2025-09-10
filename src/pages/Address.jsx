import { useLocation } from "react-router-dom";
import { Stack } from "@mantine/core";
import AddressTablePage from "../components/Address/AddressTablePage";
import AddressForm from "../components/Address/AddressForm";

const Address = () => {
  const location = useLocation();
  const data = location.state;

  return (
    <Stack
      m={0}
      justify="space-between"
      style={{ height: "calc(100vh - 89px)" }}
    >
      {location.pathname === "/address" ? (
        <AddressTablePage />
      ) : (
        <AddressForm data={data} />
      )}
    </Stack>
  );
};

export default Address;
