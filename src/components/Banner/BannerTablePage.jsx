import { Stack } from "@mantine/core";
import HeaderExport from "../common/HeaderExport";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBanners } from "../../redux/reducers/bannerReducer";
import { useNavigate } from "react-router-dom";
import { deleteFile } from "../../utils/utilFunction";
import { deleteBanner, getAllBanners } from "../../services/banner";
import BannerFilter from "./BannerFilter";
import LoaderIndicator from "../common/LoaderIndicator";
import BannerTable from "./BannerTable";

const BannerTablePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedBanners, setSelectedBanners] = useState([]);
  const dispatch = useDispatch();
  const [filters, setFilters] = useState({
    bannerType: "All",
  });
  const [loadingDelete, setLoadingDelete] = useState(false);
  const { banners, loading } = useSelector((state) => state.banner);
  const navigate = useNavigate();

  const fetchBanners = useCallback(async () => {
    const data = await getAllBanners();
    dispatch(setBanners(data));
  }, [dispatch]);

  useEffect(() => {
    fetchBanners();
  }, []);

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

  const filteredBanners = useMemo(() => {
    let filterData = banners;

    if (filters.bannerType !== "All") {
      filterData = filterData.filter(
        (banner) => banner.bannerType === filters.bannerType
      );
    }

    return filterData;
  }, [banners, filters]);

  const getExportData = useMemo(() => {
    const data = filteredBanners.map((banner) => ({
      "Banner Type": banner.bannerType,
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
      <BannerFilter filters={filters} setFilters={setFilters} />
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
};

export default BannerTablePage;
