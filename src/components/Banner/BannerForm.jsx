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
import { SimpleGrid, Stack, Switch, TextInput, Flex } from "@mantine/core";

function BannerForm({ data }) {
  const [id, setId] = useState(v4());
  const [formData, setFormData] = useState({
    title: "",
    imageUrl: "",
    isActive: true,
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
        title: data.title,
        imageUrl: data.imageUrl,
        isActive: data.isActive ?? true,
      });
    }
  }, [data]);

  const resetHandler = () => {
    setFormData({
      title: "",
      imageUrl: "",
      isActive: true,
    });
  };

  const addHandler = async () => {
    setLoading({ ...loading, add: true });

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

  // const deleteHandler = async () => {
  //   setLoading((s) => ({ ...s, delete: true }));
  //   try {
  //     // Grab the best reference you have (prefer exact path if you store it)
  //     const imageRef =
  //       data?.imagePath ||
  //       data?.imageUrl ||
  //       formData?.imagePath ||
  //       formData?.imageUrl;

  //     // 1) Delete storage object first
  //     if (imageRef) {
  //       const ok = await deleteFile(imageRef); // this can be URL or "banners/<id>/<file.ext>"
  //       if (!ok) {
  //         toast.error(
  //           "Couldn’t delete banner image from Storage. Database not changed."
  //         );
  //         setLoading((s) => ({ ...s, delete: false }));
  //         return;
  //       }
  //     } else {
  //       console.warn("No imageRef found; skipping storage delete.");
  //     }

  //     // 2) Then delete the Firestore document
  //     await deleteBanner(id);

  //     navigate("/banners", { replace: true });
  //     toast.success("Banner deleted.");
  //   } catch (err) {
  //     console.log(err);
  //     toast.error("Something went wrong");
  //   } finally {
  //     setLoading((s) => ({ ...s, delete: false }));
  //   }
  // };

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
        <SimpleGrid cols={3} spacing="lg" verticalSpacing="lg">
          <TextInput
            label="Banner Title"
            placeholder="Enter Title"
            value={formData.title}
            onChange={(event) =>
              setFormData({ ...formData, title: event.currentTarget.value })
            }
          />
          <Stack spacing={4}>
            <FileUpload
              file={formData.imageUrl}
              data={formData.imageUrl}
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
          </Stack>
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
    </Stack>
  );
}

export default BannerForm;
