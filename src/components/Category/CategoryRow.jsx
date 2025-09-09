import { AspectRatio, Checkbox, Image, Table } from "@mantine/core";
import { useNavigate } from "react-router-dom";

const CategoryRow = ({ category, selectCategory, selectedCategories }) => {
  const { name, imageUrl, description, bannerImageUrl } = category;
  const navigate = useNavigate();

  const handleRowClick = () => {
    navigate(`/categories/editCategory?id=${category.id}`, { state: category });
  };

  const handleCheckboxChange = (e) => {
    selectCategory(e, category);
  };
  return (
    <Table.Tr onClick={handleRowClick} style={{ cursor: "pointer" }}>
      <Table.Td>
        <div onClick={(e) => e.stopPropagation()}>
          <Checkbox
            checked={selectedCategories.includes(category)}
            onChange={handleCheckboxChange}
          />
        </div>
      </Table.Td>
      <Table.Td>{name}</Table.Td>
      <Table.Td>{description}</Table.Td>
      <Table.Td>
        <AspectRatio ratio={16 / 9} style={{ width: "60px" }}>
          <Image
            src={imageUrl}
            alt={name}
            sx={{ objectFit: "cover" }}
            withPlaceholder
          />
        </AspectRatio>
      </Table.Td>
      <Table.Td>
        <AspectRatio ratio={16 / 9} style={{ width: "60px" }}>
          <Image
            src={bannerImageUrl}
            alt={name}
            sx={{ objectFit: "cover" }}
            withPlaceholder
          />
        </AspectRatio>
      </Table.Td>
    </Table.Tr>
  );
};

export default CategoryRow;
