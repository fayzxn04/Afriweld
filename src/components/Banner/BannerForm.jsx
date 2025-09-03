import FormHeader from "../common/FormHeader";
import { addFile, processPathSegments } from "../../utils/utilFunction";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { v4 } from "uuid";
import FormFooter from "../common/FormFooter";
import { toast } from "react-toastify";
import { addBanner } from "../../services/banner";
import { Flex } from "@mantine/core";

function BannerForm({ data }) {
  const [id, setId] = useState(v4());
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    link: "",
    imageUrl: "",
    imageHash: "",
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

    const BannerImage = await addFile(
      formData.imageUrl,
      "image",
      `banners/${id}`
    );
    // const bannerImgHash = await generateBlurHash(formData.imageUrl);
    let payload = {};

    try {
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
    <div style={{ height: "100vh" }}>
      <Flex direction="column" justify="space-between" h="100%">
        <FormHeader data={headerFromPath} />
        <FormFooter
          addHandler={addHandler}
          resetHandler={resetHandler}
          loading={loading}
          page={"Banner"}
          data={headerFromPath}
        />
      </Flex>
    </div>
  );
}

export default BannerForm;
