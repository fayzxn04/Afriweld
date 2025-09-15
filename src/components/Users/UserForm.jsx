import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { v4 } from "uuid";
import { processPathSegments } from "../../utils/utilFunction";
import FormHeader from "../common/FormHeader";
import FormFooter from "../common/FormFooter";
import { toast } from "react-toastify";
import { addUser, deleteUser, updateUser } from "../../services/user";
import {
  SimpleGrid,
  Stack,
  TextInput,
  Select,
  Flex,
  Switch,
} from "@mantine/core";
import { useSelector } from "react-redux";

function UserForm({ data }) {
  const [id, setId] = useState(v4());
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    isBusiness: false,
    businessName: "",
    businessType: "",
    vrnNumber: "",
    tinNumber: "",
    defaultAddressID: "", // New field for default address ID
  });
  const [addressID, setAddressID] = useState("");
  const [loading, setLoading] = useState({
    add: false,
    edit: false,
    delete: false,
  });
  const { addresses } = useSelector((state) => state.address);
  const navigate = useNavigate();
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);
  const headerFromPath = processPathSegments(pathSegments);

  useEffect(() => {
    if (data) {
      setId(data.id);
      setFormData({
        name: data.name,
        phoneNumber: data.phoneNumber,
        email: data.email,
        isBusiness: data.isBusiness,
        businessName: data.businessName || "",
        businessType: data.businessType || "",
        vrnNumber: data.vrnNumber || "",
        tinNumber: data.tinNumber || "",
      });
      setAddressID(data.defaultAddressID || "");
    }
  }, [data]);

  const resetHandler = () => {
    setFormData({
      name: "",
      phoneNumber: "",
      email: "",
      isBusiness: false,
      businessName: "",
      businessType: "",
      vrnNumber: "",
      tinNumber: "",
    });

    setAddressID(""); // Reset address ID
  };

  const addHandler = async () => {
    setLoading({ ...loading, add: true });

    try {
      let payload = {
        id,
        name: formData.name,
        phoneNumber: formData.phoneNumber,
        email: formData.email,
        isBusiness: formData.isBusiness,
        businessName: formData.businessName || "",
        businessType: formData.businessType || "",
        vrnNumber: formData.vrnNumber || "",
        tinNumber: formData.tinNumber || "",
        defaultAddressID: addressID,

        createdAt: new Date(),
      };

      await addUser(payload);
      navigate("/users", { replace: true });
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
      await deleteUser(id);
      navigate("/users", { replace: true });
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
        name: formData.name,
        phoneNumber: formData.phoneNumber,
        email: formData.email,
        isBusiness: formData.isBusiness,
        businessName: formData.businessName || "",
        businessType: formData.businessType || "",
        vrnNumber: formData.vrnNumber || "",
        tinNumber: formData.tinNumber || "",
        defaultAddressID: addressID,

        lastSeenAt: new Date(), // ✅ track updates
      };

      // Call your update service
      await updateUser(id, payload);

      navigate("/users", { replace: true });
      toast.success("User updated successfully!");
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
      isBusiness: value,
    }));
  };

  return (
    <Stack>
      <FormHeader data={headerFromPath} />
      <Stack p={24} justify="space-between" h={"75vh"}>
        <SimpleGrid cols={2} spacing="sm" verticalSpacing="sm">
          <Select
            label=" Default Address"
            placeholder="Select Default Address"
            w="70%"
            data={addresses.map((item) => ({
              label: item.name,
              value: item.id,
            }))}
            value={addressID}
            onChange={(value) => setAddressID(value)}
          />

          {/*  Name */}
          <TextInput
            label=" Name"
            placeholder=" Name"
            w="70%"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.currentTarget.value })
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

          {/* Email */}
          <TextInput
            label="Email"
            placeholder="Enter Email"
            w="70%"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.currentTarget.value })
            }
          />

          <Flex align="center" justify="flex-start" gap="sm">
            <Switch
              label="Active"
              checked={formData.isActive}
              onChange={(e) => toggleActive(e.currentTarget.checked)}
              size="md"
              color="blue"
            />
          </Flex>
        </SimpleGrid>

        {formData.isBusiness && (
          <Stack p={24} justify="space-between" h={"75vh"}>
            {/* <Divider label="Optional details (visible when Active)" /> */}
            <SimpleGrid cols={2} spacing="sm" verticalSpacing="sm">
              <TextInput
                label="Business Name "
                placeholder="Enter business name"
                w="70%"
                value={formData.businessName}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    businessName: e.currentTarget.value,
                  })
                }
              />
              <TextInput
                label="Business Type "
                placeholder="EX: Retail, Hospitality"
                w="70%"
                value={formData.businessType}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    businessType: e.currentTarget.value,
                  })
                }
              />
              <TextInput
                label="VRN Number "
                placeholder="Enter VRN"
                w="70%"
                value={formData.vrnNumber}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    vrnNumber: e.currentTarget.value,
                  })
                }
              />
              <TextInput
                label="TIN Number "
                placeholder="Enter TIN"
                w="70%"
                value={formData.tinNumber}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    tinNumber: e.currentTarget.value,
                  })
                }
              />
            </SimpleGrid>
          </Stack>
        )}

        {/* Footer */}
        <FormFooter
          addHandler={addHandler}
          updateHandler={editHandler}
          resetHandler={resetHandler}
          deleteHandler={deleteHandler}
          loading={loading}
          page={"User"}
          data={headerFromPath}
        />
      </Stack>
    </Stack>
  );
}

export default UserForm;
