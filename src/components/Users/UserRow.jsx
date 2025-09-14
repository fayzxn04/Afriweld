import { AspectRatio, Checkbox, Image, Table } from "@mantine/core";
import { useNavigate } from "react-router-dom";

const UserRow = ({ user, selectUser, selectedUsers }) => {
  const {
    id,
    name,
    email,
    phoneNumber,
    // isBusiness,
    // businessName,
    // businessType,
    // vrnNumber,
    // tinNumber,
    // defaultAddress,
  } = user;

  const navigate = useNavigate();

  const handleRowClick = () => {
    navigate(`/users/editUser?id=${id}`, { state: user });
  };

  const handleCheckboxChange = (e) => {
    selectUser(e, user);
  };

  return (
    <Table.Tr onClick={handleRowClick} style={{ cursor: "pointer" }}>
      <Table.Td>
        <div onClick={(e) => e.stopPropagation()}>
          <Checkbox
            checked={selectedUsers.includes(user)}
            onChange={handleCheckboxChange}
          />
        </div>
      </Table.Td>
      <Table.Td>{name}</Table.Td>
      <Table.Td>{email}</Table.Td>
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

export default UserRow;
