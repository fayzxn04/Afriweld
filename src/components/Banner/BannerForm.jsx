import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { v4 } from "uuid";
import {
  addFile,
  deleteFile,
  processPathSegments,
} from "../../utils/utilFunction";
import FormHeader from "../common/FormHeader";
import FormFooter from "../common/FormFooter";
import FileUpload from "../common/FileUpload";
import { toast } from "react-toastify";
import { addBanner, deleteBanner, updateBanner } from "../../services/banner";
import {
  SimpleGrid,
  Stack,
  Switch,
  TextInput,
  Flex,
  Select,
} from "@mantine/core";
import { useSelector } from "react-redux";

function BannerForm({ data }) {
  const [id, setId] = useState(v4());
  const [formData, setFormData] = useState({
    title: "",
    imageUrl: "",
    isActive: true,
  });
  const [productID, setProductID] = useState("");
  const [loading, setLoading] = useState({
    add: false,
    edit: false,
    delete: false,
  });
  const { products } = useSelector((state) => state.product);
  const navigate = useNavigate();
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);
  const headerFromPath = processPathSegments(pathSegments);

  useEffect(() => {
    if (data) {
      setId(data.id);
      setFormData({
        title: data.title,
        imageUrl: data.imageUrl,
        isActive: data.isActive ?? true,
      });
      //
      setProductID(data.productID || "");
    }
  }, [data]);

  const resetHandler = () => {
    setFormData({
      title: "",
      imageUrl: "",
      isActive: true,
    });
    //
    setProductID(""); // Reset product
  };

  const addHandler = async () => {
    setLoading({ ...loading, add: true });

    if (formData.imageUrl === "") {
      toast.error("Please upload an image");
      setLoading((s) => ({ ...s, add: false }));
      return;
    }

    try {
      const BannerImage = await addFile(
        formData.imageUrl,
        "image",
        `banners/${id}`
      );
      let payload = {
        id,
        title: formData.title,
        imageUrl: BannerImage, // use uploaded URL
        isActive: formData.isActive,
        productID: productID || "",
        createdAt: new Date(),
      };

      await addBanner(payload);
      navigate("/banners", { replace: true });
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
      await deleteBanner(id);
      await deleteFile("image", `banners/${id}`);
      navigate("/banners", { replace: true });
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
      const BannerImage =
        typeof formData.imageUrl === "string"
          ? formData.imageUrl
          : await addFile(formData.imageUrl, "image", `banners/${id}`);

      let payload = {
        title: formData.title,
        imageUrl: BannerImage,
        isActive: formData.isActive,
        updatedAt: new Date(), // ✅ track updates
      };

      // Call your update service
      await updateBanner(id, payload);

      navigate("/banners", { replace: true });
      toast.success("Banner updated successfully!");
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
        <SimpleGrid cols={2} spacing="lg" verticalSpacing="lg">
          <TextInput
            label="Banner Title"
            placeholder="Enter Title"
            w={"70%"}
            value={formData.title}
            onChange={(event) =>
              setFormData({ ...formData, title: event.currentTarget.value })
            }
          />

          <FileUpload
            file={formData.imageUrl}
            data={formData.imageUrl}
            w={"70%"}
            setFile={(file) => {
              setFormData({ ...formData, imageUrl: file });
            }}
            setModalImage={() => {}}
            setOpenModal={() => {}}
            name="imageUrl"
            mediaType="Image"
            imageLoading={loading.add}
            multiple={false}
          />

          <Select
            label="Product"
            placeholder="Select Product"
            w="70%"
            data={products.map((item) => ({
              label: item.name,
              value: item.id,
            }))}
            value={productID}
            onChange={(value) => setProductID(value)}
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
      </Stack>

      <FormFooter
        addHandler={addHandler}
        updateHandler={editHandler}
        resetHandler={resetHandler}
        deleteHandler={deleteHandler}
        loading={loading}
        page={"Banner"}
        data={headerFromPath}
      />
    </Stack>
  );
}

export default BannerForm;
