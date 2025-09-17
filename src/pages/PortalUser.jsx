import { Stack } from "@mantine/core";
import { useLocation } from "react-router-dom";

import PortalForm from "../components/PortalUser/PortalForm";
import PortalTablePage from "../components/PortalUser/PortalTablePage";

const PortalUser = () => {
  const location = useLocation();
  const data = location.state;

  return (
    <Stack
      m={0}
      justify="space-between"
      style={{ height: "calc(100vh - 89px)" }}
    >
      {location.pathname === "/portalUsers" ? (
        <PortalTablePage />
      ) : (
        <PortalForm data={data} />
      )}
    </Stack>
  );
};

export default PortalUser;
