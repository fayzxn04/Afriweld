import { useCallback, useEffect, useMemo, useState } from "react";
import HeaderExport from "../common/HeaderExport";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteCategory, getAllCategories } from "../../services/category";
import { deleteFile } from "../../utils/utilFunction";
import { setCategories } from "../../redux/reducers/categoryReducer";
import { Stack } from "@mantine/core";
import CategoryTable from "./CategoryTable";
import LoaderIndicator from "../common/LoaderIndicator";

function CategoryTablePage() {
  const [showModal, setShowModal] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [filters, setFilters] = useState({
    title: "All",
  });
  const [loadingDelete, setLoadingDelete] = useState(false);
  const { categories, loading } = useSelector((state) => state.category);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const deleteSelectedCategories = async () => {
    setLoadingDelete(true);
    try {
      await Promise.all(
        selectedCategories.map(async (category) => {
          await deleteCategory(category.id);
          await deleteFile("image", `categories/${category.id}`);
        })
      );
      setLoadingDelete(false);
      setShowModal(false);
      navigate(0);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCategories = useCallback(async () => {
    const data = await getAllCategories();
    dispatch(setCategories(data));
  }, [dispatch]);

  useEffect(() => {
    fetchCategories();
  }, []);

  // Filter categories
  const filteredCategories = useMemo(() => {
    let filterData = categories;

    if (filters.title !== "All") {
      filterData = filterData.filter(
        (category) => category.title === filters.title
      );
    }

    return filterData;
  }, [categories, filters]);

  // Prepare export data
  const getExportData = useMemo(() => {
    const data = filteredCategories.map((category) => ({
      "Category Name": category.name, // you can add more fields here
      "Image URL": category.imageUrl, // useful for CSV/Excel export
      Description: category.description,
      "Banner Image URL": category.bannerImageUrl,
    }));
    return data;
  }, [filteredCategories]);

  return (
    <Stack gap={0}>
      <HeaderExport
        data={getExportData}
        page={"Categories"}
        link={"/categories/addCategory"}
        setShowModal={setShowModal}
        showDeleteBtn={selectedCategories.length > 0}
        hasButtonAccess={true}
      />
      {loading ? (
        <LoaderIndicator />
      ) : (
        <CategoryTable
          categories={filteredCategories}
          filters={filters}
          showModal={showModal}
          setShowModal={setShowModal}
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
          deleteSelectedCategories={deleteSelectedCategories}
          loadingDelete={loadingDelete}
        />
      )}
    </Stack>
  );
}

export default CategoryTablePage;
