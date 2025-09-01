/** @format */

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  addFile,
  deleteFile,
  processPathSegments,
} from "../../utils/utilFunction";
import { Select, SimpleGrid, Stack, TextInput, Switch } from "@mantine/core";
import FormHeader from "../common/FormHeader";
import FileUpload from "../common/FileUpload";
import FormFooter from "../common/FormFooter";
import { toast } from "react-toastify";
import { v4 } from "uuid";
import { addBanner, deleteBanner, updateBanner } from "../../services/banner";
import { useSelector } from "react-redux";

const BannerForm = ({ data }) => {
  // id: new id unless editing
  const [id, setId] = useState(v4());

  // minimal fields we want
  const [formData, setFormData] = useState({
    imageUrl: "",
    productID: "", // optional
    isActive: true, // default true
  });

  const [loading, setLoading] = useState({
    add: false,
    edit: false,
    delete: false,
  });

  // OPTIONAL: if you have products in redux, we can show them in a Select.
  // If you don't, this safely falls back to empty array and we show a TextInput instead.
  const products = useSelector((state) => state.product?.products ?? []);

  const navigate = useNavigate();
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);
  const headerFromPath = processPathSegments(pathSegments);

  // Hydrate when editing
  useEffect(() => {
    if (data) {
      setId(data.id);
      setFormData({
        imageUrl: data.imageUrl ?? "",
        productID: data.productID ?? "",
        isActive: typeof data.isActive === "boolean" ? data.isActive : true,
      });
    }
  }, [data]);

  const resetHandler = () => {
    setFormData({
      imageUrl: "",
      productID: "",
      isActive: true,
    });
  };

  const addHandler = async () => {
    setLoading((s) => ({ ...s, add: true }));

    // required: imageUrl
    if (!formData.imageUrl) {
      toast.error("Please upload an image");
      setLoading((s) => ({ ...s, add: false }));
      return;
    }

    try {
      // upload file if it's a File object
      let uploadedImageUrl = formData.imageUrl;
      if (formData.imageUrl && typeof formData.imageUrl === "object") {
        uploadedImageUrl = await addFile(
          formData.imageUrl,
          "image",
          `banners/${id}`
        );
      }

      const payload = {
        id,
        imageUrl: uploadedImageUrl,
        // include productID only if provided
        ...(formData.productID ? { productID: formData.productID } : {}),
        isActive: !!formData.isActive,
      };

      await addBanner(payload);
      navigate("/banners", { replace: true });
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setLoading((s) => ({ ...s, add: false }));
    }
  };

  const editHandler = async () => {
    setLoading((s) => ({ ...s, edit: true }));

    try {
      if (!id) {
        toast.error("Invalid banner id");
        setLoading((s) => ({ ...s, edit: false }));
        return;
      }

      let imageUrl = formData.imageUrl;

      // if a new file is chosen, upload it
      if (formData.imageUrl && typeof formData.imageUrl === "object") {
        imageUrl = await addFile(formData.imageUrl, "image", `banners/${id}`);
      }

      const payload = {
        id,
        imageUrl,
        ...(formData.productID ? { productID: formData.productID } : {}),
        isActive: !!formData.isActive,
      };

      await updateBanner(id, payload);
      navigate("/banners", { replace: true });
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setLoading((s) => ({ ...s, edit: false }));
    }
  };

  const deleteHandler = async () => {
    setLoading((s) => ({ ...s, delete: true }));
    try {
      await deleteBanner(id);
      await deleteFile("image", `banners/${id}`);
      navigate("/banners", { replace: true });
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setLoading((s) => ({ ...s, delete: false }));
    }
  };

  const hasProducts = Array.isArray(products) && products.length > 0;

  return (
    <>
      <Stack>
        <FormHeader data={headerFromPath} />
        <Stack p={24}>
          <SimpleGrid cols={3}>
            <FileUpload
              file={formData.imageUrl}
              data={formData.imageUrl}
              setFile={(file) => setFormData((f) => ({ ...f, imageUrl: file }))}
              setModalImage={() => {}}
              setOpenModal={() => {}}
              name="imageUrl"
              mediaType="Image"
              imageLoading={loading.add || loading.edit}
              multiple={false}
            />

            {/* productID is optional. If products exist in redux, use a Select; else show a TextInput */}
            {hasProducts ? (
              <Select
                label="Product (optional)"
                placeholder="Select Product"
                data={products.map((p) => ({
                  label: p.name ?? p.title ?? p.id,
                  value: p.id,
                }))}
                value={formData.productID || null}
                onChange={(value) =>
                  setFormData((f) => ({ ...f, productID: value ?? "" }))
                }
                clearable
                searchable
              />
            ) : (
              <TextInput
                label="Product ID (optional)"
                placeholder="Enter Product ID"
                value={formData.productID}
                onChange={(e) =>
                  setFormData((f) => ({
                    ...f,
                    productID: e.currentTarget.value,
                  }))
                }
              />
            )}

            <div className="flex items-center">
              <Switch
                label="Active"
                checked={formData.isActive}
                onChange={(e) =>
                  setFormData((f) => ({
                    ...f,
                    isActive: e.currentTarget.checked,
                  }))
                }
              />
            </div>
          </SimpleGrid>
        </Stack>
      </Stack>

      <FormFooter
        addHandler={addHandler}
        updateHandler={editHandler}
        deleteHandler={deleteHandler}
        resetHandler={resetHandler}
        loading={loading}
        page={"Banner"}
        data={headerFromPath}
      />
    </>
  );
};

export default BannerForm;
