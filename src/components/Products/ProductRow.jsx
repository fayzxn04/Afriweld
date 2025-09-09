import { AspectRatio, Checkbox, Image, Table } from "@mantine/core";
import { useNavigate } from "react-router-dom";

const ProductRow = ({ product, selectProduct, selectedProducts }) => {
  const {
    id,
    name,
    description,
    dimensions,
    unitWeight,
    unitPrice,
    wholesalePrice,
    specialPrice,
    wholesaleQuantity,
    isActive,
    imageUrl,
  } = product;

  const navigate = useNavigate();

  const handleRowClick = () => {
    navigate(`/products/editProduct?id=${id}`, { state: product });
  };

  const handleCheckboxChange = (e) => {
    selectProduct(e, product);
  };

  return (
    <Table.Tr onClick={handleRowClick} style={{ cursor: "pointer" }}>
      <Table.Td>
        <div onClick={(e) => e.stopPropagation()}>
          <Checkbox
            checked={selectedProducts.includes(product)}
            onChange={handleCheckboxChange}
          />
        </div>
      </Table.Td>
      <Table.Td>{name}</Table.Td>
      <Table.Td>{description}</Table.Td>
      <Table.Td>{dimensions}</Table.Td>
      <Table.Td>{unitWeight}</Table.Td>
      <Table.Td>{unitPrice}</Table.Td>
      <Table.Td>{wholesalePrice}</Table.Td>
      <Table.Td>{specialPrice}</Table.Td>
      <Table.Td>{wholesaleQuantity}</Table.Td>
      <Table.Td>{isActive ? "Yes" : "No"}</Table.Td>
      <Table.Td>
        <AspectRatio ratio={1} style={{ width: "60px" }}>
          <Image
            src={imageUrl}
            alt={name}
            sx={{ objectFit: "cover" }}
            withPlaceholder
          />
        </AspectRatio>
      </Table.Td>
    </Table.Tr>
  );
};

export default ProductRow;
