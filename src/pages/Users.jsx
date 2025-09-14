import { useLocation } from "react-router-dom";
import { Stack } from "@mantine/core";
import UserTablePage from "../components/Users/UserTablePage";
import UserForm from "../components/Users/UserForm";

const Users = () => {
  const location = useLocation();
  const data = location.state;

  return (
    <Stack
      m={0}
      justify="space-between"
      style={{ height: "calc(100vh - 89px)" }}
    >
      {location.pathname === "/users" ? (
        <UserTablePage />
      ) : (
        <UserForm data={data} />
      )}
    </Stack>
  );
};

export default Users;
