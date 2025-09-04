import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { v4 } from "uuid";
import { addFile, processPathSegments } from "../../utils/utilFunction";
import FormHeader from "../common/FormHeader";
import FormFooter from "../common/FormFooter";
import FileUpload from "../common/FileUpload";
import { toast } from "react-toastify";
import { addBanner } from "../../services/banner";
import { SimpleGrid, Stack, TextInput } from "@mantine/core";

function BannerForm({ data }) {
  const [id, setId] = useState(v4());
  const [formData, setFormData] = useState({
    title: "",
    imageUrl: "",
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
      });
    }
  }, [data]);

  const resetHandler = () => {
    setFormData({
      title: "",
      imageUrl: "",
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

  return (
    <Stack>
      <FormHeader data={headerFromPath} />
      <Stack p={24} justify="space-between" h={"75vh"}>
        <SimpleGrid cols={3}>
          <TextInput
            label="Banner Title"
            placeholder="Enter Title"
            value={formData.title}
            onChange={(event) =>
              setFormData({ ...formData, title: event.currentTarget.value })
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
            // name="imageUrl"
            mediaType="Image"
            imageLoading={loading.add}
            multiple={false}
          />
        </SimpleGrid>
        <FormFooter
          addHandler={addHandler}
          resetHandler={resetHandler}
          loading={loading}
          page={"Banner"}
          data={headerFromPath}
        />
      </Stack>
    </Stack>
  );
}

export default BannerForm;
