import { useCallback, useEffect, useMemo, useState } from "react";
import HeaderExport from "../common/HeaderExport";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteBanner, getAllBanners } from "../../services/banner";
import { deleteFile } from "../../utils/utilFunction";
import { setBanners } from "../../redux/reducers/bannerReducer";
import { Stack } from "@mantine/core";
import BannerTable from "./BannerTable";
import LoaderIndicator from "../common/LoaderIndicator";

function BannerTablePage() {
  const [showModal, setShowModal] = useState(false);
  const [selectedBanners, setSelectedBanners] = useState([]);
  const [filters, setFilters] = useState({
    title: "All",
  });
  const [loadingDelete, setLoadingDelete] = useState(false);
  const { banners, loading } = useSelector((state) => state.banner);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const deleteSelectedBanners = async () => {
    setLoadingDelete(true);
    try {
      await Promise.all(
        selectedBanners.map(async (banner) => {
          await deleteBanner(banner.id);
          await deleteFile("image", `banners/${banner.id}`);
        })
      );
      setLoadingDelete(false);
      setShowModal(false);
      navigate(0);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchBanners = useCallback(async () => {
    const data = await getAllBanners();
    dispatch(setBanners(data));
  }, [dispatch]);

  useEffect(() => {
    fetchBanners();
  }, []);

  // Filter banners
  const filteredBanners = useMemo(() => {
    let filterData = banners;

    if (filters.title !== "All") {
      filterData = filterData.filter(
        (banner) => banner.title === filters.title
      );
    }

    return filterData;
  }, [banners, filters]);

  // Prepare export data
  const getExportData = useMemo(() => {
    const data = filteredBanners.map((banner) => ({
      "Banner Title": banner.title, // you can add more fields here
      "Image URL": banner.imageUrl, // useful for CSV/Excel export
    }));
    return data;
  }, [filteredBanners]);

  return (
    <Stack gap={0}>
      <HeaderExport
        data={getExportData}
        page={"Banner"}
        link={"/banners/addBanner"}
        setShowModal={setShowModal}
        showDeleteBtn={selectedBanners.length > 0}
        hasButtonAccess={true}
      />
      {loading ? (
        <LoaderIndicator />
      ) : (
        <BannerTable
          banners={filteredBanners}
          filters={filters}
          showModal={showModal}
          setShowModal={setShowModal}
          selectedBanners={selectedBanners}
          setSelectedBanners={setSelectedBanners}
          deleteSelectedBanners={deleteSelectedBanners}
          loadingDelete={loadingDelete}
        />
      )}
    </Stack>
  );
}

export default BannerTablePage;
