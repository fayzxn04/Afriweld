import { AspectRatio, Checkbox, Image, Table } from "@mantine/core";
import { useNavigate } from "react-router-dom";

const BannerRow = ({ banner, selectBanner, selectedBanners }) => {
  const { bannerType, imageUrl } = banner;

  const navigate = useNavigate();

  const handleRowClick = () => {
    navigate(`/banners/editBanner?id=${banner.id}`, { state: banner });
  };

  const handleCheckboxChange = (e) => {
    selectBanner(e, banner);
  };
  return (
    <Table.Tr onClick={handleRowClick} style={{ cursor: "pointer" }}>
      <Table.Td>
        <div onClick={(e) => e.stopPropagation()}>
          <Checkbox
            checked={selectedBanners.includes(banner)}
            onChange={handleCheckboxChange}
          />
        </div>
      </Table.Td>
      <Table.Td>{bannerType}</Table.Td>
      <Table.Td>
        <AspectRatio ratio={16 / 9} style={{ width: "60px" }}>
          <Image
            src={imageUrl}
            alt={bannerType}
            sx={{ objectFit: "cover" }}
            withPlaceholder
          />
        </AspectRatio>
      </Table.Td>
    </Table.Tr>
  );
};

export default BannerRow;
