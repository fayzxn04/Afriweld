import { useLocation } from "react-router-dom";
import { Stack } from "@mantine/core";
import ProductForm from "../components/Products/ProductForm";
import ProductTablePage from "../components/Products/ProductTablePage";

const Product = () => {
  const location = useLocation();
  const data = location.state;

  return (
    <Stack
      m={0}
      justify="space-between"
      style={{ height: "calc(100vh - 89px)" }}
    >
      {location.pathname === "/categories" ? (
        <ProductTablePage />
      ) : (
        <ProductForm data={data} />
      )}
    </Stack>
  );
};

export default Product;
