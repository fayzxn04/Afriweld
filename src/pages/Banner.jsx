import { useLocation } from "react-router-dom";
import BannerTablePage from "../components/Banner/BannerTablePage";
import BannerForm from "../components/Banner/BannerForm";
import { Stack } from "@mantine/core";

const Banner = () => {
  const location = useLocation();
  const data = location.state;

  return (
    <Stack
      m={0}
      justify="space-between"
      style={{ height: "calc(100vh - 89px)" }}
    >
      {location.pathname === "/banners" ? (
        <BannerTablePage />
      ) : (
        <BannerForm data={data} />
      )}
    </Stack>
  );
};

export default Banner;
