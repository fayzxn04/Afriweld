import { Checkbox, Table } from "@mantine/core";

// import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const PortalRow = ({ user, selectUser, selectedUsers }) => {
  const { id, name, email, role } = user;
  const navigate = useNavigate();

  const handleRowClick = () => {
    navigate(`/portalUsers/editPortalUser?id=${id}`, { state: user });
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
      <Table.Td>{role}</Table.Td>
    </Table.Tr>
  );
};

// PortalUserRow.propTypes = {
//   user: PropTypes.object.isRequired,
//   selectUser: PropTypes.func.isRequired,
//   selectedUsers: PropTypes.array.isRequired,
// };

export default PortalRow;
