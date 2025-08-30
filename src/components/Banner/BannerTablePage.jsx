import { Stack } from "@mantine/core";
import HeaderExport from "../common/HeaderExport";
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";

const BannerTablePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedBanners, setSelectedBanners] = useState([]);
  const [filters, setFilters] = useState({
    bannerType: "All",
  });
  const { banners, loading } = useSelector((state) => state.banner);

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
    </Stack>
  );
};

export default BannerTablePage;
