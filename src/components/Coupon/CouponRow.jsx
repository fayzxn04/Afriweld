import { AspectRatio, Checkbox, Image, Table } from "@mantine/core";
import { useNavigate } from "react-router-dom";

const CouponRow = ({ coupon, selectCoupon, selectedCoupons }) => {
  const { id, couponCode, description, percentage, maxAmount } = coupon;

  const navigate = useNavigate();
  const handleRowClick = () => {
    navigate(`/coupons/editCoupon?id=${id}`, { state: coupon });
  };

  const handleCheckboxChange = (e) => {
    selectCoupon(e, coupon);
  };

  return (
    <Table.Tr onClick={handleRowClick} style={{ cursor: "pointer" }}>
      <Table.Td>
        <div onClick={(e) => e.stopPropagation()}>
          <Checkbox
            checked={selectedCoupons.includes(coupon)}
            onChange={handleCheckboxChange}
          />
        </div>
      </Table.Td>
      <Table.Td>{couponCode}</Table.Td>
      <Table.Td>{description}</Table.Td>
      <Table.Td>{percentage}</Table.Td>
      <Table.Td>{maxAmount}</Table.Td>
      {/* <Table.Td>{isActive ? "Active" : "Inactive"}</Table.Td> */}
      {/* <Table.Td>{userIDs.join(", ")}</Table.Td> */}
    </Table.Tr>
  );
};

export default CouponRow;
