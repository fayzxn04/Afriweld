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
  Switch,
  TextInput,
  Flex,
  Select,
} from "@mantine/core";
import { useSelector } from "react-redux";

function UserForm({ data }) {
  const [id, setId] = useState(v4());
  const [bannerType, setBannerType] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    isBusiness: "",
    businessName: "",
    businessType: "",
    vrnNumber: "",
    tinNumber: "",
    defaultAddress: "",
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
      setBannerType(data.bannerType);
      setFormData({
        name: data.name,
        phoneNumber: data.phoneNumber,
        email: data.email,
        isBusiness: data.isBusiness,
        businessName: data.businessName,
        businessType: data.businessType,
        vrnNumber: data.vrnNumber,
        tinNumber: data.tinNumber,
        defaultAddress: data.defaultAddress,
      });
      setAddressID(data.addressID || "");
    }
  }, [data]);

  const resetHandler = () => {
    setFormData({
      name: "",
      phoneNumber: "",
      email: "",
      isBusiness: "",
      businessName: "",
      businessType: "",
      vrnNumber: "",
      tinNumber: "",
      defaultAddress: "",
    });

    setAddressID(""); // Reset address ID
  };

  const addHandler = async () => {
    setLoading({ ...loading, add: true });

    if (formData.imageUrl === "") {
      toast.error("Please upload an image");
      setLoading((s) => ({ ...s, add: false }));
      return;
    }
    if (bannerType === "address" && addressID === "") {
      toast.error("Please select an address for the user");
      setLoading((s) => ({ ...s, add: false }));
      return;
    }

    try {
      let payload = {
        id,
        name: formData.name,
        phoneNumber: formData.phoneNumber,
        email: formData.email,
        isBusiness: formData.isBusiness,
        businessName: formData.businessName,
        businessType: formData.businessType,
        vrnNumber: formData.vrnNumber,
        tinNumber: formData.tinNumber,
        // defaultAddress: formData.defaultAddress,
        // addressID: addressID || "",
        defaultAddressID: addressID || "",

        // defaultAddressID: addressID || "",
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
      //   await deleteFile("image", `users/${id}`);
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
      // If no new file is uploaded, keep the old URL
      //   const ProductImage =
      //     typeof formData.imageUrl === "string"
      //       ? formData.imageUrl
      //       : await addFile(formData.imageUrl, "image", `products/${id}`);

      let payload = {
        name: formData.name,
        phoneNumber: formData.phoneNumber,
        email: formData.email,
        isBusiness: formData.isBusiness,
        businessName: formData.businessName,
        businessType: formData.businessType,
        vrnNumber: formData.vrnNumber,
        tinNumber: formData.tinNumber,
        // defaultAddress: formData.defaultAddress,
        defaultAddressID: addressID || "",
        // addressID: addressID || "",

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

  //   const toggleActive = (value) => {
  //     setFormData((prev) => ({
  //       ...prev,
  //       isActive: value,
  //     }));
  //   };

  return (
    <Stack>
      <FormHeader data={headerFromPath} />
      <Stack p={24} justify="space-between" h={"75vh"}>
        <SimpleGrid cols={2} spacing="sm" verticalSpacing="sm">
          {/* <Select
            label="Address Type"
            placeholder="Select Address Type"
            data={[
              { label: "Address", value: "address" },
              // { label: "Category", value: "category" },
            ]}
            value={bannerType}
            onChange={(value) => setBannerType(value)}
          /> */}
          {data && (
            <Select
              label=" Address"
              placeholder="Select Address"
              w="70%"
              data={addresses.map((item) => ({
                label: item.name,
                value: item.id,
              }))}
              value={addressID}
              onChange={(value) => setAddressID(value)}
            />
          )}

          {/* Product Name */}
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
          {/* isBusiness */}
          {/* <TextInput
            label="isBusiness"
            placeholder="Enter isBusiness"
            w="70%"
            value={formData.isBusiness}
            onChange={(e) =>
              setFormData({ ...formData, isBusiness: e.currentTarget.value })
            }
          /> */}
        </SimpleGrid>

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
