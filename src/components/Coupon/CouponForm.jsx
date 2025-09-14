import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { v4 } from "uuid";
import { processPathSegments } from "../../utils/utilFunction";
import FormHeader from "../common/FormHeader";
import FormFooter from "../common/FormFooter";
import { toast } from "react-toastify";
import { addCoupon, deleteCoupon, updateCoupon } from "../../services/coupon";
import {
  SimpleGrid,
  Stack,
  Switch,
  TextInput,
  Flex,
  Text,
  Select,
} from "@mantine/core";
import { useSelector } from "react-redux";

function CouponForm({ data }) {
  const [id, setId] = useState(v4());
  const [formData, setFormData] = useState({
    id: "",
    couponCode: "",
    description: "",
    percentage: "",
    maxAmount: "",
    isActive: true,
    userIDs: [], // New field for user IDs
  });
  const [userID, setUserID] = useState("");
  const [loading, setLoading] = useState({
    add: false,
    edit: false,
    delete: false,
  });
  const { users } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);
  const headerFromPath = processPathSegments(pathSegments);

  useEffect(() => {
    if (data) {
      setId(data.id);
      setFormData({
        id: data.id,
        couponCode: data.couponCode,
        description: data.description,
        percentage: data.percentage,
        maxAmount: data.maxAmount,
        isActive: data.isActive ?? true,

        // userIDs: data.userIDs || [],
      });
      setUserID(data.userIDs || "");
    }
  }, [data]);

  const resetHandler = () => {
    setFormData({
      couponCode: "",
      description: "",
      percentage: "",
      maxAmount: "",
      isActive: true,
      //   userIDs: [],
    });
    setUserID(""); // Reset user ID
  };

  const addHandler = async () => {
    setLoading({ ...loading, add: true });

    try {
      let payload = {
        id,
        couponCode: formData.couponCode,
        description: formData.description,
        percentage: Number(formData.percentage),
        maxAmount: Number(formData.maxAmount),
        isActive: formData.isActive,
        userIDs: Array(userID || []),
        // userIDs: formData.userIDs || [],
        createdAt: new Date(), // ✅ track creation time
      };

      await addCoupon(payload);
      navigate("/coupons", { replace: true });
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    } finally {
      setLoading({ ...loading, add: false });
    }
  };

  const deleteHandler = async () => {
    setLoading({ ...loading, delete: true });
    try {
      await deleteCoupon(id);
      navigate("/coupons", { replace: true });
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    } finally {
      setLoading({ ...loading, delete: false });
    }
  };

  // Edit handler
  const editHandler = async () => {
    setLoading({ ...loading, edit: true });

    try {
      let payload = {
        id,
        couponCode: formData.couponCode,
        description: formData.description,
        percentage: Number(formData.percentage),
        maxAmount: Number(formData.maxAmount),
        isActive: formData.isActive,
        userIDs: userID || [],
        // userIDs: formData.userIDs || [],

        updatedAt: new Date(), // ✅ track updates
      };

      // Call your update service
      await updateCoupon(id, payload);

      navigate("/coupons", { replace: true });
      toast.success("Coupon updated successfully!");
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong while updating");
    } finally {
      setLoading({ ...loading, edit: false });
    }
  };

  const toggleActive = (value) => {
    setFormData((prev) => ({
      ...prev,
      isActive: value,
    }));
  };

  return (
    <Stack>
      <FormHeader data={headerFromPath} />
      <Stack p={24} justify="space-between" h={"75vh"}>
        <SimpleGrid cols={2} spacing="sm" verticalSpacing="sm">
          {/* Coupon Code */}
          <TextInput
            label=" Coupon Code"
            placeholder="Enter Coupon Code"
            w="70%"
            value={formData.couponCode}
            onChange={(e) =>
              setFormData({ ...formData, couponCode: e.currentTarget.value })
            }
          />

          {/* Description */}
          <TextInput
            label="Description"
            placeholder="Enter Description"
            w="70%"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.currentTarget.value })
            }
          />

          {/* Percentage */}
          <TextInput
            label="Percentage"
            placeholder="Enter Percentage"
            w="70%"
            value={formData.percentage}
            onChange={(e) =>
              setFormData({ ...formData, percentage: e.currentTarget.value })
            }
          />

          {/* Max Amount */}
          <TextInput
            label="Max Amount"
            placeholder="Enter Max Amount"
            w="70%"
            value={formData.maxAmount}
            onChange={(e) =>
              setFormData({ ...formData, maxAmount: e.currentTarget.value })
            }
          />

          <Select
            label="User"
            placeholder="Select User"
            w="70%"
            data={users.map((item) => ({
              label: item.name,
              value: item.id,
            }))}
            value={userID}
            onChange={(value) => setUserID(value)}
          />

          {/* Active Switch */}
          <Flex align="center" justify="flex-start" gap="sm">
            <Switch
              checked={formData.isActive}
              onChange={(e) => toggleActive(e.currentTarget.checked)}
            />
            <Text>Active</Text>
          </Flex>
        </SimpleGrid>

        {/* Footer */}
        <FormFooter
          addHandler={addHandler}
          updateHandler={editHandler}
          resetHandler={resetHandler}
          deleteHandler={deleteHandler}
          loading={loading}
          page={"Coupon"}
          data={headerFromPath}
        />
      </Stack>
    </Stack>
  );
}
export default CouponForm;
