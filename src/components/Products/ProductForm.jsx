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
  addProduct,
  deleteProduct,
  updateProduct,
} from "../../services/product";
import { SimpleGrid, Stack, Switch, TextInput, Flex } from "@mantine/core";

function ProductForm({ data }) {
  const [id, setId] = useState(v4());
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    dimensions: "",
    unitWeight: 0,
    unitPrice: 0,
    wholesalePrice: 0,
    specialPrice: 0,
    wholesaleQuantity: 0,
    isActive: true,
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
        name: data.name,
        description: data.description,
        dimensions: data.dimensions,
        unitWeight: data.unitWeight,
        unitPrice: data.unitPrice,
        wholesalePrice: data.wholesalePrice,
        specialPrice: data.specialPrice,
        wholesaleQuantity: data.wholesaleQuantity,
        isActive: data.isActive,
        imageUrl: data.imageUrl,
      });
    }
  }, [data]);

  const resetHandler = () => {
    setFormData({
      name: "",
      description: "",
      dimensions: "",
      unitWeight: "",
      unitPrice: "",
      wholesalePrice: "",
      specialPrice: "",
      wholesaleQuantity: "",
      isActive: true,
      imageUrl: "",
    });
  };

  const addHandler = async () => {
    setLoading({ ...loading, add: true });

    try {
      const ProductImage = await addFile(
        formData.imageUrl,
        "image",
        `products/${id}`
      );

      let payload = {
        id,
        name: formData.name,
        imageUrl: ProductImage, // use uploaded URL
        description: formData.description,
        dimensions: formData.dimensions,
        unitWeight: Number(formData.unitWeight),
        unitPrice: Number(formData.unitPrice),
        wholesalePrice: Number(formData.wholesalePrice),
        specialPrice: Number(formData.specialPrice),
        wholesaleQuantity: Number(formData.wholesaleQuantity),
        isActive: formData.isActive,
        createdAt: new Date(),
      };

      await addProduct(payload);
      navigate("/products", { replace: true });
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
      await deleteProduct(id);
      await deleteFile("image", `products/${id}`);
      navigate("/products", { replace: true });
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
      const ProductImage =
        typeof formData.imageUrl === "string"
          ? formData.imageUrl
          : await addFile(formData.imageUrl, "image", `products/${id}`);

      let payload = {
        name: formData.name,
        description: formData.description,
        dimensions: formData.dimensions,
        unitWeight: Number(formData.unitWeight),
        unitPrice: Number(formData.unitPrice),
        wholesalePrice: Number(formData.wholesalePrice),
        specialPrice: Number(formData.specialPrice),
        wholesaleQuantity: Number(formData.wholesaleQuantity),
        isActive: formData.isActive,
        imageUrl: ProductImage,

        updatedAt: new Date(), // ✅ track updates
      };

      // Call your update service
      await updateProduct(id, payload);

      navigate("/products", { replace: true });
      toast.success("Product updated successfully!");
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
          {/* Product Name */}
          <TextInput
            label="Product Name"
            placeholder="Enter Product Name"
            w="70%"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.currentTarget.value })
            }
          />

          {/* Product Image */}
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

          {/* Dimensions */}
          <TextInput
            label="Dimensions"
            placeholder="e.g. 10x20 cm"
            w="70%"
            value={formData.dimensions}
            onChange={(e) =>
              setFormData({ ...formData, dimensions: e.currentTarget.value })
            }
          />

          {/* Unit Weight */}
          <TextInput
            label="Unit Weight"
            placeholder="e.g. 1kg"
            w="70%"
            value={formData.unitWeight}
            onChange={(e) =>
              setFormData({ ...formData, unitWeight: e.currentTarget.value })
            }
          />

          {/* Unit Price */}
          <TextInput
            label="Unit Price"
            placeholder="Enter Price"
            type="number"
            w="70%"
            value={formData.unitPrice}
            onChange={(e) =>
              setFormData({ ...formData, unitPrice: e.currentTarget.value })
            }
          />

          {/* Wholesale Price */}
          <TextInput
            label="Wholesale Price"
            placeholder="Enter Wholesale Price"
            type="number"
            w="70%"
            value={formData.wholesalePrice}
            onChange={(e) =>
              setFormData({
                ...formData,
                wholesalePrice: e.currentTarget.value,
              })
            }
          />

          {/* Special Price */}
          <TextInput
            label="Special Price"
            placeholder="Enter Special Price"
            type="number"
            w="70%"
            value={formData.specialPrice}
            onChange={(e) =>
              setFormData({ ...formData, specialPrice: e.currentTarget.value })
            }
          />

          {/* Wholesale Quantity */}
          <TextInput
            label="Wholesale Quantity"
            placeholder="Enter Quantity"
            type="number"
            w="70%"
            value={formData.wholesaleQuantity}
            onChange={(e) =>
              setFormData({
                ...formData,
                wholesaleQuantity: e.currentTarget.value,
              })
            }
          />

          {/* Is Active Switch */}
          <Flex align="center" justify="flex-start" gap="sm">
            <Switch
              label="Active"
              checked={formData.isActive}
              onChange={(e) => toggleActive(e.currentTarget.checked)}
              size="md"
              color="blue"
              cursor="pointer"
            />
          </Flex>
        </SimpleGrid>

        {/* Footer */}
        <FormFooter
          addHandler={addHandler}
          updateHandler={editHandler}
          resetHandler={resetHandler}
          deleteHandler={deleteHandler}
          loading={loading}
          page={"Product"}
          data={headerFromPath}
        />
      </Stack>
    </Stack>
  );
}

export default ProductForm;
