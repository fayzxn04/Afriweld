import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { v4 } from "uuid";
import { processPathSegments } from "../../utils/utilFunction";
import FormHeader from "../common/FormHeader";
import FormFooter from "../common/FormFooter";
import { toast } from "react-toastify";
import {
  addAddress,
  deleteAddress,
  updateAddress,
} from "../../services/address";
import {
  SimpleGrid,
  Stack,
  Switch,
  TextInput,
  Flex,
  Select,
} from "@mantine/core";
import { useSelector } from "react-redux";

function AddressForm({ data }) {
  const [id, setId] = useState(v4());
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    address1: "",
    address2: "",
    city: "",
    district: "",
    latitude: "",
    longitude: "",
    phoneNumber: "",
    userID: "",
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
        // id: data.id,
        name: data.name,
        address1: data.address1,
        address2: data.address2,
        city: data.city,
        district: data.district,
        latitude: data.latitude,
        longitude: data.longitude,
        phoneNumber: data.phoneNumber,
      });
      setUserID(data.userID || "");
    }
  }, [data]);

  const resetHandler = () => {
    setFormData({
      // id: "",
      name: "",
      address1: "",
      address2: "",
      city: "",
      district: "",
      latitude: "",
      longitude: "",
      phoneNumber: "",
    });
    setUserID(""); // Reset userID
  };

  const addHandler = async () => {
    setLoading({ ...loading, add: true });

    try {
      let payload = {
        id,
        name: formData.name,
        address1: formData.address1,
        address2: formData.address2,
        city: formData.city,
        district: formData.district,
        latitude: Number(formData.latitude),
        longitude: Number(formData.longitude),
        phoneNumber: formData.phoneNumber,
        userID: userID || "",
      };

      await addAddress(payload);
      navigate("/address", { replace: true });
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
      await deleteAddress(id);
      navigate("/address", { replace: true });
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
        name: formData.name,
        address1: formData.address1,
        address2: formData.address2,
        city: formData.city,
        district: formData.district,
        latitude: Number(formData.latitude),
        longitude: Number(formData.longitude),
        phoneNumber: formData.phoneNumber,
        userID: userID || "",

        updatedAt: new Date(), // ✅ track updates
      };

      // Call your update service
      await updateAddress(id, payload);

      navigate("/address", { replace: true });
      toast.success("Address updated successfully!");
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong while updating");
    } finally {
      setLoading({ ...loading, edit: false });
    }
  };

  return (
    <Stack>
      <FormHeader data={headerFromPath} />
      <Stack p={24} justify="space-between" h={"75vh"}>
        <SimpleGrid cols={2} spacing="sm" verticalSpacing="sm">
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
          {/* Name */}
          <TextInput
            label=" Name"
            placeholder="Enter Name"
            w="70%"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.currentTarget.value })
            }
          />

          {/* Address 1 */}
          <TextInput
            label="Address 1"
            placeholder="Enter Address 1"
            w="70%"
            value={formData.address1}
            onChange={(e) =>
              setFormData({ ...formData, address1: e.currentTarget.value })
            }
          />

          {/* Address 2 */}
          <TextInput
            label="Address 2"
            placeholder="Enter Address 2"
            w="70%"
            value={formData.address2}
            onChange={(e) =>
              setFormData({ ...formData, address2: e.currentTarget.value })
            }
          />

          {/* City */}
          <TextInput
            label="City"
            placeholder="Enter City"
            w="70%"
            value={formData.city}
            onChange={(e) =>
              setFormData({ ...formData, city: e.currentTarget.value })
            }
          />

          {/* District */}
          <TextInput
            label="District"
            placeholder="Enter District"
            w="70%"
            value={formData.district}
            onChange={(e) =>
              setFormData({ ...formData, district: e.currentTarget.value })
            }
          />

          {/* Latitude */}
          <TextInput
            label="Latitude"
            placeholder="Enter Latitude"
            w="70%"
            value={formData.latitude}
            onChange={(e) =>
              setFormData({ ...formData, latitude: e.currentTarget.value })
            }
          />

          {/* Longitude */}
          <TextInput
            label="Longitude"
            placeholder="Enter Longitude"
            w="70%"
            value={formData.longitude}
            onChange={(e) =>
              setFormData({ ...formData, longitude: e.currentTarget.value })
            }
          />

          {/* Phone Number */}
          <TextInput
            label="Phone Number"
            placeholder="Enter Phone Number"
            w="70%"
            value={formData.phoneNumber}
            onChange={(e) =>
              setFormData({ ...formData, phoneNumber: e.currentTarget.value })
            }
          />
        </SimpleGrid>

        {/* Footer */}
        <FormFooter
          addHandler={addHandler}
          updateHandler={editHandler}
          resetHandler={resetHandler}
          deleteHandler={deleteHandler}
          loading={loading}
          page={"Address"}
          data={headerFromPath}
        />
      </Stack>
    </Stack>
  );
}
export default AddressForm;
