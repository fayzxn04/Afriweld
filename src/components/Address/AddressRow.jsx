import { AspectRatio, Checkbox, Image, Table } from "@mantine/core";
import { useNavigate } from "react-router-dom";

const AddressRow = ({ address, selectAddress, selectedAddresses }) => {
  const {
    id,
    name,
    address1,
    address2,
    city,
    district,
    latitude,
    longitude,
    phoneNumber,
  } = address;

  const navigate = useNavigate();

  const handleRowClick = () => {
    navigate(`/address/editAddress?id=${id}`, { state: address });
  };

  const handleCheckboxChange = (e) => {
    selectAddress(e, address);
  };

  return (
    <Table.Tr onClick={handleRowClick} style={{ cursor: "pointer" }}>
      <Table.Td>
        <div onClick={(e) => e.stopPropagation()}>
          <Checkbox
            checked={selectedAddresses.includes(address)}
            onChange={handleCheckboxChange}
          />
        </div>
      </Table.Td>
      <Table.Td>{name}</Table.Td>
      <Table.Td>{address1}</Table.Td>
      <Table.Td>{address2}</Table.Td>
      <Table.Td>{city}</Table.Td>
      <Table.Td>{district}</Table.Td>
      <Table.Td>{latitude}</Table.Td>
      <Table.Td>{longitude}</Table.Td>
      <Table.Td>{phoneNumber}</Table.Td>

      {/* <Table.Td>
        <AspectRatio ratio={1} style={{ width: "60px" }}>
          <Image
            src={imageUrl}
            alt={name}
            sx={{ objectFit: "cover" }}
            withPlaceholder
          />
        </AspectRatio>
      </Table.Td> */}
    </Table.Tr>
  );
};

export default AddressRow;
