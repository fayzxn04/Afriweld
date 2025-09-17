import { Checkbox, Table } from "@mantine/core";
import { useNavigate } from "react-router-dom";

const OrderRow = ({ order, selectOrder, selectedOrders }) => {
  const {
    id,
    user,
    product,
    // subtotalPrice,
    discount,
    deliveryCharge,
    totalPrice,
  } = order;

  const navigate = useNavigate();
  const handleRowClick = () => {
    navigate(`/orders/editOrder?id=${id}`, { state: order });
  };

  const handleCheckboxChange = (e) => {
    selectOrder(e, order);
  };

  return (
    <Table.Tr onClick={handleRowClick} style={{ cursor: "pointer" }}>
      <Table.Td>
        <div onClick={(e) => e.stopPropagation()}>
          <Checkbox
            checked={selectedOrders.includes(order)}
            onChange={handleCheckboxChange}
          />
        </div>
      </Table.Td>
      <Table.Td>{user?.name}</Table.Td>
      <Table.Td>{product?.name}</Table.Td>
      <Table.Td>{discount?.discount}</Table.Td>
      <Table.Td>{deliveryCharge?.deliveryCharge}</Table.Td>
      <Table.Td>{totalPrice?.name}</Table.Td>
      {/* <Table.Td>{maxAmount}</Table.Td> */}
      {/* <Table.Td>{isActive ? "Active" : "Inactive"}</Table.Td> */}
      {/* <Table.Td>{userIDs.join(", ")}</Table.Td> */}
    </Table.Tr>
  );
};

export default OrderRow;
