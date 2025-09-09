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
import {
  addCategory,
  deleteCategory,
  updateCategory,
} from "../../services/category";
import { SimpleGrid, Stack, Switch, TextInput, Flex } from "@mantine/core";

function CategoryForm({ data }) {
  const [id, setId] = useState(v4());
  const [formData, setFormData] = useState({
    name: "",
    imageUrl: "",
    description: "",
    bannerImageUrl: "",
  });
  const [loading, setLoading] = useState({
    add: false,
    edit: false,
    delete: false,
  });
  const navigate = useNavigate();
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);
  const headerFromPath = processPathSegments(pathSegments);

  useEffect(() => {
    if (data) {
      setId(data.id);
      setFormData({
        name: data.name,
        imageUrl: data.imageUrl,
        description: data.description,
        bannerImageUrl: data.bannerImageUrl,
      });
    }
  }, [data]);

  const resetHandler = () => {
    setFormData({
      name: "",
      imageUrl: "",
      description: "",
      bannerImageUrl: "",
    });
  };

  const addHandler = async () => {
    setLoading({ ...loading, add: true });

    try {
      const CategoryImage = await addFile(
        formData.imageUrl,
        "image",
        `categories/${id}`
      );

      const BannerImage = formData.bannerImageUrl
        ? await addFile(
            formData.bannerImageUrl,
            "image",
            `categories/${id}/banner`
          )
        : formData.bannerImageUrl;

      let payload = {
        id,
        name: formData.name,
        imageUrl: CategoryImage, // use uploaded URL
        description: formData.description,
        bannerImageUrl: BannerImage,
        createdAt: new Date(),
      };

      await addCategory(payload);
      navigate("/categories", { replace: true });
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
      await deleteCategory(id);
      await deleteFile("image", `categories/${id}`);
      navigate("/categories", { replace: true });
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
      const CategoryImage =
        typeof formData.imageUrl === "string"
          ? formData.imageUrl
          : await addFile(formData.imageUrl, "image", `categories/${id}`);

      const BannerImage =
        typeof formData.bannerImageUrl === "string"
          ? formData.bannerImageUrl
          : await addFile(
              formData.bannerImageUrl,
              "image",
              `categories/${id}/banner`
            );

      let payload = {
        name: formData.name,
        imageUrl: CategoryImage,
        description: formData.description,
        bannerImageUrl: BannerImage,

        updatedAt: new Date(), // ✅ track updates
      };

      // Call your update service
      await updateCategory(id, payload);

      navigate("/categories", { replace: true });
      toast.success("Category updated successfully!");
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
          <TextInput
            label="Category Name"
            placeholder="Enter Name"
            w="70%"
            value={formData.name}
            onChange={(event) =>
              setFormData({ ...formData, name: event.currentTarget.value })
            }
          />

          <FileUpload
            file={formData.imageUrl}
            data={formData.imageUrl}
            setFile={(file) => {
              setFormData({ ...formData, imageUrl: file });
            }}
            setModalImage={() => {}}
            setOpenModal={() => {}}
            w="70%"
            name="imageUrl"
            mediaType="Image"
            imageLoading={loading.add}
            multiple={false}
          />

          <TextInput
            label="Category Description"
            placeholder="Enter Description"
            value={formData.description}
            w="70%"
            onChange={(event) =>
              setFormData({
                ...formData,
                description: event.currentTarget.value,
              })
            }
          />

          <FileUpload
            file={formData.bannerImageUrl}
            data={formData.bannerImageUrl}
            setFile={(file) => {
              setFormData({ ...formData, bannerImageUrl: file });
            }}
            w="70%"
            setModalImage={() => {}}
            setOpenModal={() => {}}
            name="bannerImageUrl"
            mediaType="Image"
            imageLoading={loading.add}
            multiple={false}
          />
        </SimpleGrid>

        <FormFooter
          addHandler={addHandler}
          updateHandler={editHandler}
          resetHandler={resetHandler}
          deleteHandler={deleteHandler}
          loading={loading}
          page={"Category"}
          data={headerFromPath}
        />
      </Stack>
    </Stack>
  );
}

export default CategoryForm;
