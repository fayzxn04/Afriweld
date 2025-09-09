import { useCallback, useEffect, useMemo, useState } from "react";
import HeaderExport from "../common/HeaderExport";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteProduct, getAllProducts } from "../../services/product";
import { deleteFile } from "../../utils/utilFunction";
import { setProducts } from "../../redux/reducers/productReducer";
import { Stack } from "@mantine/core";
import ProductTable from "./ProductTable";
import LoaderIndicator from "../common/LoaderIndicator";

function ProductTablePage() {
  const [showModal, setShowModal] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [filters, setFilters] = useState({
    title: "All",
  });
  const [loadingDelete, setLoadingDelete] = useState(false);
  const { products, loading } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const deleteSelectedProducts = async () => {
    setLoadingDelete(true);
    try {
      await Promise.all(
        selectedProducts.map(async (product) => {
          await deleteProduct(product.id);
          await deleteFile("image", `products/${product.id}`);
        })
      );
      setLoadingDelete(false);
      setShowModal(false);
      navigate(0);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProducts = useCallback(async () => {
    const data = await getAllProducts();
    dispatch(setProducts(data));
  }, [dispatch]);

  useEffect(() => {
    fetchProducts();
  }, []);

  // Filter products
  const filteredProducts = useMemo(() => {
    let filterData = products;

    if (filters.title !== "All") {
      filterData = filterData.filter(
        (product) => product.title === filters.title
      );
    }

    return filterData;
  }, [products, filters]);

  // Prepare export data
  const getExportData = useMemo(() => {
    const data = filteredProducts.map((product) => ({
      "Product Name": product.name,
      "Image URL": product.imageUrl,
      // Dimensions: product.dimensions,
      "Unit Weight": product.unitWeight,
      "Unit Price": product.unitPrice,
      // Description: product.description,
      "Wholesale Price": product.wholesalePrice,
      "Special Price": product.specialPrice,
      "Wholesale Qty": product.wholesaleQuantity,
      // "Active": product.isActive ? "Yes" : "No",
    }));
    return data;
  }, [filteredProducts]);

  return (
    <Stack gap={0}>
      <HeaderExport
        data={getExportData}
        page={"Products"}
        link={"/products/addProduct"}
        setShowModal={setShowModal}
        showDeleteBtn={selectedProducts.length > 0}
        hasButtonAccess={true}
      />
      {loading ? (
        <LoaderIndicator />
      ) : (
        <ProductTable
          products={filteredProducts}
          filters={filters}
          showModal={showModal}
          setShowModal={setShowModal}
          selectedProducts={selectedProducts}
          setSelectedProducts={setSelectedProducts}
          deleteSelectedProducts={deleteSelectedProducts}
          loadingDelete={loadingDelete}
        />
      )}
    </Stack>
  );
}

export default ProductTablePage;
