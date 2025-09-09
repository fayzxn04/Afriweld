import { useLocation } from "react-router-dom";
import { Stack } from "@mantine/core";
import CategoryForm from "../components/Category/CategoryForm";
import CategoryTablePage from "../components/Category/CategoryTablePage";

const Category = () => {
  const location = useLocation();
  const data = location.state;

  return (
    <Stack
      m={0}
      justify="space-between"
      style={{ height: "calc(100vh - 89px)" }}
    >
      {location.pathname === "/categories" ? (
        <CategoryTablePage />
      ) : (
        <CategoryForm data={data} />
      )}
    </Stack>
  );
};

export default Category;
