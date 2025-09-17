import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { v4 } from "uuid";
import { processPathSegments } from "../../utils/utilFunction";
import FormHeader from "../common/FormHeader";
import FormFooter from "../common/FormFooter";
import { toast } from "react-toastify";
import { addOrder, deleteOrder, updateOrder } from "../../services/order";
import { SimpleGrid, Stack, TextInput, Select } from "@mantine/core";
import { useSelector } from "react-redux";

function OrderForm({ data }) {
  const [id, setId] = useState(v4());
  const [formData, setFormData] = useState({
    id: "",
    subtotalPrice: "",
    discount: "",
    deliveryCharge: "",
    totalPrice: "",
    address: null,
    product: null,
    user: null,
  });

  const [loading, setLoading] = useState({
    add: false,
    edit: false,
    delete: false,
  });

  const { products } = useSelector((state) => state.product);
  const { addresses } = useSelector((state) => state.address);
  const { users } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);
  const headerFromPath = processPathSegments(pathSegments);

  // Load data if editing
  useEffect(() => {
    if (data) {
      setId(data.id);
      setFormData({
        id: data.id,
        subtotalPrice: data.subtotalPrice,
        discount: data.discount,
        deliveryCharge: data.deliveryCharge,
        totalPrice: data.totalPrice,
        address: data.address || null,
        product: data.product || null,
        user: data.user || null,
      });
    }
  }, [data]);

  // Reset form
  const resetHandler = () => {
    setFormData({
      subtotalPrice: "",
      discount: "",
      deliveryCharge: "",
      totalPrice: "",
      address: null,
      product: null,
      user: null,
    });
  };

  // Add order
  const addHandler = async () => {
    setLoading({ ...loading, add: true });
    try {
      let payload = {
        ...formData,
        id,
        createdAt: new Date(),
      };
      await addOrder(payload);
      navigate("/orders", { replace: true });
      toast.success("Order added successfully!");
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    } finally {
      setLoading({ ...loading, add: false });
    }
  };

  // Delete order
  const deleteHandler = async () => {
    setLoading({ ...loading, delete: true });
    try {
      await deleteOrder(id);
      navigate("/orders", { replace: true });
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    } finally {
      setLoading({ ...loading, delete: false });
    }
  };

  // Edit order
  const editHandler = async () => {
    setLoading({ ...loading, edit: true });
    try {
      let payload = {
        ...formData,
        id,
        updatedAt: new Date(),
      };
      await updateOrder(id, payload);
      navigate("/orders", { replace: true });
      toast.success("Order updated successfully!");
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong while updating");
    } finally {
      setLoading({ ...loading, edit: false });
    }
  };

  // Auto-calculate total price
  useEffect(() => {
    const subtotal = Number(formData.subtotalPrice) || 0;
    const discount = Number(formData.discount) || 0;
    const delivery = Number(formData.deliveryCharge) || 0;
    const total = subtotal - discount + delivery;
    setFormData((prev) => ({ ...prev, totalPrice: total }));
  }, [formData.subtotalPrice, formData.discount, formData.deliveryCharge]);

  return (
    <Stack>
      <FormHeader data={headerFromPath} />
      <Stack p={24} justify="space-between" h={"75vh"}>
        <SimpleGrid cols={2} spacing="sm" verticalSpacing="sm">
          {/* Address Dropdown */}
          <Select
            label="Address"
            placeholder="Select Address"
            w="70%"
            data={addresses.map((item) => ({
              label: item.name,
              value: item.id,
            }))}
            value={formData.address?.id || ""}
            onChange={(value) => {
              const selectedAddress = addresses.find((a) => a.id === value);
              setFormData((prev) => ({
                ...prev,
                address: selectedAddress || null,
              }));
            }}
          />

          <Select
            label="User"
            placeholder="Select User"
            w="70%"
            data={users.map((item) => ({
              label: item.name,
              value: item.id,
            }))}
            value={formData.user?.id || ""}
            onChange={(value) => {
              const selectedUser = users.find((a) => a.id === value);
              setFormData((prev) => ({
                ...prev,
                user: selectedUser || null,
              }));
            }}
          />

          {/* Product Dropdown */}
          <Select
            label="Products"
            placeholder="Select Products"
            w="70%"
            data={products.map((item) => ({
              label: item.name,
              value: item.id,
            }))}
            value={formData.product?.id || ""}
            onChange={(value) => {
              const selectedProduct = products.find((p) => p.id === value);
              if (selectedProduct) {
                setFormData((prev) => ({
                  ...prev,
                  product: {
                    id: selectedProduct.id,
                    name: selectedProduct.name,
                    priceType: "wholesale",
                    price: selectedProduct.wholesalePrice ?? 0,
                    quantity: selectedProduct.wholesaleQuantity ?? 1,
                  },
                }));
              }
            }}
          />

          {/* Autofilled Product Fields */}
          {formData.product && (
            <>
              <TextInput
                label="Price"
                w="70%"
                value={formData.product.price}
                readOnly
              />
              <TextInput
                label="Price Type"
                w="70%"
                value={formData.product.priceType}
                readOnly
              />
              <TextInput
                label="Quantity"
                type="number"
                w="70%"
                value={formData.product.quantity}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    product: {
                      ...prev.product,
                      quantity: Number(e.currentTarget.value),
                    },
                  }))
                }
              />
            </>
          )}

          {/* Price Fields */}
          <TextInput
            label="Sub Total Price"
            placeholder="Sub Total Price"
            w="70%"
            value={formData.subtotalPrice}
            onChange={(e) =>
              setFormData({ ...formData, subtotalPrice: e.currentTarget.value })
            }
          />
          <TextInput
            label="Discount"
            placeholder="Discount"
            w="70%"
            value={formData.discount}
            onChange={(e) =>
              setFormData({ ...formData, discount: e.currentTarget.value })
            }
          />
          <TextInput
            label="Delivery Charge"
            placeholder="Delivery Charge"
            w="70%"
            value={formData.deliveryCharge}
            onChange={(e) =>
              setFormData({
                ...formData,
                deliveryCharge: e.currentTarget.value,
              })
            }
          />
          <TextInput
            label="Total Price"
            placeholder="Total Price"
            w="70%"
            value={formData.totalPrice}
            readOnly
          />
        </SimpleGrid>

        {/* Footer */}
        <FormFooter
          addHandler={addHandler}
          updateHandler={editHandler}
          resetHandler={resetHandler}
          deleteHandler={deleteHandler}
          loading={loading}
          page={"Order"}
          data={headerFromPath}
        />
      </Stack>
    </Stack>
  );
}

export default OrderForm;
